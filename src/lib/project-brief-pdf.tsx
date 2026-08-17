import * as React from "react";
import { Document, Page, Text, View, StyleSheet, renderToBuffer } from "@react-pdf/renderer";
import {
  buildEstimateSummary,
  getCoverageProfile,
  getDoorsAccess,
  getPriceRange,
  getProjectType,
  getRackLocation,
  getScopeNotes,
  getSquareFootage,
  getTimeline,
  getWifiLayout,
  getWiringStyle,
  type SmartNetEstimateSnapshot,
} from "@/lib/estimate-snapshot";

const styles = StyleSheet.create({
  page: { padding: 34, fontFamily: "Helvetica", fontSize: 10, color: "#0f172a", backgroundColor: "#ffffff" },
  brand: { fontSize: 22, fontWeight: 700, color: "#0369a1" },
  subtitle: { marginTop: 3, color: "#64748b", fontSize: 9 },
  rule: { marginTop: 12, marginBottom: 12, borderBottomWidth: 1, borderBottomColor: "#cbd5e1" },
  section: { marginTop: 12 },
  heading: { fontSize: 12, fontWeight: 700, color: "#0369a1", marginBottom: 6 },
  row: { flexDirection: "row", marginBottom: 4 },
  label: { width: 125, color: "#64748b" },
  value: { flex: 1, color: "#0f172a" },
  notes: { marginTop: 5, padding: 9, backgroundColor: "#f8fafc", borderWidth: 1, borderColor: "#e2e8f0", lineHeight: 1.4 },
  footer: { marginTop: 18, paddingTop: 8, borderTopWidth: 1, borderTopColor: "#e2e8f0", fontSize: 8, color: "#64748b", lineHeight: 1.35 },
});

function text(value: string | null | undefined) { return value?.trim() || "Not specified"; }
function money(value: number | null) { return value === null ? "TBD" : `$${value.toLocaleString()}`; }
function Row({ label, value }: { label: string; value: string | null | undefined }) {
  return <View style={styles.row}><Text style={styles.label}>{label}</Text><Text style={styles.value}>{text(value)}</Text></View>;
}

function ProjectBrief({ estimate, fullName }: { estimate: SmartNetEstimateSnapshot | null; fullName?: string }) {
  const range = getPriceRange(estimate);
  const projectType = getProjectType(estimate);
  const sqft = getSquareFootage(estimate);
  const scope = getScopeNotes(estimate);
  return <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.brand}>SmartNET Installation</Text>
      <Text style={styles.subtitle}>AI-Powered Preliminary Project Brief</Text>
      <View style={styles.rule} />
      {fullName ? <Row label="Prepared for" value={fullName} /> : null}
      <Row label="Project type" value={projectType ? projectType.replace(/_/g, " ") : null} />
      <Row label="Square footage" value={sqft !== null ? `${sqft.toLocaleString()} ft²` : null} />
      <Row label="AI rough range" value={range.low !== null || range.high !== null ? `${money(range.low)} – ${money(range.high)}` : "TBD after walkthrough"} />

      <View style={styles.section}><Text style={styles.heading}>System Scope</Text>
        <Row label="Camera coverage" value={getCoverageProfile(estimate)} />
        <Row label="Wi-Fi / network" value={getWifiLayout(estimate)} />
        <Row label="Access control" value={getDoorsAccess(estimate)} />
        <Row label="Cabling" value={getWiringStyle(estimate)} />
        <Row label="Rack location" value={getRackLocation(estimate)} />
        <Row label="Timeline" value={getTimeline(estimate)} />
      </View>

      <View style={styles.section}><Text style={styles.heading}>Estimate Summary</Text><View style={styles.notes}><Text>{buildEstimateSummary(estimate)}</Text></View></View>
      {scope ? <View style={styles.section}><Text style={styles.heading}>Project Brief</Text><View style={styles.notes}><Text>{scope}</Text></View></View> : null}
      <Text style={styles.footer}>This is a preliminary planning document based on the SmartNET AI intake. Final pricing and system design are subject to site verification, equipment selection, field conditions and the completed walkthrough.</Text>
    </Page>
  </Document>;
}

export async function renderProjectBriefPdf(estimate: SmartNetEstimateSnapshot | null, fullName?: string): Promise<Buffer> {
  const buffer = await renderToBuffer(<ProjectBrief estimate={estimate} fullName={fullName} />);
  return Buffer.from(buffer);
}
