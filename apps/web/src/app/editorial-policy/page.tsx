import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ArrowDown, FileText, BookOpen, Search, Shield, RefreshCw, Users } from "lucide-react"

const processSteps = [
  { title: "Research", desc: "Each topic is researched using authoritative sources, manufacturer documentation, and established music reference materials to ensure accuracy from the start." },
  { title: "Planning", desc: "Content is outlined to cover the topic clearly and logically, identifying key concepts and the most useful way to present them to musicians." },
  { title: "Writing", desc: "Articles are written in clear, accessible language. Complex concepts are broken down without oversimplifying the underlying theory." },
  { title: "Fact Checking", desc: "Every factual claim, numerical value, and technical reference is verified against primary or authoritative secondary sources." },
  { title: "Editorial Review", desc: "An editorial review ensures clarity, consistent tone, proper structure, and alignment with our editorial standards." },
  { title: "Publishing", desc: "Approved content is published with a clear publication date. Major updates follow the same process before going live." },
  { title: "Regular Updates", desc: "Published content is reviewed periodically and updated when music software changes, best practices evolve, or better information becomes available." },
]

const accuracyCards = [
  { icon: Search, title: "Research First", desc: "We verify factual information using trusted music education resources." },
  { icon: Users, title: "Practical Experience", desc: "Recommendations are based on real-world music workflows whenever appropriate." },
  { icon: BookOpen, title: "Clear Explanations", desc: "Complex concepts are written in beginner-friendly language without sacrificing accuracy." },
  { icon: RefreshCw, title: "Continuous Review", desc: "Articles are reviewed and improved whenever meaningful updates become necessary." },
]

const trustedSources = [
  "Audio Engineering Society (AES)",
  "Berklee Online",
  "Sound On Sound",
  "Ableton Documentation",
  "Apple Logic Pro Documentation",
  "Steinberg Documentation",
  "Official manufacturer documentation",
  "Peer-reviewed research when appropriate",
]

const updateTriggers = [
  "Music software changes",
  "Educational best practices evolve",
  "Readers identify errors",
  "Better information becomes available",
]

