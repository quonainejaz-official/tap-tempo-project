import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tap BPM – Free Online BPM Tapper, Tempo Counter & Beat Finder",
  description:
    "Use our free BPM tapper to find the beats per minute of any song by tapping along. Includes a complete guide to tap tempo for musicians, DJs, producers, runners, and more. No ads, works offline",
}

export default function TapTempoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
