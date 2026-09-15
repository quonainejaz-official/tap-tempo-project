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

export default function MetronomePianoPracticePage() {
  return (
    <div className="flex flex-col items-center px-4 py-4 bg-background">
      <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight mb-1 text-foreground">Metronome for Piano Practice</h1>
      <p className="text-muted-foreground text-sm mb-4">Master scale exercises, classical pieces, and hand synchronization with precise tempo control</p>

      <MetronomeEngine defaultPreset="piano" />

      <div className="w-full max-w-3xl mt-16 space-y-10 pb-16 px-6">
        {/* Quick Answer */}
        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-serif font-bold">Quick Answer</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Using a metronome for piano practice helps you build even scales, steady classical phrasing, and coordinated hand synchronization. Start at a tempo where every note stays clean and relaxed, then increase gradually as your hands build control and muscle memory.
          </p>
        </section>

        {/* Why Pianists Need a Metronome */}
        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-serif font-bold">Why Pianists Need a Metronome</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Piano playing asks both hands to work independently while locking together in time. Without a steady timing reference, it&apos;s easy to rush ascending passages, drag on descending ones, and let one hand outpace the other.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            For general metronome practice principles that apply to any instrument, see our guide on{" "}
            <Link href="/blog/practice-with-a-metronome" className="text-primary hover:underline font-bold">
              How to Practice with a Metronome
            </Link>. This page focuses specifically on piano techniques.
          </p>
        </section>

        {/* Scale Practice */}
        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-serif font-bold">Scale Practice</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The evenness of a scale — consistent note spacing and dynamics across both hands — is one of the clearest timing tests for any pianist. Rushing the thumb-under passage or dragging the final notes destroys the flow of the entire run.
          </p>

          <h3 className="font-semibold text-sm">The 4-Bar Scale Drill</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground leading-relaxed">
            <li>Pick one scale and set the metronome to a comfortable starting tempo (60 BPM is a good place to begin). If you need to find a starting tempo, you can <Link href="/tap-tempo" className="text-primary hover:underline font-bold">tap to find a starting BPM</Link>.</li>
            <li>Play one octave of the scale, one note per click, keeping both hands exactly on the beat.</li>
            <li>Once the single-note version stays clean, switch to two notes per click (eighth notes).</li>
            <li>Increase tempo by 5 BPM only after five clean rounds.</li>
          </ol>
          <p className="text-sm text-muted-foreground leading-relaxed">
            When comparing different practice tempos, you can also <Link href="/bpm-calculator" className="text-primary hover:underline font-bold">work out the BPM</Link> before choosing your target speed.
          </p>

          <h3 className="font-semibold text-sm pt-2">Scale Practice Tempo Benchmarks</h3>
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
                  <td className="px-3 py-2 font-medium">Beginner (new scale)</td>
                  <td className="px-3 py-2">60-80 BPM</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium">Comfortable, even hands</td>
                  <td className="px-3 py-2">80-110 BPM</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium">Fast scale passages</td>
                  <td className="px-3 py-2">110-160 BPM</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            These exercises are usually practiced in four-beat bars, but understanding how beats are grouped can help when working with different time signatures. You can <Link href="/beats-per-bar-calculator" className="text-primary hover:underline font-bold">see how many beats fit in each bar</Link> with our calculator.
          </p>
        </section>

        {/* Hanon and Technical Exercises */}
        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-serif font-bold">Hanon and Technical Exercises</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Hanon-style exercises isolate finger strength and independence. The metronome turns them into a timing drill: if you can play the pattern cleanly at a slow tempo, every small rush or hesitation becomes immediately audible.
          </p>

          <h3 className="font-semibold text-sm">Hanon 5-Step Drill</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground leading-relaxed">
            <li>Set a slow tempo (60-80 BPM) — slow enough that the full pattern stays relaxed.</li>
            <li>Play the exercise with both hands, one note per click.</li>
            <li>Keep every finger&apos;s attack even; avoid accenting the thumb or weak fingers.</li>
            <li>Raise the tempo by 2-5 BPM only when the entire pattern stays clean.</li>
            <li>Practice the hardest two-bar segment alone before running the full exercise.</li>
          </ol>
          <p className="text-sm text-muted-foreground leading-relaxed">
            If BPM numbers are unfamiliar, it can also help to understand <Link href="/tempo-markings" className="text-primary hover:underline font-bold">common tempo terms</Link> such as Largo, Andante, Moderato, Allegro, and Vivace.
          </p>
        </section>

        {/* Hand Synchronization */}
        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-serif font-bold">Hand Synchronization</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Hand synchronization is where most piano timing problems hide. When one hand plays notes between the other hand&apos;s beats, small timing gaps turn into uneven, rushed passages.
          </p>

          <h3 className="font-semibold text-sm">The Two-Hand Lock Drill</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Set the metronome to a slow quarter-note pulse (or use our{" "}
            <Link href="/metronome-with-subdivisions" className="text-primary hover:underline font-bold">
              Metronome with Subdivisions
            </Link>{" "}
            for a built-in eighth-note click). Play a simple pattern — for example, a C major fifth, one note per click with the left hand and one note per click with the right hand locked together. Then alternate: left hand on the click, right hand on the offbeat, keeping every note directly between the clicks. Focus on even spacing between notes rather than speed.
          </p>
        </section>

        {/* Common Piano Timing Mistakes */}
        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-serif font-bold">Common Piano Timing Mistakes</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Beyond the general mistakes covered in our{" "}
            <Link href="/blog/common-metronome-mistakes" className="text-primary hover:underline font-bold">
              Common Metronome Mistakes
            </Link>{" "}
            guide, pianists specifically tend to:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground leading-relaxed">
            <li>Rush the beat on repeated chords or octave passages, anticipating the difficulty.</li>
            <li>Let the left hand drag during fast right-hand runs.</li>
            <li>Play unstable final notes of phrases, letting them rush or fade out of time.</li>
          </ul>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Practicing scales and hand-synchronization drills separately, at a tempo where both hands feel controlled, helps prevent these specific issues.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            For piano recording and production, you can also <Link href="/bpm-to-ms" className="text-primary hover:underline font-bold">convert a tempo into milliseconds</Link> when working out timing for delay and other effects.
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
            Set a comfortable tempo above and start with the scale or hand-synchronization drill that matches your current skill level. Increase speed only once your timing feels completely steady. Use an <Link href="/metronome" className="text-primary hover:underline font-bold">online timing reference</Link> consistently to track your progress.
          </p>
        </section>

        {/* FAQ */}
        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-serif font-bold">Frequently Asked Questions</h2>
          <div className="divide-y rounded-xl border">
            <FaqItem
              q="What BPM should beginners start piano practice at?"
              a="Most beginners should start scale and hand-synchronization practice between 60-80 BPM, increasing gradually as notes stay even and relaxed."
            />
            <FaqItem
              q="Should I practice scales and hand synchronization with different metronome settings?"
              a="Yes. Scales are usually practiced one or two notes per click, while hand-synchronization drills work best with a slow quarter-note pulse so both hands lock to the same beat."
            />
            <FaqItem
              q="How do I use a metronome for Hanon exercises?"
              a="Start each Hanon exercise well below your clean tempo, typically 60-80 BPM, and raise the tempo by 2-5 BPM only after the entire pattern stays even with no rushing."
            />
            <FaqItem
              q="Can a metronome help with playing evenly between both hands?"
              a="Yes. Slow, steady click practice exposes uneven note spacing and accents between hands that are hard to notice without an external timing reference."
            />
          </div>
        </section>
      </div>
    </div>
  )
}