"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Pencil, Trash2, Plus, GripVertical } from "lucide-react"
import { PageNav } from "@/components/page-nav"

interface NavItem {
  _id: string
  label: string
  href: string
  parentId: string | null
  order: number
  section: string
}

export default function NavigationManagerPage() {
  const [items, setItems] = useState<NavItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<NavItem | null>(null)
  const [label, setLabel] = useState("")
  const [href, setHref] = useState("")
  const [parentId, setParentId] = useState("")

  const fetchItems = async () => {
    const res = await fetch("/api/navigation")
    const data = await res.json()
    setItems(data.items || [])
    setLoading(false)
  }

  useEffect(() => { fetchItems() }, [])

  const startEdit = (item: NavItem) => {
    setEditing(item)
    setLabel(item.label)
    setHref(item.href)
    setParentId(item.parentId || "")
  }

  const resetForm = () => {
    setEditing(null)
    setLabel("")
    setHref("")
    setParentId("")
  }

  const handleSave = async () => {
    if (!label || !href) {
      toast.error("Label and href are required")
      return
    }

    if (editing) {
      const res = await fetch(`/api/navigation/${editing._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label, href, parentId: parentId || null, order: editing.order, section: editing.section }),
      })
      if (res.ok) {
        toast.success("Item updated")
        resetForm()
        fetchItems()
      } else {
        toast.error("Failed to update")
      }
    } else {
      const res = await fetch("/api/navigation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label, href, parentId: parentId || null, order: items.length, section: "" }),
      })
      if (res.ok) {
        toast.success("Item created")
        resetForm()
        fetchItems()
      } else {
        toast.error("Failed to create")
      }
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this nav item?")) return
    const res = await fetch(`/api/navigation/${id}`, { method: "DELETE" })
    if (res.ok) {
      toast.success("Item deleted")
      fetchItems()
    } else {
      toast.error("Failed to delete")
    }
  }

  const topLevel = items.filter((i) => !i.parentId).sort((a, b) => a.order - b.order)
  const children = (parentId: string) => items.filter((i) => i.parentId === parentId).sort((a, b) => a.order - b.order)

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
      <h1 className="text-3xl font-serif font-bold mb-6">Navigation Manager</h1>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="font-semibold mb-4">{editing ? "Edit Item" : "Add New Item"}</h2>
          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label>Label</Label>
                <Input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="e.g. About Us" />
              </div>
              <div>
                <Label>Href</Label>
                <Input value={href} onChange={(e) => setHref(e.target.value)} placeholder="e.g. /about" />
              </div>
              <div>
                <Label>Parent (optional)</Label>
                <select
                  value={parentId}
                  onChange={(e) => setParentId(e.target.value)}
                  className="w-full rounded-xl border bg-background p-2 text-sm"
                >
                  <option value="">Top-level</option>
                  {topLevel.map((i) => (
                    <option key={i._id} value={i._id}>{i.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave}>{editing ? "Update" : "Add"} Item</Button>
              {editing && <Button variant="outline" onClick={resetForm}>Cancel</Button>}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-2">
        {topLevel.map((item) => (
          <div key={item._id}>
            <div className="flex items-center gap-2 p-3 rounded-lg border bg-card">
              <GripVertical className="w-4 h-4 text-muted-foreground shrink-0" />
              <div className="flex-1">
                <p className="font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.href}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => startEdit(item)}>
                <Pencil className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(item._id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            {children(item._id).map((child) => (
              <div key={child._id} className="ml-6 flex items-center gap-2 p-3 rounded-lg border bg-card/50 mt-1">
                <GripVertical className="w-4 h-4 text-muted-foreground shrink-0" />
                <div className="flex-1">
                  <p className="font-medium">{child.label}</p>
                  <p className="text-xs text-muted-foreground">{child.href}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => startEdit(child)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(child._id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        ))}
        {topLevel.length === 0 && (
          <p className="text-muted-foreground text-center py-8">No navigation items yet. Add one above.</p>
        )}
      </div>
    </div>
  )
}
