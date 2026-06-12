"use client"

import { useState, useEffect, useRef, useMemo, useCallback } from "react"
import { motion, useSpring, useTransform, AnimatePresence } from "framer-motion"
import { useTapTempo, type TapData } from "@/hooks/use-tap-tempo"
import { useSleepDetect } from "@/hooks/use-sleep-detect"
import { useAudioEngine } from "@/hooks/use-audio-engine"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Slider } from "@/components/ui/slider"
import { Copy, History, Activity, Music2, Moon } from "lucide-react"
import { toast } from "sonner"

function TapGraph({ taps }: { taps: TapData[] }) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [dims, setDims] = useState({ w: 600, h: 120 })

  useEffect(() => {
    const el = svgRef.current?.parentElement
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      setDims({ w: entry.contentRect.width, h: 120 })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const { path, avgLine, yTicks, quality } = useMemo(() => {
    if (taps.length < 2) return { path: "", avgLine: null, yTicks: [], quality: "" }
    const pad = { t: 8, b: 8, l: 32, r: 8 }
    const w = dims.w - pad.l - pad.r
    const h = dims.h - pad.t - pad.b
    const bpms = taps.map((t) => t.bpm)
    const minBpm = Math.max(0, Math.min(...bpms) - 10)
    const maxBpm = Math.max(...bpms) + 10
    const range = maxBpm - minBpm || 1
    const xScale = (i: number) => pad.l + (i / (taps.length - 1)) * w
    const yScale = (b: number) => pad.t + ((maxBpm - b) / range) * h
    const avg = bpms.reduce((a, b) => a + b, 0) / bpms.length
    const stdDev = Math.sqrt(bpms.reduce((s, b) => s + (b - avg) ** 2, 0) / bpms.length)
    const q = stdDev < 2 ? "Excellent" : stdDev < 5 ? "Good" : stdDev < 10 ? "Fair" : "Poor"
    const points = taps.map((t, i) => `${xScale(i)},${yScale(t.bpm)}`).join(" ")
    return {
      path: points,
      avgLine: avg,
      yTicks: [minBpm, (minBpm + maxBpm) / 2, maxBpm],
      quality: q,
    }
  }, [taps, dims])

  return (
    <svg ref={svgRef} viewBox={`0 0 ${dims.w} ${dims.h}`} className="w-full h-full overflow-visible">
      {taps.length >= 2 && (
        <>
          <polyline points={path} fill="none" stroke="hsl(var(--primary))" strokeWidth={2} />
          {yTicks.map((y) => (
            <line key={y} x1={0} y1={(dims.h - 8) - ((y - yTicks[0]) / (yTicks[2] - yTicks[0])) * (dims.h - 16)} x2={dims.w} y2={(dims.h - 8) - ((y - yTicks[0]) / (yTicks[2] - yTicks[0])) * (dims.h - 16)} stroke="hsl(var(--border))" strokeWidth={0.5} />
          ))}
        </>
      )}
    </svg>
  )
}

export default function TapTempoPage() {
  const { bpm, taps, tap, reset, tapCount } = useTapTempo()
  const { state, wake } = useSleepDetect()
  const { playKick, playClap, playHiHat, playCowbell } = useAudioEngine()

  const [soundEnabled, setSoundEnabled] = useState(false)
  const [soundType, setSoundType] = useState<"kick" | "clap" | "hihat" | "cowbell">("kick")
  const [volume, setVolume] = useState(0.5)
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([])
  const rippleId = useRef(0)

  const [recentBpms, setRecentBpms] = useState<number[]>([])
  const [lastMethod, setLastMethod] = useState<string>("")

  const handleTap = useCallback(
    (method: string, clientX?: number, clientY?: number) => {
      if (state === "sleeping") {
        wake()
        return
      }
      wake()
      tap()
      setLastMethod(method)

      if (soundEnabled) {
        const soundMap = { kick: playKick, clap: playClap, hihat: playHiHat, cowbell: playCowbell }
        soundMap[soundType](volume)
      }

      if (clientX !== undefined && clientY !== undefined) {
        const id = ++rippleId.current
        setRipples((prev) => [...prev, { id, x: clientX, y: clientY }])
        setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 1000)
      }
    },
    [state, wake, tap, soundEnabled, soundType, volume, playKick, playClap, playHiHat, playCowbell],
  )

  const onMouseTap = (e: React.MouseEvent) => handleTap("click", e.clientX, e.clientY)
  const onTouchTap = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    handleTap("touch", touch?.clientX, touch?.clientY)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault()
        handleTap("keyboard")
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [handleTap])

  useEffect(() => {
    const onSpace = (e: KeyboardEvent) => {
      if (e.key === " ") e.preventDefault()
    }
    window.addEventListener("keydown", onSpace)
    return () => window.removeEventListener("keydown", onSpace)
  }, [])

  useEffect(() => {
    if (bpm > 0) {
      setRecentBpms((prev) => {
        const next = [...prev, bpm]
        return next.length > 10 ? next.slice(-10) : next
      })
    }
  }, [bpm, tapCount])

  const displayBpm = useSpring(bpm, { stiffness: 80, damping: 15 })
  const roundedBpm = useTransform(displayBpm, (v) => Math.round(v))
  const scale = useTransform(displayBpm, [40, 300], [1, 1.3])

  const stability = taps.length >= 4 ? "Stable" : "Locking in..."
  const isSleeping = state === "sleeping" || state === "idle"

  return (
    <div
      className="flex-1 flex flex-col items-center justify-center relative select-none overflow-hidden"
      onMouseDown={onMouseTap}
      onTouchStart={onTouchTap}
    >
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.div
            key={r.id}
            className="absolute pointer-events-none w-20 h-20 rounded-full border-2 border-primary/40"
            style={{ left: r.x - 40, top: r.y - 40 }}
            initial={{ scale: 0.3, opacity: 0.8 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      <motion.div
        className="flex flex-col items-center gap-2"
        animate={{ opacity: isSleeping ? 0.15 : 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.span
          className="text-[22vw] md:text-[15vw] font-mono font-bold leading-none tracking-tighter"
          style={{ scale }}
        >
          {bpm > 0 ? roundedBpm : "—"}
        </motion.span>

        <div className="flex items-center gap-3">
          {bpm > 0 && taps.length >= 4 && (
            <Badge variant="outline" className="text-green-500 border-green-500/50">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse" />
              {stability}
            </Badge>
          )}
          <span className="font-mono text-xs text-muted-foreground">
            {tapCount > 0 ? `${tapCount} tap${tapCount !== 1 ? "s" : ""}` : "Tap anywhere"}
          </span>
        </div>

        {taps.length >= 2 && (
          <div className="w-full max-w-md h-[120px] mt-6">
            <TapGraph taps={taps} />
          </div>
        )}
      </motion.div>

      {isSleeping && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <Moon className="w-16 h-16 text-muted-foreground/30" />
        </motion.div>
      )}

      {/* Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <div className="flex items-center gap-1 bg-background/80 backdrop-blur border rounded-full px-3 py-1.5">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation()
              setSoundEnabled(!soundEnabled)
            }}
          >
            <Music2 className={`w-4 h-4 ${soundEnabled ? "text-primary" : ""}`} />
          </Button>
          {soundEnabled && (
            <>
              <select
                className="text-xs bg-transparent border rounded px-1 py-0.5"
                value={soundType}
                onChange={(e) => setSoundType(e.target.value as any)}
                onClick={(e) => e.stopPropagation()}
              >
                <option value="kick">Kick</option>
                <option value="clap">Clap</option>
                <option value="hihat">HiHat</option>
                <option value="cowbell">Cowbell</option>
              </select>
              <Slider
                value={[volume * 100]}
                onValueChange={([v]) => setVolume(v / 100)}
                min={0}
                max={100}
                className="w-16"
                onClick={(e) => e.stopPropagation()}
              />
            </>
          )}
        </div>

        <Drawer>
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-full"
              onClick={(e) => e.stopPropagation()}
            >
              <History className="w-4 h-4" />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Recent Taps</DrawerTitle>
            </DrawerHeader>
            <div className="px-4 pb-8 max-h-60 overflow-y-auto">
              {recentBpms.length === 0 && (
                <p className="text-sm text-muted-foreground">No recent taps</p>
              )}
              {recentBpms.map((r, i) => (
                <div key={i} className="flex justify-between py-1 font-mono text-sm">
                  <span className="text-muted-foreground">Tap {recentBpms.length - i}</span>
                  <span>{r} BPM</span>
                </div>
              ))}
            </div>
          </DrawerContent>
        </Drawer>

        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 rounded-full"
          onClick={(e) => {
            e.stopPropagation()
            reset()
            setRecentBpms([])
          }}
        >
          <Activity className="w-4 h-4" />
        </Button>

        {bpm > 0 && (
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full"
            onClick={(e) => {
              e.stopPropagation()
              navigator.clipboard.writeText(String(bpm))
              toast("BPM copied")
            }}
          >
            <Copy className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
