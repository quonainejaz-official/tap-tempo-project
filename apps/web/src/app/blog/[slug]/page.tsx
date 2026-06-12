import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { getCollection } from "@/lib/mongodb"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const blogs = await getCollection("blogs")
  const blog = await blogs.findOne({ slug, published: true })

  if (!blog) return { title: "Blog Not Found" }

  return {
    title: blog.metaTitle || `${blog.title} | TheTapTempo`,
    description: blog.metaDescription || blog.excerpt || "",
    openGraph: {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.excerpt || "",
      type: "article",
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
    <article className="container mx-auto px-4 py-12 max-w-3xl">
      <Link
        href="/blog"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ChevronLeft className="w-4 h-4 mr-1" /> Back to blog
      </Link>

      <header className="mb-12">
        <h1 className="text-5xl font-serif font-bold tracking-tight mb-6 leading-tight">
          {blog.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-muted-foreground font-mono text-sm border-b pb-6">
          <span>By {blog.author || "TheTapTempo Team"}</span>
          <span>•</span>
          <span>
            {blog.createdAt
              ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
              : ""}
          </span>
          {blog.readTime && (
            <>
              <span>•</span>
              <span>{blog.readTime}</span>
            </>
          )}
        </div>
      </header>

      {blog.coverImage && (
        <div className="mb-8 rounded-xl overflow-hidden">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      <div
        className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-serif prose-headings:tracking-tight prose-a:text-primary"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </article>
  )
}
