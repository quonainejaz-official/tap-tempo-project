import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center">
        <CardContent className="py-12">
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
