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
            <p className="pb-3 text-sm text-muted-foreground">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function BpmCalculatorSeoContent() {
  return (
    <section className="max-w-3xl mx-auto mt-16 space-y-10 pb-16 px-4">
      {/* Introduction */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-serif font-bold">BPM Calculator, Find Tempo, Beats, or Song Duration</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Use this BPM Calculator to perform tempo-based calculations when you already know two values and need to find the third. Whether you&apos;re producing music, planning a DJ set, creating loops, practicing with a <Link href="/metronome" className="text-primary hover:underline font-bold">metronome</Link>, or analyzing song timing, this tool provides fast and accurate results.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          With this calculator, you can:
        </p>
        <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
          <li><strong>Calculate BPM from beats and time</strong>, Find the tempo when you know how many beats occurred during a specific duration.</li>
          <li><strong>Calculate beats from BPM and duration</strong>, Determine how many beats occur within a given time period at a known tempo.</li>
          <li>Use the BPM Calculator to find song duration from BPM and total beats, estimating the length of a track, section, loop, or arrangement in seconds and minutes.</li>
        </ul>
        <p className="text-sm text-muted-foreground leading-relaxed">
          All calculations are based on the standard BPM formula:
        </p>
        <div className="p-4 rounded-xl border bg-muted/30 text-center font-mono text-lg font-bold text-foreground">
          BPM = (Beats × 60) ÷ Seconds
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          This calculator is useful for music production, audio engineering, DJ set planning, metronome practice, loop creation, fitness cadence tracking, and other tempo-related calculations.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          No sign-up required. No ads. Works directly in your browser and continues to function offline once loaded.
        </p>
      </section>

      {/* The Formula */}
      <section className="space-y-3">
        <h2 className="text-xl md:text-2xl font-serif font-bold">The Only Formula You Need to Memorize</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Everything on this page comes from one simple relationship:
        </p>
        <div className="p-4 rounded-xl border bg-muted/30 text-center font-mono text-base text-foreground">
          BPM = (Number of Beats × 60) ÷ Time in Seconds
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          From this, you can also solve for:
        </p>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
          <li>Beats = (BPM × Seconds) ÷ 60</li>
          <li>Seconds = (Beats × 60) ÷ BPM</li>
        </ul>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Let&apos;s see each in action.
        </p>
      </section>

      {/* Mode 1 */}
      <section className="space-y-3">
        <h2 className="text-xl md:text-2xl font-serif font-bold">Mode 1: Find BPM (Tempo) from Beats and Time</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          When to use: You have a recorded performance, a live drum loop, or any audio where you can physically count the beats over a set number of seconds.
        </p>
        <div className="p-4 rounded-xl border bg-muted/30 text-center font-mono text-base text-foreground">
          Formula: BPM = (Beats × 60) ÷ Seconds
        </div>
        <div className="space-y-3">
          <h3 className="font-semibold text-sm">Step‑by‑step example</h3>
          <div className="p-4 rounded-xl border bg-card/50 space-y-2">
            <p className="text-sm text-muted-foreground">Start a stopwatch. Count the beats for 15 or 30 seconds (longer = more accurate).</p>
            <p className="text-sm text-muted-foreground">You count 24 beats in 15 seconds</p>
            <p className="text-sm text-muted-foreground font-mono">→ BPM = (24 × 60) ÷ 15 = 1440 ÷ 15 = 96 BPM</p>
            <p className="text-sm text-muted-foreground">You count 40 beats in 20 seconds</p>
            <p className="text-sm text-muted-foreground font-mono">→ BPM = (40 × 60) ÷ 20 = 2400 ÷ 20 = 120 BPM</p>
          </div>
        </div>
        <div className="p-4 rounded-xl border border-primary/20 bg-primary/5">
          <h4 className="font-semibold text-sm mb-1">Pro tip for accuracy</h4>
          <p className="text-sm text-muted-foreground">For the most accurate BPM Calculator results, use longer timing samples and verify your beat count before entering values. Small counting errors can noticeably affect the final BPM result.</p>
        </div>
      </section>

      {/* Mode 2 */}
      <section className="space-y-3">
        <h2 className="text-xl md:text-2xl font-serif font-bold">Mode 2: Find Number of Beats from BPM and Time</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          When to use: You know a <Link href="/tempo-markings" className="text-primary hover:underline font-bold">song&apos;s tempo</Link> (e.g., 128 BPM) and want to know how many beats will play in a given time, for example, to program a drum loop, set a metronome count‑in, or calculate how many steps in a running routine.
        </p>
        <div className="p-4 rounded-xl border bg-muted/30 text-center font-mono text-base text-foreground">
          Formula: Beats = (BPM × Seconds) ÷ 60
        </div>
        <div className="space-y-3">
          <h3 className="font-semibold text-sm">Examples</h3>
          <div className="p-4 rounded-xl border bg-card/50 space-y-2">
            <p className="text-sm text-muted-foreground">How many beats in 30 seconds at 120 BPM?</p>
            <p className="text-sm text-muted-foreground font-mono">(120 × 30) ÷ 60 = 3600 ÷ 60 = 60 beats</p>
            <p className="text-sm text-muted-foreground">A house track at 126 BPM over 45 seconds</p>
            <p className="text-sm text-muted-foreground font-mono">(126 × 45) ÷ 60 = 5670 ÷ 60 = 94.5 beats (count as 94 or 95)</p>
          </div>
        </div>
        <div className="p-4 rounded-xl border bg-card/50">
          <h4 className="font-semibold text-sm mb-1">Real‑world use</h4>
          <p className="text-sm text-muted-foreground">DJs use this to know how many beats remain until a mix point. Producers use it to set <Link href="/delay-reverb-time-calculator" className="text-primary hover:underline font-bold">loop lengths</Link> that exactly match a number of bars.</p>
        </div>
      </section>

      {/* Mode 3 */}
      <section className="space-y-3">
        <h2 className="text-xl md:text-2xl font-serif font-bold">Mode 3: Find Song Duration from BPM and Beats</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          When to use: You know a track&apos;s tempo and its total number of beats (e.g., from a MIDI arrangement or sheet music), and you want to know how long it will play, essential for planning DJ sets, albums, or workout playlists.
        </p>
        <div className="p-4 rounded-xl border bg-muted/30 text-center font-mono text-base text-foreground">
          Formula: Seconds = (Beats × 60) ÷ BPM
        </div>
        <div className="space-y-3">
          <h3 className="font-semibold text-sm">Examples</h3>
          <div className="p-4 rounded-xl border bg-card/50 space-y-2">
            <p className="text-sm text-muted-foreground">A song has 160 beats at 100 BPM</p>
            <p className="text-sm text-muted-foreground font-mono">(160 × 60) ÷ 100 = 9600 ÷ 100 = 96 seconds (1 minute 36 seconds)</p>
            <p className="text-sm text-muted-foreground">A classical piece has 480 beats at 80 BPM</p>
            <p className="text-sm text-muted-foreground font-mono">(480 × 60) ÷ 80 = 28800 ÷ 80 = 360 seconds (6 minutes exactly)</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="px-3 py-2 text-left font-semibold">BPM</th>
                <th className="px-3 py-2 text-left font-semibold">Beats</th>
                <th className="px-3 py-2 text-left font-semibold">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y text-muted-foreground">
              <tr><td className="px-3 py-2 font-medium">120</td><td className="px-3 py-2">240</td><td className="px-3 py-2">2 min</td></tr>
              <tr><td className="px-3 py-2 font-medium">120</td><td className="px-3 py-2">480</td><td className="px-3 py-2">4 min</td></tr>
              <tr><td className="px-3 py-2 font-medium">140</td><td className="px-3 py-2">280</td><td className="px-3 py-2">2 min</td></tr>
              <tr><td className="px-3 py-2 font-medium">90</td><td className="px-3 py-2">270</td><td className="px-3 py-2">3 min</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Quick Reference Table */}
      <section className="space-y-3">
        <h2 className="text-xl md:text-2xl font-serif font-bold">Quick Reference Table (No Calculator Needed)</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          For common tempos, here are beats per 15 and 30 seconds:
        </p>
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="px-3 py-2 text-left font-semibold">BPM</th>
                <th className="px-3 py-2 text-left font-semibold">Beats in 15 sec</th>
                <th className="px-3 py-2 text-left font-semibold">Beats in 30 sec</th>
                <th className="px-3 py-2 text-left font-semibold">Seconds per beat</th>
              </tr>
            </thead>
            <tbody className="divide-y text-muted-foreground">
              <tr><td className="px-3 py-2 font-medium">60</td><td className="px-3 py-2">15</td><td className="px-3 py-2">30</td><td className="px-3 py-2">1.0</td></tr>
              <tr><td className="px-3 py-2 font-medium">80</td><td className="px-3 py-2">20</td><td className="px-3 py-2">40</td><td className="px-3 py-2">0.75</td></tr>
              <tr><td className="px-3 py-2 font-medium">90</td><td className="px-3 py-2">22.5 (~22)</td><td className="px-3 py-2">45</td><td className="px-3 py-2">0.667</td></tr>
              <tr><td className="px-3 py-2 font-medium">100</td><td className="px-3 py-2">25</td><td className="px-3 py-2">50</td><td className="px-3 py-2">0.6</td></tr>
              <tr><td className="px-3 py-2 font-medium">120</td><td className="px-3 py-2">30</td><td className="px-3 py-2">60</td><td className="px-3 py-2">0.5</td></tr>
              <tr><td className="px-3 py-2 font-medium">140</td><td className="px-3 py-2">35</td><td className="px-3 py-2">70</td><td className="px-3 py-2">0.429</td></tr>
              <tr><td className="px-3 py-2 font-medium">160</td><td className="px-3 py-2">40</td><td className="px-3 py-2">80</td><td className="px-3 py-2">0.375</td></tr>
              <tr><td className="px-3 py-2 font-medium">180</td><td className="px-3 py-2">45</td><td className="px-3 py-2">90</td><td className="px-3 py-2">0.333</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Memorize your most‑used tempo row, and you can <Link href="/bpm-to-ms" className="text-primary hover:underline font-bold">estimate BPM</Link> or beats in seconds without any tool.
        </p>
      </section>

      {/* Practical Scenarios */}
      <section className="space-y-3">
        <h2 className="text-xl md:text-2xl font-serif font-bold">Practical Scenarios for DJs, Producers, and Runners</h2>

        <div>
          <h3 className="font-semibold text-sm">For DJs, Beat matching and set timing</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            You have two tracks:
          </p>
          <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
            <li>Track A: 124 BPM, length 4 minutes</li>
            <li>Track B: 128 BPM, length 3 minutes</li>
          </ul>
          <p className="text-sm text-muted-foreground leading-relaxed">Question: How many beats does each track contain?</p>
          <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1 mt-2">
            <li>Track A beats = (124 × 240) ÷ 60 = 496 beats</li>
            <li>Track B beats = (128 × 180) ÷ 60 = 384 beats</li>
          </ul>
          <p className="text-sm text-muted-foreground leading-relaxed">Knowing this helps you plan where to start the mix so phrases align.</p>
        </div>

        <div>
          <h3 className="font-semibold text-sm">For producers, Loop length calculation</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            You want a 4‑bar drum loop at 140 BPM. Each bar has 4 beats → 16 beats total.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Duration = (16 × 60) ÷ 140 = 960 ÷ 140 ≈ 6.86 seconds per loop.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Set your DAW&apos;s loop region to exactly 6.86 seconds or set the project BPM first and use snap to grid.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-sm">For runners, Cadence‑matched playlists</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            You want to run at 180 steps per minute. If a song has 90 beats in 30 seconds, its BPM = 180. Perfect.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            If a song has 80 beats in 30 seconds → BPM = 160, too slow. Use the <Link href="/tap-tempo" className="text-primary hover:underline font-bold">tap tempo</Link> tool to filter your playlist.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-3">
        <h2 className="text-xl md:text-2xl font-serif font-bold">Frequently Asked Questions</h2>
        <div className="divide-y rounded-xl border">
          <FaqItem
            q="What's the difference between this BPM calculator and a tap tempo tool?"
            a="A tap tempo tool finds BPM by tapping a button in real time, fastest for a song playing right now. A BPM calculator works from a manually counted number of beats over a known time, making it more accurate for live performances or when you don't have a device to tap along with." />
          <FaqItem
            q="What time signatures does this work for?"
            a={<>All of them. BPM always measures quarter‑note beats in standard time. For 6/8, the &ldquo;beat&rdquo; is usually a dotted quarter, but the math still works if you count the <Link href="/beats-per-bar-calculator" className="text-primary hover:underline font-bold">main pulse</Link>.</>}
          />
        </div>
      </section>

      {/* Editorial Note */}
      <p className="text-xs text-muted-foreground border-t pt-4">
        This BPM calculator and guide were tested across electronic, rock, hip‑hop, and classical recordings. Manual counting was compared against DAW tempo readouts and tap‑tempo averages to ensure the formula examples are accurate for real‑world use.
      </p>
    </section>
  )
}
