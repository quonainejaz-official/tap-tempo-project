export default function AiTempoPage() {
  return (
    <main className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-12 md:py-20">
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
            <span className="text-primary-foreground font-bold text-lg">&lt;/&gt;</span>
          </div>
          <span className="font-semibold text-xl tracking-tight text-foreground">TapTempo<span className="text-primary">AI</span></span>
        </div>
        <div className="text-sm font-medium px-4 py-1.5 rounded-full bg-secondary border border-border text-primary shadow-sm">
          Beta v1.0 — intelligent dev companion
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
              <span className="text-foreground">Your personal</span><br />
              <span className="text-primary">coding co-pilot</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
              Meet <span className="font-semibold text-foreground">TapTempoAI</span> — a next-generation assistant that writes, debugs, and explains code with human-like intelligence.
              From algorithms to full-stack apps, get instant answers, best practices, and creative solutions.
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <a
                href="https://ai.thetaptempo.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="glow-on-hover group relative inline-flex items-center gap-3 bg-primary text-primary-foreground font-semibold py-4 px-8 rounded-full transition-all duration-300 shadow-lg shadow-primary/30 border border-primary/20 text-lg hover:bg-primary/90"
              >
                <span>Launch TapTempoAI</span>
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
              <div className="flex items-center gap-1">Smart completion</div>
              <div className="flex items-center gap-1">Secure &amp; private</div>
              <div className="flex items-center gap-1">Context-aware</div>
              <div className="flex items-center gap-1">Multi-language</div>
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
                <span className="text-xs text-primary font-mono">terminal · TapTempo active</span>
              </div>
              <div className="space-y-3 font-mono text-sm">
                <p className="text-muted-foreground"><span className="text-primary">&gt;&gt;</span> <span className="text-foreground">TapTempoAI, how to optimize React re-renders?</span></p>
                <p className="text-muted-foreground flex flex-wrap gap-1 items-start"><span className="text-primary">AI:</span> <span className="text-foreground">Use useMemo, React.memo, and virtualize lists. Need code example?</span></p>
                <div className="bg-background rounded-xl p-3 border border-border mt-2">
                  <pre className="text-[0.7rem] text-primary whitespace-pre-wrap"><code>{`const MemoComponent = React.memo(MyComp);
useCallback(fn, deps); // prevent recreation`}</code></pre>
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

      {/* Features */}
      <div className="py-24 border-b border-border bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary uppercase tracking-wider text-sm font-semibold bg-secondary px-4 py-1 rounded-full">Why choose TapTempo?</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 text-foreground">Intelligence that<br />empowers developers</h2>
            <p className="text-muted-foreground mt-4">Beyond simple answers — real-time reasoning, code generation, and deep tech understanding.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group relative bg-muted/30 border border-border/50 rounded-2xl p-6 transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 hover:shadow-md cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-2xl mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">⚡</div>
              <h3 className="text-xl font-semibold text-foreground">Real-time code assistant</h3>
              <p className="text-muted-foreground mt-2 leading-relaxed">Ask anything: debug, refactor, or generate whole functions. TapTempoAI gives you instant, correct answers with detailed comments.</p>
            </div>
            <div className="group relative bg-muted/30 border border-border/50 rounded-2xl p-6 transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 hover:shadow-md cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-2xl mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">🧠</div>
              <h3 className="text-xl font-semibold text-foreground">Contextual awareness</h3>
              <p className="text-muted-foreground mt-2 leading-relaxed">Understands your tech stack, project structure, and previous queries — like a senior dev sitting next to you.</p>
            </div>
            <div className="group relative bg-muted/30 border border-border/50 rounded-2xl p-6 transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 hover:shadow-md cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-2xl mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">🌍</div>
              <h3 className="text-xl font-semibold text-foreground">Multi-language expert</h3>
              <p className="text-muted-foreground mt-2 leading-relaxed">Python, JS, Go, Rust, Java, C++ — TapTempoAI is fluent in 40+ languages. It adapts to any syntax or framework.</p>
            </div>
            <div className="group relative bg-muted/30 border border-border/50 rounded-2xl p-6 transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 hover:shadow-md cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-2xl mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">📘</div>
              <h3 className="text-xl font-semibold text-foreground">Explain like I'm 5</h3>
              <p className="text-muted-foreground mt-2 leading-relaxed">Break down complex algorithms, design patterns, or system design into simple, intuitive explanations.</p>
            </div>
            <div className="group relative bg-muted/30 border border-border/50 rounded-2xl p-6 transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 hover:shadow-md cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-2xl mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">🔧</div>
              <h3 className="text-xl font-semibold text-foreground">Unit tests &amp; docs</h3>
              <p className="text-muted-foreground mt-2 leading-relaxed">Generate test suites, docstrings, JSDoc, or markdown docs instantly. Speed up your development cycle.</p>
            </div>
            <div className="group relative bg-muted/30 border border-border/50 rounded-2xl p-6 transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 hover:shadow-md cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-2xl mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">🔄</div>
              <h3 className="text-xl font-semibold text-foreground">24/7 pair programming</h3>
              <p className="text-muted-foreground mt-2 leading-relaxed">Always online, ready to brainstorm, review PRs, and solve tricky bugs — your coding soulmate.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="py-24 border-b border-border bg-muted/10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block mb-8">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium tracking-wide uppercase">real usage stats</span>
          </div>
          <p className="text-4xl font-bold mt-4 text-foreground leading-tight">Join 5,000+ developers who ship faster with TapTempoAI</p>
          <div className="flex items-center justify-center gap-12 mt-10 flex-wrap">
            <div><span className="text-4xl font-black text-primary">98%</span><span className="text-muted-foreground ml-1">satisfaction</span></div>
            <div><span className="text-4xl font-black text-primary">~0.4s</span><span className="text-muted-foreground ml-1">avg response</span></div>
            <div><span className="text-4xl font-black text-primary">30k+</span><span className="text-muted-foreground ml-1">daily requests</span></div>
          </div>
          <div className="mt-12 max-w-lg mx-auto bg-card rounded-2xl p-6 border border-border/50">
            <div className="flex gap-3 items-center mb-3">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">JD</div>
              <div className="text-left"><p className="text-sm font-medium text-foreground">Jessica Daley</p><p className="text-xs text-muted-foreground">Senior Fullstack Engineer</p></div>
            </div>
            <p className="text-foreground text-sm italic text-left">&ldquo;TapTempoAI is like having a brilliant colleague always on call. It boosted my productivity by 3x. The code suggestions are shockingly accurate!&rdquo;</p>
            <div className="flex mt-3 text-primary text-xs">★★★★★</div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-24 bg-card">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-5 text-foreground">Start coding with AI magic</h2>
          <p className="text-muted-foreground text-lg mb-8">No signup friction — just pure intelligence. Click the button and experience the future of development.</p>
          <a
            href="https://ai.thetaptempo.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="glow-on-hover inline-flex items-center gap-3 bg-primary text-primary-foreground text-lg font-bold py-4 px-10 rounded-full transition-all duration-200 border border-primary/30 shadow-lg shadow-primary/40 hover:bg-primary/90"
          >
            <span>Try TapTempoAI now</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </a>
          <p className="text-xs text-muted-foreground mt-6">direct link to TapTempoAI platform • instant access • free to ask anything</p>
        </div>
      </div>
    </main>
  )
}
