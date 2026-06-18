import { Metadata } from "next"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.thetaptempo.com"
const pageUrl = `${siteUrl}/delay-reverb-time-calculator`

export const metadata: Metadata = {
  title: "Delay Time & Reverb Pre-Delay Calculator",
  description:
    "Calculate delay time and reverb pre-delay from BPM. Get accurate milliseconds for pedals, plugins, DAWs, dotted notes, triplets, slapback, and vocals.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Delay Time & Reverb Pre-Delay Calculator",
    description:
      "Calculate delay time and reverb pre-delay from BPM. Get accurate milliseconds for pedals, plugins, DAWs, dotted notes, triplets, slapback, and vocals.",
    type: "website",
    url: pageUrl,
    siteName: "TheTapTempo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Delay Time & Reverb Pre-Delay Calculator",
    description:
      "Calculate delay time and reverb pre-delay from BPM. Get accurate milliseconds for pedals, plugins, DAWs, dotted notes, triplets, slapback, and vocals.",
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "TheTapTempo Delay & Reverb Time Calculator",
      url: pageUrl,
      applicationCategory: "Multimedia",
      operatingSystem: "Web",
      description:
        "Free online delay time and reverb pre-delay calculator. Get tempo-synced milliseconds for dotted eighths, triplets, slapback, ping-pong delay, and vocal reverb pre-delay.",
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
          name: "What's the difference between delay calculator and reverb pre-delay calculator?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Delay calculator gives the time between echoes (e.g., 375 ms). Reverb pre-delay calculator gives the time before reverb starts (e.g., 25 ms). Both use the same BPM-to-ms math but serve different effects.",
          },
        },
        {
          "@type": "Question",
          name: "Why would I need a pre-delay calculator? Can't I just set it by ear?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can, but a tempo-synced pre-delay keeps the reverb from masking the next beat. In a dense mix, 20 ms off can make vocals lose punch.",
          },
        },
        {
          "@type": "Question",
          name: "My delay pedal only has a time knob (no numbers). How do I use this?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Set the knob to minimum (usually 0 ms). Play a note and turn the knob slowly while listening. Use our calculator to know the target ms, then approximate. Or use tap tempo if your pedal has it.",
          },
        },
        {
          "@type": "Question",
          name: "What's a good starting delay for guitar solos?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Dotted eighth at 120-140 BPM, feedback 40%, mix 25%. That's 375-321 ms. Add some reverb after the delay.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use these calculators for live sound?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolutely. Sound engineers use them to set vocal delays and hall reverbs per song. Enter the song's BPM, get ms, type into the digital console.",
          },
        },
      ],
    },
  ],
}

export default function DelayReverbLayout({ children }: { children: React.ReactNode }) {
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
