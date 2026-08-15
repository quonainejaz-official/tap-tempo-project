import { Metadata } from "next"
import { BASE_URL } from "@/lib/constants"

const pageUrl = `${BASE_URL}/tempo-markings`

export const metadata: Metadata = {
  title: "Tempo Markings Chart: BPM & Italian Terms",
  description:
    "Tempo markings chart with BPM ranges, Italian terms (Adagio to Presto), and practical metronome tips for musicians, students, and beginners.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Tempo Markings Chart: BPM & Italian Terms | TheTapTempo",
    description:
      "Tempo markings chart with BPM ranges, Italian terms (Adagio to Presto), and practical metronome tips for musicians, students, and beginners.",
    type: "website",
    url: pageUrl,
    siteName: "TheTapTempo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tempo Markings Chart: BPM & Italian Terms | TheTapTempo",
    description:
      "Tempo markings chart with BPM ranges, Italian terms (Adagio to Presto), and practical metronome tips for musicians, students, and beginners.",
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
        {
          "@type": "Question",
          name: "What is Moderato tempo range?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Moderato ranges from 108–120 BPM. It sits in the middle of the tempo spectrum, meaning \"moderate speed\" in Italian. It's neither slow nor fast, creating a balanced, controlled, neutral feel that's commonly used across classical and pop music.",
          },
        },
        {
          "@type": "Question",
          name: "How many BPM is Moderato?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Moderato is typically 108–120 BPM. Some sources place it slightly lower, around 86–97 BPM, depending on style and era. In practice, Moderato simply means a comfortable, walking-to-moderate pace — not rushed, not slow.",
          },
        },
        {
          "@type": "Question",
          name: "What tempo in music means fast?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Allegro (120–156 BPM) is the most common fast tempo marking, meaning \"fast, quick, and bright.\" Faster still are Vivace (156–176 BPM), Presto (168–200 BPM), and Prestissimo (200–300 BPM), used for the quickest, most energetic passages.",
          },
        },
        {
          "@type": "Question",
          name: "What is a fast tempo called in music?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A fast tempo is generally called Allegro, the most widely used fast marking in music. For even faster speeds, terms like Vivace, Presto, and Prestissimo are used, each indicating a progressively quicker pace than Allegro.",
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
          name: "Tempo Markings",
          item: pageUrl,
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
