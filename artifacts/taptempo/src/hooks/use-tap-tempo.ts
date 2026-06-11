import { useState, useCallback, useRef } from "react";

export type TapData = {
  tapIndex: number;
  timestamp: number;
  instantBpm: number | null;  // BPM from just this specific interval
  rollingBpm: number | null;  // weighted rolling-average BPM at this point
  interval: number | null;    // raw ms interval from previous tap
};

export function useTapTempo() {
  const [bpm, setBpm] = useState<number | null>(null);
  const [taps, setTaps] = useState<TapData[]>([]);
  const tapTimesRef = useRef<number[]>([]);
  const lastTapTimeRef = useRef<number>(0);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tapIndexRef = useRef(0);

  const reset = useCallback(() => {
    setBpm(null);
    setTaps([]);
    tapTimesRef.current = [];
    lastTapTimeRef.current = 0;
    tapIndexRef.current = 0;
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    localStorage.removeItem("taptempo_last_bpm");
  }, []);

  const tap = useCallback(() => {
    const now = performance.now();

    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);

    // Auto reset after 3s of inactivity
    if (lastTapTimeRef.current > 0 && now - lastTapTimeRef.current > 3000) {
      tapTimesRef.current = [];
      tapIndexRef.current = 0;
      setTaps([]);
      setBpm(null);
    }

    tapTimesRef.current.push(now);
    lastTapTimeRef.current = now;
    tapIndexRef.current += 1;
    const currentIndex = tapIndexRef.current;

    // Keep last 8 taps
    if (tapTimesRef.current.length > 8) tapTimesRef.current.shift();

    const times = tapTimesRef.current;
    let rollingBpm: number | null = null;
    let instantBpm: number | null = null;
    let rawInterval: number | null = null;

    if (times.length >= 2) {
      const intervals: number[] = [];
      for (let i = 1; i < times.length; i++) {
        intervals.push(times[i] - times[i - 1]);
      }

      // Instantaneous BPM: BPM from only the most recent interval
      rawInterval = intervals[intervals.length - 1];
      instantBpm = Math.round(60000 / rawInterval);

      // Outlier rejection for rolling average (discard >2.5x of simple mean)
      const simpleAvg = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const valid = intervals.filter(v => v < simpleAvg * 2.5);

      if (valid.length > 0) {
        // Weighted: more recent intervals count more
        let weightedSum = 0;
        let weightTotal = 0;
        valid.forEach((inv, idx) => {
          const w = idx + 1;
          weightedSum += inv * w;
          weightTotal += w;
        });
        const finalAvg = weightedSum / weightTotal;
        rollingBpm = Math.round(60000 / finalAvg);
        setBpm(rollingBpm);
        localStorage.setItem("taptempo_last_bpm", rollingBpm.toString());
      }
    }

    setTaps(prev => {
      const newTap: TapData = {
        tapIndex: currentIndex,
        timestamp: now,
        instantBpm,
        rollingBpm,
        interval: rawInterval,
      };
      // Keep at most 30 points on the graph
      return [...prev.slice(-29), newTap];
    });

    resetTimerRef.current = setTimeout(() => {
      tapTimesRef.current = [];
    }, 3000);
  }, []);

  return { bpm, taps, tap, reset, tapCount: tapTimesRef.current.length };
}
