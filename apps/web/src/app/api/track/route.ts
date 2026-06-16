import { NextRequest, NextResponse } from "next/server"
import { getCollection } from "@/lib/mongodb"

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
  try {
    const body = await request.json()
    const { type, path, referrer, element, metadata } = body

    const logs = await getCollection("logs")

    const forwarded = request.headers.get("x-forwarded-for")
    const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown"
    const ua = request.headers.get("user-agent") || ""
    const { browser, device } = parseUserAgent(ua)

    const logEntry = {
      type,
      path,
      ip,
      browser,
      device,
      referrer: referrer || request.headers.get("referer") || null,
      element,
      metadata,
      timestamp: new Date(),
    }

    await logs.insertOne(logEntry)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Track API error:", error)
    return NextResponse.json({ error: "Failed to track" }, { status: 500 })
  }
}