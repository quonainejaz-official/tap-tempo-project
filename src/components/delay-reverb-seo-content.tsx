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

export function DelayReverbSeoContent() {
  return (
    <section className="mt-16 space-y-10">
      <section className="rounded-xl border bg-card p-6 space-y-2">
        <h2 className="text-lg font-bold">Key Takeaways</h2>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1.5">
          <li>With a Delay & Reverb Time Calculator, delay time and reverb pre-delay can be accurately calculated from BPM using tempo-synced note divisions.</li>
          <li>A quarter note delay is calculated with the formula: 60,000 ÷ BPM.</li>
          <li>Dotted note delays create rhythmic movement, while triplet delays add a swung feel.</li>
          <li>Short delays (30–80 ms) are ideal for slapback effects and vocal thickening.</li>
          <li>Reverb pre-delay helps separate the dry signal from the reverb tail, improving clarity and depth.</li>
          <li>For most vocals, a pre-delay between 20–60 ms provides a natural and intelligible sound.</li>
          <li>Tempo-synced delay and pre-delay settings help effects stay locked to the groove of the song.</li>
          <li>The calculator works with guitar pedals, plugins, DAWs, digital mixers, and hardware effects units.</li>
          <li>Dotted eighth delays are a popular choice for ambient, rock, and lead guitar sounds.</li>
          <li>Use BPM-based calculations as a starting point, then fine-tune by ear for the best musical result.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-serif font-bold">Delay & Reverb Time Calculator: Instant Tempo‑Synced Effects</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mt-3">
          This Delay & Reverb Time Calculator lets you enter your song&apos;s BPM, choose a note value, and get the exact millisecond value to enter into your delay pedal, reverb plugin, or DAW.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Delay calculator: Quarter note, dotted eighth, triplet, slapback, ping‑pong.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Pre‑delay calculator: Match reverb tail to the groove, keeps vocals and drums clear.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Use this with hardware pedals, outboard gear, or any plugin without a sync button. For the full <Link href="/bpm-to-ms" className="text-primary hover:underline font-bold">BPM‑to‑milliseconds formula</Link> and advanced production workflows (compressor release, LFO sync)
        </p>
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-serif font-bold">Delay Time Presets by Genre (Unique to This Page)</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
          Use these starting points. Adjust ±5 ms by ear.
        </p>
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left px-4 py-2 font-medium">Genre</th>
                <th className="text-left px-4 py-2 font-medium">Typical BPM</th>
                <th className="text-left px-4 py-2 font-medium">Recommended Delay</th>
                <th className="text-right px-4 py-2 font-medium">Millisecond Value</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">Rock ballad</td>
                <td className="px-4 py-2">70</td>
                <td className="px-4 py-2">Quarter note</td>
                <td className="text-right px-4 py-2 font-mono">857 ms</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Pop vocal slapback</td>
                <td className="px-4 py-2">120</td>
                <td className="px-4 py-2">1/32 note</td>
                <td className="text-right px-4 py-2 font-mono">31 ms</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">House / Techno</td>
                <td className="px-4 py-2">126</td>
                <td className="px-4 py-2">Dotted eighth</td>
                <td className="text-right px-4 py-2 font-mono">357 ms</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Hip‑hop (vocal)</td>
                <td className="px-4 py-2">85</td>
                <td className="px-4 py-2">Eighth triplet</td>
                <td className="text-right px-4 py-2 font-mono">235 ms</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Ambient / Cinematic</td>
                <td className="px-4 py-2">100</td>
                <td className="px-4 py-2">Half note dotted</td>
                <td className="text-right px-4 py-2 font-mono">1800 ms</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Metal (lead guitar)</td>
                <td className="px-4 py-2">180</td>
                <td className="px-4 py-2">Eighth note</td>
                <td className="text-right px-4 py-2 font-mono">167 ms</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mt-3">
          Why these work: Shorter delays (30‑80 ms) thicken without obvious repeat. Dotted eighth creates movement. Triplets add a swung feel.
        </p>
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-serif font-bold">Reverb Pre‑Delay Presets by Genre</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
          Pre‑delay separates the dry sound from the reverb tail. Too short = muddy. Too long = disconnected.
        </p>
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left px-4 py-2 font-medium">Genre</th>
                <th className="text-left px-4 py-2 font-medium">BPM Range</th>
                <th className="text-left px-4 py-2 font-medium">Recommended Pre‑delay</th>
                <th className="text-left px-4 py-2 font-medium">Why</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">Pop vocal</td>
                <td className="px-4 py-2">100‑130</td>
                <td className="px-4 py-2">1/32 note (25‑40 ms)</td>
                <td className="px-4 py-2">Keeps intelligibility</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Rock snare</td>
                <td className="px-4 py-2">90‑120</td>
                <td className="px-4 py-2">1/16 note (62‑83 ms)</td>
                <td className="px-4 py-2">Adds depth without smear</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">House kick</td>
                <td className="px-4 py-2">120‑130</td>
                <td className="px-4 py-2">1/64 note (11‑15 ms)</td>
                <td className="px-4 py-2">Tight room feel</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Orchestral</td>
                <td className="px-4 py-2">70‑90</td>
                <td className="px-4 py-2">1/8 note (166‑214 ms)</td>
                <td className="px-4 py-2">Large hall, slow attack</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Lo‑fi piano</td>
                <td className="px-4 py-2">70‑90</td>
                <td className="px-4 py-2">1/4 note (333‑428 ms)</td>
                <td className="px-4 py-2">Dreamy, detached</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-serif font-bold">How to Set Up Common Delay Rhythms</h2>

        <h3 className="text-lg font-serif font-bold mt-6 mb-2">1. Slapback Delay (Rockabilly, Country, Rock Vocals)</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong>Sound:</strong> One short, thick repeat (40‑120 ms).
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong>How to calculate:</strong> Use a 1/32 or 1/16 note at your tempo.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong>Example at 120 BPM:</strong> 1/32 = 31 ms, 1/16 = 62 ms. Start at 62 ms.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong>Settings:</strong> Feedback at 10‑20%, mix 30‑50%.
        </p>

        <h3 className="text-lg font-serif font-bold mt-6 mb-2">2. Dotted Eighth Delay (Edge‑style, Ambient)</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong>Sound:</strong> Repeats gallop between the beats.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong>How to get it:</strong> <Link href="/tap-tempo" className="text-primary hover:underline font-bold">Enter BPM</Link>, select &ldquo;dotted eighth&rdquo;.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong>Example at 120 BPM:</strong> 375 ms.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong>Settings:</strong> Feedback 40‑50%, mix 30%, dry signal prominent.
        </p>

        <h3 className="text-lg font-serif font-bold mt-6 mb-2">3. Ping‑Pong Delay (Stereo Widen)</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong>Sound:</strong> Delay bounces left‑right.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Two ways:
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          a) Use a quarter note on left and dotted quarter on right (calculate both from BPM).
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          b) Use a single dotted eighth with ping‑pong mode on your pedal/plugin.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong>Example:</strong> At 110 BPM, left = 545 ms (quarter), right = 818 ms (dotted quarter).
        </p>

        <h3 className="text-lg font-serif font-bold mt-6 mb-2">4. Triplet Delay (Shuffle Feel)</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong>Sound:</strong> Three repeats per beat, swung.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong>How to get it:</strong> Select &ldquo;eighth triplet&rdquo;.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong>Example at 90 BPM:</strong> 20,000 ÷ 90 = 222 ms.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong>Best for:</strong> R&amp;B, lo‑fi hip‑hop, soul leads.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Use a <Link href="/metronome" className="text-primary hover:underline font-bold">metronome</Link> to hear how triplet repeats interact with the beat.
        </p>
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-serif font-bold">Reverb Pre‑Delay Calculator Settings: When to Go Short vs Long</h2>
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left px-4 py-2 font-medium">Pre‑delay length</th>
                <th className="text-left px-4 py-2 font-medium">Effect</th>
                <th className="text-left px-4 py-2 font-medium">Best for</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">&lt; 20 ms</td>
                <td className="px-4 py-2">Reverb blends with dry signal, adds density</td>
                <td className="px-4 py-2">Drums, thick pads</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">20‑60 ms</td>
                <td className="px-4 py-2">Clear separation, vocal still forward</td>
                <td className="px-4 py-2">Pop vocals, snare</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">60‑120 ms</td>
                <td className="px-4 py-2">Obvious space, instrument sits back</td>
                <td className="px-4 py-2">Guitars, ambient</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">&gt; 120 ms</td>
                <td className="px-4 py-2">Slap‑echo like, almost a delay</td>
                <td className="px-4 py-2">Special effects, cinematic</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mt-3">
          Rule of thumb: Use the calculator to get a 1/32 or 1/16 pre‑delay. Then add 5‑10 ms if you want a larger room.
        </p>
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-serif font-bold">Common Problems &amp; Solutions (Troubleshooting)</h2>

        <h3 className="text-lg font-serif font-bold mt-6 mb-2">My delay doesn&apos;t lock to the beat even with the right ms</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong>Check your plugin&apos;s sync mode:</strong> Turn off &ldquo;tempo sync&rdquo; if you entered manual ms. Some plugins ignore manual entry when sync is on.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong>Check sample rate:</strong> At 44.1 kHz, 1 ms ≈ 44 samples. Very short delays (under 20 ms) may be rounded. Use samples instead.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong>Check latency (PDC):</strong> Heavy plugins can shift timing. Bypass other effects and test.
        </p>

        <h3 className="text-lg font-serif font-bold mt-6 mb-2">My reverb sounds muddy even with pre‑delay</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Increase pre‑delay to 1/8 or 1/4 note. Sometimes a shorter pre‑delay works against a dense mix.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Also reduce decay time, long tails fight the next <Link href="/beats-per-bar-calculator" className="text-primary hover:underline font-bold">beat</Link>.
        </p>

        <h3 className="text-lg font-serif font-bold mt-6 mb-2">My dotted eighth sounds like a straight eighth</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Verify your pedal/plugin actually supports dotted values. Some cheap delays only do straight subdivisions. Use the calculator to get the number, enter it manually as milliseconds.
        </p>
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-serif font-bold">Hardware Pedal Quick Reference</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
          For guitarists using Boss DD‑series, Strymon, TC Electronic, etc.
        </p>
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left px-4 py-2 font-medium">Pedal Brand</th>
                <th className="text-left px-4 py-2 font-medium">Manual ms entry?</th>
                <th className="text-left px-4 py-2 font-medium">Tap tempo input?</th>
                <th className="text-left px-4 py-2 font-medium">Dotted eighth preset?</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">Boss DD‑7/8</td>
                <td className="px-4 py-2">Yes (knob)</td>
                <td className="px-4 py-2">External footswitch</td>
                <td className="px-4 py-2">No, use ms calc</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Strymon Timeline</td>
                <td className="px-4 py-2">Yes (display)</td>
                <td className="px-4 py-2">Built‑in</td>
                <td className="px-4 py-2">Yes (preset)</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">TC Flashback</td>
                <td className="px-4 py-2">Yes (Toneprint)</td>
                <td className="px-4 py-2">Built‑in</td>
                <td className="px-4 py-2">Yes (Toneprint)</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">MXR Carbon Copy</td>
                <td className="px-4 py-2">No (knob only)</td>
                <td className="px-4 py-2">No</td>
                <td className="px-4 py-2">Estimate by ear</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mt-3">
          If your pedal has no ms display: Use our calculator, then match the sound to a reference recording. A 375 ms dotted eighth feels like &ldquo;the repeat lands just after the next beat.&rdquo;
        </p>
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-serif font-bold">Frequently Asked Questions</h2>
        <div className="mt-2">
          <FaqItem
            q="What&apos;s the difference between delay calculator and reverb pre‑delay calculator?"
            a="Delay calculator gives the time between echoes (e.g., 375 ms). Reverb pre‑delay calculator gives the time before reverb starts (e.g., 25 ms). Both use the same BPM‑to‑ms math but serve different effects."
          />
          <FaqItem
            q="Why would I need a pre‑delay calculator? Can&apos;t I just set it by ear?"
            a="You can, but a tempo‑synced pre‑delay keeps the reverb from masking the next beat. In a dense mix, 20 ms off can make vocals lose punch."
          />
          <FaqItem
            q="My delay pedal only has a &ldquo;time&rdquo; knob (no numbers). How do I use this?"
            a="Set the knob to minimum (usually 0 ms). Play a note and turn the knob slowly while listening. Use our calculator to know the target ms, then approximate. Or use tap tempo if your pedal has it."
          />
          <FaqItem
            q="What&apos;s a good starting delay for guitar solos?"
            a="Dotted eighth at 120‑140 BPM, feedback 40%, mix 25%. That&apos;s 375‑321 ms. Add some reverb after the delay."
          />
          <FaqItem
            q="Can I use these calculators for live sound?"
            a="Absolutely. Sound engineers use them to set vocal delays and hall reverbs per song. Enter the song&apos;s BPM, get ms, type into the digital console."
          />
        </div>
      </section>
    </section>
  )
}
