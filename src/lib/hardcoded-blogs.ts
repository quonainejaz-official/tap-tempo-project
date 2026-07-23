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
}

export function getHardcodedBlogContent(slug: string): string | null {
  return blogContentMap[slug] || null
}

export { getHardcodedBlogMeta }
export type { HardcodedBlogMeta }
