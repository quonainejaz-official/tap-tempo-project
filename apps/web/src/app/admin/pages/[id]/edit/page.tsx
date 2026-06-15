"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { RichEditor } from "@/components/rich-editor"

export default function EditPagePage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [content, setContent] = useState("")
  const [metaTitle, setMetaTitle] = useState("")
  const [metaDescription, setMetaDescription] = useState("")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch(`/api/pages/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found")
        return r.json()
      })
      .then((data) => {
        setTitle(data.title)
        setSlug(data.slug)
        setContent(data.content || "")
        setMetaTitle(data.metaTitle || "")
        setMetaDescription(data.metaDescription || "")
        setLoading(false)
      })
      .catch(() => {
        router.push("/admin/pages")
      })
  }, [id, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const res = await fetch(`/api/pages/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        slug,
        content,
        metaTitle: metaTitle || title,
        metaDescription,
        published: true,
      }),
    })

    if (res.ok) {
      router.push("/admin/pages")
    } else {
      toast.error("Failed to update page")
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
      <h1 className="text-3xl font-serif font-bold mb-6">Edit Page</h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <Label>Slug</Label>
            <Input value={slug} onChange={(e) => setSlug(e.target.value)} required />
          </div>
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
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.push("/admin/pages")}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
