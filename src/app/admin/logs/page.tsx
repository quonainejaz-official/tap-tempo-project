"use client"

import { useEffect, useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronRight, Eye, MousePointerClick, LogIn, Globe } from "lucide-react"
import { PageNav } from "@/components/page-nav"

interface LogEntry {
  _id: string
  type: string
  path: string
  ip: string
  browser: string
  device: string
  referrer: string | null
  element: string | null
  timestamp: string
  metadata: Record<string, unknown> | null
}

interface LogsResponse {
  items: LogEntry[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

const typeConfig: Record<string, { label: string; color: string; bg: string }> = {
  page_view: { label: "Page View", color: "text-blue-500", bg: "bg-blue-500/10" },
  click: { label: "Click", color: "text-orange-500", bg: "bg-orange-500/10" },
  login: { label: "Login", color: "text-purple-500", bg: "bg-purple-500/10" },
}

export default function LogsPage() {
  const [data, setData] = useState<LogsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [typeFilter, setTypeFilter] = useState("")
  const [ipFilter, setIpFilter] = useState("")
  const [days, setDays] = useState(7)

  const fetchLogs = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      params.set("page", String(page))
      params.set("limit", "50")
      params.set("days", String(days))
      if (typeFilter) params.set("type", typeFilter)
      if (ipFilter) params.set("ip", ipFilter)

      const res = await fetch(`/api/logs?${params.toString()}`)
      const json = await res.json()
      setData(json)
    } catch {
      console.error("Failed to fetch logs")
    } finally {
      setLoading(false)
    }
  }, [page, typeFilter, ipFilter, days])

  useEffect(() => { fetchLogs() }, [fetchLogs])

  useEffect(() => { setPage(1) }, [typeFilter, ipFilter, days])

  const formatTime = (ts: string) => {
    const d = new Date(ts)
    return d.toLocaleString("en-US", {
      month: "short", day: "numeric",
      hour: "2-digit", minute: "2-digit", second: "2-digit",
    })
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "page_view": return <Eye className="w-3.5 h-3.5" />
      case "click": return <MousePointerClick className="w-3.5 h-3.5" />
      case "login": return <LogIn className="w-3.5 h-3.5" />
      default: return <Globe className="w-3.5 h-3.5" />
    }
  }

  return (
    <div>
      <PageNav backHref="/admin" onRefresh={fetchLogs} />

      <h1 className="text-3xl font-serif font-bold mb-6">Activity Logs</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex gap-2">
          {[
            { value: "", label: "All" },
            { value: "page_view", label: "Page Views" },
            { value: "click", label: "Clicks" },
            { value: "login", label: "Logins" },
          ].map((f) => (
            <Button
              key={f.value}
              variant={typeFilter === f.value ? "default" : "outline"}
              size="sm"
              onClick={() => setTypeFilter(f.value)}
            >
              {f.label}
            </Button>
          ))}
        </div>
        <Input
          placeholder="Filter by IP..."
          value={ipFilter}
          onChange={(e) => setIpFilter(e.target.value)}
          className="w-48"
        />
        <div className="flex gap-2">
          {[7, 14, 30].map((d) => (
            <Button
              key={d}
              variant={days === d ? "default" : "outline"}
              size="sm"
              onClick={() => setDays(d)}
            >
              {d}d
            </Button>
          ))}
        </div>
      </div>

      {/* Stats Summary */}
      {data && (
        <div className="flex gap-4 mb-6 text-sm text-muted-foreground">
          <span>{data.pagination.total.toLocaleString()} total entries</span>
          <span>•</span>
          <span>Page {data.pagination.page} of {data.pagination.totalPages}</span>
        </div>
      )}

      {/* Logs Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
        </div>
      ) : !data || data.items.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No logs found matching your filters.
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-3 font-medium text-muted-foreground">Time</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Type</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Path</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">IP</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Browser</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Device</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Referrer</th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((log) => {
                    const config = typeConfig[log.type] || { label: log.type, color: "text-muted-foreground", bg: "bg-muted" }
                    return (
                      <tr key={log._id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                        <td className="p-3 font-mono text-xs whitespace-nowrap">
                          {formatTime(log.timestamp)}
                        </td>
                        <td className="p-3">
                          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
                            {getTypeIcon(log.type)}
                            {config.label}
                          </span>
                        </td>
                        <td className="p-3 font-mono text-xs max-w-[200px] truncate">
                          {log.path || "—"}
                        </td>
                        <td className="p-3 font-mono text-xs whitespace-nowrap">
                          {log.ip || "—"}
                        </td>
                        <td className="p-3 text-xs whitespace-nowrap">
                          {log.browser || "—"}
                        </td>
                        <td className="p-3 text-xs whitespace-nowrap">
                          {log.device || "—"}
                        </td>
                        <td className="p-3 text-xs max-w-[180px] truncate">
                          {log.referrer || "—"}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {data.pagination.totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-muted-foreground">
                Showing {((page - 1) * 50) + 1}–{Math.min(page * 50, data.pagination.total)} of {data.pagination.total}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                {Array.from({ length: Math.min(5, data.pagination.totalPages) }, (_, i) => {
                  const start = Math.max(1, Math.min(page - 2, data.pagination.totalPages - 4))
                  const p = start + i
                  if (p > data.pagination.totalPages) return null
                  return (
                    <Button
                      key={p}
                      variant={p === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </Button>
                  )
                })}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(p => Math.min(data.pagination.totalPages, p + 1))}
                  disabled={page === data.pagination.totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
