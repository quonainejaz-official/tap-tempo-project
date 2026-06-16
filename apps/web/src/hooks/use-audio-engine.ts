"use client"

import { AudioEngine } from "@/lib/audio-engine"

export function useAudioEngine() {
  const engine = AudioEngine.getInstance()
  // Boost mobile volume — volume slider 0-100 maps to 0-3 gain
  const boost = (vol: number) => vol * 3

  const init = () => engine.init()
  const playKick = (vol = 1) => { init(); engine.playKick(boost(vol)) }
  const playClap = (vol = 1) => { init(); engine.playClap(boost(vol)) }
  const playHiHat = (vol = 1) => { init(); engine.playHiHat(boost(vol)) }
  const playCowbell = (vol = 1) => { init(); engine.playCowbell(boost(vol)) }
  const playMetronomeClick = (accent = false, vol = 1) => { init(); engine.playMetronomeClick(accent, boost(vol)) }

  return { init, playKick, playClap, playHiHat, playCowbell, playMetronomeClick }
}
