import { Metadata } from "next"
import { BASE_URL } from "@/lib/constants"

const pageUrl = `${BASE_URL}/metronome`

export const metadata: Metadata = {
  title: "Online Metronome Tool & Rhythm Guide for Musicians",
  description:
    "Use our free metronome tool to improve rhythm and timing. Explore BPM, tempo, time signatures, polyrhythms, and practice techniques for every skill level.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Online Metronome Tool & Rhythm Guide for Musicians",
    description:
      "Use our free metronome tool to improve rhythm and timing. Explore BPM, tempo, time signatures, polyrhythms, and practice techniques for every skill level.",
    type: "website",
    url: pageUrl,
    siteName: "TheTapTempo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Metronome Tool & Rhythm Guide for Musicians",
    description:
      "Use our free metronome tool to improve rhythm and timing. Explore BPM, tempo, time signatures, polyrhythms, and practice techniques for every skill level.",
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "TheTapTempo Metronome",
      url: pageUrl,
      applicationCategory: "Multimedia",
      operatingSystem: "Web",
      description:
        "Free online metronome with BPM slider, time signatures, tap tempo, subdivisions, and practice tools for musicians.",
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
          name: "Should I use a metronome for every practice session?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Use it for specific goals: working on timing, learning new passages, or polishing difficult sections. Overusing it can make your playing feel robotic. Balance metronome work with free playing.",
          },
        },
        {
          "@type": "Question",
          name: "How do I know what tempo to set?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Look for a tempo marking on your sheet music. If none exists, use the tap tempo feature to match a recording of the song. For practice, start at 50–70% of the target tempo.",
          },
        },
        {
          "@type": "Question",
          name: "What if I can't hear the click over my instrument?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Use headphones or in-ear monitors. For acoustic instruments, a louder mechanical metronome or an electronic one with a speaker works.",
          },
        },
        {
          "@type": "Question",
          name: "Can a metronome help with singing or wind instruments?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolutely. Wind players (trumpet, flute, saxophone) use the metronome to practice even breathing and articulation. Singers use it to stay on the beat during fast passages.",
          },
        },
        {
          "@type": "Question",
          name: "What's the difference between simple and compound meter?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Simple meter divides beats into two equal parts (e.g., 4/4). Compound meter divides into three parts (e.g., 6/8, 9/8, 12/8). Set your metronome to the corresponding time signature and use triplets to feel the compound division.",
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
          name: "Online Metronome",
          item: pageUrl,
        },
      ],
    },
  ],
}

export default function MetronomeLayout({ children }: { children: React.ReactNode }) {
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
