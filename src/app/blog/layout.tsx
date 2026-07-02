import { Metadata } from "next"
import { BASE_URL } from "@/lib/constants"

const pageUrl = `${BASE_URL}/blog`

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read articles on BPM, tap tempo, music production, metronome practice, delay and reverb techniques, and music theory for musicians, producers, and DJs.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Blog | TheTapTempo",
    description:
      "Read articles on BPM, tap tempo, music production, metronome practice, delay and reverb techniques, and music theory for musicians, producers, and DJs.",
    type: "website",
    url: pageUrl,
    siteName: "TheTapTempo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | TheTapTempo",
    description:
      "Read articles on BPM, tap tempo, music production, metronome practice, delay and reverb techniques, and music theory for musicians, producers, and DJs.",
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "Blog | TheTapTempo",
      description:
        "Read articles on BPM, tap tempo, music production, metronome practice, delay and reverb techniques, and music theory for musicians, producers, and DJs.",
      url: pageUrl,
      isPartOf: {
        "@type": "WebSite",
        name: "TheTapTempo",
        url: BASE_URL,
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
          name: "Blog",
          item: pageUrl,
        },
      ],
    },
  ],
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
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
