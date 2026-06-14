"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { AudioEngine } from "@/lib/audio-engine"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
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

  // Tap state
  const [tapBpm, setTapBpm] = useState<number | null>(null)
  const [tapCount, setTapCount] = useState(0)
  const [tapPulse, setTapPulse] = useState(false)
  const tapTimestampsRef = useRef<number[]>([])
  const tapResetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Scheduler refs
  const rafRef = useRef<number | null>(null)
  const nextNoteTimeRef = useRef(0)
  const currentBeatRef = useRef(0)

  const bpmRef = useRef(bpm)
  const volumeRef = useRef(volume)
  const numBeatsRef = useRef(parseInt(signature.split("/")[0]))

  useEffect(() => { bpmRef.current = bpm }, [bpm])
  useEffect(() => { volumeRef.current = volume }, [volume])
  useEffect(() => { numBeatsRef.current = parseInt(signature.split("/")[0]) }, [signature])

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
      engine.playMetronomeClick(isAccent, volumeRef.current)
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
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-serif font-bold tracking-tight mb-2">Metronome</h1>
        <p className="text-muted-foreground">Precision audio engine metronome for practice.</p>
      </div>

      <div className="rounded-3xl border bg-[#111] text-white p-8 shadow-2xl">

        {/* BPM Display + Tap Button */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-end gap-2">
              <Input
                type="number"
                value={bpm}
                onChange={e => handleBpmInput(parseInt(e.target.value) || 120)}
                className="font-mono text-6xl h-24 w-40 text-center bg-transparent border-none focus-visible:ring-0 text-white"
              />
              <span className="text-xl font-medium text-white/50 mb-4">BPM</span>
            </div>

            {/* Inline Tap Button */}
            <button
              onPointerDown={e => { e.preventDefault(); fireTap() }}
              className={`
                relative flex flex-col items-center justify-center
                w-20 h-20 rounded-2xl border-2 select-none cursor-pointer
                transition-all duration-100 active:scale-95
                ${tapPulse
                  ? "border-[#0066FF] bg-[#0066FF]/20 scale-95 shadow-[0_0_20px_rgba(0,102,255,0.4)]"
                  : "border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10"
                }
              `}
            >
              <Hand size={20} className={`mb-1 transition-colors ${tapPulse ? "text-[#0066FF]" : "text-white/60"}`} />
              <span className={`text-[10px] font-semibold uppercase tracking-widest transition-colors ${tapPulse ? "text-[#0066FF]" : "text-white/40"}`}>
                TAP
              </span>
              {tapPulse && (
                <span className="absolute inset-0 rounded-2xl border-2 border-[#0066FF] animate-ping opacity-60" />
              )}
            </button>
          </div>

          {/* Tap feedback row */}
          <div className="h-6 flex items-center gap-3 mb-3">
            {tapCount >= 2 && tapBpm !== null && (
              <span className="text-xs text-[#0066FF] font-mono font-medium animate-in fade-in slide-in-from-bottom-1 duration-200">
                Tapped {tapBpm} BPM
              </span>
            )}
            {tapCount > 0 && (
              <span className="text-xs text-white/30 font-mono">
                {tapCount} tap{tapCount !== 1 ? "s" : ""}
                {tapCount < 2 ? " — tap again" : ""}
              </span>
            )}
            {tapCount === 0 && (
              <span className="text-xs text-white/20 font-mono">
                Tap the button or press <kbd className="px-1 py-0.5 rounded bg-white/10 text-white/40 text-[10px]">T</kbd> to set BPM
              </span>
            )}
          </div>

          <Slider
            value={[bpm]}
            min={20}
            max={300}
            onValueChange={v => handleBpmInput(v[0])}
            className="w-full max-w-md [&_.bg-primary]:bg-[#0066FF]"
          />
        </div>

        {/* Beat Grid */}
        <div className="flex justify-center gap-3 mb-8">
          {Array.from({ length: numBeats }).map((_, i) => (
            <div
              key={i}
              className={`w-6 h-6 rounded-full transition-all duration-75 ${
                i === beat
                  ? "bg-[#0066FF] scale-125 shadow-[0_0_15px_rgba(0,102,255,0.8)]"
                  : "bg-white/10"
              }`}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-8">
          <Button
            size="lg"
            className={`w-48 h-16 rounded-full text-xl font-bold tracking-widest transition-all ${
              playing
                ? "bg-destructive text-white hover:bg-destructive/90"
                : "bg-[#0066FF] hover:bg-[#0052CC] text-white"
            }`}
            onClick={() => setPlaying(p => !p)}
          >
            {playing ? "STOP" : "START"}
          </Button>

          {/* Time Signatures */}
          <div className="flex flex-wrap justify-center gap-2">
            {["2/4", "3/4", "4/4", "5/4", "6/8", "7/8"].map(sig => (
              <Button
                key={sig}
                variant={signature === sig ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setSignature(sig)}
                className={
                  signature === sig
                    ? "bg-white text-black hover:bg-white/90"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                }
              >
                {sig}
              </Button>
            ))}
          </div>

          {/* Tempo Presets */}
          <div className="flex flex-wrap justify-center gap-2">
            {presets.map(p => (
              <Button
                key={p.label}
                variant="outline"
                size="sm"
                onClick={() => handleBpmInput(p.val)}
                className="border-white/20 text-white/80 hover:bg-white/10"
              >
                {p.label} <span className="opacity-50 ml-1">{p.val}</span>
              </Button>
            ))}
          </div>

          {/* Volume */}
          <div className="w-full max-w-sm flex items-center gap-4 opacity-70 hover:opacity-100 transition-opacity">
            <span className="text-xs font-medium uppercase tracking-wider text-white/50">VOL</span>
            <Slider
              value={[Math.round(volume * 100)]}
              onValueChange={v => setVolume(v[0] / 100)}
              max={100}
              className="[&_.bg-primary]:bg-white"
            />
          </div>
        </div>
      </div>

      {/* Keyboard hint */}
      <p className="text-center text-xs text-muted-foreground mt-4">
        <kbd className="px-1.5 py-0.5 rounded bg-muted text-xs">Space</kbd> start / stop &nbsp;·&nbsp;
        <kbd className="px-1.5 py-0.5 rounded bg-muted text-xs">T</kbd> tap tempo
      </p>
    </div>
  )
}
