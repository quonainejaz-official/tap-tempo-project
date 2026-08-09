import { BASE_URL } from "@/lib/constants"

export interface LlmsTxtBlog {
  slug: string
  title: string
  excerpt: string
  metaDescription?: string
  createdAt?: string
}

interface LlmsTxtLink {
  name: string
  path: string
  description: string
}

const TOOL_LINKS: LlmsTxtLink[] = [
  { name: "Tap Tempo", path: "/tap-tempo", description: "Find the BPM of any song by tapping along." },
  { name: "Metronome", path: "/metronome", description: "Practice with adjustable BPM, time signatures, and subdivisions." },
  { name: "BPM Calculator", path: "/bpm-calculator", description: "Calculate beats per minute from time and measure duration." },
  { name: "BPM to MS", path: "/bpm-to-ms", description: "Convert BPM to millisecond values for note divisions." },
  { name: "Delay & Reverb Time Calculator", path: "/delay-reverb-time-calculator", description: "Calculate delay and reverb times from BPM." },
  { name: "Tempo Markings", path: "/tempo-markings", description: "Italian tempo terms with BPM ranges." },
  { name: "Beats Per Bar Calculator", path: "/beats-per-bar-calculator", description: "Identify time signatures." },
]

const AI_ASSISTANT_LINKS: LlmsTxtLink[] = [
  { name: "TapTempoAI", path: "/ai-tempo", description: "AI-powered Q&A about tempo, BPM, rhythm, and music practice." },
]

const OPTIONAL_LINKS: LlmsTxtLink[] = [
  { name: "Privacy Policy", path: "/privacy-policy", description: "Data handling and privacy practices." },
  { name: "Terms & Conditions", path: "/terms", description: "Terms of service for using TheTapTempo tools and website." },
  { name: "Editorial Policy", path: "/editorial-policy", description: "Standards for content accuracy and corrections." },
]

const SITE_SUMMARY =
  "TheTapTempo provides free browser-based music tools for musicians, producers, DJs, drummers, educators, and creators. All tools work offline with no registration required."

function renderLinks(links: LlmsTxtLink[]): string {
  return links
    .map((link) => `- [${link.name}](${BASE_URL}${link.path}): ${link.description}`)
    .join("\n")
}

export function generateLlmsTxt(blogs: LlmsTxtBlog[]): string {
  const guides = [...blogs]
    .sort((a, b) => {
      const da = new Date(a.createdAt || 0).getTime()
      const db = new Date(b.createdAt || 0).getTime()
      return db - da
    })
    .map((blog) => {
      const description = blog.metaDescription || blog.excerpt
      return `- [${blog.title}](${BASE_URL}/blog/${blog.slug}): ${description}`
    })
    .join("\n")

  return [
    "# TheTapTempo",
    "",
    `> ${SITE_SUMMARY}`,
    "",
    "## Tools",
    "",
    renderLinks(TOOL_LINKS),
    "",
    "## AI Assistant",
    "",
    renderLinks(AI_ASSISTANT_LINKS),
    "",
    "## Guides",
    "",
    guides,
    "",
    "## Optional",
    "",
    renderLinks(OPTIONAL_LINKS),
    "",
  ].join("\n")
}
