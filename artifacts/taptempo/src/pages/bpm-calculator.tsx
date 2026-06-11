import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export default function BpmCalculatorPage() {
  const [beats, setBeats] = useState("16");
  const [seconds, setSeconds] = useState("8");
  const [bpm, setBpm] = useState("120");

  const calcBpm = (b: string, s: string) => (parseFloat(b) / (parseFloat(s) / 60)).toFixed(2);
  const calcBeats = (bpm: string, s: string) => (parseFloat(bpm) * (parseFloat(s) / 60)).toFixed(2);
  const calcDuration = (bpm: string, b: string) => (parseFloat(b) / (parseFloat(bpm) / 60)).toFixed(2);

  const copy = (val: string) => {
    navigator.clipboard.writeText(val);
    toast.success("Copied result");
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold tracking-tight mb-2">BPM Calculator</h1>
        <p className="text-muted-foreground">Calculate BPM from duration, or duration from BPM.</p>
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
                <div className="text-4xl font-mono font-bold text-primary">{calcBpm(beats, seconds) !== "NaN" ? calcBpm(beats, seconds) : "0"}</div>
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
                <Input type="number" value={bpm} onChange={e => setBpm(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Duration (Seconds)</Label>
                <Input type="number" value={seconds} onChange={e => setSeconds(e.target.value)} />
              </div>
            </div>
            <div className="p-6 bg-muted/50 rounded-lg flex justify-between items-center">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Result (Beats)</div>
                <div className="text-4xl font-mono font-bold text-primary">{calcBeats(bpm, seconds) !== "NaN" ? calcBeats(bpm, seconds) : "0"}</div>
              </div>
              <Button size="icon" variant="outline" onClick={() => copy(calcBeats(bpm, seconds))}><Copy className="w-4 h-4" /></Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="find-duration" className="mt-6">
          <div className="p-6 rounded-xl border bg-card">
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <Label>BPM</Label>
                <Input type="number" value={bpm} onChange={e => setBpm(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Number of Beats</Label>
                <Input type="number" value={beats} onChange={e => setBeats(e.target.value)} />
              </div>
            </div>
            <div className="p-6 bg-muted/50 rounded-lg flex justify-between items-center">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Result (Seconds)</div>
                <div className="text-4xl font-mono font-bold text-primary">{calcDuration(bpm, beats) !== "NaN" ? calcDuration(bpm, beats) : "0"}</div>
              </div>
              <Button size="icon" variant="outline" onClick={() => copy(calcDuration(bpm, beats))}><Copy className="w-4 h-4" /></Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
