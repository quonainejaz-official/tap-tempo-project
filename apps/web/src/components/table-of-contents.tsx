"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { List, ChevronDown } from "lucide-react"

interface TocHeading {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  headings: TocHeading[]
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")
  const [open, setOpen] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const handleClick = useCallback((e: React.MouseEvent, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
      setOpen(false)
    }
  }, [])

  useEffect(() => {
    if (headings.length === 0) return

    const ids = headings.map((h) => h.id)
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    )

    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observerRef.current.observe(el)
    }

    return () => observerRef.current?.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <div className="mb-10 border rounded-xl bg-card">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium md:cursor-default md:pointer-events-none"
      >
        <span className="flex items-center gap-2">
          <List className="w-4 h-4 text-primary" />
          Table of Contents
        </span>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground transition-transform md:hidden ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <nav
        className={`border-t px-4 py-3 ${
          open ? "block" : "hidden md:block"
        }`}
      >
        <ul className="space-y-1">
          {headings.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                onClick={(e) => handleClick(e, h.id)}
                className={`block text-sm py-1 transition-colors hover:text-primary ${
                  h.level === 3 ? "pl-4 text-muted-foreground" : "font-medium"
                } ${
                  activeId === h.id
                    ? "text-primary border-l-2 border-primary pl-2"
                    : "pl-3 border-l-2 border-transparent"
                }`}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
