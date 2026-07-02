import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { getCollection } from "@/lib/mongodb"

export async function GET() {
  try {
    const nav = await getCollection("navigation")
    const items = await nav.find().sort({ order: 1, createdAt: 1 }).toArray()
    const serialized = items.map((i) => ({
      ...i,
      _id: i._id.toString(),
      createdAt: i.createdAt?.toISOString(),
      updatedAt: i.updatedAt?.toISOString(),
    }))
    return NextResponse.json({ items: serialized })
  } catch {
    return NextResponse.json({ error: "Failed to fetch navigation" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const nav = await getCollection("navigation")

    const item = {
      label: body.label,
      href: body.href,
      parentId: body.parentId || null,
      order: body.order ?? 0,
      section: body.section || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await nav.insertOne(item)
    return NextResponse.json({ ...item, _id: result.insertedId.toString() }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to create nav item" }, { status: 500 })
  }
}
