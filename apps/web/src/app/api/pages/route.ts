import { NextResponse } from "next/server"
import { getCollection } from "@/lib/mongodb"
import { revalidatePath } from "next/cache"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const all = searchParams.get("all") === "true"

    const pages = await getCollection("pages")
    const filter = all ? {} : { published: true }
    const data = await pages.find(filter).sort({ createdAt: -1 }).toArray()

    const serialized = data.map((p) => ({
      ...p,
      _id: p._id.toString(),
      createdAt: p.createdAt?.toISOString(),
      updatedAt: p.updatedAt?.toISOString(),
    }))

    return NextResponse.json({ pages: serialized })
  } catch {
    return NextResponse.json({ error: "Failed to fetch pages" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    if (!body.title || !body.slug) {
      return NextResponse.json({ error: "Title and slug are required" }, { status: 400 })
    }

    const pages = await getCollection("pages")
    const now = new Date()

    const existing = await pages.findOne({ slug: body.slug })
    if (existing) {
      return NextResponse.json({ error: "A page with this slug already exists" }, { status: 409 })
    }

    const page = {
      title: body.title,
      slug: body.slug,
      content: body.content || "",
      metaTitle: body.metaTitle || "",
      metaDescription: body.metaDescription || "",
      published: body.published ?? true,
      createdAt: now,
      updatedAt: now,
    }

    const result = await pages.insertOne(page)
    revalidatePath(`/${body.slug}`)
    revalidatePath("/")

    return NextResponse.json(
      { ...page, _id: result.insertedId.toString() },
      { status: 201 },
    )
  } catch (e) {
    console.error("Create page error:", e)
    return NextResponse.json({ error: "Failed to create page" }, { status: 500 })
  }
}
