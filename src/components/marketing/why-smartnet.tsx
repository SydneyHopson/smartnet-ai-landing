"use client";

import { motion } from "framer-motion";
import { Cable, Cpu, FileCheck2, ShieldCheck, Sparkles } from "lucide-react";

const capabilities = [
  { icon: Cpu, title: "Systems thinking", body: "Projects are planned as connected systems—power, network, coverage, pathways and future expansion—not as isolated devices." },
  { icon: Cable, title: "Clean infrastructure", body: "Cable routes, terminations, labels and rack organization are treated as part of the finished product." },
  { icon: FileCheck2, title: "Documented scope", body: "The estimator, walkthrough and proposal share the same project context so fewer details get lost between steps." },
  { icon: ShieldCheck, title: "Professional verification", body: "Preliminary AI output is verified against the real site before final pricing and installation." },
];

export function WhySmartNetSection() {
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_28%,rgba(14,165,233,.11),transparent_30%),radial-gradient(circle_at_12%_80%,rgba(37,99,235,.09),transparent_28%)]" />
      <div className="relative mx-auto grid max-w-[1500px] gap-10 xl:grid-cols-[.9fr_1.1fr] xl:items-center">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 border-y border-sky-400/25 bg-sky-950/20 px-4 py-2 text-[.68rem] font-bold uppercase tracking-[.22em] text-sky-300">
            <Sparkles className="h-4 w-4" /> Why SmartNET
          </div>
          <h2 className="mt-6 text-4xl font-black uppercase leading-[1.02] tracking-[-.035em] text-white sm:text-5xl lg:text-6xl">
            Built like infrastructure. <span className="block bg-gradient-to-r from-sky-300 via-blue-500 to-blue-700 bg-clip-text text-transparent">Delivered like a service.</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">
            SmartNET combines disciplined low-voltage installation with an AI-assisted planning layer so customers get a clearer scope before anyone starts drilling.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:max-w-xl">
            {["Plan before install", "Verify before quote", "Label what matters", "Design for growth"].map((item) => (
              <div key={item} className="flex items-center gap-2 border-l border-sky-400/30 pl-3 text-sm font-semibold text-slate-200">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,.6)]" />{item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute -inset-10 bg-[radial-gradient(circle,rgba(37,99,235,.13),transparent_62%)] blur-2xl" />
          <div className="relative overflow-hidden rounded-2xl border border-sky-400/15 bg-[#061020]/80">
            <div className="flex items-center justify-between border-b border-sky-400/10 px-5 py-4">
              <div>
                <p className="text-[.62rem] font-bold uppercase tracking-[.2em] text-sky-300">SmartNET operating standard</p>
                <p className="mt-1 text-sm text-slate-400">What stays consistent from project to project</p>
              </div>
              <div className="flex gap-1.5"><span className="h-2 w-2 rounded-full bg-sky-400/70"/><span className="h-2 w-2 rounded-full bg-blue-500/50"/><span className="h-2 w-2 rounded-full bg-slate-600"/></div>
            </div>
            <div className="grid sm:grid-cols-2">
              {capabilities.map(({ icon: Icon, title, body }, index) => (
                <motion.div key={title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }} className={`p-5 sm:p-6 ${index % 2 ? "sm:border-l sm:border-sky-400/10" : ""} ${index > 1 ? "border-t border-sky-400/10" : index === 1 ? "border-t border-sky-400/10 sm:border-t-0" : ""}`}>
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-sky-400/20 bg-sky-400/[.06] text-sky-300"><Icon className="h-5 w-5"/></span>
                  <h3 className="mt-5 text-base font-bold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
