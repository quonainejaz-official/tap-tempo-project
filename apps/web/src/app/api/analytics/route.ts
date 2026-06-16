import { NextRequest, NextResponse } from "next/server"
import { getCollection } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const days = parseInt(searchParams.get("days") || "30")

    const analytics = await getCollection("analytics")
    const logs = await getCollection("logs")

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    // Total visitors (unique IPs)
    const totalVisitors = await logs.distinct("ip", { timestamp: { $gte: startDate } })

    // Total page views
    const totalViews = await logs.countDocuments({
      type: "page_view",
      timestamp: { $gte: startDate },
    })

    // Total clicks
    const totalClicks = await logs.countDocuments({
      type: "click",
      timestamp: { $gte: startDate },
    })

    // Unique logins
    const logins = await logs.countDocuments({
      type: "login",
      timestamp: { $gte: startDate },
    })

    // Top pages by views
    const topPages = await logs.aggregate([
      { $match: { type: "page_view", timestamp: { $gte: startDate } } },
      { $group: { _id: "$path", views: { $sum: 1 } } },
      { $sort: { views: -1 } },
      { $limit: 10 },
    ]).toArray()

    // Top pages by clicks
    const topClicks = await logs.aggregate([
      { $match: { type: "click", timestamp: { $gte: startDate } } },
      { $group: { _id: "$path", clicks: { $sum: 1 } } },
      { $sort: { clicks: -1 } },
      { $limit: 10 },
    ]).toArray()

    // Views per day (last N days)
    const viewsPerDay = await logs.aggregate([
      { $match: { type: "page_view", timestamp: { $gte: startDate } } },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$timestamp" },
          },
          views: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]).toArray()

    // Visitors per day
    const visitorsPerDay = await logs.aggregate([
      { $match: { timestamp: { $gte: startDate } } },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$timestamp" },
          },
          uniqueIps: { $addToSet: "$ip" },
        },
      },
      {
        $project: {
          _id: 1,
          visitors: { $size: "$uniqueIps" },
        },
      },
      { $sort: { _id: 1 } },
    ]).toArray()

    // Clicks per day
    const clicksPerDay = await logs.aggregate([
      { $match: { type: "click", timestamp: { $gte: startDate } } },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$timestamp" },
          },
          clicks: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]).toArray()

    // Device breakdown
    const deviceBreakdown = await logs.aggregate([
      { $match: { timestamp: { $gte: startDate } } },
      { $group: { _id: "$device", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]).toArray()

    // Browser breakdown
    const browserBreakdown = await logs.aggregate([
      { $match: { timestamp: { $gte: startDate } } },
      { $group: { _id: "$browser", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]).toArray()

    // Referrer breakdown
    const referrerBreakdown = await logs.aggregate([
      { $match: { type: "page_view", timestamp: { $gte: startDate }, referrer: { $ne: null, $ne: "" } } },
      { $group: { _id: "$referrer", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]).toArray()

    // Hourly activity (last 24 hours)
    const last24h = new Date()
    last24h.setHours(last24h.getHours() - 24)
    const hourlyActivity = await logs.aggregate([
      { $match: { timestamp: { $gte: last24h } } },
      {
        $group: {
          _id: { $hour: "$timestamp" },
          views: { $sum: { $cond: [{ $eq: ["$type", "page_view"] }, 1, 0] } },
          clicks: { $sum: { $cond: [{ $eq: ["$type", "click"] }, 1, 0] } },
        },
      },
      { $sort: { _id: 1 } },
    ]).toArray()

    return NextResponse.json({
      summary: {
        totalVisitors: totalVisitors.length,
        totalViews,
        totalClicks,
        logins,
      },
      topPages,
      topClicks,
      viewsPerDay,
      visitorsPerDay,
      clicksPerDay,
      deviceBreakdown,
      browserBreakdown,
      referrerBreakdown,
      hourlyActivity,
    })
  } catch (error) {
    console.error("Analytics API error:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}