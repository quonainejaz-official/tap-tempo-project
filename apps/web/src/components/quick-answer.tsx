"use client"

interface QuickAnswerProps {
  html: string
}

export function QuickAnswer({ html }: QuickAnswerProps) {
  return (
    <div className="callout-takeaway mb-8">
      <p className="text-sm font-semibold text-foreground mb-2">Quick Answer</p>
      <div
        className="text-sm text-muted-foreground leading-relaxed [&_p:last-child]:mb-0 [&_p]:mb-2"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
