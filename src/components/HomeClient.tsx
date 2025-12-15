"use client";

import { SmartNetGeneratorSection } from "@/components/smartNetWizard/SmartNetGeneratorSection";
// import other sections (Hero, TrustBar, Booking, etc.)

export default function HomeClient({
  startOnSummary,
}: {
  startOnSummary: boolean;
}) {
  return (
    <main className="bg-slate-950 text-slate-50">
      {/* <HeroSection /> */}
      {/* <TrustBar /> */}

      <SmartNetGeneratorSection startOnSummary={startOnSummary} />

      {/* <BookingCalendarSection /> */}
    </main>
  );
}
