"use client"

import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

const links = [
  { href: "/tap-tempo", label: "Tap Tempo" },
  { href: "/metronome", label: "Metronome" },
  { href: "/bpm-calculator", label: "Calculator" },
  { href: "/bpm-to-ms", label: "BPM to ms" },
  { href: "/delay-time-calculator", label: "Delay Time" },
  { href: "/tempo-markings", label: "Markings" },
  { href: "/beats-per-bar-calculator", label: "Beats/Bar" },
  { href: "/blog", label: "Blog" },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center px-4 md:px-8">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-serif text-2xl font-bold italic tracking-tight">TheTapTempo</span>
        </Link>

        <div className="hidden md:flex flex-1 items-center justify-between space-x-2">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {links.map((link) => (
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
                {links.map((link) => (
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
