export const FAVORITE_NAME_MAX = 30
export const FAVORITE_MAX_COUNT = 50
export const FAVORITE_BEAT_MIN = 1
export const FAVORITE_BEAT_MAX = 500
export const FAVORITE_VOLUME_MAX = 1
export const FAVORITE_BARS_MAX = 16
export const FAVORITE_RANDOM_MUTE_MAX = 50

type FavoriteSoundStyle = "click" | "beep" | "woodblock" | "cowbell" | "snare"
type FavoriteSubdivision = "none" | "quarter" | "eighth" | "triplet" | "sixteenth" | "sextuplet"
type FavoriteSwingPreset = "straight" | "triplet" | "dotted" | "swing" | "custom"
type FavoriteBeatState = "A" | "N" | "G" | "M"

const SOUND_STYLES: FavoriteSoundStyle[] = ["click", "beep", "woodblock", "cowbell", "snare"]
const SUBDIVISIONS: FavoriteSubdivision[] = ["none", "quarter", "eighth", "triplet", "sixteenth", "sextuplet"]
const SWING_PRESETS: FavoriteSwingPreset[] = ["straight", "triplet", "dotted", "swing", "custom"]
const BEAT_STATES: FavoriteBeatState[] = ["A", "N", "G", "M"]

export interface Favorite {
  name: string
  bpm: number
  volume: number
  signature: string
  customTimeActive: boolean
  customBeats: number | null
  customUnit: 4 | 8 | 16
  soundStyle: FavoriteSoundStyle
  subdivision: FavoriteSubdivision
  swing: number
  swingPreset: FavoriteSwingPreset
  isGapActive: boolean
  playBars: number
  silentBars: number
  isRandomMuteActive: boolean
  randomMutePercent: number
  speedTrainerEnabled: boolean
  speedStartTempo: number
  speedEndTempo: number
  speedStepSize: number
  speedIntervalBars: number
  timerMinutes: number
  beatStates: FavoriteBeatState[]
}

export function sanitizeFavoriteName(value: unknown): string {
  if (typeof value !== "string") return ""
  return value.trim().slice(0, FAVORITE_NAME_MAX)
}

function toFiniteNumber(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback
}

function toBoolean(value: unknown): boolean {
  return value === true
}

function validSignature(value: unknown): boolean {
  return typeof value === "string" && /^\d{1,2}\/\d{1,2}$/.test(value) && value.length <= 8
}

function validBeatStates(value: unknown, count: number): FavoriteBeatState[] {
  if (!Array.isArray(value)) {
    const fallback: FavoriteBeatState[] = ["N"]
    return fallback.slice(0, count)
  }
  const states: FavoriteBeatState[] = []
  for (const entry of value.slice(0, count)) {
    states.push(BEAT_STATES.includes(entry as FavoriteBeatState) ? (entry as FavoriteBeatState) : "N")
  }
  if (states.length === 0) states.push("N")
  return states
}

function sanitizeFavoriteRecord(value: unknown): Favorite | null {
  if (typeof value !== "object" || value === null) return null
  const record = value as Record<string, unknown>

  const name = sanitizeFavoriteName(record.name)
  if (name === "") return null

  const bpm = toFiniteNumber(record.bpm, 0)
  if (bpm < FAVORITE_BEAT_MIN || bpm > FAVORITE_BEAT_MAX) return null

  const signature = validSignature(record.signature) ? (record.signature as string) : "4/4"
  const beatCount = parseInt(signature.split("/")[0], 10)

  const unit = record.customUnit === 8 || record.customUnit === 16 ? record.customUnit : 4
  const customBeatsValue = toFiniteNumber(record.customBeats, 0)
  const customBeats = customBeatsValue > 0 ? Math.max(FAVORITE_BEAT_MIN, Math.min(32, customBeatsValue)) : null

  const soundStyle = SOUND_STYLES.includes(record.soundStyle as FavoriteSoundStyle)
    ? (record.soundStyle as FavoriteSoundStyle)
    : "click"
  const subdivision = SUBDIVISIONS.includes(record.subdivision as FavoriteSubdivision)
    ? (record.subdivision as FavoriteSubdivision)
    : "quarter"
  const swingPreset = SWING_PRESETS.includes(record.swingPreset as FavoriteSwingPreset)
    ? (record.swingPreset as FavoriteSwingPreset)
    : "straight"

  const clamp = (value: unknown, max: number, min = 0): number => {
    const n = toFiniteNumber(value, min)
    return Math.max(min, Math.min(max, n))
  }

  return {
    name,
    bpm,
    volume: clamp(record.volume, FAVORITE_VOLUME_MAX),
    signature,
    customTimeActive: toBoolean(record.customTimeActive),
    customBeats,
    customUnit: unit,
    soundStyle,
    subdivision,
    swing: clamp(record.swing, 1),
    swingPreset,
    isGapActive: toBoolean(record.isGapActive),
    playBars: clamp(record.playBars, FAVORITE_BARS_MAX, 1),
    silentBars: clamp(record.silentBars, FAVORITE_BARS_MAX, 1),
    isRandomMuteActive: toBoolean(record.isRandomMuteActive),
    randomMutePercent: clamp(record.randomMutePercent, FAVORITE_RANDOM_MUTE_MAX),
    speedTrainerEnabled: toBoolean(record.speedTrainerEnabled),
    speedStartTempo: clamp(record.speedStartTempo, FAVORITE_BEAT_MAX, 1),
    speedEndTempo: clamp(record.speedEndTempo, FAVORITE_BEAT_MAX, 1),
    speedStepSize: clamp(record.speedStepSize, 50, 1),
    speedIntervalBars: clamp(record.speedIntervalBars, FAVORITE_BARS_MAX, 1),
    timerMinutes: clamp(record.timerMinutes, 30),
    beatStates: validBeatStates(record.beatStates, beatCount),
  }
}

export function parseFavorites(raw: string | null): Favorite[] {
  if (raw === null || raw === "") return []
  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    return []
  }
  if (!Array.isArray(parsed)) return []

  const result: Favorite[] = []
  const seen = new Set<string>()
  for (const entry of parsed) {
    if (result.length >= FAVORITE_MAX_COUNT) break
    const fav = sanitizeFavoriteRecord(entry)
    if (fav === null) continue
    const key = fav.name.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    result.push(fav)
  }
  return result
}