import { Metadata } from "next"
import { BASE_URL } from "@/lib/constants"

const pageUrl = `${BASE_URL}/blog`

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read articles on BPM, tap tempo, music production, metronome practice, delay and reverb techniques, and music theory for musicians, producers, and DJs.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Blog | TheTapTempo",
    description:
      "Read articles on BPM, tap tempo, music production, metronome practice, delay and reverb techniques, and music theory for musicians, producers, and DJs.",
    type: "website",
    url: pageUrl,
    siteName: "TheTapTempo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | TheTapTempo",
    description:
      "Read articles on BPM, tap tempo, music production, metronome practice, delay and reverb techniques, and music theory for musicians, producers, and DJs.",
  },
  robots: { index: true, follow: true },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
