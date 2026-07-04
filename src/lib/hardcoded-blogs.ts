import { content as c0 } from "@/data/blogs/how-to-find-bpm-of-any-song"
import { content as c1 } from "@/data/blogs/how-accurate-is-tap-tempo"
import type { HardcodedBlogMeta } from "@/data/blogs/registry"
import { getHardcodedBlogMeta } from "@/data/blogs/registry"

const blogContentMap: Record<string, string> = {
  "how-to-find-bpm-of-any-song": c0,
  "how-accurate-is-tap-tempo": c1,
}

export function getHardcodedBlogContent(slug: string): string | null {
  return blogContentMap[slug] || null
}

export { getHardcodedBlogMeta }
export type { HardcodedBlogMeta }
