"use client";

import * as React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer";

import type {
  SmartNetEstimate,
  BookingPayload,
} from "@/components/booking/booking-calendar";

type QuotePDFProps = {
  estimate: SmartNetEstimate | null;
  booking: BookingPayload;
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 32,
    paddingBottom: 28, // slightly tighter to help keep 1 page
    paddingHorizontal: 32,
    fontSize: 10,
    fontFamily: "Helvetica",
    backgroundColor: "#020617",
    color: "#e5f0ff",
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: "#1e293b",
    borderBottomStyle: "solid",
    paddingBottom: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  brandBlock: {
    flexDirection: "column",
    maxWidth: "65%",
  },
  logo: {
    width: 110,
    height: "auto",
    marginBottom: 6,
  },
  brandTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: "#38bdf8",
  },
  brandSubtitle: {
    marginTop: 2,
    fontSize: 9,
    color: "#94a3b8",
  },
  tagBlock: {
    alignItems: "flex-end",
  },
  tagLabel: {
    fontSize: 9,
    color: "#64748b",
  },
  tagValue: {
    fontSize: 10,
    fontWeight: 600,
    color: "#bae6fd",
  },
  section: {
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#0f172a",
    borderTopStyle: "solid",
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: "#7dd3fc",
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
    marginBottom: 2,
  },
  label: {
    width: 120,
    color: "#9ca3af",
  },
  value: {
    flex: 1,
    color: "#e5e7eb",
  },
  pillRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 2,
  },
  pill: {
    borderWidth: 1,
    borderColor: "#1d4ed8",
    borderStyle: "solid",
    borderRadius: 999,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 4,
    marginBottom: 4,
  },
  pillText: {
    fontSize: 8.5,
    color: "#e5f0ff",
  },
  notesBox: {
    marginTop: 4,
    padding: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#1f2937",
    borderStyle: "solid",
    backgroundColor: "#020617",
  },
  notesLabel: {
    fontSize: 9,
    color: "#9ca3af",
    marginBottom: 2,
  },
  notesText: {
    fontSize: 9,
    color: "#e5e7eb",
  },
  footer: {
    marginTop: 14, // slightly tighter
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#1e293b",
    borderTopStyle: "solid",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerText: {
    fontSize: 8.3,
    color: "#6b7280",
    lineHeight: 1.25,
  },
  footerTiny: {
    marginTop: 4,
    fontSize: 7.7,
    color: "#64748b",
    lineHeight: 1.25,
    maxWidth: 360, // helps prevent weird wrapping
  },
});

// ---------------- HELPERS ----------------

