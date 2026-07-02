"use client"

import { useEffect, useState, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { RichEditor } from "@/components/rich-editor"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PageNav } from "@/components/page-nav"

export default function EditPagePage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [content, setContent] = useState("")
  const [metaTitle, setMetaTitle] = useState("")
  const [metaDescription, setMetaDescription] = useState("")
  const [allowHtml, setAllowHtml] = useState(false)
  const [saving, setSaving] = useState(false)

  const [inNav, setInNav] = useState(false)
  const [navLabel, setNavLabel] = useState("")
  const [navParent, setNavParent] = useState("")
  const [navItems, setNavItems] = useState<any[]>([])
  const [footerSections, setFooterSections] = useState<string[]>(["Tools", "Reference", "More"])

  const [inFooter, setInFooter] = useState(false)
  const [footerLabel, setFooterLabel] = useState("")
  const [footerSection, setFooterSection] = useState("More")

  const loadPage = useCallback(async () => {
    try {
      const res = await fetch(`/api/pages/${id}`)
      if (!res.ok) throw new Error("Not found")
      const data = await res.json()
      setTitle(data.title)
      setSlug(data.slug)
      setContent(data.content || "")
      setMetaTitle(data.metaTitle || "")
      setMetaDescription(data.metaDescription || "")
      setAllowHtml(data.allowHtml ?? false)
      setInNav(data.display?.inNav ?? false)
      setNavLabel(data.display?.navLabel || "")
      setNavParent(data.display?.navParent || "")
      setInFooter(data.display?.inFooter ?? false)
      setFooterLabel(data.display?.footerLabel || "")
      setFooterSection(data.display?.footerSection || "More")
    } catch {
      router.push("/admin/pages")
    } finally {
      setLoading(false)
    }
  }, [id, router])

  useEffect(() => {
    loadPage()
  }, [loadPage])

  useEffect(() => {
    fetch("/api/navigation").then((r) => r.json()).then((d) => setNavItems(d.items || [])).catch(() => {})
    fetch("/api/footer-links").then((r) => r.json()).then((d) => {
      const sections = [...new Set((d.items || []).map((i: any) => i.section as string))] as string[]
      if (sections.length) setFooterSections(sections)
    }).catch(() => {})
  }, [])

  const handleRefresh = async () => {
    setRefreshing(true)
    await loadPage()
    setRefreshing(false)
  }

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
        allowHtml,
        display: {
          inNav,
          navLabel: navLabel || undefined,
          navParent: navParent || undefined,
          inFooter,
          footerLabel: footerLabel || undefined,
          footerSection: inFooter ? footerSection : undefined,
        },
      }),
    })

    if (res.ok) {
      toast.success("Page updated")
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
      <PageNav backHref="/admin/pages" onRefresh={handleRefresh} refreshing={refreshing} />
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

        <div className="flex items-center gap-2">
          <Checkbox id="allowHtml" checked={allowHtml} onCheckedChange={(v) => setAllowHtml(!!v)} />
          <Label htmlFor="allowHtml">Allow raw HTML in content (renders as-is)</Label>
        </div>

        <div>
          <Label>Content</Label>
          <RichEditor content={content} onChange={setContent} />
          {allowHtml && (
            <div className="mt-2">
              <Label>Raw HTML (appended after editor content)</Label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="mt-1 w-full rounded-xl border bg-background p-3 font-mono text-sm min-h-[120px]"
                placeholder="<div>Your custom HTML here...</div>"
              />
            </div>
          )}
        </div>

        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3 className="font-semibold">Display Options</h3>
            <p className="text-sm text-muted-foreground">Choose where this page appears on the site.</p>

            <div className="flex items-center gap-2">
              <Checkbox id="inNav" checked={inNav} onCheckedChange={(v) => setInNav(!!v)} />
              <Label htmlFor="inNav">Show in navigation menu</Label>
            </div>

            {inNav && (
              <div className="ml-6 grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Nav Label (optional)</Label>
                  <Input value={navLabel} onChange={(e) => setNavLabel(e.target.value)} placeholder="Defaults to page title" />
                </div>
                <div>
                  <Label>Parent Item (optional)</Label>
                  <Select value={navParent} onValueChange={setNavParent}>
                    <SelectTrigger><SelectValue placeholder="Top-level" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value=" ">Top-level</SelectItem>
                      {navItems.filter((i) => !i.parentId).map((i) => (
                        <SelectItem key={i._id} value={i._id}>{i.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 pt-2">
              <Checkbox id="inFooter" checked={inFooter} onCheckedChange={(v) => setInFooter(!!v)} />
              <Label htmlFor="inFooter">Show in footer</Label>
            </div>

            {inFooter && (
              <div className="ml-6 grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Footer Label (optional)</Label>
                  <Input value={footerLabel} onChange={(e) => setFooterLabel(e.target.value)} placeholder="Defaults to page title" />
                </div>
                <div>
                  <Label>Footer Section</Label>
                  <Select value={footerSection} onValueChange={setFooterSection}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {footerSections.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

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
