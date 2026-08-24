"use client"

import { MetronomeWidget, type Subdivision, type BeatState } from "@/components/metronome-widget"

export type MetronomeEnginePreset = "default" | "subdivision" | "guitar" | "drummer"

interface MetronomeEngineProps {
  defaultPreset?: MetronomeEnginePreset
}

interface PresetConfig {
  bpm: number
  signature: string
  subdivision: Subdivision
  beatStates: BeatState[]
  showSubdivisions: boolean
  gapClick: boolean
  playBars: number
  silentBars: number
  randomMute: boolean
  randomMutePercent: number
}

const PRESETS: Record<MetronomeEnginePreset, PresetConfig | null> = {
  default: null,
  subdivision: {
    bpm: 120,
    signature: "4/4",
    subdivision: "eighth",
    beatStates: ["N", "N", "N", "N"],
    showSubdivisions: true,
    gapClick: false,
    playBars: 2,
    silentBars: 2,
    randomMute: false,
    randomMutePercent: 15,
  },
  guitar: {
    bpm: 90,
    signature: "4/4",
    subdivision: "quarter",
    beatStates: ["A", "N", "A", "N"],
    showSubdivisions: false,
    gapClick: false,
    playBars: 2,
    silentBars: 2,
    randomMute: false,
    randomMutePercent: 15,
  },
  drummer: {
    bpm: 120,
    signature: "4/4",
    subdivision: "quarter",
    beatStates: ["N", "N", "N", "N"],
    showSubdivisions: false,
    gapClick: true,
    playBars: 2,
    silentBars: 2,
    randomMute: true,
    randomMutePercent: 15,
  },
}

export function MetronomeEngine({ defaultPreset = "default" }: MetronomeEngineProps) {
  const config = PRESETS[defaultPreset]

  return (
    <MetronomeWidget
      key={defaultPreset}
      defaultBpm={config?.bpm}
      defaultSignature={config?.signature}
      defaultSubdivision={config?.subdivision}
      defaultBeatStates={config?.beatStates}
      showSubdivisions={config?.showSubdivisions ?? true}
      defaultGapClick={config?.gapClick}
      defaultPlayBars={config?.playBars}
      defaultSilentBars={config?.silentBars}
      defaultRandomMute={config?.randomMute}
      defaultRandomMutePercent={config?.randomMutePercent}
    />
  )
}
