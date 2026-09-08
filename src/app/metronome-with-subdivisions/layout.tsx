import { Metadata } from "next"
import { BASE_URL } from "@/lib/constants"

const pageUrl = `${BASE_URL}/metronome-with-subdivisions`

export const metadata: Metadata = {
  title: "Metronome with Subdivisions - Practice Eighth Notes, Triplets & Sixteenths",
  description:
    "Free online metronome with subdivisions. Practice eighth notes, triplets, and sixteenth notes with precise subdivision clicks for better rhythmic accuracy.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Metronome with Subdivisions - Practice Eighth Notes, Triplets & Sixteenths",
    description:
      "Free online metronome with subdivisions. Practice eighth notes, triplets, and sixteenth notes with precise subdivision clicks for better rhythmic accuracy.",
    type: "website",
    url: pageUrl,
    siteName: "TheTapTempo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Metronome with Subdivisions - Practice Eighth Notes, Triplets & Sixteenths",
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
      applicationCategory: "Multimedia",
      description:
        "Free online metronome with subdivisions. Practice eighth notes, triplets, and sixteenth notes with precise subdivision clicks for better rhythmic accuracy.",
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
          name: "What's the difference between a regular metronome and one with subdivisions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A regular metronome clicks once per beat. A metronome with subdivisions adds extra clicks between the main beats, letting you hear eighth notes, triplets, or sixteenth notes as distinct audio references.",
          },
        },
        {
          "@type": "Question",
          name: "Which subdivision should beginners start with?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Start with eighth notes before moving to triplets or sixteenths. Eighth notes are the most common subdivision in popular music and provide the easiest transition from a basic quarter-note pulse.",
          },
        },
        {
          "@type": "Question",
          name: "How do I know if I'm ready to move to a faster subdivision?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "If you can play a passage cleanly at the current subdivision for several repetitions without losing the pulse, you're ready to try a smaller, faster subdivision or increase the tempo.",
          },
        },
        {
          "@type": "Question",
          name: "Can subdivisions help with sight-reading?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Practicing with subdivisions trains your ear to recognize note values by feel, which makes it easier to read and internalize rhythms in written music without counting mentally every time.",
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
