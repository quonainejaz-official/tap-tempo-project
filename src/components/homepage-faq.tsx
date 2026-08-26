"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

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

export function HomepageFaq() {
  return (
    <Accordion type="multiple">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>{faq.q}</AccordionTrigger>
          <AccordionContent>{faq.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
