export function semitoneEquivalent(pitchPercent: number): number {
  return 12 * Math.log2(1 + pitchPercent / 100)
}

export function pitchPctNeeded(originalBpm: number, targetBpm: number): number {
  return ((targetBpm - originalBpm) / originalBpm) * 100
}

export function semitoneShiftNeeded(originalBpm: number, targetBpm: number): number {
  return 12 * Math.log2(targetBpm / originalBpm)
}
