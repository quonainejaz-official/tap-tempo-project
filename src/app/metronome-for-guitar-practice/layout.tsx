import { Metadata } from "next"
import { BASE_URL } from "@/lib/constants"

const pageUrl = `${BASE_URL}/metronome-for-guitar-practice`

export const metadata: Metadata = {
  title: "Metronome for Guitar Practice - Chord Changes, Strumming & Picking",
  description:
    "Use a metronome for guitar practice to build clean chord changes, steady strumming patterns, and consistent picking technique at any tempo.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Metronome for Guitar Practice - Chord Changes, Strumming & Picking | TheTapTempo",
    description:
      "Use a metronome for guitar practice to build clean chord changes, steady strumming patterns, and consistent picking technique at any tempo.",
    type: "website",
    url: pageUrl,
    siteName: "TheTapTempo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Metronome for Guitar Practice - Chord Changes, Strumming & Picking | TheTapTempo",
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
      applicationCategory: "MusicApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
      },
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
