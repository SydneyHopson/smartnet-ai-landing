"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Network, ShieldCheck, Sparkles } from "lucide-react";

const items = [
  { icon: BadgeCheck, value: "Field-tested", label: "Professional installs" },
  { icon: Network, value: "End-to-end", label: "Network + low voltage" },
  { icon: ShieldCheck, value: "Verified", label: "Walkthrough before final quote" },
  { icon: Sparkles, value: "AI-assisted", label: "Project planning & scope" },
];

export function TrustBar() {
  return (
    <section className="relative z-20 -mt-10 px-4 pb-8 sm:px-6 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.45 }}
        className="mx-auto max-w-[1500px] overflow-hidden rounded-2xl border border-sky-400/20 bg-[#061020]/90 shadow-[0_24px_80px_rgba(2,6,23,.55)] backdrop-blur-xl"
      >
        <div className="grid sm:grid-cols-2 xl:grid-cols-4">
          {items.map(({ icon: Icon, value, label }, index) => (
            <div
              key={value}
              className={`group relative flex items-center gap-4 px-5 py-5 sm:px-6 ${index ? "border-t border-sky-400/10 sm:border-l sm:border-t-0" : ""}`}
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-sky-400/20 bg-sky-400/[0.07] text-sky-300 transition group-hover:border-sky-300/40 group-hover:bg-sky-400/10">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">{value}</p>
                <p className="mt-0.5 text-xs leading-5 text-slate-400">{label}</p>
              </div>
              <div className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-sky-400/0 to-transparent transition group-hover:via-sky-400/40" />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
