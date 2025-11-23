import { HeroSection } from "@/components/hero/hero-section";
import { BookingCalendarSection } from "@/components/booking/booking-calendar";
import { SmartNetGeneratorSection } from "@/components/smartNetWizard/SmartNetGeneratorSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-50">
      {/* Hero: marketing + lil bro */}
      <HeroSection />

      {/* SmartNET Generator (Steps 1–4) */}
      <SmartNetGeneratorSection />

      {/* Booking calendar (final step) */}
      <BookingCalendarSection />
    </main>
  );
}
