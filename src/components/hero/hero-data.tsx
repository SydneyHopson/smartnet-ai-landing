import type { ReactNode } from "react";

type HeroItem = { label: string; icon: ReactNode };
type SummaryItem = { value: string; label: string; icon: ReactNode };

export const services: HeroItem[] = [
  { label: "Security Cameras", icon: <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true"><path d="M4 7.5h11.5l3 2.5-3 2.5H4v-5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M8 12.5 6.5 18M16 12.5l1.5 5M4 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="12.5" cy="10" r="1.5" stroke="currentColor" strokeWidth="1.5"/></svg> },
  { label: "Managed Wi-Fi", icon: <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true"><path d="M4 8a12 12 0 0 1 16 0M7 11.5a7.5 7.5 0 0 1 10 0M10 15a3 3 0 0 1 4 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="18.5" r="1" fill="currentColor"/></svg> },
  { label: "Network Infrastructure", icon: <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true"><rect x="4" y="5" width="16" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="4" y="14" width="16" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/><path d="M7 7.5h.01M10 7.5h.01M7 16.5h.01M10 16.5h.01M16 7.5h1M16 16.5h1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg> },
  { label: "Access Control", icon: <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true"><rect x="6" y="3.5" width="12" height="17" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M10 12h4M14 12l-1.5-1.5M14 12l-1.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { label: "Structured Cabling", icon: <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true"><path d="M8 4v5M16 4v5M6 9h12v5a6 6 0 0 1-12 0V9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 20v2M9 4h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg> },
  { label: "Fiber Optics", icon: <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true"><circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5"/><path d="M12 2v5M12 17v5M2 12h5M17 12h5M4.9 4.9l3.5 3.5M15.6 15.6l3.5 3.5M19.1 4.9l-3.5 3.5M8.4 15.6l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg> },
];

export const designSummary: SummaryItem[] = [
  { value: "12,450", label: "SQ FT", icon: <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true"><path d="M4 21V8h6v13M14 21V3h6v18M2 21h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 11h.01M7 15h.01M17 7h.01M17 11h.01M17 15h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg> },
  { value: "24", label: "Cameras", icon: services[0].icon },
  { value: "18", label: "Wi-Fi APs", icon: services[1].icon },
  { value: "12", label: "Doors", icon: services[3].icon },
  { value: "2", label: "Network Racks", icon: services[2].icon },
];
