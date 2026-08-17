"use client";

import * as React from "react";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image } from "@react-pdf/renderer";
import type { SmartNetEstimate, BookingPayload } from "@/components/booking/booking-calendar";
import {
  getCoverageProfile,
  getDoorsAccess,
  getFloorCount,
  getPriceRange,
  getProjectType,
  getRackLocation,
  getScopeNotes,
  getSquareFootage,
  getTimeline,
  getWifiLayout,
  getWiringStyle,
  getCameraCount,
  getRecordingDays,
  getWifiApCount,
  getDoorCount,
  getCableFeet,
} from "@/lib/estimate-snapshot";

type QuotePDFProps = { estimate: SmartNetEstimate | null; booking: BookingPayload };

const styles = StyleSheet.create({
  page:{paddingTop:28,paddingBottom:26,paddingHorizontal:32,fontSize:9.4,fontFamily:"Helvetica",backgroundColor:"#020617",color:"#e5f0ff"},
  header:{borderBottomWidth:1,borderBottomColor:"#1e293b",borderBottomStyle:"solid",paddingBottom:10,marginBottom:10,flexDirection:"row",justifyContent:"space-between"},
  brandBlock:{flexDirection:"column",maxWidth:"65%"},logo:{width:100,height:"auto",marginBottom:5},brandTitle:{fontSize:16,fontWeight:700,color:"#38bdf8"},brandSubtitle:{marginTop:2,fontSize:8.5,color:"#94a3b8"},tagBlock:{alignItems:"flex-end"},tagLabel:{fontSize:8.5,color:"#64748b"},tagValue:{fontSize:9.5,fontWeight:600,color:"#bae6fd"},
  section:{marginTop:8,paddingTop:7,borderTopWidth:1,borderTopColor:"#0f172a",borderTopStyle:"solid"},sectionTitle:{fontSize:11,fontWeight:700,color:"#7dd3fc",marginBottom:4},row:{flexDirection:"row",marginBottom:2},label:{width:120,color:"#9ca3af"},value:{flex:1,color:"#e5e7eb"},
  pillRow:{flexDirection:"row",flexWrap:"wrap",marginTop:2},pill:{borderWidth:1,borderColor:"#1d4ed8",borderStyle:"solid",borderRadius:999,paddingHorizontal:6,paddingVertical:2,marginRight:4,marginBottom:4},pillText:{fontSize:8.2,color:"#e5f0ff"},
  notesBox:{marginTop:4,padding:6,borderRadius:4,borderWidth:1,borderColor:"#1f2937",borderStyle:"solid",backgroundColor:"#020617"},notesText:{fontSize:8.7,color:"#e5e7eb",lineHeight:1.3},
  footer:{marginTop:10,paddingTop:7,borderTopWidth:1,borderTopColor:"#1e293b",borderTopStyle:"solid",flexDirection:"row",justifyContent:"space-between",alignItems:"center"},footerText:{fontSize:7.8,color:"#6b7280",lineHeight:1.2},footerTiny:{marginTop:3,fontSize:7.2,color:"#64748b",lineHeight:1.2,maxWidth:360},
});

function formatCurrency(value?: number|null){return value==null?"-":`$${value.toLocaleString()}`;}
function formatDate(iso:string){const d=new Date(iso);return Number.isNaN(d.getTime())?iso:d.toLocaleString(undefined,{year:"numeric",month:"short",day:"2-digit",hour:"2-digit",minute:"2-digit"});}
function labelValue(value:string|null){return value?value.replace(/_/g," ").replace(/\b\w/g,l=>l.toUpperCase()):"Not specified";}
function DetailRow({label,value}:{label:string;value:string|null|undefined}){return <View style={styles.row}><Text style={styles.label}>{label}</Text><Text style={styles.value}>{value||"Not specified"}</Text></View>;}

