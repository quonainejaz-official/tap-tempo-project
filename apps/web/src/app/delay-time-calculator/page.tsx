"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Copy } from "lucide-react"
import { toast } from "sonner"

const noteDivisions = [
  { label: "1/4", fraction: 1 },
  { label: "1/4 Dotted", fraction: 1.5 },
  { label: "1/4 Triplet", fraction: 2 / 3 },
  { label: "1/8", fraction: 0.5 },
  { label: "1/8 Dotted", fraction: 0.75 },
  { label: "1/8 Triplet", fraction: 1 / 3 },
  { label: "1/16", fraction: 0.25 },
  { label: "1/16 Dotted", fraction: 0.375 },
  { label: "1/16 Triplet", fraction: 1 / 6 },
]

const feels: Record<string, string[]> = {
  Standard: ["1/4", "1/8", "1/16"],
  Slapback: ["1/8", "1/16"],
  "Slap Echo": ["1/8 Dotted"],
  "Long Hall": ["1/4 Dotted"],
  "Ping Pong": ["1/4", "1/8 Dotted"],
}

export default function DelayTimeCalculatorPage() {
  const [bpm, setBpm] = useState("120")
  const [activeFeel, setActiveFeel] = useState<string | null>(null)

  const calculateMs = (noteFraction: number) => {
    const b = Number(bpm)
    if (b <= 0) return 0
    return (60000 / b) * noteFraction
  }

  const copy = (val: string) => {
    navigator.clipboard.writeText(val)
    toast("Copied to clipboard")
  }

  const copyForDaw = () => {
    const lines = [`BPM: ${bpm}\n`, "Delay Times:"]
    noteDivisions.forEach((nd) => {
      lines.push(`${nd.label}: ${calculateMs(nd.fraction).toFixed(2)}ms`)
    })
    navigator.clipboard.writeText(lines.join("\n"))
    toast("Copied for DAW")
  }

  const isHighlighted = (label: string) => {
    if (!activeFeel) return false
    return feels[activeFeel]?.includes(label)
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-serif font-bold">Delay Time Calculator</h1>
          <p className="text-muted-foreground mt-1">
            Calculate precise millisecond values for your delays.
          </p>
        </div>
        <Button variant="outline" onClick={copyForDaw} className="hidden sm:flex">
          <Copy className="w-4 h-4 mr-2" /> Copy for DAW
        </Button>
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
        {Object.keys(feels).map((feel) => (
          <Button
            key={feel}
            variant={activeFeel === feel ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFeel(activeFeel === feel ? null : feel)}
          >
            {feel}
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
          {noteDivisions.map((nd) => (
            <TableRow
              key={nd.label}
              className={isHighlighted(nd.label) ? "bg-muted/50 border-primary" : ""}
            >
              <TableCell className="font-medium">
                {nd.label}
                {isHighlighted(nd.label) && (
                  <span className="ml-2 text-xs text-primary">(Recommended)</span>
                )}
              </TableCell>
              <TableCell className="text-right font-mono">
                {calculateMs(nd.fraction).toFixed(2)} ms
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

      <div className="mt-6 sm:hidden">
        <Button variant="outline" className="w-full" onClick={copyForDaw}>
          <Copy className="w-4 h-4 mr-2" /> Copy for DAW
        </Button>
      </div>
    </div>
  )
}
