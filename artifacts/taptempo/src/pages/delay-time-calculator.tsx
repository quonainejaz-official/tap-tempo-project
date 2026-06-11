import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export default function DelayTimeCalculatorPage() {
  const [bpm, setBpm] = useState(120);
  const [preset, setPreset] = useState<string>("Standard");

  const calculateMs = (noteFraction: number) => {
    const quarterNoteMs = 60000 / bpm;
    const multiplier = noteFraction / 0.25;
    return Math.round(quarterNoteMs * multiplier);
  };

  const notes = [
    { name: "1/4", fraction: 0.25 },
    { name: "1/4 Dotted", fraction: 0.25 * 1.5 },
    { name: "1/4 Triplet", fraction: 0.25 * (2/3) },
    { name: "1/8", fraction: 0.125 },
    { name: "1/8 Dotted", fraction: 0.125 * 1.5 },
    { name: "1/8 Triplet", fraction: 0.125 * (2/3) },
    { name: "1/16", fraction: 0.0625 },
    { name: "1/16 Dotted", fraction: 0.0625 * 1.5 },
    { name: "1/16 Triplet", fraction: 0.0625 * (2/3) },
  ];

  const presets: Record<string, string[]> = {
    "Standard": ["1/4", "1/8", "1/16"],
    "Slapback": ["1/16", "1/16 Triplet", "1/32"],
    "Slap Echo": ["1/8", "1/16 Dotted"],
    "Long Hall": ["1/4", "1/2"],
    "Ping Pong": ["1/4 Dotted", "1/8"],
  };

  const copy = (val: number, label: string) => {
    navigator.clipboard.writeText(val.toString());
    toast.success(`Copied ${val}ms for ${label}`);
  };

  const copyDawFormat = () => {
    const lines = notes.map(n => `${n.name}: ${calculateMs(n.fraction)}ms`).join("\n");
    navigator.clipboard.writeText(`BPM: ${bpm}\n\nDelay Times:\n${lines}`);
    toast.success("Copied full table for DAW");
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-serif font-bold tracking-tight mb-2">Delay Time Calculator</h1>
          <p className="text-muted-foreground">Calculate precise millisecond values for delay pedals and plugins.</p>
        </div>
        <Button onClick={copyDawFormat} variant="outline" className="hidden sm:flex">
          <Copy className="w-4 h-4 mr-2" /> Copy for DAW
        </Button>
      </div>

      <div className="bg-card border rounded-xl p-6 mb-8 grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">BPM</label>
          <Input 
            type="number" 
            value={bpm} 
            onChange={e => setBpm(Math.max(1, parseInt(e.target.value) || 120))}
            className="w-full font-mono text-lg"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Preset Feel</label>
          <div className="flex flex-wrap gap-2">
            {Object.keys(presets).map(p => (
              <Button 
                key={p} 
                variant={preset === p ? "default" : "outline"} 
                size="sm" 
                onClick={() => setPreset(p)}
              >
                {p}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="border rounded-xl bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Note Value</TableHead>
              <TableHead className="text-right">Time (ms)</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notes.map((note) => {
              const ms = calculateMs(note.fraction);
              const isHighlight = presets[preset].includes(note.name);
              return (
                <TableRow key={note.name} className={isHighlight ? "bg-muted/50" : ""}>
                  <TableCell className="font-medium">
                    {note.name} Note
                    {isHighlight && <span className="ml-2 text-xs text-primary font-bold">(Recommended)</span>}
                  </TableCell>
                  <TableCell className="text-right font-mono text-primary font-bold">{ms} ms</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => copy(ms, note.name)}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <Button onClick={copyDawFormat} variant="outline" className="w-full mt-4 sm:hidden">
        <Copy className="w-4 h-4 mr-2" /> Copy for DAW
      </Button>
    </div>
  );
}
