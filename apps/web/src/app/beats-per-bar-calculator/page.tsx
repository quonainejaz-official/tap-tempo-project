"use client"

import { useState, useEffect, useRef } from "react"
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
import { Play, Square } from "lucide-react"
import { motion } from "framer-motion"

export default function BeatsPerBarCalculatorPage() {
  const [num, setNum] = useState("4")
  const [den, setDen] = useState("4")
  const [bpm, setBpm] = useState("120")
  const [accents, setAccents] = useState<number[]>([0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentBeat, setCurrentBeat] = useState<number | null>(null)

  const isPlayingRef = useRef(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const beatTimeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const msPerBeat = Number(bpm) > 0 ? (60000 / Number(bpm)) * (4 / Number(den)) : 500

  const toggleAccent = (beat: number) => {
    setAccents((prev) =>
      prev.includes(beat) ? prev.filter((b) => b !== beat) : [...prev, beat],
    )
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
    const snapshots = { accents }
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
          engine.playMetronomeClick(snapshots.accents.includes(currentBeatIndex), 0.3)
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

  const matchedSig = timeSignatures.find((ts) => ts.signature === `${num}/${den}`)

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-4xl font-serif font-bold mb-2 text-center">Beats Per Bar Calculator</h1>
      <p className="text-muted-foreground text-center mb-8">
        Interactive time signature tool with customizable accents.
      </p>

      <div className="flex gap-4 mb-8 justify-center">
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
            onChange={(e) => setBpm(e.target.value)}
            placeholder="BPM"
          />
        </div>
      </div>

      <div className="flex justify-center gap-3 mb-8">
        {Array.from({ length: Number(num) }, (_, i) => (
          <motion.button
            key={i}
            onClick={() => toggleAccent(i)}
            className={`rounded-lg border-2 transition-colors ${
              accents.includes(i) ? "border-primary bg-primary/10" : "border-border"
            } ${currentBeat === i ? "border-primary bg-primary/20 shadow-md" : ""}`}
            style={{ width: 48, height: accents.includes(i) ? 80 : 64 }}
            layout
          >
            <span className="text-xs font-mono">{i + 1}</span>
          </motion.button>
        ))}
      </div>

      <div className="text-center mb-8">
        <Button onClick={play} size="lg">
          {isPlaying ? (
            <><Square className="w-5 h-5 mr-2" /> Stop</>
          ) : (
            <><Play className="w-5 h-5 mr-2" /> Play</>
          )}
        </Button>
        <p className="text-xs text-muted-foreground mt-2">
          Click a beat block to toggle accent
        </p>
      </div>

      {currentBeat !== null && isPlaying && (
        <div className="text-center mb-4">
          <span className="text-2xl font-mono font-bold">Beat {currentBeat + 1}</span>
        </div>
      )}

      {matchedSig && (
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
      )}
    </div>
  )
}
