export const content = `<h2 id="master-tempo-vs-key-lock-harmonic-mixing-guide">Master Tempo vs Key Lock: Harmonic Mixing Guide for Serato &amp; Rekordbox</h2>

<p>Every DJ who has nudged a pitch fader has run into the same fork in the road: leave Key Lock on and keep the track&apos;s key stable, or leave it off and let pitch move naturally with tempo. The two choices sound simple, but they trigger very different digital signal processing behind the scenes, and that processing has real consequences for harmonic mixing and sound quality.</p>

<p>This guide explains what Master Tempo and Key Lock actually do, why they sometimes make a track sound phasey or robotic, how pitch changes interact with the Camelot Wheel, and when disabling Key Lock is the smarter call.</p>

<div class="overflow-x-auto rounded-xl border my-4">
<table class="w-full text-sm">
<thead>
<tr class="bg-muted/50">
<th class="px-3 py-2 text-left font-semibold">Setting</th>
<th class="px-3 py-2 text-left font-semibold">Tempo change</th>
<th class="px-3 py-2 text-left font-semibold">Pitch / key</th>
<th class="px-3 py-2 text-left font-semibold">Main processing trade-off</th>
<th class="px-3 py-2 text-left font-semibold">Typical use</th>
</tr>
</thead>
<tbody>
<tr class="border-t">
<td class="px-3 py-2">Key Lock off</td>
<td class="px-3 py-2">Yes</td>
<td class="px-3 py-2">Changes naturally with playback speed</td>
<td class="px-3 py-2">Avoids dedicated pitch-preserving time-stretching</td>
<td class="px-3 py-2">Small corrections, scratching, creative pitch effects</td>
</tr>
<tr class="border-t">
<td class="px-3 py-2">Key Lock / Master Tempo on</td>
<td class="px-3 py-2">Yes</td>
<td class="px-3 py-2">Intended to remain stable</td>
<td class="px-3 py-2">May introduce smearing, phasiness, or warbling</td>
<td class="px-3 py-2">Harmonic mixing and larger or sustained tempo changes</td>
</tr>
</tbody>
</table>
</div>

<h2 id="what-happens-to-musical-key-when-you-move-the-pitch-fader">What Happens to Musical Key When You Move the Pitch Fader?</h2>

<p>With Key Lock off, the software keeps the natural relationship between playback speed and pitch: changing the speed changes the frequency content by the same ratio. This avoids the dedicated pitch-preserving time-stretching process, although other playback or output processing may still be present. Push the tempo up and the track gets faster and higher-pitched; pull it down and the track gets slower and lower.</p>

<p>Moving the pitch fader without Key Lock engaged changes playback speed and frequency by the same ratio. The perceived musical shift is measured logarithmically in semitones rather than as a simple percentage:</p>

<p>semitone shift = 12 &times; log&#8322;(new playback rate &divide; original playback rate)</p>

<p>A widely used rule of thumb among digital DJs is that roughly a 6% tempo increase is close to one semitone of pitch rise. That&apos;s a useful mental shortcut for anticipating how far a track has drifted from its analyzed key, but it&apos;s an approximation, not an exact figure baked into any specific DJ platform. If you&apos;d rather skip the mental math entirely, our <a href="https://www.thetaptempo.com/pitch-tempo-calculator" class="text-primary hover:underline font-bold">Pitch Tempo Calculator</a> converts any pitch percentage into the resulting BPM and semitone shift instantly.</p>

<div class="callout-takeaway">
<p><strong>Quick answer:</strong> With Key Lock off, tempo and pitch move together, just like a record player. A track sped up 6% will sound roughly a semitone higher, which is enough to shift it away from its labeled Camelot key during a harmonic mix.</p>
</div>

<p>This is precisely the problem Key Lock and Master Tempo were built to solve. Solving it, however, introduces a different set of trade-offs, which is the core of this guide.</p>

<h2 id="confirming-the-target-tempo-before-you-shift">Confirming the Target Tempo Before You Shift</h2>

<p>Before dialing in a pitch adjustment, it helps to know exactly what BPM you&apos;re aiming for rather than eyeballing it against the other deck. Running both tracks through our <a href="https://www.thetaptempo.com/bpm-calculator" class="text-primary hover:underline font-bold">BPM Calculator</a> first turns the pitch fader move into a deliberate, calculated adjustment instead of a guess, which matters more the larger the shift becomes.</p>

<h2 id="master-tempo-and-key-lock-explained-how-dj-software-keeps-pitch-fixed">Master Tempo &amp; Key Lock Explained: How DJ Software Keeps Pitch Fixed</h2>

<p>Master Tempo and Key Lock are two names, used by different manufacturers, for the same underlying goal: changing playback tempo while attempting to preserve the track&apos;s original pitch and musical key. Serato calls this feature Key Lock; rekordbox and AlphaTheta hardware generally use the term Master Tempo. Functionally, both are trying to decouple speed from pitch, but the exact DSP engine behind each implementation isn&apos;t guaranteed to be identical across software versions or hardware models.</p>

<p>According to Serato&apos;s official mixing documentation, enabling Key Lock keeps a song&apos;s key from changing as tempo is adjusted. AlphaTheta&apos;s rekordbox documentation describes Master Tempo the same way functionally: changing playback speed without changing pitch. Neither source claims the pitch is preserved with zero side effects. AlphaTheta&apos;s own support documentation goes further, explaining that Master Tempo and Key Lock can change sound quality because key-control processing is used to keep the key constant, and it describes this as an expected part of the feature&apos;s specification rather than necessarily a malfunction.</p>

<p>That distinction is worth sitting with, because it&apos;s the detail most DJ tutorials skip past: preserving the musical key is not the same thing as preserving the original waveform. The software is not merely changing the playback rate; it is applying pitch-preserving time and frequency processing so timing can change without the intended tonal center moving by the same amount. That processing step is where the trade-offs of the next section come from.</p>

<h2 id="key-lock-vs-key-shift-vs-pitch-play">Key Lock vs Key Shift vs Pitch Play</h2>

<p>It&apos;s worth separating Key Lock from two features it&apos;s frequently confused with:</p>

<ul class="list-disc pl-6 space-y-1 my-4">
<li><strong>Key Shift</strong> intentionally transposes a track&apos;s key, rather than preserving it. Serato&apos;s documentation notes that Key Shift and Key Sync require Pitch &apos;n Time DJ and are built for deliberate transposition, not tempo-change protection.</li>
<li><strong>Pitch Play</strong> is a performance feature that triggers cue points or other assigned material at different pitch relationships. Its exact behavior and available controls depend on the DJ software and hardware.</li>
</ul>

<p>Key Lock preserves. Key Shift changes on purpose. Confusing the two is one of the most common misunderstandings in DJ forums and tutorials.</p>

<h2 id="the-hidden-cost-of-key-lock-audio-artifacts-and-transient-smearing">The Hidden Cost of Key Lock: Audio Artifacts &amp; Transient Smearing</h2>

<p>Key Lock keeps a track&apos;s nominal pitch stable, but the pitch-preserving time and frequency processing used by the particular software or hardware can introduce audible artifacts. How noticeable those artifacts are depends on the size of the tempo shift, the algorithm in use, and the musical material itself. Dense arrangements may mask some artifacts more effectively than exposed vocals, sustained pads, or open hi-hats, though this is a general tendency rather than a fixed psychoacoustic rule.</p>

<h2 id="common-artifacts-and-what-they-sound-like">Common Artifacts and What They Sound Like</h2>

<p>Research on time-scale modification identifies transient smearing and phasiness as characteristic artifacts of phase-vocoder-style, pitch-preserving time-stretching, with a related category, warbling or unstable timbre, showing up most often on vocals and sustained tones.</p>

<div class="overflow-x-auto rounded-xl border my-4">
<table class="w-full text-sm">
<thead>
<tr class="bg-muted/50">
<th class="px-3 py-2 text-left font-semibold">Artifact</th>
<th class="px-3 py-2 text-left font-semibold">What it sounds like</th>
<th class="px-3 py-2 text-left font-semibold">Often noticeable on</th>
</tr>
</thead>
<tbody>
<tr class="border-t">
<td class="px-3 py-2">Transient smearing</td>
<td class="px-3 py-2">Softer, less defined attacks</td>
<td class="px-3 py-2">Kicks, snares, claps</td>
</tr>
<tr class="border-t">
<td class="px-3 py-2">Phasiness</td>
<td class="px-3 py-2">Hollow, watery, or reverb-like tone</td>
<td class="px-3 py-2">Pads, sustained synths, stereo material</td>
</tr>
<tr class="border-t">
<td class="px-3 py-2">Warbling</td>
<td class="px-3 py-2">Unstable pitch or timbral flutter</td>
<td class="px-3 py-2">Vocals and exposed melodies</td>
</tr>
<tr class="border-t">
<td class="px-3 py-2">Metallic or robotic tone</td>
<td class="px-3 py-2">Synthetic or processed character</td>
<td class="px-3 py-2">Vocals under substantial processing</td>
</tr>
<tr class="border-t">
<td class="px-3 py-2">Loss of presence</td>
<td class="px-3 py-2">Less immediate or focused sound</td>
<td class="px-3 py-2">Exposed full mixes at larger shifts</td>
</tr>
</tbody>
</table>
</div>

<figure class="my-8">
<img src="/images/blog/key-lock-audio-artifacts-chart.webp" alt="Chart of common Key Lock audio artifacts including transient smearing, phasiness, and vocal warbling, showing what each sounds like and which instruments are most affected" width="800" height="450" class="rounded-xl w-full" loading="lazy" />
</figure>

<div class="callout-takeaway">
<p><strong>Quick answer:</strong> Key Lock artifacts aren&apos;t random. They cluster around transient smearing (weaker drum hits), phasiness (hollow, reverb-like coloration), and vocal warbling. As the time-stretching demand increases, artifacts generally become more likely or more audible, although the result depends heavily on the algorithm and source material.</p>
</div>

<p>None of this means Key Lock is unusable. It means the cost of pitch preservation scales with how hard you push it. A small tempo correction may produce a pitch change that is less noticeable in a short transition, but whether it actually matters depends on the material, monitoring level, and harmonic context, not on a fixed percentage.</p>

<h2 id="ruling-out-non-key-lock-problems">Ruling Out Non-Key-Lock Problems</h2>

<p>Not every robotic or distorted sound during a tempo-shifted mix comes from Key Lock. Clipping from excessive gain, a low-quality source file, an incorrect beatgrid, CPU strain, or an unrelated effect can all produce similarly unpleasant results. AlphaTheta&apos;s own troubleshooting documentation lists disabling Master Tempo as one diagnostic step for distortion, treated as a test rather than confirmation that Master Tempo is always the culprit. Before blaming Key Lock, it&apos;s worth checking gain staging and file quality first.</p>

<h2 id="camelot-wheel-rules-shifting-keys-via-pitch-adjustments">Camelot Wheel Rules: Shifting Keys via Pitch Adjustments</h2>

<p>Pitch changes and Camelot Wheel movement are not measured the same way, so a one-semitone pitch shift does not move a track by one Camelot number. The Camelot Wheel is organized by circle-of-fifths relationships rather than chromatic semitone steps, which means the musical distance implied by a semitone shift and the distance implied by a Camelot-number shift are calculated differently.</p>

<h3 id="what-a-semitone-shift-means-on-the-wheel">What a Semitone Shift Means on the Wheel</h3>

<p>Music theory describes the circle of fifths as built from perfect-fifth intervals of seven semitones, which is why Camelot numbering does not track one-to-one with chromatic transposition. Under the standard wheel orientation, a one-semitone upward transposition moves seven positions in one direction around the same letter ring, while a one-semitone downward transposition moves seven positions in the opposite direction. Because visual numbering conventions can vary between charts and software, treat this as a directional relationship to verify against your own chart rather than a number to memorize as a fixed clockwise rule.</p>

<p>This matters directly for harmonic mixing. With Key Lock off, the track&apos;s sounding pitch may no longer correspond to the original analyzed key, even though the software continues to display the original library label. With Key Lock on, the software works to keep the analyzed key stable even as tempo changes, which is why many DJs choose Key Lock during harmonic transitions, while still treating it as a context-dependent setting rather than an always-on default.</p>

<figure class="my-8">
<img src="/images/blog/camelot-wheel-semitone-shift-diagram.webp" alt="Diagram illustrating how a one-semitone pitch shift moves seven positions around the Camelot Wheel due to circle-of-fifths relationships, not one position per semitone" width="800" height="450" class="rounded-xl w-full" loading="lazy" />
</figure>

<h2 id="why-the-camelot-label-isnt-infallible">Why the Camelot Label Isn&apos;t Infallible</h2>

<p>A few caveats worth keeping in mind so the Camelot label doesn&apos;t get treated as absolute:</p>

<ul class="list-disc pl-6 space-y-1 my-4">
<li><strong>Key analysis can be wrong.</strong> Automated key detection is a best estimate, not a guarantee, particularly on tracks with ambiguous tonal centers.</li>
<li><strong>Tracks can modulate.</strong> A song that changes key partway through will only ever have one label attached to it.</li>
<li><strong>A shared Camelot number doesn&apos;t guarantee a clean blend.</strong> Bass content, vocal register, and arrangement can clash even when two tracks are technically compatible on the wheel.</li>
<li><strong>Key Lock reduces key drift, but it doesn&apos;t eliminate mixing judgment.</strong> It helps preserve the track&apos;s pitch relationship while tempo changes; it does not correct inaccurate key detection and it does not replace listening.</li>
</ul>

<p>None of this is a reason to distrust harmonic mixing as a workflow. It&apos;s a reason to treat the Camelot label as a strong starting point that still benefits from your ears confirming the blend, especially after a meaningful tempo adjustment.</p>

<h2 id="when-you-should-turn-key-lock-off">When You Should Turn Key Lock OFF</h2>

<p>Key Lock isn&apos;t a setting to leave permanently on by default. It&apos;s a tool suited to specific situations, and there are just as many scenarios where natural speed-linked pitch movement is the better-sounding choice. The decision comes down to weighing harmonic stability against audio fidelity for the specific transition you&apos;re building.</p>

<h3 id="when-its-worth-keeping-on">When It&apos;s Worth Keeping On</h3>

<p>Key Lock tends to earn its keep when:</p>

<ul class="list-disc pl-6 space-y-1 my-4">
<li>You&apos;re making a large tempo adjustment to blend two tracks with very different natural BPMs.</li>
<li>The transition is long, so any key drift would become obvious over time.</li>
<li>Vocals or tonal elements from both tracks are overlapping and harmonic clash would be very noticeable.</li>
<li>You&apos;re building a harmonic mix where the Camelot relationship is central to the transition.</li>
</ul>

<h3 id="when-its-worth-turning-off">When It&apos;s Worth Turning Off</h3>

<p>Key Lock is often worth turning off when:</p>

<ul class="list-disc pl-6 space-y-1 my-4">
<li>The tempo correction is small, since a shorter transition gives any resulting pitch change less time to become noticeable.</li>
<li>The transition is short, so any pitch drift resolves before it&apos;s noticeable.</li>
<li>You&apos;re scratching. Serato documentation describes automatic Key Lock behavior during scratching so that time-stretched processing does not degrade the scratch response, though the exact behavior can depend on the Serato version, hardware, and selected playback mode.</li>
<li>You&apos;re intentionally using a speed-linked pitch rise or fall as a creative effect, rather than trying to hide it.</li>
<li>The processed version is audibly worse than the natural pitch shift for that particular track, which only listening can tell you.</li>
</ul>

<div class="callout-takeaway">
<p><strong>Quick answer:</strong> Turn Key Lock off for small, short, or scratch-heavy tempo changes where natural speed-linked pitch movement is barely noticeable. Keep it on for large or sustained tempo shifts where harmonic stability matters more than the processing trade-off.</p>
</div>

<h2 id="a-practical-ab-listening-workflow">A Practical A/B Listening Workflow</h2>

<p>Because artifact severity depends on the algorithm, the source material, and the size of the shift, the most reliable practical way to decide is to listen, rather than apply a fixed percentage rule.</p>

<ol class="list-decimal pl-6 space-y-1 my-4">
<li>Loop an exposed section of the track: a vocal phrase, an open kick pattern, or a sustained synth line works best.</li>
<li>Play the loop with Key Lock on at your intended tempo, and note what you hear.</li>
<li>Switch Key Lock off at the same tempo and compare directly.</li>
<li>Listen on your actual monitoring setup, not just headphones, since artifacts that are subtle on headphones can become obvious on a full-range system.</li>
<li>Test the comparison during the real transition, not only in isolation, since artifacts can be masked or exposed differently once both tracks are playing together.</li>
<li>Choose whichever mode sounds cleaner for that specific section; the better answer can change from track to track.</li>
</ol>

<h2 id="listening-on-a-bigger-system">Listening on a Bigger System</h2>

<p>On a well-tuned club or festival system, artifacts that were subtle in headphones may become more apparent. Exposed vocals, sustained synths, stereo material, and transient-heavy drums can each reveal different problems depending on the system, room, playback level, and processing.</p>

<p>Once you&apos;ve decided how far you&apos;re willing to push the pitch fader, you still need to know exactly how that adjustment translates to BPM. That&apos;s a job for a dedicated tool rather than mental math mid-set. Use our <a href="https://www.thetaptempo.com/pitch-tempo-calculator" class="text-primary hover:underline font-bold">Pitch Tempo Calculator</a> to see the exact tempo result of any pitch percentage before you commit to it in your set.</p>

<h2 id="continue-learning">Continue Learning</h2>

<ul class="list-disc pl-6 space-y-1 my-4">
<li><a href="https://www.thetaptempo.com/blog/pitch-percentage-bpm" class="text-primary hover:underline font-bold">How Pitch Percentage Affects BPM</a></li>
<li><a href="https://www.thetaptempo.com/blog/why-bpm-results-differ" class="text-primary hover:underline font-bold">Why BPM Results Differ</a></li>
<li><a href="https://www.thetaptempo.com/blog/what-are-milliseconds-in-music" class="text-primary hover:underline font-bold">What Are Milliseconds in Music?</a></li>
<li><a href="https://www.thetaptempo.com/blog/why-music-is-divided-into-bars" class="text-primary hover:underline font-bold">Why Music Is Divided Into Bars</a></li>
</ul>

<p>Shifting pitch without Key Lock? Calculate how your tempo and pitch fader adjustments impact track speed using our <a href="https://www.thetaptempo.com/pitch-tempo-calculator" class="text-primary hover:underline font-bold">Pitch Tempo Calculator</a>.</p>
`;