import type { Metadata } from "next"
import { HomePageContent } from "./home-page-content"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.thetaptempo.com"

export const metadata: Metadata = {
  alternates: { canonical: siteUrl },
}

export default function HomePage() {
  return <HomePageContent />
}
