import { Metadata } from "next"
import { BASE_URL } from "@/lib/constants"

const pageUrl = `${BASE_URL}/terms`

export const metadata: Metadata = {
  title: "Terms & Conditions | The Tap Tempo",
  description:
    "Read the Terms & Conditions for The Tap Tempo and understand the guidelines for using our browser-based music tools and content.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Terms & Conditions | The Tap Tempo",
    description:
      "Read the Terms & Conditions for The Tap Tempo and understand the guidelines for using our browser-based music tools and content.",
    type: "website",
    url: pageUrl,
    siteName: "TheTapTempo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions | The Tap Tempo",
    description:
      "Read the Terms & Conditions for The Tap Tempo and understand the guidelines for using our browser-based music tools and content.",
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "Terms & Conditions | The Tap Tempo",
      description:
        "Read the Terms & Conditions for The Tap Tempo and understand the guidelines for using our browser-based music tools and content.",
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
          name: "Terms & Conditions",
          item: pageUrl,
        },
      ],
    },
  ],
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
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
