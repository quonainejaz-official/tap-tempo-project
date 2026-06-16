# SEO Internal Linking Rules

## Rule 1: One Link Per Paragraph
Ek paragraph mein ek se zyada internal link mat lagao. Agar paragraph mein pehle se koi link hai to ussi paragraph mein doosra link mat daalo.

✅ Allowed:
```html
<p>Practice with a <a href="/metronome">metronome</a> to improve your timing.</p>
<p>Use our <a href="/bpm-calculator">BPM calculator</a> for advanced tempo conversions.</p>
```

❌ Not Allowed:
```html
<p>Practice with a <a href="/metronome">metronome</a> and use our <a href="/bpm-calculator">BPM calculator</a> together.</p>
```

## Rule 2: Maximum 2 Links Per Heading Section
Ek heading (h2/h3/h4) ke under maximum 2 links ho sakte hain. 1 link ho to best hai. Agar ek section mein multiple paragraphs hain to 2 se zyada links na hon.

✅ Allowed (2 links):
```html
<h2>Tools for Musicians</h2>
<p>Use our <a href="/metronome">metronome</a> for practice.</p>
<p>Try the <a href="/bpm-calculator">BPM calculator</a> too.</p>
```

❌ Not Allowed (3 links):
```html
<h2>Tools for Musicians</h2>
<p>Use our <a href="/metronome">metronome</a> for practice.</p>
<p>Try the <a href="/bpm-calculator">BPM calculator</a> too.</p>
<p>Also check <a href="/scale-finder">scales</a> and <a href="/chord-library">chords</a>.</p>
```

## Rule 3: Distribute Links Throughout Content
Links ko ek jagah cluster mat karo. Agar top of the page mein koi link aaya to bottom mein bhi koi link hona chahiye. Links evenly distribute hone chahiye.

✅ Good distribution:
- Hero section → 1 link
- Middle section → 1-2 links
- Bottom / FAQ section → 1 link

❌ Bad distribution:
- Hero section → 4 links (clustered)
- Rest of page → 0 links (empty)

## Summary Checklist
- [ ] Har paragraph mein maximum 1 link
- [ ] Har heading section mein maximum 2 links
- [ ] Links puri page mein distribute hain
- [ ] Same page ka link repeat na karein ek section mein
- [ ] Link text descriptive ho (e.g. "click here" nahi)
