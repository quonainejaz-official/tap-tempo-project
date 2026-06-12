import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { getCollection } from "@/lib/mongodb"
import { deleteImage, getPublicIdFromUrl } from "@/lib/cloudinary"
import { revalidatePath } from "next/cache"

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
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
  try {
    const { id } = await params
    const body = await req.json()
    const blogs = await getCollection("blogs")

    // If coverImage changed, delete old one from Cloudinary
    if (body.oldCoverImage && body.oldCoverImage !== body.coverImage) {
      const publicId = getPublicIdFromUrl(body.oldCoverImage)
      if (publicId) await deleteImage(publicId)
    }

    const update: any = {
      title: body.title,
      slug: body.slug,
      content: body.content || "",
      excerpt: body.excerpt || "",
      coverImage: body.coverImage || "",
      coverImagePublicId: body.coverImagePublicId || "",
      metaTitle: body.metaTitle || "",
      metaDescription: body.metaDescription || "",
      author: body.author || "Admin",
      tags: body.tags || [],
      published: body.published ?? true,
      readTime: body.readTime || "",
      updatedAt: new Date(),
    }

    await blogs.updateOne({ _id: new ObjectId(id) }, { $set: update })

    revalidatePath("/blog")
    revalidatePath("/")
    revalidatePath(`/blog/${body.slug}`)

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const blogs = await getCollection("blogs")
    const blog = await blogs.findOne({ _id: new ObjectId(id) })

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

    await blogs.deleteOne({ _id: new ObjectId(id) })

    revalidatePath("/blog")
    revalidatePath("/")

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 })
  }
}
