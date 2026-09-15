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
            Start at a moderate tempo (e.g., around 60 BPM) in quarter notes. Use subdivisions: quarter, then eighth, then sixteenth, before increasing tempo. Practice hands separately first, then combine at a slower, controlled tempo. Increase by small steps only when consistently even; drop back if sloppy.
          </p>
        </section>

        {/* Why Use a Metronome for Piano Practice? */}
        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-serif font-bold">Why Use a Metronome for Piano Practice?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Piano is unusually demanding on timing because both hands are doing different things at once: different rhythms, different dynamics, sometimes different articulations entirely. A metronome exposes exactly where the gap is between your hands, or between one passage and the next, that you can&apos;t always hear on your own.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Used well, an online metronome is less about hitting a target speed and more about building evenness and stability, the kind that holds up once the click goes away. If practicing with one has felt more frustrating than helpful, it&apos;s worth checking whether you&apos;re making some of the{" "}
            <Link href="/blog/common-metronome-mistakes" className="text-primary hover:underline font-bold">
              common metronome mistakes
            </Link>{" "}
            pianists run into.
          </p>
        </section>

        {/* How to Practice Piano Scales With a Metronome */}
        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-serif font-bold">How to Practice Piano Scales With a Metronome</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Start at a moderate tempo, around 60 BPM in quarter notes is a common starting point, and adjust so every note feels even and comfortable. There&apos;s no single &quot;correct&quot; number; the right starting tempo is whatever lets you play cleanly without straining.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Once that tempo feels solid, work through a note-per-click progression before touching the speed dial: quarter notes, then eighth notes, then sixteenth notes, all at the same BPM. This is where{" "}
            <Link href="/metronome-with-subdivisions" className="text-primary hover:underline font-bold">
              subdivision practice
            </Link>{" "}
            helps most: it builds precision inside a tempo you already handle well, instead of just chasing a faster number.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Practice each hand separately before combining them. When you bring the hands together, lower the tempo enough to keep coordination controlled. Even if each hand felt comfortable faster alone, two hands together almost always need more room.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The goal throughout is evenness: consistent note spacing and controlled articulation, not identical volume or tone. Listen specifically for notes that rush or drag, especially around thumb crossings and descending passages, which is where most scale unevenness tends to show up. Thumb crossings often add a small hesitation or accent, and descending runs feel less secure because the weaker fourth and fifth fingers are doing more of the work. Slow down just enough to make these moments inaudible before pushing the tempo further.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            When you increase tempo, move in small steps, around 4 BPM at a time, only after the current tempo is consistently even. If a passage turns uneven or tense, drop back to the last clean tempo and rebuild rather than pushing through. This applies across major, minor, chromatic, and contrary-motion scales alike.
          </p>
        </section>

        {/* Practicing Arpeggios With a Metronome */}
        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-serif font-bold">Practicing Arpeggios With a Metronome</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Arpeggios often need a slower starting tempo than scales. The larger hand movements and position changes involved make even timing genuinely harder to maintain, even for players who handle scales comfortably.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The same subdivision progression applies: quarter, then eighth, then sixteenth notes at a fixed tempo, but the priority is even spacing and smooth transitions between positions rather than speed. Watch your wrist rotation and thumb-under timing; rushing a position shift is one of the fastest ways to throw off an otherwise clean arpeggio.
          </p>
        </section>

        {/* Improve Hand Synchronization */}
        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-serif font-bold">Improve Hand Synchronization</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The core workflow is simple: perfect each hand alone, then combine at a slower, controlled tempo. Subdivisions help here too, giving a fine enough grid to line up a faster-moving hand against a slower one.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Two drills worth building into regular practice:
          </p>

          <h3 className="font-semibold text-sm">Blocked vs. broken</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Left hand plays a steady broken pattern while the right hand plays blocked chords on beat one. Start at a tempo where the left hand&apos;s pattern stays perfectly even, then focus entirely on whether the right hand&apos;s attacks land exactly on the pulse.
          </p>

          <h3 className="font-semibold text-sm pt-2">Muted-beat test</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Play a few bars with the click on, mute it for a couple of bars, then bring it back. If you&apos;re not landing exactly on the beat when it returns, your internal sense of tempo is drifting. Best used on a passage you already know well: a test of pulse, not a way to learn new notes.
          </p>

          <p className="text-sm text-muted-foreground leading-relaxed">
            The most common issues are a left hand that drags on leaps and a right hand that rushes through easier-sounding runs. When you find a trouble spot, isolate two to four bars and loop them slowly until both hands lock to the pulse before building back up to speed.
          </p>
        </section>

        {/* Hanon and Czerny Metronome Practice */}
        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-serif font-bold">Hanon and Czerny Metronome Practice</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            For Hanon exercises, a moderate starting tempo, around 60 BPM is a practical baseline, works well, with gradual increases as long as control stays even. Hanon&apos;s own text suggests higher target speeds, but many teachers place evenness well above hitting any specific number.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Czerny studies follow the same principles: start slow, increase gradually, keep articulation consistent rather than chasing a rigid BPM target. Rhythmic variations, such as long-short and short-long dotted patterns, at a fixed tempo build finger independence without speeding anything up; if one direction feels noticeably harder, that&apos;s where the independence still needs work.
          </p>
        </section>

        {/* Common Piano Timing Problems */}
        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-serif font-bold">Common Piano Timing Problems</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A few patterns show up again and again:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground leading-relaxed">
            <li>Rushing through difficult passages, then slowing back down once they pass</li>
            <li>Instability in descending passages specifically</li>
            <li>Thumb-crossing hiccups in both scales and arpeggios</li>
            <li>Hand desynchronization, with the left hand dragging and the right hand rushing</li>
            <li>Dynamics quietly shifting tempo: speeding up through a crescendo, slowing through a diminuendo</li>
            <li>Losing the pulse entirely once the metronome click is removed</li>
          </ul>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Most of these are timing issues in disguise, and a metronome is the most direct way to catch them before they become habits.
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

        {/* FAQ */}
        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-serif font-bold">Frequently Asked Questions</h2>
          <div className="divide-y rounded-xl border">
            <FaqItem
              q="What BPM should I practice piano scales at?"
              a="Choose a tempo slow enough that every note stays even and comfortable. A moderate tempo around 60 BPM in quarter notes is a common starting point. Increase in small steps only when your playing is consistently even, and drop back if it gets sloppy."
            />
            <FaqItem
              q="Should I practice hands separately before playing hands together?"
              a="Yes. Master each hand alone at a controlled tempo, then combine hands at a slower tempo that keeps coordination stable. This isolates problems early and builds timing you can actually rely on."
            />
            <FaqItem
              q="How do I use a metronome for Hanon exercises?"
              a="Start at a moderate tempo, around 60 BPM is a practical baseline, then increase gradually as long as control stays even. Prioritize perfect evenness over hitting any specific number."
            />
            <FaqItem
              q="Why do my hands fall out of sync when I play faster?"
              a="Faster tempos expose small timing gaps and position changes that slower playing hides. Lower the tempo, practice hands separately, use subdivisions, and loop short trouble spots until both hands lock to the pulse before speeding back up."
            />
          </div>
        </section>
      </div>
    </div>
  )
}