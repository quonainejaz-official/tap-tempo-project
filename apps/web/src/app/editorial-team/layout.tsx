import { Metadata } from "next"
import { BASE_URL } from "@/lib/constants"

const pageUrl = `${BASE_URL}/editorial-team`

export const metadata: Metadata = {
  title: "Editorial Team | The Tap Tempo",
  description:
    "Meet the editorial team behind The Tap Tempo. Learn how we create accurate, trusted music education content and browser-based tools for musicians.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Editorial Team | The Tap Tempo",
    description:
      "Meet the editorial team behind The Tap Tempo. Learn how we create accurate, trusted music education content and browser-based tools for musicians.",
    type: "website",
    url: pageUrl,
    siteName: "TheTapTempo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Editorial Team | The Tap Tempo",
    description:
      "Meet the editorial team behind The Tap Tempo. Learn how we create accurate, trusted music education content and browser-based tools for musicians.",
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "Editorial Team | The Tap Tempo",
      description:
        "Meet the editorial team behind The Tap Tempo. Learn how we create accurate, trusted music education content and browser-based tools for musicians.",
      url: pageUrl,
      isPartOf: {
        "@type": "WebSite",
        name: "TheTapTempo",
        url: BASE_URL,
      },
      about: {
        "@type": "Organization",
        name: "TheTapTempo",
        url: BASE_URL,
        description: "Browser-based music tools and educational resources for musicians.",
      },
    },
    {
      "@type": "AboutPage",
      name: "Editorial Team | The Tap Tempo",
      description:
        "Meet the editorial team behind The Tap Tempo. Learn how we create accurate, trusted music education content and browser-based tools for musicians.",
      url: pageUrl,
      isPartOf: {
        "@type": "WebSite",
        name: "TheTapTempo",
        url: BASE_URL,
      },
    },
    {
      "@type": "Organization",
      name: "TheTapTempo",
      url: BASE_URL,
      description: "Browser-based music tools and educational resources for musicians.",
      foundingDate: "2024",
      contactPoint: {
        "@type": "ContactPoint",
        email: "taptempous@gmail.com",
        contactType: "customer support",
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
          name: "Editorial Team",
          item: pageUrl,
        },
      ],
    },
  ],
}

export default function EditorialTeamLayout({ children }: { children: React.ReactNode }) {
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
