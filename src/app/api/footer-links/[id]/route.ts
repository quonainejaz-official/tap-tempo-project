import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { getCollection } from "@/lib/mongodb"
import { requireAdmin } from "@/lib/auth"
import { readJson, HttpError } from "@/lib/request"
import { footerLinkSchema } from "@/lib/validation"

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin(req)
  if (authError) return authError

  try {
    const { id } = await params
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid footer link id" }, { status: 400 })
    }
    const objectId = new ObjectId(id)

    const body = await readJson(req)
    const parsed = footerLinkSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid footer link data" }, { status: 400 })
    }
    const data = parsed.data

    const col = await getCollection("footer_links")
    await col.updateOne(
      { _id: objectId },
      {
        $set: {
          label: data.label,
          href: data.href,
          section: data.section || "More",
          order: data.order ?? 0,
          updatedAt: new Date(),
        },
      },
    )

    return NextResponse.json({ success: true })
  } catch (e) {
    if (e instanceof HttpError) {
      return NextResponse.json({ error: e.message }, { status: e.status })
    }
    return NextResponse.json({ error: "Failed to update footer link" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin(req)
  if (authError) return authError

  try {
    const { id } = await params
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid footer link id" }, { status: 400 })
    }
    const objectId = new ObjectId(id)

    const col = await getCollection("footer_links")
    await col.deleteOne({ _id: objectId })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete footer link" }, { status: 500 })
  }
}