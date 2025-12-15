"use client";

import * as React from "react";
import Lottie from "lottie-react";

export function HudBackground() {
  const [animationData, setAnimationData] = React.useState<any>(null);

  React.useEffect(() => {
    let alive = true;

    async function load() {
      try {
        const res = await fetch("/animations/hud-background.json", {
          cache: "force-cache",
        });
        if (!res.ok) throw new Error(`Failed to load Lottie JSON: ${res.status}`);
        const json = await res.json();
        if (alive) setAnimationData(json);
      } catch (err) {
        console.error("[HudBackground] Lottie load error:", err);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, []);

  if (!animationData) return null;

  return (
    <div className="absolute inset-0 pointer-events-none opacity-10 mix-blend-screen">
      <Lottie
        animationData={animationData}
        loop
        autoplay
        className="w-full h-full object-cover"
      />
    </div>
  );
}
