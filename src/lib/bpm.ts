export const BPM_MIN = 1
export const BPM_MAX = 500

export function parseBpmParam(value: string | null | undefined): number | null {
  if (value === null || value === undefined) return null
  const trimmed = value.trim()
  if (trimmed === "") return null
  const parsed = Number(trimmed)
  if (!Number.isFinite(parsed)) return null
  const rounded = Math.round(parsed)
  if (rounded < BPM_MIN || rounded > BPM_MAX) return null
  return rounded
}

export function clampBpm(value: number): number {
  if (!Number.isFinite(value)) return BPM_MIN
  return Math.max(BPM_MIN, Math.min(BPM_MAX, Math.round(value)))
}

export function readStoredBpm(raw: string | null): number | null {
  if (raw === null || raw === "") return null
  const parsed = Number(raw)
  if (!Number.isFinite(parsed)) return null
  return Math.max(BPM_MIN, Math.min(BPM_MAX, Math.round(parsed)))
}