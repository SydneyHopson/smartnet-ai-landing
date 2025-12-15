"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Home, Building2, Warehouse } from "lucide-react";

export function PricingPreviewSection() {
  return (
    <motion.section
      className="relative w-full px-4 py-10 md:py-16"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-40 w-[60%] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center space-y-3">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-sky-300/70">
            Typical Project Ranges
          </p>
          <h2 className="text-balance text-2xl font-semibold text-slate-50 md:text-3xl">
            What SmartNET installs usually look like
          </h2>
          <p className="text-sm text-slate-300/80 md:text-base">
            Every property is different, but most projects fall into these ranges. Your AI estimate
            and on-site walkthrough refine the final scope and price.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          <PricingCard
            index={0}
            icon={<Home className="h-5 w-5 text-cyan-300" />}
            label="Smart Home Starter"
            subtitle="Single-family or townhome"
            range="Typically $X,XXX – $X,XXX"
            bullets={[
              "4–8 security cameras with key angles",
              "Basic Wi-Fi improvements where needed",
              "Clean routing, labeling & app setup",
            ]}
            note="Ideal for homeowners getting serious about coverage."
          />

          <PricingCard
            index={1}
            icon={<Building2 className="h-5 w-5 text-cyan-300" />}
            label="Business Coverage"
            subtitle="Small office / retail / studio"
            range="Typically $X,XXX – $X,XXX+"
            bullets={[
              "Interior + exterior views & entrances",
              "Upgraded Wi-Fi & AP placement",
              "Basic access control on key doors",
            ]}
            highlight
            note="Most popular starting point for business clients."
          />

          <PricingCard
            index={2}
            icon={<Warehouse className="h-5 w-5 text-cyan-300" />}
            label="Perimeter & Warehouse"
            subtitle="Larger lots, yards & bays"
            range="Custom — based on size & risk"
            bullets={[
              "Perimeter + loading dock coverage",
              "High-bay or yard cameras where needed",
              "Network, NVR and labeling to scale later",
            ]}
            note="Scales with the size and complexity of your site."
          />
        </div>

        {/* Bottom line */}
        <div className="mt-2 text-center text-[0.75rem] text-slate-300/75 md:text-xs">
          These ranges are for planning. Your SmartNET AI estimate and project call lock in an exact,
          itemized proposal before any work begins.
        </div>
      </div>
    </motion.section>
  );
}

type PricingCardProps = {
  index: number;
  icon: React.ReactNode;
  label: string;
  subtitle: string;
  range: string;
  bullets: string[];
  note: string;
  highlight?: boolean;
};

function PricingCard({
  index,
  icon,
  label,
  subtitle,
  range,
  bullets,
  note,
  highlight,
}: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: index * 0.08 }}
      whileHover={{
        y: -6,
        boxShadow: "0 0 40px rgba(56,189,248,0.35)",
        borderColor: "rgba(56,189,248,0.55)",
      }}
      whileTap={{ scale: 0.985 }}
      className="h-full"
    >
      <Card
        className={[
          "flex h-full flex-col border-sky-500/15 bg-slate-950/70 shadow-[0_0_26px_rgba(8,47,73,0.5)] transition-colors",
          highlight ? "border-cyan-400/40" : "",
        ].join(" ")}
      >
        <CardHeader className="pb-3">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500/10">
                {icon}
              </div>
              <div className="flex flex-col">
                <CardTitle className="text-sm font-semibold text-slate-50">
                  {label}
                </CardTitle>
                <span className="text-[0.7rem] text-slate-400">{subtitle}</span>
              </div>
            </div>
            {highlight && (
              <span className="rounded-full bg-cyan-500/15 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide text-cyan-200">
                Most selected
              </span>
            )}
          </div>
          <CardDescription className="text-xs font-medium text-cyan-100">
            {range}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-xs text-slate-300/85">
          <ul className="space-y-1.5">
            {bullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-cyan-400" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-[0.7rem] text-slate-400">{note}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
