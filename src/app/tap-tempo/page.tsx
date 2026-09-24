"use client"

import { useState, useEffect, useRef, useMemo, useCallback } from "react"
import { motion, useSpring, useTransform, AnimatePresence } from "framer-motion"
import { useTapTempo, applyTapMultiplier, type TapData } from "@/hooks/use-tap-tempo"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Copy, History, Activity, Music2, Moon, RotateCcw, Target, Undo2 } from "lucide-react"
import { toast } from "sonner"
import { SeoContent } from "@/components/seo-content"

// ─── Tap Graph ───────────────────────────────────────────────────────────────

const PADDING = { top: 16, right: 16, bottom: 28, left: 40 }

function qualityLabel(stdDev: number): { text: string; color: string } {
  if (stdDev < 2)  return { text: "Excellent", color: "#30D158" }
  if (stdDev < 5)  return { text: "Good",      color: "#0066FF" }
  if (stdDev < 10) return { text: "Fair",       color: "#FF9F0A" }
  return              { text: "Poor",       color: "#FF3B30" }
}

function TapGraph({ taps }: { taps: TapData[] }) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [size, setSize] = useState({ w: 400, h: 160 })
  const [tooltip, setTooltip] = useState<{ x: number; y: number; label: string } | null>(null)

  useEffect(() => {
    if (!svgRef.current) return
    const ro = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect
      setSize({ w: width, h: height })
    })
    ro.observe(svgRef.current)
    return () => ro.disconnect()
  }, [])

  const points = useMemo(
    () => taps.filter(t => t.instantBpm !== null) as (TapData & { instantBpm: number })[],
    [taps]
  )

  const avgBpm = useMemo(() => {
    if (points.length === 0) return null
    return points.reduce((s, p) => s + p.instantBpm, 0) / points.length
  }, [points])

  const stdDev = useMemo(() => {
    if (points.length < 2 || avgBpm === null) return null
    const variance = points.reduce((s, p) => s + (p.instantBpm - avgBpm) ** 2, 0) / points.length
    return Math.sqrt(variance)
  }, [points, avgBpm])

  const { w, h } = size
  const innerW = w - PADDING.left - PADDING.right
  const innerH = h - PADDING.top - PADDING.bottom

  const allBpms = points.map(p => p.instantBpm)
  const minBpm = allBpms.length > 0 ? Math.min(...allBpms) : 60
  const maxBpm = allBpms.length > 0 ? Math.max(...allBpms) : 140
  const padding = Math.max((maxBpm - minBpm) * 0.3, 10)
  const yMin = minBpm - padding
  const yMax = maxBpm + padding

  const toX = (i: number) =>
    points.length <= 1
      ? PADDING.left + innerW / 2
      : PADDING.left + (i / (points.length - 1)) * innerW

  const toY = (bpmVal: number) =>
    PADDING.top + innerH - ((bpmVal - yMin) / (yMax - yMin)) * innerH

  const polylinePoints = points.map((p, i) => `${toX(i)},${toY(p.instantBpm)}`).join(" ")
  const avgY = avgBpm !== null ? toY(avgBpm) : null

  const yTicks = [yMin, (yMin + yMax) / 2, yMax].map(v => Math.round(v))

  const quality = stdDev !== null ? qualityLabel(stdDev) : null

  if (points.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
        Tap to draw graph
      </div>
    )
  }

    return (
      <div className="h-full flex flex-col gap-2 overflow-hidden">
        {/* Quality badge */}
      <div className="flex items-center justify-between text-xs px-1">
        <span className="text-muted-foreground">
          {points.length} point{points.length !== 1 ? "s" : ""}
          {avgBpm !== null && <> · avg {Math.round(avgBpm)} BPM</>}
        </span>
        {quality && stdDev !== null && (
          <span className="font-medium" style={{ color: quality.color }}>
            ±{stdDev.toFixed(1)} BPM variance — {quality.text}
          </span>
        )}
      </div>

      {/* SVG */}
      <div className="relative flex-1 min-h-0">
        <svg
          ref={svgRef}
          className="w-full h-full overflow-visible"
          onMouseLeave={() => setTooltip(null)}
        >
          {/* Grid lines */}
          {yTicks.map(tick => {
            const y = toY(tick)
            return (
              <g key={tick}>
                <line
                  x1={PADDING.left} y1={y}
                  x2={PADDING.left + innerW} y2={y}
                  stroke="currentColor" strokeOpacity={0.08} strokeWidth={1}
                />
                <text
                  x={PADDING.left - 6} y={y + 4}
                  textAnchor="end" fontSize={9}
                  fill="currentColor" fillOpacity={0.4}
                >
                  {tick}
                </text>
              </g>
            )
          })}

          {/* Axes */}
          <line x1={PADDING.left} y1={PADDING.top} x2={PADDING.left} y2={PADDING.top + innerH}
            stroke="currentColor" strokeOpacity={0.2} strokeWidth={1} />
          <line x1={PADDING.left} y1={PADDING.top + innerH} x2={PADDING.left + innerW} y2={PADDING.top + innerH}
            stroke="currentColor" strokeOpacity={0.2} strokeWidth={1} />

          {/* Average dashed line */}
          {avgY !== null && (
            <line
              x1={PADDING.left} y1={avgY}
              x2={PADDING.left + innerW} y2={avgY}
              stroke="#0066FF" strokeOpacity={0.4} strokeWidth={1}
              strokeDasharray="4 3"
            />
          )}

          {/* BPM polyline */}
          {points.length >= 2 && (
            <polyline
              points={polylinePoints}
              fill="none"
              stroke="#0066FF"
              strokeWidth={2}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          )}

          {/* Data points */}
          {points.map((p, i) => {
            const cx = toX(i)
            const cy = toY(p.instantBpm)
            return (
              <g key={p.tapIndex}>
                {/* Hit area */}
                <circle
                  cx={cx} cy={cy} r={10}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => {
                    setTooltip({
                      x: cx,
                      y: cy - 14,
                      label: `Tap ${i + 1}: ${p.instantBpm} BPM`,
                    })
                  }}
                />
                <motion.circle
                  cx={cx} cy={cy} r={4.5}
                  fill="#0066FF"
                  stroke="white" strokeWidth={1.5}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                />
              </g>
            )
          })}

          {/* Tooltip */}
          {tooltip && (
            <g>
              <rect
                x={tooltip.x - 46} y={tooltip.y - 16}
                width={92} height={20} rx={4}
                fill="#0A0A0A" stroke="#0066FF" strokeWidth={0.8} strokeOpacity={0.6}
              />
              <text
                x={tooltip.x} y={tooltip.y - 2}
                textAnchor="middle" fontSize={10} fill="white"
              >
                {tooltip.label}
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}

// ─── SectionCard (matches the Metronome page's right-panel header pattern) ────

function SectionCard({
  icon,
  title,
  children,
  className = "",
  bodyClassName = "",
}: {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
  className?: string
  bodyClassName?: string
}) {
  return (
    <div className={`rounded-xl border bg-card overflow-hidden ${className}`}>
      <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 border-b border-gray-100">
        <span className="flex items-center justify-center w-6 h-6 rounded-md bg-blue-100 text-[#1565FF] shrink-0">
          {icon}
        </span>
        <span className="text-xs font-bold uppercase tracking-wider text-gray-800">{title}</span>
      </div>
      <div className={`p-2.5 ${bodyClassName}`}>{children}</div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

// "Tap on" time-signature grouping. Multiplier applied once on top of the base
// tapped BPM (per-bar beat counts): 4/4 = 4 beats, 3/4 = 3 beats, 6/8 = 6 beats.
// For 6/8 the beat count matches the metronome tool's interpretation
// (top number of the signature = beats per bar; see metronome-widget.tsx).
const TAP_ON_OPTIONS = [
  { value: "beat", label: "Every beat", multiplier: 1 },
  { value: "bar_44", label: "Every bar (4/4)", multiplier: 4 },
  { value: "bar_34", label: "Every bar (3/4)", multiplier: 3 },
  { value: "bar_68", label: "Every bar (6/8)", multiplier: 6 },
] as const

type TapOnValue = (typeof TAP_ON_OPTIONS)[number]["value"]

function getTempoMarking(bpm: number): string {
  if (bpm < 25) return "Larghissimo"
  if (bpm < 45) return "Grave"
  if (bpm < 60) return "Largo"
  if (bpm < 66) return "Larghetto"
  if (bpm < 76) return "Adagio"
  if (bpm < 108) return "Andante"
  if (bpm < 120) return "Moderato"
  if (bpm < 156) return "Allegro"
  if (bpm < 176) return "Vivace"
  if (bpm < 200) return "Presto"
  return "Prestissimo"
}

export default function TapTempoPage() {
  const tapOnMultiplierRef = useRef(1)
  const { bpm, taps, tap, reset, undo, tapCount, setBpmValue } = useTapTempo(tapOnMultiplierRef)
  const { state: sleepState, wake, setSleeping } = useSleepDetect()
  const { playKick, playClap, playHiHat, playCowbell } = useAudioEngine()

  const [showGraph, setShowGraph] = useState(false)
  const [showMusic, setShowMusic] = useState(false)
  const [sound, setSound] = useState<"kick"|"clap"|"hihat"|"cowbell">("kick")
  const [volume, setVolume] = useState(1)
  const [metronomePlaying, setMetronomePlaying] = useState(false)
  const [metronomeDot, setMetronomeDot] = useState(0)
  const metronomeTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [rings, setRings] = useState<{id: number, time: number}[]>([])
  const [lastMethod, setLastMethod] = useState<"touch"|"keyboard"|"space"|null>(null)
  const [bpmScale, setBpmScale] = useState<"asTapped"|"half"|"double">("asTapped")
  const ringIdRef = useRef(0)
  const [autoResetMin, setAutoResetMin] = useState(0)
  const [autoResetSec, setAutoResetSec] = useState(0)
  const [tapOn, setTapOn] = useState<TapOnValue>("beat")
  const tapOnMultiplier = TAP_ON_OPTIONS.find(o => o.value === tapOn)?.multiplier ?? 1

  useEffect(() => {
    tapOnMultiplierRef.current = tapOnMultiplier
  }, [tapOnMultiplier])

  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get("bpm")
    if (raw === null) return
    const parsed = Math.round(parseFloat(raw))
    if (!isNaN(parsed) && isFinite(parsed) && parsed > 0) {
      setBpmValue(parsed)
    }
  }, [setBpmValue])

  const stats = useMemo(() => {
    // AVERAGE BPM across all taps in the session
    const intervalArray = taps.length > 1
      ? Array.from({ length: taps.length - 1 }, (_, i) => taps[i + 1].timestamp - taps[i].timestamp)
      : [];
    const averageInterval = intervalArray.reduce((a, b) => a + b, 0) / intervalArray.length;
    const averageBpm = averageInterval > 0 ? applyTapMultiplier(Math.round(60000 / averageInterval), tapOnMultiplier) : null;

    // LAST 8 TAPS average BPM (rolling window of up to 8 most recent taps)
    const last8 = taps.slice(-8);
    const last8Intervals = last8.length > 1
      ? Array.from({ length: last8.length - 1 }, (_, i) => last8[i + 1].timestamp - last8[i].timestamp)
      : [];
    const last8AvgInterval = last8Intervals.reduce((a, b) => a + b, 0) / last8Intervals.length;
    const last8Bpm = last8AvgInterval > 0 ? applyTapMultiplier(Math.round(60000 / last8AvgInterval), tapOnMultiplier) : null;

    // Raw interval between the two most recent taps (ms)
    const lastInterval = intervalArray.length > 0 ? intervalArray[intervalArray.length - 1] : 0;

    // Total tap count (same logic as existing "X taps" display)
    const totalTaps = tapCount;

    return { averageBpm, last8Bpm, lastInterval, totalTaps };
  }, [taps, tapCount, tapOnMultiplier]);

  const idleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const flashIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const latestBpmRef = useRef<number>(0)
  const [isFlashing, setIsFlashing] = useState(false)

  const autoResetMinRef = useRef(0)
  const autoResetSecRef = useRef(0)
  const autoResetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearAutoResetTimer = () => {
    if (autoResetTimerRef.current) {
      clearTimeout(autoResetTimerRef.current)
      autoResetTimerRef.current = null
    }
  }

  const performReset = () => {
    clearAutoResetTimer()
    stopMetronome()
    reset()
    setRings([])
    if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current)
    if (flashIntervalRef.current) clearInterval(flashIntervalRef.current)
    latestBpmRef.current = 0
    setIsFlashing(false)
  }

  const scheduleAutoReset = () => {
    clearAutoResetTimer()
    const totalMs = (autoResetMinRef.current * 60 + autoResetSecRef.current) * 1000
    if (totalMs <= 0) return
    autoResetTimerRef.current = setTimeout(() => {
      autoResetTimerRef.current = null
      performReset()
    }, totalMs)
  }

  const displayBpm = useSpring(0, { stiffness: 300, damping: 30 })
  const roundedBpm = useTransform(displayBpm, v => Math.round(v))

  const activeBpm = bpm !== null
    ? bpmScale === "half" ? Math.round(bpm / 2)
    : bpmScale === "double" ? Math.round(bpm * 2)
    : bpm
    : null

  const handleBpmScale = (scale: "asTapped"|"half"|"double") => {
    if (scale === "asTapped" && bpmScale === "asTapped") return
    if (scale === "half" && bpmScale === "half") return
    if (scale === "double" && bpmScale === "double") return
    setBpmScale(scale)
  }

  // Reset scale selection whenever the tapped BPM changes (new taps, reset, presets, slider)
  useEffect(() => {
    setBpmScale("asTapped")
  }, [bpm])

  useEffect(() => {
    if (activeBpm !== null) {
      displayBpm.set(activeBpm)
      latestBpmRef.current = bpm ?? 0
    } else {
      displayBpm.set(0)
      latestBpmRef.current = 0
    }
  }, [bpm, activeBpm, displayBpm])

  // Reset scale selection to "As tapped" whenever the tapped BPM changes (new tap or Reset)
  useEffect(() => {
    setBpmScale("asTapped")
  }, [bpm])

  const triggerSingleFlash = useCallback(() => {
    setIsFlashing(true)
    setTimeout(() => setIsFlashing(false), 100)
  }, [])

  const startFlashing = useCallback(() => {
    const latest = latestBpmRef.current
    if (!latest || isNaN(latest) || latest <= 0) return
    if (flashIntervalRef.current) clearInterval(flashIntervalRef.current)
    const intervalMs = (60 / latest) * 1000
    flashIntervalRef.current = setInterval(triggerSingleFlash, intervalMs)
  }, [triggerSingleFlash])

  useEffect(() => {
    return () => {
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current)
      if (flashIntervalRef.current) clearInterval(flashIntervalRef.current)
      clearAutoResetTimer()
    }
  }, [])

  // Global key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (sleepState === 'sleeping') return
      if (e.code === "Space") {
        e.preventDefault()
        handleTap("space")
      } else if (e.code === "Enter" || e.key.length === 1) {
        handleTap("keyboard")
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [sleepState, tap])

  const handleTap = (method: "touch"|"keyboard"|"space") => {
    // On touch, always process — no hover to wake up
    if (method !== "touch" && sleepState === 'sleeping') {
      wake()
      return
    }

    if (sleepState === 'sleeping') {
      wake()
      return
    }

    tap()
    setLastMethod(method)

    // Idle flash: clear timers, update ref, schedule start
    if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current)
    if (flashIntervalRef.current) clearInterval(flashIntervalRef.current)
    setIsFlashing(false)
    latestBpmRef.current = bpm ?? 0
    idleTimeoutRef.current = setTimeout(startFlashing, 1500)

    // Add rings
    const now = Date.now()
    ringIdRef.current += 1
    setRings(prev => [...prev.slice(-4), { id: ringIdRef.current, time: now }])

    // Audio — always active regardless of whether the audio controls are expanded
    if (sound === "kick") playKick(volume)
    if (sound === "clap") playClap(volume)
    if (sound === "hihat") playHiHat(volume)
    if (sound === "cowbell") playCowbell(volume)

    scheduleAutoReset()

    wake()
  }

  const handleUndo = () => {
    undo()
    scheduleAutoReset()
    wake()
  }


  const METRONOME_DOTS = 6

  // Consistent with the 8-12 taps guidance: below this count show a
  // low-confidence message; at/above it the existing "Stable" indicator applies.
  const MIN_CONFIDENCE_TAPS = 8

  const playMetronomeTick = () => {
    if (sound === "kick") playKick(volume)
    if (sound === "clap") playClap(volume)
    if (sound === "hihat") playHiHat(volume)
    if (sound === "cowbell") playCowbell(volume)
  }

  const stopMetronome = () => {
    if (metronomeTimerRef.current) {
      clearInterval(metronomeTimerRef.current)
      metronomeTimerRef.current = null
    }
    setMetronomePlaying(false)
    setMetronomeDot(0)
  }

  const startMetronome = () => {
    stopMetronome()
    if (activeBpm === null || activeBpm <= 0) return
    setMetronomePlaying(true)
    setMetronomeDot(0)
    let step = 0
    const tick = () => {
      playMetronomeTick()
      step += 1
      setMetronomeDot(step)
      if (step >= METRONOME_DOTS) stopMetronome()
    }
    tick()
    metronomeTimerRef.current = setInterval(
      tick,
      Math.max(1, Math.round(60000 / activeBpm))
    )
  }

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation()
    performReset()
  }

  const copyBpm = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (activeBpm) {
      navigator.clipboard.writeText(activeBpm.toString())
      toast.success("Copied to clipboard!")
    }
  }

  const handleTapOnChange = (value: string) => {
    if (!TAP_ON_OPTIONS.some(o => o.value === value)) return
    setTapOn(value as TapOnValue)
    performReset()
  }

  const isStable = tapCount >= 4

  return (
    <div className="container mx-auto max-w-4xl px-4 md:px-6">
      <div className="mt-3 mb-2">
        <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-1 text-foreground">Tap Tempo</h1>
        <p className="text-sm text-muted-foreground">Tap any beat with our BPM Tapper to instantly calculate song tempo and beats per minute.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch mt-3">
        {/* BOX 1: Main Tapper Card */}
        <div className="lg:col-span-2 h-full flex flex-col justify-between rounded-xl border bg-card p-5">
          <motion.div
            className={`relative flex flex-col items-center justify-center min-h-[320px] flex-1 cursor-pointer overflow-hidden transition-colors duration-500 select-none touch-manipulation ${sleepState === 'sleeping' ? 'bg-muted/50 border-muted' : isStable ? 'border-primary/50 shadow-glow-accent' : ''}`}
            onPointerDown={(e) => { e.preventDefault(); handleTap("touch") }}
            onMouseEnter={wake}
            onMouseLeave={setSleeping}
            whileTap={sleepState === 'active' ? { scale: 0.98 } : {}}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <AnimatePresence>
              {rings.map(ring => (
                <motion.div
                  key={ring.id}
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="absolute rounded-full border-2 border-primary/20 pointer-events-none w-64 h-64"
                />
              ))}
            </AnimatePresence>

            {sleepState === 'sleeping' ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center text-muted-foreground"
              >
                <motion.div
                  animate={{ scale: [0.98, 1.02, 0.98] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                >
                  <span className="font-mono text-8xl opacity-20">{bpm || "---"}</span>
                </motion.div>
                <div className="flex items-center gap-2 mt-3 text-sm tracking-widest uppercase">
                  <Moon className="w-4 h-4" /> Move cursor here to resume
                </div>
              </motion.div>
            ) : (
              <div className="relative z-10 flex flex-col items-center">
                <div className={`w-3.5 h-3.5 rounded-full bg-primary/30 opacity-30 transition-all duration-100 inline-block mb-3 ${isFlashing ? "opacity-100 scale-125 bg-primary shadow-[0_0_12px_hsl(var(--primary)/0.8)]" : ""}`} />
                <div className="text-[11px] font-bold tracking-[0.2em] text-muted-foreground mb-4 uppercase">
                  Beats Per Minute
                </div>

                <div className="font-mono text-8xl md:text-[120px] font-bold tracking-tighter leading-none py-7 text-foreground drop-shadow-sm">
                  {activeBpm === null ? "---" : <motion.span>{roundedBpm}</motion.span>}
                </div>
              </div>
            )}

            <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-2 pointer-events-none opacity-60">
              <Badge variant={lastMethod === 'touch' ? 'default' : 'outline'} className="text-xs transition-colors duration-150">Touch</Badge>
              <Badge variant={lastMethod === 'keyboard' ? 'default' : 'outline'} className="text-xs transition-colors duration-150">Key</Badge>
              <Badge variant={lastMethod === 'space' ? 'default' : 'outline'} className="text-xs transition-colors duration-150">Space</Badge>
            </div>

            {sleepState !== "sleeping" && (
              <div className="absolute bottom-2 left-0 right-0 px-4 flex items-center pointer-events-none">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={tapCount === 0}
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={handleUndo}
                  className="pointer-events-auto h-7 gap-1.5 px-2.5 text-xs"
                >
                  <Undo2 className="w-3.5 h-3.5" /> Undo
                </Button>
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-center">
                  {tapCount >= 2 && (
                    tapCount < MIN_CONFIDENCE_TAPS ? (
                      <span className="text-sm text-muted-foreground">Low confidence — keep tapping</span>
                    ) : (
                      <span className={`text-sm ${isStable ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                        {isStable ? (
                          <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Stable
                          </span>
                        ) : (
                          "Tap more to stabilize"
                        )}
                      </span>
                    )
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* BOX 2 & 3: Right Column */}
        <div className="lg:col-span-1 flex flex-col justify-between gap-3.5 h-full">
          <SectionCard icon={<RotateCcw size={14} strokeWidth={2.5} />} title="Session" bodyClassName="p-3 flex flex-col gap-2">
            <Button variant="outline" size="sm" className="w-full" onClick={handleReset} disabled={!bpm}>Reset</Button>
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Auto-Reset after</span>
              <div className="flex items-center gap-1.5">
                <Select value={String(autoResetMin)} onValueChange={(v) => { const val = Number(v); setAutoResetMin(val); autoResetMinRef.current = val; scheduleAutoReset() }}>
                  <SelectTrigger className="h-7 w-14 rounded border border-input bg-transparent px-1.5 text-xs shadow-none focus:ring-1 focus:ring-ring [&>svg]:h-3.5 [&>svg]:w-3.5 [&>svg]:opacity-60">
                    <SelectValue>{String(autoResetMin)}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 11 }, (_, i) => (
                      <SelectItem key={i} value={String(i)}>{i}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="text-xs text-muted-foreground shrink-0">min</span>
                <Select value={String(autoResetSec)} onValueChange={(v) => { const val = Number(v); setAutoResetSec(val); autoResetSecRef.current = val; scheduleAutoReset() }}>
                  <SelectTrigger className="h-7 w-14 rounded border border-input bg-transparent px-1.5 text-xs shadow-none focus:ring-1 focus:ring-ring [&>svg]:h-3.5 [&>svg]:w-3.5 [&>svg]:opacity-60">
                    <SelectValue>{String(autoResetSec)}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 60 }, (_, i) => (
                      <SelectItem key={i} value={String(i)}>{i}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="text-xs text-muted-foreground shrink-0">sec</span>
              </div>
            </div>
          </SectionCard>

          <SectionCard icon={<Music2 size={14} strokeWidth={2.5} />} title="Audio" className="flex-1 flex flex-col" bodyClassName="p-3.5 flex-1 flex flex-col justify-between">
            <Button
              variant={showGraph ? "default" : "outline"}
              size="sm"
              className="w-full py-1.5 px-2.5 text-xs"
              onClick={(e) => { e.stopPropagation(); setShowGraph(!showGraph) }}
            >
              <Activity className="w-3.5 h-3.5 mr-1.5" /> {showGraph ? "Hide" : "Show"} Graph
            </Button>
            <div className="flex flex-wrap gap-1.5">
              <Button variant="outline" size="sm" className="flex-1 min-w-[80px]" onClick={copyBpm} disabled={!bpm}>
                <Copy className="w-4 h-4 mr-2" /> Copy
              </Button>
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline" size="sm" className="flex-1 min-w-[80px]" disabled={!bpm}>
                    <History className="w-4 h-4 mr-2" /> History
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Recent Sessions</DrawerTitle>
                  </DrawerHeader>
                  <div className="p-4 flex flex-col gap-2 max-w-sm mx-auto w-full">
                    {activeBpm ? (
                      <div className="flex justify-between items-center p-3 rounded bg-muted">
                        <span className="font-mono font-bold text-xl">{activeBpm} BPM</span>
                        <span className="text-sm text-muted-foreground">Just now</span>
                      </div>
                    ) : (
                      <p className="text-center text-muted-foreground py-8">No recent sessions.</p>
                    )}
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
            <Button
              variant={showMusic ? "default" : "outline"}
              size="sm"
              className="w-full py-1.5 px-2.5 text-xs"
              onClick={(e) => {
                e.stopPropagation()
                setShowMusic(!showMusic)
              }}
            >
              <Music2 className="w-3.5 h-3.5 mr-1.5" /> {showMusic ? "Hide" : "Show"} Audio
            </Button>
            <AnimatePresence>
              {showMusic && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col gap-2 pt-2 border-t">
                    <div className="flex flex-wrap gap-1.5">
                      {(["kick", "clap", "hihat", "cowbell"] as const).map(s => (
                        <Button
                          key={s}
                          variant={sound === s ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSound(s)}
                          className="capitalize flex-1 min-w-[60px] py-1 px-2 text-xs"
                        >
                          {s}
                        </Button>
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-muted-foreground w-8">Vol</span>
                      <Slider
                        value={[volume * 100]}
                        onValueChange={(v) => setVolume(v[0] / 100)}
                        max={100}
                        aria-label="Volume"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </SectionCard>
        </div>
      </div>

      {/* Graph Content - below grid */}
      <AnimatePresence>
        {showGraph && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mt-3"
          >
            <div className="rounded-xl border bg-card p-4">
              <div className="h-[180px] w-full">
                <TapGraph taps={taps} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {activeBpm !== null && activeBpm > 0 && (
        <div className="mt-2 grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
          <div className="lg:col-span-2">
            <div className="p-3 rounded-xl border bg-card/80 min-h-full">
            {/* Row 1: Taps / Interval / Average / Last 8 Taps */}
            <div className="flex flex-col justify-evenly flex-1 gap-1.5">
            <div className="flex flex-col sm:flex-row gap-1.5 sm:w-full sm:grid sm:grid-cols-4">
              <div className="flex flex-col items-center py-1 px-3 rounded border bg-card">
                <span className="text-xs uppercase text-muted-foreground">TAPS</span>
                <span className="font-bold text-sm">{tapCount}</span>
              </div>
              <div className="flex flex-col items-center py-1 px-3 rounded border bg-card">
                <span className="text-xs uppercase text-muted-foreground">INTERVAL</span>
                <span className="font-bold text-sm">{stats.lastInterval > 0 ? `${Math.round(stats.lastInterval)} ms` : "—"}</span>
              </div>
              <div className="flex flex-col items-center py-1 px-3 rounded border bg-card">
                <span className="text-xs uppercase text-muted-foreground">AVERAGE</span>
                <span className="font-bold text-sm">{stats.averageBpm ?? "—"}</span>
              </div>
              <div className="flex flex-col items-center py-1 px-3 rounded border bg-card">
                <span className="text-xs uppercase text-muted-foreground">LAST 8 TAPS</span>
                <span className="font-bold text-sm">{stats.last8Bpm ?? "—"}</span>
              </div>
            </div>
            {/* Row 2: As Tapped / Half-Time / Double-Time / (empty) */}
            <div className="flex flex-col sm:flex-row gap-1.5 mt-1 sm:mt-0 sm:w-full sm:grid sm:grid-cols-4">
              <button
                type="button"
                onClick={() => handleBpmScale("asTapped")}
                className={`flex flex-col items-center py-1 px-3 rounded border cursor-pointer transition-colors ${bpmScale === "asTapped" ? "bg-primary border-primary text-primary-foreground shadow-sm" : "bg-card hover:bg-accent/30"}`}
              >
                <span className={`text-xs uppercase ${bpmScale === "asTapped" ? "text-primary-foreground/80" : "text-muted-foreground"}`}>AS TAPPED</span>
                <span className={`font-bold text-sm ${bpmScale === "asTapped" ? "text-primary-foreground" : ""}`}>{bpm ?? "—"}</span>
              </button>
              <button
                type="button"
                onClick={() => handleBpmScale("half")}
                className={`flex flex-col items-center py-1 px-3 rounded border cursor-pointer transition-colors ${bpmScale === "half" ? "bg-primary border-primary text-primary-foreground shadow-sm" : "bg-card hover:bg-accent/30"}`}
              >
                <span className={`text-xs uppercase ${bpmScale === "half" ? "text-primary-foreground/80" : "text-muted-foreground"}`}>HALF-TIME</span>
                <span className={`font-bold text-sm ${bpmScale === "half" ? "text-primary-foreground" : ""}`}>{Math.round((bpm ?? 0) / 2)}</span>
              </button>
              <button
                type="button"
                onClick={() => handleBpmScale("double")}
                className={`flex flex-col items-center py-1 px-3 rounded border cursor-pointer transition-colors ${bpmScale === "double" ? "bg-primary border-primary text-primary-foreground shadow-sm" : "bg-card hover:bg-accent/30"}`}
              >
                <span className={`text-xs uppercase ${bpmScale === "double" ? "text-primary-foreground/80" : "text-muted-foreground"}`}>DOUBLE-TIME</span>
                <span className={`font-bold text-sm ${bpmScale === "double" ? "text-primary-foreground" : ""}`}>{Math.round((bpm ?? 0) * 2)}</span>
              </button>
              <div className="flex flex-col items-center py-1 px-3 rounded border border-primary/40 bg-primary/[0.04]">
                <span className="text-xs uppercase text-muted-foreground">TAP ON</span>
                <Select value={tapOn} onValueChange={handleTapOnChange}>
                  <SelectTrigger className="h-5 w-full rounded border border-input bg-transparent px-2 text-xs shadow-none focus:ring-1 focus:ring-ring [&>svg]:h-3 [&>svg]:w-3 [&>svg]:opacity-60">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TAP_ON_OPTIONS.map(o => (
                      <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* Bottom: Target / Convert to MS / Delay Calculator */}
            <div className="mt-2 pt-2 border-t flex flex-wrap items-center justify-between gap-2 text-xs md:text-sm">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-muted-foreground font-medium">
                  Target: <strong className="text-foreground font-bold">{activeBpm} BPM</strong>
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary/10 text-primary border border-primary/20">
                  {getTempoMarking(activeBpm)}
                </span>
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <a
                  href={`/bpm-to-ms?bpm=${activeBpm}`}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-primary/10 hover:bg-primary/20 text-primary transition-colors border border-primary/20"
                >
                  Convert to MS ({Math.round(60000 / (activeBpm ?? 0))}ms) →
                </a>
                <a
                  href={`/delay-reverb-time-calculator?bpm=${activeBpm}`}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
                >
                  Delay Calculator →
                </a>
              </div>
            </div>
</div>
            </div>
          </div>
<SectionCard icon={<Target size={14} strokeWidth={2.5} />} title="Metronome Check" className="lg:col-span-1 min-h-full" bodyClassName="flex flex-col gap-3 p-4">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Tap your level, then hit Play to hear the click at the active tempo.
            </p>
            <div className="flex items-center gap-1.5" aria-label="Metronome progress">
              {Array.from({ length: METRONOME_DOTS }).map((_, i) => (
                <span
                  key={i}
                  className={`h-2 w-2 rounded-full transition-colors ${i < metronomeDot ? "bg-primary" : "bg-muted"}`}
                />
              ))}
            </div>
            <Button
              variant={metronomePlaying ? "outline" : "default"}
              size="sm"
              onClick={(e) => { e.stopPropagation(); metronomePlaying ? stopMetronome() : startMetronome() }}
              className="w-full"
            >
              {metronomePlaying ? "Stop click" : "Play click"}
            </Button>
          </SectionCard>
        </div>
      )}

      <SeoContent />

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Need help identifying a tempo?{" "}
          <a href="/ai-tempo" className="text-primary font-medium hover:underline">
            Ask TapTempoAI
          </a>
        </p>
      </div>
    </div>
  )
}
