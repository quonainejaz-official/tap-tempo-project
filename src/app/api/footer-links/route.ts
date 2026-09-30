import { NextResponse } from "next/server"
import { getCollection } from "@/lib/mongodb"
import { requireAdmin } from "@/lib/auth"
import { readJson, HttpError } from "@/lib/request"
import { footerLinkSchema } from "@/lib/validation"

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
  const authError = await requireAdmin(req)
  if (authError) return authError

  try {
    const body = await readJson(req)
    const parsed = footerLinkSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid footer link data" }, { status: 400 })
    }
    const data = parsed.data

    const col = await getCollection("footer_links")
    const item = {
      label: data.label,
      href: data.href,
      section: data.section || "More",
      order: data.order ?? 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await col.insertOne(item)
    return NextResponse.json({ ...item, _id: result.insertedId.toString() }, { status: 201 })
  } catch (e) {
    if (e instanceof HttpError) {
      return NextResponse.json({ error: e.message }, { status: e.status })
    }
    return NextResponse.json({ error: "Failed to create footer link" }, { status: 500 })
  }
}