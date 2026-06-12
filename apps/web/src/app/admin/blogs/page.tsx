"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react"

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([])

  const fetchBlogs = async () => {
    const res = await fetch("/api/blogs")
    const data = await res.json()
    setBlogs(data.blogs || [])
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog post?")) return
    await fetch(`/api/blogs/${id}`, { method: "DELETE" })
    fetchBlogs()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-serif font-bold">Blogs</h1>
        <Link href="/admin/blogs/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" /> New Blog
          </Button>
        </Link>
      </div>

      {blogs.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No blogs yet. Create your first one!
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
                  <Link href={`/admin/blogs/${blog._id}/edit`}>
                    <Button variant="ghost" size="icon">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(blog._id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
