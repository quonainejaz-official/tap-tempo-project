import { useState, useEffect } from "react";
import { timeSignatures } from "@/lib/content/timeSignatures";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAudioEngine } from "@/hooks/use-audio-engine";
import { Play, Square } from "lucide-react";
import { motion } from "framer-motion";

export default function BeatsPerBarCalculatorPage() {
  const [num, setNum] = useState(4);
  const [den, setDen] = useState(4);
  const [bpm, setBpm] = useState(120);
  const [playing, setPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(-1);
  const [accents, setAccents] = useState<number[]>([0]); // Index 0 is accented by default

  const { init, playMetronomeClick } = useAudioEngine();

  const toggleAccent = (idx: number) => {
    if (accents.includes(idx)) {
      setAccents(accents.filter(a => a !== idx));
    } else {
      setAccents([...accents, idx]);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (playing) {
      init();
      // Calculate ms per beat based on denominator
      // Standard: 1/4 note = 60000/bpm
      const msPerQuarter = 60000 / bpm;
      const msPerBeat = msPerQuarter * (4 / den);
      
      let beat = 0;
      setCurrentBeat(0);
      playMetronomeClick(accents.includes(0), 1);
      
      interval = setInterval(() => {
        beat = (beat + 1) % num;
        setCurrentBeat(beat);
        playMetronomeClick(accents.includes(beat), 1);
      }, msPerBeat);
    } else {
      setCurrentBeat(-1);
    }
    
    return () => clearInterval(interval);
  }, [playing, bpm, num, den, accents, init, playMetronomeClick]);

  const togglePlay = () => setPlaying(!playing);

  const sigString = `${num}/${den}`;
  const matchedInfo = timeSignatures.find(s => s.signature === sigString);

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold tracking-tight mb-2">Beats Per Bar Calculator</h1>
        <p className="text-muted-foreground">Interactive time signature tool with custom accent programming.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-card border rounded-xl p-6 flex flex-col gap-4">
          <label className="text-sm font-medium">Time Signature</label>
          <div className="flex items-center gap-4">
            <Select value={num.toString()} onValueChange={v => { setNum(parseInt(v)); setAccents([0]); }}>
              <SelectTrigger className="text-2xl h-14 font-mono font-bold"><SelectValue /></SelectTrigger>
              <SelectContent>
                {[1,2,3,4,5,6,7,8,9,10,11,12].map(n => (
                  <SelectItem key={n} value={n.toString()}>{n}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-3xl text-muted-foreground font-light">/</span>
            <Select value={den.toString()} onValueChange={v => { setDen(parseInt(v)); setAccents([0]); }}>
              <SelectTrigger className="text-2xl h-14 font-mono font-bold"><SelectValue /></SelectTrigger>
              <SelectContent>
                {[2,4,8,16].map(n => (
                  <SelectItem key={n} value={n.toString()}>{n}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bg-card border rounded-xl p-6 flex flex-col gap-4">
          <label className="text-sm font-medium">Tempo</label>
          <div className="flex items-center gap-4">
            <Input 
              type="number" 
              value={bpm} 
              onChange={e => setBpm(Math.max(1, parseInt(e.target.value) || 120))}
              className="text-2xl h-14 font-mono font-bold"
            />
            <span className="text-muted-foreground">BPM</span>
          </div>
        </div>
      </div>

      <div className="bg-card border rounded-xl p-8 mb-8 flex flex-col items-center">
        <div className="text-sm text-muted-foreground mb-6">Click boxes to set accents</div>
        
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {Array.from({ length: num }).map((_, i) => {
            const isAccented = accents.includes(i);
            const isActive = currentBeat === i;
            
            return (
              <motion.button
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleAccent(i)}
                className={`relative w-12 rounded-lg transition-colors overflow-hidden border-2 ${
                  isAccented 
                    ? isActive ? 'bg-primary border-primary h-20' : 'bg-primary/20 border-primary/50 h-20' 
                    : isActive ? 'bg-foreground border-foreground h-16' : 'bg-muted border-transparent h-16'
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="beat-highlight"
                    className="absolute inset-0 bg-white/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        <Button 
          size="lg" 
          onClick={togglePlay}
          className={`w-40 rounded-full h-14 text-lg gap-2 ${playing ? 'bg-destructive text-white hover:bg-destructive/90' : ''}`}
        >
          {playing ? <><Square className="w-5 h-5 fill-current" /> STOP</> : <><Play className="w-5 h-5 fill-current ml-1" /> PLAY</>}
        </Button>
      </div>

      {matchedInfo && (
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 text-primary-foreground">
          <h3 className="font-bold text-xl mb-2 text-primary">{matchedInfo.signature} Time Signature</h3>
          <p className="mb-2"><strong>Description:</strong> {matchedInfo.description}</p>
          <p className="mb-2"><strong>Feel:</strong> {matchedInfo.feel}</p>
          <p><strong>Examples:</strong> {matchedInfo.examples}</p>
        </div>
      )}
    </div>
  );
}
