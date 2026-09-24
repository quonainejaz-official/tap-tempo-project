"use client"

import { useState, useRef, useCallback, useEffect } from "react"

export interface TapData {
  tapIndex: number
  timestamp: number
  instantBpm: number | null
  rollingBpm: number | null
  interval: number | null
}

const MAX_TAPS = 8
const MAX_GRAPH_POINTS = 30
const TIMEOUT_MS = 3000

// Single source of truth for how the "Tap on" bar multiplier is applied:
// the base tapped BPM (rounded 60000/interval, existing formula) is computed
// first, then the multiplier is applied once on top of that base BPM.
export function applyTapMultiplier(baseBpm: number, multiplier: number): number {
  return Math.round(baseBpm * multiplier)
}

// Existing single BPM calculation path (instant + weighted rolling), reused by
// both a new tap and an undo (which simply passes one fewer data point).
function computeFromTimes(
  times: number[],
  multiplier: number,
): { instantBpm: number | null; rollingBpm: number | null; rawInterval: number | null } {
  if (times.length < 2) return { instantBpm: null, rollingBpm: null, rawInterval: null }

  const intervals: number[] = []
  for (let i = 1; i < times.length; i++) {
    intervals.push(times[i] - times[i - 1])
  }

  // Instantaneous BPM: BPM from only the most recent interval
  const rawInterval = intervals[intervals.length - 1]
  const instantBpm = applyTapMultiplier(Math.round(60000 / rawInterval), multiplier)

  // Outlier rejection for rolling average (discard >2.5x of simple mean)
  const simpleAvg = intervals.reduce((a, b) => a + b, 0) / intervals.length
  const valid = intervals.filter(v => v < simpleAvg * 2.5)

  let rollingBpm: number | null = null
  if (valid.length > 0) {
    // Weighted: more recent intervals count more
    let weightedSum = 0
    let weightTotal = 0
    valid.forEach((inv, idx) => {
      const w = idx + 1
      weightedSum += inv * w
      weightTotal += w
    })
    const finalAvg = weightedSum / weightTotal
    rollingBpm = applyTapMultiplier(Math.round(60000 / finalAvg), multiplier)
  }

  return { instantBpm, rollingBpm, rawInterval }
}

export function useTapTempo(multiplierRef: { current: number }) {
  const [bpm, setBpm] = useState<number | null>(null)
  const [taps, setTaps] = useState<TapData[]>([])
  const tapTimesRef = useRef<number[]>([])
  const lastTapTimeRef = useRef(0)
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const tapIndexRef = useRef(0)

  const reset = useCallback(() => {
    setBpm(null)
    setTaps([])
    tapTimesRef.current = []
    lastTapTimeRef.current = 0
    tapIndexRef.current = 0
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current)
    localStorage.removeItem("taptempo_last_bpm")
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem("taptempo_last_bpm")
    if (saved) setBpm(Number(saved))
  }, [])

  const tap = useCallback(() => {
    const now = performance.now()

    if (resetTimerRef.current) clearTimeout(resetTimerRef.current)

    // Auto reset after 3s of inactivity
    if (lastTapTimeRef.current > 0 && now - lastTapTimeRef.current > 3000) {
      tapTimesRef.current = []
      tapIndexRef.current = 0
      setTaps([])
      setBpm(null)
    }

    tapTimesRef.current.push(now)
    lastTapTimeRef.current = now
    tapIndexRef.current += 1
    const currentIndex = tapIndexRef.current

    // Keep last 8 taps
    if (tapTimesRef.current.length > MAX_TAPS) tapTimesRef.current.shift()

    const times = tapTimesRef.current
    const { instantBpm, rollingBpm, rawInterval } = computeFromTimes(times, multiplierRef.current)

    if (rollingBpm !== null) {
      setBpm(rollingBpm)
      localStorage.setItem("taptempo_last_bpm", rollingBpm.toString())
    }

    setTaps(prev => {
      const newTap: TapData = {
        tapIndex: currentIndex,
        timestamp: now,
        instantBpm,
        rollingBpm,
        interval: rawInterval,
      }
      // Keep at most 30 points on the graph
      return [...prev.slice(-(MAX_GRAPH_POINTS - 1)), newTap]
    })

    resetTimerRef.current = setTimeout(() => {
      tapTimesRef.current = []
    }, TIMEOUT_MS)
  }, [])

  const undo = useCallback(() => {
    if (tapTimesRef.current.length === 0) return

    tapTimesRef.current.pop()
    lastTapTimeRef.current = performance.now()
    tapIndexRef.current = Math.max(0, tapIndexRef.current - 1)
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current)

    const times = tapTimesRef.current
    const { rollingBpm } = computeFromTimes(times, multiplierRef.current)

    setTaps(prev => prev.slice(0, -1))

    if (rollingBpm !== null) {
      setBpm(rollingBpm)
      localStorage.setItem("taptempo_last_bpm", rollingBpm.toString())
    } else {
      setBpm(null)
      localStorage.removeItem("taptempo_last_bpm")
    }

    resetTimerRef.current = setTimeout(() => {
      tapTimesRef.current = []
    }, TIMEOUT_MS)
  }, [])

  const setBpmValue = useCallback((value: number) => {
    setBpm(value)
    localStorage.setItem("taptempo_last_bpm", value.toString())
  }, [])

  return { bpm, taps, tap, reset, undo, tapCount: tapIndexRef.current, setBpmValue }
}
