"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { AudioEngine } from "@/lib/audio-engine"
import { Slider } from "@/components/ui/slider"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Hand, Plus, Minus } from "lucide-react"

const MAX_TAPS = 8
const RESET_MS = 3000

export type BeatState = "A" | "N" | "G" | "M"

const BEAT_SOUNDS: Record<BeatState, { frequency: number; gain: number; decay: number }> = {
  A: { frequency: 880, gain: 1.0, decay: 0.05 },
  N: { frequency: 440, gain: 0.7, decay: 0.05 },
  G: { frequency: 330, gain: 0.25, decay: 0.03 },
  M: { frequency: 0, gain: 0.0, decay: 0 },
}

const SCHEDULER_LOOKAHEAD = 0.1
const SCHEDULER_INTERVAL = 25

function calcBpm(timestamps: number[]): number | null {
  if (timestamps.length < 2) return null
  const intervals: number[] = []
  for (let i = 1; i < timestamps.length; i++) {
    intervals.push(timestamps[i] - timestamps[i - 1])
  }
  const sorted = [...intervals].sort((a, b) => a - b)
  const median = sorted[Math.floor(sorted.length / 2)]
  const filtered = intervals.filter(v => v < median * 2.5)
  if (filtered.length === 0) return null
  let weightedSum = 0
  let weightTotal = 0
  filtered.forEach((v, i) => {
    const w = i >= filtered.length / 2 ? 2 : 1
    weightedSum += v * w
    weightTotal += w
  })
  const avgMs = weightedSum / weightTotal
  return Math.round(60000 / avgMs)
}

const presets = [
  { label: "Largo", val: 50 },
  { label: "Andante", val: 90 },
  { label: "Moderato", val: 110 },
  { label: "Allegro", val: 140 },
  { label: "Vivace", val: 170 },
]

const quickTempoPresets = [60, 100, 140, 180, 220, 260]

interface TapButtonProps {
  tapPulse: boolean
  onTap: (e: { preventDefault: () => void }) => void
}

function TapButton({ tapPulse, onTap }: TapButtonProps) {
  return (
    <button
      onPointerDown={onTap}
      className={`relative flex flex-col items-center justify-center w-14 h-14 rounded-xl border-2 select-none cursor-pointer transition-all duration-100 active:scale-95 shrink-0 ${
        tapPulse ? "border-[#1565FF] bg-[#1565FF]/10" : "border-[#D9D9D9] bg-white shadow-sm hover:border-[#1565FF] hover:shadow-md"
      }`}
    >
      <Hand size={18} className={`mb-0.5 transition-colors ${tapPulse ? "text-[#1565FF]" : "text-[#767676]"}`} />
      <span className={`text-[7px] font-bold uppercase tracking-[0.15em] transition-colors ${tapPulse ? "text-[#1565FF]" : "text-[#767676]"}`}>
        TAP
      </span>
      {tapPulse && <span className="absolute inset-0 rounded-xl border-2 border-[#1565FF] animate-ping opacity-30" />}
    </button>
  )
}

const TIMER_PRESETS: { label: string; minutes: number }[] = [
  { label: "Off", minutes: 0 },
  { label: "1 min", minutes: 1 },
  { label: "3 min", minutes: 3 },
  { label: "5 min", minutes: 5 },
  { label: "7 min", minutes: 7 },
  { label: "10 min", minutes: 10 },
  { label: "15 min", minutes: 15 },
  { label: "20 min", minutes: 20 },
  { label: "30 min", minutes: 30 },
]

export type Subdivision = "none" | "quarter" | "eighth" | "triplet" | "sixteenth"
export const subdivisions: { label: string; value: Subdivision; clicks: number }[] = [
  { label: "None", value: "none", clicks: 1 },
  { label: "1/4", value: "quarter", clicks: 1 },
  { label: "1/8", value: "eighth", clicks: 2 },
  { label: "1/3", value: "triplet", clicks: 3 },
  { label: "1/16", value: "sixteenth", clicks: 4 },
]

export type SwingPreset = "straight" | "triplet" | "dotted" | "swing" | "custom"
const swingPresets: { label: string; value: Exclude<SwingPreset, "custom">; fraction: number }[] = [
  { label: "Straight", value: "straight", fraction: 0.5 },
  { label: "Triplet", value: "triplet", fraction: 2 / 3 },
  { label: "Dotted", value: "dotted", fraction: 3 / 4 },
  { label: "Swing", value: "swing", fraction: 2 / 3 },
]

interface QueueNote {
  time: number
  beatIndex: number
  beatState: BeatState
  isSubdivision: boolean
}

interface Favorite {
  name: string
  bpm: number
  volume: number
  signature: string
  customTimeActive: boolean
  customBeats: number | null
  customUnit: 4 | 8 | 16
  soundStyle: "click" | "beep" | "woodblock" | "cowbell" | "snare"
  subdivision: Subdivision
  swing: number
  swingPreset: SwingPreset
  isGapActive: boolean
  playBars: number
  silentBars: number
  isRandomMuteActive: boolean
  randomMutePercent: number
  timerMinutes: number
  beatStates: BeatState[]
}

interface MetronomeWidgetProps {
  defaultSubdivision?: Subdivision
  showSubdivisions?: boolean
  defaultBpm?: number
  defaultSignature?: string
  defaultBeatStates?: BeatState[]
  defaultSound?: "click" | "beep" | "woodblock" | "cowbell" | "snare"
  defaultGapClick?: boolean
  defaultPlayBars?: number
  defaultSilentBars?: number
  defaultRandomMute?: boolean
  defaultRandomMutePercent?: number
}

