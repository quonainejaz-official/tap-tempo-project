"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import { toast } from "sonner"
import { BpmCalculatorSeoContent } from "@/components/bpm-calculator-seo-content"

export default function BpmCalculatorPage() {
  const [beats, setBeats] = useState("16")
  const [seconds, setSeconds] = useState("8")

  const [bpmForBeats, setBpmForBeats] = useState("120")
  const [secForBeats, setSecForBeats] = useState("2")

  const [bpmForDuration, setBpmForDuration] = useState("120")
  const [beatsForDuration, setBeatsForDuration] = useState("16")

  const calcBpm = (b: string, s: string) => {
    const numB = parseFloat(b)
    const numS = parseFloat(s)
    if (numB > 0 && numS > 0) return (numB / (numS / 60)).toFixed(2)
    return "0"
  }

  const calcBeats = (bpm: string, s: string) => {
    const numBpm = parseFloat(bpm)
    const numS = parseFloat(s)
    if (numBpm > 0 && numS > 0) return (numBpm * (numS / 60)).toFixed(2)
    return "0"
  }

  const calcDuration = (bpm: string, b: string) => {
    const numBpm = parseFloat(bpm)
    const numB = parseFloat(b)
    if (numBpm > 0 && numB > 0) return (numB / (numBpm / 60)).toFixed(2)
    return "0"
  }

  const copy = (val: string) => {
    navigator.clipboard.writeText(val)
    toast.success("Copied result")
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold tracking-tight mb-2">BPM Calculator</h1>
        <p className="text-muted-foreground">Calculate BPM from beats and time, find total beats from tempo, or estimate song duration with this free BPM Calculator.</p>
      </div>

      <Tabs defaultValue="find-bpm" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="find-bpm">Find BPM</TabsTrigger>
          <TabsTrigger value="find-beats">Find Beats</TabsTrigger>
          <TabsTrigger value="find-duration">Find Duration</TabsTrigger>
        </TabsList>

        <TabsContent value="find-bpm" className="mt-6">
          <div className="p-6 rounded-xl border bg-card">
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <Label>Number of Beats</Label>
                <Input type="number" value={beats} onChange={e => setBeats(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Duration (Seconds)</Label>
                <Input type="number" value={seconds} onChange={e => setSeconds(e.target.value)} />
              </div>
            </div>

            <div className="p-6 bg-muted/50 rounded-lg flex justify-between items-center">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Result (BPM)</div>
                <div className="text-4xl font-mono font-bold text-primary">{calcBpm(beats, seconds)}</div>
                <div className="text-xs text-muted-foreground mt-2 font-mono">(60 × {beats || 0}) ÷ {seconds || 0}</div>
              </div>
              <Button size="icon" variant="outline" onClick={() => copy(calcBpm(beats, seconds))}><Copy className="w-4 h-4" /></Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="find-beats" className="mt-6">
          <div className="p-6 rounded-xl border bg-card">
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <Label>BPM</Label>
                <Input type="number" value={bpmForBeats} onChange={e => setBpmForBeats(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Duration (Seconds)</Label>
                <Input type="number" value={secForBeats} onChange={e => setSecForBeats(e.target.value)} />
              </div>
            </div>
            <div className="p-6 bg-muted/50 rounded-lg flex justify-between items-center">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Result (Beats)</div>
                <div className="text-4xl font-mono font-bold text-primary">{calcBeats(bpmForBeats, secForBeats)}</div>
                <div className="text-xs text-muted-foreground mt-2 font-mono">{bpmForBeats || 0} × ({secForBeats || 0} ÷ 60)</div>
              </div>
              <Button size="icon" variant="outline" onClick={() => copy(calcBeats(bpmForBeats, secForBeats))}><Copy className="w-4 h-4" /></Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="find-duration" className="mt-6">
          <div className="p-6 rounded-xl border bg-card">
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <Label>BPM</Label>
                <Input type="number" value={bpmForDuration} onChange={e => setBpmForDuration(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Number of Beats</Label>
                <Input type="number" value={beatsForDuration} onChange={e => setBeatsForDuration(e.target.value)} />
              </div>
            </div>
            <div className="p-6 bg-muted/50 rounded-lg flex justify-between items-center">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Result (Seconds)</div>
                <div className="text-4xl font-mono font-bold text-primary">{calcDuration(bpmForDuration, beatsForDuration)}</div>
                <div className="text-xs text-muted-foreground mt-2 font-mono">{beatsForDuration || 0} ÷ ({bpmForDuration || 0} ÷ 60)</div>
              </div>
              <Button size="icon" variant="outline" onClick={() => copy(calcDuration(bpmForDuration, beatsForDuration))}><Copy className="w-4 h-4" /></Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <BpmCalculatorSeoContent />
    </div>
  )
}
