import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { getCollection } from "@/lib/mongodb"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ slug: string }>
}

const reservedSlugs = [
  "tap-tempo", "metronome", "bpm-calculator", "bpm-to-ms",
  "delay-time-calculator", "tempo-markings", "beats-per-bar-calculator",
  "blog", "admin", "api", "favicon.svg", "robots.txt",
]

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  if (reservedSlugs.includes(slug)) return {}

  const pages = await getCollection("pages")
  const page = await pages.findOne({ slug, published: true })

  if (!page) return { title: "Page Not Found" }

  return {
    title: page.metaTitle || `${page.title} | TheTapTempo`,
    description: page.metaDescription || "",
    openGraph: {
      title: page.metaTitle || page.title,
      description: page.metaDescription || "",
    },
  }
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params
  if (reservedSlugs.includes(slug)) notFound()

  const pages = await getCollection("pages")
  const page = await pages.findOne({ slug, published: true })

  if (!page) notFound()

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <Link
        href="/"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ChevronLeft className="w-4 h-4 mr-1" /> Back to home
      </Link>

      <h1 className="text-5xl font-serif font-bold tracking-tight mb-8">
        {page.title}
      </h1>

      <div
        className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-serif prose-headings:tracking-tight prose-a:text-primary"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </div>
  )
}
