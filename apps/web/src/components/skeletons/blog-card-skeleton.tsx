export function BlogCardSkeleton() {
  return (
    <div className="border rounded-xl overflow-hidden animate-pulse">
      <div className="h-48 bg-muted" />
      <div className="p-6 space-y-3">
        <div className="flex gap-3">
          <div className="h-3 w-20 bg-muted rounded" />
          <div className="h-3 w-16 bg-muted rounded" />
          <div className="h-3 w-12 bg-muted rounded" />
        </div>
        <div className="h-6 w-3/4 bg-muted rounded" />
        <div className="h-4 w-full bg-muted rounded" />
        <div className="h-4 w-2/3 bg-muted rounded" />
      </div>
    </div>
  )
}

export function BlogDetailSkeleton() {
  return (
    <div className="min-h-screen animate-pulse">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 max-w-3xl">
        <div className="h-4 w-24 bg-muted rounded mb-10" />
        <div className="space-y-4 mb-8">
          <div className="h-10 w-full bg-muted rounded" />
          <div className="h-10 w-3/4 bg-muted rounded" />
        </div>
        <div className="flex gap-3 mb-8">
          <div className="h-3 w-24 bg-muted rounded" />
          <div className="h-3 w-20 bg-muted rounded" />
          <div className="h-3 w-16 bg-muted rounded" />
        </div>
        <div className="h-64 bg-muted rounded-xl mb-8" />
        <div className="space-y-3">
          <div className="h-4 w-full bg-muted rounded" />
          <div className="h-4 w-full bg-muted rounded" />
          <div className="h-4 w-5/6 bg-muted rounded" />
          <div className="h-4 w-full bg-muted rounded" />
          <div className="h-4 w-4/5 bg-muted rounded" />
        </div>
      </div>
    </div>
  )
}
