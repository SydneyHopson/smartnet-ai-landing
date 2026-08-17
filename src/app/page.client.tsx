// File: src/app/page.client.tsx
"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { HeroSection } from "@/components/hero/hero-section";
import { TrustBar } from "@/components/marketing/trust-bar";
import { BookingCalendarSection, SmartNetEstimate as CalendarEstimate, BookingPayload } from "@/components/booking/booking-calendar";
import { SmartNetGeneratorSection } from "@/components/smartNetWizard/SmartNetGeneratorSection";
import { SmartNetEstimateProvider, useSmartNetEstimate } from "@/components/smartNetWizard/SmartNetEstimateProvider";
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
import { SiteNavigation } from "@/components/layout/site-navigation";

type MagicLinkEstimate = CalendarEstimate;
function quantityValue(value: { value: number | null; confidence: string } | undefined): number | null { return typeof value?.value === "number" ? value.value : null; }
function ResumeLoader({ onRestore }: { onRestore: (estimate: MagicLinkEstimate) => void }) {
  const searchParams=useSearchParams(); const resumeToken=searchParams.get("resumeToken");
  const {hydrateFromMagicLink}=useSmartNetEstimate() as {hydrateFromMagicLink?:(estimate:MagicLinkEstimate)=>void};
  React.useEffect(()=>{if(!resumeToken||!hydrateFromMagicLink)return;(async()=>{try{const res=await fetch(`/api/magic-link/${resumeToken}`,{cache:"no-store"});const data=await res.json();if(data.ok&&!data.isExpired&&data.estimate){const restored=data.estimate as MagicLinkEstimate;hydrateFromMagicLink(restored);onRestore(restored);sessionStorage.setItem("smartnet:resumed","1");}}catch(err){console.error("[SmartNET] Error loading magic link:",err);}})();},[resumeToken,hydrateFromMagicLink,onRestore]); return null;
}
function HomeShell(){
  const {estimate,estimator}=useSmartNetEstimate(); const searchParams=useSearchParams(); const hasResumeToken=!!searchParams.get("resumeToken");
  const [restoredEstimate,setRestoredEstimate]=React.useState<CalendarEstimate|undefined>();
  const previousProposalId=React.useRef<string|null|undefined>(estimator.proposalId);
  const handleRestore=React.useCallback((value:CalendarEstimate)=>setRestoredEstimate(value),[]);

  React.useEffect(()=>{
    const previous=previousProposalId.current;
    const current=estimator.proposalId;
    previousProposalId.current=current;
    if(previous||!current)return;
    // Proposal generation is the handoff from AI discovery to a real walkthrough.
    // Give the success state a beat to render, then carry the customer directly
    // into scheduling so the journey never feels like it suddenly ended.
    const timeout=window.setTimeout(()=>{
      document.getElementById("booking-calendar")?.scrollIntoView({behavior:"smooth",block:"start"});
    },700);
    return()=>window.clearTimeout(timeout);
  },[estimator.proposalId]);

  const calendarEstimate:CalendarEstimate|undefined=React.useMemo(()=>{
    const project=estimator.project;if(!project)return restoredEstimate;
    const projectType=project.property?.projectType??estimate.projectType;
    const squareFootage=(project.property?.squareFootage?.value??estimate.squareFootage)||undefined;
    const pricingLow=project.pricing?.estimatedLow;const pricingHigh=project.pricing?.estimatedHigh;
    const interiorCameras=quantityValue(project.cameras?.interiorCount)??0;const exteriorCameras=quantityValue(project.cameras?.exteriorCount)??0;const specialtyCameras=quantityValue(project.cameras?.specialtyCount)??0;const cameraCount=interiorCameras+exteriorCameras+specialtyCameras;
    const apCount=quantityValue(project.wifi?.estimatedAccessPointCount);const doorCount=quantityValue(project.accessControl?.controlledDoorCount);const focusLabels:string[]=[];
    if(project.cameras?.requested??estimate.focus.cameras)focusLabels.push("Cameras");if(project.wifi?.requested??estimate.focus.wifi)focusLabels.push("Wi-Fi & APs");if(project.accessControl?.requested??estimate.focus.accessControl)focusLabels.push("Access control");
    return {projectType:projectType||undefined,squareFootage,focus:focusLabels,roughLow:typeof pricingLow==="number"&&pricingLow>0?pricingLow:estimate.roughLow||undefined,roughHigh:typeof pricingHigh==="number"&&pricingHigh>0?pricingHigh:estimate.roughHigh||undefined,notes:project.assessment?.scopeSummary||project.customerIntent?.summary||estimate.notes||undefined,customerIntent:project.customerIntent,property:project.property,cameras:project.cameras?{...project.cameras,cameraCount}:undefined,network:project.network,wifi:project.wifi?{...project.wifi,accessPointCount:apCount}:undefined,accessControl:project.accessControl?{...project.accessControl,doorCount}:undefined,cabling:project.cabling,installation:project.installation,equipment:project.equipment,pricing:project.pricing,assessment:project.assessment};
  },[estimate,estimator.project,restoredEstimate]);
  const handleConfirmBooking=React.useCallback(async(_payload:BookingPayload)=>{sessionStorage.removeItem("smartnet:resumed");},[]);const anchorClass="scroll-mt-20";
  return <main id="top" className="smartnet-shell relative min-h-screen overflow-hidden bg-[#020617] text-slate-50"><ResumeLoader onRestore={handleRestore}/><SiteNavigation/><HeroSection/><TrustBar/><div id="smartnet-generator" className={anchorClass}><SmartNetGeneratorSection startOnSummary={hasResumeToken}/></div><WalkthroughWarmupSection/><section id="booking-calendar" className="scroll-mt-20 border-t border-sky-500/10 bg-[#020617]"><BookingCalendarSection estimate={calendarEstimate} onConfirmBooking={handleConfirmBooking}/></section><div id="how-it-works" className={anchorClass}><HowItWorksSection/></div><WhySmartNetSection/><div id="project-types" className={anchorClass}><ProjectTypesSection/></div><div id="field-results" className={anchorClass}><FieldResultsSection/></div><EquipmentSection/><TestimonialsSection/><div id="pricing" className={anchorClass}><PricingPreviewSection/></div><ServiceAreaSection/><div id="faq" className={anchorClass}><FaqSection/></div><Footer/></main>;
}
export default function HomePageClient(){return <SmartNetEstimateProvider><HomeShell/></SmartNetEstimateProvider>;}
