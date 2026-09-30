import { isIP } from "node:net"

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for")
  if (forwarded) {
    const first = forwarded.split(",")[0].trim()
    if (isIP(first)) return first
  }
  const realIp = req.headers.get("x-real-ip")
  if (realIp && isIP(realIp.trim())) return realIp.trim()
  return "unknown"
}