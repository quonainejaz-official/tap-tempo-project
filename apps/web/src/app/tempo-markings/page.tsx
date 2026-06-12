"use client"

import { useState } from "react"
import { tempoMarkings } from "@/lib/content/tempoMarkings"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { useAudioEngine } from "@/hooks/use-audio-engine"
import { Play, Square } from "lucide-react"

export default function TempoMarkingsPage() {
  const [bpm, setBpm] = useState(120)
  const [playing, setPlaying] = useState<string | null>(null)
  const { playMetronomeClick } = useAudioEngine()

  const activeMarking = tempoMarkings.find(
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

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-serif font-bold mb-2 text-center">Tempo Markings</h1>
      <p className="text-muted-foreground text-center mb-8">
        Classical Italian tempo markings and their BPM ranges.
      </p>

      <div className="max-w-md mx-auto mb-12">
        <p className="text-center text-sm text-muted-foreground mb-4">
          Current BPM: <span className="font-mono font-bold text-foreground text-lg">{bpm}</span>
          {activeMarking && (
            <span className="ml-2 italic">— {activeMarking.term}</span>
          )}
        </p>
        <Slider
          value={[bpm]}
          onValueChange={([v]) => setBpm(v)}
          min={10}
          max={300}
          step={1}
          className="[&_[role=slider]]:h-5 [&_[role=slider]]:w-5"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
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
              className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${
                isActive
                  ? "border-primary bg-primary/5"
                  : "border-border/50"
              }`}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => playPreview(marking.term, marking.bpmMin, marking.bpmMax)}
              >
                {playing === marking.term ? (
                  <Square className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </Button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <span className="font-serif text-xl font-bold italic">
                    {marking.term}
                  </span>
                  <span className="font-mono text-sm text-muted-foreground">
                    {marking.bpmMin}–{marking.bpmMax} BPM
                  </span>
                  {isActive && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {marking.description}
                </p>
                <p className="text-xs text-muted-foreground/60 mt-0.5">
                  {marking.musicalFeel}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
