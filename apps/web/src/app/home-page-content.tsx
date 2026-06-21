"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Activity,
  Clock,
  Calculator,
  Table2,
  Sliders,
  Music,
  ListOrdered,
  Zap,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Github,
  Twitter,
  Mail,
} from "lucide-react"

const tools = [
  { icon: Activity, title: "Tap Tempo", desc: "Most accurate tap algorithm with outlier rejection.", href: "/tap-tempo" },
  { icon: Clock, title: "Metronome", desc: "Precision audio engine metronome for practice.", href: "/metronome" },
  { icon: Calculator, title: "BPM Calculator", desc: "Calculate BPM from duration, or duration from BPM.", href: "/bpm-calculator" },
  { icon: Table2, title: "BPM to ms", desc: "Convert tempo to exact millisecond values.", href: "/bpm-to-ms" },
  { icon: Sliders, title: "Delay & Reverb Time", desc: "Calculate precise millisecond values for delay and reverb.", href: "/delay-reverb-time-calculator" },
  { icon: Music, title: "Tempo Markings", desc: "Classical music tempo dictionary.", href: "/tempo-markings" },
  { icon: ListOrdered, title: "Beats Per Bar", desc: "Interactive time signature tool.", href: "/beats-per-bar-calculator" },
]

const faqs = [
  {
    q: "What is tap tempo?",
    a: "Tap tempo is a method of determining the BPM (beats per minute) of a song or rhythm by physically tapping along to the beat. Our BPM tapper measures the time between your taps and calculates the average tempo.",
  },
  {
    q: "How accurate is the BPM tapper?",
    a: "The accuracy depends on the consistency of your tapping, not the tool. Our algorithm averages up to 16 consecutive taps with outlier rejection to filter out inconsistent taps. With 8-12 steady taps, you can expect accuracy within ±1 BPM.",
  },
  {
    q: "How do I calculate BPM from a song?",
    a: "The easiest way is to use our Tap Tempo tool: tap along to the beat of any song for 8-12 taps, and the BPM will be displayed instantly. You can also use the BPM Calculator to find BPM from duration and number of beats.",
  },
  {
    q: "What is the formula for delay time from BPM?",
    a: "For a quarter note delay: Delay (ms) = 60,000 ÷ BPM. For dotted eighth: Delay (ms) = 45,000 ÷ BPM. For triplet: Delay (ms) = 40,000 ÷ BPM. Use our Delay & Reverb Time Calculator for instant results.",
  },
]

export function HomePageContent() {
  const [display, setDisplay] = useState(120)

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplay(Math.round(Math.random() * 40 + 60))
    }, 600)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-3"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                Music Production Toolkit
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold tracking-tight mb-4"
            >
              Tempo Tools for
              <br />
              <span className="text-primary">Musicians</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6"
            >
              A world-class, Apple-caliber music tempo toolkit. Tap tempo, metronome, BPM calculator, tempo markings, delay time calculator, and more. Free, no ads, works offline.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center justify-center gap-4 mb-6"
            >
              <Button size="lg" asChild>
                <Link href="/tap-tempo">
                  <Activity className="w-5 h-5 mr-2" />
                  Try Tap Tempo
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/metronome">
                  <Clock className="w-5 h-5 mr-2" />
                  Open Metronome
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex items-center justify-center gap-8 text-muted-foreground"
            >
              <div className="text-center">
                <div className="text-3xl font-bold font-mono text-foreground">{display}</div>
                <div className="text-xs mt-1">Live BPM Demo</div>
              </div>
              <div className="h-10 w-px bg-border" />
              <div className="text-left text-sm leading-relaxed">
                <div className="font-medium text-foreground">7 Free Tools</div>
                <div>No registration required</div>
              </div>
              <div className="h-10 w-px bg-border" />
              <div className="text-left text-sm leading-relaxed">
                <div className="font-medium text-foreground">Works Offline</div>
                <div>Zero server dependency</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">All Tempo Tools</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Everything you need to work with tempo, timing, and rhythm.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {tools.map((tool) => {
            const Icon = tool.icon
            return (
              <Link key={tool.href} href={tool.href} className="group">
                <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-primary/30">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <CardTitle className="text-lg">{tool.title}</CardTitle>
                    <CardDescription>{tool.desc}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">Frequently Asked Questions</h2>
            <p className="text-muted-foreground mb-6">Common questions about using tempo tools and BPM calculations.</p>
            <Accordion type="multiple">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.q}</AccordionTrigger>
                  <AccordionContent>{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section className="border-t bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">Built for Precision</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Every tool is engineered for accuracy. No ads, no tracking, no bloat. Just the best tempo tools on the web.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button variant="outline" size="sm" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="w-4 h-4 mr-2" />
                  Twitter
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="mailto:taptempous@gmail.com">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
