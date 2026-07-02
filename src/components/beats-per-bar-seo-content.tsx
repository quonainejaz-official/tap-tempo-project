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
        <h2 className="text-xl md:text-2xl font-serif font-bold">Where This Saves You Real Time</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mt-3">
          Producers use this to set <Link href="/delay-reverb-time-calculator" className="text-primary hover:underline font-bold">delay returns</Link> without guessing. At 120 BPM in 4/4, a <Link href="/delay-reverb-time-calculator" className="text-primary hover:underline font-bold">quarter‑note delay</Link> = 500 ms. A dotted eighth? 375 ms. You don&apos;t need a separate tool; the beats‑per‑bar calculation gives you the bar length, and you divide from there.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          DJs rely on it for phrasing. Most dance music uses 4 beats per bar, and phrases land every 8 or 16 bars. If you know the bar duration, you know exactly when the next drop hits; down to the millisecond; without watching the waveform.
        </p>
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-serif font-bold">How a Calculator Actually Helps</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mt-3">
          A beats‑per‑bar calculator is useful for three specific tasks:
        </p>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1.5">
          <li>Bars → total seconds (plan your radio edit length)</li>
          <li>Seconds → bars (fit a cue point to a fixed time)</li>
          <li>BPM ↔ <Link href="/bpm-to-ms" className="text-primary hover:underline font-bold">ms per beat</Link> (sync effects without phase issues)</li>
        </ul>
        <p className="text-sm text-muted-foreground leading-relaxed mt-3">
          You enter the time signature (which gives beats per bar), the BPM, and the number of bars. The rest is arithmetic; but arithmetic you shouldn&apos;t be doing while you&apos;re in creative flow.
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
            </tbody>
          </table>
        </div>
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
            a="Because the top number says 6, but musicians often feel 2. You must decide: are you counting the eighth notes or the dotted‑quarter pulses? The calculator gives you the raw number; your ears tell you the feel."
          />
        </div>
      </section>
    </section>
  )
}
