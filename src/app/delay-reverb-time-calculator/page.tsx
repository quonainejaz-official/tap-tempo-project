"use client"

import { useState, useRef } from "react"
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

export default function DelayTimeCalculatorPage() {
  const [mode, setMode] = useState<"delay" | "reverb">("delay")
  const [bpm, setBpm] = useState("120")
  const [activePreset, setActivePreset] = useState<string | null>(null)
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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

      <div className="flex justify-center mb-8">
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

      <div className="max-w-xs mx-auto mb-8">
        <Input
          type="number"
          value={bpm}
          onChange={(e) => setBpm(e.target.value)}
          className="text-center text-2xl h-14"
          placeholder="Enter BPM"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-8 justify-center">
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

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Division</TableHead>
            <TableHead className="text-right">Milliseconds</TableHead>
            <TableHead className="w-10"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visibleDivisions.map((nd) => {
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
                <TableCell className="font-medium">
                  {nd.label}
                  {highlighted && (
                    <span className="ml-2 text-xs text-primary">(Recommended)</span>
                  )}
                </TableCell>
                <TableCell className="text-right font-mono">
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
