"use client"

import { useState } from "react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Check, Copy } from "lucide-react"
import { PitchTempoSeoContent } from "@/components/pitch-tempo-seo-content"

const djPresets = [3, -3, 6, -6, 8, -8]
const semitonePresets = [1, -1, 2, -2, 12, -12]
const faderRanges = [
  { label: "±6%", value: 6 },
  { label: "±8%", value: 8 },
  { label: "±10%", value: 10 },
  { label: "±16%", value: 16 },
  { label: "WIDE (±100%)", value: 100 },
]

export default function PitchTempoCalculatorPage() {
  const [baseBpm, setBaseBpm] = useState("120")
  const [pitch, setPitch] = useState("0")
  const [semitones, setSemitones] = useState("0")
  const [faderMax, setFaderMax] = useState(8)

  const base = parseFloat(baseBpm)

  const djBpm = (bpm: number, p: number) => (bpm * (1 + p / 100)).toFixed(2)
  const stBpm = (bpm: number, n: number) => (bpm * Math.pow(2, n / 12)).toFixed(2)
  const stSpeed = (n: number) => ((Math.pow(2, n / 12) - 1) * 100).toFixed(2)
  const stFactor = (n: number) => (Math.pow(2, n / 12)).toFixed(4)
  const pitchShift = (p: number) => (12 * Math.log2(1 + p / 100)).toFixed(2)

  const numPitch = parseFloat(pitch)
  const numSemi = parseFloat(semitones)

  const [copied, setCopied] = useState<"dj" | "producer" | null>(null)
  const copiedTimer = (mode: "dj" | "producer") => {
    setCopied(mode)
    setTimeout(() => setCopied((m) => (m === mode ? null : m)), 1500)
  }

  const copy = (mode: "dj" | "producer", val: string) => {
    navigator.clipboard.writeText(val)
    copiedTimer(mode)
  }

  const selectRange = (value: number) => {
    setFaderMax(value)
    if (numPitch > value || numPitch < -value) setPitch("0")
  }

  return (
    <div className="container mx-auto px-4 py-4 max-w-3xl">
      <div className="mb-3">
        <h1 className="text-3xl font-serif font-bold tracking-tight mb-1">Pitch Tempo Calculator</h1>
        <p className="text-muted-foreground text-sm leading-snug">Shift a track&apos;s tempo when you change its pitch. Use DJ-style percentage faders or producer semitone offsets to find the new BPM instantly.</p>
      </div>

      <Tabs defaultValue="dj" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="dj">DJ Pitch Fader Mode</TabsTrigger>
          <TabsTrigger value="producer">Producer Semitone Mode</TabsTrigger>
        </TabsList>

        <TabsContent value="dj" className="mt-3">
          <div className="p-4 rounded-xl border bg-card">
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="space-y-1">
                <Label>Base BPM</Label>
                <Input type="number" min="0" step="any" value={baseBpm} onChange={(e) => setBaseBpm(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label>Pitch (p %)</Label>
                <Input type="number" step="any" value={pitch} onChange={(e) => setPitch(e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              <div>
                <div className="text-sm font-medium mb-1.5">Quick Pitch Presets</div>
                <div className="flex flex-wrap gap-2">
                  {djPresets.map((p) => (
                    <Button key={p} variant="outline" size="sm" className="py-1.5" onClick={() => setPitch(String(p))}>
                      {p > 0 ? `+${p}%` : `${p}%`}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1.5">Fader Range</div>
                <div className="flex flex-wrap gap-2">
                  {faderRanges.map((r) => (
                    <Button
                      key={r.value}
                      variant={faderMax === r.value ? "default" : "outline"}
                      size="sm"
                      className="py-1.5"
                      onClick={() => selectRange(r.value)}
                    >
                      {r.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-3">
              <div className="flex items-center justify-between mb-1.5">
                <Label className="text-sm">Pitch Fader</Label>
                <span className="text-sm font-mono text-muted-foreground">{numPitch > 0 ? `+${numPitch}%` : `${numPitch}%`}</span>
              </div>
              <Slider
                value={[numPitch]}
                min={-faderMax}
                max={faderMax}
                step={0.1}
                onValueChange={(v) => setPitch(String(Number(v[0].toFixed(1))))}
                aria-label={`Pitch fader, range ±${faderMax}%`}
              />
              <div className="flex justify-between mt-1 text-xs text-muted-foreground font-mono">
                <span>-{faderMax}%</span>
                <span>0%</span>
                <span>+{faderMax}%</span>
              </div>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg flex justify-between items-center">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Output BPM</div>
                <div className="text-3xl font-mono font-bold text-primary">{base > 0 ? djBpm(base, numPitch) : "0"}</div>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <div className="text-xs text-muted-foreground font-mono">{baseBpm || 0} × (1 + {numPitch > 0 ? `+${(numPitch / 100).toFixed(2)}` : (numPitch / 100).toFixed(2)})</div>
                  <Badge variant="secondary" className="font-mono text-xs">
                    Pitch Shift: ~{isFinite(numPitch) && numPitch > -100 ? pitchShift(numPitch) : "—"} st
                  </Badge>
                </div>
              </div>
              <Button
                variant="outline"
                className="gap-1.5 py-1.5"
                onClick={() => base > 0 && copy("dj", djBpm(base, numPitch))}
              >
                {copied === "dj" ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                {copied === "dj" ? "Copied!" : "Copy BPM"}
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="producer" className="mt-3">
          <div className="p-4 rounded-xl border bg-card">
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="space-y-1">
                <Label>Base BPM</Label>
                <Input type="number" min="0" step="any" value={baseBpm} onChange={(e) => setBaseBpm(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label>Semitones (n)</Label>
                <Input type="number" min="-12" max="12" step="any" value={semitones} onChange={(e) => setSemitones(e.target.value)} />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {semitonePresets.map((n) => (
                <Button key={n} variant="outline" size="sm" className="py-1.5" onClick={() => setSemitones(String(n))}>
                  {n > 0 ? `+${n} st` : `${n} st`}
                </Button>
              ))}
            </div>

            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Output BPM</div>
                  <div className="text-3xl font-mono font-bold text-primary">{base > 0 ? stBpm(base, numSemi) : "0"}</div>
                </div>
                <Button
                  variant="outline"
                  className="gap-1.5 py-1.5"
                  onClick={() => base > 0 && copy("producer", stBpm(base, numSemi))}
                >
                  {copied === "producer" ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                  {copied === "producer" ? "Copied!" : "Copy BPM"}
                </Button>
              </div>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <div className="text-xs text-muted-foreground font-mono">{baseBpm || 0} × 2^({semitones || 0} ÷ 12)</div>
                {base > 0 && (
                  <>
                    <Badge variant="secondary" className="font-mono text-xs">Factor {stFactor(numSemi)}x</Badge>
                    <Badge variant="secondary" className="font-mono text-xs">Speed Δ {numSemi > 0 ? `+${stSpeed(numSemi)}` : stSpeed(numSemi)}%</Badge>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="p-3 rounded-lg border bg-muted/30">
                <div className="text-xs text-muted-foreground mb-0.5">Speed Delta %</div>
                <div className="text-xl font-mono font-bold text-primary">{base > 0 ? `${numSemi > 0 ? "+" : ""}${stSpeed(numSemi)}%` : "0%"}</div>
              </div>
              <div className="p-3 rounded-lg border bg-muted/30">
                <div className="text-xs text-muted-foreground mb-0.5">Multiplicative Factor (e.g., 1.059x)</div>
                <div className="text-xl font-mono font-bold text-primary">{base > 0 ? `${stFactor(numSemi)}x` : "1x"}</div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <PitchTempoSeoContent />

      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground">
          Need to sync delay or reverb effects to BPM?{" "}
          <Link href="/bpm-to-ms" className="text-primary font-medium hover:underline">
            BPM to ms
          </Link>
        </p>
      </div>
    </div>
  )
}
