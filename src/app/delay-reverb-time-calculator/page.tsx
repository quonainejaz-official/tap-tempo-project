"use client"

import { Suspense, useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Copy, Check } from "lucide-react"
import { toast } from "sonner"
import { DelayReverbSeoContent } from "@/components/delay-reverb-seo-content"

const allNoteDivisions = [
  { label: "1/64", fraction: 1 / 16 },
  { label: "1/32", fraction: 1 / 8 },
  { label: "1/32 Dotted", fraction: 0.1875 },
  { label: "1/32 Triplet", fraction: 1 / 12 },
  { label: "1/16", fraction: 1 / 4 },
  { label: "1/16 Dotted", fraction: 0.375 },
  { label: "1/16 Triplet", fraction: 1 / 6 },
  { label: "1/8", fraction: 1 / 2 },
  { label: "1/8 Dotted", fraction: 0.75 },
  { label: "1/8 Triplet", fraction: 1 / 3 },
  { label: "1/4", fraction: 1 },
  { label: "1/4 Dotted", fraction: 1.5 },
  { label: "1/4 Triplet", fraction: 2 / 3 },
  { label: "1/2", fraction: 2 },
  { label: "1 Bar", fraction: 4 },
]

const reverbHidden = new Set(["1/4", "1/4 Dotted", "1/4 Triplet", "1/2", "1 Bar"])

const feels: Record<string, string[]> = {
  Standard: ["1/4", "1/8", "1/16"],
  Slapback: ["1/8", "1/16"],
  "Slap Echo": ["1/8 Dotted"],
  "Long Hall": ["1/4 Dotted"],
  "Ping Pong": ["1/4", "1/8 Dotted"],
}

const reverbPresets: Record<string, string[]> = {
  "Tight Vocal": ["1/64", "1/32"],
  "Natural Vocal": ["1/32", "1/16"],
  "Large Hall": ["1/16", "1/16 Triplet"],
  Ambient: ["1/8 Triplet", "1/8"],
  "Creative FX": ["1/8 Dotted", "1/4"],
}

const noteGlyphs: Record<string, string> = {
  "1/64": "\u{1D163}",
  "1/32": "\u{1D162}",
  "1/32 Dotted": "\u{1D162}\u00B7",
  "1/32 Triplet": "\u{1D162}\u00B3",
  "1/16": "\u{1D161}",
  "1/16 Dotted": "\u{1D161}\u00B7",
  "1/16 Triplet": "\u{1D161}\u00B3",
  "1/8": "\u{1D160}",
  "1/8 Dotted": "\u{1D160}\u00B7",
  "1/8 Triplet": "\u{1D160}\u00B3",
  "1/4": "\u{1D15F}",
  "1/4 Dotted": "\u{1D15F}\u00B7",
  "1/4 Triplet": "\u{1D15F}\u00B3",
  "1/2": "\u{1D15E}",
  "1 Bar": "\u{1D15D}",
}

export default function DelayTimeCalculatorPage() {
  return (
    <Suspense>
      <DelayTimeCalculatorContent />
    </Suspense>
  )
}

