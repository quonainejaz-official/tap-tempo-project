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

export function TempoMarkingsSeoContent() {
  return (
    <section className="mt-16 space-y-10">
      <section className="rounded-xl border bg-card p-6 space-y-2">
        <h2 className="text-lg font-bold">Key Takeaways</h2>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1.5">
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
          Many musicians run into the same problem: they memorize Italian words like Allegro, Andante, and Presto, but struggle to understand what those terms actually mean during real performance. Knowing the word is one thing. Feeling and applying the tempo correctly is something else entirely.
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
          Many beginners confuse tempo and rhythm.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Tempo = how fast music moves
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Rhythm = the pattern of notes and beats
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">Think of it like walking:</p>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>Tempo = your walking speed</li>
          <li>Rhythm = the pattern of your footsteps</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-serif font-bold mb-5">Tempo vs Time Signature</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          A time signature tells you how beats are organized.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Tempo tells you how quickly those beats occur.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">For example:</p>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>4/4 time tells you there are four beats per measure</li>
          <li>120 BPM tells you how fast those beats happen</li>
        </ul>
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

        <h3 className="text-lg font-serif font-bold mt-8 mb-3">Emotional impact</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Changing tempo changes mood instantly.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">Examples:</p>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>Slow tempos often feel emotional, dramatic, or peaceful</li>
          <li>Moderate tempos feel balanced and natural</li>
          <li>Fast tempos often create excitement and energy</li>
        </ul>

        <h3 className="text-lg font-serif font-bold mt-8 mb-3">Performance consistency</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Without tempo markings, musicians might perform the same piece very differently.
        </p>

        <h3 className="text-lg font-serif font-bold mt-8 mb-3">Genre influence</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Different music styles often use specific tempo ranges:
        </p>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>Ballads &#x2192; slower BPM</li>
          <li>Pop music &#x2192; moderate BPM</li>
          <li>Dance music &#x2192; faster BPM</li>
          <li>Electronic music &#x2192; wide BPM variations</li>
        </ul>

        <h3 className="text-lg font-serif font-bold mt-8 mb-3">Musical interpretation</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Professional musicians do not simply count beats.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          They use tempo to shape expression and musical storytelling.
        </p>
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-serif font-bold mb-5">Complete Tempo Markings Chart</h2>
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left px-4 py-2 font-medium">Tempo Marking</th>
                <th className="text-left px-4 py-2 font-medium">Meaning</th>
                <th className="text-left px-4 py-2 font-medium">BPM Range</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2 font-serif italic font-medium">Grave</td>
                <td className="px-4 py-2 text-muted-foreground">Very slow and serious</td>
                <td className="px-4 py-2 font-mono text-xs text-muted-foreground">25&#x2013;45</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-serif italic font-medium">Largo</td>
                <td className="px-4 py-2 text-muted-foreground">Broad and slow</td>
                <td className="px-4 py-2 font-mono text-xs text-muted-foreground">40&#x2013;60</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-serif italic font-medium">Adagio</td>
                <td className="px-4 py-2 text-muted-foreground">Slow and expressive</td>
                <td className="px-4 py-2 font-mono text-xs text-muted-foreground">55&#x2013;76</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-serif italic font-medium">Andante</td>
                <td className="px-4 py-2 text-muted-foreground">Walking pace</td>
                <td className="px-4 py-2 font-mono text-xs text-muted-foreground">72&#x2013;108</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-serif italic font-medium">Moderato</td>
                <td className="px-4 py-2 text-muted-foreground">Moderate speed</td>
                <td className="px-4 py-2 font-mono text-xs text-muted-foreground">108&#x2013;120</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-serif italic font-medium">Allegro</td>
                <td className="px-4 py-2 text-muted-foreground">Fast and lively</td>
                <td className="px-4 py-2 font-mono text-xs text-muted-foreground">120&#x2013;156</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-serif italic font-medium">Vivace</td>
                <td className="px-4 py-2 text-muted-foreground">Lively and bright</td>
                <td className="px-4 py-2 font-mono text-xs text-muted-foreground">156&#x2013;176</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-serif italic font-medium">Presto</td>
                <td className="px-4 py-2 text-muted-foreground">Very fast</td>
                <td className="px-4 py-2 font-mono text-xs text-muted-foreground">168&#x2013;200</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-serif italic font-medium">Prestissimo</td>
                <td className="px-4 py-2 text-muted-foreground">Extremely fast</td>
                <td className="px-4 py-2 font-mono text-xs text-muted-foreground">200+</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mt-3 italic">
          Keep in mind that these ranges can vary slightly depending on the composer and musical style.
        </p>
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-serif font-bold mb-5">Tempo Markings Explained Individually</h2>

        <h3 className="text-lg font-serif font-bold mt-8 mb-3">Slow Tempo Markings</h3>

        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong>Grave</strong> — Grave creates a very slow, serious feeling. It often appears in dramatic openings or emotional orchestral sections.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong>Largo</strong> — Largo has a broad and spacious feel. Musicians often describe it as powerful and grand.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong>Adagio</strong> — Adagio combines slower speed with expressive emotion. Many emotional piano pieces use Adagio sections.
        </p>

        <h3 className="text-lg font-serif font-bold mt-8 mb-3">Moderate Tempo Markings</h3>

        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong>Andante</strong> — Andante literally suggests a walking pace. Imagine walking naturally down a street without rushing.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong>Moderato</strong> — Moderato sits comfortably in the middle. It creates balance without feeling too relaxed or too energetic.
        </p>

        <h3 className="text-lg font-serif font-bold mt-8 mb-3">Fast Tempo Markings</h3>

        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong>Allegro</strong> — Allegro is one of the most common tempo markings. It usually feels lively and energetic. Many classical and pop-inspired pieces use Allegro.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong>Vivace</strong> — Vivace moves faster and often feels bright and joyful.
        </p>

        <h3 className="text-lg font-serif font-bold mt-8 mb-3">Very Fast Tempo Markings</h3>

        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong>Presto</strong> — Presto demands speed and precision. Fast instrumental passages often use this marking.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong>Prestissimo</strong> — Prestissimo pushes speed to an extreme level and often requires advanced technique.
        </p>
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-serif font-bold mb-5">Tempo Changes Explained</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Music doesn&apos;t always stay at one speed.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Composers frequently change tempo throughout a piece.
        </p>

        <h3 className="text-lg font-serif font-bold mt-8 mb-3">Accelerando</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Accelerando means gradually becoming faster.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Imagine a train slowly gaining speed.
        </p>

        <h3 className="text-lg font-serif font-bold mt-8 mb-3">Ritardando</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Ritardando means gradually slowing down.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          This often creates dramatic endings.
        </p>

        <h3 className="text-lg font-serif font-bold mt-8 mb-3">Rubato</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Rubato allows flexible timing for expression.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The musician slightly stretches or compresses time while keeping the musical phrase natural.
        </p>

        <h3 className="text-lg font-serif font-bold mt-8 mb-3">A Tempo</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          A tempo means returning to the original speed.
        </p>
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-serif font-bold mb-5">How to Practice Tempo Markings Using a Metronome</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          A metronome turns abstract tempo terms into something you can hear and feel.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">Follow this simple workflow:</p>

        <h3 className="text-lg font-serif font-bold mt-8 mb-3">Choose your BPM</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Select the target BPM from the chart.
        </p>

        <h3 className="text-lg font-serif font-bold mt-8 mb-3">Start slower than your target</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Starting slowly improves control and accuracy.
        </p>

        <h3 className="text-lg font-serif font-bold mt-8 mb-3">Increase gradually</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Increase by:
        </p>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>5 BPM</li>
          <li>10 BPM</li>
          <li>Small consistent increments</li>
        </ul>

        <h3 className="text-lg font-serif font-bold mt-8 mb-3">Track accuracy</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Pay attention to:
        </p>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>Timing consistency</li>
          <li>Note clarity</li>
          <li>Mistakes during transitions</li>
        </ul>

        <h3 className="text-lg font-serif font-bold mt-8 mb-3">Practice tempo changes</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Switch between slower and faster speeds.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          This helps build internal timing.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          You can practice directly with our{" "}
          <Link href="/metronome" className="text-primary hover:underline font-bold">online metronome</Link>{" "}
          to hear tempo in real time.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          If you&apos;re trying to identify song speed quickly, use the{" "}
          <Link href="/tap-tempo" className="text-primary hover:underline font-bold">Tap Tempo tool</Link>{" "}
          by tapping along with the beat.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Need to convert values during production work? The{" "}
          <Link href="/bpm-calculator" className="text-primary hover:underline font-bold">BPM calculator</Link>{" "}
          can help estimate and compare tempo values more accurately.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Music producers can also calculate delay timing using the{" "}
          <Link href="/delay-reverb-time-calculator" className="text-primary hover:underline font-bold">delay and reverb time calculator</Link>.
        </p>
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
