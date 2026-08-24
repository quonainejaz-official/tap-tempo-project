"use client"

import { MetronomeEngine } from "@/components/metronome-engine"
import { MetronomeSeoContent } from "@/components/metronome-seo-content"
import Link from "next/link"

export default function MetronomePage() {
  return (
    <div className="flex flex-col items-center px-4 py-4 bg-background">
      <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight mb-1 text-foreground">Metronome</h1>
      <p className="text-muted-foreground text-sm mb-4">Free metronome tool for rhythm practice, tempo control, and timing</p>

      <div className="w-full max-w-5xl mx-auto">
        <MetronomeEngine defaultPreset="default" />
      </div>

      {/* Practice CTAs */}
      <div className="w-full max-w-5xl mx-auto mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border bg-card p-5 flex flex-col">
          <h2 className="font-semibold text-sm mb-1 min-h-[20px]">Subdivision Practice</h2>
          <p className="text-sm text-muted-foreground mb-3 flex-1">
            Master eighth notes, triplets, and sixteenth-note timing precision.
          </p>
          <Link
            href="/metronome-with-subdivisions"
            className="text-sm text-primary hover:underline font-bold mt-auto"
          >
            Subdivision Practice &rarr;
          </Link>
        </div>
        <div className="rounded-xl border bg-card p-5 flex flex-col">
          <h2 className="font-semibold text-sm mb-1 min-h-[20px]">Guitar Practice</h2>
          <p className="text-sm text-muted-foreground mb-3 flex-1">
            Chord changes, strumming patterns, and picking technique drills.
          </p>
          <Link
            href="/metronome-for-guitar-practice"
            className="text-sm text-primary hover:underline font-bold mt-auto"
          >
            Guitar Practice &rarr;
          </Link>
        </div>
        <div className="rounded-xl border bg-card p-5 flex flex-col">
          <h2 className="font-semibold text-sm mb-1 min-h-[20px]">Drummers</h2>
          <p className="text-sm text-muted-foreground mb-3 flex-1">
            Rudiments, limb independence, and groove consistency drills.
          </p>
          <Link
            href="/metronome-for-drummers"
            className="text-sm text-primary hover:underline font-bold mt-auto"
          >
            Drummers &rarr;
          </Link>
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto">
        <MetronomeSeoContent />
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Stuck on a tricky rhythm?{" "}
          <a href="/ai-tempo" className="text-primary font-medium hover:underline">
            Ask TapTempoAI
          </a>
        </p>
      </div>
    </div>
  )
}
