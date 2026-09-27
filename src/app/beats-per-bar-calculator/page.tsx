"use client"

import { Suspense, useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { timeSignatures } from "@/lib/content/timeSignatures"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AudioEngine } from "@/lib/audio-engine"
import { useAudioEngine } from "@/hooks/use-audio-engine"
import { Play, Square } from "lucide-react"
import { motion } from "framer-motion"
import { BeatsPerBarSeoContent } from "@/components/beats-per-bar-seo-content"

export default function BeatsPerBarCalculatorPage() {
  return (
    <Suspense>
      <BeatsPerBarCalculatorContent />
    </Suspense>
  )
}

function BeatsPerBarCalculatorContent() {
  const searchParams = useSearchParams()
  const [num, setNum] = useState("4")
  const [den, setDen] = useState("4")
  const [bpm, setBpm] = useState("120")
  const [accents, setAccents] = useState<number[]>([0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentBeat, setCurrentBeat] = useState<number | null>(null)
  const [muted, setMuted] = useState<number[]>([])
  const lastValidBpmRef = useRef("120")

  useEffect(() => {
    const param = searchParams.get("bpm")
    if (param) {
      const parsed = parseInt(param, 10)
      if (!isNaN(parsed) && parsed > 0) {
        lastValidBpmRef.current = String(parsed)
        setBpm(String(parsed))
      }
    }
  }, [searchParams])

  const isPlayingRef = useRef(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const beatTimeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const msPerBeat = Number(bpm) > 0 ? (60000 / Number(bpm)) * (4 / Number(den)) : 500

  const { playMetronomeClick } = useAudioEngine()

  const handleBpmChange = (raw: string) => {
    const trimmed = raw.trim()
    const parsed = parseInt(trimmed, 10)
    if (trimmed === "" || isNaN(parsed)) {
      setBpm(lastValidBpmRef.current)
      return
    }
    const clamped = Math.max(1, Math.min(500, parsed))
    lastValidBpmRef.current = String(clamped)
    setBpm(String(clamped))
  }

  const cycleBeatState = (beat: number) => {
    if (muted.includes(beat)) {
      setMuted((prev) => prev.filter((b) => b !== beat))
    } else if (accents.includes(beat)) {
      setAccents((prev) => prev.filter((b) => b !== beat))
      setMuted((prev) => (prev.includes(beat) ? prev : [...prev, beat]))
    } else {
      setAccents((prev) => (prev.includes(beat) ? prev : [...prev, beat]))
    }
  }

  const getBeatClasses = (i: number) => {
    const isAccent = accents.includes(i)
    const isMuted = muted.includes(i)
    const isCurrent = currentBeat === i
    const classes = [
      "rounded-lg border-2 transition-colors flex items-center justify-center",
      isAccent || isCurrent ? "border-primary" : "border-border",
    ]
    if (isCurrent) {
      classes.push("bg-primary/20 shadow-md")
      if (isAccent) classes.push("ring-2 ring-primary")
    } else if (isAccent) {
      classes.push("bg-primary/10")
    } else if (isMuted) {
      classes.push("bg-muted/40")
    }
    return classes.join(" ")
  }

  const clearAllTimeouts = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    beatTimeoutsRef.current.forEach(clearTimeout)
    beatTimeoutsRef.current = []
  }

  const stopPlayback = () => {
    isPlayingRef.current = false
    setIsPlaying(false)
    setCurrentBeat(null)
    clearAllTimeouts()
  }

  const play = () => {
    if (isPlayingRef.current) {
      stopPlayback()
      return
    }

    const engine = AudioEngine.getInstance()
    engine.init()
    if (!engine.ctx) return

    isPlayingRef.current = true
    setIsPlaying(true)

    const n = Number(num)
    const beatDuration = msPerBeat
    const snapshots = { accents, muted }
    let beatIndex = 0
    const startTime = engine.ctx.currentTime

    const scheduler = () => {
      if (!isPlayingRef.current) return

      const lookahead = 0.1
      while (true) {
        const elapsed = engine.ctx!.currentTime - startTime
        const nextBeatTime = beatIndex * (beatDuration / 1000)
        if (nextBeatTime - elapsed > lookahead) break

        const delay = Math.max(0, (nextBeatTime - elapsed) * 1000)
        const currentBeatIndex = beatIndex % n

        const audioTid = setTimeout(() => {
          if (!snapshots.muted.includes(currentBeatIndex)) {
            playMetronomeClick(snapshots.accents.includes(currentBeatIndex), 0.3)
          }
        }, delay)
        beatTimeoutsRef.current.push(audioTid)

        const visualTid = setTimeout(() => {
          setCurrentBeat(currentBeatIndex)
        }, delay)
        beatTimeoutsRef.current.push(visualTid)

        beatIndex++
      }

      timeoutRef.current = setTimeout(scheduler, 25)
    }

    scheduler()
  }

  useEffect(() => {
    return () => {
      isPlayingRef.current = false
      clearAllTimeouts()
    }
  }, [])

  useEffect(() => {
    if (isPlayingRef.current) stopPlayback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [num, den, bpm])

  const matchedSig = timeSignatures.find((ts) => ts.signature === `${num}/${den}`)

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-serif font-bold mb-2 text-center">Beats Per Bar Calculator</h1>
      <p className="text-muted-foreground text-center mb-8">
        Interactive time signature tool with customizable accents.
      </p>

      <div className="rounded-xl border bg-card overflow-hidden shadow-sm mb-8">
        <div className="p-6">
          <div className="flex gap-4 justify-center">
            <div className="w-24">
              <Select value={num} onValueChange={setNum}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => (
                    <SelectItem key={i + 1} value={String(i + 1)}>
                      {i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center text-2xl text-muted-foreground">/</div>
            <div className="w-24">
              <Select value={den} onValueChange={setDen}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[2, 4, 8, 16].map((d) => (
                    <SelectItem key={d} value={String(d)}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-28">
              <Input
                type="number"
                value={bpm}
                min={1}
                max={500}
                onChange={(e) => handleBpmChange(e.target.value)}
                placeholder="BPM"
              />
            </div>
          </div>

          {parseFloat(bpm) > 0 && (
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-0.5 py-1.5 px-3 rounded-xl border border-primary/20 bg-primary/5">
              <p className="text-xs text-muted-foreground leading-snug">Want to play at this tempo?</p>
              <Link
                href={`/metronome?bpm=${Math.round(parseFloat(bpm))}`}
                className="text-xs font-bold text-primary hover:underline leading-snug"
              >
                Use {Math.round(parseFloat(bpm))} BPM in Metronome →
              </Link>
              <Link
                href={`/tap-tempo?bpm=${Math.round(parseFloat(bpm))}`}
                className="text-xs font-bold text-primary hover:underline leading-snug"
              >
                Use {Math.round(parseFloat(bpm))} BPM in Tap Tempo →
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-xl border bg-card overflow-hidden shadow-sm mb-8">
        <div className="p-6">
          <div className="flex flex-nowrap items-start justify-center gap-1.5 md:gap-2 mb-8">
            {Array.from({ length: Number(num) }, (_, i) => (
              <motion.button
                key={i}
                onClick={() => cycleBeatState(i)}
                className={getBeatClasses(i)}
                style={{
                  flex: "1 1 0",
                  minWidth: 0,
                  maxWidth: 48,
                  aspectRatio: accents.includes(i) ? "0.64" : "0.8",
                }}
                layout
              >
                <span className={`text-[clamp(7px,2vw,12px)] font-mono ${muted.includes(i) ? "opacity-40" : ""}`}>
                  {i + 1}
                </span>
              </motion.button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border bg-muted/30 p-4 text-center">
              <Button onClick={play} size="lg">
                {isPlaying ? (
                  <><Square className="w-5 h-5 mr-2" /> Stop</>
                ) : (
                  <><Play className="w-5 h-5 mr-2" /> Play</>
                )}
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Click a beat block to cycle accent, mute, and normal
              </p>
            </div>
            <div className="rounded-xl border bg-muted/30 p-4 text-center flex items-center justify-center">
              {isPlaying && currentBeat !== null && (
                <span className="text-2xl font-mono font-bold">Beat {currentBeat + 1}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {matchedSig && (
        <div className="rounded-xl border bg-card overflow-hidden shadow-sm mb-8">
          <div className="p-6">
            <div className="p-4 bg-muted rounded-xl">
              <h3 className="font-bold text-lg mb-1">{matchedSig.signature}</h3>
              <p className="text-sm text-muted-foreground">{matchedSig.description}</p>
              <p className="text-sm mt-1">
                <span className="font-medium">Feel:</span> {matchedSig.feel}
              </p>
              <p className="text-sm">
                <span className="font-medium">Examples:</span> {matchedSig.examples}
              </p>
            </div>
          </div>
        </div>
      )}

      <BeatsPerBarSeoContent />

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Have questions about time signatures?{" "}
          <a href="/ai-tempo" className="text-primary font-medium hover:underline">
            Ask TapTempoAI
          </a>
        </p>
      </div>
    </div>
  )
}
