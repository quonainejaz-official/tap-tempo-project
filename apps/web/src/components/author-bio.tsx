import Link from "next/link"

export function AuthorBio() {
  return (
    <div className="border-t pt-8 mt-12">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-6">
        <p className="text-sm text-muted-foreground">
          By{" "}
          <Link href="/editorial-team" className="text-primary hover:underline font-medium">
            TheTapTempo Editorial Team
          </Link>
        </p>
        <span className="hidden sm:inline text-muted-foreground/40">&middot;</span>
        <p className="text-sm text-muted-foreground">
          This article has been researched, written, and reviewed according to our{" "}
          <Link href="/editorial-policy" className="text-primary hover:underline font-medium">
            Editorial Policy
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
