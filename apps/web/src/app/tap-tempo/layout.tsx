import { Metadata } from "next"
import { BASE_URL } from "@/lib/constants"

const pageUrl = `${BASE_URL}/tap-tempo`

export const metadata: Metadata = {
  title: "Tap BPM – Free Online BPM Tapper, Tempo Counter & Beat Finder",
  description:
    "Use our free BPM tapper to find the beats per minute of any song by tapping along. Includes a complete guide to tap tempo for musicians, DJs, producers, runners, and more. No ads, works offline",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Tap BPM – Free Online BPM Tapper, Tempo Counter & Beat Finder",
    description:
      "Use our free BPM tapper to find the beats per minute of any song by tapping along. Includes a complete guide to tap tempo for musicians, DJs, producers, runners, and more. No ads, works offline",
    type: "website",
    url: pageUrl,
    siteName: "TheTapTempo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tap BPM – Free Online BPM Tapper, Tempo Counter & Beat Finder",
    description:
      "Use our free BPM tapper to find the beats per minute of any song by tapping along. Includes a complete guide to tap tempo for musicians, DJs, producers, runners, and more. No ads, works offline",
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "TheTapTempo BPM Tapper",
      url: pageUrl,
      applicationCategory: "Multimedia",
      operatingSystem: "Web",
      description:
        "Free online BPM tapper that detects tempo by tapping. Accurate tap tempo calculator for musicians, DJs, and producers.",
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
          name: "How does a BPM tapper work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It measures the time in milliseconds between your taps, averages several recent intervals, and converts that to beats per minute using the formula BPM = 60,000 / average interval (ms).",
          },
        },
        {
          "@type": "Question",
          name: "Is an online tap tempo accurate enough for professional use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, absolutely. The accuracy depends on the consistency of your tapping, not the tool. Our tapper averages up to 16 taps and remains sample-accurate. For tasks like setting a DAW tempo or a guitar delay pedal, it's completely reliable.",
          },
        },
        {
          "@type": "Question",
          name: "How many taps do I need to get a reliable BPM?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Eight to twelve taps will give you a stable average with less than ±1 BPM variance for most users. Fewer than five taps will produce unreliable, jumpy results.",
          },
        },
        {
          "@type": "Question",
          name: "Why does the BPM number jump around when I tap?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "That's the tool reacting to your natural timing variance. No human taps like a machine. The display settles as the averaging window fills with consistent data. If it never settles, you're likely not locking onto the true beat.",
          },
        },
        {
          "@type": "Question",
          name: "What if the song changes tempo?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Tap the sections you're interested in separately, resetting in between. For a full tempo analysis of a variable-tempo track, you'll need to use DAW-based tempo mapping. Our tool can still give you the BPM of each distinct section.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use the BPM tapper offline?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Once our page is loaded, the tool works entirely in your browser without an internet connection. You can use it on a plane, in a remote studio, or backstage before a performance.",
          },
        },
        {
          "@type": "Question",
          name: "What's the difference between a BPM tapper and a metronome?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A tapper measures tempo from an external source, while a metronome produces a steady click at a set tempo. They are complementary: you use the tapper to find the BPM, then set your metronome to that number for practice.",
          },
        },
      ],
    },
  ],
}

export default function TapTempoLayout({ children }: { children: React.ReactNode }) {
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
