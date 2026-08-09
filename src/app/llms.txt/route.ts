import { NextResponse } from "next/server"
import { generateLlmsTxt } from "@/lib/llms-txt"
import { hardcodedBlogs } from "@/data/blogs/registry"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const blogs = hardcodedBlogs.map((blog) => ({
      slug: blog.slug,
      title: blog.title,
      excerpt: blog.excerpt,
      metaDescription: blog.metaDescription,
      createdAt: blog.createdAt,
    }))

    const text = generateLlmsTxt(blogs)

    return new NextResponse(text, {
      status: 200,
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    })
  } catch (error) {
    console.error("[llms.txt] Failed to generate llms.txt:", error)
    return new NextResponse("llms.txt generation failed", { status: 500 })
  }
}
