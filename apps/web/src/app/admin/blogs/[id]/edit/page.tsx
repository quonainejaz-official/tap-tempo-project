"use client"

import { useEffect, useState, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { RichEditor } from "@/components/rich-editor"
import { PageNav } from "@/components/page-nav"

export default function EditBlogPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [content, setContent] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [metaTitle, setMetaTitle] = useState("")
  const [metaDescription, setMetaDescription] = useState("")
  const [author, setAuthor] = useState("Admin")
  const [coverImage, setCoverImage] = useState("")
  const [coverImagePublicId, setCoverImagePublicId] = useState("")
  const [coverPreview, setCoverPreview] = useState("")
  const [oldCoverImage, setOldCoverImage] = useState("")
  const [saving, setSaving] = useState(false)

  const sanitizeSlug = (val: string) => {
    return val.trim().replace(/^\/+|\/+$/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
  }

  const loadBlog = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/blogs/${id}`)
      const data = await res.json()
      setTitle(data.title)
      setSlug(sanitizeSlug(data.slug || ""))
      setContent(data.content || "")
      setExcerpt(data.excerpt || "")
      setMetaTitle(data.metaTitle || "")
      setMetaDescription(data.metaDescription || "")
      setAuthor(data.author || "Admin")
      setCoverImage(data.coverImage || "")
      setCoverImagePublicId(data.coverImagePublicId || "")
      setCoverPreview(data.coverImage || "")
      setOldCoverImage(data.coverImage || "")
    } catch {
      router.push("/admin/blogs")
    } finally {
      setLoading(false)
    }
  }, [id, router])

  useEffect(() => {
    loadBlog()
  }, [loadBlog])

  const handleRefresh = async () => {
    setRefreshing(true)
    await loadBlog()
    setRefreshing(false)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)

    const res = await fetch("/api/upload", { method: "POST", body: formData })
    const data = await res.json()

    if (data.url) {
      setCoverImage(data.url)
      setCoverImagePublicId(data.publicId)
      setCoverPreview(data.url)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const readTime = calculateReadTime(content)

    const res = await fetch(`/api/blogs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        slug,
        content,
        excerpt,
        coverImage,
        coverImagePublicId,
        metaTitle: metaTitle || title,
        metaDescription: metaDescription || excerpt,
        author,
        tags: [],
        published: true,
        readTime,
        oldCoverImage: coverImage !== oldCoverImage ? oldCoverImage : undefined,
      }),
    })

    if (res.ok) {
      router.push("/admin/blogs")
    } else {
      toast.error("Failed to update blog")
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div>
      <PageNav backHref="/admin/blogs" onRefresh={handleRefresh} refreshing={refreshing} />
      <h1 className="text-3xl font-serif font-bold mb-6">Edit Blog</h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <Label>Slug</Label>
            <Input value={slug} onChange={(e) => setSlug(sanitizeSlug(e.target.value))} required />
          </div>
        </div>

        <div>
          <Label className="text-sm font-semibold">Short Description / Excerpt</Label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="A brief summary that appears in blog listings and search results..."
            rows={3}
            className="mt-1 w-full rounded-xl border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
          <p className="text-xs text-muted-foreground mt-1">This appears below the title in blog listings. Keep it under 160 characters for SEO.</p>
        </div>

        <div>
          <Label>Cover Image</Label>
          <Input type="file" accept="image/*" onChange={handleImageUpload} />
          {coverPreview && (
            <img src={coverPreview} alt="Preview" className="mt-2 rounded-lg max-h-40 object-cover" />
          )}
        </div>

        <div>
          <Label>Content</Label>
          <RichEditor content={content} onChange={setContent} />
        </div>

        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3 className="font-semibold">SEO Settings</h3>
            <div>
              <Label>Meta Title</Label>
              <Input value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} />
            </div>
            <div>
              <Label>Meta Description</Label>
              <Input value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} />
            </div>
            <div>
              <Label>Author</Label>
              <Input value={author} onChange={(e) => setAuthor(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.push("/admin/blogs")}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}

function calculateReadTime(html: string): string {
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/&[^;]+;/g, " ")
    .replace(/\s+/g, " ")
    .trim()
  const words = text ? text.split(" ").length : 0
  const minutes = Math.max(1, Math.ceil(words / 180))
  return `${minutes} min read`
}
