"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function FinalCtaStrip() {
  return (
    <motion.section
      className="w-full px-4 pb-8 md:pb-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-2xl border border-cyan-500/25 bg-slate-950/70 px-4 py-4 shadow-[0_0_32px_rgba(8,47,73,0.7)] md:px-6 md:py-5">
          {/* Soft animated line */}
          <motion.div
            className="pointer-events-none absolute -left-10 top-0 h-px w-1/2 bg-gradient-to-r from-cyan-500/0 via-cyan-400/80 to-cyan-500/0"
            animate={{ x: ["0%", "120%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-sky-300/80">
                Next Step
              </p>
              <h3 className="text-sm font-semibold text-slate-50 md:text-base">
                Ready to lock in your SmartNET plan?
              </h3>
              <p className="text-xs text-slate-300/85 md:text-[0.8rem]">
                Your AI estimate already outlines the project. You can tune it a
                bit more, or jump straight to choosing an install window that
                fits your schedule.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 md:justify-end">
              <Button
                asChild
                size="sm"
                className="text-[0.75rem] md:text-xs"
                variant="outline"
              >
                <a href="#smartnet-wizard">Adjust my SmartNET estimate</a>
              </Button>
              <Button
                asChild
                size="sm"
                className="bg-cyan-500 text-[0.75rem] text-slate-950 hover:bg-cyan-400 md:text-xs"
              >
                <a href="#booking-calendar">Book my install window</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
