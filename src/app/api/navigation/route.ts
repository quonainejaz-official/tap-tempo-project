import { NextResponse } from "next/server"
import { getCollection } from "@/lib/mongodb"
import { requireAdmin } from "@/lib/auth"
import { readJson, HttpError } from "@/lib/request"
import { navItemSchema } from "@/lib/validation"

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
  } catch (e) {
    console.error("GET /api/navigation error:", e)
    return NextResponse.json({ error: "Failed to fetch navigation" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const authError = await requireAdmin(req)
  if (authError) return authError

  try {
    const body = await readJson(req)
    const parsed = navItemSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid nav item data" }, { status: 400 })
    }
    const data = parsed.data

    const nav = await getCollection("navigation")
    const item = {
      label: data.label,
      href: data.href,
      parentId: data.parentId || null,
      order: data.order ?? 0,
      section: data.section || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await nav.insertOne(item)
    return NextResponse.json({ ...item, _id: result.insertedId.toString() }, { status: 201 })
  } catch (e) {
    if (e instanceof HttpError) {
      return NextResponse.json({ error: e.message }, { status: e.status })
    }
    console.error("POST /api/navigation error:", e)
    return NextResponse.json({ error: "Failed to create nav item" }, { status: 500 })
  }
}