"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"

const tocItems = [
  { id: "introduction", label: "Introduction" },
  { id: "use-of-website", label: "Use of Website" },
  { id: "intellectual-property", label: "Intellectual Property" },
  { id: "tool-accuracy-availability", label: "Tool Accuracy & Availability" },
  { id: "user-responsibilities", label: "User Responsibilities" },
  { id: "external-links", label: "External Links" },
  { id: "limitation-of-liability", label: "Limitation of Liability" },
  { id: "privacy-reference", label: "Privacy Reference" },
  { id: "changes-to-terms", label: "Changes to Terms" },
  { id: "contact", label: "Contact Information" },
]

function TocSidebar() {
  const [activeId, setActiveId] = useState<string>(tocItems[0].id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "-20% 0px -75% 0px" },
    )

    for (const item of tocItems) {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <nav className="hidden lg:block w-60 shrink-0" aria-label="Table of Contents">
      <div className="sticky top-24 space-y-1 border-l border-border pl-5 pt-2">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-4">
          On this page
        </span>
        {tocItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault()
              document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })
            }}
            className={cn(
              "block text-sm py-1.5 transition-all duration-200",
              activeId === item.id
                ? "text-foreground font-semibold border-l-[3px] border-primary -ml-[21px] pl-[15px]"
                : "text-muted-foreground/70 hover:text-foreground border-l-[3px] border-transparent -ml-[21px] pl-[15px]",
            )}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  )
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 space-y-5 mb-12">
      <h2 className="text-xl md:text-2xl font-serif font-bold">{title}</h2>
      {children}
    </section>
  )
}

function Body({ children }: { children: React.ReactNode }) {
  return <p className="text-[16px] leading-[1.8] text-foreground/85">{children}</p>
}

function BodyList({ children }: { children: React.ReactNode }) {
  return <ul className="text-[16px] leading-[1.8] text-foreground/85 space-y-2 list-disc pl-6">{children}</ul>
}

