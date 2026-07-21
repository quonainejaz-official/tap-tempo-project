"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronDown } from "lucide-react"

interface TocItem {
  text: string
  id: string
}

export function BlogToc({
  headings,
  variant,
}: {
  headings: TocItem[]
  variant: "sidebar" | "inline"
}) {
  const [activeId, setActiveId] = useState("")
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: "-80px 0px -75% 0px", threshold: 0 }
    )

    const elements: Element[] = []
    for (const { id } of headings) {
      const el = document.getElementById(id)
      if (el) {
        observer.observe(el)
        elements.push(el)
      }
    }

    return () => {
      for (const el of elements) observer.unobserve(el)
    }
  }, [headings])

  const handleClick = useCallback(
    (e: React.MouseEvent, id: string) => {
      e.preventDefault()
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
      setOpen(false)
    },
    []
  )

  const linkClass = (id: string) =>
    `block text-sm py-1 transition-colors ${
      activeId === id
        ? "text-primary font-medium"
        : "text-muted-foreground hover:text-foreground"
    }`

  const sidebarLinkClass = (id: string) =>
    `block text-sm py-1 border-l-2 pl-3 transition-colors ${
      activeId === id
        ? "border-primary text-foreground font-medium"
        : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
    }`

  if (variant === "sidebar") {
    return (
      <nav>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          On this page
        </p>
        <ul className="space-y-1">
          {headings.map(({ text, id }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={sidebarLinkClass(id)}
                onClick={(e) => handleClick(e, id)}
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    )
  }

  return (
    <nav className="border border-border rounded-lg bg-card">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-foreground"
      >
        <span>Table of Contents</span>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="border-t border-border px-4 pb-3 pt-2">
          <ul className="space-y-1">
            {headings.map(({ text, id }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={linkClass(id)}
                  onClick={(e) => handleClick(e, id)}
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
