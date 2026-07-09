import { content as c0 } from "@/data/blogs/how-to-find-bpm-of-any-song"
import { content as c1 } from "@/data/blogs/how-accurate-is-tap-tempo"
import { content as c2 } from "@/data/blogs/practice-with-a-metronome"
import { content as c3 } from "@/data/blogs/common-metronome-mistakes"
import { content as c4 } from "@/data/blogs/how-djs-calculate-bpm"
import type { HardcodedBlogMeta } from "@/data/blogs/registry"
import { getHardcodedBlogMeta } from "@/data/blogs/registry"

const blogContentMap: Record<string, string> = {
  "how-to-find-bpm-of-any-song": c0,
  "how-accurate-is-tap-tempo": c1,
  "practice-with-a-metronome": c2,
  "common-metronome-mistakes": c3,
  "how-djs-calculate-bpm": c4,
}

export function getHardcodedBlogContent(slug: string): string | null {
  return blogContentMap[slug] || null
}

export { getHardcodedBlogMeta }
export type { HardcodedBlogMeta }
