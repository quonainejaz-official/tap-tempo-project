import { NextResponse } from "next/server"
import { uploadImage } from "@/lib/cloudinary"
import { requireAdmin } from "@/lib/auth"
import { checkRateLimit } from "@/lib/rate-limit"
import { getClientIp } from "@/lib/ip"

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
])
const MAX_FILE_SIZE = 10 * 1024 * 1024

export async function POST(req: Request) {
  const authError = await requireAdmin(req)
  if (authError) return authError

  const ip = getClientIp(req)
  const limiter = await checkRateLimit(`upload:${ip}`, 60, 60 * 60 * 1000)
  if (!limiter.ok) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Please try again later." },
      { status: 429, headers: { "Retry-After": String(limiter.retryAfterSeconds) } },
    )
  }

  try {
    const contentLength = Number(req.headers.get("content-length") || 0)
    if (Number.isFinite(contentLength) && contentLength > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File too large. Maximum size is 10MB." }, { status: 413 })
    }

    const formData = await req.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: "Unsupported file type. Upload a JPEG, PNG, WebP, GIF, or AVIF image." },
        { status: 415 },
      )
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File too large. Maximum size is 10MB." }, { status: 413 })
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