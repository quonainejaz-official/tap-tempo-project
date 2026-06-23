import { Metadata } from "next"
import { BASE_URL } from "@/lib/constants"

const pageUrl = `${BASE_URL}/about`

export const metadata: Metadata = {
  title: "About Us | The Tap Tempo",
  description:
    "Learn about The Tap Tempo and discover our mission to provide fast, accurate browser-based music tools and educational resources for musicians and creators.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "About Us | The Tap Tempo",
    description:
      "Learn about The Tap Tempo and discover our mission to provide fast, accurate browser-based music tools and educational resources for musicians and creators.",
    type: "website",
    url: pageUrl,
    siteName: "TheTapTempo",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | The Tap Tempo",
    description:
      "Learn about The Tap Tempo and discover our mission to provide fast, accurate browser-based music tools and educational resources for musicians and creators.",
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "About Us | The Tap Tempo",
      description:
        "Learn about The Tap Tempo and discover our mission to provide fast, accurate browser-based music tools and educational resources for musicians and creators.",
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
          name: "About Us",
          item: pageUrl,
        },
      ],
    },
  ],
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
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
