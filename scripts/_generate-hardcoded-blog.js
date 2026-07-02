const fs = require("fs")
const path = require("path")

const raw = JSON.parse(fs.readFileSync("scripts/_blog-data.json", "utf8"))

// ── 1. Content file ──────────────────────────────────────────────
const contentTs = `// Generated file — do not edit directly
export const content = ${JSON.stringify(raw.content)};
`

fs.writeFileSync("src/data/blogs/how-to-find-bpm-of-any-song.ts", contentTs, "utf8")
console.log("✓ Created src/data/blogs/how-to-find-bpm-of-any-song.ts")

// ── 2. Registry / manifest ───────────────────────────────────────
const blogMeta = {
  slug: raw.slug,
  title: raw.title,
  excerpt: raw.excerpt,
  metaTitle: raw.metaTitle,
  metaDescription: raw.metaDescription,
  coverImage: raw.coverImage,
  coverImagePublicId: raw.coverImagePublicId || "",
  author: raw.author,
  readTime: raw.readTime,
  tags: raw.tags || [],
  createdAt: raw.createdAt,
  updatedAt: raw.updatedAt,
  faqs: raw.faqs || [],
}

const registryTs = `// Generated file — do not edit directly
// Add new hardcoded blogs here

export interface HardcodedBlogMeta {
  slug: string
  title: string
  excerpt: string
  metaTitle: string
  metaDescription: string
  coverImage: string
  coverImagePublicId: string
  author: string
  readTime: string
  tags: string[]
  createdAt: string
  updatedAt: string
  faqs: { q: string; a: string }[]
}

export const hardcodedBlogs: HardcodedBlogMeta[] = [
  ${JSON.stringify(blogMeta, null, 2)},
]

export function getHardcodedBlogMeta(slug: string): HardcodedBlogMeta | undefined {
  return hardcodedBlogs.find((b) => b.slug === slug)
}
`

fs.writeFileSync("src/data/blogs/registry.ts", registryTs, "utf8")
console.log("✓ Created src/data/blogs/registry.ts")

// ── 3. Content loader ────────────────────────────────────────────
const contentLoaderTs = `// Generated file — do not edit directly
import { content as c0 } from "./how-to-find-bpm-of-any-song"
import type { HardcodedBlogMeta } from "./registry"
import { getHardcodedBlogMeta } from "./registry"

const blogContentMap: Record<string, string> = {
  "how-to-find-bpm-of-any-song": c0,
}

export function getHardcodedBlogContent(slug: string): string | null {
  return blogContentMap[slug] || null
}

export { getHardcodedBlogMeta }
export type { HardcodedBlogMeta }
`

fs.writeFileSync("src/lib/hardcoded-blogs.ts", contentLoaderTs, "utf8")
console.log("✓ Created src/lib/hardcoded-blogs.ts")

console.log("\nDone. Files generated successfully.")
