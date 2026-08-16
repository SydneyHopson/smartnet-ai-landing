"use client";

import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, CalendarCheck2, ClipboardCheck, Wrench } from "lucide-react";

const steps = [
  { number: "01", icon: BrainCircuit, eyebrow: "Describe the project", title: "Tell SmartNET what you need", body: "Answer focused questions about your space, coverage goals, wiring, timeline and the systems you want." },
  { number: "02", icon: ClipboardCheck, eyebrow: "AI project design", title: "Get a structured preliminary scope", body: "SmartNET organizes the project, identifies missing details and builds a preliminary equipment and installation plan." },
  { number: "03", icon: CalendarCheck2, eyebrow: "Field verification", title: "Book the walkthrough", body: "Choose a time so the layout, cable paths, mounting conditions and real-world constraints can be verified." },
  { number: "04", icon: Wrench, eyebrow: "Install & handoff", title: "Approve, install and document", body: "After you approve the final quote, the system is installed, tested, labeled and handed off cleanly." },
];

export function HowItWorksSection() {
  return (
    <section className="relative overflow-hidden border-y border-sky-400/10 bg-[#030817] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(56,189,248,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,.8)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[70%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,.16),transparent_68%)]" />

      <div className="relative mx-auto max-w-[1500px]">
        <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-sky-300">The SmartNET process</p>
            <h2 className="mt-4 max-w-xl text-3xl font-black uppercase leading-[1.02] tracking-[-.025em] text-white sm:text-4xl lg:text-5xl">
              From rough idea to <span className="text-sky-400">install-ready plan.</span>
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-slate-400 lg:justify-self-end">
            One connected workflow instead of a stack of disconnected forms. Your estimate, walkthrough and final project scope build on the same project record.
          </p>
        </div>

        <div className="mt-12 grid gap-0 overflow-hidden rounded-2xl border border-sky-400/15 bg-[#061020]/75 lg:grid-cols-4">
          {steps.map(({ number, icon: Icon, eyebrow, title, body }, index) => (
            <motion.article
              key={number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: .25 }}
              transition={{ delay: index * .07, duration: .35 }}
              className={`group relative min-h-[300px] p-6 sm:p-7 ${index ? "border-t border-sky-400/10 lg:border-l lg:border-t-0" : ""}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-4xl font-black tracking-[-.05em] text-sky-400/25">{number}</span>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-sky-400/20 bg-sky-400/[.06] text-sky-300">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
              <p className="mt-10 text-[.65rem] font-bold uppercase tracking-[.2em] text-blue-300">{eyebrow}</p>
              <h3 className="mt-2 text-lg font-bold leading-snug text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{body}</p>
              {index < steps.length - 1 && (
                <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 rounded-full border border-sky-400/20 bg-[#061020] p-1 text-sky-400 lg:block" />
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
