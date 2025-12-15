"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";

import { HeroSection } from "@/components/hero/hero-section";
import { TrustBar } from "@/components/marketing/trust-bar";
import {
  BookingCalendarSection,
  SmartNetEstimate as CalendarEstimate,
  BookingPayload,
} from "@/components/booking/booking-calendar";
import { SmartNetGeneratorSection } from "@/components/smartNetWizard/SmartNetGeneratorSection";
import {
  SmartNetEstimateProvider,
  useSmartNetEstimate,
} from "@/components/smartNetWizard/SmartNetEstimateProvider";

import { HowItWorksSection } from "@/components/marketing/how-it-works";
import { WhySmartNetSection } from "@/components/marketing/why-smartnet";
import { ProjectTypesSection } from "@/components/marketing/project-types-section";
import { FieldResultsSection } from "@/components/marketing/field-results";
import { EquipmentSection } from "@/components/marketing/equipment-section";
import { TestimonialsSection } from "@/components/marketing/testimonials";
import { PricingPreviewSection } from "@/components/marketing/pricing-preview";
import { ServiceAreaSection } from "@/components/marketing/service-area";
import { FaqSection } from "@/components/marketing/faq-section";
import { WalkthroughWarmupSection } from "@/components/marketing/walkthrough-warmup";
import { Footer } from "@/components/layout/Footer";

// This is the FLATTENED estimate shape we stored in magicLinkSession.rawEstimateJson
type MagicLinkEstimate = {
  projectType?: string;
  squareFootage?: number;
  focus?: string[];
  coverageProfile?: string;
  wifiLayout?: string;
  doorsAccess?: string;
  extras?: string[];
  wiringStyle?: string;
  rackLocation?: string;
  timeline?: string;
  roughLow?: number;
  roughHigh?: number;
  notes?: string;
};

// ----------------------------
// STEP 2: Resume loader that hydrates context (silent)
// ----------------------------
function ResumeLoader() {
  const searchParams = useSearchParams();
  const resumeToken = searchParams.get("resumeToken");

  const { hydrateFromMagicLink } = useSmartNetEstimate() as {
    hydrateFromMagicLink?: (estimate: MagicLinkEstimate) => void;
  };

  React.useEffect(() => {
    if (!resumeToken) return;

    // ✅ prevent double hydration on refresh/re-render in the same tab
    if (sessionStorage.getItem("smartnet:resumed")) return;

    if (!hydrateFromMagicLink) {
      console.warn(
        "[SmartNET] hydrateFromMagicLink is not defined on useSmartNetEstimate. " +
          "Make sure you added it in SmartNetEstimateProvider."
      );
      return;
    }

    (async () => {
      try {
        const res = await fetch(`/api/magic-link/${resumeToken}`);
        const data = await res.json();

        console.log("[SmartNET] Resume response:", data);

        if (data.ok && !data.isExpired && data.estimate) {
          const flatEstimate = data.estimate as MagicLinkEstimate;

          // 💉 Push it into the provider
          hydrateFromMagicLink(flatEstimate);

          // ✅ mark that we successfully resumed (one-time per tab session)
          sessionStorage.setItem("smartnet:resumed", "1");
        } else {
          console.warn("[SmartNET] Invalid or expired resume link");
        }
      } catch (err) {
        console.error("[SmartNET] Error loading magic link:", err);
      }
    })();
  }, [resumeToken, hydrateFromMagicLink]);

  // ✅ no UI (debug strip removed)
  return null;
}