function QuoteDocument({estimate,booking}:QuotePDFProps){
  const {dateISO,timeSlot,appointmentType,contact,jobLocation}=booking;
  const origin=typeof window!=="undefined"?window.location.origin:"http://localhost:3000";
  const qrUrl=`${origin}/quote/${booking.dateISO}`;
  const range=getPriceRange(estimate);
  const projectType=getProjectType(estimate);
  const sqft=getSquareFootage(estimate);
  const floors=getFloorCount(estimate);
  const cameras=getCameraCount(estimate);
  const recording=getRecordingDays(estimate);
  const aps=getWifiApCount(estimate);
  const doors=getDoorCount(estimate);
  const cableFeet=getCableFeet(estimate);
  const coverage=getCoverageProfile(estimate);
  const wifiLayout=getWifiLayout(estimate);
  const doorsAccess=getDoorsAccess(estimate);
  const wiring=getWiringStyle(estimate);
  const rack=getRackLocation(estimate);
  const timeline=getTimeline(estimate);
  const scopeNotes=getScopeNotes(estimate);
  const estimateRange=range.low!==null||range.high!==null?`${formatCurrency(range.low)} – ${formatCurrency(range.high)}`:"TBD after walkthrough";
  const focusList=estimate?.focus?.length?estimate.focus:[...(cameras!==null?["Cameras"]:[]),...(aps!==null?["Wi-Fi & APs"]:[]),...(doors!==null?["Access control"]:[])];
  const extrasList=estimate?.extras?.length?estimate.extras:[];

  return <Document><Page size="A4" style={styles.page}>
    <View style={styles.header}><View style={styles.brandBlock}><Image src="/logos/images/smartnet-installation-logo-2026.png" style={styles.logo}/><Text style={styles.brandTitle}>SmartNET Installation</Text><Text style={styles.brandSubtitle}>AI-powered low voltage planning · Cameras · Wi-Fi · Access Control</Text></View><View style={styles.tagBlock}><Text style={styles.tagLabel}>Estimate Snapshot</Text><Text style={styles.tagValue}>{formatDate(new Date().toISOString())}</Text></View></View>

    <View style={styles.section}><Text style={styles.sectionTitle}>Booking Details</Text><DetailRow label="Appointment date" value={formatDate(dateISO)}/><DetailRow label="Time slot" value={timeSlot}/><DetailRow label="Format" value={appointmentType}/><DetailRow label="Contact name" value={contact.fullName}/><DetailRow label="Contact email" value={contact.email}/><DetailRow label="Contact phone" value={contact.phone}/><DetailRow label="Location type" value={labelValue(jobLocation.type)}/>{jobLocation.note&&<DetailRow label="Location notes" value={jobLocation.note}/>}</View>

    <View style={styles.section}><Text style={styles.sectionTitle}>Project Overview</Text><DetailRow label="Project type" value={labelValue(projectType)}/><DetailRow label="Square footage" value={sqft!==null?`${sqft.toLocaleString()} ft²`:null}/><DetailRow label="Floors" value={floors!==null?String(floors):null}/><DetailRow label="Timeline" value={timeline}/><DetailRow label="AI rough range" value={estimateRange}/></View>

    <View style={styles.section}><Text style={styles.sectionTitle}>System Scope</Text><DetailRow label="Camera coverage" value={coverage}/><DetailRow label="Camera count" value={cameras!==null?String(cameras):null}/><DetailRow label="Recording" value={recording!==null?`${recording} days`:null}/><DetailRow label="Wi-Fi / network" value={wifiLayout}/><DetailRow label="Access control" value={doorsAccess}/><DetailRow label="Cabling" value={wiring}/><DetailRow label="Cable estimate" value={cableFeet!==null?`${cableFeet.toLocaleString()} ft`:null}/><DetailRow label="Rack location" value={rack}/></View>

    {(focusList.length>0||extrasList.length>0)&&<View style={styles.section}><Text style={styles.sectionTitle}>Focus & Extras</Text>{focusList.length>0&&<View style={styles.row}><Text style={styles.label}>Focus areas</Text><View style={styles.value}><View style={styles.pillRow}>{focusList.map((f,i)=><View key={i} style={styles.pill}><Text style={styles.pillText}>{f}</Text></View>)}</View></View></View>}{extrasList.length>0&&<View style={styles.row}><Text style={styles.label}>Extras</Text><View style={styles.value}><View style={styles.pillRow}>{extrasList.map((e,i)=><View key={i} style={styles.pill}><Text style={styles.pillText}>{e}</Text></View>)}</View></View></View>}</View>}

    {scopeNotes&&<View style={styles.section}><Text style={styles.sectionTitle}>SmartNET Project Brief</Text><View style={styles.notesBox}><Text style={styles.notesText}>{scopeNotes}</Text></View></View>}

    <View style={styles.footer}><View><Text style={styles.footerText}>This PDF is a preliminary planning snapshot based on your SmartNET AI intake.</Text><Text style={styles.footerText}>smartnetinstallation.com</Text><Text style={styles.footerTiny}>Estimates may change after the walkthrough based on verified site conditions, equipment requirements and final scope. Contact and project details are used to provide estimates, schedule walkthroughs and communicate regarding your request.</Text></View><Image src={`https://api.qrserver.com/v1/create-qr-code/?size=110x110&data=${encodeURIComponent(qrUrl)}`} style={{width:56,height:56}}/></View>
  </Page></Document>;
}

export default function QuotePDF({estimate,booking}:QuotePDFProps){const fileName=`SmartNET-Estimate-${new Date(booking.dateISO).toISOString().slice(0,10)}.pdf`;return <div className="flex flex-col gap-2 rounded-lg border border-emerald-500/40 bg-emerald-900/10 p-3 sm:flex-row sm:items-center sm:justify-between"><div className="text-[0.65rem] text-emerald-100/85">Download your SmartNET project brief with booking details, system scope and preliminary AI range.</div><PDFDownloadLink document={<QuoteDocument estimate={estimate} booking={booking}/>} fileName={fileName}>{({loading})=><button type="button" className="inline-flex items-center justify-center rounded-full border border-emerald-400/80 bg-emerald-500/10 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-emerald-100 shadow-[0_0_16px_rgba(16,185,129,0.6)] hover:bg-emerald-500/20">{loading?"Preparing PDF…":"Download project brief"}</button>}</PDFDownloadLink></div>;}
