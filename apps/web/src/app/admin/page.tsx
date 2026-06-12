"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Newspaper, FileText, Plus } from "lucide-react"

export default function AdminDashboard() {
  const [stats, setStats] = useState({ blogs: 0, pages: 0 })

  useEffect(() => {
    Promise.all([
      fetch("/api/blogs").then((r) => r.json()),
      fetch("/api/pages?all=true").then((r) => r.json()),
    ]).then(([blogsData, pagesData]) => {
      setStats({
        blogs: blogsData.blogs?.length || 0,
        pages: pagesData.pages?.length || 0,
      })
    })
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-serif font-bold mb-8">Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
            <Newspaper className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.blogs}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
            <FileText className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.pages}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4">
        <Link href="/admin/blogs/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" /> New Blog
          </Button>
        </Link>
        <Link href="/admin/pages/create">
          <Button variant="outline">
            <Plus className="w-4 h-4 mr-2" /> New Page
          </Button>
        </Link>
      </div>
    </div>
  )
}
