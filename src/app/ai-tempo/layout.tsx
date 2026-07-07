import { Metadata } from "next"
import { BASE_URL } from "@/lib/constants"

const pageUrl = `${BASE_URL}/ai-tempo`

export const metadata: Metadata = {
  title: "TapTempoAI — Ask Any Question About BPM, Tempo & Rhythm | TheTapTempo",
  description:
    "Ask TapTempoAI anything about BPM, tempo, rhythm, and music practice. Get instant answers for musicians, producers, DJs, and creators. Free AI-powered music assistant.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "TapTempoAI — Ask Any Question About BPM, Tempo & Rhythm | TheTapTempo",
    description:
      "Ask TapTempoAI anything about BPM, tempo, rhythm, and music practice. Get instant answers for musicians, producers, DJs, and creators. Free AI-powered music assistant.",
    type: "website",
    url: pageUrl,
    siteName: "TheTapTempo",
  },
  twitter: {
    card: "summary_large_image",
    title: "TapTempoAI — Ask Any Question About BPM, Tempo & Rhythm | TheTapTempo",
    description:
      "Ask TapTempoAI anything about BPM, tempo, rhythm, and music practice. Get instant answers for musicians, producers, DJs, and creators. Free AI-powered music assistant.",
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "TapTempoAI — Music & Tempo Q&A Assistant",
      url: pageUrl,
      applicationCategory: "MusicApplication",
      operatingSystem: "Web",
      description:
        "An AI-powered assistant that answers questions about BPM, tempo, rhythm, time signatures, and music practice for musicians, producers, and DJs.",
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
            text: "TapTempoAI is an AI-powered assistant that answers questions about BPM, tempo, rhythm, time signatures, music theory, and practice techniques. It helps musicians, producers, DJs, and music learners get instant answers to their tempo and timing questions.",
          },
        },
        {
          "@type": "Question",
          name: "Is TapTempoAI free to use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, TapTempoAI is completely free to use. You can ask any music or tempo-related question and receive detailed explanations without any cost or signup required.",
          },
        },
        {
          "@type": "Question",
          name: "What kind of questions can I ask TapTempoAI?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can ask about BPM ranges for any music genre, tempo markings and their meanings, time signatures, metronome practice techniques, delay and reverb timing calculations, music theory concepts, and tips for improving rhythm and timing.",
          },
        },
        {
          "@type": "Question",
          name: "How accurate is TapTempoAI?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "TapTempoAI is designed to provide accurate, well-researched answers about tempo, BPM, rhythm, and music theory. It uses up-to-date knowledge to help musicians, producers, and educators.",
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
          name: "TapTempoAI",
          item: pageUrl,
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
