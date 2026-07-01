import Link from "next/link"
import { CheckCircle2 } from "lucide-react"

export function EditorialReview() {
  return (
    <div className="border-t pt-8 mt-8">
      <div className="flex items-start gap-3">
        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm font-medium mb-1">Editorial Review</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This article has been researched, written, and reviewed by the{" "}
            <Link href="/editorial-team" className="text-primary hover:underline font-medium">
              TheTapTempo Editorial Team
            </Link>{" "}
            following the{" "}
            <Link href="/editorial-policy" className="text-primary hover:underline font-medium">
              Editorial Policy
            </Link>
            . All content is fact-checked and updated regularly to maintain accuracy and relevance.
          </p>
        </div>
      </div>
    </div>
  )
}
