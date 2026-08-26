import { Metadata } from "next"
import { BASE_URL } from "@/lib/constants"
import { hardcodedBlogs } from "@/data/blogs/registry"
import "@/styles/blog-prose.css"

const pageUrl = `${BASE_URL}/blog`

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read articles on BPM, tap tempo, music production, metronome practice, delay and reverb techniques, and music theory for musicians, producers, and DJs.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Blog | TheTapTempo",
    description:
      "Read articles on BPM, tap tempo, music production, metronome practice, delay and reverb techniques, and music theory for musicians, producers, and DJs.",
    type: "website",
    url: pageUrl,
    siteName: "TheTapTempo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | TheTapTempo",
    description:
      "Read articles on BPM, tap tempo, music production, metronome practice, delay and reverb techniques, and music theory for musicians, producers, and DJs.",
  },
  robots: { index: true, follow: true },
}

const itemListElement = hardcodedBlogs
  .slice()
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  .map((blog, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: blog.title,
    url: `${BASE_URL}/blog/${blog.slug}`,
  }))

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "Blog | TheTapTempo",
      description:
        "Read articles on BPM, tap tempo, music production, metronome practice, delay and reverb techniques, and music theory for musicians, producers, and DJs.",
      url: pageUrl,
      isPartOf: {
        "@type": "WebSite",
        name: "TheTapTempo",
        url: BASE_URL,
      },
      mainEntity: {
        "@type": "ItemList",
        itemListElement,
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
          name: "Blog",
          item: pageUrl,
        },
      ],
    },
  ],
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
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
