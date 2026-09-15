import { Metadata } from "next"
import { BASE_URL } from "@/lib/constants"

const pageUrl = `${BASE_URL}/metronome-for-piano-practice`

export const metadata: Metadata = {
  title: "Free Online Metronome for Piano Practice",
  description:
    "Free online metronome for piano practice. Set precise tempo for scales, Hanon exercises, and classical pieces — no download, works on any device.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Free Online Metronome for Piano Practice",
    description:
      "Free online metronome for piano practice. Set precise tempo for scales, Hanon exercises, and classical pieces — no download, works on any device.",
    type: "website",
    url: pageUrl,
    siteName: "TheTapTempo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Metronome for Piano Practice",
    description:
      "Free online metronome for piano practice. Set precise tempo for scales, Hanon exercises, and classical pieces — no download, works on any device.",
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Metronome for Piano Practice",
      applicationCategory: "Multimedia",
      description:
        "Free online metronome for piano practice. Set precise tempo for scales, Hanon exercises, and classical pieces — no download, works on any device.",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What BPM should I practice piano scales at?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Choose a tempo slow enough that every note stays even and comfortable. A moderate tempo around 60 BPM in quarter notes is a common starting point. Increase in small steps only when your playing is consistently even, and drop back if it gets sloppy.",
          },
        },
        {
          "@type": "Question",
          name: "Should I practice hands separately before playing hands together?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Master each hand alone at a controlled tempo, then combine hands at a slower tempo that keeps coordination stable. This isolates problems early and builds timing you can actually rely on.",
          },
        },
        {
          "@type": "Question",
          name: "How do I use a metronome for Hanon exercises?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Start at a moderate tempo, around 60 BPM is a practical baseline, then increase gradually as long as control stays even. Prioritize perfect evenness over hitting any specific number.",
          },
        },
        {
          "@type": "Question",
          name: "Why do my hands fall out of sync when I play faster?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Faster tempos expose small timing gaps and position changes that slower playing hides. Lower the tempo, practice hands separately, use subdivisions, and loop short trouble spots until both hands lock to the pulse before speeding back up.",
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
          name: "Metronome",
          item: `${BASE_URL}/metronome`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Metronome for Piano Practice",
          item: pageUrl,
        },
      ],
    },
  ],
}

export default function MetronomePianoPracticeLayout({ children }: { children: React.ReactNode }) {
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