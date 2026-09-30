import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { getCollection } from "@/lib/mongodb"
import { deleteImage, getPublicIdFromUrl } from "@/lib/cloudinary"
import { requireAdmin } from "@/lib/auth"
import { readJson, HttpError } from "@/lib/request"
import { blogUpdateSchema, normalizeSlug } from "@/lib/validation"
import { sanitizeHtml } from "@/lib/sanitize"
import { revalidatePath } from "next/cache"

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin(req)
  if (authError) return authError

  try {
    const { id } = await params
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid blog id" }, { status: 400 })
    }

    const blogs = await getCollection("blogs")
    const blog = await blogs.findOne({ _id: new ObjectId(id) })

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    return NextResponse.json({ ...blog, _id: blog._id.toString() })
  } catch {
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin(req)
  if (authError) return authError

  try {
    const { id } = await params
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid blog id" }, { status: 400 })
    }
    const objectId = new ObjectId(id)

    const body = (await readJson(req)) as Record<string, unknown>
    const parsed = blogUpdateSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid blog data" }, { status: 400 })
    }
    const data = parsed.data

    const blogs = await getCollection("blogs")
    const existing = await blogs.findOne({ _id: objectId })
    if (!existing) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    const slug = data.slug !== undefined ? normalizeSlug(data.slug) : existing.slug
    const coverImage = data.coverImage ?? existing.coverImage ?? ""
    const oldCoverImage =
      typeof body.oldCoverImage === "string" ? body.oldCoverImage : ""

    if (oldCoverImage && oldCoverImage !== coverImage) {
      const storedPublicId =
        (typeof existing.coverImagePublicId === "string" && existing.coverImagePublicId) ||
        (typeof existing.coverImage === "string"
          ? getPublicIdFromUrl(existing.coverImage)
          : null)
      const oldPublicId = getPublicIdFromUrl(oldCoverImage)
      if (oldPublicId && storedPublicId && oldPublicId === storedPublicId) {
        await deleteImage(oldPublicId)
      }
    }

    const update: Record<string, unknown> = {
      title: data.title ?? existing.title,
      slug,
      content: data.content !== undefined ? sanitizeHtml(data.content) : existing.content,
      excerpt: data.excerpt ?? existing.excerpt ?? "",
      coverImage,
      coverImagePublicId: data.coverImagePublicId ?? existing.coverImagePublicId ?? "",
      metaTitle: data.metaTitle ?? existing.metaTitle ?? "",
      metaDescription: data.metaDescription ?? existing.metaDescription ?? "",
      author: data.author ?? existing.author ?? "TheTapTempo Editorial Team",
      tags: data.tags ?? existing.tags ?? [],
      published: data.published ?? existing.published ?? true,
      readTime: data.readTime ?? existing.readTime ?? "",
      updatedAt: new Date(),
    }

    await blogs.updateOne({ _id: objectId }, { $set: update })

    revalidatePath("/blog")
    revalidatePath("/")
    revalidatePath("/llms.txt")
    revalidatePath(`/blog/${slug}`)

    return NextResponse.json({ success: true })
  } catch (e) {
    if (e instanceof HttpError) {
      return NextResponse.json({ error: e.message }, { status: e.status })
    }
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin(req)
  if (authError) return authError

  try {
    const { id } = await params
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid blog id" }, { status: 400 })
    }
    const objectId = new ObjectId(id)

    const blogs = await getCollection("blogs")
    const blog = await blogs.findOne({ _id: objectId })

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    // Delete cover image from Cloudinary
    if (blog.coverImagePublicId) {
      await deleteImage(blog.coverImagePublicId)
    } else if (blog.coverImage) {
      const publicId = getPublicIdFromUrl(blog.coverImage)
      if (publicId) await deleteImage(publicId)
    }

    const deletedSlug = blog.slug
    await blogs.deleteOne({ _id: objectId })

    revalidatePath("/blog")
    revalidatePath("/")
    revalidatePath("/llms.txt")
    if (deletedSlug) revalidatePath(`/blog/${deletedSlug}`)

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 })
  }
}