"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, RefreshCw } from "lucide-react"
import { useRouter } from "next/navigation"

interface PageNavProps {
  backHref?: string
  onRefresh?: () => void
  refreshing?: boolean
}

export function PageNav({ backHref, onRefresh, refreshing }: PageNavProps) {
  const router = useRouter()

  return (
    <div className="flex items-center justify-between mb-6">
      {backHref ? (
        <Button variant="ghost" size="sm" onClick={() => router.push(backHref)} className="gap-1">
          <ChevronLeft className="w-4 h-4" /> Back
        </Button>
      ) : (
        <div />
      )}
      {onRefresh && (
        <Button variant="outline" size="sm" onClick={onRefresh} disabled={refreshing} className="gap-1">
          <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      )}
    </div>
  )
}
