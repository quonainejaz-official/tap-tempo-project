import { content as c0 } from "@/data/blogs/how-to-find-bpm-of-any-song"
import { content as c1 } from "@/data/blogs/how-accurate-is-tap-tempo"
import { content as c2 } from "@/data/blogs/practice-with-a-metronome"
import { content as c3 } from "@/data/blogs/common-metronome-mistakes"
import { content as c4 } from "@/data/blogs/how-djs-calculate-bpm"
import { content as c5 } from "@/data/blogs/how-to-choose-song-bpm"
import { content as c6 } from "@/data/blogs/what-are-milliseconds-in-music"
import { content as c7 } from "@/data/blogs/understanding-note-values"
import { content as c8 } from "@/data/blogs/how-to-set-delay-for-electric-guitar"
import { content as c9 } from "@/data/blogs/delay-vs-reverb"
import { content as c10 } from "@/data/blogs/why-composers-use-tempo-markings-instead-of-bpm"
import { content as c11 } from "@/data/blogs/why-the-same-tempo-marking-sounds-different"
import { content as c12 } from "@/data/blogs/why-music-is-divided-into-bars"
import { content as c13 } from "@/data/blogs/strong-and-weak-beats-in-music"
import { content as c14 } from "@/data/blogs/why-songs-dont-have-one-fixed-bpm"
import { content as c15 } from "@/data/blogs/why-bpm-results-differ"
import { content as c16 } from "@/data/blogs/why-slow-practice-makes-better-musician"
import { content as c17 } from "@/data/blogs/how-to-increase-playing-speed-with-metronome"
import { content as c18 } from "@/data/blogs/why-small-bpm-changes-affect-song-feel"
import { content as c19 } from "@/data/blogs/how-to-match-bpm-of-a-reference-song"
import { content as c20 } from "@/data/blogs/tempo-synced-effects"
import { content as c21 } from "@/data/blogs/latency-vs-musical-timing"
import { content as c22 } from "@/data/blogs/stereo-delay"
import { content as c23 } from "@/data/blogs/speaker-delay-live-sound"
import { content as c24 } from "@/data/blogs/how-tempo-affects-emotion"
import { content as c25 } from "@/data/blogs/history-of-italian-musical-terms"
import type { HardcodedBlogMeta } from "@/data/blogs/registry"
import { getHardcodedBlogMeta } from "@/data/blogs/registry"

const blogContentMap: Record<string, string> = {
  "how-to-find-bpm-of-any-song": c0,
  "how-accurate-is-tap-tempo": c1,
  "practice-with-a-metronome": c2,
  "common-metronome-mistakes": c3,
  "how-djs-calculate-bpm": c4,
  "how-to-choose-song-bpm": c5,
  "what-are-milliseconds-in-music": c6,
  "understanding-note-values": c7,
  "how-to-set-delay-for-electric-guitar": c8,
  "delay-vs-reverb": c9,
  "why-composers-use-tempo-markings-instead-of-bpm": c10,
  "why-the-same-tempo-marking-sounds-different": c11,
  "why-music-is-divided-into-bars": c12,
  "strong-and-weak-beats-in-music": c13,
  "why-songs-dont-have-one-fixed-bpm": c14,
  "why-bpm-results-differ": c15,
  "why-slow-practice-makes-better-musician": c16,
  "how-to-increase-playing-speed-with-metronome": c17,
  "why-small-bpm-changes-affect-song-feel": c18,
  "how-to-match-bpm-of-a-reference-song": c19,
  "tempo-synced-effects": c20,
  "latency-vs-musical-timing": c21,
  "stereo-delay": c22,
  "speaker-delay-live-sound": c23,
  "how-tempo-affects-emotion": c24,
  "history-of-italian-musical-terms": c25,
}

export function getHardcodedBlogContent(slug: string): string | null {
  return blogContentMap[slug] || null
}

export { getHardcodedBlogMeta }
export type { HardcodedBlogMeta }
