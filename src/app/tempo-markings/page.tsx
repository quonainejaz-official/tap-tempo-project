"use client"

import { useState } from "react"
import { tempoMarkings } from "@/lib/content/tempoMarkings"
import { Slider } from "@/components/ui/slider"
import { useAudioEngine } from "@/hooks/use-audio-engine"
import { Play, Pause, Check } from "lucide-react"
import { TempoMarkingsSeoContent } from "@/components/tempo-markings-seo-content"
import { TempoMarkingsReferenceTable } from "@/components/tempo-markings-reference-table"

const tempoCategory = (marking: { bpmMin: number; bpmMax: number }) => {
  const mid = (marking.bpmMin + marking.bpmMax) / 2
  if (mid < 85) return "slow" as const
  if (mid <= 125) return "moderate" as const
  return "fast" as const
}

const tempoCategoryStyles = {
  slow: { label: "Slow", dot: "bg-blue-500", chip: "bg-blue-50 text-blue-700 border-blue-200" },
  moderate: { label: "Moderate", dot: "bg-amber-500", chip: "bg-amber-50 text-amber-700 border-amber-200" },
  fast: { label: "Fast", dot: "bg-red-500", chip: "bg-red-50 text-red-700 border-red-200" },
} as const

export default function TempoMarkingsPage() {
  const [bpm, setBpm] = useState(120)
  const [playing, setPlaying] = useState<string | null>(null)
  const [selectedTerm, setSelectedTerm] = useState<string>(tempoMarkings[0].term)
  const { playMetronomeClick } = useAudioEngine()

  const selectedMarking =
    tempoMarkings.find((m) => m.term === selectedTerm) ?? tempoMarkings[0]
  const category = tempoCategoryStyles[tempoCategory(selectedMarking)]

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
      <div className="w-full max-w-5xl">
        <div className="mt-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight">
            Tempo Markings Chart (Italian Terms)
          </h1>
          <div className="flex flex-col gap-3 mt-4">
            <p className="text-muted-foreground text-sm">
              Explore every Italian tempo marking with BPM ranges, musical meaning, pronunciation, and real-world usage in one interactive reference chart.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1 text-xs text-muted-foreground">
                <Check aria-hidden="true" className="w-3.5 h-3.5 text-emerald-500" />
                Interactive BPM Explorer
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1 text-xs text-muted-foreground">
                <Check aria-hidden="true" className="w-3.5 h-3.5 text-emerald-500" />
                {tempoMarkings.length} Italian Tempo Markings
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1 text-xs text-muted-foreground">
                <Check aria-hidden="true" className="w-3.5 h-3.5 text-emerald-500" />
                Audio Playback Included
              </span>
            </div>
          </div>
        </div>

      <div className="rounded-xl border px-6 py-8 bg-card mt-8" style={{ borderColor: "#e5e7eb", borderRadius: "12px" }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">BPM Range Explorer</span>
          <span className="text-2xl font-bold text-blue-500 font-mono">{bpm}</span>
        </div>

        <p className="text-xs text-muted-foreground mb-6">
          Drag the slider to explore which tempo marking matches each BPM. Tap any marking below to hear it at its natural speed.
        </p>

        <Slider
          value={[bpm]}
          onValueChange={([v]) => setBpm(v)}
          min={10}
          max={300}
          step={1}
          className="mb-5 [&_[role=slider]]:h-5 [&_[role=slider]]:w-5"
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

        <section className="mt-12">
          <h2 className="text-2xl md:text-3xl font-serif font-bold">Tempo Marking Overview</h2>
          <p className="text-muted-foreground text-sm mt-2">
            Browse every Italian tempo marking by BPM range. Select any marking to instantly view its meaning, musical feel, and playback.
          </p>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[7fr_7fr_6fr] lg:gap-6 mt-6 items-stretch">
            {[tempoMarkings.slice(0, Math.ceil(tempoMarkings.length / 2)), tempoMarkings.slice(Math.ceil(tempoMarkings.length / 2))].map((list, columnIndex) => (
              <div key={columnIndex} className="rounded-xl border bg-card p-4 flex flex-col gap-2">
                {list.map((marking) => {
                  const isActive = bpm >= marking.bpmMin && bpm <= marking.bpmMax
                  return (
                    <button
                      key={marking.term}
                      onClick={() => setSelectedTerm(marking.term)}
                      aria-pressed={isActive}
                      className={`flex items-center justify-between gap-3 w-full text-left px-3 py-2.5 rounded-lg border transition-all duration-200 ${
                        isActive
                          ? "border-blue-500 bg-blue-500/10 shadow-sm"
                          : "border-transparent hover:border-gray-300 hover:bg-muted/40 hover:shadow-sm"
                      }`}
                    >
                      <span
                        className={`font-serif italic font-bold ${
                          isActive ? "text-blue-700 dark:text-blue-300" : ""
                        }`}
                      >
                        {marking.term}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">
                        {marking.bpmMin}–{marking.bpmMax} BPM
                      </span>
                    </button>
                  )
                })}
              </div>
            ))}

            <div className="rounded-xl border bg-card p-4">
              <div
                key={selectedMarking.term}
                className="animate-in fade-in duration-200 flex flex-col"
              >
                <span
                  className={`inline-flex items-center gap-2 self-start rounded-full border px-3 py-1 text-xs font-medium ${category.chip}`}
                >
                  <span className={`h-2 w-2 rounded-full ${category.dot}`} />
                  {category.label}
                </span>

                <h3 className="font-serif italic font-bold text-3xl mt-4">
                  {selectedMarking.term}
                </h3>

                <span className="inline-flex self-start items-center rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 font-mono text-lg font-bold text-blue-600 mt-4">
                  {selectedMarking.bpmMin}–{selectedMarking.bpmMax} BPM
                </span>

                <div className="mt-6 space-y-5">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Meaning</p>
                    <p className="text-sm mt-1">{selectedMarking.description}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Musical Feel</p>
                    <p className="text-sm mt-1 italic text-muted-foreground">{selectedMarking.musicalFeel}</p>
                  </div>
                </div>

                <div className="mt-auto pt-6">
                  <button
                    onClick={() =>
                      playPreview(selectedMarking.term, selectedMarking.bpmMin, selectedMarking.bpmMax)
                    }
                    aria-label={
                      playing === selectedMarking.term
                        ? `Pause ${selectedMarking.term}`
                        : `Play ${selectedMarking.term}`
                    }
                    className={`inline-flex items-center gap-3 rounded-full h-12 px-6 text-sm font-semibold text-white transition-all duration-200 ${
                      playing === selectedMarking.term
                        ? "bg-blue-500 shadow-md"
                        : "bg-blue-500 shadow-sm hover:bg-blue-600 hover:shadow-md"
                    }`}
                  >
                    {playing === selectedMarking.term ? (
                      <Pause aria-hidden="true" className="w-5 h-5 fill-current" />
                    ) : (
                      <Play aria-hidden="true" className="w-5 h-5 fill-current ml-0.5" />
                    )}
                    {playing === selectedMarking.term ? "Pause" : "Play Tempo"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <TempoMarkingsReferenceTable
          selectedTerm={selectedTerm}
          onSelect={setSelectedTerm}
          playing={playing}
          onPlay={playPreview}
        />

        <TempoMarkingsSeoContent />
      </div>

      <div className="text-center mt-6">
        <p className="text-sm text-muted-foreground">
          Confused about a tempo marking?{" "}
          <a href="/ai-tempo" className="text-primary font-medium hover:underline">
            Ask TapTempoAI
          </a>
        </p>
      </div>
    </div>
  )
}
