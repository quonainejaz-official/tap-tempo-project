import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t bg-black dark:bg-black text-white py-12">
      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-start gap-8">
        <div>
          <Link href="/" className="font-serif text-2xl font-bold italic tracking-tight mb-4 inline-block text-white">
            TheTapTempo
          </Link>
          <p className="text-white/60 text-sm max-w-xs">
            A world-class, Apple-caliber music tempo toolkit for musicians, producers, DJs, drummers, and audio engineers.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          <div className="flex flex-col space-y-2">
            <span className="font-bold text-sm text-white/90 mb-2">Tools</span>
            <Link href="/tap-tempo" className="text-sm text-white/60 hover:text-white transition-colors">Tap Tempo</Link>
            <Link href="/metronome" className="text-sm text-white/60 hover:text-white transition-colors">Metronome</Link>
            <Link href="/bpm-calculator" className="text-sm text-white/60 hover:text-white transition-colors">BPM Calculator</Link>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="font-bold text-sm text-white/90 mb-2">Reference</span>
            <Link href="/bpm-to-ms" className="text-sm text-white/60 hover:text-white transition-colors">BPM to ms</Link>
            <Link href="/delay-time-calculator" className="text-sm text-white/60 hover:text-white transition-colors">Delay Time</Link>
            <Link href="/tempo-markings" className="text-sm text-white/60 hover:text-white transition-colors">Tempo Markings</Link>
            <Link href="/beats-per-bar-calculator" className="text-sm text-white/60 hover:text-white transition-colors">Beats Per Bar</Link>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="font-bold text-sm text-white/90 mb-2">More</span>
            <Link href="/blog" className="text-sm text-white/60 hover:text-white transition-colors">Blog</Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-8 mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-white/40">
        <p>© {new Date().getFullYear()} TheTapTempo. All rights reserved.</p>
        <p>Built with precision.</p>
      </div>
    </footer>
  );
}
