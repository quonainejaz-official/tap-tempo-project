import { Metadata } from "next"
import { BASE_URL } from "@/lib/constants"

const pageUrl = `${BASE_URL}/ai-tempo`

export const metadata: Metadata = {
  title: "TapTempoAI — Your Intelligent Coding Companion & AI Assistant",
  description:
    "Meet TapTempoAI — a next-generation assistant that writes, debugs, and explains code with human-like intelligence. From algorithms to full-stack apps, get instant answers, best practices, and creative solutions.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "TapTempoAI — Your Intelligent Coding Companion & AI Assistant",
    description:
      "Meet TapTempoAI — a next-generation assistant that writes, debugs, and explains code with human-like intelligence. From algorithms to full-stack apps, get instant answers.",
    type: "website",
    url: pageUrl,
    siteName: "TheTapTempo",
  },
  twitter: {
    card: "summary_large_image",
    title: "TapTempoAI — Your Intelligent Coding Companion & AI Assistant",
    description:
      "Meet TapTempoAI — a next-generation assistant that writes, debugs, and explains code with human-like intelligence. From algorithms to full-stack apps, get instant answers.",
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "TapTempoAI — Intelligent Coding Companion",
      url: pageUrl,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web",
      description:
        "A next-generation AI assistant that writes, debugs, and explains code with human-like intelligence. Supports 40+ programming languages.",
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
          name: "What is TapTempoAI?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "TapTempoAI is an intelligent coding companion that helps developers write, debug, and understand code. It provides real-time assistance, code generation, and explanations across 40+ programming languages.",
          },
        },
        {
          "@type": "Question",
          name: "Is TapTempoAI free to use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, TapTempoAI is completely free to use. You can ask any coding question, get code examples, and receive detailed explanations without any cost or signup required.",
          },
        },
        {
          "@type": "Question",
          name: "What programming languages does TapTempoAI support?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "TapTempoAI is fluent in 40+ programming languages including Python, JavaScript, TypeScript, Go, Rust, Java, C++, and more. It adapts to any syntax or framework.",
          },
        },
        {
          "@type": "Question",
          name: "How accurate is TapTempoAI?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "TapTempoAI has a 98% satisfaction rate with an average response time of ~0.4 seconds. It's used by over 5,000 developers daily with 30,000+ daily requests.",
          },
        },
      ],
    },
  ],
}

export default function AiTempoLayout({ children }: { children: React.ReactNode }) {
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
