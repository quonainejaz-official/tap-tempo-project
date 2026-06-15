import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { getCollection } from "@/lib/mongodb"

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await req.json()
    const nav = await getCollection("navigation")

    await nav.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          label: body.label,
          href: body.href,
          parentId: body.parentId || null,
          order: body.order ?? 0,
          section: body.section || "",
          updatedAt: new Date(),
        },
      },
    )

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to update nav item" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const nav = await getCollection("navigation")

    await nav.deleteOne({ _id: new ObjectId(id) })
    await nav.deleteMany({ parentId: id })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete nav item" }, { status: 500 })
  }
}
