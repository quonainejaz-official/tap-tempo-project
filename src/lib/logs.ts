import { getCollection } from "@/lib/mongodb"

let ttlIndexEnsured: Promise<void> | null = null

export function ensureLogsTtlIndex(): Promise<void> {
  if (ttlIndexEnsured) return ttlIndexEnsured
  ttlIndexEnsured = (async () => {
    const col = await getCollection("logs")
    await col
      .createIndex({ timestamp: 1 }, { expireAfterSeconds: 90 * 24 * 60 * 60 })
      .catch(() => {})
  })()
  return ttlIndexEnsured
}