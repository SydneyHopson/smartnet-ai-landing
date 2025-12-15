"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { BrainCircuit, CalendarCheck2, ShieldCheck } from "lucide-react";

export function HowItWorksSection() {
  return (
    <motion.section
      className="relative w-full px-4 py-10 md:py-16"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Soft background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-20 top-10 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute right-0 top-32 h-48 w-48 rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        {/* Heading block (CENTERED NOW) */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-sky-300/70">
            The Process
          </p>
          <h2 className="text-balance text-2xl font-semibold text-slate-50 md:text-3xl">
            How your SmartNET installation works
          </h2>
          <p className="text-sm text-slate-300/80 md:text-base">
            Simple, accurate and datacenter-clean. Your AI estimate builds the
            blueprint, you choose an install window, and our team delivers a
            documented, professional install.
          </p>
        </div>

        {/* 3-step cards */}
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {/* Step 1 */}
          <StepCard
            index={0}
            step="Step 1"
            label="Plan your system"
            icon={
              <div className="hud-ring flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/10">
                <BrainCircuit className="h-5 w-5 text-cyan-300" />
              </div>
            }
            headline="Your AI estimate builds the blueprint"
            body="Your answers generate a SmartNET layout—coverage zones, access points, wiring style and estimated cost ranges using datacenter-grade logic."
            accent="AI-powered system planning"
          />

          {/* Step 2 */}
          <StepCard
            index={1}
            step="Step 2"
            label="Book your window"
            icon={
              <div className="hud-ring flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/10">
                <CalendarCheck2 className="h-5 w-5 text-cyan-300" />
              </div>
            }
            headline="Choose an installation day that works for you"
            body="Lock in an install window using the SmartNET calendar. You’ll receive confirmation with your project summary and key details."
            accent="Straightforward scheduling"
          />

          {/* Step 3 */}
          <StepCard
            index={2}
            step="Step 3"
            label="Install & optimize"
            icon={
              <div className="hud-ring flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/10">
                <ShieldCheck className="h-5 w-5 text-cyan-300" />
              </div>
            }
            headline="Professional installation with verification"
            body="We arrive with your plan, route cable cleanly, mount hardware, tune camera angles, test Wi-Fi and label everything before handoff."
            accent="Datacenter-inspired field work"
          />
        </div>

        {/* Bottom micro CTA bar */}
        <motion.div
          className="relative mt-2 flex flex-col items-start gap-2 rounded-xl border border-cyan-500/15 bg-slate-950/60 px-4 py-3 text-xs text-slate-200/80 shadow-[0_0_30px_rgba(8,47,73,0.5)] md:flex-row md:items-center md:justify-between"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <div className="flex items-center gap-2">
            <motion.div
              className="h-1.5 w-1.5 rounded-full bg-emerald-400"
              animate={{
                boxShadow: [
                  "0 0 0 rgba(52,211,153,0.0)",
                  "0 0 14px rgba(52,211,153,0.9)",
                  "0 0 0 rgba(52,211,153,0.0)",
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <span className="font-medium text-emerald-200">
              Your system plan is ready as soon as you finish the wizard.
            </span>
          </div>
          <p className="text-[0.7rem] text-slate-300/80">
            Next step: pick an install date in the calendar and SmartNET handles
            the rest.
          </p>
        </motion.div>
      </div>

      {/* local HUD ring animation */}
      <style jsx>{`
        .hud-ring {
          position: relative;
          overflow: hidden;
        }

        .hud-ring::before {
          content: "";
          position: absolute;
          inset: -40%;
          border-radius: 9999px;
          border: 1px solid rgba(56, 189, 248, 0.3);
          opacity: 0.7;
          animation: hud-rotate 18s linear infinite;
        }

        .hud-ring::after {
          content: "";
          position: absolute;
          inset: 30%;
          border-radius: 9999px;
          background: radial-gradient(
            circle,
            rgba(56, 189, 248, 0.35),
            transparent
          );
          opacity: 0.5;
        }

        @keyframes hud-rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </motion.section>
  );
}

type StepCardProps = {
  index: number;
  step: string;
  label: string;
  icon: React.ReactNode;
  headline: string;
  body: string;
  accent: string;
};

function StepCard({
  index,
  step,
  label,
  icon,
  headline,
  body,
  accent,
}: StepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
        delay: index * 0.08,
      }}
      whileHover={{
        y: -6,
        boxShadow: "0 0 40px rgba(56,189,248,0.35)",
        borderColor: "rgba(56,189,248,0.5)",
      }}
      whileTap={{ scale: 0.98 }}
      className="h-full"
    >
      <Card className="relative flex h-full flex-col border-sky-500/15 bg-slate-950/60 shadow-[0_0_24px_rgba(8,47,73,0.5)] transition-colors">
        {/* subtle top line */}
        <motion.div
          className="pointer-events-none absolute left-4 right-10 top-4 h-px bg-gradient-to-r from-cyan-500/0 via-cyan-400/60 to-cyan-500/0"
          animate={{
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 0.3,
          }}
        />

        <CardHeader className="space-y-2 pb-2">
          <div className="flex items-center gap-3">
            {icon}
            <div className="flex flex-col">
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-sky-300/80">
                {step}
              </span>
              <span className="text-xs font-medium text-slate-200/90">
                {label}
              </span>
            </div>
          </div>

          <CardTitle className="mt-1 text-sm font-semibold text-slate-50">
            {headline}
          </CardTitle>

          <CardDescription className="text-xs text-slate-300/80">
            {body}
          </CardDescription>
        </CardHeader>

        <CardContent className="mt-auto pt-0">
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.9)]" />
            <span className="text-[0.7rem] font-medium text-cyan-100/90">
              {accent}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
