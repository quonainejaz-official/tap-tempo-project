import { Metadata } from "next"
import { BASE_URL } from "@/lib/constants"

const pageUrl = `${BASE_URL}/contact`

export const metadata: Metadata = {
  title: "Contact Us | The Tap Tempo",
  description:
    "Contact The Tap Tempo for questions, feedback, feature requests, or support regarding our browser-based music tools.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Contact Us | The Tap Tempo",
    description:
      "Contact The Tap Tempo for questions, feedback, feature requests, or support regarding our browser-based music tools.",
    type: "website",
    url: pageUrl,
    siteName: "TheTapTempo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | The Tap Tempo",
    description:
      "Contact The Tap Tempo for questions, feedback, feature requests, or support regarding our browser-based music tools.",
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "Contact Us | The Tap Tempo",
      description:
        "Contact The Tap Tempo for questions, feedback, feature requests, or support regarding our browser-based music tools.",
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
          name: "Contact Us",
          item: pageUrl,
        },
      ],
    },
  ],
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
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
