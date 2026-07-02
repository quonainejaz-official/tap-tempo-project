"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Pencil, Trash2, GripVertical } from "lucide-react"
import { PageNav } from "@/components/page-nav"

interface FooterLink {
  _id: string
  label: string
  href: string
  section: string
  order: number
}

export default function FooterLinksManagerPage() {
  const [items, setItems] = useState<FooterLink[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<FooterLink | null>(null)
  const [label, setLabel] = useState("")
  const [href, setHref] = useState("")
  const [section, setSection] = useState("More")

  const [newSection, setNewSection] = useState("")

  const fetchItems = async () => {
    const res = await fetch("/api/footer-links")
    const data = await res.json()
    setItems(data.items || [])
    setLoading(false)
  }

  useEffect(() => { fetchItems() }, [])

  const sections = [...new Set(items.map((i) => i.section))]

  const startEdit = (item: FooterLink) => {
    setEditing(item)
    setLabel(item.label)
    setHref(item.href)
    setSection(item.section)
  }

  const resetForm = () => {
    setEditing(null)
    setLabel("")
    setHref("")
    setSection("More")
  }

  const handleSave = async () => {
    if (!label || !href) {
      toast.error("Label and href are required")
      return
    }

    if (editing) {
      const res = await fetch(`/api/footer-links/${editing._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label, href, section, order: editing.order }),
      })
      if (res.ok) {
        toast.success("Link updated")
        resetForm()
        fetchItems()
      } else {
        toast.error("Failed to update")
      }
    } else {
      const res = await fetch("/api/footer-links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label, href, section, order: items.length }),
      })
      if (res.ok) {
        toast.success("Link created")
        resetForm()
        fetchItems()
      } else {
        toast.error("Failed to create")
      }
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this footer link?")) return
    const res = await fetch(`/api/footer-links/${id}`, { method: "DELETE" })
    if (res.ok) {
      toast.success("Link deleted")
      fetchItems()
    } else {
      toast.error("Failed to delete")
    }
  }

  const grouped = sections.map((sec) => ({
    section: sec,
    links: items.filter((i) => i.section === sec).sort((a, b) => a.order - b.order),
  }))

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div>
      <PageNav backHref="/admin" onRefresh={fetchItems} />
      <h1 className="text-3xl font-serif font-bold mb-6">Footer Links Manager</h1>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="font-semibold mb-4">{editing ? "Edit Link" : "Add New Link"}</h2>
          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label>Label</Label>
                <Input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="e.g. Privacy Policy" />
              </div>
              <div>
                <Label>Href</Label>
                <Input value={href} onChange={(e) => setHref(e.target.value)} placeholder="e.g. /privacy" />
              </div>
              <div>
                <Label>Section</Label>
                <div className="flex gap-2">
                  <select
                    value={section}
                    onChange={(e) => {
                      if (e.target.value === "__new__") {
                        setNewSection("")
                        setSection("__new__")
                      } else {
                        setSection(e.target.value)
                      }
                    }}
                    className="flex-1 rounded-xl border bg-background p-2 text-sm"
                  >
                    {sections.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                    <option value="__new__">+ New section...</option>
                  </select>
                </div>
                {section === "__new__" && (
                  <Input
                    value={newSection}
                    onChange={(e) => {
                      setNewSection(e.target.value)
                      setSection(e.target.value)
                    }}
                    placeholder="New section name"
                    className="mt-2"
                  />
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave}>{editing ? "Update" : "Add"} Link</Button>
              {editing && <Button variant="outline" onClick={resetForm}>Cancel</Button>}
            </div>
          </div>
        </CardContent>
      </Card>

      {grouped.map(({ section, links }) => (
        <div key={section} className="mb-6">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-2">{section}</h3>
          <div className="space-y-1">
            {links.map((link) => (
              <div key={link._id} className="flex items-center gap-2 p-3 rounded-lg border bg-card">
                <GripVertical className="w-4 h-4 text-muted-foreground shrink-0" />
                <div className="flex-1">
                  <p className="font-medium">{link.label}</p>
                  <p className="text-xs text-muted-foreground">{link.href}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => startEdit(link)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(link._id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      ))}
      {items.length === 0 && (
        <p className="text-muted-foreground text-center py-8">No footer links yet. Add one above.</p>
      )}
    </div>
  )
}
