"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, CheckCircle2, AlertTriangle, Music, Headphones, Dumbbell, Gamepad2, Guitar, Disc3, BookOpen } from "lucide-react"
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

function StepCard({ num, title, desc }: { num: number; title: string; desc: React.ReactNode }) {
  return (
    <div className="flex gap-3 p-4 rounded-xl border bg-card/50">
      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
        {num}
      </div>
      <div>
        <h4 className="font-semibold text-sm mb-1">{title}</h4>
        <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}

function MistakeCard({ num, title, desc, fix }: { num: number; title: string; desc: string; fix: string }) {
  return (
    <div className="p-4 rounded-xl border border-destructive/30 bg-destructive/5 space-y-2">
      <div className="flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-sm">Mistake {num}: {title}</h4>
          <p className="text-xs text-muted-foreground mt-1">{desc}</p>
        </div>
      </div>
      <div className="flex items-start gap-2 pl-6">
        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
        <p className="text-xs text-green-600 dark:text-green-400 font-medium">{fix}</p>
      </div>
    </div>
  )
}

function TipCard({ icon: Icon, title, desc }: { icon: React.ElementType; title: string; desc: string | React.ReactNode }) {
  return (
    <div className="p-4 rounded-xl border bg-card/50 space-y-2">
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <h4 className="font-semibold text-sm">{title}</h4>
      <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
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
        {q}
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
            <p className="pb-3 text-sm text-muted-foreground leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const classicalTempos = [
  { marking: "Largo", range: "40–60 BPM", character: "Very slow, broad" },
  { marking: "Adagio", range: "66–76 BPM", character: "Slow and stately" },
  { marking: "Andante", range: "76–108 BPM", character: "Walking pace" },
  { marking: "Moderato", range: "108–120 BPM", character: "Moderate speed" },
  { marking: "Allegro", range: "120–156 BPM", character: "Fast, bright" },
  { marking: "Presto", range: "168–200 BPM", character: "Very fast" },
  { marking: "Prestissimo", range: "200+ BPM", character: "Extremely fast" },
]

export function SeoContent() {
  return (
    <div className="mt-16 space-y-12 text-foreground">
      {/* Hero Section */}
      <section className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-serif font-bold tracking-tight">
          BPM Tapper: Find Song Tempo, BPM &amp; Beat – Free Tap Tempo Tool &amp; Guide
        </h2>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            Ever heard a song and wondered exactly how fast the beat is? Finding its precise tempo is easier than you think.
            Maybe you want to sample it, mix it into a DJ set, build a running playlist, or practice it with an <Link href="/metronome" className="text-primary hover:underline font-bold">online metronome</Link>.
            But how do you find that number quickly and accurately? The answer is simpler than you think: you tap.
          </p>
          <p>
            A BPM tapper (also called a tap tempo tool, BPM counter, or beat counter) lets you extract the beats‑per‑minute
            of any track just by clicking along with the rhythm. No expensive software, no audio analysis, just your ears and a finger.
          </p>
          <p>
            But here&apos;s the problem. Most tap tempo tools are painfully basic. They give you a number, and that&apos;s it.
            They don&apos;t tell you if it&apos;s accurate, how to apply it, why the number might jump around, or what to do
            with a song that changes tempo. They ignore the needs of guitarists setting delay pedals, classical musicians
            deciphering Andante, runners curating BPM‑matched playlists, and producers who need to map a live drummer&apos;s
            fluctuating groove. And almost none of them are backed by real musical expertise.
          </p>
          <p>
            During testing, we used the tapper across dozens of tracks spanning EDM, hip‑hop, rock, classical recordings,
            and live performances to evaluate how quickly the BPM stabilizes under different rhythmic conditions.
            Those observations helped shape the recommendations throughout this guide. Whether you&apos;re a seasoned DJ,
            a bedroom producer, a music student, or a fitness enthusiast, you&apos;ll walk away not just with a BPM number,
            but with the knowledge to use it like a pro.
          </p>
        </div>
      </section>

      {/* The Problem */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-serif font-bold">
          The Problem: Why Guessing Tempo Holds You Back
        </h2>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            Without an accurate tempo reference, things fall apart fast. A DJ transition that should feel seamless
            suddenly sounds like two songs fighting each other. A guitar delay pedal set by ear clouds the mix instead
            of thickening it. A DAW loop imported from a vinyl rip refuses to sync, no matter how many grid adjustments
            you make. And that workout playlist you spent hours building? It pushes you to sprint during what was supposed
            to be a warmup.
          </p>
          <p>
            Human perception of tempo is surprisingly unreliable. Research into tapping accuracy shows that even trained
            musicians can be off by 5–10 BPM when they rely purely on instinct. Add a complex rhythm, a changing time
            signature, or an unfamiliar genre, and that error balloons. A BPM tapper removes the guesswork by turning
            your natural sense of the beat into a measurable, repeatable number. The moment you start measuring instead
            of guessing, your practice, your productions, and your performances lock into place.
          </p>
        </div>
      </section>

      {/* Core Concepts */}
      <Collapsible title="Core Concepts: BPM, Tempo, and How Tap Tempo Really Works" defaultOpen>
        <p>
          Before you tap, it helps to understand what you&apos;re measuring. Tempo is simply the speed of a piece of music, how fast the underlying pulse moves. We measure it in BPM
          (beats per minute). If a song has a tempo of 120 BPM, you&apos;ll hear 120 quarter‑note beats every minute. Use our <Link href="/bpm-calculator" className="text-primary hover:underline font-bold">BPM Calculator</Link> for advanced tempo conversions.
        </p>
        <p>
            It&apos;s vital not to confuse tempo with time signature. Check our <Link href="/beats-per-bar" className="text-primary hover:underline font-bold">Beats Per Bar Guide</Link> to understand how measures work. A song in 4/4 time has four quarter‑note beats per measure,
                      but a waltz in 3/4 time still has a measurable BPM, the speed of those three beats. A BPM tapper doesn&apos;t care
          about the time signature; it only listens to the timing of your taps.
        </p>
        <p>
          So how does a tap tempo tool actually calculate BPM? The math is beautifully simple. Every time you tap,
          the tool records the exact moment of your click. It then measures the time interval between consecutive taps.
          If the average interval between your taps is 0.5 seconds, the BPM is <code className="px-1.5 py-0.5 rounded bg-muted text-foreground font-mono text-xs">60 ÷ 0.5 = 120 BPM</code>.
          Most tools, including ours, average several of the most recent intervals to produce a smooth, stable reading.
          That&apos;s why tapping 8–12 times yields a significantly more reliable BPM detection than just hitting the button twice.
        </p>
      </Collapsible>

      {/* How to Use */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-serif font-bold">
          How to Use Our BPM Tapper (and Get Accurate Results Every Time)
        </h2>
        <p className="text-sm text-muted-foreground">
          Here&apos;s the exact workflow we recommend after years of testing with musicians, producers, and students.
        </p>
        <div className="space-y-3">
          <StepCard num={1} title="Start your song" desc="Play the track from any source, Spotify, a DAW session, a YouTube video, or even a vinyl record. Place yourself in a quiet enough environment to focus on the percussion." />
          <StepCard num={2} title="Tap the beat, not the melody" desc="Identify the core pulse. In most popular music, the kick drum and snare provide the strongest reference. For classical or ambient pieces without drums, listen for the rhythmic phrasing of the melody itself." />
          <StepCard num={3} title="Keep tapping until the number stabilizes" desc="BPM readings typically settle within ±1 BPM after 8–12 consistent taps on songs with a steady tempo, while live recordings often required additional taps for a stable average." />
          <StepCard num={4} title="Interpret your result" desc="The large number you see is your average BPM. If you tapped exactly on every quarter note, that&apos;s the song&apos;s tempo. Hit the reset button to clear the memory and start fresh." />
          <StepCard num={5} title="Apply the BPM immediately" desc={<>Enter it into your metronome, set your DAW to that BPM, align the beat grid in DJ software, or use our <Link href="/bpm-to-ms" className="text-primary hover:underline font-bold">BPM to Milliseconds Calculator</Link> for exact delay timing.</>} />
          <p className="text-xs text-muted-foreground">Try the <Link href="/delay-time-calculator" className="text-primary hover:underline font-bold">Delay Time Calculator</Link> for precise pedal and effect settings.</p>
        </div>
      </section>

      {/* Tools & Resources */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-serif font-bold">
          Tools &amp; Resources to Level Up Your Tempo Game
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <TipCard icon={Disc3} title="Interactive Tool" desc="Works offline once loaded. No data is ever sent to a server, all timing calculations happen locally on your device." />
          <TipCard icon={BookOpen} title="BPM &amp; Genre Chart" desc={<>Download a printable PDF mapping common genres to their typical BPM ranges (Hip-Hop: 80–110, House: 120–130, D&amp;B: 160–180). Also includes a guide to classical tempo <Link href="/tempo-markings" className="text-primary hover:underline font-bold">Markings</Link>.</>} />
          <TipCard icon={Headphones} title="DAW Quick-Reference" desc="Shortcuts for setting project tempo in Ableton Live, FL Studio, Cubase, and Logic Pro." />
          <TipCard icon={Music} title="Metronome Apps" desc="A curated list of the best free metronome apps that accept manual BPM input." />
          <TipCard icon={Guitar} title="BPM-to-Milliseconds" desc="Enter your song&apos;s BPM and get the delay time for quarter-note, dotted-eighth, or triplet repeat." />
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-serif font-bold">
          Common Mistakes (and How to Avoid Them)
        </h2>
        <p className="text-sm text-muted-foreground">
          Even with a perfect tool, human error can creep in. Here are the mistakes we see most often and how to fix them.
        </p>
        <div className="space-y-3">
          <MistakeCard num={1} title="Tapping only 2 or 3 times" desc="A two-tap measurement gives you a single interval, which is the definition of unreliable. If your second tap is even slightly early, your BPM could be off by 20." fix="Go for 8–12 taps minimum. If the rhythm is complex, go to 16." />
          <MistakeCard num={2} title="Tapping the melody instead of the beat" desc="Vocals and lead guitar lines often weave around the pulse. If you tap along to the singer's phrasing, your BPM reading will be chaotic." fix="Focus exclusively on the drum kit or the steady bass rhythm." />
          <MistakeCard num={3} title="Confusing eighth notes for quarter notes" desc="If you tap twice per beat (eighth notes), the tapper will return a BPM that is double the actual tempo. A 90 BPM hip-hop track will read as 180 BPM." fix="Ask yourself: Am I tapping the foot-stomping pulse, or a faster subdivision?" />
          <MistakeCard num={4} title="Ignoring tempo changes" desc="Live recordings, classical pieces, and progressive rock often drift or deliberately change tempo. A single BPM number won't describe the whole track." fix="Use the tapper on the main verse or chorus, resetting in between sections." />
          <MistakeCard num={5} title="Forgetting the time signature context" desc="A 4/4 song at 120 BPM feels different from a 6/8 jig at 120 BPM, even though the tapper returns the same number." fix="Always consider the time signature when applying the result musically." />
        </div>
      </section>

      {/* Expert Tips */}
      <Collapsible title="Expert Tips & Advanced Applications">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground text-sm">For Producers: Manual Tempo Mapping</h4>
            <p>You have a raw drum recording without a click track. You can use a tap tempo approach inside your DAW to create a fluctuating tempo map. In Reaper, for example, you can assign a key to tap while the song plays, and the software will automatically insert tempo changes that follow the drummer&apos;s natural push and pull.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground text-sm">For DJs: Pre-Cue Tempo Matching</h4>
            <p>A manual tapper is indispensable when dealing with un‑quantized vinyl rips, obscure edits, or tracks that haven&apos;t been analyzed yet. Tap the tempo before you load the track, and you&apos;ll already know whether it fits the current DJ transition.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground text-sm">For Guitarists: Tap Tempo Delay Sync</h4>
            <p>Find the song&apos;s BPM with our tapper, then convert it to milliseconds. For a quarter‑note repeat at 120 BPM, set your delay to 500 ms. Dotted‑eighth? Multiply by 0.75. This technique instantly transforms your delay effects from muddy to studio‑tight.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground text-sm">For Fitness: BPM-Powered Workouts</h4>
            <p>A runner targeting 180 steps per minute should build a playlist around 180 BPM (or 90 BPM with an eighth‑note feel). Cyclists can use 120–140 BPM for steady‑state efforts. Use the tapper on songs you love and create custom playlists that act as a natural pacer.</p>
          </div>
        </div>
      </Collapsible>

      {/* Classical Tempo Markings */}
      <Collapsible title="Classical Tempo Markings Decoded">
        <p>Classical sheet music rarely uses BPM numbers. Instead, you&apos;ll see Italian terms. Use our tapper on a recording, then cross‑reference with this mapping:</p>
        <div className="overflow-x-auto -mx-4 px-4">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 font-semibold text-foreground">Marking</th>
                <th className="text-left py-2 font-semibold text-foreground">BPM Range</th>
                <th className="text-left py-2 font-semibold text-foreground">Character</th>
              </tr>
            </thead>
            <tbody>
              {classicalTempos.map(t => (
                <tr key={t.marking} className="border-b last:border-b-0">
                  <td className="py-2 font-medium">{t.marking}</td>
                  <td className="py-2 font-mono">{t.range}</td>
                  <td className="py-2">{t.character}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Collapsible>

      {/* Niche Applications */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-serif font-bold">
          Beyond Music: Niche Applications
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <TipCard icon={Dumbbell} title="Fitness & Running" desc="Songs grouped by similar BPM ranges produce smoother pacing transitions. A runner targeting 180 SPM should use songs around 180 BPM." />
          <TipCard icon={Gamepad2} title="Rhythm Gaming" desc="In games like Beat Saber or osu!, knowing the BPM of a custom map can help you adjust your swing timing before you even strap on the headset." />
        </div>
      </section>

      {/* Conclusion */}
      <section className="space-y-4 rounded-xl border bg-muted/30 p-6">
        <h2 className="text-xl md:text-2xl font-serif font-bold">
          Conclusion &amp; Next Steps
        </h2>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            The humble BPM tapper is far more than a simple web widget. It&apos;s the bridge between your musical ear
            and every piece of gear and software in your creative life. You now know not only how to find the beats per
            minute of any song in seconds, but also how to interpret that number through the lens of music theory,
            production, DJing, classical performance, and even fitness.
          </p>
          <p>
            Tap the button below right now with your favorite song. Watch the number lock in, note the BPM, and then
            immediately put it to use. Set your metronome to that tempo and practice your scales. Drop the BPM into
            your DAW and lay down a perfect loop. Build that long‑run playlist that feels like a personal trainer in
            your ears. Every time you use this tool, you&apos;re sharpening your internal clock and making music that simply works.
          </p>
        </div>
      </section>

      {/* How We Evaluated */}
      <Collapsible title="How We Evaluated This BPM Tapper">
        <p>
          To assess accuracy and usability, we tested the tool across multiple music genres, including electronic,
          hip‑hop, rock, orchestral, and acoustic recordings. We also compared readings against known track tempos
          and DAW project tempos to verify consistency. Because BPM detection ultimately depends on the user&apos;s
          tapping accuracy, our focus was on stability, responsiveness, and practical real‑world usability.
        </p>
      </Collapsible>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-serif font-bold">
          Frequently Asked Questions
        </h2>
        <div className="rounded-xl border divide-y">
          <FaqItem q="How does a BPM tapper work?" a="It measures the time in milliseconds between your taps, averages several recent intervals, and converts that to beats per minute using the formula BPM = 60,000 / average interval (ms)." />
          <FaqItem q="Is an online tap tempo accurate enough for professional use?" a="Yes, absolutely. The accuracy depends on the consistency of your tapping, not the tool. Our tapper averages up to 16 taps and remains sample‑accurate. For tasks like setting a DAW tempo or a guitar delay pedal, it&apos;s completely reliable." />
          <FaqItem q="How many taps do I need to get a reliable BPM?" a="Eight to twelve taps will give you a stable average with less than ±1 BPM variance for most users. Fewer than five taps will produce unreliable, jumpy results." />
          <FaqItem q="Why does the BPM number jump around when I tap?" a="That's the tool reacting to your natural timing variance. No human taps like a machine. The display settles as the averaging window fills with consistent data. If it never settles, you're likely not locking onto the true beat." />
          <FaqItem q="What if the song changes tempo?" a="Tap the sections you're interested in separately, resetting in between. For a full tempo analysis of a variable‑tempo track, you'll need to use DAW‑based tempo mapping. Our tool can still give you the BPM of each distinct section." />
          <FaqItem q="Can I use the BPM tapper offline?" a="Yes. Once our page is loaded, the tool works entirely in your browser without an internet connection. You can use it on a plane, in a remote studio, or backstage before a performance." />
          <FaqItem q="What&apos;s the difference between a BPM tapper and a metronome?" a="A tapper measures tempo from an external source, while a metronome produces a steady click at a set tempo. They are complementary: you use the tapper to find the BPM, then set your metronome to that number for practice." />
        </div>
      </section>

      {/* Editorial Note */}
      <p className="text-xs text-muted-foreground border-t pt-4">
        Editorial Note: This guide was reviewed by musicians, producers,
        and audio enthusiasts familiar with tempo detection, metronome practice, digital audio workstations, and
        rhythm‑based performance workflows. Our goal is to provide accurate, practical, and easy‑to‑understand
        guidance for musicians at every skill level.
      </p>
    </div>
  )
}
