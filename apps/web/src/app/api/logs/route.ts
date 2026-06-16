import { NextRequest, NextResponse } from "next/server"
import { getCollection } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "50")
    const type = searchParams.get("type")
    const ip = searchParams.get("ip")
    const days = parseInt(searchParams.get("days") || "7")

    const logs = await getCollection("logs")

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    const query: Record<string, unknown> = { timestamp: { $gte: startDate } }
    if (type) query.type = type
    if (ip) query.ip = ip

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