"use client"

import { useRef } from "react"
import { audioEngine } from "@/lib/audio-engine"

export function useAudioEngine() {
  const engine = useRef(audioEngine)

  const init = () => engine.current.init()
  const playKick = (vol?: number) => { init(); engine.current.playKick(vol) }
  const playClap = (vol?: number) => { init(); engine.current.playClap(vol) }
  const playHiHat = (vol?: number) => { init(); engine.current.playHiHat(vol) }
  const playCowbell = (vol?: number) => { init(); engine.current.playCowbell(vol) }
  const playMetronomeClick = (accent: boolean, vol?: number) => {
    init()
    engine.current.playMetronomeClick(accent, vol)
  }

  return { init, playKick, playClap, playHiHat, playCowbell, playMetronomeClick }
}
