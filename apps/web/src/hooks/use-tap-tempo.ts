"use client"

import { useState, useRef, useCallback, useEffect } from "react"

export interface TapData {
  index: number
  bpm: number
  timestamp: number
}

const MAX_TAPS = 8
const MAX_GRAPH_POINTS = 30
const TIMEOUT_MS = 3000

export function useTapTempo() {
  const [bpm, setBpm] = useState(0)
  const [taps, setTaps] = useState<TapData[]>([])
  const [tapCount, setTapCount] = useState(0)
  const timestamps = useRef<number[]>([])
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimeout_ = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const reset = useCallback(() => {
    timestamps.current = []
    setTaps([])
    setBpm(0)
    setTapCount(0)
    clearTimeout_()
  }, [clearTimeout_])

  useEffect(() => {
    const saved = localStorage.getItem("taptempo_last_bpm")
    if (saved) setBpm(Number(saved))
  }, [])

  const tap = useCallback(() => {
    const now = performance.now()
    clearTimeout_()

    timestamps.current.push(now)
    if (timestamps.current.length > MAX_TAPS) {
      timestamps.current.shift()
    }

    setTapCount((c) => c + 1)

    if (timestamps.current.length >= 2) {
      const intervals: number[] = []
      for (let i = 1; i < timestamps.current.length; i++) {
        intervals.push(timestamps.current[i] - timestamps.current[i - 1])
      }

      const mean = intervals.reduce((a, b) => a + b, 0) / intervals.length
      const filtered = intervals.filter((iv) => iv <= mean * 2.5)

      let avgInterval: number
      if (filtered.length === 0) {
        avgInterval = intervals[intervals.length - 1]
      } else {
        const weights = filtered.map((_, i) => (i + 1) / filtered.length)
        const totalWeight = weights.reduce((a, b) => a + b, 0)
        avgInterval =
          filtered.reduce((sum, iv, i) => sum + iv * weights[i], 0) / totalWeight
      }

      const calculatedBpm = avgInterval > 0 ? 60000 / avgInterval : 0
      const rounded = Math.round(calculatedBpm)
      setBpm(rounded)
      localStorage.setItem("taptempo_last_bpm", String(rounded))

      const instantInterval = intervals[intervals.length - 1]
      const instantBpm = instantInterval > 0 ? 60000 / instantInterval : 0

      setTaps((prev) => {
        const newTap: TapData = {
          index: tapCount,
          bpm: Math.round(instantBpm),
          timestamp: now,
        }
        const updated = [...prev, newTap]
        if (updated.length > MAX_GRAPH_POINTS) {
          return updated.slice(updated.length - MAX_GRAPH_POINTS)
        }
        return updated
      })
    }

    timeoutRef.current = setTimeout(() => {
      reset()
    }, TIMEOUT_MS)
  }, [tapCount, clearTimeout_, reset])

  useEffect(() => {
    return () => clearTimeout_()
  }, [clearTimeout_])

  return { bpm, taps, tap, reset, tapCount }
}
