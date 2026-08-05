"use client"

import { useMemo, useState } from "react"
import { BookOpen, Pause, Play, Search } from "lucide-react"
import { tempoMarkings } from "@/lib/content/tempoMarkings"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type Category = "all" | "slow" | "moderate" | "fast"
type Speed = Exclude<Category, "all">

const tempoCategory = (marking: { bpmMin: number; bpmMax: number }): Speed => {
  const mid = (marking.bpmMin + marking.bpmMax) / 2
  if (mid < 85) return "slow"
  if (mid <= 125) return "moderate"
  return "fast"
}

const dedicatedGuideTerms = new Set([
  "Grave",
  "Largo",
  "Adagio",
  "Andante",
  "Moderato",
  "Allegro",
  "Vivace",
  "Presto",
  "Prestissimo",
])

const getGuideTarget = (term: string, speed: Speed) =>
  dedicatedGuideTerms.has(term)
    ? `tempo-guide-${term.toLowerCase()}`
    : `tempo-guide-${speed}-heading`

const filters: { value: Category; label: string }[] = [
  { value: "all", label: "All" },
  { value: "slow", label: "Slow" },
  { value: "moderate", label: "Moderate" },
  { value: "fast", label: "Fast" },
]

interface TempoMarkingsReferenceTableProps {
  selectedTerm: string
  onSelect: (term: string) => void
  playing: string | null
  onPlay: (term: string, bpmMin: number, bpmMax: number) => void
}

export function TempoMarkingsReferenceTable({
  selectedTerm,
  onSelect,
  playing,
  onPlay,
}: TempoMarkingsReferenceTableProps) {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<Category>("all")

  const filteredMarkings = useMemo(() => {
    const q = query.trim().toLowerCase()
    return tempoMarkings.filter((marking) => {
      const speed = tempoCategory(marking)
      if (filter !== "all" && speed !== filter) return false
      if (!q) return true
      const range = `${marking.bpmMin}–${marking.bpmMax}`
      return (
        marking.term.toLowerCase().includes(q) ||
        marking.description.toLowerCase().includes(q) ||
        range.includes(q)
      )
    })
  }, [query, filter])

  const scrollToGuide = (term: string, speed: Speed) => {
    document
      .getElementById(getGuideTarget(term, speed))
      ?.scrollIntoView({ behavior: "smooth", block: "center" })
  }

  return (
    <section id="complete-tempo-markings-chart" className="mt-12 scroll-mt-24">
      <h2 className="text-2xl md:text-3xl font-serif font-bold">Complete Tempo Markings Chart</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Compare every tempo marking side by side. Search, filter by speed, play any tempo, or jump to its detailed guide.
      </p>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div role="group" aria-label="Filter tempo markings by speed" className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              aria-pressed={filter === f.value}
              className={cn(
                "px-3.5 py-1.5 rounded-full border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                filter === f.value
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-card border-border text-muted-foreground hover:bg-muted/40 hover:text-foreground",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <label htmlFor="tempo-markings-search" className="sr-only">
          Search tempo markings
        </label>
        <div className="relative w-full sm:w-72">
          <Search aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            id="tempo-markings-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tempo marking..."
            className="pl-9"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border mt-5">
        <table aria-label="Tempo markings reference table" className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50">
              <th className="text-left px-4 py-3.5 font-medium">Tempo</th>
              <th className="text-left px-4 py-3.5 font-medium">BPM Range</th>
              <th className="text-left px-4 py-3.5 font-medium">Meaning</th>
              <th className="text-left px-4 py-3.5 font-medium">Musical Feel</th>
              <th className="text-left px-4 py-3.5 font-medium">Audio</th>
              <th className="text-left px-4 py-3.5 font-medium">Jump to Guide</th>
            </tr>
          </thead>
          <tbody>
            {filteredMarkings.map((marking) => {
              const isSelected = marking.term === selectedTerm
              return (
                <tr
                  key={marking.term}
                  tabIndex={0}
                  onClick={() => onSelect(marking.term)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      onSelect(marking.term)
                    }
                  }}
                  aria-selected={isSelected}
                  className={cn(
                    "border-t cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500",
                    isSelected ? "bg-blue-500/10" : "hover:bg-muted/40",
                  )}
                >
                  <td className="px-4 py-3.5 font-serif italic font-medium">{marking.term}</td>
                  <td className="px-4 py-3.5 font-mono text-xs text-muted-foreground whitespace-nowrap">
                    {marking.bpmMin}–{marking.bpmMax} BPM
                  </td>
                  <td className="px-4 py-3.5 text-muted-foreground">{marking.description}</td>
                  <td className="px-4 py-3.5 text-muted-foreground italic">{marking.musicalFeel}</td>
                  <td className="px-4 py-3.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        onPlay(marking.term, marking.bpmMin, marking.bpmMax)
                      }}
                      aria-label={
                        playing === marking.term ? `Pause ${marking.term}` : `Play ${marking.term}`
                      }
                      className={cn(
                        "inline-flex items-center justify-center w-9 h-9 rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                        playing === marking.term
                          ? "bg-blue-500 border-blue-500 text-white"
                          : "bg-muted/40 border-border text-muted-foreground hover:bg-blue-500 hover:border-blue-500 hover:text-white",
                      )}
                    >
                      {playing === marking.term ? (
                        <Pause aria-hidden="true" className="w-4 h-4 fill-current" />
                      ) : (
                        <Play aria-hidden="true" className="w-4 h-4 fill-current ml-0.5" />
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-3.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        scrollToGuide(marking.term, tempoCategory(marking))
                      }}
                      className={cn(
                        "inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      )}
                    >
                      <BookOpen aria-hidden="true" className="w-3.5 h-3.5" />
                      Jump to Guide
                    </button>
                  </td>
                </tr>
              )
            })}
            {filteredMarkings.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                  No tempo markings match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="text-sm text-muted-foreground         leading-relaxed mt-4 italic">
        Keep in mind that these ranges can vary slightly depending on the composer and musical style.
      </p>
    </section>
  )
}
