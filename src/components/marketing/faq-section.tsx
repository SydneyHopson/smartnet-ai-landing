"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export function FaqSection() {
  return (
    <motion.section
      id="faq-section" // 🔹 anchor target for "FAQ & install basics"
      className="relative w-full px-4 py-10 md:py-16"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {/* Glow background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-40 w-[70%] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center space-y-3">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-sky-300/70">
            Questions & Clarity
          </p>
          <h2 className="text-balance text-2xl font-semibold text-slate-50 md:text-3xl">
            SmartNET FAQs before you book
          </h2>
          <p className="text-sm text-slate-300/80 md:text-base">
            A few quick answers to the most common questions about estimates,
            pricing and what happens on install day.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="rounded-2xl border border-sky-500/20 bg-slate-950/60 p-4 shadow-[0_0_32px_rgba(8,47,73,0.6)] md:p-6">
          <Accordion type="single" collapsible className="space-y-2">
            <FaqItem
              value="estimate-accuracy"
              question="How accurate is the AI estimate compared to the final quote?"
            >
              The SmartNET wizard gives you a directional range based on your
              property size, coverage goals and wiring style. Before any work
              starts, we confirm everything with photos, a quick call or an
              on-site walkthrough and then provide a clear, itemized quote you
              can approve or adjust.
            </FaqItem>

            <FaqItem
              value="booking-commitment"
              question="If I book a time on the calendar, am I locked in?"
            >
              Booking a time shows when you’d like the work done and reserves a
              slot for a consult + site review. Your project isn’t locked in
              until you’ve seen and approved the final scope and pricing.
            </FaqItem>

            <FaqItem
              value="hardware-brands"
              question="What kind of cameras and network gear do you install?"
            >
              We design around professional-grade cameras, NVRs and Wi-Fi
              systems—no random bargain-bin hardware. During your planning call
              we align on preferred brands and any gear you already own, then
              design the system around reliability and coverage first.
            </FaqItem>

            <FaqItem
              value="wiring-cleanliness"
              question="Will you run exposed wires or clean everything up?"
            >
              SmartNET aims for clean, datacenter-inspired routing: tidy
              cable runs, minimal visible conduit where possible, and labeled
              drops so you always know what’s connected where. If a route has to
              be exposed, we explain it and keep it as clean as possible.
            </FaqItem>

            <FaqItem
              value="warranty-support"
              question="Do you offer warranty or support after the install?"
            >
              Yes. Your project includes support to make sure cameras, apps and
              remote access are working as expected after install. We can also
              discuss ongoing maintenance or future add-ons if you plan to grow
              the system over time.
            </FaqItem>

            <FaqItem
              value="service-area"
              question="What areas do you currently serve?"
            >
              SmartNET focuses on local residential and commercial work first,
              with priority given to clients within a reasonable drive radius.
              If you&apos;re nearby and unsure, send your address in the notes
              and we&apos;ll confirm service availability before booking.
            </FaqItem>
          </Accordion>
        </div>

        {/* Bottom line helper text */}
        <p className="mx-auto max-w-2xl text-center text-[0.75rem] text-slate-400 md:text-xs">
          Still not sure if your project is a fit? Use the notes field when you
          book a time and tell us what you&apos;re worried about—coverage,
          budget, timelines or anything else.
        </p>
      </div>
    </motion.section>
  );
}

type FaqItemProps = {
  value: string;
  question: string;
  children: React.ReactNode;
};

function FaqItem({ value, question, children }: FaqItemProps) {
  return (
    <AccordionItem
      value={value}
      className="overflow-hidden rounded-xl border border-sky-500/15 bg-slate-950/60 px-3 data-[state=open]:border-cyan-400/50"
    >
      <AccordionTrigger className="text-left text-sm font-medium text-slate-100 hover:text-cyan-100">
        {question}
      </AccordionTrigger>
      <AccordionContent className="pb-4 text-xs text-slate-300/80">
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}
