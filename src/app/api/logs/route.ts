import { NextRequest, NextResponse } from "next/server"
import { getCollection } from "@/lib/mongodb"
import { requireAdmin } from "@/lib/auth"
import { checkRateLimit } from "@/lib/rate-limit"
import { getClientIp } from "@/lib/ip"
import { ensureLogsTtlIndex } from "@/lib/logs"

export async function GET(request: NextRequest) {
  const authError = await requireAdmin(request)
  if (authError) return authError

  const ip = getClientIp(request)
  const limiter = await checkRateLimit(`logs:${ip}`, 120, 60 * 1000)
  if (!limiter.ok) {
    return NextResponse.json(
      { error: "Too many requests." },
      { status: 429, headers: { "Retry-After": String(limiter.retryAfterSeconds) } },
    )
  }

  try {
    const { searchParams } = new URL(request.url)
    const page = Math.max(1, Math.min(parseInt(searchParams.get("page") || "1") || 1, 10000))
    const limit = Math.max(1, Math.min(parseInt(searchParams.get("limit") || "50") || 50, 200))
    const type = searchParams.get("type") || undefined
    const ipFilter = searchParams.get("ip") || undefined
    const days = Math.max(1, Math.min(parseInt(searchParams.get("days") || "7") || 7, 730))

    const logs = await getCollection("logs")
    await ensureLogsTtlIndex()

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    const query: Record<string, unknown> = { timestamp: { $gte: startDate } }
    if (type) query.type = type
    if (ipFilter) query.ip = ipFilter

    const total = await logs.countDocuments(query)
    const items = await logs
      .find(query)
      .sort({ timestamp: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray()

    return NextResponse.json({
      items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Logs API error:", error)
    return NextResponse.json({ error: "Failed to fetch logs" }, { status: 500 })
  }
}