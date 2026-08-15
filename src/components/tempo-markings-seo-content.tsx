"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { ContinueLearningCarousel } from "@/components/continue-learning-carousel"

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

function ComparisonCard({
  leftLabel,
  leftValue,
  rightLabel,
  rightValue,
}: {
  leftLabel: string
  leftValue: string
  rightLabel: string
  rightValue: string
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
      <div className="rounded-xl border bg-card p-4">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-1.5">
          {leftLabel}
        </p>
        <p className="text-sm font-medium text-foreground">{leftValue}</p>
      </div>
      <div className="rounded-xl border bg-card p-4">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-1.5">
          {rightLabel}
        </p>
        <p className="text-sm font-medium text-foreground">{rightValue}</p>
      </div>
    </div>
  )
}

export function TempoMarkingsSeoContent() {
  return (
    <section className="mt-16 space-y-12 divide-y divide-border">
      <section className="rounded-xl border bg-card p-6 space-y-2">
        <h2 className="text-lg font-bold">Key Takeaways</h2>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-2.5">
          <li>Tempo markings tell musicians how fast or slow music should be played.</li>
          <li>Tempo is measured in BPM (Beats Per Minute).</li>
          <li>Common markings include Adagio, Andante, Moderato, Allegro, and Presto.</li>
          <li>Tempo affects the mood, energy, and feel of music.</li>
          <li>Tempo is different from rhythm and time signatures.</li>
          <li>Tools like a metronome help improve timing and accuracy.</li>
          <li>Understanding the feel of a tempo works better than memorizing terms alone.</li>
        </ul>
      </section>

      <section>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Ever wondered why one song feels calm and emotional while another feels energetic and exciting?
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Many musicians run into the same problem. They memorize Italian words like Allegro, Andante, and Presto, but struggle to understand what those terms actually mean during real performance. Knowing the word is one thing. Feeling and applying the tempo correctly is something else entirely.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Tempo markings do much more than tell musicians how fast to play. They shape emotion, control energy, and influence how listeners experience a piece of music.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          By the end of this guide, you&apos;ll understand major tempo markings, BPM ranges, tempo changes, and practical ways to apply them while practicing.
        </p>
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-serif font-bold mb-5">What Are Tempo Markings?</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Tempo markings are instructions written in sheet music that tell musicians the speed of a piece or section of music.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          They help performers understand how quickly beats should occur and create consistency across performances.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Tempo is usually measured using BPM (Beats Per Minute).
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">For example:</p>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>60 BPM = one beat every second</li>
          <li>120 BPM = two beats every second</li>
          <li>180 BPM = three beats every second</li>
        </ul>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Composers traditionally used Italian words rather than exact BPM numbers because these terms also communicate emotional feeling, not just speed.
        </p>
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-serif font-bold mb-5">Tempo vs Rhythm</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Many beginners confuse tempo and rhythm — tempo is how fast music moves, while rhythm is the pattern of notes and beats.
        </p>
        <ComparisonCard
          leftLabel="Tempo"
          leftValue="Your walking speed"
          rightLabel="Rhythm"
          rightValue="The pattern of your footsteps"
        />
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-serif font-bold mb-5">Tempo vs Time Signature</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          A time signature tells you how beats are organized, while tempo tells you how quickly those beats occur.
        </p>
        <ComparisonCard
          leftLabel="Time Signature"
          leftValue="4/4 time = four beats per measure"
          rightLabel="Tempo"
          rightValue="120 BPM = how fast those beats happen"
        />
        <p className="text-sm text-muted-foreground leading-relaxed">
          If you&apos;re still learning beat structure, our{" "}
          <Link href="/beats-per-bar-calculator" className="text-primary hover:underline font-bold">beats-per-bar guide</Link>{" "}
          can help explain how measures and beat groups work naturally.
        </p>
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-serif font-bold mb-5">Why Tempo Markings Matter</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Tempo affects much more than speed.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:auto-rows-fr">
          <div className="rounded-xl border bg-card p-4">
            <h4 className="font-semibold text-sm text-foreground mb-1">Emotional Impact</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Changing tempo changes mood instantly.
            </p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>Slow tempos often feel emotional, dramatic, or peaceful</li>
              <li>Moderate tempos feel balanced and natural</li>
              <li>Fast tempos often create excitement and energy</li>
            </ul>
          </div>

          <div className="rounded-xl border bg-card p-4">
            <h4 className="font-semibold text-sm text-foreground mb-1">Performance Consistency</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Without tempo markings, musicians might perform the same piece very differently. This is exactly why tempo markings became essential once the same compositions began being performed by different orchestras, in different cities, and across different generations.
            </p>
          </div>

          <div className="rounded-xl border bg-card p-4">
            <h4 className="font-semibold text-sm text-foreground mb-1">Genre Influence</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Different music styles often use specific tempo ranges:
            </p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>Ballads &#x2192; slower BPM</li>
              <li>Pop music &#x2192; moderate BPM</li>
              <li>Dance music &#x2192; faster BPM</li>
              <li>Electronic music &#x2192; wide BPM variations</li>
            </ul>
          </div>

          <div className="rounded-xl border bg-card p-4">
            <h4 className="font-semibold text-sm text-foreground mb-1">Musical Interpretation</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Professional musicians do not simply count beats. They use tempo to shape expression and musical storytelling. Two performers can play the exact same notes yet sound completely different, depending on how they interpret the tempo marking.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-serif font-bold mb-5">Tempo Markings Explained Individually</h2>

        <h3 id="tempo-guide-slow-heading" className="text-lg font-serif font-bold mt-8 mb-3">Slow Tempo Markings</h3>

        <p id="tempo-guide-grave" className="text-sm text-muted-foreground leading-relaxed">
          <strong>Grave</strong> — Grave creates a very slow, serious feeling. It often appears in dramatic openings or emotional orchestral sections.
        </p>
        <p id="tempo-guide-largo" className="text-sm text-muted-foreground leading-relaxed">
          <strong>Largo</strong> — Largo has a broad and spacious feel. Musicians often describe it as powerful and grand.
        </p>
        <p id="tempo-guide-lento" className="text-sm text-muted-foreground leading-relaxed">
          <strong>Lento</strong> — Lento means slow, smooth, and flowing. It sits close to Largo in speed but implies a more connected, singing quality rather than broadness. Composers use Lento when they want sustained, unhurried motion.
        </p>
        <p id="tempo-guide-adagio" className="text-sm text-muted-foreground leading-relaxed">
          <strong>Adagio</strong> — Adagio combines slower speed with expressive emotion. Many emotional piano pieces use Adagio sections.
        </p>

        <h3 id="tempo-guide-moderate-heading" className="text-lg font-serif font-bold mt-8 mb-3">Moderate Tempo Markings</h3>

        <p id="tempo-guide-andante" className="text-sm text-muted-foreground leading-relaxed">
          <strong>Andante</strong> — Andante literally suggests a walking pace. Imagine walking naturally down a street without rushing.
        </p>
        <p id="tempo-guide-moderato" className="text-sm text-muted-foreground leading-relaxed">
          <strong>Moderato (What is Moderato Tempo Range?)</strong> — Moderato sits comfortably in the middle. It creates balance without feeling too relaxed or too energetic.
        </p>

        <h3 id="tempo-guide-fast-heading" className="text-lg font-serif font-bold mt-8 mb-3">Fast Tempo Markings</h3>

        <p id="tempo-guide-allegro" className="text-sm text-muted-foreground leading-relaxed">
          <strong>Allegro (What is a Fast Tempo Called in Music?)</strong> — Allegro is one of the most common tempo markings. It usually feels lively and energetic. Many classical and pop-inspired pieces use Allegro.
        </p>
        <p id="tempo-guide-vivace" className="text-sm text-muted-foreground leading-relaxed">
          <strong>Vivace</strong> — Vivace moves faster and often feels bright and joyful.
        </p>

        <h3 className="text-lg font-serif font-bold mt-8 mb-3">Very Fast Tempo Markings</h3>

        <p id="tempo-guide-presto" className="text-sm text-muted-foreground leading-relaxed">
          <strong>Presto</strong> — Presto demands speed and precision. Fast instrumental passages often use this marking.
        </p>
        <p id="tempo-guide-prestissimo" className="text-sm text-muted-foreground leading-relaxed">
          <strong>Prestissimo</strong> — Prestissimo pushes speed to an extreme level and often requires advanced technique.
        </p>
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-serif font-bold mb-5">Tempo Changes Explained</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Music doesn&apos;t always stay at one speed. Composers frequently change tempo throughout a piece using terms like these:
        </p>

        <div className="space-y-2.5">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong>Accelerando</strong> — Accelerando means gradually becoming faster. Imagine a train slowly gaining speed.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong>Ritardando</strong> — Ritardando means gradually slowing down. This often creates dramatic endings.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong>Rubato</strong> — Rubato allows flexible timing for expression. The musician slightly stretches or compresses time while keeping the musical phrase natural.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong>A Tempo</strong> — A tempo means returning to the original speed.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-serif font-bold mb-5">Tempo Marking Modifiers (Compound Terms)</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Composers often combine a base tempo marking with a modifier word to fine-tune the speed or character. These compound terms are common in classical scores but rarely explained clearly — here&apos;s what the most searched ones mean:
        </p>

        <h3 className="text-lg font-serif font-bold mt-8 mb-3">Common Modifier Words</h3>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li><strong>Assai</strong> — &quot;very&quot; (e.g. Adagio assai = very slow)</li>
          <li><strong>Molto</strong> — &quot;much, very&quot; (e.g. Allegro molto = very fast)</li>
          <li><strong>Poco</strong> — &quot;a little&quot; (e.g. Poco Adagio = a little slow)</li>
          <li><strong>Non Troppo</strong> — &quot;not too much&quot; (e.g. Allegro non troppo = fast, but not too fast)</li>
          <li><strong>Con Moto</strong> — &quot;with motion&quot; (e.g. Andante con moto = walking pace, with movement)</li>
          <li><strong>Maestoso</strong> — &quot;majestic&quot; (e.g. Andante maestoso = walking pace, played majestically)</li>
          <li><strong>Moderato</strong> (as a modifier) — &quot;moderate&quot; (e.g. Andante moderato = between Andante and Moderato, roughly 92–112 BPM)</li>
          <li><strong>Giusto</strong> — &quot;exact, strict&quot; (e.g. Allegro giusto = fast, played in strict, precise time)</li>
          <li><strong>Scherzando</strong> — &quot;playful, joking&quot; (e.g. Allegro scherzando = fast and playful in character)</li>
        </ul>

        <h3 className="text-lg font-serif font-bold mt-8 mb-3">Common Compound Terms and Approximate BPM</h3>
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left px-4 py-2 font-medium">Compound Term</th>
                <th className="text-left px-4 py-2 font-medium">Approx. BPM</th>
                <th className="text-left px-4 py-2 font-medium">Meaning</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2 font-serif italic">Andante moderato</td>
                <td className="px-4 py-2 font-mono text-xs text-muted-foreground whitespace-nowrap">92&#x2013;112 BPM</td>
                <td className="px-4 py-2 text-muted-foreground">Walking pace, moderately brisk</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-serif italic">Andante maestoso</td>
                <td className="px-4 py-2 font-mono text-xs text-muted-foreground whitespace-nowrap">76&#x2013;108 BPM</td>
                <td className="px-4 py-2 text-muted-foreground">Walking pace, played majestically</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-serif italic">Andante con moto</td>
                <td className="px-4 py-2 font-mono text-xs text-muted-foreground whitespace-nowrap">80&#x2013;110 BPM</td>
                <td className="px-4 py-2 text-muted-foreground">Walking pace, with added motion</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-serif italic">Allegro moderato</td>
                <td className="px-4 py-2 font-mono text-xs text-muted-foreground whitespace-nowrap">116&#x2013;120 BPM</td>
                <td className="px-4 py-2 text-muted-foreground">Moderately fast, held back slightly</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-serif italic">Allegro giusto</td>
                <td className="px-4 py-2 font-mono text-xs text-muted-foreground whitespace-nowrap">120&#x2013;156 BPM</td>
                <td className="px-4 py-2 text-muted-foreground">Fast, in exact/strict tempo</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-serif italic">Allegro scherzando</td>
                <td className="px-4 py-2 font-mono text-xs text-muted-foreground whitespace-nowrap">120&#x2013;156 BPM</td>
                <td className="px-4 py-2 text-muted-foreground">Fast and playful</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-serif italic">Allegro non troppo</td>
                <td className="px-4 py-2 font-mono text-xs text-muted-foreground whitespace-nowrap">120&#x2013;140 BPM</td>
                <td className="px-4 py-2 text-muted-foreground">Fast, but not pushed to the limit</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mt-3">
          These modifiers don&apos;t change the base category (slow, moderate, fast) — they fine-tune character and exact pacing within it. When in doubt, treat the base term (Andante, Allegro, etc.) as the primary speed guide and the modifier as a performance instruction.
        </p>
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-serif font-bold mb-5">How to Practice Tempo Markings Using a Metronome</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          A metronome turns abstract tempo terms into something you can hear and feel. Follow this simple workflow:
        </p>

        <div className="space-y-2.5">
          {[
            { title: "Choose your BPM", desc: "Select the target BPM from the chart." },
            { title: "Start slower than your target", desc: "Starting slowly improves control and accuracy." },
            { title: "Increase gradually", desc: "Increase by 5 BPM, 10 BPM, or small consistent increments." },
            { title: "Track accuracy", desc: "Pay attention to timing consistency, note clarity, and mistakes during transitions." },
            { title: "Practice tempo changes", desc: "Switch between slower and faster speeds to help build internal timing." },
          ].map((step, i) => (
            <div key={step.title} className="flex items-start gap-2.5">
              <span className="w-6 h-6 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong>{step.title}</strong> — {step.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl border bg-card px-4 py-3 flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-foreground">Related tools:</span>
          <Link href="/metronome" className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-muted/40">
            Online Metronome
          </Link>
          <Link href="/tap-tempo" className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-muted/40">
            Tap Tempo tool
          </Link>
          <Link href="/bpm-calculator" className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-muted/40">
            BPM calculator
          </Link>
          <Link href="/delay-reverb-time-calculator" className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-muted/40">
            Delay &amp; Reverb Time calculator
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-serif font-bold mb-5">Real Song Examples by Tempo Range</h2>
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left px-4 py-2 font-medium">BPM Range</th>
                <th className="text-left px-4 py-2 font-medium">Feel</th>
                <th className="text-left px-4 py-2 font-medium">Real-World Song Example</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono text-xs">60&#x2013;76 BPM</td>
                <td className="px-4 py-2 text-muted-foreground">Emotional &amp; Slow</td>
                <td className="px-4 py-2 text-muted-foreground">&quot;Someone Like You&quot; &#x2013; Adele (~68 BPM)</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono text-xs">80&#x2013;110 BPM</td>
                <td className="px-4 py-2 text-muted-foreground">Natural Walking Pace</td>
                <td className="px-4 py-2 text-muted-foreground">&quot;Let It Be&quot; &#x2013; The Beatles (~72 BPM) / &quot;Stayin&apos; Alive&quot; &#x2013; Bee Gees (~104 BPM)</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono text-xs">120&#x2013;130 BPM</td>
                <td className="px-4 py-2 text-muted-foreground">Lively &amp; Energetic</td>
                <td className="px-4 py-2 text-muted-foreground">&quot;Spring&quot; (Vivaldi) &#x2013; (~120 BPM)</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono text-xs">140&#x2013;160 BPM</td>
                <td className="px-4 py-2 text-muted-foreground">High Energy</td>
                <td className="px-4 py-2 text-muted-foreground">&quot;Smells Like Teen Spirit&quot; &#x2013; Nirvana (~140 BPM)</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono text-xs">170+ BPM</td>
                <td className="px-4 py-2 text-muted-foreground">Intense / Virtuosic</td>
                <td className="px-4 py-2 text-muted-foreground">&quot;Flight of the Bumblebee&quot; &#x2013; Rimsky-Korsakov (~180 BPM)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mt-3">
          These examples help connect numbers with actual musical feel.
        </p>
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-serif font-bold mb-5">Common Mistakes Beginners Make</h2>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1.5">
          <li><strong>Memorizing terms only</strong> &#x2013; Knowing Italian words without hearing their feel creates confusion.</li>
          <li><strong>Ignoring musical emotion</strong> &#x2013; Tempo is not just mathematics. Emotion matters too.</li>
          <li><strong>Confusing rhythm and tempo</strong> &#x2013; These concepts work together but are not identical.</li>
          <li><strong>Practicing too fast</strong> &#x2013; Many musicians rush before developing accuracy. Speed comes after consistency.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-serif font-bold mb-5">Practical Musician Tips</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          After practicing tempo for years, many musicians eventually realize something important:
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed font-medium">
          Tempo should feel natural rather than mechanical.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">Some useful habits:</p>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>Think in BPM ranges rather than exact numbers</li>
          <li>Match emotional feeling with speed</li>
          <li>Practice shifting between tempos</li>
          <li>Build internal rhythm without relying completely on tools</li>
          <li>Listen actively while practicing</li>
        </ul>
      </section>

      {/* Continue Learning */}
      <section>
        <h2 className="text-xl md:text-2xl font-serif font-bold mb-5">Continue Learning</h2>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            Want to understand tempo markings on a deeper level? These guides go further into the &ldquo;why&rdquo; behind the terms:
          </p>
          <ContinueLearningCarousel
            items={[
              {
                title: "Why Composers Use Tempo Markings Instead of BPM Numbers",
                description:
                  "Discover why Italian terms like Allegro and Adagio have survived for centuries instead of composers simply writing exact BPM numbers on the score.",
                href: "/blog/why-composers-use-tempo-markings-instead-of-bpm",
              },
              {
                title: "Why the Same Tempo Marking Sounds Different Across Performances",
                description:
                  "Learn why two performances both marked \u201CAllegro\u201D can sound noticeably different in speed, and what actually determines the tempo a performer chooses.",
                href: "/blog/why-the-same-tempo-marking-sounds-different",
              },
            ]}
          />
        </div>
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-serif font-bold mb-5">Frequently Asked Questions</h2>
        <div className="rounded-xl border divide-y">
          <FaqItem
            q="What are tempo markings in music?"
            a="Tempo markings are instructions that tell musicians how fast or slow music should be played."
          />
          <FaqItem
            q="Why are tempo markings written in Italian?"
            a="Italian terminology became widely used during the development of classical music and eventually became a standard in music notation."
          />
          <FaqItem
            q="What BPM is Allegro?"
            a="Allegro commonly falls around 120\u2013156 BPM, although exact ranges can vary."
          />
          <FaqItem
            q="Where are tempo markings written?"
            a="Tempo markings usually appear above the first measure of sheet music."
          />
          <FaqItem
            q="Is tempo the same as rhythm?"
            a="No. Tempo controls speed, while rhythm controls beat patterns."
          />
          <FaqItem
            q="How does a metronome help?"
            a="A metronome provides consistent beats that help musicians maintain timing and improve accuracy."
          />
          <FaqItem
            q="What is Moderato tempo range?"
            a="Moderato ranges from 108–120 BPM. It sits in the middle of the tempo spectrum, meaning &quot;moderate speed&quot; in Italian. It&apos;s neither slow nor fast, creating a balanced, controlled, neutral feel that&apos;s commonly used across classical and pop music."
          />
          <FaqItem
            q="How many BPM is Moderato?"
            a="Moderato is typically 108–120 BPM. Some sources place it slightly lower, around 86–97 BPM, depending on style and era. In practice, Moderato simply means a comfortable, walking-to-moderate pace — not rushed, not slow."
          />
          <FaqItem
            q="What tempo in music means fast?"
            a="Allegro (120–156 BPM) is the most common fast tempo marking, meaning &quot;fast, quick, and bright.&quot; Faster still are Vivace (156–176 BPM), Presto (168–200 BPM), and Prestissimo (200–300 BPM), used for the quickest, most energetic passages."
          />
          <FaqItem
            q="What is a fast tempo called in music?"
            a="A fast tempo is generally called Allegro, the most widely used fast marking in music. For even faster speeds, terms like Vivace, Presto, and Prestissimo are used, each indicating a progressively quicker pace than Allegro."
          />
        </div>
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-serif font-bold mb-5">Final Thoughts (From a Musician&apos;s Perspective)</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Tempo markings are more than labels on sheet music. In my years of teaching and performing, I have found that the magic happens when you stop counting the numbers and start feeling the pulse.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          A piece marked Allegro shouldn&apos;t feel rushed&mdash;it should feel joyful. A piece marked Adagio shouldn&apos;t feel sluggish&mdash;it should breathe. The BPM chart above is your roadmap, but your ears and your internal metronome are the real drivers.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          My challenge to you: Take a song you already love, tap out its BPM using our tool, and compare it to this chart. Does it match the Italian term? If not, how does the composer&apos;s choice change the emotion of the piece?
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Start practicing with different tempo ranges, listen carefully to how music changes, and test yourself on songs you already know. Over time, you will begin recognizing tempo naturally instead of simply memorizing terminology.
        </p>
      </section>
    </section>
  )
}
