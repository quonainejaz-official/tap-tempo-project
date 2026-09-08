import { Metadata } from "next"
import { BASE_URL } from "@/lib/constants"

const pageUrl = `${BASE_URL}/metronome-for-guitar-practice`

export const metadata: Metadata = {
  title: "Metronome for Guitar Practice - Chord Changes, Strumming & Picking",
  description:
    "Use a metronome for guitar practice to build clean chord changes, steady strumming patterns, and consistent picking technique at any tempo.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Metronome for Guitar Practice - Chord Changes, Strumming & Picking",
    description:
      "Use a metronome for guitar practice to build clean chord changes, steady strumming patterns, and consistent picking technique at any tempo.",
    type: "website",
    url: pageUrl,
    siteName: "TheTapTempo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Metronome for Guitar Practice - Chord Changes, Strumming & Picking",
    description:
      "Use a metronome for guitar practice to build clean chord changes, steady strumming patterns, and consistent picking technique at any tempo.",
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Metronome for Guitar Practice",
      applicationCategory: "Multimedia",
      description:
        "Use a metronome for guitar practice to build clean chord changes, steady strumming patterns, and consistent picking technique at any tempo.",
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
          name: "What BPM should beginners start guitar practice at?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most beginners should start chord-change and strumming practice between 50-70 BPM, increasing gradually as transitions become smooth and consistent.",
          },
        },
        {
          "@type": "Question",
          name: "Should I practice strumming and picking with different metronome settings?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Strumming patterns often work well with eighth-note subdivisions, while picking exercises are usually practiced with a simple quarter-note click until the pattern speeds up significantly.",
          },
        },
        {
          "@type": "Question",
          name: "How do I stop rushing chord changes?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Practice the change in isolation at a slower tempo than your target song, using a 4-bar or 2-bar drill until the transition feels automatic before increasing speed.",
          },
        },
        {
          "@type": "Question",
          name: "Can a metronome help with strumming pattern consistency?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. A metronome exposes uneven spacing between strums that can be hard to notice without an external reference, especially in syncopated patterns.",
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
          name: "Metronome for Guitar Practice",
          item: pageUrl,
        },
      ],
    },
  ],
}

export default function MetronomeGuitarPracticeLayout({ children }: { children: React.ReactNode }) {
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
