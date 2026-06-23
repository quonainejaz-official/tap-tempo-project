import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Activity, Clock, Calculator, Table2, Sliders, Music, ListOrdered, Zap, CheckCircle2, Layout, Monitor, ArrowRight } from "lucide-react"

const tools = [
  { icon: Activity, title: "Tap Tempo", desc: "Most accurate tap algorithm with outlier rejection.", href: "/tap-tempo" },
  { icon: Clock, title: "Metronome", desc: "Precision audio engine metronome for practice.", href: "/metronome" },
  { icon: Calculator, title: "BPM Calculator", desc: "Calculate BPM from duration, or duration from BPM.", href: "/bpm-calculator" },
  { icon: Table2, title: "BPM to ms", desc: "Convert tempo to exact millisecond values.", href: "/bpm-to-ms" },
  { icon: Sliders, title: "Delay & Reverb Time", desc: "Calculate precise millisecond values for delay and reverb.", href: "/delay-reverb-time-calculator" },
  { icon: Music, title: "Tempo Markings", desc: "Classical music tempo dictionary.", href: "/tempo-markings" },
  { icon: ListOrdered, title: "Beats Per Bar", desc: "Interactive time signature tool.", href: "/beats-per-bar-calculator" },
]

const audiences = [
  { emoji: "🎵", title: "Musicians", desc: "Practice with accurate metronome timing and BPM tools for any instrument." },
  { emoji: "🥁", title: "Drummers", desc: "Lock in your groove with precise tempo detection and subdivision tools." },
  { emoji: "🎧", title: "Producers", desc: "Calculate delay, reverb, and modulation times that sit perfectly in the mix." },
  { emoji: "🎚", title: "DJs", desc: "Match BPM between tracks and prepare beat-synced sets with confidence." },
  { emoji: "🎼", title: "Music Students", desc: "Learn tempo markings, time signatures, and rhythm fundamentals step by step." },
  { emoji: "🎙", title: "Creators", desc: "Content creators, podcasters, and video editors who need reliable timing references." },
]

const features = [
  { icon: Zap, title: "Fast Browser Tools", desc: "No installation, no downloads, no sign-ups. Every tool runs instantly in your browser." },
  { icon: CheckCircle2, title: "Accurate Calculations", desc: "Reliable music timing and tempo calculations you can trust for practice and production." },
  { icon: Layout, title: "Simple Workflow", desc: "Less friction between finding a tempo and using it. Click, tap, and go." },
  { icon: Monitor, title: "Always Accessible", desc: "Works across desktop, tablet, and mobile. Your tempo tools wherever you are." },
]

function ToolCard({ icon: Icon, title, desc, href }: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string; href: string }) {
  return (
    <Link href={href} className="group">
      <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-primary/30">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>{desc}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}

function AudienceCard({ emoji, title, desc }: { emoji: string; title: string; desc: string }) {
  return (
    <div className="rounded-xl border bg-card p-5 transition-all duration-200 hover:shadow-md hover:border-primary/30">
      <div className="text-2xl mb-3">{emoji}</div>
      <h3 className="font-semibold text-sm mb-1.5">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  )
}

function FeatureCard({ icon: Icon, title, desc }: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string }) {
  return (
    <div className="rounded-xl border bg-card p-6 transition-all duration-200 hover:shadow-md hover:border-primary/30">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <h3 className="font-semibold text-sm mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  )
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Hero */}
      <section className="max-w-3xl mx-auto text-center mb-12 md:mb-14">
        <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-4 text-foreground">
          About The Tap Tempo
        </h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-4">
          The Tap Tempo is designed to help musicians, producers, DJs, drummers, and creators work faster with accurate browser-based music tools.
        </p>
        <p className="text-sm text-muted-foreground/60 mb-2">
          Fast. Accurate. Browser-based. Free to use.
        </p>
        <p className="text-sm text-muted-foreground/60">
          Built for musicians, producers, DJs, and creators who need reliable music workflow tools.
        </p>
      </section>

      {/* Mission */}
      <section className="max-w-3xl mx-auto mb-20 md:mb-24">
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">Our Mission</h2>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Making music should be about the music, not about switching between apps or hunting for the right tool. We built The Tap Tempo to remove that friction.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Whether you are a producer dialing in delay times mid-session, a drummer checking your BPM before a show, or a student learning how tempo markings work, the tools you need should load instantly, work reliably, and get out of your way.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            That is what we focus on: accurate browser-based tools that do one thing well and do it without unnecessary complexity.
          </p>
        </div>
      </section>

      {/* Who This Is Built For */}
      <section className="max-w-5xl mx-auto mb-20 md:mb-24">
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4 text-center">Who This Is Built For</h2>
        <p className="text-sm text-muted-foreground text-center mb-8 max-w-xl mx-auto">
          The Tap Tempo serves a range of music creators and performers.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {audiences.map((a) => (
            <AudienceCard key={a.title} {...a} />
          ))}
        </div>
      </section>

      {/* Tools We Provide */}
      <section className="max-w-5xl mx-auto mb-20 md:mb-24">
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4 text-center">Tools We Provide</h2>
        <p className="text-sm text-muted-foreground text-center mb-8 max-w-xl mx-auto">
          Every tool is free, browser-based, and built for real music workflows.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <ToolCard key={tool.href} {...tool} />
          ))}
        </div>
      </section>

      {/* Why The Tap Tempo */}
      <section className="max-w-5xl mx-auto mb-20 md:mb-24">
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4 text-center">Why The Tap Tempo</h2>
        <p className="text-sm text-muted-foreground text-center mb-8 max-w-xl mx-auto">
          Built around the needs of music creators who value accuracy and speed.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </section>

      {/* Educational Content */}
      <section className="max-w-3xl mx-auto mb-20 md:mb-24">
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">Beyond Tools</h2>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            The Tap Tempo also provides educational content for musicians who want to go deeper. Guides cover <Link href="/bpm-calculator" className="text-primary hover:underline font-medium">BPM</Link> fundamentals, <Link href="/tempo-markings" className="text-primary hover:underline font-medium">tempo markings</Link>, time signatures, delay and reverb timing, <Link href="/metronome" className="text-primary hover:underline font-medium">rhythm practice techniques</Link>, and music production concepts.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Whether you are learning what 120 BPM sounds like, understanding the difference between simple and compound meter, or exploring polyrhythms, the resources are designed to complement the tools and help you develop a stronger sense of timing.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Browse the <Link href="/blog" className="text-primary hover:underline font-medium">blog</Link> for articles and tutorials.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto text-center border-t pt-20 md:pt-24 mb-20 md:mb-24">
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">Create Better Music Workflows</h2>
        <p className="text-sm text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
          Whether you are tracking tempo, practicing timing, calculating BPM values, or learning music concepts, The Tap Tempo aims to make the process simpler.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/tap-tempo">
              <Activity className="w-5 h-5 mr-2" />
              Explore Music Tools
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/blog">
              Read Articles
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
