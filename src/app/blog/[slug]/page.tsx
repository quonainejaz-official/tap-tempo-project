import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"
import type { Metadata } from "next"
import { BASE_URL } from "@/lib/constants"
import { BlogFaq } from "@/components/blog-faq"
import { AuthorBio } from "@/components/author-bio"
import { getHardcodedBlogMeta, getHardcodedBlogContent } from "@/lib/hardcoded-blogs"
import { hardcodedBlogs } from "@/data/blogs/registry"
import { BlogToc } from "@/components/blog-toc"
import { extractH2Headings, injectHeadingIds } from "@/lib/blog-toc-utils"

interface Props {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return hardcodedBlogs.map((b) => ({ slug: b.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const rawSlug = (await params).slug
  const slug = rawSlug.trim().replace(/^\/+|\/+$/g, "").toLowerCase()
  const canonical = `${BASE_URL}/blog/${slug}`

  const meta = getHardcodedBlogMeta(slug)
  if (!meta) return { title: "Blog Not Found" }

  return {
    title: meta.metaTitle || `${meta.title} | TheTapTempo`,
    description: meta.metaDescription || meta.excerpt || "",
    alternates: { canonical },
    openGraph: {
      title: meta.metaTitle || meta.title,
      description: meta.metaDescription || meta.excerpt || "",
      type: "article",
      url: canonical,
      ...(meta.coverImage ? { images: [{ url: meta.coverImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: meta.metaTitle || meta.title,
      description: meta.metaDescription || meta.excerpt || "",
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const rawSlug = (await params).slug
  const slug = rawSlug.trim().replace(/^\/+|\/+$/g, "").toLowerCase()
  const canonical = `${BASE_URL}/blog/${slug}`

  const meta = getHardcodedBlogMeta(slug)
  const rawContent = getHardcodedBlogContent(slug)

  if (!meta || !rawContent) notFound()

  const headings = extractH2Headings(rawContent)
  const content = injectHeadingIds(rawContent)

  const faqJsonLd = meta.faqs && meta.faqs.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: meta.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      }
    : null

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: meta.title,
    description: meta.excerpt || meta.metaDescription || "",
    ...(meta.coverImage ? { image: meta.coverImage } : {}),
    author: { "@type": "Organization", name: "TheTapTempo", url: BASE_URL },
    publisher: {
      "@type": "Organization",
      name: "TheTapTempo",
      url: BASE_URL,
      logo: { "@type": "ImageObject", url: `${BASE_URL}/logo.svg` },
    },
    datePublished: new Date(meta.createdAt || Date.now()).toISOString(),
    dateModified: new Date(meta.updatedAt || meta.createdAt || Date.now()).toISOString(),
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: meta.title, item: canonical },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}
      <article className="min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 max-w-5xl">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-10 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Back to blog
          </Link>

          <header className="mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight mb-8 leading-[1.15]">
              {meta.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-muted-foreground font-mono text-sm border-b border-border pb-8">
              <span>By {meta.author || "TheTapTempo Editorial Team"}</span>
              <span className="text-border">&middot;</span>
              <span>
                {meta.createdAt
                  ? new Date(meta.createdAt).toLocaleDateString("en-US", {
                      month: "long", day: "numeric", year: "numeric",
                    })
                  : ""}
              </span>
              {meta.createdAt && (
                <span className="text-xs">
                  {new Date(meta.createdAt).toLocaleTimeString("en-US", {
                    hour: "2-digit", minute: "2-digit",
                  })}
                </span>
              )}
              {meta.readTime && (
                <>
                  <span className="text-border">&middot;</span>
                  <span>{meta.readTime}</span>
                </>
              )}
            </div>
            {(meta.excerpt || meta.metaDescription) && (
              <p className="text-lg text-muted-foreground leading-relaxed mt-6">
                {meta.excerpt || meta.metaDescription}
              </p>
            )}
          </header>

          {meta.coverImage && (
            <div className="mb-12 rounded-xl overflow-hidden bg-muted relative aspect-[16/9]">
              <Image
                src={meta.coverImage}
                alt={meta.coverImageAlt || meta.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1024px"
                priority
              />
            </div>
          )}

          {headings.length > 0 ? (
            <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-8">
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <BlogToc headings={headings} variant="sidebar" />
                </div>
              </aside>
              <div>
                <div className="lg:hidden mb-6">
                  <BlogToc headings={headings} variant="inline" />
                </div>
                <div className="blog-content">
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>
              </div>
            </div>
          ) : (
            <div className="blog-content">
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
          )}

          <AuthorBio />

          {meta.faqs && meta.faqs.length > 0 && (
            <div className="mt-12 border-t pt-12">
              <BlogFaq faqs={meta.faqs} />
            </div>
          )}
        </div>
      </article>
    </>
  )
}
