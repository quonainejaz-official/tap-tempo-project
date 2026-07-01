import { getCollection } from "@/lib/mongodb"
import type { MetadataRoute } from "next"
import { BASE_URL } from "@/lib/constants"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${BASE_URL}/tap-tempo`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${BASE_URL}/metronome`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${BASE_URL}/bpm-calculator`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/bpm-to-ms`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/delay-reverb-time-calculator`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/tempo-markings`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE_URL}/beats-per-bar-calculator`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE_URL}/ai-tempo`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${BASE_URL}/editorial-team`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${BASE_URL}/editorial-policy`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
  ]

  try {
    const blogs = await getCollection("blogs")
    const allBlogs = await blogs.find({ published: true }).toArray()

    const blogPages = allBlogs.map((blog) => ({
      url: `${BASE_URL}/blog/${blog.slug}`,
      lastModified: blog.updatedAt || blog.createdAt || new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))

    const pages = await getCollection("pages")
    const allPages = await pages.find({ published: true }).toArray()

    const customPages = allPages.map((page) => ({
      url: `${BASE_URL}/${page.slug}`,
      lastModified: page.updatedAt || page.createdAt || new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }))

    return [...staticPages, ...blogPages, ...customPages]
  } catch (error) {
    console.error("Sitemap generation error:", error)
    return staticPages
  }
}
