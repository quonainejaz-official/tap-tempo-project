import type { Metadata } from "next"
import { Suspense } from "react"
import { ThemeProvider } from "@/lib/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Layout } from "@/components/layout"
import ChatAssistant from "@/components/chat-assistant"
import { NProgressProvider } from "@/components/nprogress-provider"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.thetaptempo.com"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "TheTapTempo — Accurate BPM & Tap Tempo Tools",
    template: "%s | TheTapTempo",
  },
  description:
    "Professional music tools for musicians, producers, and DJs. Tap any rhythm, calculate BPM instantly with the most accurate tap tempo algorithm.",
  keywords: ["tap tempo", "bpm calculator", "metronome", "delay time calculator", "music tools"],
  openGraph: {
    title: "TheTapTempo — Accurate BPM & Tap Tempo Tools",
    description:
      "Professional music tools for musicians, producers, and DJs. Tap any rhythm, calculate BPM instantly.",
    type: "website",
    siteName: "TheTapTempo",
    url: "/",
    images: [
      {
        url: "/logo.svg",
        width: 480,
        height: 120,
        alt: "TheTapTempo Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TheTapTempo — Accurate BPM & Tap Tempo Tools",
    description:
      "Professional music tools for musicians, producers, and DJs. Tap any rhythm, calculate BPM instantly.",
    images: ["/logo.svg"],
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "TheTapTempo",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.svg`,
        width: 480,
        height: 120,
      },
    },
    {
      "@type": "WebSite",
      name: "TheTapTempo",
      url: siteUrl,
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Suspense fallback={null}>
          <NProgressProvider />
        </Suspense>
        <ThemeProvider>
          <TooltipProvider>
            <Layout>{children}</Layout>
            <ChatAssistant />
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
