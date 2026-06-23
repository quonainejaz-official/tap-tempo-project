import { Metadata } from "next"
import { BASE_URL } from "@/lib/constants"

const pageUrl = `${BASE_URL}/tempo-markings`

export const metadata: Metadata = {
  title: "Tempo Markings in Music: Complete BPM Chart, Italian Terms & Practice",
  description:
    "Tempo markings with BPM ranges, Italian meanings, examples, and practical metronome tips for musicians and beginners.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Tempo Markings in Music: Complete BPM Chart, Italian Terms & Practice",
    description:
      "Tempo markings with BPM ranges, Italian meanings, examples, and practical metronome tips for musicians and beginners.",
    type: "website",
    url: pageUrl,
    siteName: "TheTapTempo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tempo Markings in Music: Complete BPM Chart, Italian Terms & Practice",
    description:
      "Tempo markings with BPM ranges, Italian meanings, examples, and practical metronome tips for musicians and beginners.",
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "TheTapTempo Tempo Markings Explorer",
      url: pageUrl,
      applicationCategory: "Multimedia",
      operatingSystem: "Web",
      description:
        "Interactive tempo markings reference tool with complete BPM chart, Italian musical terms, audio previews, and practice guide for musicians.",
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
          name: "What are tempo markings in music?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Tempo markings are instructions that tell musicians how fast or slow music should be played.",
          },
        },
        {
          "@type": "Question",
          name: "Why are tempo markings written in Italian?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Italian terminology became widely used during the development of classical music and eventually became a standard in music notation.",
          },
        },
        {
          "@type": "Question",
          name: "What BPM is Allegro?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Allegro commonly falls around 120–156 BPM, although exact ranges can vary.",
          },
        },
        {
          "@type": "Question",
          name: "Where are tempo markings written?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Tempo markings usually appear above the first measure of sheet music.",
          },
        },
        {
          "@type": "Question",
          name: "Is tempo the same as rhythm?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Tempo controls speed, while rhythm controls beat patterns.",
          },
        },
        {
          "@type": "Question",
          name: "How does a metronome help?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A metronome provides consistent beats that help musicians maintain timing and improve accuracy.",
          },
        },
      ],
    },
  ],
}

export default function TempoMarkingsLayout({ children }: { children: React.ReactNode }) {
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
