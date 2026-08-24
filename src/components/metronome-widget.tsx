"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { AudioEngine } from "@/lib/audio-engine"
import { Slider } from "@/components/ui/slider"
import { Hand } from "lucide-react"

const MAX_TAPS = 8
const RESET_MS = 3000

export type BeatState = "A" | "N" | "G" | "M"

const BEAT_SOUNDS: Record<BeatState, { frequency: number; gain: number; decay: number }> = {
  A: { frequency: 880, gain: 1.0, decay: 0.05 },
  N: { frequency: 440, gain: 0.7, decay: 0.05 },
  G: { frequency: 330, gain: 0.25, decay: 0.03 },
  M: { frequency: 0, gain: 0.0, decay: 0 },
}

const SCHEDULER_LOOKAHEAD = 0.1
const SCHEDULER_INTERVAL = 25

function calcBpm(timestamps: number[]): number | null {
  if (timestamps.length < 2) return null
  const intervals: number[] = []
  for (let i = 1; i < timestamps.length; i++) {
    intervals.push(timestamps[i] - timestamps[i - 1])
  }
  const sorted = [...intervals].sort((a, b) => a - b)
  const median = sorted[Math.floor(sorted.length / 2)]
  const filtered = intervals.filter(v => v < median * 2.5)
  if (filtered.length === 0) return null
  let weightedSum = 0
  let weightTotal = 0
  filtered.forEach((v, i) => {
    const w = i >= filtered.length / 2 ? 2 : 1
    weightedSum += v * w
    weightTotal += w
  })
  const avgMs = weightedSum / weightTotal
  return Math.round(60000 / avgMs)
}

const presets = [
  { label: "Largo", val: 50 },
  { label: "Andante", val: 90 },
  { label: "Moderato", val: 110 },
  { label: "Allegro", val: 140 },
  { label: "Vivace", val: 170 },
]

export type Subdivision = "quarter" | "eighth" | "triplet" | "sixteenth"
export const subdivisions: { label: string; value: Subdivision; clicks: number }[] = [
  { label: "1/4", value: "quarter", clicks: 1 },
  { label: "1/8", value: "eighth", clicks: 2 },
  { label: "1/3", value: "triplet", clicks: 3 },
  { label: "1/16", value: "sixteenth", clicks: 4 },
]

interface QueueNote {
  time: number
  beatIndex: number
  beatState: BeatState
  isSubdivision: boolean
}

interface MetronomeWidgetProps {
  defaultSubdivision?: Subdivision
  showSubdivisions?: boolean
}

