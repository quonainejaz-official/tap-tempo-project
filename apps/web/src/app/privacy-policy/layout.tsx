import { Metadata } from "next"
import { BASE_URL } from "@/lib/constants"

const pageUrl = `${BASE_URL}/privacy-policy`

export const metadata: Metadata = {
  title: "Privacy Policy | The Tap Tempo",
  description:
    "Read the Privacy Policy for The Tap Tempo to understand how we collect, use and protect information while you use our music tools and website.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Privacy Policy | The Tap Tempo",
    description:
      "Read the Privacy Policy for The Tap Tempo to understand how we collect, use and protect information while you use our music tools and website.",
    type: "website",
    url: pageUrl,
    siteName: "TheTapTempo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | The Tap Tempo",
    description:
      "Read the Privacy Policy for The Tap Tempo to understand how we collect, use and protect information while you use our music tools and website.",
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "Privacy Policy | The Tap Tempo",
      description:
        "Read the Privacy Policy for The Tap Tempo to understand how we collect, use and protect information while you use our music tools and website.",
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
          name: "Privacy Policy",
          item: pageUrl,
        },
      ],
    },
  ],
}

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
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