function DelayTimeCalculatorContent() {
  const searchParams = useSearchParams()
  const [mode, setMode] = useState<"delay" | "reverb">("delay")
  const [bpm, setBpm] = useState("120")
  const [activePreset, setActivePreset] = useState<string | null>(null)
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const param = searchParams.get("bpm")
    if (param) {
      const parsed = parseInt(param, 10)
      if (!isNaN(parsed) && parsed > 0) setBpm(String(parsed))
    }
  }, [searchParams])

  const calculateMs = (noteFraction: number) => {
    const b = Number(bpm)
    if (b <= 0) return 0
    return (60000 / b) * noteFraction
  }

  const copy = (val: string, label: string) => {
    navigator.clipboard.writeText(val)
    if (timerRef.current) clearTimeout(timerRef.current)
    setCopiedLabel(label)
    toast("Copied to clipboard")
    timerRef.current = setTimeout(() => setCopiedLabel(null), 2000)
  }

  const copyForDaw = () => {
    const divisions = mode === "reverb"
      ? allNoteDivisions.filter((nd) => {
          if (!reverbHidden.has(nd.label)) return true
          if (activePreset && reverbPresets[activePreset]?.includes(nd.label)) return true
          return false
        })
      : allNoteDivisions
    const lines = [`BPM: ${bpm}`, "Delay Times:"]
    divisions.forEach((nd) => {
      lines.push(`${nd.label}: ${calculateMs(nd.fraction).toFixed(2)}ms`)
    })
    navigator.clipboard.writeText(lines.join("\n"))
    toast("Copied for DAW")
  }

  const isHighlighted = (label: string) => {
    if (!activePreset) return false
    if (mode === "delay") return feels[activePreset]?.includes(label) ?? false
    return reverbPresets[activePreset]?.includes(label) ?? false
  }

  const visibleDivisions = mode === "reverb"
    ? allNoteDivisions.filter((nd) => {
        if (!reverbHidden.has(nd.label)) return true
        if (activePreset && reverbPresets[activePreset]?.includes(nd.label)) return true
        return false
      })
    : allNoteDivisions

  const currentPresets = mode === "reverb" ? reverbPresets : feels

  const splitIndex = allNoteDivisions.findIndex((nd) => nd.label === "1/8") + 1
  const leftDivisions = visibleDivisions.slice(0, splitIndex)
  const rightDivisions = visibleDivisions.slice(splitIndex)

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-serif font-bold">Delay & Reverb Time Calculator</h1>
          <p className="text-muted-foreground mt-1">
            Calculate precise millisecond values for your delays and reverb pre-delays.
          </p>
        </div>
        <Button variant="outline" onClick={copyForDaw} className="hidden sm:flex">
          <Copy className="w-4 h-4 mr-2" /> Copy for DAW
        </Button>
      </div>

      <div className="rounded-xl border bg-card overflow-hidden shadow-sm mb-8">
        <div className="flex justify-center pt-4">
          <div className="inline-flex rounded-lg border p-0.5 bg-muted/30">
            <button
              onClick={() => { setMode("delay"); setActivePreset(null); setCopiedLabel(null) }}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                mode === "delay" ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Delay Time
            </button>
            <button
              onClick={() => { setMode("reverb"); setActivePreset(null); setCopiedLabel(null) }}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                mode === "reverb" ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Reverb Pre-Delay
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-stretch pt-3 px-4">
          <Input
            type="number"
            value={bpm}
            onChange={(e) => setBpm(e.target.value)}
            className="text-center text-2xl min-h-14 h-full w-full"
            placeholder="Enter BPM"
          />
          {parseFloat(bpm) > 0 && (
            <div className="w-full h-full flex flex-wrap items-center justify-center gap-x-2.5 gap-y-0.5 py-1.5 px-3 rounded-xl border border-primary/20 bg-primary/5">
              <p className="text-xs text-muted-foreground leading-snug">Want to play at this tempo?</p>
              <Link
                href={`/metronome?bpm=${Math.round(parseFloat(bpm))}`}
                className="text-xs font-bold text-primary hover:underline leading-snug"
              >
                Use {Math.round(parseFloat(bpm))} BPM in Metronome →
              </Link>
              <Link
                href={`/tap-tempo?bpm=${Math.round(parseFloat(bpm))}`}
                className="text-xs font-bold text-primary hover:underline leading-snug"
              >
                Use {Math.round(parseFloat(bpm))} BPM in Tap Tempo →
              </Link>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 justify-center px-4 pt-3 pb-4">
          {Object.keys(currentPresets).map((preset) => (
            <Button
              key={preset}
              variant={activePreset === preset ? "default" : "outline"}
              size="sm"
              onClick={() => setActivePreset(activePreset === preset ? null : preset)}
            >
              {preset}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {[leftDivisions, rightDivisions].map((cols, colIndex) => (
          <div
            key={colIndex}
            className="rounded-xl border bg-card overflow-hidden shadow-sm flex flex-col h-full"
          >
            <Table className="[&_th]:h-9 [&_th]:bg-blue-50 [&_th]:text-gray-800 [&_td]:py-1 [&_td_button]:h-7 [&_td_button]:w-7">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                    Division
                  </TableHead>
                  <TableHead className="text-right text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                    Milliseconds
                  </TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cols.map((nd) => {
                  const highlighted = isHighlighted(nd.label)
                  const justCopied = copiedLabel === nd.label
                  const ms = calculateMs(nd.fraction).toFixed(2)
                  return (
                    <TableRow
                      key={nd.label}
                      className={`cursor-pointer transition-colors ${
                        highlighted ? "bg-muted/50" : ""
                      } ${justCopied ? "bg-primary/10" : ""} hover:bg-muted/30`}
                      onClick={() => copy(ms, nd.label)}
                    >
                      <TableCell className="font-medium whitespace-nowrap">
                        <span className="text-[15px] leading-none mr-1.5 text-[#1565FF] select-none" aria-hidden="true">
                          {noteGlyphs[nd.label]}
                        </span>
                        {nd.label}
                        {highlighted && (
                          <span className="ml-2 text-xs text-primary">(Recommended)</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right font-mono font-bold text-primary whitespace-nowrap">
                        {ms} ms
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => { e.stopPropagation(); copy(ms, nd.label) }}
                          className="relative"
                        >
                          {justCopied ? (
                            <Check className="w-3 h-3 text-green-500" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        ))}
      </div>

      <div className="mt-6 sm:hidden">
        <Button variant="outline" className="w-full" onClick={copyForDaw}>
          <Copy className="w-4 h-4 mr-2" /> Copy for DAW
        </Button>
      </div>

      <DelayReverbSeoContent />

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Need help dialing in reverb or delay?{" "}
          <a href="/ai-tempo" className="text-primary font-medium hover:underline">
            Ask TapTempoAI
          </a>
        </p>
      </div>
    </div>
  )
}
