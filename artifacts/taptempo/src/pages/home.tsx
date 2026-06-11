import { Link } from "wouter";
import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Activity, Clock, Calculator, Table2, Sliders, Music, ListOrdered, ChevronRight } from "lucide-react";
import { articles } from "./blog";

const tools = [
  { icon: Activity, title: "Tap Tempo", desc: "Most accurate tap algorithm with outlier rejection.", href: "/tap-tempo" },
  { icon: Clock, title: "Metronome", desc: "Precision audio engine metronome for practice.", href: "/metronome" },
  { icon: Calculator, title: "BPM Calculator", desc: "Calculate BPM from duration, or duration from BPM.", href: "/bpm-calculator" },
  { icon: Table2, title: "BPM to ms", desc: "Convert tempo to exact millisecond values.", href: "/bpm-to-ms" },
  { icon: Sliders, title: "Delay Time", desc: "Calculate precise millisecond values for delay.", href: "/delay-time-calculator" },
  { icon: Music, title: "Tempo Markings", desc: "Classical music tempo dictionary.", href: "/tempo-markings" },
  { icon: ListOrdered, title: "Beats Per Bar", desc: "Interactive time signature tool.", href: "/beats-per-bar-calculator" },
];

const faqs = [
  { q: "What is tap tempo?", a: "Tap tempo is a feature that allows you to specify a tempo (in beats per minute) by tapping a button rhythmically. It's widely used in music production to sync effects to a live performance." },
  { q: "How do I find a song's BPM?", a: "The easiest way is to use our Tap Tempo tool while listening to the song. Tap along with the beat for a few measures, and the algorithm will calculate the exact BPM." },
  { q: "What BPM is good for house music?", a: "House music typically ranges from 120 to 130 BPM, with 124 BPM being the historical 'golden standard'. Different subgenres lean slightly faster or slower." },
  { q: "What does 120 BPM feel like?", a: "120 BPM feels like a brisk walk or a steady, upbeat march. It's precisely two beats per second, making it a very natural, marching rhythm." },
  { q: "What are Italian tempo markings?", a: "Before BPM was standard, composers used Italian terms (like Allegro or Andante) to convey both the speed and the intended mood of the piece." },
  { q: "How do I sync my delay time to tempo?", a: "Use our Delay Time Calculator. By entering your track's BPM, it gives you the exact millisecond values for different note divisions (like 1/4 or 1/8 dotted) to set your delay plugin." },
  { q: "What is a time signature?", a: "A time signature (like 4/4 or 3/4) tells you how the music is divided into measures, indicating the number of beats per measure and which note value gets one beat." },
  { q: "How accurate is tap tempo?", a: "Our algorithm is highly accurate because it uses a rolling weighted average of your last 8 taps and automatically discards wild outliers caused by human error." },
];

export default function Home() {
  const displayBpm = useSpring(120, { stiffness: 100, damping: 20 });
  const roundedBpm = useTransform(displayBpm, v => Math.round(v));
  const [currentGenreBpm, setCurrentGenreBpm] = useState(120);

  useEffect(() => {
    const interval = setInterval(() => {
      const bpms = [120, 128, 140, 90, 124, 174, 110];
      const nextBpm = bpms[Math.floor(Math.random() * bpms.length)];
      setCurrentGenreBpm(nextBpm);
      displayBpm.set(nextBpm);
    }, 4000);
    return () => clearInterval(interval);
  }, [displayBpm]);

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b bg-muted/20">
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] dark:opacity-[0.05]">
          <motion.div className="text-[40vw] font-mono font-bold leading-none tracking-tighter">
            <motion.span>{roundedBpm}</motion.span>
          </motion.div>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center max-w-4xl pt-20 pb-32">
          <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tight leading-[1.1] mb-6">
            The Most Accurate <br/>
            <span className="italic text-primary">Tap Tempo & BPM</span> <br/>
            Toolkit
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Professional music tools for musicians, producers, and DJs. Tap any rhythm, calculate BPM instantly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/tap-tempo">
              <Button size="lg" className="rounded-full h-14 px-8 text-lg font-bold">
                Start Tapping <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="#tools">
              <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-lg">
                Explore Tools
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Preview */}
      <section className="py-24 bg-card border-b">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-block mb-8">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium tracking-wide uppercase">
              Featured Tool
            </span>
          </div>
          <Link href="/tap-tempo" className="block transform transition-transform hover:scale-[1.02] active:scale-[0.98]">
            <div className="border border-border/50 bg-background rounded-3xl p-12 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="font-mono text-8xl md:text-[140px] font-bold tracking-tighter text-foreground mb-4">
                TAP
              </div>
              <div className="text-muted-foreground uppercase tracking-widest text-sm font-bold">
                Click anywhere to open full tool
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Tools Directory */}
      <section id="tools" className="py-24 border-b bg-muted/10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">Studio-Grade Instruments</h2>
            <p className="text-muted-foreground text-lg">Everything you need for precise tempo management.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, i) => {
              const Icon = tool.icon;
              return (
                <Link key={tool.title} href={tool.href}>
                  <Card className="h-full hover:border-primary/50 transition-all hover:shadow-md cursor-pointer group bg-card">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">{tool.title}</CardTitle>
                      <CardDescription className="text-base">{tool.desc}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Editorial */}
      <section className="py-24 border-b bg-card">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">Why BPM Matters</h2>
            <p className="text-muted-foreground text-lg">The foundation of groove.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 text-foreground/80 leading-relaxed">
            <div>
              <h3 className="text-xl font-bold mb-3 text-foreground">The Heartbeat</h3>
              <p>Tempo isn't just a number on a grid—it's the emotional pulse of the music. A shift of just 2 BPM can change a track from a relaxed groove into a driving, urgent anthem. Understanding tempo is understanding emotion.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3 text-foreground">The Grid</h3>
              <p>In modern production, everything locks to the grid. Whether you're aligning LFOs, calculating reverb pre-delays, or syncing arpeggiators, precise mathematical relationships to the BPM are what make a mix sound tight and professional.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3 text-foreground">The Translation</h3>
              <p>Translating the rhythm in your head to the software in your computer requires precision. A great tap tempo tool bridges the gap between human feel and digital exactness, letting you capture inspiration instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 border-b bg-muted/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">Frequently Asked Questions</h2>
          </div>
          
          <Accordion type="single" collapsible className="w-full bg-card border rounded-2xl px-6">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b-border/50 last:border-0">
                <AccordionTrigger className="text-left font-medium hover:text-primary py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Blog */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-serif font-bold mb-4">Latest from the Blog</h2>
              <p className="text-muted-foreground text-lg">Guides, theory, and production tips.</p>
            </div>
            <Link href="/blog">
              <Button variant="ghost" className="hidden sm:flex hover:text-primary">
                View all articles <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {articles.slice(0, 3).map((article) => (
              <Link key={article.slug} href={`/blog/${article.slug}`}>
                <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer group bg-muted/30 hover:bg-card">
                  <CardHeader>
                    <div className="flex gap-4 text-xs text-muted-foreground mb-3 font-mono">
                      <span>{article.date}</span>
                    </div>
                    <CardTitle className="text-xl font-serif group-hover:text-primary transition-colors leading-tight mb-2">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="text-sm line-clamp-3">
                      {article.desc}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/blog">
              <Button variant="outline" className="w-full">
                View all articles
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
