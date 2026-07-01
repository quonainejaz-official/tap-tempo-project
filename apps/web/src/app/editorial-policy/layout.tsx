import { Metadata } from "next"
import { BASE_URL } from "@/lib/constants"

const pageUrl = `${BASE_URL}/editorial-policy`

export const metadata: Metadata = {
  title: "Editorial Policy | The Tap Tempo",
  description:
    "Learn how TheTapTempo researches, reviews, updates, and maintains educational content to provide accurate and trustworthy music resources.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Editorial Policy | The Tap Tempo",
    description:
      "Learn how TheTapTempo researches, reviews, updates, and maintains educational content to provide accurate and trustworthy music resources.",
    type: "website",
    url: pageUrl,
    siteName: "TheTapTempo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Editorial Policy | The Tap Tempo",
    description:
      "Learn how TheTapTempo researches, reviews, updates, and maintains educational content to provide accurate and trustworthy music resources.",
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "Editorial Policy | The Tap Tempo",
      description:
        "Learn how TheTapTempo researches, reviews, updates, and maintains educational content to provide accurate and trustworthy music resources.",
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
      "@type": "CreativeWork",
      name: "Editorial Policy | The Tap Tempo",
      description:
        "Learn how TheTapTempo researches, reviews, updates, and maintains educational content to provide accurate and trustworthy music resources.",
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
          name: "Editorial Policy",
          item: pageUrl,
        },
      ],
    },
  ],
}

export default function EditorialPolicyLayout({ children }: { children: React.ReactNode }) {
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
