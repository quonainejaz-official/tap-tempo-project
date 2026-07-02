import { Metadata } from "next"
import { BASE_URL } from "@/lib/constants"

const pageUrl = `${BASE_URL}/beats-per-bar-calculator`

export const metadata: Metadata = {
  title: "Calculate Beats Per Bar for Any Time Signature",
  description:
    "Never misalign a loop again. Understand beats per bar for 4/4, 3/4, 6/8, and get the formulas to convert bars to real time\u2014fast.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Calculate Beats Per Bar for Any Time Signature",
    description:
      "Never misalign a loop again. Understand beats per bar for 4/4, 3/4, 6/8, and get the formulas to convert bars to real time\u2014fast.",
    type: "website",
    url: pageUrl,
    siteName: "TheTapTempo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculate Beats Per Bar for Any Time Signature",
    description:
      "Never misalign a loop again. Understand beats per bar for 4/4, 3/4, 6/8, and get the formulas to convert bars to real time\u2014fast.",
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "TheTapTempo Beats Per Bar Calculator",
      url: pageUrl,
      applicationCategory: "Multimedia",
      operatingSystem: "Web",
      description:
        "Free online beats per bar calculator. Determine bar duration, beats per bar from any time signature, and convert bars to seconds for music production, DJ phrasing, and loop alignment.",
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
          name: "What\u2019s the fastest way to find a song\u2019s beats per bar?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Look at the time signature in your DAW or sheet music. If you don\u2019t have it, count how many quarter-note taps occur before the riff repeats; that number is your beats per bar.",
          },
        },
        {
          "@type": "Question",
          name: "Does changing BPM change beats per bar?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Never. BPM changes speed; time signature changes grouping. They are independent axes.",
          },
        },
        {
          "@type": "Question",
          name: "Why does 6/8 confuse calculators?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Because the top number says 6, but musicians often feel 2. You must decide: are you counting the eighth notes or the dotted-quarter pulses? The calculator gives you the raw number; your ears tell you the feel.",
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
          name: "Beats Per Bar Calculator",
          item: pageUrl,
        },
      ],
    },
  ],
}

export default function BeatsPerBarLayout({ children }: { children: React.ReactNode }) {
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
