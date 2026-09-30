import { NextResponse } from "next/server"
import { getCollection } from "@/lib/mongodb"
import { requireAdmin } from "@/lib/auth"
import { readJson, HttpError } from "@/lib/request"
import { blogCreateSchema, normalizeSlug } from "@/lib/validation"
import { sanitizeHtml } from "@/lib/sanitize"
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

export async function POST(req: Request) {
  const authError = await requireAdmin(req)
  if (authError) return authError

  try {
    const body = await readJson(req)
    const parsed = blogCreateSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid blog data" }, { status: 400 })
    }
    const data = parsed.data

    const blogs = await getCollection("blogs")
    const now = new Date()
    const blog = {
      title: data.title,
      slug: normalizeSlug(data.slug),
      content: data.content ? sanitizeHtml(data.content) : "",
      excerpt: data.excerpt || "",
      coverImage: data.coverImage || "",
      coverImagePublicId: data.coverImagePublicId || "",
      metaTitle: data.metaTitle || "",
      metaDescription: data.metaDescription || "",
      author: data.author || "TheTapTempo Editorial Team",
      tags: data.tags || [],
      published: data.published ?? true,
      readTime: data.readTime || "",
      createdAt: now,
      updatedAt: now,
    }

    const result = await blogs.insertOne(blog)
    revalidatePath("/blog")
    revalidatePath("/")
    revalidatePath("/llms.txt")
    revalidatePath(`/blog/${blog.slug}`)

    return NextResponse.json(
      { ...blog, _id: result.insertedId.toString() },
      { status: 201 },
    )
  } catch (e) {
    if (e instanceof HttpError) {
      return NextResponse.json({ error: e.message }, { status: e.status })
    }
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 })
  }
}