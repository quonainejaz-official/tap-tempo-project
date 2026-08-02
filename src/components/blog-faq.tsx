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
    <section className="py-12 md:py-16">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight mb-3">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground text-base md:text-lg">
          Answers to common questions about this topic.
        </p>
      </div>
      <Accordion type="multiple" className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
            <AccordionTrigger className="text-left text-sm md:text-base font-medium py-5 hover:no-underline [&[data-state=open]>svg]:text-foreground">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm md:text-base text-muted-foreground leading-relaxed pb-5">
              <span dangerouslySetInnerHTML={{ __html: faq.a }} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
