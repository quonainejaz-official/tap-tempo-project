import type { Metadata } from "next"
import { ThemeProvider } from "@/lib/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Layout } from "@/components/layout"
import "./globals.css"

export const metadata: Metadata = {
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
  },
  twitter: {
    card: "summary_large_image",
    title: "TheTapTempo — Accurate BPM & Tap Tempo Tools",
    description:
      "Professional music tools for musicians, producers, and DJs. Tap any rhythm, calculate BPM instantly.",
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>
          <TooltipProvider>
            <Layout>{children}</Layout>
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
