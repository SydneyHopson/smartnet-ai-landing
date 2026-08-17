"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Cable, Cpu, FileCheck2, ShieldCheck, Sparkles } from "lucide-react";

const capabilities = [
  { icon: Cpu, title: "Systems thinking", body: "Power, network, coverage, pathways and expansion planned together." },
  { icon: Cable, title: "Clean infrastructure", body: "Cable routes, terminations, labels and rack organization treated as finished work." },
  { icon: FileCheck2, title: "Documented scope", body: "Estimator, walkthrough and proposal keep the same project context." },
  { icon: ShieldCheck, title: "Professional verification", body: "AI output is verified against the real site before final pricing." },
];

export function WhySmartNetSection() {
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_28%,rgba(14,165,233,.12),transparent_30%),radial-gradient(circle_at_12%_80%,rgba(37,99,235,.10),transparent_28%)]" />
      <div className="relative mx-auto grid max-w-[1500px] gap-12 xl:grid-cols-[.82fr_1.18fr] xl:items-center">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 border-y border-sky-400/25 bg-sky-950/20 px-4 py-2 text-[.68rem] font-bold uppercase tracking-[.22em] text-sky-300"><Sparkles className="h-4 w-4" /> Why SmartNET</div>
          <h2 className="mt-6 text-4xl font-black uppercase leading-[1.02] tracking-[-.035em] text-white sm:text-5xl lg:text-6xl">Built like infrastructure. <span className="block bg-gradient-to-r from-sky-300 via-blue-500 to-blue-700 bg-clip-text text-transparent">Delivered like a service.</span></h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">SmartNET combines disciplined low-voltage installation with an AI-assisted planning layer so customers get a clearer scope before anyone starts drilling.</p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:max-w-xl">{["Plan before install", "Verify before quote", "Label what matters", "Design for growth"].map((item) => <div key={item} className="flex items-center gap-2 border-l border-sky-400/30 pl-3 text-sm font-semibold text-slate-200"><span className="h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,.6)]" />{item}</div>)}</div>
        </div>

        <div className="relative min-h-[560px] overflow-hidden rounded-3xl border border-sky-400/15 bg-[#061020] shadow-[0_35px_110px_rgba(2,6,23,.6)]">
          <Image src="/hero/images/smartnet-ai-building-v3.png" alt="SmartNET intelligent building system" fill sizes="(max-width:1280px) 100vw, 55vw" className="object-cover object-[68%_45%] opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/95 via-[#020617]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]/20" />
          <div className="absolute left-5 top-5 rounded-full border border-sky-300/25 bg-[#03101f]/75 px-4 py-2 font-mono text-[.6rem] uppercase tracking-[.18em] text-sky-200 backdrop-blur">SmartNET system architecture</div>
          <div className="absolute bottom-5 left-5 right-5 grid gap-3 sm:grid-cols-2">
            {capabilities.map(({ icon: Icon, title, body }, index) => (
              <motion.div key={title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }} className="rounded-xl border border-sky-300/15 bg-[#020817]/80 p-4 backdrop-blur-md">
                <div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-lg border border-sky-300/20 bg-sky-400/10 text-sky-200"><Icon className="h-4 w-4"/></span><h3 className="text-sm font-bold text-white">{title}</h3></div><p className="mt-2 text-xs leading-5 text-slate-300">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
