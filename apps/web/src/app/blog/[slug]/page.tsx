import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { getCollection } from "@/lib/mongodb"
import type { Metadata } from "next"
import { BASE_URL } from "@/lib/constants"
import { BlogFaq } from "@/components/blog-faq"
import { AuthorBio } from "@/components/author-bio"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
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
  const { slug } = await params
  const blogs = await getCollection("blogs")
  const blog = await blogs.findOne({ slug, published: true })

  if (!blog) notFound()

  const canonical = `${BASE_URL}/blog/${slug}`

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

  return (
    <>
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

          <header className="mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight mb-8 leading-[1.15]">
              {blog.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-muted-foreground font-mono text-sm border-b border-border pb-8">
              <span>By {blog.author || "TheTapTempo Team"}</span>
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
              <p className="text-lg text-muted-foreground leading-relaxed mt-6">
                {blog.excerpt || blog.metaDescription}
              </p>
            )}
          </header>

          {blog.coverImage && (
            <div className="mb-12 rounded-xl overflow-hidden">
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          <div className="blog-content">
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>

          <AuthorBio />

          {blog.faqs && blog.faqs.length > 0 && (
            <div className="mt-12 border-t pt-12">
              <BlogFaq faqs={blog.faqs} />
            </div>
          )}
        </div>
      </article>
    </>
  )
}
