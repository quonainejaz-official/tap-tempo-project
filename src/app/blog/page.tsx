import Link from "next/link"
import { Activity, Clock, Sliders, Sparkles, ArrowRight } from "lucide-react"
import { BlogListing } from "@/components/blog-listing"
import { hardcodedBlogs } from "@/data/blogs/registry"
import type { BlogItem } from "@/stores/use-blog-store"

const learningEcosystem = [
  {
    title: "Tempo",
    desc: "Discover, measure, and understand tempo.",
    icon: Activity,
    tools: [
      { title: "Tap Tempo", href: "/tap-tempo" },
      { title: "BPM Calculator", href: "/bpm-calculator" },
      { title: "Tempo Markings", href: "/tempo-markings" },
    ],
  },
  {
    title: "Practice",
    desc: "Train rhythm, timing, and musical precision.",
    icon: Clock,
    tools: [
      { title: "Metronome", href: "/metronome" },
      { title: "Beats Per Bar", href: "/beats-per-bar-calculator" },
    ],
  },
  {
    title: "Music Production",
    desc: "Convert and calculate precise timing values.",
    icon: Sliders,
    tools: [
      { title: "BPM to ms", href: "/bpm-to-ms" },
      { title: "Delay & Reverb Time", href: "/delay-reverb-time-calculator" },
    ],
  },
  {
    title: "AI",
    desc: "Intelligent tempo analysis powered by AI.",
    icon: Sparkles,
    tools: [{ title: "AI Tempo", href: "/ai-tempo" }],
  },
]

const initialArticles: BlogItem[] = hardcodedBlogs
  .slice()
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  .map((b) => ({
    _id: `hardcoded-${b.slug}`,
    title: b.title,
    slug: b.slug,
    excerpt: b.excerpt,
    metaTitle: b.metaTitle,
    metaDescription: b.metaDescription,
    coverImage: b.coverImage,
    author: b.author,
    tags: b.tags,
    published: true,
    readTime: b.readTime,
    createdAt: new Date(b.createdAt).toISOString(),
  }))

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Blog Hero */}
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-serif font-bold tracking-tight mb-4">TheTapTempo Blog</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Guides, theory, and production tips on rhythm, tempo, and music production.
        </p>
      </header>

      {/* Learning Ecosystem */}
      <section className="mb-12" aria-labelledby="learning-ecosystem-heading">
        <div className="text-center mb-8">
          <h2 id="learning-ecosystem-heading" className="text-2xl md:text-3xl font-serif font-bold mb-2">
            Learning Ecosystem
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Every guide connects to the tools that power it.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {learningEcosystem.map((block) => {
            const Icon = block.icon
            return (
              <div key={block.title} className="rounded-xl border bg-card p-5">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-sm mb-1.5">{block.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{block.desc}</p>
                <ul className="space-y-2">
                  {block.tools.map((tool) => (
                    <li key={tool.href}>
                      <Link
                        href={tool.href}
                        className="text-sm text-primary font-medium hover:underline inline-flex items-center gap-1"
                      >
                        {tool.title}
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </section>

      {/* Interactive listing: search, sort, featured, grid, load more */}
      <BlogListing initialArticles={initialArticles} />
    </div>
  )
}
