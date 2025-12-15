"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ClipboardList, Camera, FileCheck } from "lucide-react";

export function WalkthroughWarmupSection() {
  const scrollToId = (id: string) => {
    if (typeof document === "undefined") return;
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.section
      className="relative w-full px-4 py-12 md:py-16"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {/* Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-48 w-[70%] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center space-y-2">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-sky-300/70">
            Before you pick a time
          </p>
          <h2 className="text-2xl font-semibold text-slate-50 md:text-3xl">
            What actually happens on your SmartNET walkthrough
          </h2>
          <p className="text-sm text-slate-300/80 md:text-base">
            Whether it’s virtual or on-site, this isn’t a sales pitch. It’s a
            short working session to shape a clean, realistic install plan
            around your space.
          </p>
        </div>

        {/* Note */}
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-900/40 px-4 py-1.5 text-[0.75rem] text-emerald-100 shadow-[0_0_14px_rgba(16,185,129,0.45)] backdrop-blur-sm">
            ● No work is scheduled until you approve the final quote.
          </div>
        </div>

        {/* 3 Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <WarmupCard
            icon={<ClipboardList className="h-5 w-5 text-cyan-300" />}
            title="Walk the space together"
            desc="We review doors, driveways, parking and the rooms that matter most, so your system is designed around how you actually use the property."
          />

          <WarmupCard
            icon={<Camera className="h-5 w-5 text-cyan-300" />}
            title="Lock in angles & wiring paths"
            desc="We confirm camera angles, AP locations and clean cable routes so nothing surprises you on install day."
          />

          <WarmupCard
            icon={<FileCheck className="h-5 w-5 text-cyan-300" />}
            title="Turn AI range into a real quote"
            desc="Your AI estimate becomes a clear, itemized proposal you can approve, tweak or scale back before any work begins."
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col items-center justify-center gap-3 pt-4 md:flex-row md:gap-4">
          {/* 🔹 FIXED: this now points to your wizard section id */}
          <button
            type="button"
            onClick={() => scrollToId("smartnet-generator")}
            className="rounded-full border border-slate-600 bg-slate-900/70 px-6 py-2 text-[0.78rem] font-medium text-slate-100 shadow-sm transition hover:border-sky-400 hover:text-sky-100"
          >
            Adjust my SmartNET estimate
          </button>

          <button
            type="button"
            onClick={() => scrollToId("booking-calendar")}
            className="rounded-full bg-cyan-400 px-6 py-2 text-[0.78rem] font-semibold text-slate-950 shadow-[0_0_22px_rgba(34,211,238,0.8)] transition hover:bg-cyan-300"
          >
            Book my SmartNET walkthrough
          </button>
        </div>
      </div>
    </motion.section>
  );
}

function WarmupCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="rounded-xl border border-cyan-500/20 bg-slate-950/60 p-4 shadow-[0_0_20px_rgba(8,47,73,0.45)]"
    >
      <div className="mb-2 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/10">
          {icon}
        </div>
        <p className="text-sm font-semibold text-slate-50">{title}</p>
      </div>
      <p className="text-xs text-slate-300/80">{desc}</p>
    </motion.div>
  );
}
