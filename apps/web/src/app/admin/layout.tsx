"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { FileText, Layout, LogOut, Pen, Newspaper, Menu as MenuIcon, BarChart2, Activity } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (pathname === "/admin/login") {
      setAuthenticated(true)
      return
    }

    fetch("/api/auth/me")
      .then((res) => {
        if (!res.ok) throw new Error("Not authenticated")
        setAuthenticated(true)
      })
      .catch(() => {
        setAuthenticated(false)
        router.push("/admin/login")
      })
  }, [pathname, router])

  if (pathname === "/admin/login") return <>{children}</>

  if (authenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!authenticated) return null

  const handleLogout = async () => {
    document.cookie = "admin_token=; path=/; max-age=0"
    router.push("/admin/login")
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-56 bg-card border-r hidden md:flex flex-col">
        <div className="p-4 border-b">
          <Link href="/admin" className="font-serif text-xl font-bold italic">
            TheTapTempo
          </Link>
          <p className="text-xs text-muted-foreground mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          <Link
            href="/admin"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-accent transition-colors"
          >
            <Layout className="w-4 h-4" /> Dashboard
          </Link>
          <Link
            href="/admin/blogs"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-accent transition-colors"
          >
            <Newspaper className="w-4 h-4" /> Blogs
          </Link>
          <Link
            href="/admin/pages"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-accent transition-colors"
          >
            <FileText className="w-4 h-4" /> Pages
          </Link>
          <Link
            href="/admin/navigation"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-accent transition-colors"
          >
            <MenuIcon className="w-4 h-4" /> Navigation
          </Link>
          <Link
            href="/admin/footer-links"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-accent transition-colors"
          >
            <MenuIcon className="w-4 h-4" /> Footer Links
          </Link>
          <Link
            href="/admin/analytics"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-accent transition-colors"
          >
            <BarChart2 className="w-4 h-4" /> Analytics
          </Link>
          <Link
            href="/admin/logs"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-accent transition-colors"
          >
            <Activity className="w-4 h-4" /> Logs
          </Link>
        </nav>
        <div className="p-3 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-accent transition-colors w-full text-muted-foreground"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-accent transition-colors w-full text-muted-foreground mt-1"
          >
            <Pen className="w-4 h-4" /> View Site
          </Link>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b px-4 h-12 flex items-center justify-between">
        <Link href="/admin" className="font-serif font-bold italic">
          TheTapTempo Admin
        </Link>
        <div className="flex gap-2">
          <Link href="/admin/blogs" className="text-xs text-muted-foreground hover:text-foreground">
            Blogs
          </Link>
          <Link href="/admin/pages" className="text-xs text-muted-foreground hover:text-foreground">
            Pages
          </Link>
          <Link href="/admin/navigation" className="text-xs text-muted-foreground hover:text-foreground">
            Nav
          </Link>
          <Link href="/admin/footer-links" className="text-xs text-muted-foreground hover:text-foreground">
            Footer
          </Link>
          <Link href="/admin/analytics" className="text-xs text-muted-foreground hover:text-foreground">
            Analytics
          </Link>
          <Link href="/admin/logs" className="text-xs text-muted-foreground hover:text-foreground">
            Logs
          </Link>
          <button onClick={handleLogout} className="text-xs text-muted-foreground hover:text-foreground">
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 md:pt-0 pt-12">
        <div className="p-6 max-w-5xl mx-auto">{children}</div>
      </main>
    </div>
  )
}
