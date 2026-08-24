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

export default function MetronomeDrummersPage() {
  return (
    <div className="flex flex-col items-center px-4 py-4 bg-background">
      <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight mb-1 text-foreground">Metronome for Drummers</h1>
      <p className="text-muted-foreground text-sm mb-4">Build clean rudiments, limb independence, and consistent groove timing</p>

      <MetronomeEngine defaultPreset="drummer" />

      <div className="w-full max-w-3xl mt-16 space-y-10 pb-16 px-6">
        {/* Quick Answer */}
        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-serif font-bold">Quick Answer</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Using a metronome for drum practice helps build clean rudiments, steady limb independence, and consistent groove timing. Start with simple rudiments at a slow tempo, then apply the same click to full-kit patterns as your coordination improves.
          </p>
        </section>

        {/* Why Drummers Need a Metronome */}
        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-serif font-bold">Why Drummers Need a Metronome</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Drumming requires multiple limbs to stay independently accurate while working together — something no other instrument demands in quite the same way. Without a steady external reference, it&apos;s common for one limb (often the kick or hi-hat) to drift out of time while the others compensate without you noticing.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            For general metronome practice principles that apply to any instrument, see our guide on{" "}
            <Link href="/blog/practice-with-a-metronome" className="text-primary hover:underline font-bold">
              How to Practice with a Metronome
            </Link>. This page focuses specifically on drum-kit and rudiment practice.
          </p>
        </section>

        {/* Rudiment Practice */}
        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-serif font-bold">Rudiment Practice</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Rudiments are the foundation of clean drumming technique, and they reveal timing inconsistencies faster than full-kit playing.
          </p>

          <h3 className="font-semibold text-sm">Single Stroke Roll Drill</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground leading-relaxed">
            <li>Set the metronome to a slow tempo (60 BPM).</li>
            <li>Play one stroke per click, alternating hands (R-L-R-L).</li>
            <li>Focus on even volume and spacing between strokes.</li>
            <li>Increase tempo by 5 BPM only after five clean, relaxed rounds.</li>
          </ol>

          <h3 className="font-semibold text-sm pt-2">Paradiddle Practice Tempo Benchmarks</h3>
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
                  <td className="px-3 py-2 font-medium">Learning the pattern</td>
                  <td className="px-3 py-2">50-70 BPM</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium">Comfortable single-stroke control</td>
                  <td className="px-3 py-2">80-110 BPM</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium">Double-stroke roll fluency</td>
                  <td className="px-3 py-2">100-140+ BPM</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-semibold text-sm pt-2">The 4-Bar Rudiment Rotation</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground leading-relaxed">
            <li>Choose two rudiments (e.g., single strokes and paradiddles).</li>
            <li>Play each rudiment for a full 4-bar phrase before switching.</li>
            <li>Keep the metronome at the same tempo throughout the switch.</li>
            <li>This trains clean transitions between techniques without losing time.</li>
          </ol>
        </section>

        {/* Limb Independence Practice */}
        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-serif font-bold">Limb Independence Practice</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Limb independence breaks down most often when one limb has to do something rhythmically different from the others.
          </p>

          <h3 className="font-semibold text-sm">Kick-Hi-Hat Separation Drill</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Set the metronome to a simple quarter-note click. Play a steady hi-hat pattern on every beat while adding kick drum hits only on beats 1 and 3. Once steady, move the kick to beats 2 and 4, then try syncopated placements (e.g., the &ldquo;and&rdquo; of beat 2).
          </p>

          <h3 className="font-semibold text-sm pt-2">Ghost Note Control</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Set the metronome to eighth notes (or use our{" "}
            <Link href="/metronome-with-subdivisions" className="text-primary hover:underline font-bold">
              Metronome with Subdivisions
            </Link>{" "}
            for a built-in eighth-note click). Play a basic snare backbeat while adding quiet ghost notes on the off-beats. Keep the ghost notes at a consistent, low volume relative to the main backbeat.
          </p>
        </section>

        {/* Groove and Backbeat Consistency */}
        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-serif font-bold">Groove and Backbeat Consistency</h2>

          <h3 className="font-semibold text-sm">Click on 2 and 4 Only</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Once your internal pulse feels solid, try setting the metronome so it only marks beats 2 and 4 instead of every beat. This mirrors how backbeat-driven grooves are actually felt in most popular music, and forces you to internally track beats 1 and 3.
          </p>

          <h3 className="font-semibold text-sm pt-2">Groove Tempo Reference</h3>
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-3 py-2 text-left font-semibold">Genre/Feel</th>
                  <th className="px-3 py-2 text-left font-semibold">Typical Practice Tempo Range</th>
                </tr>
              </thead>
              <tbody className="divide-y text-muted-foreground">
                <tr>
                  <td className="px-3 py-2 font-medium">Slow rock ballad</td>
                  <td className="px-3 py-2">60-80 BPM</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium">Standard rock/pop groove</td>
                  <td className="px-3 py-2">90-120 BPM</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium">Punk/fast rock</td>
                  <td className="px-3 py-2">150-180+ BPM</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium">Double-time fills</td>
                  <td className="px-3 py-2">160-200+ BPM (felt at half this tempo)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Common Drumming Timing Mistakes */}
        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-serif font-bold">Common Drumming Timing Mistakes</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Beyond the general mistakes covered in our{" "}
            <Link href="/blog/common-metronome-mistakes" className="text-primary hover:underline font-bold">
              Common Metronome Mistakes
            </Link>{" "}
            guide, drummers specifically tend to:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground leading-relaxed">
            <li>Rush fills right before returning to the main groove.</li>
            <li>Let the kick drum drift out of sync while focusing on hands.</li>
            <li>Speed up gradually during long groove sections without noticing.</li>
          </ul>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Practicing fills and groove transitions separately, at a tempo where the return to the beat feels controlled, helps prevent these specific issues.
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
            Set a comfortable tempo above and start with the rudiment or limb independence drill that matches your current skill level. Increase speed only once your timing feels completely steady.
          </p>
        </section>

        {/* FAQ */}
        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-serif font-bold">Frequently Asked Questions</h2>
          <div className="divide-y rounded-xl border">
            <FaqItem
              q="What BPM should drummers start rudiment practice at?"
              a="Most drummers should start rudiment practice between 50-70 BPM, increasing gradually only once strokes are even in both volume and timing."
            />
            <FaqItem
              q="How can a metronome help with limb independence?"
              a="A metronome exposes when one limb drifts out of time relative to the others, which is difficult to notice by ear alone until the pattern becomes clearly loose or rushed."
            />
            <FaqItem
              q="Should drummers practice with the click on every beat?"
              a="Not always. Practicing with the click only on beats 2 and 4 (once basic timing is solid) builds a stronger internal sense of the full beat cycle, which is closer to how backbeats are felt in real playing."
            />
            <FaqItem
              q="Why do fills throw off my timing?"
              a="Fills often speed up because they feel more exciting to play. Practicing the transition from fill back into the groove at a slower, controlled tempo helps keep the return to the beat steady."
            />
          </div>
        </section>
      </div>
    </div>
  )
}
