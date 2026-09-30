import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { getCollection } from "@/lib/mongodb"
import { requireAdmin } from "@/lib/auth"
import { readJson, HttpError } from "@/lib/request"
import { navItemSchema } from "@/lib/validation"

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin(req)
  if (authError) return authError

  try {
    const { id } = await params
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid nav item id" }, { status: 400 })
    }
    const objectId = new ObjectId(id)

    const body = await readJson(req)
    const parsed = navItemSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid nav item data" }, { status: 400 })
    }
    const data = parsed.data

    const nav = await getCollection("navigation")
    await nav.updateOne(
      { _id: objectId },
      {
        $set: {
          label: data.label,
          href: data.href,
          parentId: data.parentId || null,
          order: data.order ?? 0,
          section: data.section || "",
          updatedAt: new Date(),
        },
      },
    )

    return NextResponse.json({ success: true })
  } catch (e) {
    if (e instanceof HttpError) {
      return NextResponse.json({ error: e.message }, { status: e.status })
    }
    return NextResponse.json({ error: "Failed to update nav item" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin(req)
  if (authError) return authError

  try {
    const { id } = await params
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid nav item id" }, { status: 400 })
    }
    const objectId = new ObjectId(id)

    const nav = await getCollection("navigation")
    await nav.deleteOne({ _id: objectId })
    await nav.deleteMany({ parentId: id })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete nav item" }, { status: 500 })
  }
}