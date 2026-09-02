import { Metadata } from "next"
import { BASE_URL } from "@/lib/constants"

const pageUrl = `${BASE_URL}/pitch-tempo-calculator`

const pageDescription =
  "Calculate how pitch changes tempo. Use DJ pitch fader percentages or semitone offsets to instantly get new BPM, speed change, and factor."

export const metadata: Metadata = {
  title: "Pitch Tempo Calculator: DJ Fader & Semitone BPM",
  description: pageDescription,
  keywords: [
    "pitch tempo calculator",
    "pitch to bpm",
    "dj pitch calculator",
    "semitone to bpm",
    "pitch and tempo",
    "pitch shift bpm",
  ],
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Pitch Tempo Calculator: DJ Fader & Semitone BPM",
    description: pageDescription,
    type: "website",
    url: pageUrl,
    siteName: "TheTapTempo",
    images: [
      {
        url: "/opengraph.png",
        width: 1200,
        height: 630,
        alt: "TheTapTempo Pitch Tempo Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pitch Tempo Calculator: DJ Fader & Semitone BPM",
    description: pageDescription,
    images: ["/opengraph.png"],
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "TheTapTempo Pitch Tempo Calculator",
      url: pageUrl,
      applicationCategory: "Multimedia",
      operatingSystem: "Web",
      description:
        "Free online pitch tempo calculator that converts DJ pitch fader percentages and producer semitone offsets into new BPM, speed change percentage, and multiplicative factor.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Does changing the pitch of a song change its BPM?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Physically, yes. When a track is sped up or slowed down as a whole, its pitch and tempo change together. Time-stretching software can detach the two, but on raw audio the relationship follows the formulas Output BPM = Base BPM × (1 + p ÷ 100) for the DJ fader and Output BPM = Base BPM × 2^(n ÷ 12) for semitones.",
          },
        },
        {
          "@type": "Question",
          name: "Why is a +12% DJ fader not the same as +12 semitones?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Because one is linear and the other is logarithmic. A 12% fader raises tempo to 1.12×, while 12 semitones is a full octave at 2× speed. The semitone scale doubles every 12 steps rather than adding a fixed percentage.",
          },
        },
        {
          "@type": "Question",
          name: "What is the formula to calculate BPM from semitones?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Output BPM = Base BPM × 2^(n ÷ 12), where n is the number of semitones, positive when pitched up and negative when pitched down. The speed change percentage is (2^(n ÷ 12) - 1) × 100.",
          },
        },
        {
          "@type": "Question",
          name: "How many BPM is a semitone at 120 BPM?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "One semitone up at 120 BPM is about 127.1 BPM, a 5.95% increase. One semitone down is roughly 113.3 BPM, about a 5.61% decrease.",
          },
        },
        {
          "@type": "Question",
          name: "Why does my DJ software keep the pitch but change the tempo?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Modern software uses time-stretching to adjust tempo independently of pitch, so your fader and the track's tempo can diverge. The formulas in this calculator describe the raw, physical relationship before that processing is applied.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: BASE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Pitch Tempo Calculator",
          item: pageUrl,
        },
      ],
    },
  ],
}

export default function PitchTempoCalculatorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}
