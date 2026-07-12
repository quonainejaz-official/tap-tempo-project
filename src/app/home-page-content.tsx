"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Activity,
  Clock,
  Calculator,
  Table2,
  Sliders,
  Music,
  ListOrdered,
  Zap,
  Sparkles,
  ArrowRight,
  ExternalLink,
  X,
  Facebook,
  Instagram,
  User,
  Globe,
  BookOpen,
  CheckCircle2,
  Search,
  Users,
} from "lucide-react"

interface BlogItem {
  _id: string
  title: string
  slug: string
  excerpt?: string
  coverImage?: string
  author?: string
  createdAt?: string
  readTime?: string
  tags?: string[]
}

const tools = [
  { icon: Activity, title: "Tap Tempo", desc: "Most accurate tap algorithm with outlier rejection.", href: "/tap-tempo" },
  { icon: Clock, title: "Metronome", desc: "Precision audio engine metronome for practice.", href: "/metronome" },
  { icon: Calculator, title: "BPM Calculator", desc: "Calculate BPM from duration, or duration from BPM.", href: "/bpm-calculator" },
  { icon: Table2, title: "BPM to ms", desc: "Convert tempo to exact millisecond values.", href: "/bpm-to-ms" },
  { icon: Sliders, title: "Delay & Reverb Time", desc: "Calculate precise millisecond values for delay and reverb.", href: "/delay-reverb-time-calculator" },
  { icon: Music, title: "Tempo Markings", desc: "Classical music tempo dictionary.", href: "/tempo-markings" },
  { icon: ListOrdered, title: "Beats Per Bar", desc: "Interactive time signature tool.", href: "/beats-per-bar-calculator" },
]

const faqs = [
  {
    q: "What is tap tempo?",
    a: "Tap tempo is a method of determining the BPM (beats per minute) of a song or rhythm by physically tapping along to the beat. Our BPM tapper measures the time between your taps and calculates the average tempo.",
  },
  {
    q: "How accurate is the BPM tapper?",
    a: "The accuracy depends on the consistency of your tapping, not the tool. Our algorithm averages up to 16 consecutive taps with outlier rejection to filter out inconsistent taps. With 8-12 steady taps, you can expect accuracy within ±1 BPM.",
  },
  {
    q: "How do I calculate BPM from a song?",
    a: "The easiest way is to use our Tap Tempo tool: tap along to the beat of any song for 8-12 taps, and the BPM will be displayed instantly. You can also use the BPM Calculator to find BPM from duration and number of beats.",
  },
  {
    q: "What is the formula for delay time from BPM?",
    a: "For a quarter note delay: Delay (ms) = 60,000 ÷ BPM. For dotted eighth: Delay (ms) = 45,000 ÷ BPM. For triplet: Delay (ms) = 40,000 ÷ BPM. Use our Delay & Reverb Time Calculator for instant results.",
  },
]

