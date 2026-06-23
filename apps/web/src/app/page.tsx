import type { Metadata } from "next"
import { HomePageContent } from "./home-page-content"
import { BASE_URL } from "@/lib/constants"

export const metadata: Metadata = {
  alternates: { canonical: BASE_URL },
}

export default function HomePage() {
  return <HomePageContent />
}
