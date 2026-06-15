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
        <h1 className="text-5xl font-serif font-bold tracking-tight mb-4">TheTapTempo Blog</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Guides, theory, and production tips on rhythm, tempo, and music production.
        </p>
      </div>

      <div className="grid gap-8">
        {articles.length > 0 ? (
          articles.map((article: any) => (
            <Link key={article._id || article.slug} href={`/blog/${article.slug}`}>
              <Card className="hover:border-primary/50 transition-all cursor-pointer group hover:shadow-md">
                {article.coverImage && (
                  <div className="rounded-t-xl overflow-hidden">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardHeader className="p-6">
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3 font-mono">
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
                        <span>&middot;</span>
                        <span>{article.readTime}</span>
                      </>
                    )}
                    {article.author && (
                      <>
                        <span>&middot;</span>
                        <span>By {article.author}</span>
                      </>
                    )}
                  </div>
                  <CardTitle className="text-2xl md:text-3xl font-serif group-hover:text-primary transition-colors leading-tight">
                    {article.title}
                  </CardTitle>
                  {(article.excerpt || article.metaDescription) && (
                    <CardDescription className="text-base mt-3 text-foreground/60 leading-relaxed line-clamp-3">
                      {article.excerpt || article.metaDescription}
                    </CardDescription>
                  )}
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
