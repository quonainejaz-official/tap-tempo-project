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
          name: "What BPM should beginners start piano practice at?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most beginners should start scale and hand-synchronization practice between 60-80 BPM, increasing gradually as notes stay even and relaxed.",
          },
        },
        {
          "@type": "Question",
          name: "Should I practice scales and hand synchronization with different metronome settings?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Scales are usually practiced one or two notes per click, while hand-synchronization drills work best with a slow quarter-note pulse so both hands lock to the same beat.",
          },
        },
        {
          "@type": "Question",
          name: "How do I use a metronome for Hanon exercises?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Start each Hanon exercise well below your clean tempo, typically 60-80 BPM, and raise the tempo by 2-5 BPM only after the entire pattern stays even with no rushing.",
          },
        },
        {
          "@type": "Question",
          name: "Can a metronome help with playing evenly between both hands?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Slow, steady click practice exposes uneven note spacing and accents between hands that are hard to notice without an external timing reference.",
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