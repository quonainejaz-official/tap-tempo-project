import { Metadata } from "next"
import { BASE_URL } from "@/lib/constants"

const pageUrl = `${BASE_URL}/bpm-calculator`

export const metadata: Metadata = {
  title: "BPM Calculator – Calculate Tempo, Beats & Song Duration Online",
  description:
    "Use our BPM Calculator to calculate tempo from beats and time, find beats from BPM, or estimate song duration. Fast, accurate, free, and works offline.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "BPM Calculator – Calculate Tempo, Beats & Song Duration Online",
    description:
      "Use our BPM Calculator to calculate tempo from beats and time, find beats from BPM, or estimate song duration. Fast, accurate, free, and works offline.",
    type: "website",
    url: pageUrl,
    siteName: "TheTapTempo",
  },
  twitter: {
    card: "summary_large_image",
    title: "BPM Calculator – Calculate Tempo, Beats & Song Duration Online",
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
            text: "A tap tempo tool finds BPM by you tapping a button in real time, fastest for a song playing now. A BPM calculator works from a counted number of beats over a known time, more accurate for live performances or when you don't have a device to tap.",
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
