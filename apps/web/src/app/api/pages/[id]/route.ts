import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { getCollection } from "@/lib/mongodb"
import { revalidatePath } from "next/cache"

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const pages = await getCollection("pages")
    const page = await pages.findOne({ _id: new ObjectId(id) })

    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 })
    }

    return NextResponse.json({ ...page, _id: page._id.toString() })
  } catch {
    return NextResponse.json({ error: "Failed to fetch page" }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await req.json()
    const pages = await getCollection("pages")

    const update = {
      title: body.title,
      slug: body.slug,
      content: body.content || "",
      metaTitle: body.metaTitle || "",
      metaDescription: body.metaDescription || "",
      published: body.published ?? true,
      updatedAt: new Date(),
    }

    await pages.updateOne({ _id: new ObjectId(id) }, { $set: update })

    revalidatePath(`/${body.slug}`)
    revalidatePath("/")

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to update page" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const pages = await getCollection("pages")

    const page = await pages.findOne({ _id: new ObjectId(id) })
    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 })
    }

    await pages.deleteOne({ _id: new ObjectId(id) })

    revalidatePath(`/${page.slug}`)
    revalidatePath("/")

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete page" }, { status: 500 })
  }
}
