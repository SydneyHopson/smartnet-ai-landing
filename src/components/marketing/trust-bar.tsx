"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function TrustBar() {
  return (
    <section className="mt-10 mb-16 w-full px-4">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6">
        {/* Top Label – centered like your screenshot */}
        <p className="text-center text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-sky-300/80">
          SmartNET is backed by enterprise experience, professional systems & trusted service
        </p>

        {/* Badges */}
        <div
          className="
            flex w-full flex-col items-center gap-6
            md:flex-row md:justify-between
          "
        >
          <Badge src="/trustbar/smartnet-badge.png" alt="SmartNET enterprise experience badge" />
          <Badge src="/trustbar/smartnet-badge21.png" alt="SmartNET systems and warranty badge" />
          <Badge src="/trustbar/smartnet-badge34.png" alt="SmartNET approved vendor badge" />
        </div>
      </div>
    </section>
  );
}

type BadgeProps = {
  src: string;
  alt: string;
};

function Badge({ src, alt }: BadgeProps) {
  return (
    <motion.div
      className="group relative flex-shrink-0"
      whileHover={{
        scale: 1.03,
      }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
    >
      {/* Floor glow under badge */}
      <div className="pointer-events-none absolute inset-x-6 bottom-[-10px] h-6 rounded-full bg-cyan-400/30 blur-xl" />

      {/* Soft halo behind badge */}
      <div className="pointer-events-none absolute inset-0 translate-y-2 rounded-[999px] bg-cyan-500/10 blur-2xl group-hover:bg-cyan-400/20 transition-colors duration-300" />

      {/* Animated circuit sweep overlay */}
      <div className="pointer-events-none absolute inset-[10%] overflow-hidden rounded-3xl">
        <div
          className="
            h-full w-1/3
            bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent
            mix-blend-screen opacity-0
            group-hover:opacity-80
            animate-circuit-scan
          "
        />
      </div>

      {/* Badge image */}
      <Image
        src={src}
        alt={alt}
        width={1400}
        height={500}
        className="
          relative z-10 h-auto
          w-[260px]      /* mobile */
          sm:w-[280px]
          md:w-[300px]  /* tablets */
          lg:w-[340px]  /* desktop */
          xl:w-[380px]  /* big screens */
          drop-shadow-[0_0_22px_rgba(56,189,248,0.22)]
          group-hover:drop-shadow-[0_0_32px_rgba(56,189,248,0.5)]
          transition-shadow duration-300
        "
        priority
      />
    </motion.div>
  );
}
