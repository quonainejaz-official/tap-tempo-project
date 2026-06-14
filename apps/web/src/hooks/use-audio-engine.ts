"use client"

import { AudioEngine } from "@/lib/audio-engine"

export function useAudioEngine() {
  const engine = AudioEngine.getInstance()

  const init = () => engine.init()
  const playKick = (vol = 1) => { init(); engine.playKick(vol) }
  const playClap = (vol = 1) => { init(); engine.playClap(vol) }
  const playHiHat = (vol = 1) => { init(); engine.playHiHat(vol) }
  const playCowbell = (vol = 1) => { init(); engine.playCowbell(vol) }
  const playMetronomeClick = (accent = false, vol = 1) => { init(); engine.playMetronomeClick(accent, vol) }

  return { init, playKick, playClap, playHiHat, playCowbell, playMetronomeClick }
}
