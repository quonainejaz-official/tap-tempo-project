import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"
import { getCollection } from "@/lib/mongodb"
import type { Metadata } from "next"
import { BASE_URL } from "@/lib/constants"
import { BlogFaq } from "@/components/blog-faq"
import { AuthorBio } from "@/components/author-bio"
import { TableOfContents } from "@/components/table-of-contents"
import { EditorialReview } from "@/components/editorial-review"
import { processBlogContent } from "@/lib/blog-utils"

interface Props {
  params: Promise<{ slug: string }>
}

export const revalidate = 0
export const dynamic = "force-dynamic"
export const dynamicParams = true

export async function generateStaticParams() {
  try {
    const blogs = await getCollection("blogs")
    const all = await blogs.find({ published: true }, { projection: { slug: 1 } }).toArray()
    return all.map((b) => ({ slug: b.slug.replace(/^\/+|\/+$/g, "").toLowerCase() }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const rawSlug = (await params).slug
  const slug = rawSlug.trim().replace(/^\/+|\/+$/g, "").toLowerCase()
  const blogs = await getCollection("blogs")
  const blog = await blogs.findOne({ slug, published: true })

  if (!blog) return { title: "Blog Not Found" }

  const canonical = `${BASE_URL}/blog/${slug}`

  return {
    title: blog.metaTitle || `${blog.title} | TheTapTempo`,
    description: blog.metaDescription || blog.excerpt || "",
    alternates: { canonical },
    openGraph: {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.excerpt || "",
      type: "article",
      url: canonical,
      ...(blog.coverImage ? { images: [{ url: blog.coverImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.excerpt || "",
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const rawSlug = (await params).slug
  const slug = rawSlug.trim().replace(/^\/+|\/+$/g, "").toLowerCase()

  let blog
  try {
    const blogs = await getCollection("blogs")
    blog = await blogs.findOne({ slug, published: true })
  } catch {
    console.error(`[blog/${slug}] MongoDB error`)
    notFound()
  }

  if (!blog) notFound()

  const canonical = `${BASE_URL}/blog/${slug}`

  const { processedHtml, headings } = processBlogContent(blog.content || "")

  const faqJsonLd = blog.faqs
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: blog.faqs.map((faq: { q: string; a: string }) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
      }
    : null

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.excerpt || blog.metaDescription || "",
    ...(blog.coverImage ? { image: blog.coverImage } : {}),
    author: {
      "@type": "Organization",
      name: "TheTapTempo",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "TheTapTempo",
      url: BASE_URL,
    },
    datePublished: new Date(blog.createdAt).toISOString(),
    dateModified: blog.updatedAt
      ? new Date(blog.updatedAt).toISOString()
      : new Date(blog.createdAt).toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: blog.title, item: canonical },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <article className="min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 max-w-5xl">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-10 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Back to blog
          </Link>

          <header className="mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight mb-6 leading-[1.15]">
              {blog.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-muted-foreground font-mono text-sm pb-6">
              <span>By {blog.author || "TheTapTempo Editorial Team"}</span>
              <span className="text-border">&middot;</span>
              <span>
                {blog.createdAt
                  ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  : ""}
              </span>
              {blog.createdAt && (
                <span className="text-xs">
                  {new Date(blog.createdAt).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              )}
              {blog.readTime && (
                <>
                  <span className="text-border">&middot;</span>
                  <span>{blog.readTime}</span>
                </>
              )}
            </div>
            {(blog.excerpt || blog.metaDescription) && (
              <p className="text-lg text-muted-foreground leading-relaxed">
                {blog.excerpt || blog.metaDescription}
              </p>
            )}
          </header>

          {blog.coverImage && (
            <div className="mb-10 rounded-xl overflow-hidden bg-muted relative aspect-[16/9]">
              <Image
                src={blog.coverImage}
                alt={blog.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1024px"
                priority
              />
            </div>
          )}

          {headings.length > 0 && <TableOfContents headings={headings} />}

          <div className="blog-content">
            <div dangerouslySetInnerHTML={{ __html: processedHtml }} />
          </div>

          {blog.faqs && blog.faqs.length > 0 && (
            <div className="mt-12 border-t pt-12">
              <BlogFaq faqs={blog.faqs} />
            </div>
          )}

          <AuthorBio />
          <EditorialReview />
        </div>
      </article>
    </>
  )
}
