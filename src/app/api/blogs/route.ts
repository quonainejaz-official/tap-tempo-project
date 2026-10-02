import { NextResponse } from "next/server"
import { hardcodedBlogs } from "@/data/blogs/registry"

const CMS_DISABLED =
  "Blog content is managed as version-controlled source in src/data/blogs/. " +
  "The MongoDB-backed blog CMS is intentionally disabled because published posts " +
  "are rendered from the hardcoded registry, so writes here would never become public."

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

export async function POST() {
  return NextResponse.json({ error: CMS_DISABLED }, { status: 410 })
}