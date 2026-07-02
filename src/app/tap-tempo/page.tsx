"use client"

import { useState, useEffect, useRef, useMemo } from "react"
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TapTempoPage() {
  const { bpm, taps, tap, reset, tapCount } = useTapTempo()
  const { state: sleepState, wake, setSleeping } = useSleepDetect()
  const { init, playKick, playClap, playHiHat, playCowbell } = useAudioEngine()

  const [showGraph, setShowGraph] = useState(false)
  const [showMusic, setShowMusic] = useState(true)
  const [sound, setSound] = useState<"kick"|"clap"|"hihat"|"cowbell">("kick")
  const [volume, setVolume] = useState(1)
  const [rings, setRings] = useState<{id: number, time: number}[]>([])
  const [lastMethod, setLastMethod] = useState<"touch"|"keyboard"|"space"|null>(null)
  const ringIdRef = useRef(0)

  const displayBpm = useSpring(0, { stiffness: 300, damping: 30 })
  const roundedBpm = useTransform(displayBpm, v => Math.round(v))

  useEffect(() => {
    if (bpm !== null) {
      displayBpm.set(bpm)
    } else {
      displayBpm.set(0)
    }
  }, [bpm, displayBpm])

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

    // Add rings
    const now = Date.now()
    ringIdRef.current += 1
    setRings(prev => [...prev.slice(-4), { id: ringIdRef.current, time: now }])

    // Audio
    if (showMusic) {
      if (sound === "kick") playKick(volume)
      if (sound === "clap") playClap(volume)
      if (sound === "hihat") playHiHat(volume)
      if (sound === "cowbell") playCowbell(volume)
    }

    wake()
  }

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation()
    reset()
    setRings([])
  }

  const copyBpm = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (bpm) {
      navigator.clipboard.writeText(bpm.toString())
      toast.success("Copied to clipboard!")
    }
  }

  const isStable = tapCount >= 4

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-4xl font-serif font-bold tracking-tight mb-2">Tap Tempo</h1>
        <p className="text-muted-foreground">Tap any beat with our BPM Tapper to instantly calculate song tempo and beats per minute.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Tap Zone */}
        <div className="lg:col-span-2 flex flex-col">
          <motion.div
            className={`relative flex flex-col items-center justify-center rounded-2xl border bg-card p-12 min-h-[360px] flex-1 cursor-pointer overflow-hidden transition-colors duration-500 select-none touch-manipulation ${sleepState === 'sleeping' ? 'bg-muted/50 border-muted' : isStable ? 'border-primary/50 shadow-glow-accent' : ''}`}
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
                <div className="flex items-center gap-2 mt-4 text-sm tracking-widest uppercase">
                  <Moon className="w-4 h-4" /> Move cursor here to resume
                </div>
              </motion.div>
            ) : (
              <div className="relative z-10 flex flex-col items-center">
                <div className="text-[11px] font-bold tracking-[0.2em] text-muted-foreground mb-4 uppercase">
                  Beats Per Minute
                </div>

                <div className="font-mono text-8xl md:text-[120px] font-bold tracking-tighter leading-none mb-4 text-foreground drop-shadow-sm">
                  {bpm === null ? "---" : <motion.span>{roundedBpm}</motion.span>}
                </div>

                <div className="flex items-center gap-2 h-6">
                  {tapCount > 0 && (
                    <Badge variant={isStable ? "default" : "secondary"} className="font-mono text-xs">
                      {tapCount} taps
                    </Badge>
                  )}
                  {tapCount >= 2 && (
                    <span className={`text-sm ${isStable ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                      {isStable ? (
                        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Stable</span>
                      ) : (
                        "Tap more to stabilize"
                      )}
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 pointer-events-none opacity-60">
              <Badge variant={lastMethod === 'touch' ? 'default' : 'outline'} className="text-xs transition-colors duration-150">Touch</Badge>
              <Badge variant={lastMethod === 'keyboard' ? 'default' : 'outline'} className="text-xs transition-colors duration-150">Key</Badge>
              <Badge variant={lastMethod === 'space' ? 'default' : 'outline'} className="text-xs transition-colors duration-150">Space</Badge>
            </div>
          </motion.div>
        </div>

        {/* Right: Controls + Audio (same height as tap zone) */}
        <div className="flex flex-col gap-4 h-full">
          <div className="flex flex-wrap gap-2 p-4 rounded-xl border bg-card">
            <Button variant="outline" size="sm" className="flex-1 min-w-[80px]" onClick={handleReset} disabled={!bpm}>Reset</Button>
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
                  {bpm ? (
                    <div className="flex justify-between items-center p-3 rounded bg-muted">
                      <span className="font-mono font-bold text-xl">{bpm} BPM</span>
                      <span className="text-sm text-muted-foreground">Just now</span>
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-8">No recent sessions.</p>
                  )}
                </div>
              </DrawerContent>
            </Drawer>
          </div>

          <div className="flex-1 p-4 rounded-xl border bg-card flex flex-col gap-3">
            <Button
              variant={showGraph ? "default" : "outline"}
              size="sm"
              className="w-full"
              onClick={(e) => { e.stopPropagation(); setShowGraph(!showGraph) }}
            >
              <Activity className="w-4 h-4 mr-2" /> {showGraph ? "Hide" : "Show"} Graph
            </Button>
            <Button
              variant={showMusic ? "default" : "outline"}
              size="sm"
              className="w-full"
              onClick={(e) => {
                e.stopPropagation()
                setShowMusic(!showMusic)
                if (!showMusic) init()
              }}
            >
              <Music2 className="w-4 h-4 mr-2" /> {showMusic ? "Hide" : "Show"} Audio
            </Button>
            <AnimatePresence>
              {showMusic && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col gap-4 pt-2 border-t">
                    <div className="flex flex-wrap gap-2">
                      {(["kick", "clap", "hihat", "cowbell"] as const).map(s => (
                        <Button
                          key={s}
                          variant={sound === s ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSound(s)}
                          className="capitalize flex-1 min-w-[70px]"
                        >
                          {s}
                        </Button>
                      ))}
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground w-12">Vol</span>
                      <Slider
                        value={[volume * 100]}
                        onValueChange={(v) => setVolume(v[0] / 100)}
                        max={100}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Graph Content - below grid */}
      <AnimatePresence>
        {showGraph && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mt-6"
          >
            <div className="rounded-xl border bg-card p-4">
              <div className="h-[180px] w-full">
                <TapGraph taps={taps} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SeoContent />
    </div>
  )
}