// ----------------------------
// EXISTING HOME SHELL
// ----------------------------
function HomeShell() {
  const { estimate } = useSmartNetEstimate();
  const searchParams = useSearchParams();
  const hasResumeToken = !!searchParams.get("resumeToken");

  const calendarEstimate: CalendarEstimate = React.useMemo(() => {
    const {
      projectType,
      squareFootage,
      focus,
      coveragePreset,
      wifiLayoutPreset,
      accessPreset,
      extras,
      wiringStyle,
      rackLocation,
      timeline,
      roughLow,
      roughHigh,
      notes,
    } = estimate;

    const focusLabels: string[] = [];
    if (focus?.cameras) focusLabels.push("Cameras");
    if (focus?.wifi) focusLabels.push("Wi-Fi & APs");
    if (focus?.accessControl) focusLabels.push("Access control");

    const coverageProfile =
      coveragePreset === "entry"
        ? "Entry points only"
        : coveragePreset === "common"
        ? "Most common areas"
        : coveragePreset === "full"
        ? "Full coverage"
        : undefined;

    const wifiLayout =
      wifiLayoutPreset === "few"
        ? "Few APs"
        : wifiLayoutPreset === "balanced"
        ? "Balanced coverage"
        : wifiLayoutPreset === "dense"
        ? "Dense mesh"
        : undefined;

    const doorsAccess =
      accessPreset === "none"
        ? "No access control"
        : accessPreset === "fewDoors"
        ? "Front/back + 1–2 doors"
        : accessPreset === "manyDoors"
        ? "Many internal doors"
        : undefined;

    const extrasLabels =
      extras
        ? Object.entries(extras)
            .filter(([, v]) => v)
            .map(([k]) => {
              if (k === "speakers") return "Ceiling speakers";
              if (k === "wallDisplays") return "Wall displays / screens";
              if (k === "miniRack") return "Mini network rack";
              if (k === "batteryUps") return "Battery backup / UPS";
              return "";
            })
            .filter(Boolean)
        : [];

    const wiringStyleLabel =
      wiringStyle === "exposed"
        ? "Exposed conduit runs"
        : wiringStyle === "hidden"
        ? "Hidden in walls / ceilings"
        : wiringStyle === "mix"
        ? "Mix of both"
        : undefined;

    const rackLocationLabel =
      rackLocation === "hall"
        ? "Hall / office closet"
        : rackLocation === "garage"
        ? "Garage / utility room"
        : rackLocation === "dedicated"
        ? "Dedicated IDF / MDF"
        : undefined;

    const timelineLabel =
      timeline === "flexible"
        ? "Flexible"
        : timeline === "month"
        ? "Within a month"
        : timeline === "rush"
        ? "ASAP / rush"
        : undefined;

    const safeRoughLow =
      typeof roughLow === "number" && !Number.isNaN(roughLow)
        ? roughLow
        : undefined;

    const safeRoughHigh =
      typeof roughHigh === "number" && !Number.isNaN(roughHigh)
        ? roughHigh
        : undefined;

    return {
      projectType: projectType || "Home",
      squareFootage,
      focus: focusLabels,
      coverageProfile,
      wifiLayout,
      doorsAccess,
      extras: extrasLabels,
      wiringStyle: wiringStyleLabel,
      rackLocation: rackLocationLabel,
      timeline: timelineLabel,
      roughLow: safeRoughLow,
      roughHigh: safeRoughHigh,
      notes: notes || undefined,
    };
  }, [estimate]);

  const handleConfirmBooking = async (payload: BookingPayload) => {
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Booking request failed");

      // ✅ Optional cleanup: allow future resume links to hydrate again in this tab
      sessionStorage.removeItem("smartnet:resumed");
    } catch (err) {
      console.error("Failed to send booking", err);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#020617] text-slate-50">
      {/* Resume loader: hydrates wizard silently if resumeToken exists */}
      <ResumeLoader />

      <HeroSection />
      <TrustBar />

      {/* Auto-start on Step 4 when resuming from a magic link */}
      <SmartNetGeneratorSection startOnSummary={hasResumeToken} />

      <HowItWorksSection />
      <WhySmartNetSection />
      <ProjectTypesSection />
      <FieldResultsSection />
      <EquipmentSection />
      <TestimonialsSection />
      <PricingPreviewSection />
      <ServiceAreaSection />
      <FaqSection />

      <WalkthroughWarmupSection />

      <section id="booking-calendar">
        <BookingCalendarSection
          estimate={calendarEstimate}
          onConfirmBooking={handleConfirmBooking}
        />
      </section>

      <Footer />
    </main>
  );
}

export default function HomePage() {
  return (
    <SmartNetEstimateProvider>
      <HomeShell />
    </SmartNetEstimateProvider>
  );
}
