"use client"

import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useState, useEffect } from "react"

export default function BlogPage() {
  const [articles, setArticles] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/blogs")
      .then((r) => r.json())
      .then((data) => setArticles(data.blogs || data || []))
      .catch(() => {})
  }, [])

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-serif font-bold tracking-tight mb-4">TheTempo Blog</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Thoughts, guides, and technical breakdowns on rhythm, tempo, and music production.
        </p>
      </div>

      <div className="grid gap-6">
        {articles.length > 0 ? (
          articles.map((article: any) => (
            <Link key={article._id || article.slug} href={`/blog/${article.slug}`}>
              <Card className="hover:border-primary/50 transition-colors cursor-pointer group">
                <CardHeader>
                  <div className="flex gap-4 text-sm text-muted-foreground mb-2 font-mono">
                    <span>
                      {article.createdAt
                        ? new Date(article.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : ""}
                    </span>
                    {article.readTime && (
                      <>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </>
                    )}
                  </div>
                  <CardTitle className="text-2xl font-serif group-hover:text-primary transition-colors">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="text-base mt-2 text-foreground/70">
                    {article.excerpt || article.metaDescription}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))
        ) : (
          <p className="text-center text-muted-foreground py-12">
            No articles published yet. Check back soon!
          </p>
        )}
      </div>
    </div>
  )
}
