"use client"

import { useState } from "react"
import { tempoMarkings } from "@/lib/content/tempoMarkings"
import { Slider } from "@/components/ui/slider"
import { useAudioEngine } from "@/hooks/use-audio-engine"
import { Play, Pause } from "lucide-react"
import { TempoMarkingsSeoContent } from "@/components/tempo-markings-seo-content"

export default function TempoMarkingsPage() {
  const [bpm, setBpm] = useState(120)
  const [playing, setPlaying] = useState<string | null>(null)
  const { playMetronomeClick } = useAudioEngine()

  const activeMarkings = tempoMarkings.filter(
    (m) => bpm >= m.bpmMin && bpm <= m.bpmMax,
  )

  const playPreview = (term: string, bpmMin: number, bpmMax: number) => {
    if (playing === term) {
      setPlaying(null)
      return
    }
    setPlaying(term)
    const midBpm = Math.round((bpmMin + bpmMax) / 2)
    const interval = 60000 / midBpm
    let count = 0
    const playBeat = () => {
      if (count >= 4) {
        setPlaying(null)
        return
      }
      playMetronomeClick(count === 0, 0.3)
      count++
      setTimeout(playBeat, interval)
    }
    playBeat()
  }

  const gradientPosition = ((bpm - 10) / (300 - 10)) * 100

  return (
    <div className="min-h-[calc(100dvh-3.5rem)] flex flex-col items-center px-4 py-6 bg-background">
      <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight mb-1 text-center">Tempo Markings</h1>
      <p className="text-muted-foreground text-sm mb-5">
        Classical music tempo dictionary with interactive BPM ranges.
      </p>

      <div className="w-full max-w-3xl">
      <div className="rounded-xl border p-6 mb-10 bg-card" style={{ borderColor: "#e5e7eb", borderRadius: "12px" }}>
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm font-medium text-muted-foreground">BPM Range Explorer</span>
          <span className="text-2xl font-bold text-blue-500 font-mono">{bpm}</span>
        </div>

        <Slider
          value={[bpm]}
          onValueChange={([v]) => setBpm(v)}
          min={10}
          max={300}
          step={1}
          className="mb-4 [&_[role=slider]]:h-5 [&_[role=slider]]:w-5"
        />

        <div className="relative h-2 rounded-full overflow-hidden mb-2" style={{ background: "linear-gradient(to right, #3b82f6, #22c55e, #eab308, #f97316, #ef4444)" }}>
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-md border-2 border-blue-500 transition-all duration-100"
            style={{ left: `${gradientPosition}%`, marginLeft: "-7px" }}
          />
        </div>

        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>Larghissimo (10)</span>
          <span>Prestissimo (300)</span>
        </div>
      </div>

      <div className="grid gap-3">
        {tempoMarkings.map((marking) => {
          const isActive = bpm >= marking.bpmMin && bpm <= marking.bpmMax
          return (
            <div
              key={marking.term}
              className={`group flex items-center gap-4 p-4 rounded-xl border bg-card transition-all duration-200 ${
                isActive
                  ? "border-blue-500 bg-blue-50/50 shadow-sm"
                  : "hover:border-gray-300 hover:shadow-sm"
              }`}
              style={{ borderRadius: "10px" }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-0.5">
                  <span className="font-serif text-xl font-bold italic">
                    {marking.term}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">
                    {marking.bpmMin}–{marking.bpmMax}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {marking.description}
                </p>
                <p className="text-xs text-muted-foreground/60 italic mt-0.5">
                  {marking.musicalFeel}
                </p>
              </div>

              <button
                onClick={() => playPreview(marking.term, marking.bpmMin, marking.bpmMax)}
                className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                  playing === marking.term
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-muted/50 text-muted-foreground hover:bg-blue-500 hover:text-white hover:shadow-md"
                }`}
              >
                {playing === marking.term ? (
                  <Pause className="w-4 h-4 fill-current" />
                ) : (
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                )}
              </button>
            </div>
          )
        })}
      </div>
      <TempoMarkingsSeoContent />
      </div>
    </div>
  )
}
