import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-black dark:bg-black text-white py-12 border-t">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <Link href="/" className="font-serif text-2xl font-bold italic">
              TheTapTempo
            </Link>
            <p className="text-sm text-gray-400 mt-2 leading-relaxed">
              Professional BPM tools for musicians, producers, and DJs.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-gray-300">Tools</h4>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <Link href="/tap-tempo" className="hover:text-white transition-colors">Tap Tempo</Link>
              <Link href="/metronome" className="hover:text-white transition-colors">Metronome</Link>
              <Link href="/bpm-calculator" className="hover:text-white transition-colors">BPM Calculator</Link>
              <Link href="/delay-time-calculator" className="hover:text-white transition-colors">Delay Time</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-gray-300">Reference</h4>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <Link href="/bpm-to-ms" className="hover:text-white transition-colors">BPM to ms</Link>
              <Link href="/tempo-markings" className="hover:text-white transition-colors">Tempo Markings</Link>
              <Link href="/beats-per-bar-calculator" className="hover:text-white transition-colors">Beats Per Bar</Link>
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-gray-300">More</h4>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <a href="mailto:taptempous@gmail.com" className="hover:text-white transition-colors">Contact</a>
              <span className="text-gray-600">TapTempo © {new Date().getFullYear()}</span>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-600">
          Built for the rhythm. All tools are free and run entirely in your browser.
        </div>
      </div>
    </footer>
  )
}