function formatCurrency(value?: number | null): string {
  if (value == null) return "-";
  return `$${value.toLocaleString()}`;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ---------------- DOCUMENT ----------------

function QuoteDocument({ estimate, booking }: QuotePDFProps) {
  const { dateISO, timeSlot, appointmentType, contact, jobLocation } = booking;

  const generatedAt = new Date().toISOString();

  // Dynamic domain for QR
  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : "http://localhost:3000";

  // NOTE: you might later want a real quote page id instead of dateISO
  const qrUrl = `${origin}/quote/${booking.dateISO}`;

  const estimateRange =
    estimate && (estimate.roughLow || estimate.roughHigh)
      ? `${formatCurrency(estimate.roughLow)} – ${formatCurrency(
          estimate.roughHigh
        )}`
      : "TBD after walkthrough";

  const focusList =
    estimate?.focus && estimate.focus.length > 0
      ? estimate.focus
      : ["Not specified"];

  const extrasList =
    estimate?.extras && estimate.extras.length > 0
      ? estimate.extras
      : ["None selected"];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.brandBlock}>
            <Image src="/logos/images/SmartNet3.png" style={styles.logo} />
            <Text style={styles.brandTitle}>SmartNET Installation</Text>
            <Text style={styles.brandSubtitle}>
              AI-powered low voltage planning · Cameras · Wi-Fi · Access Control
            </Text>
          </View>

          <View style={styles.tagBlock}>
            <Text style={styles.tagLabel}>Estimate Snapshot</Text>
            <Text style={styles.tagValue}>{formatDate(generatedAt)}</Text>
          </View>
        </View>

        {/* BOOKING DETAILS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Booking Details</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Appointment date</Text>
            <Text style={styles.value}>{formatDate(dateISO)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Time slot</Text>
            <Text style={styles.value}>{timeSlot}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Format</Text>
            <Text style={styles.value}>{appointmentType}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Contact email</Text>
            <Text style={styles.value}>{contact.email}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Contact phone</Text>
            <Text style={styles.value}>{contact.phone}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Location type</Text>
            <Text style={styles.value}>
              {jobLocation.type.charAt(0).toUpperCase() +
                jobLocation.type.slice(1)}
            </Text>
          </View>

          {jobLocation.note && (
            <View style={styles.row}>
              <Text style={styles.label}>Location notes</Text>
              <Text style={styles.value}>{jobLocation.note}</Text>
            </View>
          )}
        </View>

        {/* ESTIMATE OVERVIEW */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estimate Overview</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Project type</Text>
            <Text style={styles.value}>
              {estimate?.projectType ?? "Not specified"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Square footage</Text>
            <Text style={styles.value}>
              {estimate?.squareFootage
                ? `${estimate.squareFootage.toLocaleString()} ft²`
                : "Not specified"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Coverage profile</Text>
            <Text style={styles.value}>
              {estimate?.coverageProfile ?? "Not specified"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Wi-Fi layout</Text>
            <Text style={styles.value}>
              {estimate?.wifiLayout ?? "Not specified"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Doors / access</Text>
            <Text style={styles.value}>
              {estimate?.doorsAccess ?? "Not specified"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Wiring style</Text>
            <Text style={styles.value}>
              {estimate?.wiringStyle ?? "Not specified"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Rack location</Text>
            <Text style={styles.value}>
              {estimate?.rackLocation ?? "Not specified"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Timeline</Text>
            <Text style={styles.value}>
              {estimate?.timeline ?? "Not specified"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>AI rough range</Text>
            <Text style={styles.value}>{estimateRange}</Text>
          </View>
        </View>

        {/* FOCUS + EXTRAS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Focus & Extras</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Focus areas</Text>
            <View style={styles.value}>
              <View style={styles.pillRow}>
                {focusList.map((f, idx) => (
                  <View key={idx} style={styles.pill}>
                    <Text style={styles.pillText}>{f}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Extras</Text>
            <View style={styles.value}>
              <View style={styles.pillRow}>
                {extrasList.map((e, idx) => (
                  <View key={idx} style={styles.pill}>
                    <Text style={styles.pillText}>{e}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* NOTES */}
        {estimate?.notes && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Special Notes</Text>
            <View style={styles.notesBox}>
              <Text style={styles.notesLabel}>From your SmartNET intake</Text>
              <Text style={styles.notesText}>{estimate.notes}</Text>
            </View>
          </View>
        )}

        {/* FOOTER WITH QR (Disclaimer moved here to keep ONE PAGE) */}
        <View style={styles.footer}>
          <View>
            <Text style={styles.footerText}>
              This PDF is a planning snapshot based on your SmartNET AI walkthrough.
            </Text>
            <Text style={styles.footerText}>smartnetinstallation.com</Text>

            {/* ✅ Tight disclaimer + privacy (small + footer-friendly) */}
            <Text style={styles.footerTiny}>
              Estimates are preliminary and may change after the walkthrough based
              on site conditions and equipment requirements. We collect contact and
              project details only to provide estimates, schedule walkthroughs, and
              communicate regarding your request. We do not sell your data.
            </Text>
          </View>

          {/* AUTO-DOMAIN QR CODE */}
          <Image
            src={`https://api.qrserver.com/v1/create-qr-code/?size=110x110&data=${encodeURIComponent(
              qrUrl
            )}`}
            style={{ width: 60, height: 60 }}
          />
        </View>
      </Page>
    </Document>
  );
}

// --------------- DOWNLOAD BUTTON WRAPPER ----------------

export default function QuotePDF({ estimate, booking }: QuotePDFProps) {
  const fileName = `SmartNET-Estimate-${new Date(
    booking.dateISO
  ).toISOString().slice(0, 10)}.pdf`;

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-emerald-500/40 bg-emerald-900/10 p-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-[0.65rem] text-emerald-100/85">
        Download a PDF snapshot of this estimate and booking details. It includes
        your AI rough range, focus areas, and location notes.
      </div>

      <PDFDownloadLink
        document={<QuoteDocument estimate={estimate} booking={booking} />}
        fileName={fileName}
      >
        {({ loading }) => (
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-emerald-400/80 bg-emerald-500/10 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-emerald-100 shadow-[0_0_16px_rgba(16,185,129,0.6)] hover:bg-emerald-500/20"
          >
            {loading ? "Preparing PDF…" : "Download estimate PDF"}
          </button>
        )}
      </PDFDownloadLink>
    </div>
  );
}
