"use client";
import { Player } from "lottie-react";
import animationData from "@/public/animations/hud-background.json";

export function HudBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-10 mix-blend-screen">
      <Player
        animationData={animationData}
        loop
        autoplay
        className="w-full h-full object-cover"
      />
    </div>
  );
}
