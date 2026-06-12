"use client"

import { useState, useRef, useCallback, useEffect } from "react"

type SleepState = "idle" | "active" | "sleeping"

export function useSleepDetect(timeoutMs = 5000) {
  const [state, setState] = useState<SleepState>("idle")
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const wake = useCallback(() => {
    setState("active")
    clearTimer()
    timerRef.current = setTimeout(() => {
      setState("sleeping")
    }, timeoutMs)
  }, [timeoutMs, clearTimer])

  const setSleeping = useCallback(() => {
    clearTimer()
    setState("sleeping")
  }, [clearTimer])

  useEffect(() => {
    return () => clearTimer()
  }, [clearTimer])

  return { state, wake, setSleeping }
}
