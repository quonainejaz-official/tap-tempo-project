export default function AiTempoPage() {
  return (
    <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-12 md:py-20">
      <style>{`
        .glow-on-hover {
          transition: all 0.3s ease-in-out;
          box-shadow: 0 0 0px hsl(216 100% 50% / 0);
        }
        .glow-on-hover:hover {
          box-shadow: 0 0 18px hsl(216 100% 50% / 0.6);
          transform: scale(1.02);
          border-color: hsl(216 100% 50% / 0.8);
        }
        @keyframes float-soft {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-12px); }
        }
        .float-element { animation: float-soft 6s infinite alternate ease-in-out; }
      `}</style>

      {/* Header */}
      <div className="flex justify-between items-center mb-12 md:mb-20 flex-wrap gap-4">
        <div className="flex items-center gap-2 group cursor-default">
          <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="text-primary-foreground font-bold text-lg">♪</span>
          </div>
          <span className="font-semibold text-xl tracking-tight text-foreground">TapTempo<span className="text-primary">AI</span></span>
        </div>
        <div className="text-sm font-medium px-4 py-1.5 rounded-full bg-secondary border border-border text-primary shadow-sm">
          Beta v1.0 — music &amp; tempo Q&amp;A
        </div>
      </div>

      {/* Hero */}
      <div className="min-h-[90vh] flex items-center justify-center mb-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-secondary rounded-full px-4 py-1.5 border border-border">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-xs uppercase tracking-wider font-semibold text-primary">AI-powered • always ready</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
              <span className="text-foreground">Get Instant Answers</span><br />
              <span className="text-primary">About Tempo, BPM &amp; Timing</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
              Ask <span className="font-semibold text-foreground">TapTempoAI</span> any question about BPM, tempo conversions, time signatures, practice techniques, or music terminology and get an instant answer — built for musicians, producers, and DJs.
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <a
                href="https://ai.thetaptempo.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="glow-on-hover group relative inline-flex items-center gap-3 bg-primary text-primary-foreground font-semibold py-4 px-8 rounded-full transition-all duration-300 shadow-lg shadow-primary/30 border border-primary/20 text-lg hover:bg-primary/90"
              >
                <span>Ask TapTempoAI</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
              <div className="flex items-center gap-1 text-muted-foreground text-sm bg-black/30 px-4 py-2 rounded-full border border-border">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                <span>instant response · zero latency</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-5 pt-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">Instant answers</div>
              <div className="flex items-center gap-1">Secure &amp; private</div>
              <div className="flex items-center gap-1">Context-aware</div>
              <div className="flex items-center gap-1">Multi-genre</div>
            </div>
          </div>

          <div className="relative flex justify-center items-center">
            <div className="float-element relative w-full max-w-md bg-card border border-border rounded-3xl p-5 shadow-2xl">
              <div className="flex justify-between items-center border-b border-border pb-3 mb-4">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <span className="text-xs text-primary font-mono">tempo · TapTempo active</span>
              </div>
              <div className="space-y-3 font-mono text-sm">
                <p className="text-muted-foreground"><span className="text-primary">&gt;&gt;</span> <span className="text-foreground">What BPM is drum and bass usually?</span></p>
                <p className="text-muted-foreground flex flex-wrap gap-1 items-start"><span className="text-primary">AI:</span> <span className="text-foreground">Drum and bass typically ranges from 160 to 180 BPM. The most common tempo is around 170-175 BPM, characterized by fast breakbeats and heavy basslines.</span></p>
                <div className="bg-background rounded-xl p-3 border border-border mt-2">
                  <p className="text-[0.7rem] text-primary whitespace-pre-wrap">{`Want to find the BPM of a track? Use our Tap Tempo tool to tap along and get instant results.`}</p>
                </div>
                <div className="flex gap-2 pt-2 text-xs text-muted-foreground">
                  <span>explained in 0.2s</span>
                  <span>98% accuracy</span>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-3 bg-primary rounded-full px-4 py-1.5 text-[11px] font-bold shadow-lg shadow-primary/30 flex items-center gap-1 text-primary-foreground">
              TapTempo core v2
            </div>
          </div>
        </div>
      </div>

      {/* Example Queries */}
      <div className="py-24 border-b border-border bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary uppercase tracking-wider text-sm font-semibold bg-secondary px-4 py-1 rounded-full">Example questions</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 text-foreground">Ask anything about<br />tempo, BPM &amp; rhythm</h2>
            <p className="text-muted-foreground mt-4">TapTempoAI answers music and tempo questions instantly — no signup needed.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="bg-muted/30 border border-border/50 rounded-2xl p-5 text-center text-sm text-foreground font-medium hover:border-primary/50 transition-colors cursor-default">
              What BPM is drum and bass usually?
            </div>
            <div className="bg-muted/30 border border-border/50 rounded-2xl p-5 text-center text-sm text-foreground font-medium hover:border-primary/50 transition-colors cursor-default">
              How do I convert 120 BPM to a delay time in milliseconds?
            </div>
            <div className="bg-muted/30 border border-border/50 rounded-2xl p-5 text-center text-sm text-foreground font-medium hover:border-primary/50 transition-colors cursor-default">
              Is 140 BPM too fast to practice as a beginner?
            </div>
            <div className="bg-muted/30 border border-border/50 rounded-2xl p-5 text-center text-sm text-foreground font-medium hover:border-primary/50 transition-colors cursor-default">
              What&apos;s the difference between Andante and Allegro?
            </div>
            <div className="bg-muted/30 border border-border/50 rounded-2xl p-5 text-center text-sm text-foreground font-medium hover:border-primary/50 transition-colors cursor-default">
              How many beats per bar is 6/8 time?
            </div>
            <div className="bg-muted/30 border border-border/50 rounded-2xl p-5 text-center text-sm text-foreground font-medium hover:border-primary/50 transition-colors cursor-default">
              What tempo should I set my metronome to for a waltz?
            </div>
            <div className="bg-muted/30 border border-border/50 rounded-2xl p-5 text-center text-sm text-foreground font-medium hover:border-primary/50 transition-colors cursor-default">
              What&apos;s the typical BPM range for hip-hop?
            </div>
            <div className="bg-muted/30 border border-border/50 rounded-2xl p-5 text-center text-sm text-foreground font-medium hover:border-primary/50 transition-colors cursor-default">
              How do I calculate BPM from milliseconds?
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-24 border-b border-border bg-muted/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary uppercase tracking-wider text-sm font-semibold bg-secondary px-4 py-1 rounded-full">Why TapTempoAI?</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 text-foreground">Your music &amp; tempo<br />knowledge assistant</h2>
            <p className="text-muted-foreground mt-4">Beyond simple answers — real-time music theory, BPM expertise, and deep rhythmic understanding.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group relative bg-card border border-border/50 rounded-2xl p-6 transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 hover:shadow-md cursor-default">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-2xl mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">⚡</div>
              <h3 className="text-xl font-semibold text-foreground">Real-time BPM expert</h3>
              <p className="text-muted-foreground mt-2 leading-relaxed">Ask anything about tempo, BPM, or rhythm and get instant, accurate answers with detailed explanations for any music style.</p>
            </div>
            <div className="group relative bg-card border border-border/50 rounded-2xl p-6 transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 hover:shadow-md cursor-default">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-2xl mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">🧠</div>
              <h3 className="text-xl font-semibold text-foreground">Tempo &amp; theory knowledge</h3>
              <p className="text-muted-foreground mt-2 leading-relaxed">Understands time signatures, tempo markings, BPM conversions, and music terminology — like a music theory teacher.</p>
            </div>
            <div className="group relative bg-card border border-border/50 rounded-2xl p-6 transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 hover:shadow-md cursor-default">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-2xl mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">🌍</div>
              <h3 className="text-xl font-semibold text-foreground">Multi-genre knowledge</h3>
              <p className="text-muted-foreground mt-2 leading-relaxed">Electronic, classical, jazz, pop, rock — TapTempoAI knows typical BPM ranges, time signatures, and rhythmic patterns across all genres.</p>
            </div>
            <div className="group relative bg-card border border-border/50 rounded-2xl p-6 transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 hover:shadow-md cursor-default">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-2xl mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">📘</div>
              <h3 className="text-xl font-semibold text-foreground">Explain music concepts</h3>
              <p className="text-muted-foreground mt-2 leading-relaxed">Break down complex music theory, tempo markings, or rhythm patterns into simple, intuitive explanations.</p>
            </div>
            <div className="group relative bg-card border border-border/50 rounded-2xl p-6 transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 hover:shadow-md cursor-default">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-2xl mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">🔧</div>
              <h3 className="text-xl font-semibold text-foreground">Practice &amp; production tips</h3>
              <p className="text-muted-foreground mt-2 leading-relaxed">Get personalized practice routines, metronome settings, delay and reverb timing advice, and production tips.</p>
            </div>
            <div className="group relative bg-card border border-border/50 rounded-2xl p-6 transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 hover:shadow-md cursor-default">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-2xl mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">🔄</div>
              <h3 className="text-xl font-semibold text-foreground">24/7 music assistant</h3>
              <p className="text-muted-foreground mt-2 leading-relaxed">Always online, ready to answer your tempo questions, suggest practice techniques, and help you improve your musicianship.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Built for Musicians */}
      <div className="py-24 border-b border-border bg-card">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block mb-8">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium tracking-wide uppercase">built for musicians</span>
          </div>
          <p className="text-4xl font-bold mt-4 text-foreground leading-tight">Built for musicians, producers, DJs, and creators</p>
          <div className="flex items-center justify-center gap-12 mt-10 flex-wrap">
            <div><span className="text-4xl font-black text-primary">98%</span><span className="text-muted-foreground ml-1">satisfaction</span></div>
            <div><span className="text-4xl font-black text-primary">~0.4s</span><span className="text-muted-foreground ml-1">avg response</span></div>
            <div><span className="text-4xl font-black text-primary">30k+</span><span className="text-muted-foreground ml-1">daily requests</span></div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-24 bg-muted/10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-5 text-foreground">Ask anything about tempo &amp; music</h2>
          <p className="text-muted-foreground text-lg mb-8">No signup required — just ask. Click the button and get instant answers about BPM, rhythm, and music practice.</p>
          <a
            href="https://ai.thetaptempo.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="glow-on-hover inline-flex items-center gap-3 bg-primary text-primary-foreground text-lg font-bold py-4 px-10 rounded-full transition-all duration-200 border border-primary/30 shadow-lg shadow-primary/40 hover:bg-primary/90"
          >
            <span>Ask TapTempoAI now</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </a>
          <p className="text-xs text-muted-foreground mt-6">direct link to TapTempoAI platform • instant access • free to ask anything</p>
        </div>
      </div>

      {/* Related Tools */}
      <div className="border-t bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">Related Tools</h2>
            <p className="text-muted-foreground text-center mb-8">Try these free music tools from TheTapTempo.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <a href="/tap-tempo" className="rounded-xl border bg-card p-5 hover:shadow-md transition-shadow group">
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">Tap Tempo</h3>
                <p className="text-sm text-muted-foreground">Find BPM by tapping</p>
              </a>
              <a href="/metronome" className="rounded-xl border bg-card p-5 hover:shadow-md transition-shadow group">
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">Metronome</h3>
                <p className="text-sm text-muted-foreground">Practice with accurate beats</p>
              </a>
              <a href="/bpm-calculator" className="rounded-xl border bg-card p-5 hover:shadow-md transition-shadow group">
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">BPM Calculator</h3>
                <p className="text-sm text-muted-foreground">Calculate BPM from time</p>
              </a>
              <a href="/bpm-to-ms" className="rounded-xl border bg-card p-5 hover:shadow-md transition-shadow group">
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">BPM to MS</h3>
                <p className="text-sm text-muted-foreground">Convert BPM to milliseconds</p>
              </a>
              <a href="/delay-reverb-time-calculator" className="rounded-xl border bg-card p-5 hover:shadow-md transition-shadow group">
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">Delay & Reverb Time Calculator</h3>
                <p className="text-sm text-muted-foreground">Calculate delay and reverb times</p>
              </a>
              <a href="/tempo-markings" className="rounded-xl border bg-card p-5 hover:shadow-md transition-shadow group">
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">Tempo Markings</h3>
                <p className="text-sm text-muted-foreground">Italian tempo terms guide</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
