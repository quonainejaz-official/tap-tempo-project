import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { getCollection } from "@/lib/mongodb"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ slug: string }>
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.thetaptempo.com"

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const blogs = await getCollection("blogs")
  const blog = await blogs.findOne({ slug, published: true })

  if (!blog) return { title: "Blog Not Found" }

  const canonical = `${siteUrl}/blog/${slug}`

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

  return (
    <article className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 max-w-3xl">
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
      </div>
    </article>
  )
}
