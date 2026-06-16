"use client"

import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useState, useEffect, useMemo } from "react"
import { ArrowUpDown, Calendar, Clock, TextQuote, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useBlogStore } from "@/stores/use-blog-store"
import { BlogCardSkeleton } from "@/components/skeletons/blog-card-skeleton"
import { PageNav } from "@/components/page-nav"

type SortField = "createdAt" | "title" | "readTime"
type SortDir = "asc" | "desc"

const sortLabels: Record<SortField, string> = {
  createdAt: "Date",
  title: "Title",
  readTime: "Read Time",
}

export default function BlogPage() {
  const { items: articles, loading, fetch, refresh } = useBlogStore()
  const [sortField, setSortField] = useState<SortField>("createdAt")
  const [sortDir, setSortDir] = useState<SortDir>("desc")
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetch()
  }, [fetch])

  const handleRefresh = async () => {
    setRefreshing(true)
    await refresh()
    setRefreshing(false)
  }

  const sorted = useMemo(() => {
    const items = [...articles]
    items.sort((a, b) => {
      let cmp = 0
      if (sortField === "createdAt") {
        const da = new Date(a.createdAt || 0).getTime()
        const db = new Date(b.createdAt || 0).getTime()
        cmp = da - db
      } else if (sortField === "title") {
        cmp = (a.title || "").localeCompare(b.title || "")
      } else if (sortField === "readTime") {
        const getMin = (rt: string | undefined) => parseInt(rt || "") || 0
        cmp = getMin(a.readTime) - getMin(b.readTime)
      }
      return sortDir === "asc" ? cmp : -cmp
    })
    return items
  }, [articles, sortField, sortDir])

  const toggleDir = () => setSortDir((d) => (d === "asc" ? "desc" : "asc"))

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-serif font-bold tracking-tight mb-4">TheTapTempo Blog</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Guides, theory, and production tips on rhythm, tempo, and music production.
        </p>
      </div>

      {/* Sort controls + refresh */}
      <div className="flex flex-wrap items-center gap-2 mb-8 pb-6 border-b">
        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider mr-2">Sort by</span>
        {(Object.keys(sortLabels) as SortField[]).map((field) => (
          <Button
            key={field}
            variant={sortField === field ? "secondary" : "ghost"}
            size="sm"
            onClick={() => {
              if (sortField === field) toggleDir()
              else {
                setSortField(field)
                setSortDir(field === "createdAt" ? "desc" : "asc")
              }
            }}
            className="h-8 text-xs gap-1"
          >
            {field === "createdAt" && <Calendar className="w-3 h-3" />}
            {field === "title" && <TextQuote className="w-3 h-3" />}
            {field === "readTime" && <Clock className="w-3 h-3" />}
            {sortLabels[field]}
            {sortField === field && (
              <ArrowUpDown className={`w-3 h-3 transition-transform ${sortDir === "asc" ? "rotate-180" : ""}`} />
            )}
          </Button>
        ))}
        <span className="text-xs text-muted-foreground ml-auto flex items-center gap-3">
          {articles.length} article{articles.length !== 1 ? "s" : ""}
          <Button variant="ghost" size="sm" onClick={handleRefresh} disabled={refreshing} className="h-7 text-xs gap-1">
            <RefreshCw className={`w-3 h-3 ${refreshing ? "animate-spin" : ""}`} />
          </Button>
        </span>
      </div>

      {loading ? (
        <div className="grid gap-8">
          {[1, 2, 3].map((i) => <BlogCardSkeleton key={i} />)}
        </div>
      ) : (
        <div className="grid gap-8">
          {sorted.length > 0 ? (
            sorted.map((article: any) => (
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
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground mb-3 font-mono">
                      <span>
                        {article.createdAt
                          ? new Date(article.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : ""}
                      </span>
                      {article.createdAt && (
                        <span className="text-xs">
                          {new Date(article.createdAt).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      )}
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
      )}
    </div>
  )
}
