"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { AudioEngine } from "@/lib/audio-engine"
import { MetronomeSeoContent } from "@/components/metronome-seo-content"
import { Slider } from "@/components/ui/slider"
import { Hand } from "lucide-react"

const MAX_TAPS = 8
const RESET_MS = 3000

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

export default function MetronomePage() {
  const [bpm, setBpm] = useState(120)
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(0.8)
  const [signature, setSignature] = useState("4/4")
  const [beat, setBeat] = useState(-1)
  const [soundStyle, setSoundStyle] = useState<"click" | "beep" | "woodblock">("click")

  const [tapBpm, setTapBpm] = useState<number | null>(null)
  const [tapCount, setTapCount] = useState(0)
  const [tapPulse, setTapPulse] = useState(false)
  const tapTimestampsRef = useRef<number[]>([])
  const tapResetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const rafRef = useRef<number | null>(null)
  const nextNoteTimeRef = useRef(0)
  const currentBeatRef = useRef(0)

  const bpmRef = useRef(bpm)
  const volumeRef = useRef(volume)
  const numBeatsRef = useRef(parseInt(signature.split("/")[0]))
  const soundStyleRef = useRef<"click" | "beep" | "woodblock">("click")

  useEffect(() => { bpmRef.current = bpm }, [bpm])
  useEffect(() => { volumeRef.current = volume }, [volume])
  useEffect(() => { numBeatsRef.current = parseInt(signature.split("/")[0]) }, [signature])
  useEffect(() => { soundStyleRef.current = soundStyle }, [soundStyle])

  const numBeats = parseInt(signature.split("/")[0])

  useEffect(() => {
    const saved = localStorage.getItem("taptempo_last_bpm")
    if (saved) {
      const parsed = parseInt(saved, 10)
      if (!isNaN(parsed)) setBpm(Math.max(20, Math.min(300, parsed)))
    }
  }, [])

  const stopScheduler = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [])

  const scheduler = useCallback(() => {
    const engine = AudioEngine.getInstance()
    const ctx = engine.ctx
    if (!ctx) return
    while (nextNoteTimeRef.current < ctx.currentTime + 0.1) {
      const isAccent = currentBeatRef.current === 0
      engine.playMetronomeClick(isAccent, volumeRef.current, soundStyleRef.current)
      setBeat(currentBeatRef.current)
      const secondsPerBeat = 60.0 / bpmRef.current
      nextNoteTimeRef.current += secondsPerBeat
      currentBeatRef.current = (currentBeatRef.current + 1) % numBeatsRef.current
    }
    rafRef.current = requestAnimationFrame(scheduler)
  }, [])

  const restartScheduler = useCallback(() => {
    stopScheduler()
    const engine = AudioEngine.getInstance()
    const ctx = engine.ctx
    if (ctx) {
      currentBeatRef.current = 0
      nextNoteTimeRef.current = ctx.currentTime + 0.05
      rafRef.current = requestAnimationFrame(scheduler)
    }
  }, [scheduler, stopScheduler])

  useEffect(() => {
    if (playing) {
      const engine = AudioEngine.getInstance()
      engine.init()
      const ctx = engine.ctx
      if (!ctx) return
      if (ctx.state === "suspended") ctx.resume()
      currentBeatRef.current = 0
      nextNoteTimeRef.current = ctx.currentTime + 0.05
      rafRef.current = requestAnimationFrame(scheduler)
    } else {
      stopScheduler()
      setBeat(-1)
    }
    return stopScheduler
  }, [playing, scheduler, stopScheduler])

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

  const handleBpmInput = (val: number) => {
    const clamped = Math.max(20, Math.min(300, val))
    setBpm(clamped)
    if (playing) restartScheduler()
  }

  const fireTap = useCallback(() => {
    const now = Date.now()

    if (tapResetTimerRef.current) clearTimeout(tapResetTimerRef.current)

    const timestamps = tapTimestampsRef.current
    if (timestamps.length > 0 && now - timestamps[timestamps.length - 1] > RESET_MS) {
      tapTimestampsRef.current = []
      setTapCount(0)
      setTapBpm(null)
    }

    tapTimestampsRef.current = [...tapTimestampsRef.current.slice(-(MAX_TAPS - 1)), now]
    const newCount = tapTimestampsRef.current.length
    setTapCount(newCount)

    const calculated = calcBpm(tapTimestampsRef.current)
    if (calculated !== null) {
      setTapBpm(calculated)
      handleBpmInput(calculated)
    }

    setTapPulse(true)
    setTimeout(() => setTapPulse(false), 120)

    tapResetTimerRef.current = setTimeout(() => {
      tapTimestampsRef.current = []
      setTapCount(0)
      setTapBpm(null)
    }, RESET_MS)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col items-center px-4 py-4 bg-background">
      <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight mb-1 text-foreground">Metronome</h1>
      <p className="text-muted-foreground text-sm mb-4">Free metronome tool for rhythm practice, tempo control, and timing</p>

      {/* Light Card */}
      <div className="w-full max-w-3xl rounded-2xl bg-white border shadow-sm px-6 py-6">

        {/* BPM + Tap Button Row */}
        <div className="flex items-center justify-center gap-4 mb-1">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-5xl md:text-6xl font-bold text-[#444] tracking-tight leading-none">
              {bpm}
            </span>
            <span className="text-base font-medium text-muted-foreground">BPM</span>
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

        {/* Beat Dots */}
        <div className="flex justify-center gap-3 mb-5">
          {Array.from({ length: numBeats }).map((_, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full transition-all duration-75 ${
                i === beat
                  ? "bg-[#1565FF] scale-125 shadow-[0_0_8px_rgba(21,101,255,0.35)]"
                  : "bg-[#D9D9D9]"
              }`}
            />
          ))}
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

      <MetronomeSeoContent />
    </div>
  )
}
