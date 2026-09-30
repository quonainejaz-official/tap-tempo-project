import { Collection } from "mongodb"
import { getCollection } from "@/lib/mongodb"

export interface RateLimitResult {
  ok: boolean
  retryAfterSeconds?: number
}

interface RateLimitDoc {
  _id: string
  count: number
  resetAt: Date
}

let ttlIndexEnsured: Promise<void> | null = null

async function ensureTtlIndex() {
  if (ttlIndexEnsured) return ttlIndexEnsured
  ttlIndexEnsured = (async () => {
    const col = (await getCollection("rate_limits")) as unknown as Collection<RateLimitDoc>
    await col.createIndex({ resetAt: 1 }, { expireAfterSeconds: 0 }).catch(() => {})
  })()
  return ttlIndexEnsured
}

export async function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): Promise<RateLimitResult> {
  try {
    await ensureTtlIndex()
    const col = (await getCollection("rate_limits")) as unknown as Collection<RateLimitDoc>
    const now = Date.now()
    const resetAt = new Date(now + windowMs)

    await col.updateOne(
      { _id: key, resetAt: { $lte: new Date(now) } },
      { $set: { count: 0, resetAt } },
    )

    const doc = await col.findOneAndUpdate(
      { _id: key },
      { $inc: { count: 1 }, $setOnInsert: { resetAt } },
      { upsert: true, returnDocument: "after" },
    )

    const count = typeof doc?.count === "number" ? doc.count : 1
    if (count > limit) {
      const resetAtMs =
        doc?.resetAt instanceof Date ? doc.resetAt.getTime() : now + windowMs
      return { ok: false, retryAfterSeconds: Math.max(1, Math.ceil((resetAtMs - now) / 1000)) }
    }
    return { ok: true }
  } catch {
    return { ok: true }
  }
}