"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

export function TestimonialsSection() {
  const FiveStars = () => (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3 w-3 fill-amber-300 text-amber-300" />
      ))}
    </div>
  );

  const FourStars = () => (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 4 }).map((_, i) => (
        <Star key={i} className="h-3 w-3 fill-amber-300 text-amber-300" />
      ))}
      <Star className="h-3 w-3 text-slate-600" />
    </div>
  );

  return (
    <motion.section
      className="relative w-full px-4 py-12 md:py-16"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {/* glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-40 w-[70%] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        {/* heading */}
        <div className="mx-auto max-w-3xl space-y-3 text-center">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-sky-300/80">
            What it feels like
          </p>
          <h2 className="text-balance text-2xl font-semibold text-slate-50 md:text-3xl">
            SmartNET installs feel more like a system upgrade than “just cameras”
          </h2>
          <p className="text-sm text-slate-300/80 md:text-base">
            Clean installs. Clear communication. Systems that make sense the
            moment you walk the property.
          </p>
        </div>

        {/* grid */}
        <div className="grid gap-4 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:gap-5">
          {/* BIG FEATURE STACK */}
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            whileHover={{
              y: -4,
              boxShadow: "0 0 40px rgba(56,189,248,0.35)",
              borderColor: "rgba(56,189,248,0.6)",
            }}
            className="relative flex h-full flex-col gap-8 rounded-2xl border border-sky-500/30 bg-slate-950/75 p-5 shadow-[0_0_32px_rgba(8,47,73,0.6)] md:p-6 overflow-hidden"
          >

            {/* === TESTIMONIAL 1 (Stars Right) === */}
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500/15">
                    <Quote className="h-4 w-4 text-cyan-300" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[0.7rem] font-semibold text-slate-100">
                      “Everything finally made sense on the cameras.”
                    </span>
                    <span className="text-[0.7rem] text-slate-400">
                      Shop owner – West side of Atlanta
                    </span>
                  </div>
                </div>
                <div className="hidden md:block">
                  <FiveStars />
                </div>
              </div>

              <p className="text-sm text-slate-200/90 md:text-[0.9rem]">
                <span className="text-cyan-300">“</span>
                They didn&apos;t just throw cameras on walls. They walked the lot,
                showed blind spots on a map, and built angles that actually
                protect cars and doors.
                <span className="text-cyan-300">”</span>
              </p>
            </motion.div>

            {/* === TESTIMONIAL 2 (Stars Left) === */}
            <motion.div
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.12 }}
              className="space-y-2 border-t border-sky-500/20 pt-5"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <FiveStars />
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex flex-col text-right">
                    <span className="text-[0.7rem] font-semibold text-slate-100">
                      “They planned everything before drilling.”
                    </span>
                    <span className="text-[0.7rem] text-slate-400">
                      Commercial property – ATL
                    </span>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500/15">
                    <Quote className="h-4 w-4 text-cyan-300" />
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-200/90 md:text-[0.9rem] text-right">
                <span className="text-cyan-300">“</span>
                Cable routing, labeling, camera angles — all thought through in
                advance. Nothing felt rushed.
                <span className="text-cyan-300">”</span>
              </p>
            </motion.div>

            {/* === TESTIMONIAL 3 (4 Stars, Right) === */}
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-2 border-t border-sky-500/20 pt-5"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500/15">
                    <Quote className="h-4 w-4 text-cyan-300" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[0.7rem] font-semibold text-slate-100">
                      “Worth it even though it took a little longer.”
                    </span>
                    <span className="text-[0.7rem] text-slate-400">
                      Business owner – South Cobb
                    </span>
                  </div>
                </div>
                <div className="hidden md:block">
                  <FourStars />
                </div>
              </div>

              <p className="text-sm text-slate-200/90 md:text-[0.9rem]">
                <span className="text-cyan-300">“</span>
                It took longer and cost a bit more because our original wiring
                couldn’t be reused — but they salvaged what they could and the
                final result is clearly a tier above anything we had before.
                <span className="text-cyan-300">”</span>
              </p>
            </motion.div>
          </motion.article>

          {/* Right column unchanged */}
          <div className="grid h-full gap-4 md:grid-rows-3">
            <SmallTestimonial
              role="Homeowner – Douglasville"
              title="“Feels like the cameras were always supposed to be there.”"
              body="They ran the cable where it disappears, but I can still see every corner I was worried about."
            />
            <SmallTestimonial
              role="Warehouse manager – Lithia Springs"
              title="“I finally see all bays in one view.”"
              body="We added more cameras later and they planned for that from day one."
            />
            <SmallTestimonial
              role="Short-term rental – Mableton"
              title="“Guests feel normal — I see everything.”"
              body="They helped place cameras to avoid private spaces but still see arrivals."
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}

type SmallTestimonialProps = {
  role: string;
  title: string;
  body: string;
};

function SmallTestimonial({ role, title, body }: SmallTestimonialProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="flex flex-col rounded-2xl border border-sky-500/25 bg-slate-950/70 p-4 shadow-[0_0_26px_rgba(8,47,73,0.5)]"
    >
      <p className="text-[0.8rem] font-medium text-slate-50">{title}</p>
      <p className="mt-2 text-[0.7rem] text-slate-300/90">{body}</p>
      <p className="mt-3 text-[0.65rem] text-slate-400">{role}</p>
    </motion.article>
  );
}
