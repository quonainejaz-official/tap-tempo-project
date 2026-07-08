import type { Metadata } from "next"
import { Suspense } from "react"
import { DM_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/lib/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Layout } from "@/components/layout"
import ChatAssistantDynamic from "@/components/chat-assistant-dynamic"
import { NProgressProvider } from "@/components/nprogress-provider"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import GoogleAnalytics from "@/components/google-analytics"
import { BASE_URL } from "@/lib/constants"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--app-font-sans",
  display: "swap",
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--app-font-serif",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--app-font-mono",
  display: "swap",
})

const metadataBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || BASE_URL

export const metadata: Metadata = {
  metadataBase: new URL(metadataBaseUrl),
  title: {
    default: "TheTapTempo – Free Online Music Tools for Musicians, Producers & DJs",
    template: "%s | TheTapTempo",
  },
  description:
    "Free browser-based music tools for musicians, producers, DJs, drummers, educators, and creators. Explore Tap Tempo, Metronome, BPM Calculator, Tempo Markings, and other professional rhythm and practice tools.",
  keywords: ["tap tempo", "bpm calculator", "metronome", "delay time calculator", "music tools"],
  openGraph: {
    title: "TheTapTempo – Free Online Music Tools for Musicians, Producers & DJs",
    description:
      "Free browser-based music tools for musicians, producers, DJs, drummers, educators, and creators. Explore Tap Tempo, Metronome, BPM Calculator, Tempo Markings, and other professional rhythm and practice tools.",
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
    title: "TheTapTempo – Free Online Music Tools for Musicians, Producers & DJs",
    description:
      "Free browser-based music tools for musicians, producers, DJs, drummers, educators, and creators. Explore Tap Tempo, Metronome, BPM Calculator, Tempo Markings, and other professional rhythm and practice tools.",
    images: ["/logo.svg"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "TheTapTempo",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.svg`,
        width: 480,
        height: 120,
      },
    },
    {
      "@type": "WebSite",
      "name": "TheTapTempo",
      "url": BASE_URL,
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </head>
      <body>
        <Suspense fallback={null}>
          <NProgressProvider />
        </Suspense>
        <ThemeProvider>
          <TooltipProvider>
            <Layout>{children}</Layout>
            <ChatAssistantDynamic />
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
