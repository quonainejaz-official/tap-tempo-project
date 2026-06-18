import { Metadata } from "next"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.thetaptempo.com"
const pageUrl = `${siteUrl}/tempo-markings`

export const metadata: Metadata = {
  title: "Tempo Markings – Italian Terms & BPM Ranges for Musicians",
  description:
    "Browse classical Italian tempo markings from Larghissimo to Prestissimo. Interactive BPM range explorer with audio previews for every tempo term.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Tempo Markings – Italian Terms & BPM Ranges for Musicians",
    description:
      "Browse classical Italian tempo markings from Larghissimo to Prestissimo. Interactive BPM range explorer with audio previews for every tempo term.",
    type: "website",
    url: pageUrl,
    siteName: "TheTapTempo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tempo Markings – Italian Terms & BPM Ranges for Musicians",
    description:
      "Browse classical Italian tempo markings from Larghissimo to Prestissimo. Interactive BPM range explorer with audio previews for every tempo term.",
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
        "Interactive tempo markings reference tool. Browse Italian tempo terms, explore BPM ranges, and hear audio click previews at each tempo.",
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
          name: "What is the slowest tempo marking?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Larghissimo is the slowest standard tempo marking, ranging from 10 to 24 BPM. It creates a funereal, meditative feel with immense space between beats.",
          },
        },
        {
          "@type": "Question",
          name: "What BPM is Andante?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Andante is typically between 76 and 108 BPM. It means 'at a walking pace' and feels natural, unhurried, and steady.",
          },
        },
        {
          "@type": "Question",
          name: "What is the difference between Allegro and Vivace?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Allegro is fast (120–168 BPM) and bright, while Vivace is faster (168–176 BPM) and more lively. Vivace suggests a spirited, sparkling character beyond just speed.",
          },
        },
        {
          "@type": "Question",
          name: "What tempo marking is 120 BPM?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "120 BPM is the boundary where Moderato (108–120), Allegretto (112–120), and Allegro (120–168) converge. At exactly 120 BPM, multiple markings apply depending on the desired musical character.",
          },
        },
        {
          "@type": "Question",
          name: "How do I use tempo markings in my music?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Use tempo markings as a guide for the character of a piece, not just the speed. Adagio suggests an expressive, breathing feel while Presto implies excitement and drive. Pair the marking with a metronome to match the intended mood.",
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
