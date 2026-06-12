"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { RichEditor } from "@/components/rich-editor"

export default function CreatePagePage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [content, setContent] = useState("")
  const [metaTitle, setMetaTitle] = useState("")
  const [metaDescription, setMetaDescription] = useState("")
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const res = await fetch("/api/pages", {
      method: "POST",
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
      alert("Failed to create page")
      setSaving(false)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-serif font-bold mb-6">Create Page</h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Title</Label>
            <Input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                if (!slug) {
                  const s = e.target.value
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-|-$/g, "")
                  setSlug(s)
                }
              }}
              required
            />
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
            <h3 className="font-semibold">SEO Settings (optional)</h3>
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
            {saving ? "Publishing..." : "Publish Page"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.push("/admin/pages")}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