export function MetronomeWidget({ defaultSubdivision = "quarter", showSubdivisions = true }: MetronomeWidgetProps) {
  const [bpm, setBpm] = useState(120)
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(0.8)
  const [signature, setSignature] = useState("4/4")
  const [beat, setBeat] = useState(-1)
  const [soundStyle, setSoundStyle] = useState<"click" | "beep" | "woodblock">("click")
  const [subdivision, setSubdivision] = useState<Subdivision>(defaultSubdivision)
  const [tapPulse, setTapPulse] = useState(false)
  const [beatStates, setBeatStates] = useState<BeatState[]>(["N", "N", "N", "N"])
  const [pulseActive, setPulseActive] = useState(false)
  const [pulseState, setPulseState] = useState<BeatState>("N")

  const tapTimestampsRef = useRef<number[]>([])
  const tapResetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const rafRef = useRef<number | null>(null)
  const schedulerTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const nextNoteTimeRef = useRef(0)
  const currentBeatRef = useRef(0)
  const subdBeatRef = useRef(0)
  const notesInQueueRef = useRef<QueueNote[]>([])

  const audioCtxRef = useRef<AudioContext | null>(null)
  const engineRef = useRef<AudioEngine | null>(null)
  const initializedRef = useRef(false)

  const bpmRef = useRef(bpm)
  const volumeRef = useRef(volume)
  const numBeatsRef = useRef(parseInt(signature.split("/")[0]))
  const soundStyleRef = useRef<"click" | "beep" | "woodblock">("click")
  const subdRef = useRef(subdivision)
  const beatStatesRef = useRef(beatStates)
  const signatureRef = useRef(signature)
  const gapClickRef = useRef(false)
  const playBarsRef = useRef(2)
  const silentBarsRef = useRef(2)
  const isRandomMuteRef = useRef(false)
  const randomMutePercentRef = useRef(25)
  const playingRef = useRef(false)
  const pulseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => { bpmRef.current = bpm }, [bpm])
  useEffect(() => { volumeRef.current = volume }, [volume])
  useEffect(() => { soundStyleRef.current = soundStyle }, [soundStyle])
  useEffect(() => { subdRef.current = subdivision }, [subdivision])
  useEffect(() => { beatStatesRef.current = beatStates }, [beatStates])
  useEffect(() => { signatureRef.current = signature }, [signature])

  useEffect(() => {
    const nb = parseInt(signature.split("/")[0])
    numBeatsRef.current = nb
    setBeatStates(prev => {
      if (prev.length === nb) return prev
      const next = [...prev]
      while (next.length < nb) next.push("N")
      return next.slice(0, nb)
    })
  }, [signature])

  useEffect(() => {
    const saved = localStorage.getItem("taptempo_last_bpm")
    if (saved) {
      const parsed = parseInt(saved, 10)
      if (!isNaN(parsed)) setBpm(Math.max(20, Math.min(300, parsed)))
    }
  }, [])

  const initAudio = useCallback(() => {
    if (initializedRef.current) return
    const engine = AudioEngine.getInstance()
    engine.init()
    engineRef.current = engine
    audioCtxRef.current = engine.ctx
    initializedRef.current = true
  }, [])

  const stopScheduler = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    if (schedulerTimerRef.current !== null) {
      clearInterval(schedulerTimerRef.current)
      schedulerTimerRef.current = null
    }
    notesInQueueRef.current = []
  }, [])

  const closeAudio = useCallback(() => {
    stopScheduler()
    if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
      audioCtxRef.current.close().catch(() => {})
    }
    audioCtxRef.current = null
    engineRef.current = null
    initializedRef.current = false
  }, [stopScheduler])

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      if (schedulerTimerRef.current !== null) clearInterval(schedulerTimerRef.current)
      if (pulseTimerRef.current !== null) clearTimeout(pulseTimerRef.current)
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(() => {})
      }
    }
  }, [])

  const playNote = useCallback((freq: number, vol: number, _decay: number) => {
    const engine = engineRef.current
    if (!engine || !audioCtxRef.current) return
    const isAccent = freq >= 800
    engine.playMetronomeClick(isAccent, 1, soundStyleRef.current, vol)
  }, [])

  const scheduleNotes = useCallback(() => {
    const ctx = audioCtxRef.current
    if (!ctx) return

    const subd = subdivisions.find(s => s.value === subdRef.current)
    const clicksPerBeat = subd ? subd.clicks : 1

    while (nextNoteTimeRef.current < ctx.currentTime + SCHEDULER_LOOKAHEAD) {
      const isSubdClick = subdBeatRef.current > 0
      const beatIdx = currentBeatRef.current % beatStatesRef.current.length
      const state = beatStatesRef.current[beatIdx]

      if (!isSubdClick) {
        const { frequency, gain, decay } = BEAT_SOUNDS[state]
        const vol = gain * volumeRef.current
        if (vol > 0) playNote(frequency, vol, decay)

        notesInQueueRef.current.push({
          time: nextNoteTimeRef.current,
          beatIndex: beatIdx,
          beatState: state,
          isSubdivision: false,
        })
      } else {
        const subdState: BeatState = state === "M" ? "M" : "N"
        const { frequency, gain, decay } = BEAT_SOUNDS[subdState]
        const vol = gain * volumeRef.current
        if (vol > 0) playNote(frequency, vol, decay)

        notesInQueueRef.current.push({
          time: nextNoteTimeRef.current,
          beatIndex: beatIdx,
          beatState: subdState,
          isSubdivision: true,
        })
      }

      const secondsPerBeat = 60.0 / bpmRef.current
      nextNoteTimeRef.current += secondsPerBeat / clicksPerBeat

      subdBeatRef.current = (subdBeatRef.current + 1) % clicksPerBeat
      if (subdBeatRef.current === 0) {
        currentBeatRef.current = (currentBeatRef.current + 1) % numBeatsRef.current
      }
    }
  }, [playNote])

  const animationLoop = useCallback(() => {
    const ctx = audioCtxRef.current
    if (!ctx) return

    const now = ctx.currentTime
    const queue = notesInQueueRef.current

    while (queue.length > 0) {
      if (now - queue[0].time > 0.2) {
        queue.shift()
        continue
      }
      if (queue[0].time > now) break
      const note = queue.shift()!

      if (!note.isSubdivision) {
        setBeat(note.beatIndex)
      }

      if (note.beatState !== "M") {
        if (pulseTimerRef.current !== null) clearTimeout(pulseTimerRef.current)
        setPulseState(note.beatState)
        setPulseActive(true)
        pulseTimerRef.current = setTimeout(() => setPulseActive(false), 150)
      }
    }

    rafRef.current = requestAnimationFrame(animationLoop)
  }, [])

  const startScheduler = useCallback(() => {
    const ctx = audioCtxRef.current
    if (!ctx) return

    currentBeatRef.current = 0
    subdBeatRef.current = 0
    nextNoteTimeRef.current = ctx.currentTime + 0.05
    notesInQueueRef.current = []

    schedulerTimerRef.current = setInterval(scheduleNotes, SCHEDULER_INTERVAL)
    rafRef.current = requestAnimationFrame(animationLoop)
  }, [scheduleNotes, animationLoop])

  useEffect(() => {
    playingRef.current = playing
    if (playing) {
      initAudio()
      const ctx = audioCtxRef.current
      if (!ctx) return
      if (ctx.state === "suspended") ctx.resume()
      startScheduler()
    } else {
      stopScheduler()
      setBeat(-1)
      setPulseActive(false)
      if (pulseTimerRef.current !== null) clearTimeout(pulseTimerRef.current)
      notesInQueueRef.current = []
    }
  }, [playing, initAudio, startScheduler, stopScheduler])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === "INPUT") return
      if (e.code === "Space") {
        e.preventDefault()
        setPlaying(p => !p)
      }
      if (e.code === "KeyT") {
        e.preventDefault()
        fireTap()
      }
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleBpmInput = useCallback((val: number) => {
    const clamped = Math.max(20, Math.min(300, val))
    setBpm(clamped)
    bpmRef.current = clamped
    localStorage.setItem("taptempo_last_bpm", String(clamped))
  }, [])

  const fireTap = useCallback(() => {
    const now = Date.now()
    if (tapResetTimerRef.current) clearTimeout(tapResetTimerRef.current)

    const timestamps = tapTimestampsRef.current
    if (timestamps.length > 0 && now - timestamps[timestamps.length - 1] > RESET_MS) {
      tapTimestampsRef.current = []
      setTapPulse(false)
    }

    tapTimestampsRef.current = [...tapTimestampsRef.current.slice(-(MAX_TAPS - 1)), now]
    const calculated = calcBpm(tapTimestampsRef.current)
    if (calculated !== null) {
      handleBpmInput(calculated)
    }

    setTapPulse(true)
    setTimeout(() => setTapPulse(false), 120)

    tapResetTimerRef.current = setTimeout(() => {
      tapTimestampsRef.current = []
      setTapPulse(false)
    }, RESET_MS)
  }, [handleBpmInput])

  const cycleBeatState = useCallback((index: number) => {
    setBeatStates(prev => {
      const next = [...prev]
      const order: BeatState[] = ["A", "N", "G", "M"]
      const currentIdx = order.indexOf(next[index])
      next[index] = order[(currentIdx + 1) % order.length]
      return next
    })
  }, [])

  const numBeats = parseInt(signature.split("/")[0])

  return (
    <div className="w-full max-w-3xl rounded-2xl bg-white border shadow-sm px-6 py-6">
      {/* BPM + Tap Button Row */}
      <div className="flex items-center justify-center gap-4 mb-1">
        <div className="relative flex items-center justify-center">
          {/* Pulse Ring SVG */}
          <svg
            className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-100 ${
              pulseActive ? "opacity-100" : "opacity-0"
            }`}
            viewBox="0 0 200 100"
            preserveAspectRatio="xMidYMid meet"
          >
            <circle
              cx="100"
              cy="50"
              r="42"
              fill="none"
              stroke="#1565FF"
              strokeWidth="2"
              className={`transition-all duration-150 ease-out ${
                pulseActive
                  ? pulseState === "A"
                    ? "opacity-40 scale-100"
                    : "opacity-20 scale-100"
                  : "opacity-0 scale-90"
              }`}
              style={{ transformOrigin: "100px 50px", transform: pulseActive ? "scale(1.15)" : "scale(1)" }}
            />
            {pulseActive && pulseState === "A" && (
              <circle
                cx="100"
                cy="50"
                r="42"
                fill="#1565FF"
                opacity="0.06"
              />
            )}
          </svg>

          <div className="relative flex items-baseline gap-2 z-10">
            <span className="font-mono text-5xl md:text-6xl font-bold text-[#444] tracking-tight leading-none">
              {bpm}
            </span>
            <span className="text-base font-medium text-muted-foreground">BPM</span>
          </div>
        </div>

        <button
          onPointerDown={e => { e.preventDefault(); fireTap() }}
          className={`
            relative flex flex-col items-center justify-center
            w-14 h-14 rounded-xl border-2 select-none cursor-pointer
            transition-all duration-100 active:scale-95 shrink-0
            ${tapPulse
              ? "border-[#1565FF] bg-[#1565FF]/10"
              : "border-[#D9D9D9] bg-white shadow-sm hover:border-[#1565FF] hover:shadow-md"
            }
          `}
        >
          <Hand size={18} className={`mb-0.5 transition-colors ${tapPulse ? "text-[#1565FF]" : "text-[#888]"}`} />
          <span className={`text-[8px] font-bold uppercase tracking-[0.15em] transition-colors ${tapPulse ? "text-[#1565FF]" : "text-[#999]"}`}>
            TAP
          </span>
          {tapPulse && (
            <span className="absolute inset-0 rounded-xl border-2 border-[#1565FF] animate-ping opacity-30" />
          )}
        </button>
      </div>

      {/* Helper text */}
      <div className="h-4 flex items-center justify-center mb-4">
        <span className="text-[11px] text-muted-foreground/60 font-mono">
          Tap the button or press <kbd className="px-1 py-0.5 rounded bg-muted text-muted-foreground text-[9px] font-sans">T</kbd> to set BPM
        </span>
      </div>

      {/* BPM Slider */}
      <div className="mb-5">
        <Slider
          value={[bpm]}
          min={20}
          max={300}
          onValueChange={v => handleBpmInput(v[0])}
          className="w-full [&_[role=slider]]:bg-white [&_[role=slider]]:border-[#D9D9D9] [&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:shadow-sm [&_.relative]:bg-[#D9D9D9] [&_.absolute]:bg-[#1565FF]"
        />
      </div>

      {/* Beat Dots - Interactive */}
      <div className="flex justify-center gap-3 mb-5">
        {Array.from({ length: numBeats }).map((_, i) => {
          const state = beatStates[i] || "N"
          const isActive = i === beat
          let dotClass = ""
          if (isActive && state !== "M") {
            dotClass = "bg-[#1565FF] scale-125 shadow-[0_0_8px_rgba(21,101,255,0.35)]"
          } else {
            switch (state) {
              case "A": dotClass = "bg-[#1565FF]"; break
              case "N": dotClass = "bg-[#1565FF]/40"; break
              case "G": dotClass = "bg-[#D9D9D9]"; break
              case "M": dotClass = "border-2 border-dashed border-[#999] bg-transparent"; break
            }
          }
          return (
            <button
              key={i}
              onClick={() => cycleBeatState(i)}
              className={`w-4 h-4 rounded-full transition-all duration-75 cursor-pointer hover:scale-110 ${dotClass}`}
              title={`Beat ${i + 1}: ${state === "A" ? "Accent" : state === "N" ? "Normal" : state === "G" ? "Ghost" : "Mute"} (click to change)`}
            />
          )
        })}
      </div>

      {/* START/STOP Button */}
      <div className="flex justify-center mb-5">
        <button
          onClick={() => setPlaying(p => !p)}
          className={`
            w-44 h-12 rounded-full text-sm font-bold tracking-wider uppercase
            transition-all duration-150 active:scale-95
            ${playing
              ? "bg-[#FF3B30] text-white hover:bg-[#FF3B30]/90"
              : "bg-[#1565FF] text-white hover:bg-[#1565FF]/90 shadow-sm"
            }
          `}
        >
          {playing ? "STOP" : "START"}
        </button>
      </div>

      {/* Time Signatures */}
      <div className="flex justify-center gap-1.5 mb-5">
        {["2/4", "3/4", "4/4", "5/4", "6/8", "7/8"].map(sig => (
          <button
            key={sig}
            onClick={() => setSignature(sig)}
            className={`
              px-3 py-1 rounded-full text-xs font-medium transition-all
              ${signature === sig
                ? "bg-[#1565FF] text-white"
                : "bg-transparent text-[#666] hover:text-[#1565FF] hover:bg-[#1565FF]/5"
              }
            `}
          >
            {sig}
          </button>
        ))}
      </div>

      {/* Sound Style */}
      <div className="flex justify-center gap-1.5 mb-5">
        {(["click", "beep", "woodblock"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setSoundStyle(s)}
            className={`
              px-3 py-1 rounded-full text-xs font-medium transition-all capitalize
              ${soundStyle === s
                ? "bg-[#1565FF] text-white"
                : "bg-transparent text-[#666] hover:text-[#1565FF] hover:bg-[#1565FF]/5"
              }
            `}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Subdivisions */}
      {showSubdivisions && (
        <div className="flex justify-center gap-1.5 mb-5">
          {subdivisions.map((s) => (
            <button
              key={s.value}
              onClick={() => setSubdivision(s.value)}
              className={`
                px-3 py-1 rounded-full text-xs font-medium transition-all
                ${subdivision === s.value
                  ? "bg-[#1565FF] text-white"
                  : "bg-transparent text-[#666] hover:text-[#1565FF] hover:bg-[#1565FF]/5"
                }
              `}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}

      {/* Tempo Presets */}
      <div className="flex justify-center gap-1.5 mb-5 flex-wrap">
        {presets.map(p => (
          <button
            key={p.label}
            onClick={() => handleBpmInput(p.val)}
            className="px-3 py-1 rounded-full text-xs border border-[#D9D9D9] text-[#666] bg-white hover:text-[#1565FF] hover:border-[#1565FF] transition-all shadow-sm"
          >
            {p.label} <span className="opacity-50 ml-0.5">{p.val}</span>
          </button>
        ))}
      </div>

      {/* Volume */}
      <div className="w-full max-w-[200px] mx-auto flex items-center gap-3">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground shrink-0">VOL</span>
        <Slider
          value={[Math.round(volume * 100)]}
          onValueChange={v => setVolume(v[0] / 100)}
          max={100}
          className="flex-1 [&_[role=slider]]:bg-white [&_[role=slider]]:border-[#D9D9D9] [&_[role=slider]]:h-3.5 [&_[role=slider]]:w-3.5 [&_[role=slider]]:shadow-sm [&_.relative]:bg-[#D9D9D9] [&_.absolute]:bg-[#1565FF]"
        />
      </div>
    </div>
  )
}
