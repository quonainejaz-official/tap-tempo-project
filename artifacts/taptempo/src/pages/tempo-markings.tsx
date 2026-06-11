import { useState } from "react";
import { tempoMarkings } from "@/lib/content/tempoMarkings";
import { Slider } from "@/components/ui/slider";
import { useAudioEngine } from "@/hooks/use-audio-engine";
import { Play, Square } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TempoMarkingsPage() {
  const [bpm, setBpm] = useState(120);
  const { init, playMetronomeClick } = useAudioEngine();
  const [playingBpm, setPlayingBpm] = useState<number | null>(null);

  const playPreview = (targetBpm: number) => {
    init();
    if (playingBpm === targetBpm) {
      setPlayingBpm(null);
      return;
    }
    setPlayingBpm(targetBpm);
    const msPerBeat = 60000 / targetBpm;
    
    // Play 4 beats
    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        playMetronomeClick(i === 0, 1);
        if (i === 3) {
          setTimeout(() => setPlayingBpm(null), msPerBeat);
        }
      }, i * msPerBeat);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold tracking-tight mb-2">Italian Tempo Markings</h1>
        <p className="text-muted-foreground">Classical music tempo dictionary with interactive BPM ranges.</p>
      </div>

      <div className="bg-card border rounded-xl p-6 mb-8 space-y-6">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">BPM Range Explorer</label>
          <span className="font-mono text-2xl font-bold text-primary">{bpm} BPM</span>
        </div>
        <Slider 
          value={[bpm]} 
          min={10} 
          max={300} 
          onValueChange={(v) => setBpm(v[0])}
        />
        
        {/* Spectrum Bar */}
        <div className="w-full h-4 rounded-full bg-gradient-to-r from-blue-500 via-yellow-500 to-red-500 relative">
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_4px_rgba(0,0,0,0.5)] transition-all duration-100"
            style={{ left: `${((bpm - 10) / 290) * 100}%` }}
          />
        </div>
      </div>

      <div className="grid gap-4">
        {tempoMarkings.map((mark) => {
          const isActive = bpm >= mark.bpmMin && bpm <= mark.bpmMax;
          const midBpm = Math.round((mark.bpmMin + mark.bpmMax) / 2);
          
          return (
            <div 
              key={mark.term} 
              className={`border rounded-lg p-4 transition-all duration-300 flex items-center justify-between gap-4 ${
                isActive ? "border-primary bg-primary/5 shadow-sm" : "bg-card hover:border-primary/30"
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-serif text-xl font-bold">{mark.term}</h3>
                  <span className="font-mono text-sm text-muted-foreground bg-muted px-2 py-0.5 rounded">
                    {mark.bpmMin} - {mark.bpmMax}
                  </span>
                </div>
                <p className="text-foreground/80">{mark.description}</p>
                <p className="text-sm text-muted-foreground italic">{mark.musicalFeel}</p>
              </div>
              
              <Button 
                variant={playingBpm === midBpm ? "default" : "outline"}
                size="icon" 
                className="shrink-0 rounded-full h-12 w-12"
                onClick={() => playPreview(midBpm)}
              >
                {playingBpm === midBpm ? <Square className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
