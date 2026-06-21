"use client"

import Link from "next/link"
import Image from "next/image"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useEffect, useState } from "react"

const defaultLinks = [
  { href: "/tap-tempo", label: "Tap Tempo" },
  { href: "/metronome", label: "Metronome" },
  { href: "/bpm-calculator", label: "BPM Calculator" },
  { href: "/bpm-to-ms", label: "BPM to ms" },
  { href: "/delay-reverb-time-calculator", label: "Delay & Reverb Time" },
  { href: "/tempo-markings", label: "Markings" },
  { href: "/beats-per-bar-calculator", label: "Beats/Bar" },
  { href: "/blog", label: "Blog" },
  { href: "/ai-tempo", label: "TapTempo-AI" },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [navLinks, setNavLinks] = useState(defaultLinks)

  useEffect(() => {
    fetch("/api/navigation")
      .then((r) => r.json())
      .then((data) => {
        if (data.items?.length) {
          const sorted = data.items
            .filter((i: any) => !i.parentId)
            .sort((a: any, b: any) => a.order - b.order)
            .map((i: any) => ({
              href: i.href,
              label: i.label,
            }))
          if (sorted.length) {
            const merged = [...defaultLinks]
            for (const link of sorted) {
              if (!merged.some((l) => l.href === link.href)) {
                merged.push(link)
              }
            }
            setNavLinks(merged)
          }
        }
      })
      .catch(() => {})
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center px-4 md:px-8">
        <Link href="/" className="mr-6 flex items-center">
          <Image
            src="/logo.svg"
            alt="TheTapTempo Logo"
            width={200}
            height={50}
            className="h-10 w-auto"
            priority
          />
        </Link>

        <div className="hidden md:flex flex-1 items-center justify-between space-x-2">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>

        <div className="flex flex-1 items-center justify-end md:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 mt-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-lg font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
