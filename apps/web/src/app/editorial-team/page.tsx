import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BookOpen, RefreshCw, Shield, Search, FileText, Users, ArrowRight, Scale, Star } from "lucide-react"

const contentTypes = [
  { title: "Educational Guides", desc: "Step-by-step tutorials covering tempo, time signatures, BPM fundamentals, production techniques, and music theory concepts." },
  { title: "Tool Documentation", desc: "In-depth explanations of how each browser-based tool works, including calculation methods and practical usage scenarios." },
  { title: "Reference Resources", desc: "Curated references such as tempo markings dictionaries, delay time charts, and metronome practice guides." },
  { title: "Comparison Articles", desc: "Evidence-based comparisons of approaches, techniques, and tools to help musicians make informed decisions." },
]

const principles = [
  { icon: Star, title: "Accuracy First", desc: "Every BPM value, tempo marking, and calculation is verified against authoritative sources and tested for correctness before publication." },
  { icon: Shield, title: "Transparency", desc: "We clearly distinguish between factual information, editorial opinion, and tool output. Our methods are documented and reproducible." },
  { icon: Scale, title: "Fair Representation", desc: "We present multiple perspectives on contested topics and clearly cite sources, enabling readers to verify claims independently." },
  { icon: Users, title: "Reader-Centered", desc: "Content is written for musicians of all skill levels. We avoid unnecessary jargon and explain technical concepts in accessible language." },
]

const reviewSteps = [
  { step: "1", title: "Topic Research", desc: "Each topic is researched using primary sources, peer-reviewed literature, manufacturer documentation, and established music reference works." },
  { step: "2", title: "Drafting", desc: "Content is written by contributors with practical music experience, ensuring real-world relevance and technical accuracy." },
  { step: "3", title: "Technical Review", desc: "A review verifies all technical claims, calculations, tool outputs, and numerical values against source materials." },
  { step: "4", title: "Editorial Review", desc: "An editorial pass ensures clarity, readability, consistent tone, proper structure, and adherence to our style guide." },
  { step: "5", title: "Publication", desc: "Approved content is published with clear dates. Major updates follow the same review process before going live." },
]

const trustedSources = [
  "Peer-reviewed musicology and acoustics journals",
  "Published reference works on tempo and music theory",
  "Manufacturer documentation for relevant hardware and software",
  "Primary source musical scores where applicable",
  "Academic textbooks on music theory and production",
]

