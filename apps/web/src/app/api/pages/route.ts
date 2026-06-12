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
    const pages = await getCollection("pages")

    const now = new Date()
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
  } catch {
    return NextResponse.json({ error: "Failed to create page" }, { status: 500 })
  }
}
