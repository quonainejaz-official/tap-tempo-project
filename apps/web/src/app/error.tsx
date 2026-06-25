"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Unhandled error:", error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center">
        <CardContent className="py-12">
          <Link href="/" className="inline-block mb-6">
            <Image
              src="/logo.svg"
              alt="TheTapTempo Logo"
              width={160}
              height={40}
              className="h-8 w-auto mx-auto"
            />
          </Link>
          <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-4xl font-bold mb-2">Something went wrong</h1>
          <p className="text-sm text-muted-foreground mb-6">
            An unexpected error occurred. Please try again or return home.
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => reset()}>
              Try again
            </Button>
            <Button variant="default" asChild>
              <Link href="/">Go home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
