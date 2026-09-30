import { NextRequest, NextResponse } from "next/server"
import { getCollection } from "@/lib/mongodb"
import { trackSchema } from "@/lib/validation"
import { readJson, HttpError } from "@/lib/request"
import { checkRateLimit } from "@/lib/rate-limit"
import { getClientIp } from "@/lib/ip"
import { ensureLogsTtlIndex } from "@/lib/logs"

function parseUserAgent(ua: string) {
  let browser = "Unknown"
  let device = "Desktop"

  if (/mobile/i.test(ua)) device = "Mobile"
  else if (/tablet/i.test(ua)) device = "Tablet"

  if (/edg/i.test(ua)) browser = "Edge"
  else if (/chrome/i.test(ua)) browser = "Chrome"
  else if (/firefox/i.test(ua)) browser = "Firefox"
  else if (/safari/i.test(ua)) browser = "Safari"
  else if (/opera/i.test(ua)) browser = "Opera"

  return { browser, device }
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request)
  const limiter = await checkRateLimit(`track:${ip}`, 100, 60 * 1000)
  if (!limiter.ok) {
    return NextResponse.json(
      { error: "Too many requests." },
      { status: 429, headers: { "Retry-After": String(limiter.retryAfterSeconds) } },
    )
  }

  try {
    const body = await readJson(request, 50_000)
    const parsed = trackSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid tracking payload" }, { status: 400 })
    }

    const { type, path, referrer, element, metadata } = parsed.data
    const logs = await getCollection("logs")
    await ensureLogsTtlIndex()

    const ua = request.headers.get("user-agent") || ""
    const { browser, device } = parseUserAgent(ua)

    const logEntry = {
      type,
      path,
      ip,
      browser,
      device,
      referrer: referrer || request.headers.get("referer") || null,
      element: element || null,
      metadata: metadata || null,
      timestamp: new Date(),
    }

    await logs.insertOne(logEntry)

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json({ error: error.message }, { status: error.status })
    }
    console.error("Track API error:", error)
    return NextResponse.json({ error: "Failed to track" }, { status: 500 })
  }
}