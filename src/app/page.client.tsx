// File: src/app/page.client.tsx
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

function ResumeLoader() {
  const searchParams = useSearchParams();
  const resumeToken = searchParams.get("resumeToken");

  const { hydrateFromMagicLink } = useSmartNetEstimate() as {
    hydrateFromMagicLink?: (estimate: MagicLinkEstimate) => void;
  };

  React.useEffect(() => {
    if (!resumeToken) return;
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

        if (data.ok && !data.isExpired && data.estimate) {
          hydrateFromMagicLink(data.estimate as MagicLinkEstimate);
          sessionStorage.setItem("smartnet:resumed", "1");
        } else {
          console.warn("[SmartNET] Invalid or expired resume link");
        }
      } catch (err) {
        console.error("[SmartNET] Error loading magic link:", err);
      }
    })();
  }, [resumeToken, hydrateFromMagicLink]);

  return null;
}

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
      sessionStorage.removeItem("smartnet:resumed");
    } catch (err) {
      console.error("Failed to send booking", err);
    }
  };

  return (
    <main className="smartnet-shell relative min-h-screen overflow-hidden bg-[#020617] text-slate-50">
      <ResumeLoader />

      <HeroSection />
      <TrustBar />
      <SmartNetGeneratorSection startOnSummary={hasResumeToken} />

      <WalkthroughWarmupSection />
      <section id="booking-calendar" className="border-t border-sky-500/10 bg-[#020617]">
        <BookingCalendarSection
          estimate={calendarEstimate}
          onConfirmBooking={handleConfirmBooking}
        />
      </section>

      <HowItWorksSection />
      <WhySmartNetSection />
      <ProjectTypesSection />
      <FieldResultsSection />
      <EquipmentSection />
      <TestimonialsSection />
      <PricingPreviewSection />
      <ServiceAreaSection />
      <FaqSection />

      <Footer />
    </main>
  );
}

export default function HomePageClient() {
  return (
    <SmartNetEstimateProvider>
      <HomeShell />
    </SmartNetEstimateProvider>
  );
}
