import { Metadata } from "next"
import { BASE_URL } from "@/lib/constants"

const pageUrl = `${BASE_URL}/metronome-for-drummers`

export const metadata: Metadata = {
  title: "Metronome for Drummers - Rudiments, Limb Independence & Groove Practice",
  description:
    "Use a metronome for drum practice to build clean rudiments, limb independence, and consistent groove timing at any tempo.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Metronome for Drummers - Rudiments, Limb Independence & Groove Practice",
    description:
      "Use a metronome for drum practice to build clean rudiments, limb independence, and consistent groove timing at any tempo.",
    type: "website",
    url: pageUrl,
    siteName: "TheTapTempo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Metronome for Drummers - Rudiments, Limb Independence & Groove Practice",
    description:
      "Use a metronome for drum practice to build clean rudiments, limb independence, and consistent groove timing at any tempo.",
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Metronome for Drummers",
      applicationCategory: "Multimedia",
      description:
        "Use a metronome for drum practice to build clean rudiments, limb independence, and consistent groove timing at any tempo.",
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
          name: "What BPM should drummers start rudiment practice at?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most drummers should start rudiment practice between 50-70 BPM, increasing gradually only once strokes are even in both volume and timing.",
          },
        },
        {
          "@type": "Question",
          name: "How can a metronome help with limb independence?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A metronome exposes when one limb drifts out of time relative to the others, which is difficult to notice by ear alone until the pattern becomes clearly loose or rushed.",
          },
        },
        {
          "@type": "Question",
          name: "Should drummers practice with the click on every beat?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Not always. Practicing with the click only on beats 2 and 4 (once basic timing is solid) builds a stronger internal sense of the full beat cycle, which is closer to how backbeats are felt in real playing.",
          },
        },
        {
          "@type": "Question",
          name: "Why do fills throw off my timing?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Fills often speed up because they feel more exciting to play. Practicing the transition from fill back into the groove at a slower, controlled tempo helps keep the return to the beat steady.",
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
          name: "Metronome for Drummers",
          item: pageUrl,
        },
      ],
    },
  ],
}

export default function MetronomeDrummersLayout({ children }: { children: React.ReactNode }) {
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
