"use client"

import { Suspense, useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Gauge, Copy } from "lucide-react"
import { toast } from "sonner"
import { BpmToMsSeoContent } from "@/components/bpm-to-ms-seo-content"

const noteDivisions = [
  { label: "Whole Note", fraction: 4 },
  { label: "Half Note", fraction: 2 },
  { label: "Quarter Note", fraction: 1 },
  { label: "Eighth Note", fraction: 0.5 },
  { label: "Sixteenth Note", fraction: 0.25 },
  { label: "Thirty-Second Note", fraction: 0.125 },
  { label: "Quarter Triplet", fraction: 2 / 3 },
  { label: "Eighth Triplet", fraction: 1 / 3 },
  { label: "Sixteenth Triplet", fraction: 1 / 6 },
  { label: "Dotted Quarter", fraction: 1.5 },
  { label: "Dotted Eighth", fraction: 0.75 },
]

const noteNotation: Record<string, string> = {
  "Whole Note": "\u{1D15D}",
  "Half Note": "\u{1D15E}",
  "Quarter Note": "\u{1D15F}",
  "Eighth Note": "\u{1D160}",
  "Sixteenth Note": "\u{1D161}",
  "Thirty-Second Note": "\u{1D162}",
  "Quarter Triplet": "\u{1D15F}\u00B3",
  "Eighth Triplet": "\u{1D160}\u00B3",
  "Sixteenth Triplet": "\u{1D161}\u00B3",
  "Dotted Quarter": "\u{1D15F}\u00B7",
  "Dotted Eighth": "\u{1D160}\u00B7",
}

export default function BpmToMsPage() {
  return (
    <Suspense>
      <BpmToMsContent />
    </Suspense>
  )
}

function BpmToMsContent() {
  const searchParams = useSearchParams()
  const [bpm, setBpm] = useState("120")

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

  const calculateHz = (noteFraction: number) => {
    const ms = calculateMs(noteFraction)
    if (ms <= 0) return 0
    return 1000 / ms
  }

  const copy = (val: string) => {
    navigator.clipboard.writeText(val)
    toast("Copied to clipboard")
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-serif font-bold mb-2 text-center">BPM to ms (Milliseconds) Converter</h1>
      <p className="text-muted-foreground text-center mb-8">
        Convert tempo to exact millisecond values for all note divisions.
      </p>

      <div className="rounded-xl border bg-card overflow-hidden shadow-sm mb-8">
        <div className="grid md:grid-cols-6 gap-6 items-center p-4">
          <div className="flex flex-col gap-2 md:col-span-2">
            <Label>BPM (Beats per minute)</Label>
            <Input
              type="number"
              value={bpm}
              onChange={(e) => setBpm(e.target.value)}
              className="text-center text-2xl h-16 w-full"
              placeholder="Enter BPM"
            />
            {parseFloat(bpm) > 0 && (
              <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-0.5 py-1.5 px-3 rounded-xl border border-primary/20 bg-primary/5">
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

          <div className="rounded-xl border bg-card overflow-hidden shadow-sm md:col-span-4">
            <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 border-b border-gray-100">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-blue-100 text-[#1565FF] shrink-0">
                <Gauge size={14} strokeWidth={2.5} />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-800">Quick Reference</span>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border bg-card text-center">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Quarter</div>
                  <div className="text-lg font-mono font-bold text-primary">{calculateMs(1).toFixed(1)} ms</div>
                </div>
                <div className="p-4 rounded-xl border bg-card text-center">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Eighth</div>
                  <div className="text-lg font-mono font-bold text-primary">{calculateMs(0.5).toFixed(1)} ms</div>
                </div>
                <div className="p-4 rounded-xl border bg-card text-center">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Dotted Quarter</div>
                  <div className="text-lg font-mono font-bold text-primary">{calculateMs(1.5).toFixed(1)} ms</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-card overflow-hidden shadow-sm">
        <Table className="[&_th]:h-9 [&_th]:bg-blue-50 [&_th]:text-gray-800 [&_td]:py-1 [&_td_button]:h-7 [&_td_button]:w-7">
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                Note Division
              </TableHead>
              <TableHead className="text-right text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                Milliseconds
              </TableHead>
              <TableHead className="text-right text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                Frequency (Hz)
              </TableHead>
              <TableHead className="w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {noteDivisions.map((nd) => (
              <TableRow key={nd.label}>
                <TableCell className="font-medium whitespace-nowrap">
                  <span className="text-[15px] leading-none mr-1.5 text-[#1565FF] select-none" aria-hidden="true">
                    {noteNotation[nd.label]}
                  </span>
                  {nd.label}
                </TableCell>
                <TableCell className="text-right font-mono whitespace-nowrap">
                  {calculateMs(nd.fraction).toFixed(2)} ms
                </TableCell>
                <TableCell className="text-right font-mono text-muted-foreground whitespace-nowrap">
                  {calculateHz(nd.fraction).toFixed(2)} Hz
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copy(calculateMs(nd.fraction).toFixed(2))}
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <BpmToMsSeoContent />

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Need help converting delay times?{" "}
          <a href="/ai-tempo" className="text-primary font-medium hover:underline">
            Ask TapTempoAI
          </a>
        </p>
      </div>
    </div>
  )
}
