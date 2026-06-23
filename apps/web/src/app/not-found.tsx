import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
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
          <AlertCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-4xl font-bold mb-2">404</h1>
          <p className="text-xl font-medium mb-1">Page Not Found</p>
          <p className="text-sm text-muted-foreground">
            Did you forget to add the page to the router?
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
