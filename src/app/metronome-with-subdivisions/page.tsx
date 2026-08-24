"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { MetronomeEngine } from "@/components/metronome-engine"
import { ContinueLearningCarousel } from "@/components/continue-learning-carousel"

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 text-left text-sm font-medium hover:text-primary transition-colors"
      >
        <span>{q}</span>
        <ChevronDown className={cn("w-4 h-4 shrink-0 text-muted-foreground transition-transform duration-200", open && "rotate-180")} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-3 text-sm text-muted-foreground">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function MetronomeSubdivisionsPage() {
  return (
    <div className="flex flex-col items-center px-4 py-4 bg-background">
      <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight mb-1 text-foreground">Metronome with Subdivisions</h1>
      <p className="text-muted-foreground text-sm mb-4">Free online metronome with subdivisions for rhythmic accuracy</p>

      <MetronomeEngine defaultPreset="subdivision" />

      <div className="w-full max-w-3xl mt-16 space-y-10 pb-16 px-6">
        {/* Quick Answer */}
        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-serif font-bold">Quick Answer</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A metronome with subdivisions adds extra clicks between the main beats — splitting each beat into eighth notes, triplets, or sixteenth notes. This helps musicians hear the exact spacing inside a beat instead of only the main pulse, which is essential for playing fast passages, complex rhythms, and grooves accurately.
          </p>
        </section>

        {/* What Are Metronome Subdivisions? */}
        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-serif font-bold">What Are Metronome Subdivisions?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A standard metronome clicks once per beat. A metronome with subdivisions adds smaller, evenly-spaced clicks inside each beat, giving you a precise audio reference for rhythms that fall between the main pulses.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            For general metronome practice principles, see our guide on{" "}
            <Link href="/blog/practice-with-a-metronome" className="text-primary hover:underline font-bold">
              How to Practice with a Metronome
            </Link>. This page focuses specifically on using subdivisions to sharpen your timing.
          </p>
        </section>

        {/* Subdivision Reference Chart */}
        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-serif font-bold">Subdivision Reference Chart</h2>
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-3 py-2 text-left font-semibold">Subdivision</th>
                  <th className="px-3 py-2 text-left font-semibold">Clicks Per Beat</th>
                  <th className="px-3 py-2 text-left font-semibold">Counting Pattern</th>
                  <th className="px-3 py-2 text-left font-semibold">Common Use</th>
                </tr>
              </thead>
              <tbody className="divide-y text-muted-foreground">
                <tr>
                  <td className="px-3 py-2 font-medium">Quarter Notes</td>
                  <td className="px-3 py-2">1</td>
                  <td className="px-3 py-2">&ldquo;1, 2, 3, 4&rdquo;</td>
                  <td className="px-3 py-2">Basic pulse, beginners</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium">Eighth Notes</td>
                  <td className="px-3 py-2">2</td>
                  <td className="px-3 py-2">&ldquo;1-and-2-and&rdquo;</td>
                  <td className="px-3 py-2">Rock, pop rhythm guitar</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium">Eighth Note Triplets</td>
                  <td className="px-3 py-2">3</td>
                  <td className="px-3 py-2">&ldquo;1-trip-let&rdquo;</td>
                  <td className="px-3 py-2">Blues, jazz shuffle feel</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium">Sixteenth Notes</td>
                  <td className="px-3 py-2">4</td>
                  <td className="px-3 py-2">&ldquo;1-e-and-a&rdquo;</td>
                  <td className="px-3 py-2">Fast fills, funk, technical passages</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* How to Practice with Subdivisions */}
        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-serif font-bold">How to Practice with Subdivisions</h2>

          <div>
            <h3 className="font-semibold text-sm">Step 1: Start with Quarter Notes</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Set the metronome to a comfortable tempo (60-80 BPM) with no subdivision active. Play or tap along until the pulse feels completely natural.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm">Step 2: Add Eighth Note Subdivisions</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Turn on the eighth-note subdivision above. Without changing your playing, listen to how the extra click fills the space between each beat. Try counting &ldquo;1-and-2-and-3-and-4-and&rdquo; out loud while the click plays.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm">Step 3: Practice Playing On and Between Beats</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Alternate between playing only on the main beats and playing on every subdivision click. This builds awareness of exactly where the &ldquo;and&rdquo; falls in relation to the beat.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm">Step 4: Move to Triplets</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Switch the subdivision to triplets. This feel is noticeably different from eighth notes — three even clicks per beat instead of two. Many musicians find this the hardest subdivision to internalize at first.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm">Step 5: Add Sixteenth Notes</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Once triplets feel steady, move to sixteenth-note subdivisions. Start slow (50-60 BPM) since four clicks per beat happen quickly even at moderate tempos.
            </p>
          </div>
        </section>

        {/* Common Subdivision Exercises */}
        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-serif font-bold">Common Subdivision Exercises</h2>

          <div className="p-4 rounded-xl border bg-card/50 space-y-2">
            <h3 className="font-semibold text-sm">The Silent Beat Drill</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Set eighth-note subdivisions. Play normally for four beats, then mentally continue the subdivision for four beats without playing, then resume. This strengthens your internal sense of subdivision without relying entirely on the click.
            </p>
          </div>

          <div className="p-4 rounded-xl border bg-card/50 space-y-2">
            <h3 className="font-semibold text-sm">The Switch Drill</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Practice a simple scale or chord progression, switching between eighth notes and triplets every four bars without stopping the metronome. This trains your ear to distinguish between subdivision feels quickly.
            </p>
          </div>

          <div className="p-4 rounded-xl border bg-card/50 space-y-2">
            <h3 className="font-semibold text-sm">Gradual Speed Build with Sixteenths</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Start sixteenth-note subdivision practice at 50 BPM. Increase by only 2-3 BPM once the pattern feels completely even. Sixteenth notes reveal timing inconsistencies faster than any other subdivision.
            </p>
          </div>
        </section>

        {/* Why Subdivisions Matter */}
        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-serif font-bold">Why Subdivisions Matter for Rhythmic Accuracy</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Musicians who only practice with quarter-note clicks often develop accurate timing on the main beats while remaining inconsistent everywhere else. This creates rhythms that feel technically &ldquo;in time&rdquo; but lack a steady internal groove.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Subdivision practice closes this gap by giving your ear a precise reference for the space between beats — the area where most timing drift actually happens.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            If you&apos;re working out exact millisecond timing for production or recording (rather than live practice), our{" "}
            <Link href="/bpm-to-ms" className="text-primary hover:underline font-bold">
              BPM to Milliseconds Calculator
            </Link>{" "}
            converts any subdivision into exact time values.
          </p>
        </section>

        {/* Continue Learning */}
        <section className="space-y-4">
          <h2 className="text-xl md:text-2xl font-serif font-bold">Continue Learning</h2>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              Want to build on what you just practiced? These guides go deeper into timing and metronome practice:
            </p>
            <ContinueLearningCarousel
              items={[
                {
                  title: "Common Metronome Mistakes That Slow Down Your Progress",
                  description:
                    "Discover the 10 most common metronome mistakes musicians make — and practical, step-by-step ways to fix each one for faster rhythm improvement.",
                  href: "/blog/common-metronome-mistakes",
                },
                {
                  title: "How to Practice with a Metronome",
                  description:
                    "A full step-by-step tempo progression method for building reliable timing, from your first slow practice tempo to performance speed.",
                  href: "/blog/practice-with-a-metronome",
                },
                {
                  title: "Why Slow Practice Makes You a Better Musician",
                  description:
                    "Discover why slow, accurate practice builds real skill faster than rushing, and how to structure a routine that locks in muscle memory and timing.",
                  href: "/blog/why-slow-practice-makes-better-musician",
                },
                {
                  title: "How to Increase Playing Speed With a Metronome",
                  description:
                    "A structured method for building playing speed with a metronome - confirm a clean working tempo, test small increments, and break through plateaus.",
                  href: "/blog/how-to-increase-playing-speed-with-metronome",
                },
              ]}
            />
          </div>
        </section>

        {/* Ready to Practice */}
        <section className="p-4 rounded-xl border border-primary/20 bg-primary/5 space-y-2">
          <h2 className="font-semibold text-sm">Ready to Practice?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Turn on a subdivision above and start with a comfortable tempo. Focus on consistency before speed, and gradually work through eighth notes, triplets, and sixteenths as your <Link href="/metronome" className="text-primary hover:underline font-bold">Metronome</Link> timing becomes more precise.
          </p>
        </section>

        {/* FAQ */}
        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-serif font-bold">Frequently Asked Questions</h2>
          <div className="divide-y rounded-xl border">
            <FaqItem
              q="What's the difference between a regular metronome and one with subdivisions?"
              a="A regular metronome clicks once per beat. A metronome with subdivisions adds extra clicks between the main beats, letting you hear eighth notes, triplets, or sixteenth notes as distinct audio references."
            />
            <FaqItem
              q="Which subdivision should beginners start with?"
              a="Start with eighth notes before moving to triplets or sixteenths. Eighth notes are the most common subdivision in popular music and provide the easiest transition from a basic quarter-note pulse."
            />
            <FaqItem
              q="How do I know if I'm ready to move to a faster subdivision?"
              a="If you can play a passage cleanly at the current subdivision for several repetitions without losing the pulse, you're ready to try a smaller, faster subdivision or increase the tempo."
            />
            <FaqItem
              q="Can subdivisions help with sight-reading?"
              a="Yes. Practicing with subdivisions trains your ear to recognize note values by feel, which makes it easier to read and internalize rhythms in written music without counting mentally every time."
            />
          </div>
        </section>
      </div>
    </div>
  )
}
