import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { getCollection } from "@/lib/mongodb"

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await req.json()
    const col = await getCollection("footer_links")

    await col.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          label: body.label,
          href: body.href,
          section: body.section || "More",
          order: body.order ?? 0,
          updatedAt: new Date(),
        },
      },
    )

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to update footer link" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const col = await getCollection("footer_links")
    await col.deleteOne({ _id: new ObjectId(id) })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete footer link" }, { status: 500 })
  }
}
