"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react"
import { PageNav } from "@/components/page-nav"

export default function AdminPagesPage() {
  const [pages, setPages] = useState<any[]>([])
  const [refreshing, setRefreshing] = useState(false)

  const fetchPages = useCallback(async () => {
    const res = await fetch("/api/pages?all=true")
    const data = await res.json()
    setPages(data.pages || [])
  }, [])

  useEffect(() => {
    fetchPages()
  }, [fetchPages])

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchPages()
    setRefreshing(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this page?")) return
    await fetch(`/api/pages/${id}`, { method: "DELETE" })
    fetchPages()
  }

  return (
    <div>
      <PageNav backHref="/admin" onRefresh={handleRefresh} refreshing={refreshing} />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-serif font-bold">Pages</h1>
        <Link href="/admin/pages/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" /> New Page
          </Button>
        </Link>
      </div>

      {pages.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No pages yet. Create your first one!
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {pages.map((page) => (
            <Card key={page._id}>
              <CardContent className="flex items-center justify-between py-4">
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold truncate">{page.title}</h3>
                  <p className="text-sm text-muted-foreground truncate">
                    /{page.slug} — {page.published ? "Published" : "Draft"}
                  </p>
                </div>
                <div className="flex gap-2 ml-4">
                  <Link href={`/${page.slug}`} target="_blank">
                    <Button variant="ghost" size="icon">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href={`/admin/pages/${page._id}/edit`}>
                    <Button variant="ghost" size="icon">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(page._id)}>
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
