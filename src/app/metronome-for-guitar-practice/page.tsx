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

export default function MetronomeGuitarPracticePage() {
  return (
    <div className="flex flex-col items-center px-4 py-4 bg-background">
      <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight mb-1 text-foreground">Metronome for Guitar Practice</h1>
      <p className="text-muted-foreground text-sm mb-4">Build clean chord changes, steady strumming patterns, and consistent picking technique</p>

      <MetronomeEngine defaultPreset="guitar" />

      <div className="w-full max-w-3xl mt-16 space-y-10 pb-16 px-6">
        {/* Quick Answer */}
        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-serif font-bold">Quick Answer</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Using a metronome for guitar practice helps you build clean chord transitions, steady strumming patterns, and consistent picking technique. Start slow enough to change chords or pick cleanly without rushing, then increase the tempo gradually as your hands build muscle memory.
          </p>
        </section>

        {/* Why Guitarists Need a Metronome */}
        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-serif font-bold">Why Guitarists Need a Metronome</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Guitar playing involves several coordinated movements at once — fretting chords, changing positions, strumming or picking, and often singing or reading at the same time. Without a steady timing reference, it&apos;s easy to rush through difficult chord changes and slow down on comfortable ones.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            For general metronome practice principles that apply to any instrument, see our guide on{" "}
            <Link href="/blog/practice-with-a-metronome" className="text-primary hover:underline font-bold">
              How to Practice with a Metronome
            </Link>. This page focuses specifically on guitar techniques.
          </p>
        </section>

        {/* Chord Change Practice */}
        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-serif font-bold">Chord Change Practice</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Chord changes are one of the biggest timing challenges for guitarists, especially beginners. Rushing the change usually causes a rhythmic gap or a muted, buzzing chord.
          </p>

          <h3 className="font-semibold text-sm">The 4-Bar Chord Change Drill</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground leading-relaxed">
            <li>Pick two chords you&apos;re learning (e.g., G and C).</li>
            <li>Set the metronome to a slow tempo (50-60 BPM). If you need to find a comfortable starting tempo, you can <Link href="/tap-tempo" className="text-primary hover:underline font-bold">tap to find a starting BPM</Link>.</li>
            <li>Strum each chord for a full bar (4 beats), then switch on beat 1 of the next bar.</li>
            <li>Once this feels clean, reduce to switching every 2 beats.</li>
            <li>Increase tempo by 5 BPM only after five clean rounds.</li>
          </ol>
          <p className="text-sm text-muted-foreground leading-relaxed">
            When comparing different practice tempos, you can also <Link href="/bpm-calculator" className="text-primary hover:underline font-bold">work out the BPM</Link> before choosing your target speed.
          </p>

          <h3 className="font-semibold text-sm pt-2">Common Guitar Chord-Change Tempo Benchmarks</h3>
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-3 py-2 text-left font-semibold">Skill Level</th>
                  <th className="px-3 py-2 text-left font-semibold">Suggested Practice Tempo</th>
                </tr>
              </thead>
              <tbody className="divide-y text-muted-foreground">
                <tr>
                  <td className="px-3 py-2 font-medium">Beginner (new chord pair)</td>
                  <td className="px-3 py-2">50-60 BPM</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium">Comfortable transition</td>
                  <td className="px-3 py-2">70-90 BPM</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium">Performance-ready</td>
                  <td className="px-3 py-2">100-120+ BPM</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            These exercises are usually practiced in four-beat bars, but understanding how beats are grouped can help when working with different time signatures. You can <Link href="/beats-per-bar" className="text-primary hover:underline font-bold">see how many beats fit in each bar</Link> with our calculator.
          </p>
        </section>

        {/* Strumming Pattern Practice */}
        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-serif font-bold">Strumming Pattern Practice</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Strumming patterns often break down not because of the hand movement itself, but because of inconsistent timing between strums.
          </p>

          <h3 className="font-semibold text-sm">Down-Up Consistency Drill</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Set the metronome to eighth notes (or use our{" "}
            <Link href="/metronome-with-subdivisions" className="text-primary hover:underline font-bold">
              Metronome with Subdivisions
            </Link>{" "}
            for a built-in eighth-note click). Practice a simple down-up-down-up pattern, matching every stroke exactly to a click. Focus on even spacing between down and up strokes rather than speed.
          </p>

          <h3 className="font-semibold text-sm pt-2">Adding Rhythmic Variation</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Once basic strumming feels steady, try muting one strum in a repeating pattern (e.g., down, up, mute, up) while keeping the metronome at the same tempo. This builds the syncopation control needed for more complex strumming patterns.
          </p>
        </section>

        {/* Picking Technique Practice */}
        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-serif font-bold">Picking Technique Practice</h2>

          <h3 className="font-semibold text-sm">Alternate Picking Drill</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground leading-relaxed">
            <li>Choose a single string and set the metronome to a slow tempo (60 BPM).</li>
            <li>Play continuous down-up-down-up picking, one note per click.</li>
            <li>Focus on even volume and timing between downstrokes and upstrokes.</li>
            <li>Increase tempo by 2-5 BPM only when the pattern feels completely even.</li>
          </ol>

          <h3 className="font-semibold text-sm pt-2">Picking Speed Benchmarks by Style</h3>
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-3 py-2 text-left font-semibold">Style</th>
                  <th className="px-3 py-2 text-left font-semibold">Typical Practice Tempo Range</th>
                </tr>
              </thead>
              <tbody className="divide-y text-muted-foreground">
                <tr>
                  <td className="px-3 py-2 font-medium">Basic rhythm guitar</td>
                  <td className="px-3 py-2">80-110 BPM</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium">Lead/solo runs</td>
                  <td className="px-3 py-2">100-140 BPM</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium">Fast alternate picking passages</td>
                  <td className="px-3 py-2">140-180+ BPM</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            If BPM numbers are unfamiliar, it can also help to understand <Link href="/tempo-markings" className="text-primary hover:underline font-bold">common tempo terms</Link> such as Largo, Andante, Moderato, Allegro, and Vivace.
          </p>
        </section>

        {/* Common Guitar Timing Mistakes */}
        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-serif font-bold">Common Guitar Timing Mistakes</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Beyond the general mistakes covered in our{" "}
            <Link href="/blog/common-metronome-mistakes" className="text-primary hover:underline font-bold">
              Common Metronome Mistakes
            </Link>{" "}
            guide, guitarists specifically tend to:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground leading-relaxed">
            <li>Rush the beat right before a chord change, anticipating the difficulty.</li>
            <li>Slow down during barre chords due to hand tension.</li>
            <li>Lose timing when switching between strumming and picking within the same song.</li>
          </ul>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Practicing chord changes and picking separately, at a tempo where both feel controlled, helps prevent these specific issues.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            For guitar recording and production, you can also <Link href="/bpm-to-ms" className="text-primary hover:underline font-bold">convert a tempo into milliseconds</Link> when working out timing for delay and other effects.
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
            Set a comfortable tempo above and start with the chord change or strumming drill that matches your current skill level. Increase speed only once your timing feels completely steady. Use an <Link href="/metronome" className="text-primary hover:underline font-bold">online timing reference</Link> consistently to track your progress.
          </p>
        </section>

        {/* FAQ */}
        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-serif font-bold">Frequently Asked Questions</h2>
          <div className="divide-y rounded-xl border">
            <FaqItem
              q="What BPM should beginners start guitar practice at?"
              a="Most beginners should start chord-change and strumming practice between 50-70 BPM, increasing gradually as transitions become smooth and consistent."
            />
            <FaqItem
              q="Should I practice strumming and picking with different metronome settings?"
              a="Yes. Strumming patterns often work well with eighth-note subdivisions, while picking exercises are usually practiced with a simple quarter-note click until the pattern speeds up significantly."
            />
            <FaqItem
              q="How do I stop rushing chord changes?"
              a="Practice the change in isolation at a slower tempo than your target song, using a 4-bar or 2-bar drill until the transition feels automatic before increasing speed."
            />
            <FaqItem
              q="Can a metronome help with strumming pattern consistency?"
              a="Yes. A metronome exposes uneven spacing between strums that can be hard to notice without an external reference, especially in syncopated patterns."
            />
          </div>
        </section>
      </div>
    </div>
  )
}