export function HomePageContent() {
  const [display, setDisplay] = useState(120)
  const [latestPosts, setLatestPosts] = useState<BlogItem[]>([])
  const [postsLoading, setPostsLoading] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplay(Math.round(Math.random() * 40 + 60))
    }, 600)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    fetch("/api/blogs?limit=3")
      .then((r) => r.json())
      .then((data) => {
        setLatestPosts(data.blogs || [])
        setPostsLoading(false)
      })
      .catch(() => setPostsLoading(false))
  }, [])

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-3"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                Music Production Toolkit
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
              className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold tracking-tight mb-4"
            >
              Tempo Tools for
              <br />
              <span className="text-primary">Musicians</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6"
            >
              Professional browser-based music tools designed for musicians, producers, DJs, drummers, educators, and creators. Explore accurate tempo, rhythm, and practice tools to improve performance, music production, and learning—all in one place.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center justify-center gap-4 mb-6"
            >
              <Button size="lg" asChild>
                <Link href="/tap-tempo">
                  <Activity className="w-5 h-5 mr-2" />
                  Explore Music Tools
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/metronome">
                  <Clock className="w-5 h-5 mr-2" />
                  Open Metronome
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex items-center justify-center gap-8 text-muted-foreground"
            >
              <div className="text-center">
                <div className="text-3xl font-bold font-mono text-foreground">{display}</div>
                <div className="text-xs mt-1">Live BPM Demo</div>
              </div>
              <div className="h-10 w-px bg-border" />
              <div className="text-left text-sm leading-relaxed">
                <div className="font-medium text-foreground">7 Free Tools</div>
                <div>No registration required</div>
              </div>
              <div className="h-10 w-px bg-border" />
              <div className="text-left text-sm leading-relaxed">
                <div className="font-medium text-foreground">Works Offline</div>
                <div>Zero server dependency</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="tools" className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">All Tempo Tools</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Everything you need to work with tempo, timing, and rhythm.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {tools.map((tool) => {
            const Icon = tool.icon
            return (
              <Link key={tool.href} href={tool.href} className="group">
                <Card className="h-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-primary/30">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <CardTitle className="text-lg">{tool.title}</CardTitle>
                    <CardDescription>{tool.desc}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Latest Guides */}
      <section className="border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">Latest Guides</h2>
                <p className="text-muted-foreground max-w-xl">
                  Learn rhythm, tempo, and music practice through expert-written educational guides.
                </p>
              </div>
              <Link
                href="/blog"
                className="hidden sm:flex items-center gap-1 text-sm text-primary hover:underline font-medium flex-shrink-0"
              >
                View All Guides
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            {postsLoading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="rounded-xl border bg-card animate-pulse">
                    <div className="aspect-[16/9] bg-muted rounded-t-xl" />
                    <div className="p-6 space-y-3">
                      <div className="h-3 w-20 bg-muted rounded" />
                      <div className="h-5 w-full bg-muted rounded" />
                      <div className="h-4 w-3/4 bg-muted rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : latestPosts.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {latestPosts.map((post) => (
                  <Link
                    key={post._id}
                    href={`/blog/${post.slug}`}
                    className="group"
                  >
                    <Card className="h-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-primary/30 overflow-hidden">
                      {post.coverImage && (
                        <div className="aspect-[16/9] relative overflow-hidden bg-muted">
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <CardHeader className="p-5">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                          {post.tags && post.tags.length > 0 && (
                            <>
                              <span className="text-primary font-medium">{post.tags[0]}</span>
                              <span>&middot;</span>
                            </>
                          )}
                          {post.readTime && <span>{post.readTime}</span>}
                        </div>
                        <CardTitle className="text-base font-serif group-hover:text-primary transition-colors leading-snug line-clamp-2">
                          {post.title}
                        </CardTitle>
                        {post.excerpt && (
                          <CardDescription className="text-sm mt-1.5 line-clamp-2">
                            {post.excerpt}
                          </CardDescription>
                        )}
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {post.createdAt
                              ? new Date(post.createdAt).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })
                              : ""}
                          </span>
                          <span className="text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            Read Guide &rarr;
                          </span>
                        </div>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : null}
            <Link
              href="/blog"
              className="sm:hidden flex items-center justify-center gap-1 text-sm text-primary hover:underline font-medium mt-6"
            >
              View All Guides
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Trust TheTapTempo */}
      <section className="border-t bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6 text-center">Why Trust TheTapTempo?</h2>
            <div className="grid sm:grid-cols-3 gap-5">
              <div className="rounded-xl border bg-card p-5">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <BookOpen className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-semibold text-sm mb-1.5">Research-Based Guides</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Every article is created using trusted music education resources and practical workflows.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-5">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-semibold text-sm mb-1.5">Built for Musicians</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Designed for beginners, teachers, producers, DJs, and performers.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-5">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-semibold text-sm mb-1.5">Free Professional Tools</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Simple, accurate, and accessible tools for everyday music practice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">Frequently Asked Questions</h2>
            <p className="text-muted-foreground mb-6">Common questions about using tempo tools and BPM calculations.</p>
            <Accordion type="multiple">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.q}</AccordionTrigger>
                  <AccordionContent>{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section className="border-t bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">Built for Precision</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Every tool is engineered for accuracy. No ads, no tracking, no bloat. Just the best tempo tools on the web.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button variant="outline" size="sm" asChild>
                <a href="https://x.com/taptempous" target="_blank" rel="noopener noreferrer">
                  <X className="w-4 h-4 mr-2" />
                  X
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="https://www.facebook.com/profile.php?id=61591940093409" target="_blank" rel="noopener noreferrer">
                  <Facebook className="w-4 h-4 mr-2" />
                  Facebook
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="https://www.instagram.com/taptempous/" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-4 h-4 mr-2" />
                  Instagram
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="https://about.me/thetaptempo" target="_blank" rel="noopener noreferrer">
                  <Globe className="w-4 h-4 mr-2" />
                  About.me
                </a>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Need answers about tempo, BPM, or music theory?{" "}
              <a href="/ai-tempo" className="text-primary font-medium hover:underline">
                Ask TapTempoAI
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
