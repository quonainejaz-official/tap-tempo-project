import { Metadata } from "next"
import { BASE_URL } from "@/lib/constants"

const pageUrl = `${BASE_URL}/metronome-with-subdivisions`

export const metadata: Metadata = {
  title: "Metronome with Subdivisions - Practice Eighth Notes, Triplets & Sixteenths",
  description:
    "Free online metronome with subdivisions. Practice eighth notes, triplets, and sixteenth notes with precise subdivision clicks for better rhythmic accuracy.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Metronome with Subdivisions - Practice Eighth Notes, Triplets & Sixteenths | TheTapTempo",
    description:
      "Free online metronome with subdivisions. Practice eighth notes, triplets, and sixteenth notes with precise subdivision clicks for better rhythmic accuracy.",
    type: "website",
    url: pageUrl,
    siteName: "TheTapTempo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Metronome with Subdivisions - Practice Eighth Notes, Triplets & Sixteenths | TheTapTempo",
    description:
      "Free online metronome with subdivisions. Practice eighth notes, triplets, and sixteenth notes with precise subdivision clicks for better rhythmic accuracy.",
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Metronome with Subdivisions",
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
          name: "Metronome with Subdivisions",
          item: pageUrl,
        },
      ],
    },
  ],
}

export default function MetronomeSubdivisionsLayout({ children }: { children: React.ReactNode }) {
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
