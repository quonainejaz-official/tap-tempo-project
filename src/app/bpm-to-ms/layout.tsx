import { Metadata } from "next"
import { BASE_URL } from "@/lib/constants"

const pageUrl = `${BASE_URL}/bpm-to-ms`

export const metadata: Metadata = {
  title: "BPM to MS Conversion: Pro Guide with Calculator, Chart & DAW Workflows",
  description:
    "Convert BPM to ms for delays, reverb pre-delay & compression. Free calculator, tempo chart, dotted eighth & triplet formulas for perfect rhythmic effects.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "BPM to MS Conversion: Pro Guide with Calculator, Chart & DAW Workflows",
    description:
      "Convert BPM to ms for delays, reverb pre-delay & compression. Free calculator, tempo chart, dotted eighth & triplet formulas for perfect rhythmic effects.",
    type: "website",
    url: pageUrl,
    siteName: "TheTapTempo",
  },
  twitter: {
    card: "summary_large_image",
    title: "BPM to MS Conversion: Pro Guide with Calculator, Chart & DAW Workflows",
    description:
      "Convert BPM to ms for delays, reverb pre-delay & compression. Free calculator, tempo chart, dotted eighth & triplet formulas for perfect rhythmic effects.",
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "TheTapTempo BPM to MS Calculator",
      url: pageUrl,
      applicationCategory: "Multimedia",
      operatingSystem: "Web",
      description:
        "Free BPM to milliseconds converter for delay, reverb pre-delay, compressor release, and LFO timing. Includes note division table and frequency display.",
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
          name: "How many milliseconds is 120 BPM?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A quarter note at 120 BPM is 500 ms. An eighth note is 250 ms, and a sixteenth note is 125 ms.",
          },
        },
        {
          "@type": "Question",
          name: "How do I convert milliseconds back to BPM?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Divide 60,000 by the millisecond value of a quarter note. If you measured an eighth-note delay of 300 ms, first find the quarter note (600 ms), then calculate BPM = 60,000 ÷ 600 = 100 BPM.",
          },
        },
        {
          "@type": "Question",
          name: "What is the formula for BPM to milliseconds?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Quarter note ms = 60,000 ÷ BPM. For any other note value, multiply or divide the quarter note result according to the standard note relationships, for example, eighth note = quarter note ÷ 2.",
          },
        },
        {
          "@type": "Question",
          name: "Why do different calculators sometimes show different results?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "In our testing, discrepancies were most commonly caused by different calculators using different note-value assumptions rather than mathematical errors in the conversion itself.",
          },
        },
        {
          "@type": "Question",
          name: "Does this conversion work for time signatures like 3/4, 6/8, or 2/2?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, but you must first identify what the BPM number represents. In 3/4, the beat is still a quarter note. In 6/8, the BPM typically refers to a dotted quarter. In 2/2 (cut time), it's a half note. Adjust your starting reference accordingly, then apply the standard subdivisions.",
          },
        },
        {
          "@type": "Question",
          name: "What is the best delay time for a vocal slapback?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Slapback typically falls between 40 ms and 120 ms, which corresponds to a 1/32 to 1/16 note at most tempos. Use your tempo chart to find the exact value that sits right with the track.",
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
          name: "BPM to Milliseconds",
          item: pageUrl,
        },
      ],
    },
  ],
}

export default function BpmToMsLayout({ children }: { children: React.ReactNode }) {
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
