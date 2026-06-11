import { useEffect, useRef } from "react";
import { AudioEngine } from "../lib/audio-engine";

export function useAudioEngine() {
  const engineRef = useRef<AudioEngine | null>(null);

  useEffect(() => {
    engineRef.current = AudioEngine.getInstance();
  }, []);

  const init = () => {
    engineRef.current?.init();
  };

  const playKick = (vol = 1) => { init(); engineRef.current?.playKick(vol); };
  const playClap = (vol = 1) => { init(); engineRef.current?.playClap(vol); };
  const playHiHat = (vol = 1) => { init(); engineRef.current?.playHiHat(vol); };
  const playCowbell = (vol = 1) => { init(); engineRef.current?.playCowbell(vol); };
  const playMetronomeClick = (accent = false, vol = 1) => { init(); engineRef.current?.playMetronomeClick(accent, vol); };

  return { init, playKick, playClap, playHiHat, playCowbell, playMetronomeClick };
}
