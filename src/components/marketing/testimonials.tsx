"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const reviews = [
  { quote: "They didn’t just throw cameras on walls. They walked the property, showed the blind spots and explained why every angle mattered.", role: "Business owner · Atlanta" },
  { quote: "The wiring is clean, the rack makes sense, and I can finally tell what everything is connected to.", role: "Property owner · Douglasville" },
  { quote: "The biggest difference was the planning. Nothing felt improvised once the install started.", role: "Commercial client · Metro Atlanta" },
];

export function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-[#010512] py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,.16),transparent_34rem),radial-gradient(circle_at_8%_90%,rgba(14,165,233,.07),transparent_24rem)]" />
      <div className="pointer-events-none absolute left-[-8rem] top-24 h-80 w-80 rounded-full border border-sky-400/[.06]" />
      <div className="pointer-events-none absolute right-[-4rem] bottom-[-8rem] h-96 w-96 rounded-full border border-sky-400/[.07] shadow-[0_0_100px_rgba(37,99,235,.08)]" />
      <div className="pointer-events-none absolute bottom-[-1rem] right-[-5%] hidden h-[72%] w-[62%] lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_60%,rgba(37,99,235,.18),transparent_55%)] blur-2xl" />
        <Image src="/styling/images/smartnet-service-van.png" alt="" fill sizes="62vw" className="object-contain object-right-bottom opacity-70 drop-shadow-[0_0_55px_rgba(37,99,235,.22)]" />
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] bg-gradient-to-r from-[#010512] via-[#010512]/45 to-transparent lg:block" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[.28em] text-sky-300">Client experience</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">The system should feel intentional before it ever turns on.</h2>
          <p className="mt-5 text-base leading-7 text-slate-400">Clean work, clear communication and a layout that still makes sense after we leave.</p>
        </div>

        <div className="relative mt-12 grid gap-4 lg:grid-cols-[1.15fr_.85fr]">
          <motion.article initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group relative overflow-hidden rounded-3xl border border-sky-400/20 bg-[linear-gradient(145deg,rgba(8,17,34,.94),rgba(3,8,23,.86))] p-7 shadow-[0_28px_90px_rgba(2,6,23,.4)] backdrop-blur-[2px] sm:p-9">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(56,189,248,.11),transparent_28%)]" />
            <div className="pointer-events-none absolute right-0 top-0 h-52 w-52 opacity-[.06] [background-image:linear-gradient(rgba(56,189,248,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,.8)_1px,transparent_1px)] [background-size:18px_18px]" />
            <Quote className="relative h-10 w-10 text-sky-300/70 drop-shadow-[0_0_14px_rgba(56,189,248,.25)]" />
            <p className="relative mt-7 max-w-3xl text-2xl font-semibold leading-10 text-white sm:text-3xl">“{reviews[0].quote}”</p>
            <div className="relative mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-sky-400/10 pt-5"><p className="text-sm font-semibold text-slate-300">{reviews[0].role}</p><Stars /></div>
          </motion.article>

          <div className="grid gap-4">
            {reviews.slice(1).map((review, index) => (
              <motion.article key={review.role} initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }} whileHover={{ x: -3 }} className="group relative overflow-hidden rounded-2xl border border-sky-400/15 bg-[#07101f]/82 p-6 shadow-[0_20px_55px_rgba(2,6,23,.28)] backdrop-blur-[3px] transition hover:border-sky-400/25">
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-500/0 blur-3xl transition duration-500 group-hover:bg-blue-500/10" />
                <div className="relative"><Stars /><p className="mt-5 text-lg font-semibold leading-7 text-white">“{review.quote}”</p><p className="mt-5 text-xs font-bold uppercase tracking-[.16em] text-slate-500">{review.role}</p></div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stars() { return <div className="flex gap-1" aria-label="5 star review">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-300 text-amber-300 drop-shadow-[0_0_7px_rgba(252,211,77,.18)]" />)}</div>; }
