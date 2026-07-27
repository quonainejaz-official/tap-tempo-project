import { Metadata } from "next"
import { BASE_URL } from "@/lib/constants"

const pageUrl = `${BASE_URL}/metronome-for-drummers`

export const metadata: Metadata = {
  title: "Metronome for Drummers - Rudiments, Limb Independence & Groove Practice",
  description:
    "Use a metronome for drum practice to build clean rudiments, limb independence, and consistent groove timing at any tempo.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Metronome for Drummers - Rudiments, Limb Independence & Groove Practice | TheTapTempo",
    description:
      "Use a metronome for drum practice to build clean rudiments, limb independence, and consistent groove timing at any tempo.",
    type: "website",
    url: pageUrl,
    siteName: "TheTapTempo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Metronome for Drummers - Rudiments, Limb Independence & Groove Practice | TheTapTempo",
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
