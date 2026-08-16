import { Metadata } from "next"
import { BASE_URL } from "@/lib/constants"

const pageUrl = `${BASE_URL}/bpm-calculator`

export const metadata: Metadata = {
  title: "BPM Calculator - Tempo, Beats & Song Duration",
  description:
    "Use our BPM Calculator to calculate tempo from beats and time, find beats from BPM, or estimate song duration. Fast, accurate, free, and works offline.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "BPM Calculator - Tempo, Beats & Song Duration | TheTapTempo",
    description:
      "Use our BPM Calculator to calculate tempo from beats and time, find beats from BPM, or estimate song duration. Fast, accurate, free, and works offline.",
    type: "website",
    url: pageUrl,
    siteName: "TheTapTempo",
  },
  twitter: {
    card: "summary_large_image",
    title: "BPM Calculator - Tempo, Beats & Song Duration | TheTapTempo",
    description:
      "Use our BPM Calculator to calculate tempo from beats and time, find beats from BPM, or estimate song duration. Fast, accurate, free, and works offline.",
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "TheTapTempo BPM Calculator",
      url: pageUrl,
      applicationCategory: "Multimedia",
      operatingSystem: "Web",
      description:
        "Free online BPM calculator that calculates tempo from beats and time, finds beats from BPM, or estimates song duration for musicians, DJs, and producers.",
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
          name: "What's the difference between this BPM calculator and a tap tempo tool?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A tap tempo tool finds BPM by you tapping a button in real time, fastest for a song playing now. A BPM calculator works from a counted number of beats over a known time, more accurate for live performances or when you don't have a device to tap. For the fastest way to find a song's BPM, use our Tap Tempo tool at https://www.thetaptempo.com/tap-tempo.",
          },
        },
        {
          "@type": "Question",
          name: "What time signatures does this work for?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "All of them. BPM always measures quarter-note beats in standard time. For 6/8, the beat is usually a dotted quarter, but the math still works if you count the main pulse.",
          },
        },
        {
          "@type": "Question",
          name: "How do I calculate BPM manually without a tool?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Count how many beats occur in 15 or 30 seconds using a stopwatch, then apply BPM = (Beats × 60) ÷ Seconds. Counting for longer than 15 seconds improves accuracy, since small counting errors affect the final result more over shorter samples. Our calculator above does this math instantly.",
          },
        },
        {
          "@type": "Question",
          name: "How do I convert BPM to seconds per beat?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Divide 60 by the BPM: Seconds per beat = 60 ÷ BPM. For example, at 120 BPM, each beat lasts 60 ÷ 120 = 0.5 seconds. This is useful for syncing delay effects, loops, or claps to a track's tempo — use our BPM to ms calculator at https://www.thetaptempo.com/bpm-to-ms for millisecond precision.",
          },
        },
        {
          "@type": "Question",
          name: "How can I estimate a song's duration from its BPM?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "If you know a song's total beat count and BPM, use Seconds = (Beats × 60) ÷ BPM. For example, a 480-beat track at 80 BPM plays for (480 × 60) ÷ 80 = 360 seconds, or exactly 6 minutes. Use the “Find Duration” tab above to calculate this automatically.",
          },
        },
        {
          "@type": "Question",
          name: "How do I convert BPM to a tempo value?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "BPM already is the tempo value — “120 BPM” and “a tempo of 120” describe the same thing. If you need the equivalent Italian tempo term instead (like Allegro or Andante), check our Tempo Markings guide at https://www.thetaptempo.com/tempo-markings, which maps BPM ranges to those names.",
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
          name: "BPM Calculator",
          item: pageUrl,
        },
      ],
    },
  ],
}

export default function BpmCalculatorLayout({ children }: { children: React.ReactNode }) {
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
