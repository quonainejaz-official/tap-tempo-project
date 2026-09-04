"use client"

import Link from "next/link"
import { Disc3, BookOpen, Headphones } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const keyTakeaways = [
  "+1 Semitone shift increases tempo by approximately +5.95%.",
  "-1 Semitone shift decreases tempo by approximately -5.61%.",
  "+6% DJ pitch fader adjustment equals approximately +1.009 semitones.",
  "DJ Pitch Faders follow a linear scale (%), while Producer Resampling/Semitones follow a logarithmic scale (2^(n/12)).",
  "Enabling Key Lock / Master Tempo preserves musical key when tempo changes, but applies DSP time-stretching processing.",
]

function StepCard({ num, title, desc }: { num: number; title: string; desc: React.ReactNode }) {
  return (
    <div className="flex gap-3 p-4 rounded-xl border bg-card/50">
      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
        {num}
      </div>
      <div>
        <h3 className="font-semibold text-sm mb-1">{title}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}

function UseCaseCard({ icon: Icon, title, desc }: { icon: React.ElementType; title: string; desc: React.ReactNode }) {
  return (
    <div className="p-4 rounded-xl border bg-card/50 space-y-2">
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <h3 className="font-semibold text-sm">{title}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  )
}

export function PitchTempoSeoContent() {
  return (
    <section className="max-w-3xl mx-auto mt-16 space-y-10 pb-16 px-4">
      {/* Key Takeaways */}
      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">Key Takeaways</h3>
        <ul className="list-disc pl-5 space-y-2.5 text-sm text-slate-600 dark:text-slate-300">
          {keyTakeaways.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>

      {/* Introduction */}
      <section className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          When pitch and playback speed are linked, adjusting a track&rsquo;s pitch fader or transposing a sample by semitones changes the tempo at the same time. The Pitch Tempo Calculator calculates the mathematically expected resulting BPM, so you know how fast a track will play before committing to a mix or resample.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The tool runs two independent calculation engines. DJ Pitch Fader Mode applies a linear percentage change, the same type of adjustment used on a Pioneer CDJ-2000NXS2, Pioneer CDJ-3000, Technics SL-1200, or inside Rekordbox, Serato DJ Pro, and Traktor. Producer Semitone Mode models musical pitch transposition in semitones when the sample is resampled, and pitch remains linked to playback speed. Both modes answer the same underlying question, expressed in two different units DJs and producers use in daily workflows.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          This page covers the mathematics and mechanics of pitch-driven tempo change specifically. It functions as a tempo pitch calculator, pitch to tempo calculator, and BPM and pitch shift calculator, while keeping linked pitch/speed playback separate from tempo-preserving time stretching. If you need to identify an unpitched track&rsquo;s starting speed, use our <Link href="/bpm-calculator" className="text-primary hover:underline font-bold">BPM Calculator</Link> or find the rhythm manually with our <Link href="/tap-tempo" className="text-primary hover:underline font-bold">Tap Tempo tool</Link>.
        </p>
      </section>

      {/* How to Use */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-serif font-bold">How to Use the Pitch Tempo Calculator</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The calculator offers two tabs. Choose the mode that matches how playback speed is being changed, because DJ hardware and producer sampling tools express linked pitch-speed changes in different units.
        </p>

        <h3 className="text-lg font-serif font-semibold">DJ Pitch Fader Mode</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          This mode mirrors the pitch controls found on club decks and DJ software.
        </p>
        <div className="space-y-3">
          <StepCard num={1} title="Enter the base BPM" desc={<>Type the track&rsquo;s known tempo. If you don&rsquo;t know your track&rsquo;s speed yet, use our <Link href="/bpm-calculator" className="text-primary hover:underline font-bold">BPM Calculator</Link> first.</>} />
          <StepCard num={2} title="Select the fader range" desc="Choose the pitch-fader range available on your hardware or software, such as ±6%, ±8%, ±10%, ±16%, or WIDE." />
          <StepCard num={3} title="Set the pitch adjustment" desc="Enter the actual percentage being applied, such as +3% or -5.5%. A positive value speeds the track up; a negative value slows it down." />
          <StepCard num={4} title="Read the resulting BPM" desc="The calculator applies that percentage directly to the base BPM and returns the resulting tempo immediately." />
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The fader changes the playback-rate target. When Key Lock, Master Tempo, or an equivalent feature is enabled, the software applies time-stretching or related DSP to the resulting playback stream so the perceived musical key is approximately maintained. &ldquo;Approximately&rdquo; matters because Key Lock is not perfectly transparent at every tempo or pitch setting. Serato, for example, describes Keylock as maintaining a song&rsquo;s key when its tempo changes.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Pitch-fader ranges vary by hardware and may also depend on the specific player, firmware, and software configuration. Classic Technics SL-1200 models such as the SL-1200MK2 use a continuously variable, quartz-locked pitch control of approximately ±8%. Later models, including some current SL-1200 variants, may offer ±8% and ±16% ranges with different control implementations, so &ldquo;SL-1200&rdquo; does not describe one fixed range across the entire product family.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Serato DJ Pro&rsquo;s documented selectable tempo ranges include ±8%, ±16%, and ±50%. On the referenced Pioneer CDJ-2000NXS2 and CDJ-3000 models, WIDE provides a ±100% range. At -100%, playback speed reaches zero, and playback stops; it is not a normal negative-speed setting, but the boundary where the track halts.
        </p>

        <h3 className="text-lg font-serif font-semibold">Producer Semitone Mode</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          This mode models resampling workflows in which pitch and playback speed move together.
        </p>
        <div className="space-y-3">
          <StepCard num={1} title="Enter the native BPM" desc={<>Type the BPM of the sample or loop. For resampling loops you intend to sync for delay or reverb, note this starting tempo carefully.</>} />
          <StepCard num={2} title="Select the transposition" desc="Choose a value from -12 semitones through +12 semitones. A full ±12 st range covers exactly one octave." />
          <StepCard num={3} title="Use +1 st or -1 st for single steps" desc="+1 st raises the pitch one equal-tempered semitone; -1 st lowers it. +12 st doubles playback frequency and BPM, while -12 st halves them." />
          <StepCard num={4} title="Read the full result set" desc="The calculator returns the resulting BPM, the multiplicative speed factor, and the percentage speed change." />
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          This mode represents linked pitch-and-speed playback: the behavior of classic sampler resampling or a turntable-style speed change. If the goal is to change pitch without changing tempo, this calculator&rsquo;s linked formula is not the correct model. That scenario requires a dedicated time-stretch or pitch-shift algorithm.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          For valid calculator input, base BPM must be greater than zero. Percentage input must not be lower than -100%, because -100% represents zero playback speed. Semitone input should remain within the tool&rsquo;s supported range of -12 to +12 st. If you are resampling loops for delay or reverb synchronization in your DAW, calculate the new time values with our <Link href="/bpm-to-ms" className="text-primary hover:underline font-bold">BPM to MS converter</Link>.
        </p>

        <h3 className="text-lg font-serif font-semibold">Common Use Cases</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <UseCaseCard icon={Disc3} title="Harmonic Beatmatching" desc="Preview exactly how fast a pitched track will play before a transition, so a +4% fader move stays in time and on a usable grid." />
          <UseCaseCard icon={BookOpen} title="Sample &amp; Loop Resampling" desc="Plan the new tempo when transposing a sample by semitones, then sync the result to your project or effect timings." />
          <UseCaseCard icon={Headphones} title="Mixing-Key Planning" desc="Estimate the tempo impact of a linked key change so you know whether the resulting speed still works for your mix or set." />
        </div>
      </section>

      {/* Mathematics */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-serif font-bold">The Mathematics Behind Pitch and Tempo</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          DJ pitch faders and semitone transposition use different mathematical systems. The distinction matters when predicting the resulting BPM.
        </p>

        <h3 className="text-lg font-serif font-semibold">DJ Linear Percentage Formula</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Let p represent the signed pitch adjustment in percent. A DJ pitch fader applies:
        </p>
        <div className="p-4 rounded-xl border bg-muted/30 text-center font-mono text-lg font-bold text-foreground">
          New BPM = Base BPM × (1 + (p ÷ 100))
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          At +6% on a 120 BPM track:
        </p>
        <div className="p-4 rounded-xl border bg-muted/30 text-center font-mono text-lg font-bold text-foreground">
          120 × (1 + 0.06) = 127.2 BPM
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          At -6%:
        </p>
        <div className="p-4 rounded-xl border bg-muted/30 text-center font-mono text-lg font-bold text-foreground">
          120 × (1 - 0.06) = 112.8 BPM
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          This is the standard turntable pitch percentage formula used by a pitch percentage to BPM converter.
        </p>

        <h3 className="text-lg font-serif font-semibold">Producer Logarithmic Semitone Formula</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Semitone transposition does not scale linearly. It follows twelve-tone equal temperament, where one octave represents a 2:1 frequency ratio divided into 12 equal logarithmic steps.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The ratio for one semitone is:
        </p>
        <div className="p-4 rounded-xl border bg-muted/30 text-center font-mono text-lg font-bold text-foreground">
          r = 2^(1/12) = 1.05946309436
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          For any number of semitones n:
        </p>
        <div className="p-4 rounded-xl border bg-muted/30 text-center font-mono text-lg font-bold text-foreground">
          New BPM = Base BPM × 2^(n ÷ 12)
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The equivalent percentage speed change is:
        </p>
        <div className="p-4 rounded-xl border bg-muted/30 text-center font-mono text-lg font-bold text-foreground">
          Speed Change % = (2^(n ÷ 12) - 1) × 100
        </div>

        <h3 className="text-lg font-serif font-semibold">Cents and Semitone Ratios</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          One equal-tempered semitone equals 100 cents. The frequency ratio for c cents is:
        </p>
        <div className="p-4 rounded-xl border bg-muted/30 text-center font-mono text-lg font-bold text-foreground">
          2^(c ÷ 1200)
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Therefore, one cent equals:
        </p>
        <div className="p-4 rounded-xl border bg-muted/30 text-center font-mono text-lg font-bold text-foreground">
          2^(1 ÷ 1200)
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          A shift of n semitones equals 100n cents and has the same ratio:
        </p>
        <div className="p-4 rounded-xl border bg-muted/30 text-center font-mono text-lg font-bold text-foreground">
          2^(n ÷ 12)
        </div>

        <h3 className="text-lg font-serif font-semibold">Proving the 5.95% Rule</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          DJs often round +1 semitone to &ldquo;about 6%,&rdquo; but the exact increase is slightly lower.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Starting with the semitone ratio:
        </p>
        <div className="p-4 rounded-xl border bg-muted/30 text-center font-mono text-lg font-bold text-foreground">
          2^(1/12) = 1.05946309436
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Subtracting 1 isolates the proportional increase:
        </p>
        <div className="p-4 rounded-xl border bg-muted/30 text-center font-mono text-lg font-bold text-foreground">
          1.05946309436 - 1 = 0.05946309436
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Converting to a percentage:
        </p>
        <div className="p-4 rounded-xl border bg-muted/30 text-center font-mono text-lg font-bold text-foreground">
          0.05946309436 × 100 = 5.946309436%
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Therefore:
        </p>
        <div className="p-4 rounded-xl border bg-muted/30 text-center font-mono text-lg font-bold text-foreground">
          +1 st = +5.9463% ≈ +5.95%
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          A downward semitone uses the reciprocal ratio:
        </p>
        <div className="p-4 rounded-xl border bg-muted/30 text-center font-mono text-lg font-bold text-foreground">
          2^(-1/12) = 1 ÷ 1.05946309436 = 0.94387431268
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The proportional decrease is:
        </p>
        <div className="p-4 rounded-xl border bg-muted/30 text-center font-mono text-lg font-bold text-foreground">
          1 - 0.94387431268 = 0.05612568732
        </div>
        <div className="p-4 rounded-xl border bg-muted/30 text-center font-mono text-lg font-bold text-foreground">
          0.05612568732 × 100 = 5.612568732%
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Therefore:
        </p>
        <div className="p-4 rounded-xl border bg-muted/30 text-center font-mono text-lg font-bold text-foreground">
          -1 st = -5.6126% ≈ -5.61%
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          On a 120 BPM track:
        </p>
        <div className="p-4 rounded-xl border bg-muted/30 text-center font-mono text-lg font-bold text-foreground">
          120 × 2^(-1/12) = 113.264934
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Rounded to two decimal places:
        </p>
        <div className="p-4 rounded-xl border bg-muted/30 text-center font-mono text-lg font-bold text-foreground">
          113.26 BPM
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          On a 128 BPM track:
        </p>
        <div className="p-4 rounded-xl border bg-muted/30 text-center font-mono text-lg font-bold text-foreground">
          128 × 2^(-1/12) = 120.810152
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Rounded to two decimal places:
        </p>
        <div className="p-4 rounded-xl border bg-muted/30 text-center font-mono text-lg font-bold text-foreground">
          120.81 BPM
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The upward and downward percentages are not exact mirror images because semitone changes are multiplicative rather than additive. When transposing orchestral or classical samples across tempo boundaries, cross-reference your calculated target BPM against traditional <Link href="/tempo-markings" className="text-primary hover:underline font-bold">Italian tempo markings</Link>.
        </p>
      </section>

      {/* Conversion Matrix */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-serif font-bold">Pitch and Semitone Conversion Matrix</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The table rounds BPM results to two decimal places. The Pitch / Key Impact column describes chromatic pitch movement and Key Lock behavior. It does not convert semitone movement into a fixed number of Camelot Wheel steps.
        </p>
        <div className="overflow-x-auto my-6 border rounded-xl">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="p-3 text-left font-semibold whitespace-nowrap min-w-[120px]">Pitch / Semitone Shift</th>
                <th className="p-3 text-left font-semibold whitespace-nowrap min-w-[120px]">Speed Change</th>
                <th className="p-3 text-left font-semibold whitespace-nowrap min-w-[120px]">Base 120 BPM</th>
                <th className="p-3 text-left font-semibold whitespace-nowrap min-w-[120px]">Base 128 BPM</th>
                <th className="p-3 text-left font-semibold whitespace-nowrap min-w-[180px]">Pitch / Key Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y text-muted-foreground">
              {[
                { shift: "-12 st", speed: "-50.00%", bpm120: "60.00", bpm128: "64.00", impact: "Key lowers by 12 chromatic semitones; octave down" },
                { shift: "-2 st", speed: "-10.91%", bpm120: "106.91", bpm128: "114.04", impact: "Key lowers by 2 chromatic semitones" },
                { shift: "-1 st", speed: "-5.61%", bpm120: "113.26", bpm128: "120.81", impact: "Key lowers by 1 chromatic semitone" },
                { shift: "-6% DJ fader", speed: "-6.00%", bpm120: "112.80", bpm128: "120.32", impact: "Key Lock off: pitch falls with speed; Key Lock on: key is approximately preserved" },
                { shift: "-3% DJ fader", speed: "-3.00%", bpm120: "116.40", bpm128: "124.16", impact: "Micro-pitch shift; not a fixed musical interval" },
                { shift: "0", speed: "0.00%", bpm120: "120.00", bpm128: "128.00", impact: "No shift" },
                { shift: "+3% DJ fader", speed: "+3.00%", bpm120: "123.60", bpm128: "131.84", impact: "Micro-pitch shift; not a fixed musical interval" },
                { shift: "+1 st", speed: "+5.95%", bpm120: "127.14", bpm128: "135.61", impact: "Key rises by 1 chromatic semitone" },
                { shift: "+6% DJ fader", speed: "+6.00%", bpm120: "127.20", bpm128: "135.68", impact: "Key Lock off: pitch rises by approximately +1.009 st; Key Lock on: key is approximately preserved" },
                { shift: "+2 st", speed: "+12.25%", bpm120: "134.70", bpm128: "143.68", impact: "Key rises by 2 chromatic semitones" },
                { shift: "+12 st", speed: "+100.00%", bpm120: "240.00", bpm128: "256.00", impact: "Octave up; same pitch class" },
              ].map((row) => (
                <tr key={row.shift}>
                  <td className="p-3 font-medium text-foreground whitespace-nowrap">{row.shift}</td>
                  <td className="p-3 font-mono whitespace-nowrap">{row.speed}</td>
                  <td className="p-3 font-mono whitespace-nowrap">{row.bpm120} BPM</td>
                  <td className="p-3 font-mono whitespace-nowrap">{row.bpm128} BPM</td>
                  <td className="p-3 whitespace-nowrap min-w-[180px]">{row.impact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          A +6% DJ pitch adjustment and a +1 semitone shift are close but not identical:
        </p>
        <div className="p-4 rounded-xl border bg-muted/30 text-center font-mono text-lg font-bold text-foreground">
          12 × log2(1.06) ≈ 1.009 st
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          A +6% fader move takes 120 BPM to 127.20 BPM, while a full +1 semitone takes it to 127.14 BPM. The difference increases as the adjustment becomes larger.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          A percentage-based fader move is a speed change first. Without Key Lock, the resulting pitch shift is determined by the playback ratio and may not correspond to a clean musical interval.
        </p>

        <h3 className="text-lg font-serif font-semibold">Camelot Wheel Notation</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          A linked semitone shift changes the track&rsquo;s musical key chromatically, but it does not translate into a fixed number of Camelot Wheel steps. The Camelot Wheel has 24 notation positions&mdash;12 major and 12 minor&mdash;arranged for harmonic-mixing convenience rather than as a linear semitone ruler.
        </p>
        <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
          <li>C major shifted up one semitone becomes C♯/D♭ major.</li>
          <li>A minor shifted up one semitone becomes A♯/B♭ minor.</li>
        </ul>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The correct Camelot code must be identified from the resulting key, not calculated by multiplying semitones by a fixed step count. Whether the new key remains harmonically compatible with another track depends on the relationship between the two resulting keys, not simply on the number of semitones moved.
        </p>
      </section>

      {/* Pitch Shifting */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-serif font-bold">Pitch Shifting in DJing and Music Production</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Pitch and tempo behave differently on physical decks, digital DJ players, samplers, and DAWs. Understanding the difference prevents unexpected results when moving between formats and workflows.
        </p>

        <h3 className="text-lg font-serif font-semibold">Hardware Pitch Control</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Classic Technics SL-1200 models such as the SL-1200MK2 use a continuously variable, quartz-locked pitch control of approximately ±8%, with a commonly published MK2 wow-and-flutter specification of approximately 0.01% WRMS. Exact performance depends on the model, measurement standard, unit condition, and service state.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Later SL-1200 models can offer different ranges and control implementations. For example, current variants may provide ±8% and ±16% ranges. Therefore, the exact model should be identified before using a hardware-specific specification.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Moving the pitch control on a turntable changes platter rotation speed directly. Without a separate pitch-preserving process, the record&rsquo;s fundamental frequency, harmonics, formants, and tempo all shift together. Quartz lock stabilizes nominal rotational speed; it does not make a pitch adjustment key-neutral.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Pioneer CDJ-2000NXS2 and CDJ-3000 players control playback digitally. Their range selector changes the fader&rsquo;s usable span and its specified adjustment unit. Pioneer documentation lists:
        </p>
        <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
          <li>±6%: nominal 0.02% adjustment unit.</li>
          <li>±10%: nominal 0.05% adjustment unit.</li>
          <li>±16%: nominal 0.05% adjustment unit.</li>
          <li>WIDE: nominal 0.5% adjustment unit.</li>
        </ul>
        <p className="text-sm text-muted-foreground leading-relaxed">
          These are documented control increments, not a complete description of internal DSP resolution or the exact physical feel of the fader. In practice, narrower ranges are intended for finer beatmatching, while WIDE trades percentage precision for very large speed changes.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Analog pitch drift can result from platter-speed variation, servo error, motor or belt wear on applicable turntables, stylus drag, record eccentricity, and mechanical condition. Digital players generally provide more repeatable numerical control, although beat-grid analysis errors, quantization, and synchronization settings can affect displayed or synchronized BPM.
        </p>

        <h3 className="text-lg font-serif font-semibold">Resampling vs. Time Stretching</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Resampling changes the playback rate of a sample outright. It is the digital equivalent of speeding up or slowing down tape or a turntable. Because ordinary resampling does not attempt to preserve duration independently of pitch, it avoids many granular and phase-vocoder artifacts associated with time stretching. Its trade-off is that tempo, fundamental frequency F₀, harmonics, and usually formants all move together.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Time stretching changes duration while attempting to hold pitch steady. Pitch shifting changes the fundamental frequency while attempting to hold duration steady. Both processes deliberately unlink pitch and tempo.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Implementations may use:
        </p>
        <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
          <li>Granular synthesis.</li>
          <li>Phase-vocoder processing.</li>
          <li>Transient-aware processing.</li>
          <li>Proprietary hybrid algorithms.</li>
          <li>Licensed technologies such as zplane&rsquo;s elastique.</li>
        </ul>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The specific algorithm depends on the application and version. Elastique is one licensed option among several, not a universal standard used by every Key Lock or Warp feature.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Ableton Live&rsquo;s Beats mode targets rhythm-dominant material, while Complex and Complex Pro target mixed material such as complete songs. Complex Pro includes a Formants control; at 100%, the original formants are preserved while pitch is transposed. Ableton documents Complex-family processing as different from Beats, Tones, Texture, and Re-Pitch modes, with higher CPU usage and possible non-neutral behavior even when a clip plays at its original tempo.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          FL Studio provides separate time-stretching and pitch controls in its sample and audio workflows, although exact behavior depends on the selected channel, mode, and processing settings. Akai MPC models provide varying combinations of sample tuning, warp, and resampling functions; available controls depend on the model and operating mode.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          On Roland SP-404 units, whether pitch and speed remain linked depends on the model and selected sample-processing mode. Straightforward resampling-style playback links them, while supported pitch or time-stretch functions can separate them where available.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          A formant is a resonance region shaped by a sound source and, for vocals, the vocal tract. F₀ is the fundamental frequency associated with perceived pitch. Preserving F₀ does not automatically preserve formants, and preserving formants does not eliminate all phase or transient artifacts.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Unlinking pitch from tempo can introduce transient smearing, phasiness, chorus-like modulation, metallic artifacts, or stereo-image instability. Severity depends on source material, stretch ratio, algorithm, windowing, transient detection, and processing quality.
        </p>
      </section>

      {/* FAQ */}
      <section className="space-y-3">
        <h2 className="text-xl md:text-2xl font-serif font-bold">Frequently Asked Questions</h2>
        <Accordion type="multiple" className="rounded-xl border divide-y">
          <AccordionItem value="faq-1">
            <AccordionTrigger>How much does 1 semitone change BPM in pitch/tempo-linked mode?</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>A +1 semitone shift raises BPM by +5.95%. A -1 semitone shift lowers BPM by -5.61%.</p>
                <p>From a 120 BPM base:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>+1 st: 127.14 BPM.</li>
                  <li>-1 st: 113.26 BPM.</li>
                </ul>
                <p>The asymmetry occurs because the upward ratio is 2^(1/12), while the downward ratio is its reciprocal, 2^(-1/12).</p>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-2">
            <AccordionTrigger>How do you pitch shift audio without changing the tempo?</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>Enable Key Lock or Master Tempo in DJ software, or use Warp and time-stretch modes in a DAW. These processes unlink pitch from playback speed through DSP.</p>
                <p>Implementations vary and may use granular synthesis, phase vocoders, transient-aware processing, proprietary algorithms, or licensed technologies such as zplane elastique. The chosen algorithm and amount of processing determine the balance between pitch preservation and audible artifacts.</p>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-3">
            <AccordionTrigger>What are standard DJ pitch-fader ranges and their resolutions?</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>Common ranges include ±6%, ±8%, ±10%, ±16%, and WIDE.</p>
                <p>On the referenced Pioneer CDJ models:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>±6% uses a nominal 0.02% adjustment unit.</li>
                  <li>±10% and ±16% use 0.05%.</li>
                  <li>WIDE uses 0.5% and can reach ±100%.</li>
                </ul>
                <p>Narrower ranges allocate the fader&rsquo;s travel across a smaller percentage span, making them more suitable for precise beatmatching. Exact ranges and increments vary by device.</p>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-4">
            <AccordionTrigger>How does a semitone shift relate to the Camelot Wheel?</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>A semitone shift does not map to a fixed number of Camelot Wheel steps. It changes the musical key chromatically.</p>
                <p>For example, C major raised by one semitone becomes C♯/D♭ major. To obtain the Camelot notation, identify the resulting musical key and then convert or look up its Camelot code.</p>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-5">
            <AccordionTrigger>What is the difference between DJ percentage pitch shift and producer semitone shift?</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>DJ faders use linear percentage math:</p>
                <div className="p-4 rounded-xl border bg-muted/30 text-center font-mono text-lg font-bold text-foreground">+6% on 120 BPM = 127.20 BPM</div>
                <p>Linked semitone shifts use logarithmic equal-temperament math:</p>
                <div className="p-4 rounded-xl border bg-muted/30 text-center font-mono text-lg font-bold text-foreground">+1 st on 120 BPM = 120 × 2^(1/12) = 127.14 BPM</div>
                <p>The results are close but not identical.</p>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-6">
            <AccordionTrigger>Does a +6% pitch shift equal one semitone?</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>Almost, but not exactly. A +6% playback-rate change has a ratio of 1.06, while one equal-tempered semitone has a ratio of 2^(1/12) = 1.059463.</p>
                <p>The equivalent interval is:</p>
                <div className="p-4 rounded-xl border bg-muted/30 text-center font-mono text-lg font-bold text-foreground">12 × log2(1.06) ≈ 1.009 st</div>
                <p>Therefore, +6% is approximately +1.009 semitones.</p>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-7">
            <AccordionTrigger>Why does pitching up a track change its vocal formants?</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>Resampling speeds up the entire spectrum equally, shifting F₀, harmonics, and vocal formants upward. This produces the familiar &ldquo;chipmunk&rdquo; effect.</p>
                <p>Formant-preserving DSP is required to reduce that effect while changing pitch or tempo. Time-stretch and pitch-shift algorithms can preserve formants more effectively, but may introduce phase, transient, or other processing artifacts.</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </section>
  )
}
