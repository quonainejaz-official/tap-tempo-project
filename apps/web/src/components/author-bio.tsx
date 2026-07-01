import Link from "next/link"
import { BookOpen } from "lucide-react"

export function AuthorBio() {
  return (
    <div className="border-t pt-8 mt-12">
      <div className="flex items-start gap-3">
        <BookOpen className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm font-medium mb-1">About the Author</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Written by{" "}
            <Link href="/editorial-team" className="text-primary hover:underline font-medium">
              TheTapTempo Editorial Team
            </Link>
            . Our articles are researched and reviewed according to our{" "}
            <Link href="/editorial-policy" className="text-primary hover:underline font-medium">
              Editorial Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