function ProcessStep({ title, desc, isLast }: { title: string; desc: string; isLast: boolean }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="w-2.5 h-2.5 rounded-full bg-primary/60 mt-1.5 flex-shrink-0" />
        {!isLast && <div className="w-px flex-1 bg-border my-1" />}
      </div>
      <div className={`flex-1 ${!isLast ? "pb-6" : ""}`}>
        <h3 className="font-semibold text-sm mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}

function AccuracyCard({ icon: Icon, title, desc }: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string }) {
  return (
    <div className="rounded-xl border bg-card p-6 transition-all duration-200 hover:shadow-md hover:border-primary/30">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <h3 className="font-semibold text-sm mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  )
}

export default function EditorialPolicyPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-0">
      {/* Hero */}
      <section className="max-w-3xl mx-auto text-center py-6 md:py-8 mb-6 md:mb-8">
        <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-4 text-foreground">
          Editorial Policy
        </h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-4">
          At TheTapTempo, every article and educational resource is created with one goal: helping musicians learn through accurate, practical, and trustworthy information.
        </p>
        <p className="text-sm text-muted-foreground/60">
          This page explains the editorial standards and review process we follow when publishing and maintaining our content.
        </p>
      </section>

      {/* Section 1: Our Editorial Mission */}
      <section className="max-w-3xl mx-auto py-6 md:py-8">
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">Our Editorial Mission</h2>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            We create educational resources for musicians. Every article, guide, and reference on The Tap Tempo is built around one principle: helping readers understand tempo, timing, and rhythm more effectively.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Our focus is clarity, accuracy, and practical usefulness. We prioritise helping readers over chasing search rankings. Every article should provide genuine educational value that musicians can apply in their practice, production, or performance.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We do not publish content for the sake of volume. Each topic is chosen because it addresses a real question or need that musicians have, and each article is written to be as useful as possible for its intended audience.
          </p>
        </div>
      </section>

      {/* Section 2: Our Editorial Process */}
      <section className="max-w-3xl mx-auto py-6 md:py-8">
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">Our Editorial Process</h2>
        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
          Every piece of content follows a structured process from research through publication and beyond.
        </p>
        <div className="ml-1">
          {processSteps.map((step, i) => (
            <ProcessStep key={step.title} {...step} isLast={i === processSteps.length - 1} />
          ))}
        </div>
      </section>

      {/* Section 3: Accuracy Standards */}
      <section className="max-w-5xl mx-auto py-6 md:py-8">
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2 text-center">Accuracy Standards</h2>
        <p className="text-sm text-muted-foreground text-center mb-3 max-w-xl mx-auto">
          Four standards guide every piece of content we publish.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          {accuracyCards.map((card) => (
            <AccuracyCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      {/* Section 4: Sources We Trust */}
      <section className="max-w-3xl mx-auto py-6 md:py-8">
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">Sources We Trust</h2>
        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
          Information published on The Tap Tempo may be verified using the following types of authoritative sources:
        </p>
        <ul className="space-y-3">
          {trustedSources.map((source) => (
            <li key={source} className="flex items-start gap-3 text-sm text-muted-foreground">
              <div className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 flex-shrink-0" />
              <span className="leading-relaxed">{source}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Section 5: Artificial Intelligence Policy */}
      <section className="max-w-3xl mx-auto py-6 md:py-8">
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">Artificial Intelligence Policy</h2>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            We believe in transparency about how content is created. Artificial intelligence tools may be used during the content creation process to assist with drafting, formatting, proofreading, or improving readability.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            However, AI never replaces editorial review. Every article published on The Tap Tempo is reviewed by a human editor before publication. All content is checked for factual accuracy, clarity, and usefulness regardless of the tools used during drafting.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Our editorial team takes full responsibility for every piece of content published. AI is a productivity tool, not an author or editor.
          </p>
        </div>
      </section>

      {/* Section 6: Corrections Policy */}
      <section className="max-w-3xl mx-auto py-6 md:py-8">
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">Corrections Policy</h2>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            We strive for accuracy in every article, but factual mistakes may occasionally occur. When an error is identified it is reviewed, corrected if necessary, and the article receives an updated revision date.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            If you believe any content on The Tap Tempo contains inaccurate information, please let us know. We review all correction requests and act promptly on verified inaccuracies.
          </p>
          <div className="pt-2">
            <Button size="lg" asChild>
              <Link href="/contact">
                <FileText className="w-5 h-5 mr-2" />
                Report an Inaccuracy
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Section 7: Content Updates */}
      <section className="max-w-3xl mx-auto py-6 md:py-8">
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">Content Updates</h2>
        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
          Articles on The Tap Tempo are reviewed and updated whenever:
        </p>
        <ul className="space-y-3">
          {updateTriggers.map((trigger) => (
            <li key={trigger} className="flex items-start gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span className="leading-relaxed">{trigger}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
          Every article displays its publication date and last updated date so readers can assess the timeliness of the information.
        </p>
      </section>

      {/* Section 8: Editorial Independence */}
      <section className="max-w-3xl mx-auto py-6 md:py-8">
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">Editorial Independence</h2>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            All editorial decisions at The Tap Tempo are made independently. Articles are written to educate readers, not to promote products or services.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Software, tools, products, and external resources may be mentioned when they help explain a topic. These references are included for educational purposes, not because of commercial influence. We do not accept payment for mentions or reviews.
          </p>
        </div>
      </section>

      {/* Section 9: Our Commitment to Readers */}
      <section className="max-w-3xl mx-auto py-6 md:py-8">
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">Our Commitment to Readers</h2>
        <div className="rounded-xl border bg-card p-6">
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Every article on The Tap Tempo aims to be:
          </p>
          <ul className="space-y-2">
            {[
              "Accurate — information is verified before publication",
              "Practical — content helps musicians in real situations",
              "Easy to understand — complex topics explained clearly",
              "Regularly updated — kept current as tools and practices evolve",
              "Helpful for musicians of all experience levels",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto text-center border-t pt-10 md:pt-12 pb-6 md:pb-8">
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">Explore Our Free Music Tools</h2>
        <p className="text-sm text-muted-foreground mb-3 max-w-xl mx-auto leading-relaxed">
          Browse our collection of browser-based music tools and educational guides designed for musicians, producers, and creators.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/#tools">
              Browse Tools
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/blog">
              Read the Blog
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
