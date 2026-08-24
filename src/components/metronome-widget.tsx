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
  defaultBpm?: number
  defaultSignature?: string
  defaultBeatStates?: BeatState[]
  defaultGapClick?: boolean
  defaultPlayBars?: number
  defaultSilentBars?: number
  defaultRandomMute?: boolean
  defaultRandomMutePercent?: number
}

export function MetronomeWidget({
  defaultSubdivision = "quarter",
  showSubdivisions = true,
  defaultBpm,
  defaultSignature,
  defaultBeatStates,
  defaultGapClick,
  defaultPlayBars,
  defaultSilentBars,
  defaultRandomMute,
  defaultRandomMutePercent,
}: MetronomeWidgetProps) {
  const [bpm, setBpm] = useState(defaultBpm ?? 120)
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(0.8)
  const [signature, setSignature] = useState(defaultSignature ?? "4/4")
  const [beat, setBeat] = useState(-1)
  const [soundStyle, setSoundStyle] = useState<"click" | "beep" | "woodblock">("click")
  const [subdivision, setSubdivision] = useState<Subdivision>(defaultSubdivision)
  const [tapPulse, setTapPulse] = useState(false)
  const [beatStates, setBeatStates] = useState<BeatState[]>(defaultBeatStates ?? ["N", "N", "N", "N"])
  const [pulseActive, setPulseActive] = useState(false)
  const [pulseState, setPulseState] = useState<BeatState>("N")
  const [isGapActive, setIsGapActive] = useState(defaultGapClick ?? false)
  const [playBars, setPlayBars] = useState(defaultPlayBars ?? 2)
  const [silentBars, setSilentBars] = useState(defaultSilentBars ?? 2)
  const [isRandomMuteActive, setIsRandomMuteActive] = useState(defaultRandomMute ?? false)
  const [randomMutePercent, setRandomMutePercent] = useState(defaultRandomMutePercent ?? 15)

  const tapTimestampsRef = useRef<number[]>([])
  const tapResetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const rafRef = useRef<number | null>(null)
  const schedulerTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const nextNoteTimeRef = useRef(0)
  const currentBeatRef = useRef(0)
  const subdBeatRef = useRef(0)
  const notesInQueueRef = useRef<QueueNote[]>([])
  const scheduleNotesRef = useRef<(() => void) | null>(null)

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
  const gapClickRef = useRef(defaultGapClick ?? false)
  const playBarsRef = useRef(defaultPlayBars ?? 2)
  const silentBarsRef = useRef(defaultSilentBars ?? 2)
  const isRandomMuteRef = useRef(defaultRandomMute ?? false)
  const randomMutePercentRef = useRef(defaultRandomMutePercent ?? 25)
  const playingRef = useRef(false)
  const pulseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const barBeatCountRef = useRef(0)
  const barCountRef = useRef(0)

  useEffect(() => { bpmRef.current = bpm }, [bpm])
  useEffect(() => { volumeRef.current = volume }, [volume])
  useEffect(() => { soundStyleRef.current = soundStyle }, [soundStyle])
  useEffect(() => { subdRef.current = subdivision }, [subdivision])
  useEffect(() => { beatStatesRef.current = beatStates }, [beatStates])
  useEffect(() => { signatureRef.current = signature }, [signature])
  useEffect(() => { gapClickRef.current = isGapActive }, [isGapActive])
  useEffect(() => { playBarsRef.current = playBars }, [playBars])
  useEffect(() => { silentBarsRef.current = silentBars }, [silentBars])
  useEffect(() => { isRandomMuteRef.current = isRandomMuteActive }, [isRandomMuteActive])
  useEffect(() => { randomMutePercentRef.current = randomMutePercent }, [randomMutePercent])

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
    if (defaultBpm !== undefined) return
    const saved = localStorage.getItem("taptempo_last_bpm")
    if (saved) {
      const parsed = parseInt(saved, 10)
      if (!isNaN(parsed)) setBpm(Math.max(20, Math.min(300, parsed)))
    }
  }, [defaultBpm])

  const initAudio = useCallback(() => {
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
    const numBeats = numBeatsRef.current

    while (nextNoteTimeRef.current < ctx.currentTime + SCHEDULER_LOOKAHEAD) {
      const isSubdClick = subdBeatRef.current > 0
      const beatIdx = currentBeatRef.current % beatStatesRef.current.length
      const state = beatStatesRef.current[beatIdx]

      let isMuted = false

      if (!isSubdClick) {
        const isNewBar = barBeatCountRef.current === 0
        if (isNewBar && gapClickRef.current) {
          const totalBars = playBarsRef.current + silentBarsRef.current
          const currentBar = barCountRef.current % totalBars
          isMuted = currentBar >= playBarsRef.current
        }
        if (!isMuted && isRandomMuteRef.current && randomMutePercentRef.current > 0) {
          isMuted = Math.random() * 100 < randomMutePercentRef.current
        }

        barBeatCountRef.current++
        if (barBeatCountRef.current >= numBeats) {
          barBeatCountRef.current = 0
          barCountRef.current++
        }
      } else {
        if (gapClickRef.current) {
          const totalBars = playBarsRef.current + silentBarsRef.current
          const currentBar = barCountRef.current % totalBars
          isMuted = currentBar >= playBarsRef.current
        }
        if (!isMuted && isRandomMuteRef.current && randomMutePercentRef.current > 0) {
          isMuted = Math.random() * 100 < randomMutePercentRef.current
        }
      }

      const finalState: BeatState = isMuted ? "M" : state
      const { frequency, gain, decay } = BEAT_SOUNDS[finalState]
      const vol = gain * volumeRef.current
      if (vol > 0) playNote(frequency, vol, decay)

      notesInQueueRef.current.push({
        time: nextNoteTimeRef.current,
        beatIndex: beatIdx,
        beatState: finalState,
        isSubdivision: isSubdClick,
      })

      const secondsPerBeat = 60.0 / bpmRef.current
      nextNoteTimeRef.current += secondsPerBeat / clicksPerBeat

      subdBeatRef.current = (subdBeatRef.current + 1) % clicksPerBeat
      if (subdBeatRef.current === 0) {
        currentBeatRef.current = (currentBeatRef.current + 1) % numBeats
      }
    }
  }, [playNote])

  // Keep ref always current so scheduler never hits stale closure
  useEffect(() => { scheduleNotesRef.current = scheduleNotes }, [scheduleNotes])

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

      if (note.beatState !== "M" && !note.isSubdivision) {
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
    barBeatCountRef.current = 0
    barCountRef.current = 0
    nextNoteTimeRef.current = ctx.currentTime + 0.05
    notesInQueueRef.current = []

    // Use ref so the interval always calls the latest scheduleNotes
    schedulerTimerRef.current = setInterval(() => scheduleNotesRef.current?.(), SCHEDULER_INTERVAL)
    rafRef.current = requestAnimationFrame(animationLoop)
  }, [animationLoop])

  useEffect(() => {
    playingRef.current = playing
    if (playing) {
      initAudio()
      const ctx = audioCtxRef.current
      if (!ctx) return
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {})
      }
      startScheduler()
    } else {
      stopScheduler()
      setBeat(-1)
      setPulseActive(false)
      if ( pulseTimerRef.current !== null) clearTimeout(pulseTimerRef.current)
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
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      {/* ── LEFT COLUMN ──────────────────────────────────────── */}
      <div className="lg:col-span-5 h-full flex flex-col justify-between items-center py-2 rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
        {/* BPM Pulse Ring + TAP */}
        <div className="flex items-center justify-center gap-4">
          <div className="relative flex items-center justify-center w-[140px] h-[140px]">
            <svg
              className="absolute inset-0 m-auto pointer-events-none"
              width="140"
              height="140"
              viewBox="0 0 160 160"
            >
              {/* Idle ring — always visible at 40% */}
              <circle cx="80" cy="80" r="68" fill="none" stroke="#1565FF" strokeWidth="3"
                strokeOpacity="0.4"
                className="transition-all duration-150 ease-out"
                style={{ transformOrigin: "80px 80px", transform: "scale(1)" }}
              />
              {/* Active pulse ring — scales up and brightens on beat */}
              <circle cx="80" cy="80" r="68" fill="none" stroke="#1565FF" strokeWidth="3"
                className={`transition-all duration-150 ease-out ${
                  pulseActive
                    ? pulseState === "A"
                      ? "opacity-100"
                      : "opacity-70"
                    : "opacity-0"
                }`}
                style={{ transformOrigin: "80px 80px", transform: pulseActive ? "scale(1.05)" : "scale(1)" }}
              />
              {/* Accent fill glow */}
              {pulseActive && pulseState === "A" && <circle cx="80" cy="80" r="68" fill="#1565FF" opacity="0.08" />}
            </svg>
            <div className="relative flex flex-col items-center justify-center z-10">
              <span className="font-mono text-3xl font-extrabold tracking-tight text-gray-900 leading-none">
                {bpm}
              </span>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mt-0.5">BPM</span>
            </div>
          </div>

          <button
            onPointerDown={e => { e.preventDefault(); fireTap() }}
            className={`relative flex flex-col items-center justify-center w-12 h-12 rounded-xl border-2 select-none cursor-pointer transition-all duration-100 active:scale-95 shrink-0 ${
              tapPulse ? "border-[#1565FF] bg-[#1565FF]/10" : "border-[#D9D9D9] bg-white shadow-sm hover:border-[#1565FF] hover:shadow-md"
            }`}
          >
            <Hand size={16} className={`mb-0.5 transition-colors ${tapPulse ? "text-[#1565FF]" : "text-[#888]"}`} />
            <span className={`text-[7px] font-bold uppercase tracking-[0.15em] transition-colors ${tapPulse ? "text-[#1565FF]" : "text-[#999]"}`}>
              TAP
            </span>
            {tapPulse && <span className="absolute inset-0 rounded-xl border-2 border-[#1565FF] animate-ping opacity-30" />}
          </button>
        </div>

        {/* Helper */}
        <p className="text-center text-[10px] text-muted-foreground/60 font-mono leading-none">
          Press <kbd className="px-1 py-0.5 rounded bg-muted text-muted-foreground text-[9px] font-sans">T</kbd> or tap
        </p>

        {/* Beat Dots */}
        <div className="flex justify-center gap-3">
          {Array.from({ length: numBeats }).map((_, i) => {
            const state = beatStates[i] || "N"
            const isActive = i === beat && playing
            const dotClass = isActive && state !== "M"
              ? "bg-[#1565FF] scale-125 shadow-[0_0_12px_rgba(21,101,255,0.6)]"
              : "bg-[#E5E7EB] hover:bg-[#D1D5DB] border border-[#D9D9D9]"
            return (
              <button key={i} onClick={() => cycleBeatState(i)}
                className={`w-4 h-4 rounded-full transition-all duration-75 cursor-pointer hover:scale-110 ${dotClass}`}
                title={`Beat ${i + 1}: ${state === "A" ? "Accent" : state === "N" ? "Normal" : state === "G" ? "Ghost" : "Mute"} (click to change)`}
              />
            )
          })}
        </div>

        {/* START / STOP */}
        <button onClick={() => setPlaying(p => !p)}
          className={`w-full py-3.5 rounded-full text-base font-semibold transition-all duration-200 shadow-md active:scale-95 ${
            playing
              ? "bg-[#FF3B30] hover:bg-[#E03126] text-white"
              : "bg-[#1565FF] hover:bg-[#0D52D6] text-white"
          }`}
        >
          {playing ? "STOP" : "START"}
        </button>

        {/* Sliders */}
        <div className="flex flex-col gap-5 w-full mt-2">
          {/* BPM Slider */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-500 w-10 uppercase tracking-wider shrink-0">BPM</span>
            <Slider
              value={[bpm]} min={20} max={300}
              onValueChange={v => handleBpmInput(v[0])}
              className="flex-1 [&_[role=slider]]:bg-white [&_[role=slider]]:border-[#D9D9D9] [&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:shadow-sm [&_.relative]:bg-[#D9D9D9] [&_.absolute]:bg-[#1565FF]"
            />
          </div>

          {/* Volume Slider */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-500 w-10 uppercase tracking-wider shrink-0">VOL</span>
            <Slider
              value={[Math.round(volume * 100)]} max={100}
              onValueChange={v => setVolume(v[0] / 100)}
              className="flex-1 [&_[role=slider]]:bg-white [&_[role=slider]]:border-[#D9D9D9] [&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:shadow-sm [&_.relative]:bg-[#D9D9D9] [&_.absolute]:bg-[#1565FF]"
            />
          </div>
        </div>
      </div>

      {/* ── RIGHT COLUMN ─────────────────────────────────────── */}
      <div className="lg:col-span-7 h-full flex flex-col justify-between rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
        {/* Time Signatures */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground block mb-2">Time Signature</span>
          <div className="flex gap-1.5 flex-wrap">
            {["2/4", "3/4", "4/4", "5/4", "6/8", "7/8"].map(sig => (
              <button key={sig} onClick={() => setSignature(sig)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  signature === sig ? "bg-[#1565FF] text-white" : "bg-transparent text-[#666] hover:text-[#1565FF] hover:bg-[#1565FF]/5"
                }`}
              >{sig}</button>
            ))}
          </div>
        </div>

        {/* Sound Style */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground block mb-2">Sound</span>
          <div className="flex gap-1.5">
            {(["click", "beep", "woodblock"] as const).map(s => (
              <button key={s} onClick={() => setSoundStyle(s)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all capitalize ${
                  soundStyle === s ? "bg-[#1565FF] text-white" : "bg-transparent text-[#666] hover:text-[#1565FF] hover:bg-[#1565FF]/5"
                }`}
              >{s}</button>
            ))}
          </div>
        </div>

        {/* Subdivisions */}
        {showSubdivisions && (
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground block mb-2">Subdivisions</span>
            <div className="flex gap-1.5">
              {subdivisions.map(s => (
                <button key={s.value} onClick={() => setSubdivision(s.value)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    subdivision === s.value ? "bg-[#1565FF] text-white" : "bg-transparent text-[#666] hover:text-[#1565FF] hover:bg-[#1565FF]/5"
                  }`}
                >{s.label}</button>
              ))}
            </div>
          </div>
        )}

        {/* Tempo Presets */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground block mb-2">Tempo Presets</span>
          <div className="flex gap-1.5 flex-wrap">
            {presets.map(p => (
              <button key={p.label} onClick={() => handleBpmInput(p.val)}
                className="px-3 py-1 rounded-full text-xs border border-[#D9D9D9] text-[#666] bg-white hover:text-[#1565FF] hover:border-[#1565FF] transition-all shadow-sm"
              >{p.label} <span className="opacity-50 ml-0.5">{p.val}</span></button>
            ))}
          </div>
        </div>

        {/* Practice Tools */}
        <div className="flex-1 border-t border-gray-200 pt-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground block mb-2">Practice Tools</span>

          {/* Gap Click */}
          <div className="flex items-center justify-between py-1">
            <span className="text-xs font-medium text-[#666]">Gap Click</span>
            <button role="switch" aria-checked={isGapActive} onClick={() => setIsGapActive(g => !g)}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565FF] focus-visible:ring-offset-2 ${
                isGapActive ? "bg-[#1565FF]" : "bg-[#D9D9D9]"
              }`}
            >
              <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out mt-0.5 ${
                isGapActive ? "translate-x-4" : "translate-x-0.5"
              }`} />
            </button>
          </div>
          {isGapActive && (
            <div className="flex items-center gap-2 pl-2 pb-1">
              <span className="text-[10px] text-muted-foreground shrink-0">Play</span>
              <input type="number" min={1} max={16} value={playBars}
                onChange={e => setPlayBars(Math.max(1, Math.min(16, parseInt(e.target.value) || 1)))}
                className="w-10 text-center text-xs border border-[#D9D9D9] rounded px-1 py-0.5 bg-white"
              />
              <span className="text-[10px] text-muted-foreground shrink-0">Silent</span>
              <input type="number" min={1} max={16} value={silentBars}
                onChange={e => setSilentBars(Math.max(1, Math.min(16, parseInt(e.target.value) || 1)))}
                className="w-10 text-center text-xs border border-[#D9D9D9] rounded px-1 py-0.5 bg-white"
              />
              <span className="text-[10px] text-muted-foreground/50 shrink-0">bars</span>
            </div>
          )}

          {/* Random Mute */}
          <div className="flex items-center justify-between py-1">
            <span className="text-xs font-medium text-[#666]">Random Mute</span>
            <button role="switch" aria-checked={isRandomMuteActive} onClick={() => setIsRandomMuteActive(r => !r)}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565FF] focus-visible:ring-offset-2 ${
                isRandomMuteActive ? "bg-[#1565FF]" : "bg-[#D9D9D9]"
              }`}
            >
              <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out mt-0.5 ${
                isRandomMuteActive ? "translate-x-4" : "translate-x-0.5"
              }`} />
            </button>
          </div>
          {isRandomMuteActive && (
            <div className="flex items-center gap-2 pl-2 pb-1">
              <Slider value={[randomMutePercent]} min={0} max={50}
                onValueChange={v => setRandomMutePercent(v[0])}
                className="flex-1 [&_[role=slider]]:bg-white [&_[role=slider]]:border-[#D9D9D9] [&_[role=slider]]:h-3 [&_[role=slider]]:w-3 [&_[role=slider]]:shadow-sm [&_.relative]:bg-[#D9D9D9] [&_.absolute]:bg-[#1565FF]"
              />
              <span className="text-xs font-mono text-muted-foreground w-8 text-right shrink-0">{randomMutePercent}%</span>
            </div>
          )}

          {/* Quick Presets */}
          <div className="flex gap-1.5 flex-wrap mt-2">
            {[
              { label: "1/16 Mode", action: () => { setSubdivision("sixteenth"); setSignature("4/4"); setIsGapActive(false); setIsRandomMuteActive(false); setPlaying(true) } },
              { label: "Guitar", action: () => { handleBpmInput(90); setSignature("4/4"); setSubdivision("quarter"); setBeatStates(["A", "N", "A", "N"]); setIsGapActive(false); setIsRandomMuteActive(false); setPlaying(true) } },
              { label: "Drummer", action: () => { handleBpmInput(120); setSignature("4/4"); setSubdivision("quarter"); setBeatStates(["N", "N", "N", "N"]); setIsGapActive(true); setPlayBars(2); setSilentBars(2); setIsRandomMuteActive(true); setRandomMutePercent(15); setPlaying(true) } },
            ].map(p => (
              <button key={p.label} onClick={p.action}
                className="px-3 py-1 rounded-full text-xs font-medium border border-[#D9D9D9] text-[#666] bg-white hover:text-[#1565FF] hover:border-[#1565FF] transition-all shadow-sm"
              >{p.label}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
