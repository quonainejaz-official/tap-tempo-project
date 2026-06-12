"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Copy } from "lucide-react"
import { toast } from "sonner"

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

export default function BpmToMsPage() {
  const [bpm, setBpm] = useState("120")

  const calculateMs = (noteFraction: number) => {
    const b = Number(bpm)
    if (b <= 0) return 0
    return (60000 / b) * (noteFraction / 0.25)
  }

  const copy = (val: string) => {
    navigator.clipboard.writeText(val)
    toast("Copied to clipboard")
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-serif font-bold mb-2 text-center">BPM to Milliseconds</h1>
      <p className="text-muted-foreground text-center mb-8">
        Convert tempo to exact millisecond values for all note divisions.
      </p>

      <div className="max-w-xs mx-auto mb-10">
        <Input
          type="number"
          value={bpm}
          onChange={(e) => setBpm(e.target.value)}
          className="text-center text-2xl h-14"
          placeholder="Enter BPM"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Note Division</TableHead>
            <TableHead className="text-right">Milliseconds</TableHead>
            <TableHead className="w-10"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {noteDivisions.map((nd) => (
            <TableRow key={nd.label}>
              <TableCell className="font-medium">{nd.label}</TableCell>
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
    </div>
  )
}
