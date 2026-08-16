"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  ["How accurate is the AI estimate compared to the final quote?", "The estimator creates a planning range from the project details you provide. A walkthrough verifies quantities, pathways, mounting conditions and equipment before the final proposal is approved."],
  ["If I book a walkthrough, am I locked in?", "No. Booking reserves time to review the project. Work is not approved until you receive and accept the final scope and pricing."],
  ["What kind of cameras and network gear do you install?", "SmartNET designs around professional-grade equipment selected for the environment, coverage goals, reliability and budget rather than forcing every project into one brand."],
  ["Will the wiring be hidden?", "We prioritize clean low-voltage pathways and minimal visible cable where the structure allows it. If conduit or raceway is required, we review the route before installation."],
  ["Do you provide support after installation?", "Yes. Handoff includes system setup and verification, and future service or expansion can be discussed based on the project."],
  ["What areas do you serve?", "Core service is focused on Metro Atlanta. Larger, multi-site and out-of-area projects can be reviewed individually."],
];

export function FaqSection() {
  return (
    <section id="faq-section" className="relative overflow-hidden border-y border-sky-500/10 bg-[#020617] py-20 sm:py-24">
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[.7fr_1.3fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-sky-400/20 bg-sky-400/10 text-sky-300"><HelpCircle className="h-5 w-5" /></span>
          <p className="mt-6 text-xs font-bold uppercase tracking-[.28em] text-sky-300">Questions & clarity</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">Know what happens before you book.</h2>
          <p className="mt-5 max-w-md text-base leading-7 text-slate-400">Straight answers about estimating, scheduling, equipment, wiring and support.</p>
        </div>

        <div className="rounded-3xl border border-sky-400/15 bg-[linear-gradient(145deg,rgba(8,17,34,.96),rgba(3,8,23,.94))] p-3 sm:p-5">
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map(([question, answer], index) => (
              <AccordionItem key={question} value={`faq-${index}`} className="overflow-hidden rounded-2xl border border-sky-400/10 bg-[#020617]/55 px-4 data-[state=open]:border-sky-400/30 data-[state=open]:bg-sky-400/[.035]">
                <AccordionTrigger className="py-5 text-left text-sm font-semibold text-white hover:no-underline hover:text-sky-200 sm:text-base">{question}</AccordionTrigger>
                <AccordionContent className="max-w-3xl pb-5 text-sm leading-6 text-slate-400">{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
