import { NextResponse } from "next/server"
import { uploadImage } from "@/lib/cloudinary"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const dataUri = `data:${file.type};base64,${buffer.toString("base64")}`
    const result = await uploadImage(dataUri)

    return NextResponse.json({
      url: result.url,
      publicId: result.publicId,
    })
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
