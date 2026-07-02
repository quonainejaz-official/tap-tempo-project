import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { getCollection } from "@/lib/mongodb"

export async function GET() {
  try {
    const col = await getCollection("footer_links")
    const items = await col.find().sort({ section: 1, order: 1 }).toArray()
    const serialized = items.map((i) => ({
      ...i,
      _id: i._id.toString(),
      createdAt: i.createdAt?.toISOString(),
      updatedAt: i.updatedAt?.toISOString(),
    }))
    return NextResponse.json({ items: serialized })
  } catch {
    return NextResponse.json({ error: "Failed to fetch footer links" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const col = await getCollection("footer_links")

    const item = {
      label: body.label,
      href: body.href,
      section: body.section || "More",
      order: body.order ?? 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await col.insertOne(item)
    return NextResponse.json({ ...item, _id: result.insertedId.toString() }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to create footer link" }, { status: 500 })
  }
}
