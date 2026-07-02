"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const tocItems = [
  { id: "introduction", label: "Introduction" },
  { id: "information-we-collect", label: "Information We Collect" },
  { id: "how-we-use-information", label: "How We Use Information" },
  { id: "cookies-analytics", label: "Cookies & Analytics" },
  { id: "third-party-services", label: "Third-Party Services" },
  { id: "data-protection", label: "Data Protection" },
  { id: "external-links", label: "External Links" },
  { id: "childrens-privacy", label: "Children's Privacy" },
  { id: "changes-to-privacy-policy", label: "Changes to This Privacy Policy" },
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

function Subheading({ children }: { children: React.ReactNode }) {
  return <h3 className="font-semibold text-[15px] mb-3 text-foreground">{children}</h3>
}

function Body({ children }: { children: React.ReactNode }) {
  return <p className="text-[16px] leading-[1.8] text-foreground/85">{children}</p>
}

function BodyList({ children }: { children: React.ReactNode }) {
  return <ul className="text-[16px] leading-[1.8] text-foreground/85 space-y-2 list-disc pl-6">{children}</ul>
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-6 py-16">
      {/* Hero */}
      <div className="max-w-[760px] mx-auto mb-14 text-center">
        <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight mb-3 text-foreground">
          Privacy Policy
        </h1>
        <p className="text-[16px] leading-relaxed text-muted-foreground mb-4 max-w-xl mx-auto">
          Learn how The Tap Tempo collects, uses and protects information while you use our browser-based music tools.
        </p>
        <p className="text-sm text-muted-foreground/60">Last updated: June 23, 2026</p>
      </div>

      {/* Content + TOC */}
      <div className="flex justify-center gap-14 max-w-[1160px] mx-auto">
        {/* Main content */}
        <div className="w-full max-w-[760px]">
          {/* Introduction */}
          <Section id="introduction" title="Introduction">
            <Body>
              The Tap Tempo (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates the website at thetaptempo.com. We
              provide free browser-based music tools including a tap tempo calculator, metronome, BPM converter, delay
              time calculator, and related educational content.
            </Body>
            <Body>
              This Privacy Policy explains what information we collect when you visit our site, how we use it, and what
              choices you have. We believe in keeping things simple and transparent. Our tools run entirely in your
              browser, and we do not require accounts, logins, or personal information to use them.
            </Body>
            <Body>
              By using The Tap Tempo, you agree to the practices described in this policy. If you do not agree, please
              discontinue use of the site.
            </Body>
          </Section>

          {/* Information We Collect */}
          <Section id="information-we-collect" title="Information We Collect">
            <div>
              <Subheading>Information You Provide</Subheading>
              <Body>
                We do not require you to create an account or provide personal information to use any of our music tools.
                If you contact us via email at taptempous@gmail.com, we will receive your email address and any
                information you include in your message. We use this only to respond to your inquiry and do not add it to
                any marketing list.
              </Body>
            </div>

            <div>
              <Subheading>Information Collected Automatically</Subheading>
              <Body>
                When you visit The Tap Tempo, certain information is automatically collected by our analytics and hosting
                providers. This may include:
              </Body>
              <BodyList>
                <li>Pages you visit and tools you use</li>
                <li>Browser type and version</li>
                <li>Device type (desktop, tablet, or mobile)</li>
                <li>Operating system</li>
                <li>Approximate geographic location (country or city level)</li>
                <li>Referral source (how you found the site)</li>
                <li>Date and time of visit</li>
              </BodyList>
              <Body>
                This data is aggregated and anonymized where possible. We do not collect names, addresses, payment
                information, or other personally identifiable information through automatic means.
              </Body>
            </div>
          </Section>

          {/* How We Use Information */}
          <Section id="how-we-use-information" title="How We Use Information">
            <Body>We use the information we collect for the following purposes:</Body>
            <BodyList>
              <li>
                <strong>To operate and improve our tools.</strong> Analytics help us understand which features are most
                useful and where people get stuck, so we can make the site better.
              </li>
              <li>
                <strong>To monitor performance and fix issues.</strong> We track errors, load times, and uptime to keep
                the site running smoothly.
              </li>
              <li>
                <strong>To understand our audience.</strong> Knowing which pages and tools are popular helps us create
                more relevant content.
              </li>
              <li>
                <strong>To respond to inquiries.</strong> If you email us, we use your information only to reply to your
                message.
              </li>
            </BodyList>
            <Body>We do not sell, rent, or share your personal information with third parties for their marketing purposes.</Body>
          </Section>

          {/* Cookies and Analytics */}
          <Section id="cookies-analytics" title="Cookies &amp; Analytics">
            <Body>
              The Tap Tempo uses minimal cookies and analytics services to understand site usage and improve your
              experience. We may use privacy-focused analytics tools to measure website performance and understand usage
              trends.
            </Body>

            <div>
              <Subheading>Cookies</Subheading>
              <Body>
                A cookie is a small text file stored on your device by your browser. We use only essential cookies
                required for the site to function (such as theme preferences) and analytics cookies that help us count
                visits and understand traffic patterns. You can disable cookies in your browser settings, but doing so
                may affect how certain features work.
              </Body>
            </div>

            <div>
              <Subheading>Analytics</Subheading>
              <Body>
                We use analytics services to collect anonymized data about page views, visitor counts, and performance
                metrics. These services are designed to be privacy-friendly and do not collect personal information. The
                data helps us understand which tools and content are most valuable to our visitors.
              </Body>
            </div>
          </Section>

          {/* Third-Party Services */}
          <Section id="third-party-services" title="Third-Party Services">
            <Body>
              The Tap Tempo uses the following third-party services to operate and deliver content:
            </Body>
            <BodyList>
              <li>
                <strong>Vercel</strong> &mdash; Hosting and deployment platform. Vercel processes requests and serves
                pages. See{" "}
                <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Vercel&apos;s Privacy Policy
                </a>.
              </li>
              <li>
                <strong>Analytics providers</strong> &mdash; Privacy-first analytics for page views and performance. No
                personal data is collected.
              </li>
              <li>
                <strong>Google Fonts</strong> &mdash; Web font delivery. Your browser requests fonts from Google&apos;s
                servers when loading the site. See{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Google&apos;s Privacy Policy
                </a>.
              </li>
              <li>
                <strong>Email (taptempous@gmail.com)</strong> &mdash; Contact email for inquiries and support.
              </li>
            </BodyList>
            <Body>
              Each of these services operates under its own privacy policy. We encourage you to review them. We do not
              control how these third parties handle your data.
            </Body>
          </Section>

          {/* Data Protection */}
          <Section id="data-protection" title="Data Protection">
            <Body>
              We take reasonable technical and organizational measures to protect the information we collect. Our site is
              served over HTTPS, ensuring that data transferred between your browser and our servers is encrypted. We use
              secure, up-to-date hosting infrastructure provided by Vercel.
            </Body>
            <Body>
              However, no method of electronic transmission or storage is 100% secure. While we strive to protect your
              information, we cannot guarantee its absolute security.
            </Body>
            <Body>
              Since our tools run entirely in your browser (client-side JavaScript), any BPM, tempo, or timing data you
              enter never leaves your device. We do not store or process tool inputs on our servers.
            </Body>
          </Section>

          {/* External Links */}
          <Section id="external-links" title="External Links">
            <Body>
              The Tap Tempo may contain links to external websites, such as reference articles, music education
              resources, or third-party tools. We are not responsible for the privacy practices or content of these
              external sites. We encourage you to read the privacy policies of any website you visit.
            </Body>
          </Section>

          {/* Children's Privacy */}
          <Section id="childrens-privacy" title="Children&apos;s Privacy">
            <Body>
              The Tap Tempo is a general-interest music tools website and is not directed at children under the age of
              13. We do not knowingly collect personal information from children. If you believe a child has provided us
              with personal information, please contact us at taptempous@gmail.com, and we will delete it promptly.
            </Body>
          </Section>

          {/* Changes to This Privacy Policy */}
          <Section id="changes-to-privacy-policy" title="Changes to This Privacy Policy">
            <Body>
              We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or
              legal requirements. When we make changes, we will update the &quot;Last updated&quot; date at the top of
              this page. Material changes will be noted on the site. We encourage you to review this policy periodically.
            </Body>
          </Section>

          {/* Contact Information */}
          <Section id="contact" title="Contact Information">
            <Body>
              If you have questions, concerns, or requests regarding this Privacy Policy or how your data is handled,
              please reach out to us:
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
