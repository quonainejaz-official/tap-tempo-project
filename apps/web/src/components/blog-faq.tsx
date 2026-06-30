"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface FaqItem {
  q: string
  a: string
}

interface BlogFaqProps {
  faqs: FaqItem[]
}

export function BlogFaq({ faqs }: BlogFaqProps) {
  return (
    <section>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">Frequently Asked Questions</h2>
        <p className="text-muted-foreground mb-6">Common questions about finding the BPM of a song.</p>
        <Accordion type="multiple">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.q}</AccordionTrigger>
              <AccordionContent>{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
