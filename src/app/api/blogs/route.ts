import { NextResponse } from "next/server"
import { getCollection } from "@/lib/mongodb"
import { revalidatePath } from "next/cache"
import { hardcodedBlogs } from "@/data/blogs/registry"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const limit = Math.min(Number(searchParams.get("limit")) || 100, 100)

    const blogs = hardcodedBlogs
      .map((b) => ({
        _id: `hardcoded-${b.slug}`,
        title: b.title,
        slug: b.slug,
        excerpt: b.excerpt,
        metaTitle: b.metaTitle,
        metaDescription: b.metaDescription,
        coverImage: b.coverImage,
        coverImagePublicId: b.coverImagePublicId,
        author: b.author,
        tags: b.tags,
        published: true,
        readTime: b.readTime,
        createdAt: new Date(b.createdAt || Date.now()).toISOString(),
        updatedAt: new Date(b.updatedAt || b.createdAt || Date.now()).toISOString(),
        faqs: b.faqs,
      }))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json({ blogs: blogs.slice(0, limit) })
  } catch {
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 })
  }
}

function sanitizeSlug(slug: string): string {
  return slug.trim().replace(/^\/+|\/+$/g, "").toLowerCase()
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const blogs = await getCollection("blogs")

    const now = new Date()
    const blog = {
      title: body.title,
      slug: sanitizeSlug(body.slug || ""),
      content: body.content || "",
      excerpt: body.excerpt || "",
      coverImage: body.coverImage || "",
      coverImagePublicId: body.coverImagePublicId || "",
      metaTitle: body.metaTitle || "",
      metaDescription: body.metaDescription || "",
      author: body.author || "TheTapTempo Editorial Team",
      tags: body.tags || [],
      published: body.published ?? true,
      readTime: body.readTime || "",
      createdAt: now,
      updatedAt: now,
    }

    const result = await blogs.insertOne(blog)
    revalidatePath("/blog")
    revalidatePath("/")
    revalidatePath(`/blog/${blog.slug}`)

    return NextResponse.json(
      { ...blog, _id: result.insertedId.toString() },
      { status: 201 },
    )
  } catch {
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 })
  }
}
