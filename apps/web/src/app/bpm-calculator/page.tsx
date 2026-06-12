"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import { toast } from "sonner"

export default function BpmCalculatorPage() {
  const [beats, setBeats] = useState("4")
  const [seconds, setSeconds] = useState("2")
  const [bpmResult, setBpmResult] = useState<number | null>(null)

  const [bpmForBeats, setBpmForBeats] = useState("120")
  const [secForBeats, setSecForBeats] = useState("2")
  const [beatsResult, setBeatsResult] = useState<number | null>(null)

  const [bpmForDuration, setBpmForDuration] = useState("120")
  const [beatsForDuration, setBeatsForDuration] = useState("4")
  const [durationResult, setDurationResult] = useState<number | null>(null)

  const calcBpm = () => {
    const b = Number(beats)
    const s = Number(seconds)
    if (b > 0 && s > 0) setBpmResult((b / (s / 60)))
  }

  const calcBeats = () => {
    const b = Number(bpmForBeats)
    const s = Number(secForBeats)
    if (b > 0 && s > 0) setBeatsResult(b * (s / 60))
  }

  const calcDuration = () => {
    const b = Number(bpmForDuration)
    const beats = Number(beatsForDuration)
    if (b > 0 && beats > 0) setDurationResult(beats / (b / 60))
  }

  const copy = (val: string) => {
    navigator.clipboard.writeText(val)
    toast("Copied to clipboard")
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-lg">
      <h1 className="text-4xl font-serif font-bold mb-8 text-center">BPM Calculator</h1>

      <Tabs defaultValue="bpm">
        <TabsList className="w-full">
          <TabsTrigger value="bpm" className="flex-1">Find BPM</TabsTrigger>
          <TabsTrigger value="beats" className="flex-1">Find Beats</TabsTrigger>
          <TabsTrigger value="duration" className="flex-1">Find Duration</TabsTrigger>
        </TabsList>

        <TabsContent value="bpm" className="space-y-4 mt-6">
          <div>
            <Label>Number of Beats</Label>
            <Input type="number" value={beats} onChange={(e) => setBeats(e.target.value)} />
          </div>
          <div>
            <Label>Duration (seconds)</Label>
            <Input type="number" value={seconds} onChange={(e) => setSeconds(e.target.value)} />
          </div>
          <Button onClick={calcBpm} className="w-full">Calculate BPM</Button>
          {bpmResult !== null && (
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-3xl font-bold font-mono">{bpmResult.toFixed(2)} BPM</p>
              <p className="text-sm text-muted-foreground mt-1">
                Formula: beats / (seconds / 60)
              </p>
              <Button variant="ghost" size="sm" onClick={() => copy(bpmResult.toFixed(2))}>
                <Copy className="w-3 h-3 mr-1" /> Copy
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="beats" className="space-y-4 mt-6">
          <div>
            <Label>BPM</Label>
            <Input type="number" value={bpmForBeats} onChange={(e) => setBpmForBeats(e.target.value)} />
          </div>
          <div>
            <Label>Duration (seconds)</Label>
            <Input type="number" value={secForBeats} onChange={(e) => setSecForBeats(e.target.value)} />
          </div>
          <Button onClick={calcBeats} className="w-full">Calculate Beats</Button>
          {beatsResult !== null && (
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-3xl font-bold font-mono">{beatsResult.toFixed(2)} beats</p>
              <p className="text-sm text-muted-foreground mt-1">
                Formula: BPM × (seconds / 60)
              </p>
              <Button variant="ghost" size="sm" onClick={() => copy(beatsResult.toFixed(2))}>
                <Copy className="w-3 h-3 mr-1" /> Copy
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="duration" className="space-y-4 mt-6">
          <div>
            <Label>BPM</Label>
            <Input type="number" value={bpmForDuration} onChange={(e) => setBpmForDuration(e.target.value)} />
          </div>
          <div>
            <Label>Number of Beats</Label>
            <Input type="number" value={beatsForDuration} onChange={(e) => setBeatsForDuration(e.target.value)} />
          </div>
          <Button onClick={calcDuration} className="w-full">Calculate Duration</Button>
          {durationResult !== null && (
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-3xl font-bold font-mono">{durationResult.toFixed(2)} seconds</p>
              <p className="text-sm text-muted-foreground mt-1">
                Formula: beats / (BPM / 60)
              </p>
              <Button variant="ghost" size="sm" onClick={() => copy(durationResult.toFixed(2))}>
                <Copy className="w-3 h-3 mr-1" /> Copy
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
