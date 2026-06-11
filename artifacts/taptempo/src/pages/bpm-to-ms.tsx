import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export default function BpmToMsPage() {
  const [bpm, setBpm] = useState(120);

  const calculateMs = (noteFraction: number) => {
    // 1 beat = 1 quarter note = 60000 / BPM ms
    const quarterNoteMs = 60000 / bpm;
    // noteFraction: 1 = whole, 0.5 = half, 0.25 = quarter, etc.
    // 1 quarter note = 0.25 of a whole note.
    const multiplier = noteFraction / 0.25;
    return Math.round(quarterNoteMs * multiplier);
  };

  const notes = [
    { name: "Whole Note (1/1)", fraction: 1 },
    { name: "Half Note (1/2)", fraction: 0.5 },
    { name: "Quarter Note (1/4)", fraction: 0.25, label: "Delay / LFO" },
    { name: "Eighth Note (1/8)", fraction: 0.125, label: "Standard Delay" },
    { name: "Sixteenth Note (1/16)", fraction: 0.0625, label: "Fast Delay / Pre-delay" },
    { name: "Thirty-Second Note (1/32)", fraction: 0.03125 },
    { name: "Quarter Triplet (1/4T)", fraction: 0.25 * (2/3) },
    { name: "Eighth Triplet (1/8T)", fraction: 0.125 * (2/3) },
    { name: "Sixteenth Triplet (1/16T)", fraction: 0.0625 * (2/3) },
    { name: "Dotted Quarter (1/4D)", fraction: 0.25 * 1.5 },
    { name: "Dotted Eighth (1/8D)", fraction: 0.125 * 1.5 },
  ];

  const copy = (val: number) => {
    navigator.clipboard.writeText(val.toString());
    toast.success(`Copied ${val}ms`);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold tracking-tight mb-2">BPM to Milliseconds</h1>
        <p className="text-muted-foreground">Convert tempo to exact millisecond values for reverb pre-delay, compressor release, and LFO sync.</p>
      </div>

      <div className="bg-card border rounded-xl p-6 mb-8 flex items-center gap-6">
        <div className="space-y-1">
          <label className="text-sm font-medium">Target BPM</label>
          <div className="flex items-center gap-2">
            <Input 
              type="number" 
              value={bpm} 
              onChange={e => setBpm(Math.max(1, parseInt(e.target.value) || 120))}
              className="w-32 font-mono text-lg"
            />
          </div>
        </div>
      </div>

      <div className="border rounded-xl bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Note Value</TableHead>
              <TableHead>Producer Usage</TableHead>
              <TableHead className="text-right">Time (ms)</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notes.map((note) => {
              const ms = calculateMs(note.fraction);
              return (
                <TableRow key={note.name}>
                  <TableCell className="font-medium">{note.name}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{note.label || ""}</TableCell>
                  <TableCell className="text-right font-mono text-primary font-bold">{ms} ms</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => copy(ms)}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