export default function TermsPage() {
  return (
    <div className="container mx-auto px-6 py-16">
      {/* Hero */}
      <div className="max-w-[760px] mx-auto mb-14 text-center">
        <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight mb-3 text-foreground">
          Terms & Conditions
        </h1>
        <p className="text-[16px] leading-relaxed text-muted-foreground mb-4 max-w-xl mx-auto">
          Please read these Terms & Conditions carefully before using The Tap Tempo and its browser-based music tools.
        </p>
        <p className="text-sm text-muted-foreground/60">Simple. Transparent. Built for users.</p>
      </div>

      {/* Content + TOC */}
      <div className="flex justify-center gap-14 max-w-[1160px] mx-auto">
        {/* Main content */}
        <div className="w-full max-w-[760px]">
          {/* Introduction */}
          <Section id="introduction" title="Introduction">
            <Body>
              These Terms & Conditions govern your use of The Tap Tempo (thetaptempo.com). By accessing or using our
              website and its browser-based music tools, you agree to be bound by these terms. If you do not agree with
              any part of these terms, please discontinue use of the site immediately.
            </Body>
            <Body>
              The Tap Tempo provides free, browser-based music tools including a tap tempo calculator, metronome, BPM
              converter, delay time calculator, tempo markings reference, and related educational content. All tools run
              entirely in your browser and do not require accounts, registration, or personal information to use.
            </Body>
          </Section>

          {/* Use of Website */}
          <Section id="use-of-website" title="Use of Website">
            <Body>You are welcome to use The Tap Tempo and its tools for a wide range of purposes:</Body>
            <BodyList>
              <li>
                <strong>Personal use.</strong> Find the tempo of a song, practice with a metronome, or calculate delay
                times for your own projects.
              </li>
              <li>
                <strong>Educational use.</strong> Learn about tempo markings, BPM relationships, and music timing
                concepts in a classroom or self-study setting.
              </li>
              <li>
                <strong>Music workflow use.</strong> Incorporate our tools into your creative or production process
                whenever they are helpful.
              </li>
              <li>
                <strong>Creative use.</strong> Explore, experiment, and discover new ways to think about rhythm and
                tempo.
              </li>
            </BodyList>
            <Body>
              We want our tools to be useful. We do not impose unnecessary restrictions on how you use them, and we do
              not require attribution or credit. Simply use the site in good faith.
            </Body>
          </Section>

          {/* Intellectual Property */}
          <Section id="intellectual-property" title="Intellectual Property">
            <Body>
              The Tap Tempo owns or holds the rights to all content on this website unless otherwise stated. This
              includes the website design, branding, logo, written articles, tool interfaces, and original educational
              materials. The overall look, feel, and organization of the site are part of our intellectual property.
            </Body>
            <Body>
              You may not copy, reproduce, redistribute, or create derivative works from our content or branding for
              commercial purposes without prior permission. This does not restrict your ability to link to our site or
              share our pages responsibly.
            </Body>
            <Body>
              Educational content, tool calculations, and reference materials are provided for informational purposes.
              Third-party resources, including linked articles or referenced materials, remain the property of their
              respective owners.
            </Body>
          </Section>

          {/* Tool Accuracy and Availability */}
          <Section id="tool-accuracy-availability" title="Tool Accuracy &amp; Availability">
            <Body>
              Our music tools are designed to provide fast and reasonably accurate calculations for common musical use
              cases. We carefully build and test each tool, but we do not guarantee absolute precision or error-free
              performance. Tempo calculations, BPM conversions, and timing values should be used as reference points and
              verified against trusted sources for critical applications.
            </Body>
            <Body>
              The Tap Tempo is provided as a free resource, and we make no guarantees about uptime or uninterrupted
              availability. The website may occasionally experience downtime for maintenance, updates, or due to factors
              beyond our control. We are not liable for any inconvenience or loss resulting from service interruptions.
            </Body>
            <Body>
              Features, tools, and content may change over time as we improve the site. We reserve the right to modify,
              deprecate, or remove any feature without prior notice.
            </Body>
          </Section>

          {/* User Responsibilities */}
          <Section id="user-responsibilities" title="User Responsibilities">
            <Body>By using The Tap Tempo, you agree to the following responsibilities:</Body>
            <BodyList>
              <li>
                <strong>Use the site as intended.</strong> Access our tools and content for their designed purposes. Do
                not misuse the site or its functionality.
              </li>
              <li>
                <strong>Do not engage in harmful activity.</strong> Do not attempt to introduce malware, launch attacks,
                scrape data aggressively, or compromise the security of the site or its users.
              </li>
              <li>
                <strong>Do not interfere with functionality.</strong> Do not attempt to disrupt, overload, or manipulate
                how our tools or infrastructure operate.
              </li>
              <li>
                <strong>Do not abuse resources.</strong> Automated scripts, excessive requests, or any activity that
                places an unreasonable strain on our servers is not permitted.
              </li>
            </BodyList>
            <Body>
              We reserve the right to restrict or block access to users who violate these responsibilities or act in a
              manner that compromises the experience of others.
            </Body>
          </Section>

          {/* External Links and Third-Party Services */}
          <Section id="external-links" title="External Links">
            <Body>
              The Tap Tempo may contain links to external websites, educational resources, reference articles, or
              third-party tools. These links are provided for your convenience and do not imply endorsement or control
              over the content, practices, or policies of those sites.
            </Body>
            <Body>
              Third-party websites operate independently and have their own terms, privacy policies, and practices. We
              are not responsible for the content, accuracy, or availability of any external site or resource. We
              encourage you to review the terms and policies of any website you visit.
            </Body>
          </Section>

          {/* Limitation of Liability */}
          <Section id="limitation-of-liability" title="Limitation of Liability">
            <Body>
              The Tap Tempo and its tools are provided &quot;as available&quot; without any warranty, express or implied.
              We strive to provide accurate and reliable tools, but we make no guarantees regarding their completeness,
              accuracy, or suitability for any particular purpose.
            </Body>
            <Body>
              In no event shall The Tap Tempo be liable for any direct, indirect, incidental, or consequential damages
              arising from your use of or inability to use the website, its tools, or its content. This includes, but is
              not limited to, decisions made based on tool outputs, lost time, or any other loss incurred through use of
              the site.
            </Body>
            <Body>
              Nothing in these terms limits or excludes liability where it cannot be lawfully limited or excluded under
              applicable law.
            </Body>
          </Section>

          {/* Privacy Reference */}
          <Section id="privacy-reference" title="Privacy Reference">
            <Body>
              Your privacy matters to us. Please review our{" "}
              <Link href="/privacy-policy" className="text-primary hover:underline font-medium">
                Privacy Policy
              </Link>{" "}
              to understand how we handle information when you visit The Tap Tempo. The Privacy Policy explains our
              approach to data collection, cookies, analytics, and third-party services. It is part of these Terms &
              Conditions by reference.
            </Body>
          </Section>

          {/* Changes to Terms */}
          <Section id="changes-to-terms" title="Changes to Terms">
            <Body>
              We may update these Terms & Conditions from time to time to reflect changes in our practices, legal
              requirements, or the way our site operates. When we make changes, the &quot;Last updated&quot; date at the
              top of this page will be revised. Material changes will be noted on the site.
            </Body>
            <Body>
              We encourage you to review these terms periodically. Your continued use of the site after changes take
              effect constitutes your acceptance of the updated terms.
            </Body>
          </Section>

          {/* Contact Information */}
          <Section id="contact" title="Contact Information">
            <Body>
              If you have questions, concerns, or feedback regarding these Terms & Conditions, please reach out to us:
            </Body>
            <div className="rounded-xl border bg-muted/30 p-6 space-y-4 transition-colors hover:bg-muted/50">
              <a
                href="mailto:taptempous@gmail.com"
                className="flex items-center gap-3 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 transition-colors group-hover:bg-primary/20">
                  <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</p>
                  <p className="text-sm text-foreground font-medium group-hover:text-primary transition-colors">
                    taptempous@gmail.com
                  </p>
                </div>
              </a>
              <a
                href="https://www.thetaptempo.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 transition-colors group-hover:bg-primary/20">
                  <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Website</p>
                  <p className="text-sm text-foreground font-medium group-hover:text-primary transition-colors">
                    www.thetaptempo.com
                  </p>
                </div>
              </a>
            </div>
          </Section>
        </div>

        {/* Desktop TOC */}
        <TocSidebar />
      </div>
    </div>
  )
}
