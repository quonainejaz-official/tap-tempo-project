"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import { PageNav } from "@/components/page-nav"

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([])
  const [refreshing, setRefreshing] = useState(false)

  const fetchBlogs = useCallback(async () => {
    const res = await fetch("/api/blogs")
    const data = await res.json()
    setBlogs(data.blogs || [])
  }, [])

  useEffect(() => {
    fetchBlogs()
  }, [fetchBlogs])

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchBlogs()
    setRefreshing(false)
  }

  return (
    <div>
      <PageNav backHref="/admin" onRefresh={handleRefresh} refreshing={refreshing} />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-serif font-bold">Blogs</h1>
      </div>

      <Card className="mb-6">
        <CardContent className="py-4 text-sm text-muted-foreground">
          Blog posts are published from version-controlled source in{" "}
          <code className="text-foreground">src/data/blogs/</code>. The admin blog
          CMS is read-only because public blog routes render from that registry, so
          edits made here would never go live. To publish a post, add or update a
          registry entry and redeploy.
        </CardContent>
      </Card>

      {blogs.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No blog posts found in the registry.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {blogs.map((blog) => (
            <Card key={blog._id}>
              <CardContent className="flex items-center justify-between py-4">
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold truncate">{blog.title}</h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {blog.slug} — {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : ""}
                  </p>
                </div>
                <div className="flex gap-2 ml-4">
                  <Link href={`/blog/${blog.slug}`} target="_blank">
                    <Button variant="ghost" size="icon">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