export function MetronomeWidget({
  defaultSubdivision = "quarter",
  showSubdivisions = true,
  defaultBpm,
  defaultSignature,
  defaultBeatStates,
  defaultSound,
  defaultGapClick,
  defaultPlayBars,
  defaultSilentBars,
  defaultRandomMute,
  defaultRandomMutePercent,
}: MetronomeWidgetProps) {
  const [bpm, setBpm] = useState(defaultBpm ?? 120)
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(0.8)
  const [signature, setSignature] = useState(defaultSignature ?? "4/4")
  const [customTimeActive, setCustomTimeActive] = useState(false)
  const [customBeats, setCustomBeats] = useState<number | null>(null)
  const [customUnit, setCustomUnit] = useState<4 | 8 | 16>(4)
  const [beat, setBeat] = useState(-1)
  const [soundStyle, setSoundStyle] = useState<"click" | "beep" | "woodblock" | "cowbell" | "snare">(defaultSound ?? "click")
  const [subdivision, setSubdivision] = useState<Subdivision>(defaultSubdivision)
  const [swing, setSwing] = useState(0.5)
  const [swingPreset, setSwingPreset] = useState<SwingPreset>("straight")
  const [tapPulse, setTapPulse] = useState(false)
  const [beatStates, setBeatStates] = useState<BeatState[]>(defaultBeatStates ?? ["N", "N", "N", "N"])
  const [pulseActive, setPulseActive] = useState(false)
  const [pulseState, setPulseState] = useState<BeatState>("N")
  const [isGapActive, setIsGapActive] = useState(defaultGapClick ?? false)
  const [playBars, setPlayBars] = useState(defaultPlayBars ?? 2)
  const [silentBars, setSilentBars] = useState(defaultSilentBars ?? 2)
  const [isRandomMuteActive, setIsRandomMuteActive] = useState(defaultRandomMute ?? false)
  const [randomMutePercent, setRandomMutePercent] = useState(defaultRandomMutePercent ?? 15)
  const [quickTempoSelection, setQuickTempoSelection] = useState<number | null>(null)

  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [isSavingFavorite, setIsSavingFavorite] = useState(false)
  const [favoriteName, setFavoriteName] = useState("")

  const [timerMinutes, setTimerMinutes] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [isTimerActive, setIsTimerActive] = useState(false)

  const tapTimestampsRef = useRef<number[]>([])
  const tapResetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const rafRef = useRef<number | null>(null)
  const schedulerTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const nextNoteTimeRef = useRef(0)
  const currentBeatRef = useRef(0)
  const subdBeatRef = useRef(0)
  const notesInQueueRef = useRef<QueueNote[]>([])
  const scheduleNotesRef = useRef<(() => void) | null>(null)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const engineRef = useRef<AudioEngine | null>(null)
  const initializedRef = useRef(false)

  const bpmRef = useRef(bpm)
  const volumeRef = useRef(volume)
  const numBeatsRef = useRef(parseInt(signature.split("/")[0]))
  const soundStyleRef = useRef<"click" | "beep" | "woodblock" | "cowbell" | "snare">(defaultSound ?? "click")
  const subdRef = useRef(subdivision)
  const swingRef = useRef(swing)
  const beatStatesRef = useRef(beatStates)
  const signatureRef = useRef(signature)
  const gapClickRef = useRef(defaultGapClick ?? false)
  const playBarsRef = useRef(defaultPlayBars ?? 2)
  const silentBarsRef = useRef(defaultSilentBars ?? 2)
  const isRandomMuteRef = useRef(defaultRandomMute ?? false)
  const randomMutePercentRef = useRef(defaultRandomMutePercent ?? 25)
  const playingRef = useRef(false)
  const pulseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const barBeatCountRef = useRef(0)
  const barCountRef = useRef(0)

  const timerMinutesRef = useRef(0)
  const timeRemainingRef = useRef(0)
  const isTimerActiveRef = useRef(false)
  const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const lastTickAtRef = useRef(0)

  useEffect(() => { bpmRef.current = bpm }, [bpm])
  useEffect(() => { volumeRef.current = volume }, [volume])
  useEffect(() => { soundStyleRef.current = soundStyle }, [soundStyle])
  useEffect(() => { subdRef.current = subdivision }, [subdivision])
  useEffect(() => { swingRef.current = swing }, [swing])
  useEffect(() => { beatStatesRef.current = beatStates }, [beatStates])
  useEffect(() => { signatureRef.current = signature }, [signature])
  useEffect(() => { gapClickRef.current = isGapActive }, [isGapActive])
  useEffect(() => { playBarsRef.current = playBars }, [playBars])
  useEffect(() => { silentBarsRef.current = silentBars }, [silentBars])
  useEffect(() => { isRandomMuteRef.current = isRandomMuteActive }, [isRandomMuteActive])
  useEffect(() => { randomMutePercentRef.current = randomMutePercent }, [randomMutePercent])

  useEffect(() => { timerMinutesRef.current = timerMinutes }, [timerMinutes])
  useEffect(() => { timeRemainingRef.current = timeRemaining }, [timeRemaining])
  useEffect(() => { isTimerActiveRef.current = isTimerActive }, [isTimerActive])

  useEffect(() => {
    const nb = parseInt(signature.split("/")[0])
    numBeatsRef.current = nb
    setBeatStates(prev => {
      if (prev.length === nb) return prev
      const next = [...prev]
      while (next.length < nb) next.push("N")
      return next.slice(0, nb)
    })
  }, [signature])

  useEffect(() => {
    if (defaultBpm !== undefined) return
    const saved = localStorage.getItem("taptempo_last_bpm")
    if (saved) {
      const parsed = parseInt(saved, 10)
      if (!isNaN(parsed)) setBpm(Math.max(1, Math.min(500, parsed)))
    }
  }, [defaultBpm])

  useEffect(() => {
    try {
      const raw = localStorage.getItem("taptempo_favorites")
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) setFavorites(parsed as Favorite[])
      }
    } catch {
      setFavorites([])
    }
  }, [])

  const initAudio = useCallback(() => {
    const engine = AudioEngine.getInstance()
    engine.init()
    engineRef.current = engine
    audioCtxRef.current = engine.ctx
    initializedRef.current = true
  }, [])

  const stopScheduler = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    if (schedulerTimerRef.current !== null) {
      clearInterval(schedulerTimerRef.current)
      schedulerTimerRef.current = null
    }
    notesInQueueRef.current = []
  }, [])

  const closeAudio = useCallback(() => {
    stopScheduler()
    if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
      audioCtxRef.current.close().catch(() => {})
    }
    audioCtxRef.current = null
    engineRef.current = null
    initializedRef.current = false
  }, [stopScheduler])

  useEffect(() => {
    const unlockAudio = () => {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        audioCtxRef.current = new AudioContextClass()
      }
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume()
      }
    }

    window.addEventListener("pointerdown", unlockAudio, { once: true })
    window.addEventListener("keydown", unlockAudio, { once: true })

    return () => {
      window.removeEventListener("pointerdown", unlockAudio)
      window.removeEventListener("keydown", unlockAudio)
    }
  }, [])

  const awaitCtxOnStartRef = useRef(false)

  const handlePlayToggle = useCallback(async () => {
    if (!playingRef.current) {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        audioCtxRef.current = new AudioContextClass()
      }
      if (audioCtxRef.current.state === "suspended") {
        await audioCtxRef.current.resume()
      }
      awaitCtxOnStartRef.current = true
      setPlaying(true)
    } else {
      if (isTimerActiveRef.current && timerMinutesRef.current > 0) {
        setTimeRemaining(timerMinutesRef.current * 60)
      }
      setPlaying(false)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      if (schedulerTimerRef.current !== null) clearInterval(schedulerTimerRef.current)
      if (pulseTimerRef.current !== null) clearTimeout(pulseTimerRef.current)
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(() => {})
      }
    }
  }, [])

  const playNote = useCallback((freq: number, vol: number, _decay: number) => {
    const ctx = audioCtxRef.current
    if (!ctx || vol <= 0) return
    const t = ctx.currentTime
    const style = soundStyleRef.current

    if (style === "beep") {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = "sine"
      osc.frequency.setValueAtTime(freq >= 800 ? 1200 : 1000, t)
      gain.gain.setValueAtTime(vol, t)
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.08)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(t)
      osc.stop(t + 0.08)
      return
    }

    if (style === "woodblock") {
      const bufferSize = ctx.sampleRate * 0.04
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1
      const source = ctx.createBufferSource()
      source.buffer = buffer
      const filter = ctx.createBiquadFilter()
      filter.type = "bandpass"
      filter.frequency.value = freq >= 800 ? 2200 : 1600
      filter.Q.value = 1.5
      const gain = ctx.createGain()
      gain.gain.setValueAtTime(vol * 0.6, t)
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.04)
      source.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)
      source.start(t)
      source.stop(t + 0.04)
      return
    }

    if (style === "cowbell") {
      const baseFreq = freq >= 800 ? 880 : 620
      const osc1 = ctx.createOscillator()
      const osc2 = ctx.createOscillator()
      osc1.type = "square"
      osc1.frequency.setValueAtTime(baseFreq, t)
      osc2.type = "square"
      osc2.frequency.setValueAtTime(baseFreq * 2.76, t)
      const filter = ctx.createBiquadFilter()
      filter.type = "bandpass"
      filter.frequency.value = baseFreq * 2
      filter.Q.value = 0.8
      const gain = ctx.createGain()
      gain.gain.setValueAtTime(vol * 0.4, t)
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.06)
      osc1.connect(filter)
      osc2.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)
      osc1.start(t)
      osc2.start(t)
      osc1.stop(t + 0.06)
      osc2.stop(t + 0.06)
      return
    }

    if (style === "snare") {
      const bufferSize = ctx.sampleRate * 0.09
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1
      const source = ctx.createBufferSource()
      source.buffer = buffer
      const filter = ctx.createBiquadFilter()
      filter.type = "highpass"
      filter.frequency.value = freq >= 800 ? 2400 : 1800
      filter.Q.value = 0.6
      const noiseGain = ctx.createGain()
      noiseGain.gain.setValueAtTime(vol * 0.65, t)
      noiseGain.gain.exponentialRampToValueAtTime(0.01, t + 0.045)
      const osc = ctx.createOscillator()
      osc.type = "triangle"
      osc.frequency.setValueAtTime(freq >= 800 ? 205 : 175, t)
      const oscGain = ctx.createGain()
      oscGain.gain.setValueAtTime(vol * 0.45, t)
      oscGain.gain.exponentialRampToValueAtTime(0.01, t + 0.055)
      source.connect(filter)
      filter.connect(noiseGain)
      noiseGain.connect(ctx.destination)
      osc.connect(oscGain)
      oscGain.connect(ctx.destination)
      source.start(t)
      source.stop(t + 0.09)
      osc.start(t)
      osc.stop(t + 0.06)
      return
    }

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.frequency.setValueAtTime(freq >= 800 ? 880 : 660, t)
    gain.gain.setValueAtTime(vol, t)
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.05)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(t)
    osc.stop(t + 0.05)
  }, [])

  const scheduleNotes = useCallback(() => {
    const ctx = audioCtxRef.current
    if (!ctx) return

    const subd = subdivisions.find(s => s.value === subdRef.current)
    const clicksPerBeat = subdRef.current === "none" ? 1 : (subd ? subd.clicks : 1)
    const numBeats = numBeatsRef.current

    while (nextNoteTimeRef.current < ctx.currentTime + SCHEDULER_LOOKAHEAD) {
      const isSubdClick = subdBeatRef.current > 0
      const beatIdx = currentBeatRef.current % beatStatesRef.current.length
      const state = beatStatesRef.current[beatIdx]

      let isMuted = false

      if (!isSubdClick) {
        const isNewBar = barBeatCountRef.current === 0
        if (isNewBar && gapClickRef.current) {
          const totalBars = playBarsRef.current + silentBarsRef.current
          const currentBar = barCountRef.current % totalBars
          isMuted = currentBar >= playBarsRef.current
        }
        if (!isMuted && isRandomMuteRef.current && randomMutePercentRef.current > 0) {
          isMuted = Math.random() * 100 < randomMutePercentRef.current
        }

        barBeatCountRef.current++
        if (barBeatCountRef.current >= numBeats) {
          barBeatCountRef.current = 0
          barCountRef.current++
        }
      } else {
        if (gapClickRef.current) {
          const totalBars = playBarsRef.current + silentBarsRef.current
          const currentBar = barCountRef.current % totalBars
          isMuted = currentBar >= playBarsRef.current
        }
        if (!isMuted && isRandomMuteRef.current && randomMutePercentRef.current > 0) {
          isMuted = Math.random() * 100 < randomMutePercentRef.current
        }
      }

      const finalState: BeatState = isMuted ? "M" : state
      const { frequency, gain, decay } = BEAT_SOUNDS[finalState]
      const vol = gain * volumeRef.current
      if (vol > 0) playNote(frequency, vol, decay)

      notesInQueueRef.current.push({
        time: nextNoteTimeRef.current,
        beatIndex: beatIdx,
        beatState: finalState,
        isSubdivision: isSubdClick,
      })

      const secondsPerBeat = 60.0 / bpmRef.current
      const swingFraction = swingRef.current
      if (clicksPerBeat === 2 && swingFraction !== 0.5) {
        nextNoteTimeRef.current += subdBeatRef.current === 0
          ? secondsPerBeat * swingFraction
          : secondsPerBeat * (1 - swingFraction)
      } else {
        nextNoteTimeRef.current += secondsPerBeat / clicksPerBeat
      }

      subdBeatRef.current = (subdBeatRef.current + 1) % clicksPerBeat
      if (subdBeatRef.current === 0) {
        currentBeatRef.current = (currentBeatRef.current + 1) % numBeats
      }
    }
  }, [playNote])

  // Keep ref always current so scheduler never hits stale closure
  useEffect(() => { scheduleNotesRef.current = scheduleNotes }, [scheduleNotes])

  const animationLoop = useCallback(() => {
    const ctx = audioCtxRef.current
    if (!ctx) return

    const now = ctx.currentTime
    const queue = notesInQueueRef.current

    while (queue.length > 0) {
      if (now - queue[0].time > 0.2) {
        queue.shift()
        continue
      }
      if (queue[0].time > now) break
      const note = queue.shift()!

      if (note.beatState !== "M" && !note.isSubdivision) {
        setBeat(note.beatIndex)
      }

      if (note.beatState !== "M") {
        if (pulseTimerRef.current !== null) clearTimeout(pulseTimerRef.current)
        setPulseState(note.beatState)
        setPulseActive(true)
        pulseTimerRef.current = setTimeout(() => setPulseActive(false), 150)
      }
    }

    rafRef.current = requestAnimationFrame(animationLoop)
  }, [])

  const startScheduler = useCallback(() => {
    const ctx = audioCtxRef.current
    if (!ctx) return

    currentBeatRef.current = 0
    subdBeatRef.current = 0
    barBeatCountRef.current = 0
    barCountRef.current = 0
    nextNoteTimeRef.current = ctx.currentTime + 0.05
    notesInQueueRef.current = []

    // Use ref so the interval always calls the latest scheduleNotes
    schedulerTimerRef.current = setInterval(() => scheduleNotesRef.current?.(), SCHEDULER_INTERVAL)
    rafRef.current = requestAnimationFrame(animationLoop)
  }, [animationLoop])

  useEffect(() => {
    playingRef.current = playing
    if (playing) {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        audioCtxRef.current = new AudioContextClass()
      }
      const ctx = audioCtxRef.current
      const resumeAndStart = async () => {
        if (ctx.state === "suspended") {
          await ctx.resume()
        }
        awaitCtxOnStartRef.current = false
        startScheduler()
      }
      if (awaitCtxOnStartRef.current || ctx.state === "suspended") {
        resumeAndStart()
      } else {
        startScheduler()
      }
    } else {
      awaitCtxOnStartRef.current = false
      stopScheduler()
      setBeat(-1)
      setPulseActive(false)
      if (pulseTimerRef.current !== null) clearTimeout(pulseTimerRef.current)
      notesInQueueRef.current = []
    }
  }, [playing, startScheduler, stopScheduler])

  const selectTimerPreset = useCallback((minutes: number) => {
    if (minutes === 0) {
      setTimerMinutes(0)
      setTimeRemaining(0)
      setIsTimerActive(false)
      return
    }
    setTimerMinutes(minutes)
    setTimeRemaining(minutes * 60)
    setIsTimerActive(true)
  }, [])

  const playCompletionChime = useCallback(() => {
    const ctx = audioCtxRef.current
    if (!ctx || ctx.state === "closed") return
    if (ctx.state === "suspended") ctx.resume()
    const t = ctx.currentTime
    const notes = [880, 1318.5]
    notes.forEach((freq, i) => {
      const at = t + i * 0.15
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = "sine"
      osc.frequency.setValueAtTime(freq, at)
      gain.gain.setValueAtTime(0.25, at)
      gain.gain.exponentialRampToValueAtTime(0.001, at + 0.3)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(at)
      osc.stop(at + 0.35)
    })
  }, [])

  useEffect(() => {
    if (isTimerActive && timerMinutes > 0 && timeRemaining === 0) {
      setPlaying(false)
      setIsTimerActive(false)
      setTimeRemaining(timerMinutes * 60)
      playCompletionChime()
    }
  }, [timeRemaining, isTimerActive, timerMinutes, playCompletionChime])

  useEffect(() => {
    const shouldRun =
      playing && isTimerActive && timerMinutes > 0 && timeRemainingRef.current > 0
    if (!shouldRun) {
      if (timerIntervalRef.current !== null) {
        clearInterval(timerIntervalRef.current)
        timerIntervalRef.current = null
      }
      return
    }
    if (timerIntervalRef.current !== null) return
    lastTickAtRef.current = Date.now()
    const interval = setInterval(() => {
      if (!playingRef.current || !isTimerActiveRef.current || timerMinutesRef.current === 0) return
      const now = Date.now()
      const elapsed = Math.floor((now - lastTickAtRef.current) / 1000)
      if (elapsed <= 0) return
      lastTickAtRef.current += elapsed * 1000
      setTimeRemaining(prev => Math.max(0, prev - elapsed))
    }, 1000)
    timerIntervalRef.current = interval
    return () => {
      if (timerIntervalRef.current === interval) timerIntervalRef.current = null
      clearInterval(interval)
    }
  }, [playing, isTimerActive, timerMinutes])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === "INPUT") return
      if (e.code === "Space") {
        e.preventDefault()
        handlePlayToggle()
      }
      if (e.code === "KeyT") {
        e.preventDefault()
        fireTap()
      }
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleBpmInput = useCallback((val: number) => {
    const clamped = Math.max(1, Math.min(500, val))
    setBpm(clamped)
    bpmRef.current = clamped
    setQuickTempoSelection(null)
    localStorage.setItem("taptempo_last_bpm", String(clamped))
  }, [])

  const fireTap = useCallback(() => {
    const ctx = audioCtxRef.current
    if (ctx && ctx.state !== "closed") {
      if (ctx.state === "suspended") ctx.resume()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = "sine"
      osc.frequency.setValueAtTime(1400, ctx.currentTime)
      gain.gain.setValueAtTime(0.3, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.04)
    }

    const now = Date.now()
    if (tapResetTimerRef.current) clearTimeout(tapResetTimerRef.current)

    const timestamps = tapTimestampsRef.current
    if (timestamps.length > 0 && now - timestamps[timestamps.length - 1] > RESET_MS) {
      tapTimestampsRef.current = []
      setTapPulse(false)
    }

    tapTimestampsRef.current = [...tapTimestampsRef.current.slice(-(MAX_TAPS - 1)), now]
    const calculated = calcBpm(tapTimestampsRef.current)
    if (calculated !== null) {
      handleBpmInput(calculated)
    }

    setTapPulse(true)
    setTimeout(() => setTapPulse(false), 120)

    tapResetTimerRef.current = setTimeout(() => {
      tapTimestampsRef.current = []
      setTapPulse(false)
    }, RESET_MS)
  }, [handleBpmInput])

  const cycleBeatState = useCallback((index: number) => {
    setBeatStates(prev => {
      const next = [...prev]
      const order: BeatState[] = ["A", "N", "G", "M"]
      const currentIdx = order.indexOf(next[index])
      next[index] = order[(currentIdx + 1) % order.length]
      return next
    })
  }, [])

  const handleCustomBeatsInput = useCallback((raw: string) => {
    const trimmed = raw.trim()
    if (trimmed === "") {
      setCustomBeats(null)
      return
    }
    const parsed = parseInt(trimmed, 10)
    if (isNaN(parsed)) {
      setCustomBeats(null)
      return
    }
    const clamped = Math.max(1, Math.min(32, parsed))
    setCustomBeats(clamped)
    setSignature(`${clamped}/${customUnit}`)
  }, [customUnit])

  const handleCustomUnitChange = useCallback((unit: 4 | 8 | 16) => {
    setCustomUnit(unit)
    if (customBeats !== null) {
      setSignature(`${customBeats}/${unit}`)
    }
  }, [customBeats])

  const saveFavorite = useCallback(() => {
    const trimmed = favoriteName.trim().slice(0, 30)
    if (trimmed === "") return
    const fav: Favorite = {
      name: trimmed,
      bpm,
      volume,
      signature,
      customTimeActive,
      customBeats,
      customUnit,
      soundStyle,
      subdivision,
      swing,
      swingPreset,
      isGapActive,
      playBars,
      silentBars,
      isRandomMuteActive,
      randomMutePercent,
      timerMinutes,
      beatStates: [...beatStates],
    }
    setFavorites(prev => {
      const next = [...prev.filter(f => f.name.toLowerCase() !== trimmed.toLowerCase()), fav]
      try {
        localStorage.setItem("taptempo_favorites", JSON.stringify(next))
      } catch {
        // storage unavailable — keep in-memory list only
      }
      return next
    })
    setIsSavingFavorite(false)
    setFavoriteName("")
  }, [favoriteName, bpm, volume, signature, customTimeActive, customBeats, customUnit, soundStyle, subdivision, swing, swingPreset, isGapActive, playBars, silentBars, isRandomMuteActive, randomMutePercent, timerMinutes, beatStates])

  const applyFavorite = useCallback((fav: Favorite) => {
    handleBpmInput(fav.bpm)

    if (fav.customTimeActive && fav.customBeats !== null) {
      const beats = Math.max(1, Math.min(32, fav.customBeats))
      const unit = fav.customUnit === 8 || fav.customUnit === 16 ? fav.customUnit : 4
      setCustomTimeActive(true)
      setCustomBeats(beats)
      setCustomUnit(unit)
      setSignature(`${beats}/${unit}`)
    } else {
      setSignature(/^\d+\/\d+$/.test(fav.signature) ? fav.signature : "4/4")
      setCustomTimeActive(false)
      setCustomBeats(null)
    }

    setVolume(Math.max(0, Math.min(1, fav.volume)))
    setSoundStyle(fav.soundStyle)
    setSubdivision(fav.subdivision)
    setSwing(fav.swing)
    setSwingPreset(fav.swingPreset)
    setIsGapActive(fav.isGapActive)
    setPlayBars(Math.max(1, Math.min(16, fav.playBars)))
    setSilentBars(Math.max(1, Math.min(16, fav.silentBars)))
    setIsRandomMuteActive(fav.isRandomMuteActive)
    setRandomMutePercent(Math.max(0, Math.min(50, fav.randomMutePercent)))
    setBeatStates(prev => fav.beatStates.slice(0, parseInt(fav.signature.split("/")[0]) || prev.length))
    selectTimerPreset(fav.timerMinutes)
  }, [handleBpmInput, selectTimerPreset])

  const deleteFavorite = useCallback((name: string) => {
    setFavorites(prev => {
      const next = prev.filter(f => f.name !== name)
      try {
        localStorage.setItem("taptempo_favorites", JSON.stringify(next))
      } catch {
        // storage unavailable — keep in-memory list only
      }
      return next
    })
  }, [])

  const numBeats = parseInt(signature.split("/")[0])

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      {/* ── LEFT COLUMN ──────────────────────────────────────── */}
      <div className="lg:col-span-5 h-full flex flex-col justify-between items-center py-2 rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
        {/* BPM Pulse Ring + TAP + +/− */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center justify-center gap-4">
            <TapButton tapPulse={tapPulse} onTap={e => { e.preventDefault(); fireTap() }} />
            <div className="relative flex items-center justify-center w-[140px] h-[140px]">
              <svg
                className="absolute inset-0 m-auto pointer-events-none"
                width="140"
                height="140"
                viewBox="0 0 160 160"
              >
                {/* Idle ring — always visible at 40% */}
                <circle cx="80" cy="80" r="68" fill="none" stroke="#1565FF" strokeWidth="3"
                  strokeOpacity="0.4"
                  className="transition-all duration-150 ease-out"
                  style={{ transformOrigin: "80px 80px", transform: "scale(1)" }}
                />
                {/* Active pulse ring — scales up and brightens on beat */}
                <circle cx="80" cy="80" r="68" fill="none" stroke="#1565FF" strokeWidth="3"
                  className={`transition-all duration-150 ease-out ${
                    pulseActive
                      ? pulseState === "A"
                        ? "opacity-100"
                        : "opacity-70"
                      : "opacity-0"
                  }`}
                  style={{ transformOrigin: "80px 80px", transform: pulseActive ? "scale(1.05)" : "scale(1)" }}
                />
                {/* Accent fill glow */}
                {pulseActive && pulseState === "A" && <circle cx="80" cy="80" r="68" fill="#1565FF" opacity="0.08" />}
              </svg>
              <div className="relative flex flex-col items-center justify-center z-10">
                <span className="font-mono text-3xl font-extrabold tracking-tight text-gray-900 leading-none">
                  {bpm}
                </span>
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mt-0.5">BPM</span>
              </div>
            </div>

            <TapButton tapPulse={tapPulse} onTap={e => { e.preventDefault(); fireTap() }} />
          </div>

          <div className="flex items-center justify-center gap-1.5 shrink-0">
            <button
              aria-label="Increase tempo by 1 BPM"
              onClick={() => handleBpmInput(bpm + 1)}
              className="group relative flex items-center justify-center w-9 h-9 rounded-xl border-2 border-[#D9D9D9] bg-white shadow-sm select-none cursor-pointer transition-all duration-100 active:scale-95 shrink-0 hover:border-[#1565FF] hover:shadow-md"
            >
              <Plus size={14} className="transition-colors text-[#767676] group-hover:text-[#1565FF]" />
            </button>

            <button
              aria-label="Decrease tempo by 1 BPM"
              onClick={() => handleBpmInput(bpm - 1)}
              className="group relative flex items-center justify-center w-9 h-9 rounded-xl border-2 border-[#D9D9D9] bg-white shadow-sm select-none cursor-pointer transition-all duration-100 active:scale-95 shrink-0 hover:border-[#1565FF] hover:shadow-md"
            >
              <Minus size={14} className="transition-colors text-[#767676] group-hover:text-[#1565FF]" />
            </button>
          </div>
        </div>

        {/* Helper */}
        <p className="text-center text-[10px] text-muted-foreground font-mono leading-none">
          Press <kbd className="px-1 py-0.5 rounded bg-muted text-muted-foreground text-[9px] font-sans">T</kbd> or tap
        </p>

        {/* Beat Dots */}
        <div className="flex justify-center gap-3 flex-wrap max-w-[350px]">
          {Array.from({ length: numBeats }).map((_, i) => {
            const state = beatStates[i] || "N"
            const isActive = i === beat && playing
            const stateClass =
              state === "A"
                ? "bg-[#1565FF] border border-[#1565FF] shadow-[0_0_6px_rgba(21,101,255,0.7)]"
                : state === "G"
                ? "bg-[#E5E7EB]/70 border border-[#D9D9D9]"
                : state === "M"
                ? "bg-white border-2 border-[#D9D9D9]"
                : "bg-[#595959] border border-[#595959]"
            const dotClass = isActive && state !== "M"
              ? `${stateClass} scale-125 ring-2 ring-[#1565FF]/30 shadow-[0_0_12px_rgba(21,101,255,0.6)]`
              : isActive
              ? `${stateClass} opacity-70`
              : stateClass
            return (
              <button key={i} onClick={() => cycleBeatState(i)}
                className={`w-4 h-4 rounded-full transition-all duration-75 cursor-pointer hover:scale-110 ${dotClass}`}
                title={`Beat ${i + 1}: ${state === "A" ? "Accent" : state === "N" ? "Normal" : state === "G" ? "Ghost" : "Mute"} (click to change)`}
              />
            )
          })}
        </div>

        {/* START / STOP */}
        <button onClick={handlePlayToggle}
          className={`w-full py-3.5 rounded-full text-base font-semibold transition-all duration-200 shadow-md active:scale-95 mt-2 ${
            playing
              ? "bg-[#FF3B30] hover:bg-[#E03126] text-white"
              : "bg-[#1565FF] hover:bg-[#0D52D6] text-white"
          }`}
        >
          {playing ? "STOP" : "START"}
        </button>

        {/* Sliders */}
        <div className="flex flex-col gap-5 w-full mt-2">
          {/* BPM Slider */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-500 w-10 uppercase tracking-wider shrink-0">BPM</span>
            <Slider
              value={[bpm]} min={1} max={500}
              onValueChange={v => handleBpmInput(v[0])}
              aria-label="BPM"
              className="flex-1 [&_[role=slider]]:bg-white [&_[role=slider]]:border-[#D9D9D9] [&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:shadow-sm [&_.relative]:bg-[#D9D9D9] [&_.absolute]:bg-[#1565FF]"
            />
          </div>

          {/* Volume Slider */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-500 w-10 uppercase tracking-wider shrink-0">VOL</span>
            <Slider
              value={[Math.round(volume * 100)]} max={100}
              onValueChange={v => setVolume(v[0] / 100)}
              aria-label="Volume"
              className="flex-1 [&_[role=slider]]:bg-white [&_[role=slider]]:border-[#D9D9D9] [&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:shadow-sm [&_.relative]:bg-[#D9D9D9] [&_.absolute]:bg-[#1565FF]"
            />
          </div>

          {/* Quick Tempo */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider shrink-0">QUICK TEMPO</span>
              <button
                onClick={() => setQuickTempoSelection(null)}
                className="text-[11px] font-bold uppercase tracking-wider text-[#1565FF] hover:underline"
              >
                CLEAR
              </button>
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {quickTempoPresets.map(v => (
                <button
                  key={v}
                  aria-pressed={quickTempoSelection === v}
                  onClick={() => { handleBpmInput(v); setQuickTempoSelection(v) }}
                  className={`flex-1 px-2 py-1.5 rounded-full text-xs font-medium text-center transition-all shadow-sm ${
                    quickTempoSelection === v
                      ? "bg-[#1565FF] text-white border border-[#1565FF]"
                      : "bg-white border border-[#D9D9D9] text-[#595959] hover:text-[#1565FF] hover:border-[#1565FF]"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Beat State Legend */}
        <div className="flex justify-center gap-x-4 gap-y-1.5 flex-wrap mt-3">
          {([
            { state: "A", label: "Accent" },
            { state: "N", label: "Normal" },
            { state: "G", label: "Ghost" },
            { state: "M", label: "Mute" },
          ]).map(({ state, label }) => {
            const sampleClass =
              state === "A"
                ? "bg-[#1565FF] border border-[#1565FF] shadow-[0_0_6px_rgba(21,101,255,0.7)]"
                : state === "G"
                ? "bg-[#E5E7EB]/70 border border-[#D9D9D9]"
                : state === "M"
                ? "bg-white border-2 border-[#D9D9D9]"
                : "bg-[#595959] border border-[#595959]"
            return (
              <div key={state} className="flex items-center gap-1.5">
                <span className={`w-4 h-4 rounded-full shrink-0 ${sampleClass}`} aria-hidden="true" />
                <span className="text-[10px] text-muted-foreground font-mono leading-none">{label}</span>
              </div>
            )
          })}
        </div>

        {/* Favorites */}
        <div className="w-full flex flex-col gap-1.5 mt-3">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider shrink-0">Favorites</span>
          {isSavingFavorite ? (
            <div className="flex items-center gap-1.5">
              <input
                autoFocus
                maxLength={30}
                value={favoriteName}
                onChange={e => setFavoriteName(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") saveFavorite() }}
                aria-label="Favorite name"
                placeholder="Name this setup"
                className="flex-1 min-w-0 text-xs border border-[#D9D9D9] rounded-full px-3 py-1.5 bg-white text-[#595959] focus:border-[#1565FF] outline-none"
              />
              <button onClick={saveFavorite} aria-label="Save favorite"
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#1565FF] text-white shadow-sm">
                Save
              </button>
              <button onClick={() => { setIsSavingFavorite(false); setFavoriteName("") }} aria-label="Cancel"
                className="px-3 py-1.5 rounded-full text-xs font-medium border border-[#D9D9D9] text-[#595959] bg-white">
                Cancel
              </button>
            </div>
          ) : (
            <button onClick={() => setIsSavingFavorite(true)}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#1565FF] text-white shadow-sm">
              Save current setup
            </button>
          )}
          {favorites.length === 0 ? (
            <p className="text-[10px] text-muted-foreground font-mono leading-none">No favorites saved yet</p>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {favorites.map(fav => (
                <div key={fav.name}
                  className="inline-flex items-center max-w-full rounded-full border border-[#D9D9D9] bg-white shadow-sm transition-all hover:border-[#1565FF]">
                  <button onClick={() => applyFavorite(fav)}
                    className="pl-3 pr-1.5 py-1 text-xs font-medium text-[#595959] hover:text-[#1565FF] min-w-0">
                    <span className="block max-w-[180px] truncate">{fav.name}</span>
                  </button>
                  <button onClick={() => deleteFavorite(fav.name)}
                    aria-label={`Delete favorite ${fav.name}`}
                    className="pr-2.5 pl-1 py-1 text-xs font-bold text-muted-foreground hover:text-[#FF3B30] transition-colors">
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── RIGHT COLUMN ─────────────────────────────────────── */}
      <div className="lg:col-span-7 h-full flex flex-col justify-between rounded-2xl bg-white border border-gray-200 p-4 shadow-sm">
        {/* Time Signatures */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-700 block mb-1">Time Signature</span>
          <div className="flex gap-1.5 flex-wrap">
            {["2/4", "3/4", "4/4", "5/4", "6/8", "7/8", "9/8", "12/8"].map(sig => (
              <button key={sig} onClick={() => { setSignature(sig); setCustomTimeActive(false); setCustomBeats(null) }}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  !customTimeActive && signature === sig ? "bg-[#1565FF] text-white" : "bg-transparent text-[#595959] hover:text-[#1565FF] hover:bg-[#1565FF]/5"
                }`}
              >{sig}</button>
            ))}
            <button onClick={() => setCustomTimeActive(true)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                customTimeActive ? "bg-[#1565FF] text-white" : "bg-transparent text-[#595959] hover:text-[#1565FF] hover:bg-[#1565FF]/5"
              }`}
            >Custom</button>
          </div>
          {customTimeActive && (
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <input
                type="number"
                min={1}
                max={32}
                inputMode="numeric"
                value={customBeats ?? ""}
                onChange={e => handleCustomBeatsInput(e.target.value)}
                aria-label="Custom beats per measure"
                placeholder="Beats"
                className="w-14 text-center text-xs border border-[#D9D9D9] rounded px-1 py-0.5 bg-white"
              />
              <span className="text-[10px] text-muted-foreground shrink-0">Beats</span>
              <select
                aria-label="Custom beat unit"
                value={customUnit}
                onChange={e => handleCustomUnitChange(Number(e.target.value) as 4 | 8 | 16)}
                className="text-xs border border-[#D9D9D9] rounded px-1.5 py-0.5 bg-white text-[#595959]"
              >
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="16">16</option>
              </select>
              <span className="text-[10px] text-muted-foreground shrink-0">Note value</span>
            </div>
          )}
        </div>

        {/* Sound Style */}
        <div className="mt-2.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-700 block mb-1">Sound</span>
          <div className="flex gap-1.5">
            {(["click", "beep", "woodblock", "cowbell", "snare"] as const).map(s => (
              <button key={s} onClick={() => setSoundStyle(s)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all capitalize ${
                  soundStyle === s ? "bg-[#1565FF] text-white" : "bg-transparent text-[#595959] hover:text-[#1565FF] hover:bg-[#1565FF]/5"
                }`}
              >{s}</button>
            ))}
          </div>
        </div>

        {/* Subdivisions + Swing */}
        {showSubdivisions && (
          <div className="mt-2.5">
            <div className="grid grid-cols-1 gap-y-1.5 sm:grid-cols-[auto_1px_auto] sm:items-center sm:gap-x-1.5 sm:gap-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-700 sm:col-start-1 sm:row-start-1">Subdivisions</span>
              <div className="flex flex-wrap items-center gap-1.5 sm:col-start-1 sm:row-start-2">
                {subdivisions.map(s => (
                  <button key={s.value} onClick={() => setSubdivision(s.value)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      subdivision === s.value ? "bg-[#1565FF] text-white" : "bg-transparent text-[#595959] hover:text-[#1565FF] hover:bg-[#1565FF]/5"
                    }`}
                  >{s.label}</button>
                ))}
              </div>
              <div className="hidden sm:block sm:col-start-2 sm:row-start-2 w-px self-stretch bg-border shrink-0" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-700 sm:col-start-3 sm:row-start-1">Swing</span>
              <div className="flex flex-wrap items-center gap-1.5 sm:col-start-3 sm:row-start-2">
                {swingPresets.map(p => (
                  <button key={p.value} aria-pressed={swingPreset === p.value}
                    onClick={() => { setSwing(p.fraction); setSwingPreset(p.value) }}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      swingPreset === p.value ? "bg-[#1565FF] text-white" : "bg-transparent text-[#595959] hover:text-[#1565FF] hover:bg-[#1565FF]/5"
                    }`}
                  >{p.label}</button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <Slider
                value={[swing * 100]} min={50} max={75} step={0.1}
                onValueChange={v => {
                  const frac = v[0] / 100
                  setSwing(frac)
                  const match = swingPresets.find(p => Math.abs(p.fraction - frac) < 0.0005)
                  setSwingPreset(match ? match.value : "custom")
                }}
                aria-label="Swing amount"
                className="flex-1 [&_[role=slider]]:bg-white [&_[role=slider]]:border-[#D9D9D9] [&_[role=slider]]:h-3 [&_[role=slider]]:w-3 [&_[role=slider]]:shadow-sm [&_.relative]:bg-[#D9D9D9] [&_.absolute]:bg-[#1565FF]"
              />
              <span className="text-xs font-mono text-muted-foreground w-12 text-right shrink-0">
                {Number((swing * 100).toFixed(1))}%
              </span>
            </div>
          </div>
        )}

        {/* Tempo Presets */}
        <div className="mt-2.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-700 block mb-1">Tempo Presets</span>
          <div className="flex gap-1.5 flex-wrap">
            {presets.map(p => (
              <button key={p.label} onClick={() => handleBpmInput(p.val)}
                className="px-3 py-1 rounded-full text-xs border border-[#D9D9D9] text-[#595959] bg-white hover:text-[#1565FF] hover:border-[#1565FF] transition-all shadow-sm"
              >{p.label} <span className="ml-0.5">{p.val}</span></button>
            ))}
          </div>
        </div>

        {/* Practice Tools */}
        <div className="flex-1 border-t border-gray-200 pt-2 mt-2.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-700 block mb-1">Practice Tools</span>

          {/* Gap Click */}
          <div className="flex items-center justify-between py-1">
            <span className="text-xs font-medium text-[#595959]">Gap Click</span>
            <button role="switch" aria-checked={isGapActive} aria-label="Toggle Gap Click" onClick={() => setIsGapActive(g => !g)}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565FF] focus-visible:ring-offset-2 ${
                isGapActive ? "bg-[#1565FF]" : "bg-[#D9D9D9]"
              }`}
            >
              <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out mt-0.5 ${
                isGapActive ? "translate-x-4" : "translate-x-0.5"
              }`} />
            </button>
          </div>
          {isGapActive && (
            <div className="flex items-center gap-2 pl-2 pb-1">
              <span className="text-[10px] text-muted-foreground shrink-0">Play</span>
              <input type="number" min={1} max={16} value={playBars}
                onChange={e => setPlayBars(Math.max(1, Math.min(16, parseInt(e.target.value) || 1)))}
                className="w-10 text-center text-xs border border-[#D9D9D9] rounded px-1 py-0.5 bg-white"
              />
              <span className="text-[10px] text-muted-foreground shrink-0">Silent</span>
              <input type="number" min={1} max={16} value={silentBars}
                onChange={e => setSilentBars(Math.max(1, Math.min(16, parseInt(e.target.value) || 1)))}
                className="w-10 text-center text-xs border border-[#D9D9D9] rounded px-1 py-0.5 bg-white"
              />
              <span className="text-[10px] text-muted-foreground/50 shrink-0">bars</span>
            </div>
          )}

          {/* Random Mute */}
          <div className="flex items-center justify-between py-1">
            <span className="text-xs font-medium text-[#595959]">Random Mute</span>
            <button role="switch" aria-checked={isRandomMuteActive} aria-label="Toggle Random Mute" onClick={() => setIsRandomMuteActive(r => !r)}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565FF] focus-visible:ring-offset-2 ${
                isRandomMuteActive ? "bg-[#1565FF]" : "bg-[#D9D9D9]"
              }`}
            >
              <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out mt-0.5 ${
                isRandomMuteActive ? "translate-x-4" : "translate-x-0.5"
              }`} />
            </button>
          </div>
          {isRandomMuteActive && (
            <div className="flex items-center gap-2 pl-2 pb-1">
              <Slider value={[randomMutePercent]} min={0} max={50}
                onValueChange={v => setRandomMutePercent(v[0])}
                aria-label="Random Mute Percentage"
                className="flex-1 [&_[role=slider]]:bg-white [&_[role=slider]]:border-[#D9D9D9] [&_[role=slider]]:h-3 [&_[role=slider]]:w-3 [&_[role=slider]]:shadow-sm [&_.relative]:bg-[#D9D9D9] [&_.absolute]:bg-[#1565FF]"
              />
              <span className="text-xs font-mono text-muted-foreground w-8 text-right shrink-0">{randomMutePercent}%</span>
            </div>
          )}

          {/* Practice Timer */}
          <div className="flex items-center justify-between py-1 mt-2 border-t border-gray-100 pt-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xs font-medium text-[#595959] shrink-0">Practice Timer</span>
              <span className="font-mono text-sm font-bold text-gray-900 tabular-nums shrink-0">
                {`${String(Math.floor(timeRemaining / 60)).padStart(2, "0")}:${String(timeRemaining % 60).padStart(2, "0")}`}
              </span>
            </div>
            <Select value={String(timerMinutes)} onValueChange={(v) => selectTimerPreset(Number(v))}>
              <SelectTrigger className="h-8 w-[88px] shrink-0 rounded border border-[#D9D9D9] bg-white px-2 text-xs shadow-none focus:ring-1 focus:ring-[#1565FF]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TIMER_PRESETS.map(p => (
                  <SelectItem key={p.label} value={String(p.minutes)}>{p.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quick Presets */}
          <div className="flex gap-1.5 flex-wrap mt-2">
            {[
              { label: "1/16 Mode", href: "/metronome-with-subdivisions" },
              { label: "Guitar", href: "/metronome-for-guitar-practice" },
              { label: "Drummer", href: "/metronome-for-drummers" },
              { label: "Piano", href: "/metronome-for-piano-practice" },
            ].map(p => (
              <Link key={p.label} href={p.href}
                className="px-3 py-1 rounded-full text-xs font-medium border border-[#D9D9D9] text-[#595959] bg-white hover:text-[#1565FF] hover:border-[#1565FF] transition-all shadow-sm"
              >{p.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
