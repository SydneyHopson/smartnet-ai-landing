"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Cable, Cpu, Sparkles } from "lucide-react";

export function WhySmartNetSection() {
  return (
    <motion.section
      className="relative w-full px-4 py-10 md:py-16"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Soft background accent + ghost title */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-10 top-8 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />
        <p className="absolute -left-4 top-6 hidden text-7xl font-black tracking-[0.2em] text-slate-800/40 md:block">
          SMARTNET
        </p>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-start md:gap-12">
        {/* Left: story / positioning */}
        <div className="max-w-xl space-y-4">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-sky-300/70">
            Why SmartNET
          </p>
          <h2 className="text-balance text-2xl font-semibold text-slate-50 md:text-3xl">
            Enterprise discipline, installed in real-world spaces.
          </h2>
          <p className="text-sm text-slate-300/80 md:text-base">
            SmartNET blends datacenter-grade methods with on-site installation. You get
            clean routing, labeled systems and smart coverage planning—without the
            usual “contractor chaos.”
          </p>

          <div className="mt-4 grid gap-3 text-xs text-slate-200/85 md:text-sm">
            <Bullet>
              <span className="font-semibold text-sky-200">Datacenter mindset</span>{" "}
              applied to homes, warehouses and offices.
            </Bullet>
            <Bullet>
              AI-assisted planning + human field experience for confident installs.
            </Bullet>
            <Bullet>
              Respect for your space: we route cleanly, document clearly and leave
              your site better than we found it.
            </Bullet>
          </div>
        </div>

        {/* Right: vertical rail with feature nodes */}
        <motion.div
          className="relative flex-1"
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          {/* Vertical HUD rail */}
          <div className="pointer-events-none absolute left-4 top-0 bottom-0 hidden md:block">
            <div className="mx-auto h-full w-px bg-gradient-to-b from-cyan-500/0 via-cyan-500/40 to-cyan-500/0" />
          </div>

          <div className="flex flex-col gap-4 md:pl-10">
            <FeatureNode
              index={0}
              icon={<Cpu className="h-4 w-4 text-cyan-300" />}
              title="Datacenter-trained discipline"
              body="Experience from environments that demand uptime, cable management and documentation—applied directly to your project."
              tag="Microsoft / TekSystems / IES background"
            />
            <FeatureNode
              index={1}
              icon={<Cable className="h-4 w-4 text-cyan-300" />}
              title="Clean routing & labeled systems"
              body="We treat every site like a mini-IDF: clean cable paths, labeled drops and clear handoff so you always know what’s what."
              tag="No mystery wires, no spaghetti ceilings"
            />
            <FeatureNode
              index={2}
              icon={<ShieldCheck className="h-4 w-4 text-cyan-300" />}
              title="Professional hardware & warranty"
              body="We design around proven cameras, APs and network gear—no random bargain-bin hardware that fails when you need it."
              tag="Built on pro-grade systems"
            />
            <FeatureNode
              index={3}
              icon={<Sparkles className="h-4 w-4 text-cyan-300" />}
              title="SmartNET AI planning layer"
              body="Your install is pre-planned with AI assistance—coverage, angles, Wi-Fi density and routing paths thought through before we drill."
              tag="Human + AI planning loop"
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

type BulletProps = {
  children: React.ReactNode;
};

function Bullet({ children }: BulletProps) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-[5px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(56,189,248,0.9)]" />
      <p>{children}</p>
    </div>
  );
}

type FeatureNodeProps = {
  index: number;
  icon: React.ReactNode;
  title: string;
  body: string;
  tag: string;
};

function FeatureNode({ index, icon, title, body, tag }: FeatureNodeProps) {
  return (
    <motion.div
      className="relative rounded-xl border border-sky-500/15 bg-slate-950/70 px-4 py-3 shadow-[0_0_26px_rgba(8,47,73,0.45)]"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.35,
        ease: "easeOut",
        delay: index * 0.08,
      }}
      whileHover={{
        y: -4,
        boxShadow: "0 0 38px rgba(56,189,248,0.35)",
        borderColor: "rgba(56,189,248,0.55)",
      }}
      whileTap={{ scale: 0.985 }}
    >
      {/* Rail node dot (desktop) */}
      <div className="pointer-events-none absolute -left-[26px] top-4 hidden h-3 w-3 items-center justify-center rounded-full border border-cyan-400/60 bg-slate-950/95 md:flex">
        <motion.div
          className="h-1.5 w-1.5 rounded-full bg-cyan-300"
          animate={{ boxShadow: ["0 0 0 rgba(56,189,248,0)", "0 0 10px rgba(56,189,248,0.9)", "0 0 0 rgba(56,189,248,0)"] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.2 }}
        />
      </div>

      {/* Main content */}
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-cyan-500/10">
          {icon}
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-slate-50">{title}</h3>
          <p className="text-xs text-slate-300/85">{body}</p>
          <p className="mt-1 inline-flex rounded-full bg-cyan-500/10 px-2 py-0.5 text-[0.65rem] font-medium text-cyan-100">
            {tag}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
