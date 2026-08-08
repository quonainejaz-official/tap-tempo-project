"use client"

import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export interface ContinueLearningItem {
  title: string
  description: string
  href: string
}

interface ContinueLearningCarouselProps {
  items: ContinueLearningItem[]
  ariaLabel?: string
}

export function ContinueLearningCarousel({
  items,
  ariaLabel = "Continue Learning guides",
}: ContinueLearningCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateScrollState = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }, [])

  useEffect(() => {
    updateScrollState()
    const el = scrollerRef.current
    if (!el) return
    el.addEventListener("scroll", updateScrollState, { passive: true })
    window.addEventListener("resize", updateScrollState)
    return () => {
      el.removeEventListener("scroll", updateScrollState)
      window.removeEventListener("resize", updateScrollState)
    }
  }, [updateScrollState])

  const scrollByCard = (direction: -1 | 1) => {
    const el = scrollerRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>("[data-carousel-card]")
    const step = (card ? card.offsetWidth : 320) + 16
    el.scrollBy({ left: direction * step, behavior: "smooth" })
  }

  if (items.length === 0) return null

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        role="region"
        aria-label={ariaLabel}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <div
            key={item.href}
            data-carousel-card
            className="w-[300px] sm:w-[320px] shrink-0 snap-start p-4 rounded-xl border bg-card/50 flex flex-col"
          >
            <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed mb-2 flex-1">
              {item.description}
            </p>
            <Link href={item.href} className="text-primary hover:underline font-bold text-xs">
              Read the full guide →
            </Link>
          </div>
        ))}
      </div>

      <div className="hidden md:flex items-center justify-end gap-2 mt-4">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          disabled={!canScrollLeft}
          aria-label="Scroll Continue Learning guides left"
          className="inline-flex items-center justify-center w-8 h-8 rounded-full border bg-card text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-40 disabled:pointer-events-none"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          disabled={!canScrollRight}
          aria-label="Scroll Continue Learning guides right"
          className="inline-flex items-center justify-center w-8 h-8 rounded-full border bg-card text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-40 disabled:pointer-events-none"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
