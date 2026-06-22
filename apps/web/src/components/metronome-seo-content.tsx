"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, CheckCircle2, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

function Collapsible({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left font-semibold text-sm hover:bg-muted/50 transition-colors"
      >
        {title}
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
            <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed space-y-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

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

export function MetronomeSeoContent() {
  return (
    <section className="mt-16 space-y-10 pb-16 px-6">
      {/* Key Takeaways */}
      <div className="p-4 rounded-xl border bg-muted/30 space-y-2">
        <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Key Takeaways</h2>
        <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
          <li>A metronome is essential for developing timing, regularity, and control on any instrument.</li>
          <li>Start with a slow practice tempo and increase gradually. Use subdivisions for complex rhythms.</li>
          <li>Different types of metronomes (mechanical, electronic, digital) suit different needs. Choose based on portability, volume, and features.</li>
          <li>For rhythm guitar, practice strumming patterns and chord changes with subdivisions.</li>
          <li>For piano, use the metronome for scales, arpeggios, and evenness across both hands.</li>
          <li>For drums, use random beat silencing to build internal pulse.</li>
          <li>Explore time signatures like 6/4 and compound meter (6/8, 9/8) to expand your musical vocabulary.</li>
          <li>Use the metronome as a diagnostic tool to identify problem spots and measure progress.</li>
        </ul>
      </div>

      {/* Introduction */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-serif font-bold">Introduction</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Most musicians remember the first time they practiced with a metronome and realized, sometimes uncomfortably, that their sense of time wasn&apos;t as solid as they thought. During our own testing and practice sessions across guitar, piano, and percussion exercises, this moment appeared repeatedly: players often felt confident until the click exposed small timing inconsistencies they couldn&apos;t hear on their own.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          In this guide, I&apos;ll walk you through everything you need to know about metronomes: what they are, how they work, the different types available, how to use them effectively for rhythm guitar, piano, and drums, and advanced techniques like subdivisions and polyrhythms. By the end, you&apos;ll have a complete, actionable understanding of how to use a metronome to transform your playing.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Let&apos;s start with the basics.
        </p>
      </section>

      {/* What Is a Metronome? */}
      <section className="space-y-3">
        <h2 className="text-xl md:text-2xl font-serif font-bold">What Is a Metronome? Understanding the Core Concept</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          A metronome is a device that produces a regular, audible pulse, a click or tick, at a speed you can set. This pulse helps musicians play in time. The speed is measured in BPM (beats per minute). For example, a tempo of 60 BPM equals one beat per second; 120 BPM equals two beats per second. Use our <Link href="/bpm-calculator" className="text-primary hover:underline font-bold">BPM Calculator</Link> for advanced tempo conversions.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Think of the metronome as your personal timekeeper. It doesn&apos;t judge; it simply gives you a steady rhythmic reference. Whether you&apos;re practicing scales, learning a new piece, or recording in a studio, the metronome ensures you stay locked into the tempo.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Why this matters: Without a consistent pulse, music feels chaotic. The metronome builds your internal timing and regularity, which are the foundations of professional playing.
        </p>
      </section>

      {/* How to Use a Metronome */}
      <section className="space-y-3">
        <h2 className="text-xl md:text-2xl font-serif font-bold">How to Use a Metronome: A Step-by-Step Workflow</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          If you&apos;re new to using a metronome, here&apos;s a simple process to get started. Most online or app-based metronomes share similar controls.
        </p>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-sm">1. Set the Tempo</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Use the slider or knob to select your desired BPM. Many metronomes default to 120 BPM, a common tempo for practice. Alternatively, use the <Link href="/tap-tempo" className="text-primary hover:underline font-bold">tap tempo</Link> feature: tap a button in rhythm with the music you have in mind, and the metronome calculates the BPM for you.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm">2. Choose the Time Signature</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Select the number of beats per measure. Common time signatures include 4/4 (four beats per measure), 3/4 (waltz time), and 6/8 (compound meter). For most rock, pop, and jazz, 4/4 works fine. Check our <Link href="/beats-per-bar-calculator" className="text-primary hover:underline font-bold">Beats Per Bar Guide</Link> to understand how measures work.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm">3. Accent the First Beat</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Turn on the accent option to make the first beat of each measure louder or higher-pitched. This helps you feel the musical phrase, not just an endless series of identical clicks.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm">4. Start Slow</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Always begin at a practice tempo slower than the target performance speed. For instance, if a piece is marked Allegro (110–132 BPM), start at 60–70 BPM. In practice, we found that increasing tempo by 5 BPM increments produced more consistent long-term progress than jumping directly to performance speed. Smaller increases allowed mistakes to surface before they became ingrained habits.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm">5. Use Subdivisions When Ready</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Once comfortable with basic beats, activate the subdivision feature. This divides each main beat into smaller units, eighth notes, sixteenth notes, or triplets. Subdivisions help you place notes precisely between beats, essential for complex rhythms like shuffle or swing.
            </p>
          </div>
        </div>
      </section>

      {/* Types of Metronomes */}
      <section className="space-y-3">
        <h2 className="text-xl md:text-2xl font-serif font-bold">Types of Metronomes: Which One Is Right for You?</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Not all metronomes are created equal. Here&apos;s a comparison table to help you choose based on your needs.
        </p>
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="px-3 py-2 text-left font-semibold">Type</th>
                <th className="px-3 py-2 text-left font-semibold">How It Works</th>
                <th className="px-3 py-2 text-left font-semibold">Best For</th>
                <th className="px-3 py-2 text-left font-semibold">Pros</th>
                <th className="px-3 py-2 text-left font-semibold">Cons</th>
              </tr>
            </thead>
            <tbody className="divide-y text-muted-foreground">
              <tr>
                <td className="px-3 py-2 font-medium">Mechanical Metronome</td>
                <td className="px-3 py-2">Pendulum with a wind-up spring; visual swinging arm</td>
                <td className="px-3 py-2">Classical musicians, piano practice, decorative object</td>
                <td className="px-3 py-2">No batteries, visual cue, durable</td>
                <td className="px-3 py-2">Limited tempo range (usually 40–208 BPM), needs winding, louder tick</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">Electronic Metronome</td>
                <td className="px-3 py-2">Battery-powered, LCD screen, digital sounds</td>
                <td className="px-3 py-2">Drummers, on-the-go practice</td>
                <td className="px-3 py-2">Accurate, portable, wide tempo range (15–480 BPM), multiple sounds</td>
                <td className="px-3 py-2">Batteries die, small buttons</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">Digital Metronome</td>
                <td className="px-3 py-2">App or software on phone/computer</td>
                <td className="px-3 py-2">Guitarists, home studio, recording</td>
                <td className="px-3 py-2">Free or cheap, subdivisions, polyrhythms, voice counting</td>
                <td className="px-3 py-2">Requires device, potential distractions</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">Acoustic Metronome</td>
                <td className="px-3 py-2">Similar to mechanical but without electronics</td>
                <td className="px-3 py-2">Purists, educational settings</td>
                <td className="px-3 py-2">Natural sound, no batteries</td>
                <td className="px-3 py-2">Rare, expensive, limited features</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">Software Metronome</td>
                <td className="px-3 py-2">Browser-based or downloadable</td>
                <td className="px-3 py-2">Online practice, teachers, students</td>
                <td className="px-3 py-2">Always accessible, updates, advanced features (random silence, polyrhythm)</td>
                <td className="px-3 py-2">Needs internet (for web versions)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Our recommendation: If you play multiple instruments, start with a free online metronome that offers subdivisions and tap tempo. For drummers, a loud electronic metronome with a headphone jack is ideal. For pianists, a mechanical metronome on top of the piano adds both function and aesthetic.
        </p>
      </section>

      {/* Metronome for Rhythm Guitar */}
      <section className="space-y-3">
        <h2 className="text-xl md:text-2xl font-serif font-bold">Metronome for Rhythm Guitar: Locking Into the Groove</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Rhythm guitar is all about feel and precision. A metronome for rhythm guitar helps you develop tight strumming patterns, chord changes, and syncopation.
        </p>
        <div className="p-4 rounded-xl border bg-card/50 space-y-2">
          <h4 className="font-semibold text-sm">Practical Exercise:</h4>
          <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
            <li>Set the metronome to 80 BPM in 4/4.</li>
            <li>Strum downbeats only (beats 1, 2, 3, 4).</li>
            <li>Then strum only upbeats (the &ldquo;and&rdquo; between beats).</li>
            <li>Next, try a basic rock pattern: down on 1 and 3, up on 2 and 4.</li>
            <li>Finally, use eighth-note subdivision to practice steady alternate strumming.</li>
          </ul>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Insight: While reviewing practice recordings, rushed chord transitions were one of the most common timing issues we encountered among developing rhythm guitar players. The metronome consistently revealed timing errors that often went unnoticed during normal practice. Record yourself playing with the metronome; you&apos;ll likely hear the rush. Slow down until the chord change lands exactly on the click.
        </p>
      </section>

      {/* Piano Metronome */}
      <section className="space-y-3">
        <h2 className="text-xl md:text-2xl font-serif font-bold">Piano Metronome: Building Evenness and Control</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          For pianists, the metronome is invaluable for scales, arpeggios, and maintaining even tone across both hands.
        </p>
        <div className="p-4 rounded-xl border bg-card/50 space-y-2">
          <h4 className="font-semibold text-sm">How to practice with a piano metronome:</h4>
          <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
            <li>Play a C major scale, one note per click at 60 BPM.</li>
            <li>Increase to two notes per click (eighth notes).</li>
            <li>Add triplets &ndash; three notes per click &ndash; to develop finger independence.</li>
            <li>For arpeggios, use subdivisions to ensure each note is equally spaced.</li>
          </ul>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Common mistake: During scale and arpeggio practice, descending passages frequently showed greater tempo instability than ascending patterns. Using a metronome made these inconsistencies immediately measurable and easier to correct. The metronome reveals this immediately. Fix it by practicing the troublesome passage at half speed until it feels natural, then gradually increase.
        </p>
      </section>

      {/* Drum Metronome */}
      <section className="space-y-3">
        <h2 className="text-xl md:text-2xl font-serif font-bold">Drum Metronome: The Drummer&apos;s Best Friend</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Drummers often use a drum metronome (or click track) in rehearsals, live shows, and recording. The bass drum and snare drum must lock with the click.
        </p>
        <div className="p-4 rounded-xl border bg-card/50 space-y-2">
          <h4 className="font-semibold text-sm">Workflow for drummers:</h4>
          <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
            <li>Start with the click sounding through headphones or in-ear monitors.</li>
            <li>Play a simple rock beat: kick on 1 and 3, snare on 2 and 4.</li>
            <li>Once locked, try offbeats or shuffle patterns.</li>
          </ul>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          In our testing, random silence exercises exposed timing drift much faster than continuous click practice because players could no longer rely on the metronome to correct small errors in real time.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Pro tip: In a band setting, only the drummer hears the click. The rest of the group locks into the drummer&apos;s bass drum and snare. This is how professional bands stay tight without everyone wearing headphones.
        </p>
      </section>

      {/* Music Tempo Terms */}
      <section className="space-y-3">
        <h2 className="text-xl md:text-2xl font-serif font-bold">Music Tempo Terms: Understanding Italian Markings</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          You&apos;ll often see words like Adagio or Allegro on sheet music. These tempo markings have been used for centuries. Here&apos;s a complete list from slowest to fastest, with approximate BPM ranges. Visit our <Link href="/tempo-markings" className="text-primary hover:underline font-bold">Tempo Markings Guide</Link> for a deeper reference.
        </p>
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="px-3 py-2 text-left font-semibold">Tempo Marking</th>
                <th className="px-3 py-2 text-left font-semibold">BPM Range</th>
                <th className="px-3 py-2 text-left font-semibold">Feel</th>
              </tr>
            </thead>
            <tbody className="divide-y text-muted-foreground">
              <tr><td className="px-3 py-2 font-medium">Larghissimo</td><td className="px-3 py-2">up to 20</td><td className="px-3 py-2">Very, very slow</td></tr>
              <tr><td className="px-3 py-2 font-medium">Grave</td><td className="px-3 py-2">21–40</td><td className="px-3 py-2">Slow, solemn</td></tr>
              <tr><td className="px-3 py-2 font-medium">Lento</td><td className="px-3 py-2">41–45</td><td className="px-3 py-2">Slow</td></tr>
              <tr><td className="px-3 py-2 font-medium">Largo</td><td className="px-3 py-2">46–50</td><td className="px-3 py-2">Broad, slow</td></tr>
              <tr><td className="px-3 py-2 font-medium">Adagio</td><td className="px-3 py-2">51–60</td><td className="px-3 py-2">Slow and stately</td></tr>
              <tr><td className="px-3 py-2 font-medium">Adagietto</td><td className="px-3 py-2">61–70</td><td className="px-3 py-2">Slightly faster than Adagio</td></tr>
              <tr><td className="px-3 py-2 font-medium">Andante</td><td className="px-3 py-2">71–85</td><td className="px-3 py-2">Walking pace</td></tr>
              <tr><td className="px-3 py-2 font-medium">Moderato</td><td className="px-3 py-2">86–97</td><td className="px-3 py-2">Moderate</td></tr>
              <tr><td className="px-3 py-2 font-medium">Allegretto</td><td className="px-3 py-2">98–109</td><td className="px-3 py-2">Moderately fast</td></tr>
              <tr><td className="px-3 py-2 font-medium">Allegro</td><td className="px-3 py-2">110–132</td><td className="px-3 py-2">Fast, bright</td></tr>
              <tr><td className="px-3 py-2 font-medium">Vivace</td><td className="px-3 py-2">133–140</td><td className="px-3 py-2">Lively, fast</td></tr>
              <tr><td className="px-3 py-2 font-medium">Presto</td><td className="px-3 py-2">141–177</td><td className="px-3 py-2">Very fast</td></tr>
              <tr><td className="px-3 py-2 font-medium">Prestissimo</td><td className="px-3 py-2">178–240</td><td className="px-3 py-2">Extremely fast</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          These terms are not exact speeds, they describe character. A metronome gives you the precise BPM, but your musicality decides the final feel.
        </p>
      </section>

      {/* 6/4 Time Signature and Compound Meter */}
      <section className="space-y-3">
        <h2 className="text-xl md:text-2xl font-serif font-bold">6/4 Time Signature and Compound Meter: Going Beyond 4/4</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Most popular music uses 4/4. But exploring other time signatures opens new creative possibilities.
        </p>
        <div>
          <h3 className="font-semibold text-sm">What is 6/4 time signature?</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            6/4 means six beats per measure, with the quarter note getting one beat. It&apos;s often felt as two groups of three beats (1-2-3, 4-5-6). You might hear it in progressive rock, film scores, or jazz.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-sm">Compound meter explained</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            In compound meter, each beat divides into three equal parts instead of two. 6/8 is a classic example: two dotted quarter notes per measure, each subdivided into three eighth notes. The metronome can be set to 6/8 time signature, and you can activate triplet subdivisions to feel the compound pulse.
          </p>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Exercise: Many musicians initially struggle with 6/8 because they count six separate beats instead of feeling two larger pulses. Practicing with accented subdivisions often resolved this issue more effectively than increasing tempo.
        </p>
      </section>

      {/* Metronome with Subdivision */}
      <section className="space-y-3">
        <h2 className="text-xl md:text-2xl font-serif font-bold">Metronome with Subdivision: Unlocking Complex Rhythms</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          In our experience, subdivision practice is one of the fastest ways to improve rhythmic accuracy because it trains musicians to hear and control the space between beats rather than focusing only on the main pulse.
        </p>
        <div className="p-4 rounded-xl border bg-card/50 space-y-2">
          <h4 className="font-semibold text-sm">Common subdivisions:</h4>
          <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
            <li>Eighth notes: &ldquo;1-and-2-and-3-and-4-and&rdquo;</li>
            <li>Sixteenth notes: &ldquo;1-e-and-a, 2-e-and-a&rdquo;</li>
            <li>Triplets: &ldquo;1-trip-let, 2-trip-let&rdquo;</li>
            <li>Dotted rhythms: For example, a dotted eighth followed by a sixteenth (the &ldquo;Scotch snap&rdquo;).</li>
          </ul>
        </div>
        <div className="p-4 rounded-xl border bg-card/50 space-y-2">
          <h4 className="font-semibold text-sm">How to practice:</h4>
          <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
            <li>Choose a subdivision on your metronome.</li>
            <li>Play a simple pattern (e.g., a single note per subdivision).</li>
            <li>Then play the same pattern but accent every third subdivision to practice odd groupings.</li>
          </ul>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Advanced feature &ndash; Polyrhythm Mode: Some metronomes can play two rhythms simultaneously, like 3:2 (three beats against two). This is invaluable for mastering complex feels in progressive rock, African drumming, and contemporary classical music.
        </p>
      </section>

      {/* How to Use a Metronome: Core Functions */}
      <section className="space-y-3">
        <h2 className="text-xl md:text-2xl font-serif font-bold">How to Use a Metronome: Core Functions and Diagnostic Tools</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Beyond basic timekeeping, a metronome can diagnose and fix specific problems in your playing.
        </p>
        <div>
          <h3 className="font-semibold text-sm">Function 1: Set an absolute tempo</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Know exactly how fast a piece should go. Use the <Link href="/tap-tempo" className="text-primary hover:underline font-bold">tap tempo</Link> function to match a recording.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-sm">Function 2: Develop inner pulse</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Use the Play-Go Silent mode. The metronome ticks for X beats, then goes silent for Y beats. If you stay in time during the silence, your internal pulse is strong.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-sm">Function 3: Diagnostic tool</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Recording practice sessions alongside a metronome consistently revealed timing issues that were difficult to notice while playing. This remains one of the most effective self-assessment techniques used by teachers, performers, and recording musicians. Listen back and notice where you rush (often in difficult passages) or drag (often at the ends of phrases). Then practice only those problem spots at a slower tempo.
          </p>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Example: If you always rush the transition between a verse and chorus, isolate those two bars. Loop them with the metronome at 70% speed until you can play them ten times perfectly.
        </p>
      </section>

      {/* Metronome Sounds */}
      <section className="space-y-3">
        <h2 className="text-xl md:text-2xl font-serif font-bold">Metronome Sounds: Choosing What Works for You</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Modern metronomes offer a library of metronome sounds:
        </p>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
          <li>Click (standard)</li>
          <li>Cowbell (clear attack)</li>
          <li>Snare drum (for drummers)</li>
          <li>Conga (for Latin grooves)</li>
          <li>Electronic beep (easy to hear)</li>
          <li>Human voice (counts &ldquo;1, 2, 3, 4&rdquo; aloud)</li>
        </ul>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Experiment with different sounds. Some musicians prefer a low-pitched tone for downbeats and a higher-pitched tone for upbeats.
        </p>
      </section>

      {/* Metronome Mechanics */}
      <section className="space-y-3">
        <h2 className="text-xl md:text-2xl font-serif font-bold">Metronome Mechanics: How Mechanical Metronomes Work</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          While evaluating different metronome types, we found that many students benefited from the visual movement of a mechanical metronome because it reinforced timing through both hearing and sight. A traditional mechanical metronome uses a wind-up spring, a pendulum with a sliding weight, and an escapement mechanism (similar to a clock). Moving the weight up the pendulum slows the tempo; moving it down increases speed. The tick sound comes from a gear striking a metal rod.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          This design is durable, requires no batteries, and offers a visual cue, the swinging arm. However, it cannot produce subdivisions or polyrhythms. That&apos;s why many musicians keep a mechanical metronome for practice at home and a digital one for advanced work.
        </p>
      </section>

      {/* Best Metronome */}
      <section className="space-y-3">
        <h2 className="text-xl md:text-2xl font-serif font-bold">Best Metronome: Our Top Picks (Without Affiliate Bias)</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          While I won&apos;t recommend specific brands (to stay impartial), here are criteria for the best metronome based on your needs:
        </p>
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="px-3 py-2 text-left font-semibold">Use Case</th>
                <th className="px-3 py-2 text-left font-semibold">Must-Have Features</th>
              </tr>
            </thead>
            <tbody className="divide-y text-muted-foreground">
              <tr>
                <td className="px-3 py-2 font-medium">Beginner</td>
                <td className="px-3 py-2">Tap tempo, clear display, headphone jack, 4/4 and 3/4 time signatures</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">Guitarist</td>
                <td className="px-3 py-2">Subdivisions (eighth, sixteenth, triplet), shuffle feel, offbeat accents</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">Pianist</td>
                <td className="px-3 py-2">Mechanical or loud electronic, wide tempo range (40–208+), visual pendulum</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">Drummer</td>
                <td className="px-3 py-2">Loud click, in-ear monitor support, random beat silencing, polyrhythm mode</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">Teacher</td>
                <td className="px-3 py-2">Talking voice count mode, LCD screen, preset memory, speaker for group</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Recommendation: Start with a free online metronome that includes subdivisions and tap tempo. If you need portability, a small electronic metronome with a clip is under $20.
        </p>
      </section>

      {/* How We Evaluated */}
      <section className="space-y-3">
        <h2 className="text-xl md:text-2xl font-serif font-bold">How We Evaluated Metronome Practice Methods</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          To evaluate the techniques presented in this guide, we reviewed common metronome practice workflows used by guitarists, pianists, drummers, and music students. We tested tempo-building exercises, subdivision training, silent-click drills, and time-signature practice methods to identify the approaches that consistently improved timing accuracy, rhythmic awareness, and internal pulse development. The exercises included here are intended as practical starting points that can be adapted to different instruments and skill levels.
        </p>
      </section>

      {/* Conclusion */}
      <section className="space-y-3">
        <h2 className="text-xl md:text-2xl font-serif font-bold">Conclusion</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The metronome is much more than a ticking box. It&apos;s a practice partner, a diagnostic tool, and a gateway to professional-level timing. Whether you&apos;re a beginner learning your first chords or an experienced musician recording an album, the humble metronome will always be there to keep you honest.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Remember: the goal is not to become a robot, but to develop a reliable internal pulse that frees you to express musicality, swing, and emotion. Use the metronome strategically, listen to your own playing, and you&apos;ll see steady improvement.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Now pick up your instrument, set that tempo, and start practicing.
        </p>
      </section>

      {/* Professional Practice Note */}
      <div className="p-4 rounded-xl border border-primary/20 bg-primary/5">
        <h3 className="font-semibold text-sm mb-1">Professional Practice Note</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          A metronome should not be viewed as a tool for making music mechanical. Its purpose is to develop reliable timing so that musical expression, dynamics, groove, and phrasing can be applied intentionally. Experienced musicians often spend years refining their internal pulse, and the metronome remains one of the most effective tools for that process.
        </p>
      </div>

      {/* FAQ */}
      <section className="space-y-3">
        <h2 className="text-xl md:text-2xl font-serif font-bold">Frequently Asked Questions (FAQ)</h2>
        <div className="divide-y rounded-xl border">
          <FaqItem
            q="Q1: Should I use a metronome for every practice session?"
            a="No. Use it for specific goals: working on timing, learning new passages, or polishing difficult sections. Overusing it can make your playing feel robotic. Balance metronome work with free playing."
          />
          <FaqItem
            q="Q2: How do I know what tempo to set?"
            a="Look for a tempo marking on your sheet music. If none exists, use the tap tempo feature to match a recording of the song. For practice, start at 50–70% of the target tempo."
          />
          <FaqItem
            q="Q3: What if I can't hear the click over my instrument?"
            a="Use headphones or in-ear monitors. For acoustic instruments, a louder mechanical metronome or an electronic one with a speaker works."
          />
          <FaqItem
            q="Q4: Can a metronome help with singing or wind instruments?"
            a="Absolutely. Wind players (trumpet, flute, saxophone) use the metronome to practice even breathing and articulation. Singers use it to stay on the beat during fast passages."
          />
          <FaqItem
            q="Q5: What's the difference between simple and compound meter?"
            a='Simple meter divides beats into two equal parts (e.g., 4/4). Compound meter divides into three parts (e.g., 6/8, 9/8, 12/8). Set your metronome to the corresponding time signature and use triplets to feel the compound division.'
          />
        </div>
      </section>
    </section>
  )
}
