"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useMemo } from "react"
import {
  ArrowUpDown,
  Calendar,
  Clock,
  TextQuote,
  RefreshCw,
  Search,
} from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useBlogStore, BlogItem } from "@/stores/use-blog-store"
import { BlogCardSkeleton } from "@/components/skeletons/blog-card-skeleton"

type SortField = "createdAt" | "title" | "readTime"
type SortDir = "asc" | "desc"

const INITIAL_VISIBLE = 9
const LOAD_MORE_STEP = 6

const sortLabels: Record<SortField, string> = {
  createdAt: "Date",
  title: "Title",
  readTime: "Read Time",
}

const gridImageSizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
const featuredImageSizes = "(max-width: 1024px) 100vw, 1024px"

function ArticleMeta({ article }: { article: BlogItem }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground mb-3 font-mono">
      <span>
        {article.createdAt
          ? new Date(article.createdAt).toLocaleDateString("en-US", {
              timeZone: "UTC",
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : ""}
      </span>
      {article.createdAt && (
        <span className="text-xs">
          {new Date(article.createdAt).toLocaleTimeString("en-US", {
            timeZone: "UTC",
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
      {article.author ? (
        <>
          <span>&middot;</span>
          <span>By {article.author}</span>
        </>
      ) : (
        <>
          <span>&middot;</span>
          <span>By TheTapTempo Editorial Team</span>
        </>
      )}
    </div>
  )
}

export function BlogListing({ initialArticles = [] }: { initialArticles?: BlogItem[] }) {
  const { items, loading, error, fetched, fetchBlogs, refresh } = useBlogStore()
  const [seeded, setSeeded] = useState(false)
  const [sortField, setSortField] = useState<SortField>("createdAt")
  const [sortDir, setSortDir] = useState<SortDir>("desc")
  const [query, setQuery] = useState("")
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    if (initialArticles.length > 0) {
      if (!seeded && useBlogStore.getState().items.length === 0) {
        useBlogStore.setState({ items: initialArticles, loading: false, fetched: true, error: null })
      }
      setSeeded(true)
    } else {
      fetchBlogs()
    }
  }, [initialArticles, seeded, fetchBlogs])

  const articles = seeded ? items : initialArticles

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

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return sorted
    return sorted.filter((article) => {
      const haystack = [
        article.title,
        article.excerpt,
        article.metaDescription,
        article.metaTitle,
        article.tags?.join(" "),
        article.author,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [sorted, query])

  const featured = useMemo(() => {
    if (articles.length === 0) return null
    return [...articles].sort(
      (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime(),
    )[0]
  }, [articles])

  const hasQuery = query.trim().length > 0

  const grid = useMemo(() => {
    if (hasQuery) return filtered
    if (!featured) return filtered
    return filtered.filter((a) => a._id !== featured._id)
  }, [filtered, hasQuery, featured])

  const paginated = useMemo(() => grid.slice(0, visibleCount), [grid, visibleCount])

  const hasMore = visibleCount < grid.length

  const toggleDir = () => setSortDir((d) => (d === "asc" ? "desc" : "asc"))

  const handleQueryChange = (value: string) => {
    setQuery(value)
    setVisibleCount(INITIAL_VISIBLE)
  }

  return (
    <>
      {loading || (!fetched && !error && initialArticles.length === 0) ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <>
          {/* Featured Article */}
          {featured && !hasQuery && (
            <section className="mb-12" aria-labelledby="featured-guide-heading">
              <div className="mb-6">
                <h2 id="featured-guide-heading" className="text-2xl md:text-3xl font-serif font-bold">
                  Featured Guide
                </h2>
              </div>
              <Link href={`/blog/${featured.slug}`} aria-label={featured.title} className="group block">
                <article className="h-full">
                  <Card className="h-full hover:border-primary/50 transition-all cursor-pointer group-hover:shadow-md overflow-hidden">
                    {featured.coverImage && (
                      <div className="relative h-64 md:h-80 rounded-t-xl overflow-hidden bg-muted">
                        <Image
                          src={featured.coverImage}
                          alt={featured.title}
                          fill
                          sizes={featuredImageSizes}
                          priority
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardHeader className="p-6 md:p-8">
                      <ArticleMeta article={featured} />
                      <CardTitle className="text-2xl md:text-3xl font-serif group-hover:text-primary transition-colors leading-tight">
                        {featured.title}
                      </CardTitle>
                      {(featured.excerpt || featured.metaDescription) && (
                        <CardDescription className="text-base mt-3 text-foreground/60 leading-relaxed line-clamp-3">
                          {featured.excerpt || featured.metaDescription}
                        </CardDescription>
                      )}
                    </CardHeader>
                  </Card>
                </article>
              </Link>
            </section>
          )}

          {/* Latest Guides */}
          <section className="mb-12" aria-labelledby="latest-guides-heading">
            <h2 id="latest-guides-heading" className="text-2xl md:text-3xl font-serif font-bold mb-6">
              Latest Guides
            </h2>

            {/* Search */}
            <div role="search" className="relative mb-5">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                type="search"
                placeholder="Search guides..."
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                className="pl-9"
                aria-label="Search guides"
              />
            </div>

            {/* Sort controls + refresh */}
            <div role="group" aria-label="Sort articles" className="flex flex-wrap items-center gap-2 mb-8 pb-6 border-b">
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider mr-2">Sort by</span>
              {(Object.keys(sortLabels) as SortField[]).map((field) => (
                <Button
                  key={field}
                  variant={sortField === field ? "secondary" : "ghost"}
                  size="sm"
                  aria-pressed={sortField === field}
                  aria-label={`${sortLabels[field]}${
                    sortField === field ? ` (${sortDir === "asc" ? "ascending" : "descending"})` : ""
                  }`}
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
                <span aria-live="polite">
                  {filtered.length} article{filtered.length !== 1 ? "s" : ""}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={refreshing}
                  aria-label="Refresh articles"
                  className="h-8 text-xs gap-1"
                >
                  <RefreshCw className={`w-3 h-3 ${refreshing ? "animate-spin" : ""}`} />
                </Button>
              </span>
            </div>

            {/* Article Grid */}
            {paginated.length > 0 ? (
              <>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {paginated.map((article) => (
                    <Link
                      key={article._id || article.slug}
                      href={`/blog/${article.slug}`}
                      aria-label={article.title}
                      className="group block h-full"
                    >
                      <article className="h-full">
                        <Card className="h-full flex flex-col hover:border-primary/50 transition-all cursor-pointer group-hover:shadow-md overflow-hidden">
                          {article.coverImage && (
                            <div className="relative h-48 rounded-t-xl overflow-hidden bg-muted">
                              <Image
                                src={article.coverImage}
                                alt={article.title}
                                fill
                                sizes={gridImageSizes}
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          )}
                          <CardHeader className="p-6 flex-1">
                            <ArticleMeta article={article} />
                            <CardTitle className="text-xl font-serif group-hover:text-primary transition-colors leading-tight line-clamp-2">
                              {article.title}
                            </CardTitle>
                            {(article.excerpt || article.metaDescription) && (
                              <CardDescription className="text-base mt-3 text-foreground/60 leading-relaxed line-clamp-2">
                                {article.excerpt || article.metaDescription}
                              </CardDescription>
                            )}
                          </CardHeader>
                        </Card>
                      </article>
                    </Link>
                  ))}
                </div>

                {hasMore && (
                  <div className="mt-12 text-center">
                    <Button variant="outline" onClick={() => setVisibleCount((c) => c + LOAD_MORE_STEP)}>
                      Load More Articles
                    </Button>
                  </div>
                )}
              </>
            ) : hasQuery ? (
              <div className="text-center text-muted-foreground py-12">
                <p className="font-medium text-foreground mb-1">No articles found.</p>
                <p>Try another keyword.</p>
              </div>
            ) : articles.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">
                No articles published yet. Check back soon!
              </p>
            ) : null}
          </section>

          <div className="mt-12 border-t pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Have questions about tempo, BPM, or music theory?{" "}
              <Link href="/ai-tempo" className="text-primary font-medium hover:underline">
                Get answers with TapTempoAI
              </Link>
            </p>
          </div>
        </>
      )}
    </>
  )
}
