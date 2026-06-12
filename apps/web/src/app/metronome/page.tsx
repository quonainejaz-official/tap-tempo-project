"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { audioEngine } from "@/lib/audio-engine"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Hand } from "lucide-react"

const presets = [
  { label: "Largo", bpm: 50 },
  { label: "Andante", bpm: 90 },
  { label: "Moderato", bpm: 110 },
  { label: "Allegro", bpm: 140 },
  { label: "Vivace", bpm: 170 },
]

const timeSignatures = ["2/4", "3/4", "4/4", "5/4", "6/8", "7/8"]

export default function MetronomePage() {
  const [bpm, setBpm] = useState(() => {
    if (typeof window !== "undefined") {
      return Number(localStorage.getItem("metronome_bpm")) || 120
    }
    return 120
  })
  const [timeSig, setTimeSig] = useState("4/4")
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentBeat, setCurrentBeat] = useState(0)
  const [tapBpm, setTapBpm] = useState(0)
  const tapTimes = useRef<number[]>([])
  const animFrameRef = useRef<number>(0)
  const nextBeatTime = useRef(0)
  const beatIndex = useRef(0)

  const numBeats = Number(timeSig.split("/")[0])

  const scheduleBeat = useCallback(() => {
    const now = audioEngine.init()
    const interval = 60000 / bpm

    while (nextBeatTime.current < now + 0.1) {
      const accent = beatIndex.current === 0
      audioEngine.playMetronomeClick(accent, 0.4)
      setCurrentBeat(beatIndex.current)
      beatIndex.current = (beatIndex.current + 1) % numBeats
      nextBeatTime.current += interval / 1000
    }

    animFrameRef.current = requestAnimationFrame(scheduleBeat)
  }, [bpm, numBeats])

  const togglePlay = () => {
    if (isPlaying) {
      cancelAnimationFrame(animFrameRef.current)
      setIsPlaying(false)
      setCurrentBeat(0)
      beatIndex.current = 0
    } else {
      audioEngine.init()
      nextBeatTime.current = audioEngine.init() + 0.05
      beatIndex.current = 0
      setIsPlaying(true)
      animFrameRef.current = requestAnimationFrame(scheduleBeat)
    }
  }

  useEffect(() => {
    localStorage.setItem("metronome_bpm", String(bpm))
  }, [bpm])

  useEffect(() => {
    return () => cancelAnimationFrame(animFrameRef.current)
  }, [])

  const handleTap = () => {
    const now = performance.now()
    tapTimes.current.push(now)

    if (tapTimes.current.length > 8) {
      tapTimes.current.shift()
    }

    if (tapTimes.current.length >= 2) {
      const intervals: number[] = []
      for (let i = 1; i < tapTimes.current.length; i++) {
        intervals.push(tapTimes.current[i] - tapTimes.current[i - 1])
      }
      const median = intervals.slice().sort((a, b) => a - b)[Math.floor(intervals.length / 2)]
      const filtered = intervals.filter((iv) => iv <= median * 2.5)

      let avg: number
      if (filtered.length === 0) {
        avg = intervals[intervals.length - 1]
      } else {
        const weights = filtered.map((_, i) => (i + 1) / filtered.length)
        const totalW = weights.reduce((a, b) => a + b, 0)
        avg = filtered.reduce((sum, iv, i) => sum + iv * weights[i], 0) / totalW
      }

      const calculated = avg > 0 ? 60000 / avg : 0
      setTapBpm(Math.round(calculated))
      setBpm(Math.round(calculated))
    }

    clearTimeout((window as any).__tapTimeout)
    ;(window as any).__tapTimeout = setTimeout(() => {
      tapTimes.current = []
      setTapBpm(0)
    }, 3000)
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-lg">
      <h1 className="text-4xl font-serif font-bold mb-8 text-center">Metronome</h1>

      <div className="text-center mb-8">
        <div className="font-mono text-7xl font-bold tracking-tighter mb-2">{bpm}</div>
        <div className="text-sm text-muted-foreground">BPM</div>
      </div>

      <Slider
        value={[bpm]}
        onValueChange={([v]) => setBpm(v)}
        min={20}
        max={280}
        step={1}
        className="mb-8"
      />

      <div className="mb-6">
        <Input
          type="number"
          value={bpm}
          onChange={(e) => setBpm(Number(e.target.value))}
          className="text-center text-xl"
        />
      </div>

      <div className="flex justify-center gap-4 mb-8">
        {presets.map((preset) => (
          <Button
            key={preset.label}
            variant="ghost"
            size="sm"
            onClick={() => setBpm(preset.bpm)}
          >
            {preset.label}
          </Button>
        ))}
      </div>

      <div className="flex justify-center gap-4 mb-8">
        {timeSignatures.map((ts) => (
          <Button
            key={ts}
            variant={timeSig === ts ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeSig(ts)}
          >
            {ts}
          </Button>
        ))}
      </div>

      {/* Beat indicator */}
      <div className="flex justify-center gap-2 mb-8">
        {Array.from({ length: numBeats }, (_, i) => (
          <div
            key={i}
            className={`w-4 h-4 rounded-full transition-all ${
              currentBeat === i
                ? i === 0
                  ? "bg-primary scale-125"
                  : "bg-foreground scale-125"
                : "bg-muted"
            }`}
          />
        ))}
      </div>

      <div className="flex flex-col items-center gap-4">
        <Button
          onClick={togglePlay}
          size="lg"
          className="rounded-full h-16 w-48 text-lg"
        >
          {isPlaying ? "Stop" : "Start"}
        </Button>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-12 w-12"
            onClick={handleTap}
          >
            <Hand className="w-5 h-5" />
          </Button>
          {tapBpm > 0 && (
            <span className="font-mono text-lg">{tapBpm} BPM</span>
          )}
        </div>
        <span className="text-xs text-muted-foreground">Tap to set tempo</span>
      </div>
    </div>
  )
}