function PrincipleCard({ icon: Icon, title, desc }: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string }) {
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

function ReviewStepCard({ step, title, desc }: { step: string; title: string; desc: string }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
        <span className="text-sm font-bold text-primary">{step}</span>
      </div>
      <div className="flex-1 pb-8 border-l border-border last:border-l-0 last:pb-0">
        <div className="-ml-4 pl-4">
          <h3 className="font-semibold text-sm mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  )
}

export default function EditorialTeamPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-0">
      {/* Hero */}
      <section className="max-w-3xl mx-auto text-center py-6 md:py-8 mb-6 md:mb-8">
        <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-4 text-foreground">
          Editorial Team
        </h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-4">
          The Tap Tempo editorial team is committed to producing accurate, well-researched music education content and reliable browser-based tools for musicians, producers, and creators.
        </p>
        <p className="text-sm text-muted-foreground/60">
          Trusted content. Verified tools. Clear editorial standards.
        </p>
      </section>

      {/* Mission */}
      <section className="max-w-3xl mx-auto py-6 md:py-8">
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">Our Editorial Mission</h2>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Every article, guide, and reference on The Tap Tempo exists to help musicians understand tempo, timing, and rhythm more effectively. We believe that accurate educational content is as important as accurate tools.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Our editorial mission is to bridge the gap between academic music knowledge and practical music-making. We distill complex concepts into clear, actionable content without oversimplifying or misrepresenting the underlying theory.
          </p>
        </div>
      </section>

      {/* What We Publish */}
      <section className="max-w-5xl mx-auto py-6 md:py-8">
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2 text-center">What We Publish</h2>
        <p className="text-sm text-muted-foreground text-center mb-3 max-w-xl mx-auto">
          Our content spans four main categories, each with its own editorial standards.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          {contentTypes.map((item) => (
            <div key={item.title} className="rounded-xl border bg-card p-6 transition-all duration-200 hover:shadow-md hover:border-primary/30">
              <h3 className="font-semibold text-sm mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How We Create Content */}
      <section className="max-w-3xl mx-auto py-6 md:py-8">
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">How We Create Content</h2>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Content creation at The Tap Tempo follows a structured process designed to produce reliable, useful material for musicians at every level.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Contributors are selected based on practical music experience and subject matter knowledge. Each piece of content is researched using authoritative sources, drafted with the reader in mind, and reviewed before publication. We do not use AI-generated content without human editorial oversight, and all AI-assisted drafting is clearly reviewed and revised by our editorial team.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Our editorial process prioritizes clarity and accuracy over search engine optimization. While we follow SEO best practices to help musicians find our content, editorial decisions are driven by what serves the reader first.
          </p>
        </div>
      </section>

      {/* Editorial Principles */}
      <section className="max-w-5xl mx-auto py-6 md:py-8">
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2 text-center">Editorial Principles</h2>
        <p className="text-sm text-muted-foreground text-center mb-3 max-w-xl mx-auto">
          Four principles guide every editorial decision at The Tap Tempo.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          {principles.map((p) => (
            <PrincipleCard key={p.title} {...p} />
          ))}
        </div>
      </section>

      {/* Editorial Review */}
      <section className="max-w-3xl mx-auto py-6 md:py-8">
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">Editorial Review Process</h2>
        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
          Every piece of content undergoes a multi-step review before publication. The same process applies to major updates.
        </p>
        <div className="space-y-0 ml-1">
          {reviewSteps.map((step) => (
            <ReviewStepCard key={step.step} {...step} />
          ))}
        </div>
      </section>

      {/* Editorial Independence */}
      <section className="max-w-3xl mx-auto py-6 md:py-8">
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">Editorial Independence</h2>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            The Tap Tempo maintains full editorial independence. Our content is not influenced by advertisers, affiliates, partners, or external stakeholders. We do not accept sponsored content, paid placements, or promotional articles.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Tool recommendations and educational content are based solely on editorial judgment and practical utility. If we include affiliate links in any content, they are clearly disclosed, and their presence does not affect the content or recommendations.
          </p>
        </div>
      </section>

      {/* Trusted Sources */}
      <section className="max-w-3xl mx-auto py-6 md:py-8">
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">Trusted Sources</h2>
        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
          Our editorial team draws from the following types of authoritative sources when creating content:
        </p>
        <ul className="space-y-3">
          {trustedSources.map((source) => (
            <li key={source} className="flex items-start gap-3 text-sm text-muted-foreground">
              <div className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 flex-shrink-0" />
              <span className="leading-relaxed">{source}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
          Where primary sources are not available, we consult multiple secondary sources and clearly indicate the basis for the information presented. Sources are cited inline within articles wherever practical.
        </p>
      </section>

      {/* Keeping Content Up to Date */}
      <section className="max-w-3xl mx-auto py-6 md:py-8">
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">Keeping Content Up to Date</h2>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Music technology evolves, and so does our content. We review published articles periodically to ensure accuracy, update references, and incorporate new information. Every article displays its publication date and last updated date so readers can assess timeliness.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            If you identify content that needs updating, please <Link href="/contact" className="text-primary hover:underline font-medium">contact us</Link>. We review all correction requests and act promptly on verified inaccuracies.
          </p>
        </div>
      </section>

      {/* Editorial Disclaimer */}
      <section className="max-w-3xl mx-auto py-6 md:py-8">
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">Editorial Disclaimer</h2>
        <div className="rounded-xl border bg-card p-6">
          <p className="text-sm text-muted-foreground leading-relaxed">
            The content published on The Tap Tempo is for educational and informational purposes only. While we strive for accuracy, the information presented should not be considered a substitute for professional music instruction, academic study, or certified training. Tool outputs are provided as reference values and may require adjustment based on specific use cases, equipment, and acoustic environments. Always verify critical timing values independently. The Tap Tempo makes no warranties regarding the completeness, reliability, or fitness for a particular purpose of any content or tool output.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto text-center border-t pt-10 md:pt-12 pb-6 md:pb-8">
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">Have Questions About Our Content?</h2>
        <p className="text-sm text-muted-foreground mb-3 max-w-xl mx-auto leading-relaxed">
          We welcome feedback, correction requests, and questions about our editorial process. Your trust in our content is important to us.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/contact">
              <FileText className="w-5 h-5 mr-2" />
              Contact the Editorial Team
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/blog">
              Read Our Articles
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
