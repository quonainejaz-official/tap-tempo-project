"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

function FaqItem({ q, a }: { q: string; a: React.ReactNode }) {
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
            <div className="pb-3 text-sm text-muted-foreground">{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function BeatsPerBarSeoContent() {
  return (
    <section className="mt-16 space-y-10">
      <section className="rounded-xl border bg-card p-6 space-y-2">
        <h2 className="text-lg font-bold">Key Takeaways</h2>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1.5">
          <li>Beats per bar = top number of the time signature. No exceptions.</li>
          <li>Bar duration = (60 ÷ BPM) × beats per bar. Use this to translate bars into clock time.</li>
          <li>Don&apos;t treat 6/8 the same as 4/4 just because both have even counts; compound time changes phrasing.</li>
          <li>Use the calculator for quick conversion, but verify the feel before you commit a loop or a mix point.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-serif font-bold">If You&apos;ve Ever Misaligned a Loop, This Is Why</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mt-3">
          If you&apos;ve ever set a loop in your DAW only to have it cut off early, you&apos;ve <Link href="/tap-tempo" className="text-primary hover:underline font-bold">felt the cost of misunderstanding beats per bar</Link>. It isn&apos;t music theory for its own sake; it&apos;s the grid your entire arrangement snaps to.
        </p>
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-serif font-bold">The Rule Is in the Top Number</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mt-3">
          Your time signature tells you everything. The top number is your beats per bar.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          4/4 → 4 beats per bar (pop, house, hip‑hop)
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          3/4 → 3 beats per bar (waltz, jazz ballads)
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          6/8 → 6 eighth‑note beats per bar, but felt as 2 main pulses (blues shuffles)
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          That last one is the trap beginners fall into. A calculator won&apos;t save you if you don&apos;t know whether you&apos;re counting 6 individual ticks or <Link href="/metronome" className="text-primary hover:underline font-bold">2 swung beats</Link>. Compound time changes how you feel the bar, even though the math stays the same.
        </p>
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-serif font-bold">Simple Time vs Compound Time</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mt-3">
          The top number tells you the count. It doesn&apos;t tell you the feel, and that&apos;s where most confusion starts.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Simple time (4/4, 3/4, 2/4) splits each beat into two. Tap your foot on the beat, and it naturally divides in half.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Compound time (6/8, 9/8, 12/8) splits each beat into three. The top number looks bigger, but the music is usually felt in fewer, larger pulses. 6/8 isn&apos;t six separate beats, it&apos;s two dotted-quarter pulses, each holding three eighth notes.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          This is exactly why 6/8 confuses calculators (and beginners): the raw count is correct, but counting it like 4/4 with two extra beats will make your accents, phrasing, and groove feel off. Compound time changes how the bar is felt, not just how it&apos;s numbered.
        </p>
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-serif font-bold">BPM Is Speed. Beats Per Bar Is Grouping.</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mt-3">
          A 128 BPM track in 4/4 has the same tempo as a 128 BPM track in 3/4. The difference? Bar duration.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Bar duration (seconds) = (60 ÷ BPM) × beats per bar
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          At 128 BPM in 4/4, one bar lasts exactly 1.875 seconds. In 3/4, it&apos;s 1.406 seconds. That 0.47‑second gap is why your 8‑bar intro in 3/4 feels shorter than you expected; not because it&apos;s faster, but because it has fewer beats per grouping.
        </p>
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-serif font-bold">Worked Examples: Calculating Bar Duration</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mt-3">
          Formula: Bar duration (seconds) = (60 ÷ BPM) × beats per bar
        </p>
        <h3 className="font-semibold text-sm mt-3">At 100 BPM in 4/4</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          (60 ÷ 100) × 4 = 0.6 × 4 = 2.4 seconds per bar
        </p>
        <h3 className="font-semibold text-sm mt-3">At 100 BPM in 3/4</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          (60 ÷ 100) × 3 = 0.6 × 3 = 1.8 seconds per bar
        </p>
        <h3 className="font-semibold text-sm mt-3">At 90 BPM in 6/8 (counted as 6 eighth-note beats)</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          (60 ÷ 90) × 6 = 0.667 × 6 = 4 seconds per bar
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Same tempo, three different bar lengths. This is why an 8-bar section in 3/4 finishes sooner than an 8-bar section in 4/4, even with no change in speed, fewer beats per bar simply means less time per bar.
        </p>
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-serif font-bold">Where This Saves You Real Time</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mt-3">
          Producers use this to set <Link href="/delay-reverb-time-calculator" className="text-primary hover:underline font-bold">delay returns</Link> without guessing. At 120 BPM in 4/4, a quarter‑note delay equals 500 ms. A dotted eighth? 375 ms. You don&apos;t need a separate tool. The beats‑per‑bar calculation gives you the bar length, and you divide from there.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          DJs rely on bar duration for phrasing. Most dance music uses 4 beats per bar. Phrases land every 8 or 16 bars. When you know the bar duration, you know exactly when the next drop hits, down to the millisecond.
        </p>
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-serif font-bold">How a Calculator Actually Helps</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mt-3">
          A beats‑per‑bar calculator is useful for three specific tasks:
        </p>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1.5">
          <li>Bars → total seconds. Use this to plan your radio edit length.</li>
          <li>Seconds → bars. Use this to fit a cue point to a fixed time.</li>
          <li>BPM ↔ ms per beat. Use this to sync effects without phase issues.</li>
        </ul>
        <p className="text-sm text-muted-foreground leading-relaxed mt-3">
          Just enter the time signature, BPM, and number of bars. The calculator does the math so you can stay in creative flow.
        </p>
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-serif font-bold">For Composers and Session Musicians</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mt-3">
          Composers working in 5/4 or 7/8 use bar duration math to plan exact section lengths for film cues, game audio, or progressive arrangements where the odd grouping is intentional, not accidental.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Session musicians use it to get count-offs right. A 4-click count-in works for 4/4. A 3-click count-in works for 3/4. But 6/8 needs a 2-pulse compound feel, not six even clicks, otherwise the band comes in on the wrong beat.
        </p>
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-serif font-bold">Quick Reference Table</h2>
        <div className="overflow-x-auto rounded-xl border mt-3">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left px-4 py-2 font-medium">Time Sig.</th>
                <th className="text-left px-4 py-2 font-medium">Beats/Bar</th>
                <th className="text-left px-4 py-2 font-medium">Felt As</th>
                <th className="text-right px-4 py-2 font-medium">Common Use</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">4/4</td>
                <td className="px-4 py-2">4</td>
                <td className="px-4 py-2">4 straight pulses</td>
                <td className="text-right px-4 py-2">Pop, EDM, rock</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">3/4</td>
                <td className="px-4 py-2">3</td>
                <td className="px-4 py-2">3 waltz pulses</td>
                <td className="text-right px-4 py-2">Classical, jazz</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">6/8</td>
                <td className="px-4 py-2">6</td>
                <td className="px-4 py-2">2 dotted pulses</td>
                <td className="text-right px-4 py-2">Blues, Irish folk</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">5/4</td>
                <td className="px-4 py-2">5</td>
                <td className="px-4 py-2">5 uneven pulses</td>
                <td className="text-right px-4 py-2">Prog, film scores</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">6/4</td>
                <td className="px-4 py-2">6</td>
                <td className="px-4 py-2">2 groups of 3, or 3 groups of 2</td>
                <td className="text-right px-4 py-2">Prog rock, some jazz</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">9/8</td>
                <td className="px-4 py-2">9</td>
                <td className="px-4 py-2">3 dotted-quarter pulses</td>
                <td className="text-right px-4 py-2">Compound jigs, some prog</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">12/8</td>
                <td className="px-4 py-2">12</td>
                <td className="px-4 py-2">4 dotted-quarter pulses</td>
                <td className="text-right px-4 py-2">Slow blues, gospel, doo-wop</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">7/8</td>
                <td className="px-4 py-2">7</td>
                <td className="px-4 py-2">Uneven (commonly 2+2+3)</td>
                <td className="text-right px-4 py-2">Balkan folk, math rock, film scores</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-serif font-bold">Common Mistakes With Beats Per Bar</h2>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1.5 mt-3">
          <li>Treating 6/8 like 4/4 with extra beats. The count is 6, the feel is 2. Group it as two sets of three, not six individual taps.</li>
          <li>Mixing up tempo changes with time signature changes. BPM controls speed. Beats per bar controls grouping. Changing one never changes the other.</li>
          <li>Assuming odd meters are counted evenly. 5/4 is usually felt as 3+2 or 2+3, not five identical beats in a row. Listen for the natural accent before assuming an even count.</li>
          <li>Using bar duration to set delay or reverb effects. Bar length tells you how long a full measure lasts. It is not the same as a single note-value delay time. For that, use the BPM to ms guide or the Delay &amp; Reverb Time calculator.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-serif font-bold">Frequently Asked Questions</h2>
        <div className="mt-2 rounded-xl border divide-y">
          <FaqItem
            q="What&apos;s the fastest way to find a song&apos;s beats per bar?"
            a="Look at the time signature in your DAW or sheet music. If you don&apos;t have it, count how many quarter‑note taps occur before the riff repeats; that number is your beats per bar."
          />
          <FaqItem
            q="Does changing BPM change beats per bar?"
            a={<>Never. <Link href="/bpm-calculator" className="text-primary hover:underline font-bold">BPM</Link> changes speed; time signature changes grouping. They are independent axes.</>}
          />
          <FaqItem
            q="Why does 6/8 confuse calculators?"
            a="Because the top number says 6, but musicians often feel 2. You must decide: are you counting the eighth notes or the dotted-quarter pulses? The calculator gives you the raw number; your ears tell you the feel."
          />
          <FaqItem
            q="How do I calculate how long a bar lasts?"
            a="Use bar duration (seconds) = (60 ÷ BPM) × beats per bar. At 120 BPM in 4/4, that&apos;s (60 ÷ 120) × 4 = 2 seconds per bar."
          />
          <FaqItem
            q="How many beats are in a bar of 7/8?"
            a="Seven, but 7/8 is almost always grouped unevenly, commonly 2+2+3 or 3+2+2, rather than felt as seven equal beats."
          />
          <FaqItem
            q="Can I use beats-per-bar math to set a delay or reverb effect?"
            a="Not directly. Bar duration tells you how long a full measure lasts. Delay and reverb settings use individual note values in milliseconds. For effects timing, use the BPM to ms guide or the Delay &amp; Reverb Time calculator instead."
          />
          <FaqItem
            q="What&apos;s the difference between simple and compound time?"
            a="Simple time (4/4, 3/4) divides each beat into two. Compound time (6/8, 9/8, 12/8) divides each beat into three, and is usually felt in fewer, larger pulses rather than by its raw beat count."
          />
        </div>
      </section>
    </section>
  )
}
