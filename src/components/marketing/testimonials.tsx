"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const reviews = [
  { quote: "They didn’t just throw cameras on walls. They walked the property, showed the blind spots and explained why every angle mattered.", role: "Business owner · Atlanta", feature: true },
  { quote: "The wiring is clean, the rack makes sense, and I can finally tell what everything is connected to.", role: "Property owner · Douglasville" },
  { quote: "The biggest difference was the planning. Nothing felt improvised once the install started.", role: "Commercial client · Metro Atlanta" },
];

export function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-[#010512] py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,.13),transparent_34rem)]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[.28em] text-sky-300">Client experience</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">The system should feel intentional before it ever turns on.</h2>
          <p className="mt-5 text-base leading-7 text-slate-400">Clean work, clear communication and a layout that still makes sense after we leave.</p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-[1.15fr_.85fr]">
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-sky-400/20 bg-[linear-gradient(145deg,rgba(8,17,34,.98),rgba(3,8,23,.92))] p-7 sm:p-9"
          >
            <Quote className="h-10 w-10 text-sky-300/60" />
            <p className="mt-7 max-w-3xl text-2xl font-semibold leading-10 text-white sm:text-3xl">“{reviews[0].quote}”</p>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-sky-400/10 pt-5">
              <p className="text-sm font-semibold text-slate-300">{reviews[0].role}</p>
              <Stars />
            </div>
          </motion.article>

          <div className="grid gap-4">
            {reviews.slice(1).map((review, index) => (
              <motion.article
                key={review.role}
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * .06 }}
                className="rounded-2xl border border-sky-400/15 bg-[#07101f]/90 p-6"
              >
                <Stars />
                <p className="mt-5 text-lg font-semibold leading-7 text-white">“{review.quote}”</p>
                <p className="mt-5 text-xs font-bold uppercase tracking-[.16em] text-slate-500">{review.role}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stars() {
  return <div className="flex gap-1" aria-label="5 star review">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-300 text-amber-300" />)}</div>;
}
