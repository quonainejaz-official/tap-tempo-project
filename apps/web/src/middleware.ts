import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || ""

  if (host === "localhost:3000" || host === "127.0.0.1:3000") {
    return NextResponse.next()
  }

  const target = "https://www.thetaptempo.com"

  if (host.endsWith("vercel.app")) {
    const url = request.nextUrl.clone()
    url.host = "www.thetaptempo.com"
    url.protocol = "https"
    return NextResponse.redirect(url, { status: 301 })
  }

  if (host === "thetaptempo.com") {
    const url = request.nextUrl.clone()
    url.host = "www.thetaptempo.com"
    url.protocol = "https"
    return NextResponse.redirect(url, { status: 301 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api/|_next/|_static/|_vercel|favicon\\.svg|robots\\.txt|sitemap\\.xml|[\\w-]+\\.\\w+).*)",
  ],
}
