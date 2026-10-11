// Generated file - do not edit directly
// Add new hardcoded blogs here

export interface HardcodedBlogMeta {
  slug: string
  title: string
  excerpt: string
  metaTitle: string
  metaDescription: string
  coverImage: string
  coverImagePublicId: string
  coverImageAlt?: string
  author: string
  readTime: string
  tags: string[]
  createdAt: string
  updatedAt: string
  faqs: { q: string; a: string }[]
}

export const hardcodedBlogs: HardcodedBlogMeta[] = [
  {
  "slug": "how-musicians-find-song-tempo-by-ear",
  "title": "How Musicians Find Song Tempo by Ear",
  "excerpt": "Learn how musicians find a song's pulse, estimate tempo by ear, and sharpen the skill with practical drills before checking with Tap Tempo.",
  "metaTitle": "How Musicians Find Song Tempo by Ear",
  "metaDescription": "Learn how musicians find a song's pulse, estimate tempo by ear, and sharpen the skill with practical drills before checking with Tap Tempo.",
  "coverImage": "https://res.cloudinary.com/dym1gtcer/image/upload/v1791572827/taptempo/blog/how-musicians-find-song-tempo-by-ear-featured.webp",
  "coverImagePublicId": "taptempo/blog/how-musicians-find-song-tempo-by-ear-featured",
  "coverImageAlt": "Four-step infographic showing how musicians find song tempo by ear: listen, locate the pulse, estimate, then check",
  "author": "TheTapTempo Editorial Team",
  "readTime": "5 min read",
  "tags": ["tempo", "bpm", "ear training", "rhythm", "musicianship", "guide"],
  "createdAt": "2026-10-09T23:56:01.000Z",
  "updatedAt": "2026-10-09T23:56:01.000Z",
  "faqs": [
    { "q": "Do I need to identify exact BPM to be a competent musician?", "a": "No. Being able to follow and maintain the intended pulse matters more here than naming an exact number without help." },
    { "q": "Is tempo recognition the same as absolute pitch?", "a": "No. Absolute pitch concerns identifying pitch without an external reference. This article concerns perceiving and estimating musical speed." },
    { "q": "Does playing drums automatically make someone better at this?", "a": "Not necessarily. The 2016 comparative study found no significant differences between instrument groups on most measures, although musicians as a group outperformed non-musicians." }
  ]
  }
]

export function getHardcodedBlogMeta(slug: string): HardcodedBlogMeta | undefined {
  return hardcodedBlogs.find((b) => b.slug === slug)
}
