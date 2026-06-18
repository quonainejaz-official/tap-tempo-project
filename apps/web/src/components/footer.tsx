"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

const defaultSections: Record<string, { href: string; label: string }[]> = {
  Tools: [
    { href: "/tap-tempo", label: "Tap Tempo" },
    { href: "/metronome", label: "Metronome" },
    { href: "/bpm-calculator", label: "BPM Calculator" },
  ],
  Reference: [
    { href: "/bpm-to-ms", label: "BPM to ms" },
    { href: "/delay-reverb-time-calculator", label: "Delay & Reverb Time" },
    { href: "/tempo-markings", label: "Tempo Markings" },
    { href: "/beats-per-bar-calculator", label: "Beats Per Bar" },
  ],
  More: [
    { href: "/blog", label: "Blog" },
    { href: "/ai-tempo", label: "TapTempo-AI" },
  ],
}

export function Footer() {
  const [sections, setSections] = useState<Record<string, { href: string; label: string }[]>>(defaultSections)

  useEffect(() => {
    fetch("/api/footer-links")
      .then((r) => r.json())
      .then((data) => {
        if (data.items?.length) {
          const grouped: Record<string, { href: string; label: string }[]> = {}
          for (const item of data.items.sort((a: any, b: any) => a.order - b.order)) {
            const sec = item.section || "More"
            if (!grouped[sec]) grouped[sec] = []
            grouped[sec].push({ href: item.href, label: item.label })
          }
          // Merge with defaults: keep default links, add dynamic ones
          const merged: Record<string, { href: string; label: string }[]> = {}
          for (const key of Object.keys(defaultSections)) {
            merged[key] = defaultSections[key]
          }
          for (const [key, links] of Object.entries(grouped)) {
            if (!merged[key]) merged[key] = []
            for (const link of links) {
              if (!merged[key].some((l) => l.href === link.href)) {
                merged[key].push(link)
              }
            }
          }
          setSections(merged)
        }
      })
      .catch(() => {})
  }, [])

  const sectionKeys = Object.keys(sections)

  return (
    <footer className="border-t bg-black dark:bg-black text-white py-12">
      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-start gap-8">
        <div>
          <Link href="/" className="font-serif text-2xl font-bold italic tracking-tight mb-4 inline-block text-white">
            TheTapTempo
          </Link>
          <p className="text-white/60 text-sm max-w-xs">
            A world-class, Apple-caliber music tempo toolkit for musicians, producers, DJs, drummers, and audio engineers.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {sectionKeys.map((section) => (
            <div key={section} className="flex flex-col space-y-2">
              <span className="font-bold text-sm text-white/90 mb-2">{section}</span>
              {sections[section].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
          <div className="flex flex-col space-y-2">
            <span className="font-bold text-sm text-white/90 mb-2">Contact</span>
            <a href="mailto:taptempous@gmail.com" className="text-sm text-white/60 hover:text-white transition-colors">
              Email Us
            </a>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-8 mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-white/40">
        <p>&copy; {new Date().getFullYear()} TheTapTempo. All rights reserved.</p>
        <p>Built with precision.</p>
      </div>
    </footer>
  )
}
