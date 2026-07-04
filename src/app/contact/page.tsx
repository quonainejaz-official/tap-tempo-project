"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Mail, Globe, Bug, Lightbulb, MessageSquare, Send, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react"

// ---------------------------------------------------------------------------
// Contact API configuration
// ---------------------------------------------------------------------------
// To enable form submissions, set NEXT_PUBLIC_CONTACT_API to your endpoint:
//   NEXT_PUBLIC_CONTACT_API=https://your-api.com/contact
// The form POSTs JSON: { name, email, subject, message }
// Expected response: { success: true } or { success: false, error: string }
// ---------------------------------------------------------------------------

const subjects = [
  "General Question",
  "Feature Request",
  "Tool Issue",
  "Feedback",
  "Business Inquiry",
  "Message",
]

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [serverError, setServerError] = useState("")

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  function validate(): boolean {
    const next: Record<string, string> = {}
    if (!formData.name.trim()) next.name = "Name is required"
    if (!formData.email.trim()) next.email = "Email is required"
    else if (!validateEmail(formData.email)) next.email = "Please enter a valid email"
    if (!formData.subject) next.subject = "Please select a subject"
    if (!formData.message.trim()) next.message = "Message is required"
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setStatus("loading")
    setServerError("")

    const apiUrl = process.env.NEXT_PUBLIC_CONTACT_API

    if (!apiUrl) {
      // No API configured — simulate success for frontend demo
      await new Promise((r) => setTimeout(r, 1000))
      setStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
      return
    }

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (data.success) {
        setStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        setServerError(data.error || "Something went wrong. Please try again.")
        setStatus("error")
      }
    } catch {
      setServerError("Unable to send message. Please try again later.")
      setStatus("error")
    }
  }

  const quickHelp = [
    {
      icon: Bug,
      title: "Bug Report",
      desc: "Found an issue with a tool?",
      action: () => {
        setFormData((prev) => ({ ...prev, subject: "Tool Issue" }))
        document.getElementById("message")?.focus()
      },
    },
    {
      icon: Lightbulb,
      title: "Feature Request",
      desc: "Want a new music tool?",
      action: () => {
        setFormData((prev) => ({ ...prev, subject: "Feature Request" }))
        document.getElementById("message")?.focus()
      },
    },
    {
      icon: MessageSquare,
      title: "General Feedback",
      desc: "Help us improve.",
      action: () => {
        setFormData((prev) => ({ ...prev, subject: "Feedback" }))
        document.getElementById("message")?.focus()
      },
    },
  ]

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Hero */}
      <section className="max-w-3xl mx-auto text-center mb-12 md:mb-14">
        <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-4 text-foreground">
          Contact Us
        </h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-4">
          Questions, feedback, feature ideas, or tool issues? We&apos;d love to hear from you.
        </p>
        <p className="text-sm text-muted-foreground/60">
          Simple communication. Fast responses. Better tools.
        </p>
      </section>

      {/* Get In Touch */}
      <section className="max-w-3xl mx-auto mb-12 md:mb-14">
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">Get In Touch</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Whether you ran into a bug, have an idea for a new music tool, want to share feedback on
          an existing feature, or just have a question — we&apos;re here to listen. Every message helps
          make The Tap Tempo better for musicians, producers, and creators. Drop us a line and we&apos;ll
          get back to you as soon as we can.
        </p>
      </section>

      {/* Main layout — 2 columns on desktop */}
      <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-8 lg:gap-12 mb-20 md:mb-24">
        {/* Left — Contact Form */}
        <div className="lg:col-span-3">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">Send us a message</CardTitle>
              <CardDescription>
                Fill in the form below and we&apos;ll respond within 1&ndash;3 business days.
              </CardDescription>
            </CardHeader>
            <div className="px-6 pb-6">
              {status === "success" ? (
                <div className="flex flex-col items-center text-center py-12 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-base">Message sent</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Thanks for reaching out. We&apos;ll review your message and get back to you soon.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setStatus("idle")}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1.5">
                      Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p id="name-error" className="text-xs text-destructive mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                      Email <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p id="email-error" className="text-xs text-destructive mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1.5">
                      Subject <span className="text-destructive">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      aria-required="true"
                      aria-invalid={!!errors.subject}
                      aria-describedby={errors.subject ? "subject-error" : undefined}
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
                    >
                      <option value="">Select a subject</option>
                      {subjects.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {errors.subject && (
                      <p id="subject-error" className="text-xs text-destructive mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1.5">
                      Message <span className="text-destructive">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      aria-required="true"
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors resize-y"
                      placeholder="How can we help?"
                    />
                    {errors.message && (
                      <p id="message-error" className="text-xs text-destructive mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.message}
                      </p>
                    )}
                  </div>

                  {status === "error" && serverError && (
                    <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                      <p className="text-xs text-destructive">{serverError}</p>
                    </div>
                  )}

                  <Button type="submit" size="lg" disabled={status === "loading"} className="w-full">
                    {status === "loading" ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </Card>
        </div>

        {/* Right — Contact Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <div className="px-6 pb-6 space-y-5">
              <a
                href="mailto:taptempous@gmail.com"
                className="flex items-center gap-3 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 transition-colors group-hover:bg-primary/20">
                  <Mail className="w-4 h-4 text-primary" />
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
                  <Globe className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Website</p>
                  <p className="text-sm text-foreground font-medium group-hover:text-primary transition-colors">
                    www.thetaptempo.com
                  </p>
                </div>
              </a>
              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Responses may take 1&ndash;3 business days.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Quick Help */}
      <section className="max-w-5xl mx-auto mb-20 md:mb-24">
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4 text-center">Need Help Quickly?</h2>
        <p className="text-sm text-muted-foreground text-center mb-8 max-w-xl mx-auto">
          Jump straight to the right topic and we&apos;ll take it from there.
        </p>
        <div className="grid sm:grid-cols-3 gap-6">
          {quickHelp.map((item) => (
            <button
              key={item.title}
              type="button"
              onClick={item.action}
              className="rounded-xl border bg-card p-5 text-left transition-all duration-200 hover:shadow-md hover:border-primary/30 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-sm mb-1.5">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="max-w-3xl mx-auto text-center border-t pt-20 md:pt-24 mb-20 md:mb-24">
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">Help Us Build Better Music Tools</h2>
        <p className="text-sm text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
          Your feedback helps improve tools and create a better experience for musicians and creators.
        </p>
        <Button size="lg" asChild>
          <Link href="/#tools">
            <ArrowRight className="w-5 h-5 mr-2" />
            Explore Music Tools
          </Link>
        </Button>
      </section>
    </div>
  )
}
