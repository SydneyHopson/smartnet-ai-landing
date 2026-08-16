"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import QRCode from "react-qr-code";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FullCalendar = dynamic(() => import("@fullcalendar/react"), {
  ssr: false,
});

const QuotePDF = dynamic(() => import("@/components/quote/QuotePDF"), {
  ssr: false,
});

/* =========================================================
   TYPES
========================================================= */

export type SmartNetEstimate = {
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

  /*
   * These allow the booking component to receive richer
   * information from the new AI estimator without breaking
   * the existing booking/PDF flow.
   */
  customerIntent?: unknown;
  property?: unknown;
  cameras?: unknown;
  network?: unknown;
  wifi?: unknown;
  accessControl?: unknown;
  cabling?: unknown;
  installation?: unknown;
  equipment?: unknown;
  pricing?: unknown;
  assessment?: unknown;
  metadata?: unknown;
};

export type BookingPayload = {
  dateISO: string;
  timeSlot: string;
  appointmentType: string;

  contact: {
    fullName: string;
    email: string;
    phone: string;
  };

  jobLocation: {
    type: "home" | "office" | "retail" | "industrial" | "multi";
    note: string | null;
  };

  estimate: SmartNetEstimate | null;
};

type BookingCalendarSectionProps = {
  estimate?: SmartNetEstimate;
  onConfirmBooking?: (payload: BookingPayload) => Promise<void> | void;
};

/* =========================================================
   DATE HELPERS
========================================================= */

function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function diffInDays(from: Date, to: Date): number {
  const utcFrom = Date.UTC(
    from.getFullYear(),
    from.getMonth(),
    from.getDate()
  );

  const utcTo = Date.UTC(
    to.getFullYear(),
    to.getMonth(),
    to.getDate()
  );

  const msPerDay = 1000 * 60 * 60 * 24;

  return Math.floor((utcTo - utcFrom) / msPerDay);
}

/* =========================================================
   SMARTNET WORK ROTATION
========================================================= */

const CYCLE_START = new Date("2025-12-04T00:00:00");
const CYCLE_LENGTH = 14;

const BOOKED_OFFSETS = new Set<number>([
  0, 1, 2, 6, 7, 8, 9,
]);

function isBookedDate(date: Date): boolean {
  const offset = diffInDays(CYCLE_START, date);

  if (offset < 0) return false;

  const mod =
    ((offset % CYCLE_LENGTH) + CYCLE_LENGTH) %
    CYCLE_LENGTH;

  return BOOKED_OFFSETS.has(mod);
}

/* =========================================================
   DATA HELPERS
========================================================= */

function isRecord(
  value: unknown
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function findValue(
  source: unknown,
  keys: string[]
): unknown {
  if (!isRecord(source)) return undefined;

  for (const key of keys) {
    const value = source[key];

    if (
      value !== undefined &&
      value !== null &&
      value !== ""
    ) {
      return value;
    }
  }

  return undefined;
}

function getNestedValue(
  source: unknown,
  section: string,
  keys: string[]
): unknown {
  if (!isRecord(source)) return undefined;

  return findValue(source[section], keys);
}

function extractQuantity(
  value: unknown
): number | null {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }

  if (typeof value === "string") {
    const parsed = Number(
      value.replace(/[^\d.-]/g, "")
    );

    return Number.isFinite(parsed) ? parsed : null;
  }

  if (isRecord(value)) {
    const nested = value.value;

    if (typeof nested === "number") {
      return Number.isFinite(nested)
        ? nested
        : null;
    }

    if (typeof nested === "string") {
      const parsed = Number(
        nested.replace(/[^\d.-]/g, "")
      );

      return Number.isFinite(parsed)
        ? parsed
        : null;
    }
  }

  return null;
}

function formatDisplayValue(
  value: unknown
): string | null {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return null;
  }

  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number") {
    return value.toLocaleString();
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (Array.isArray(value)) {
    const formatted = value
      .map((item) => formatDisplayValue(item))
      .filter(
        (item): item is string =>
          typeof item === "string" &&
          item.length > 0
      );

    return formatted.length > 0
      ? formatted.join(" · ")
      : null;
  }

  if (isRecord(value)) {
    if (
      "value" in value &&
      value.value !== null &&
      value.value !== undefined
    ) {
      const formatted =
        formatDisplayValue(value.value);

      const unit =
        typeof value.unit === "string"
          ? value.unit
          : "";

      if (formatted) {
        return unit
          ? `${formatted} ${unit}`
          : formatted;
      }
    }

    const preferred =
      findValue(value, [
        "label",
        "name",
        "type",
        "description",
        "summary",
      ]);

    if (preferred !== undefined) {
      return formatDisplayValue(preferred);
    }
  }

  return null;
}

function getEstimateProjectType(
  estimate?: SmartNetEstimate
): string | null {
  if (!estimate) return null;

  if (estimate.projectType) {
    return estimate.projectType;
  }

  const value =
    findValue(estimate.customerIntent, [
      "projectType",
      "type",
      "project",
      "propertyType",
    ]) ??
    findValue(estimate.property, [
      "propertyType",
      "type",
      "buildingType",
    ]);

  return formatDisplayValue(value);
}

function getEstimateSquareFootage(
  estimate?: SmartNetEstimate
): number | null {
  if (!estimate) return null;

  if (
    typeof estimate.squareFootage === "number"
  ) {
    return estimate.squareFootage;
  }

  const value = findValue(estimate.property, [
    "squareFootage",
    "sqFt",
    "size",
    "area",
  ]);

  return extractQuantity(value);
}

function getCameraCount(
  estimate?: SmartNetEstimate
): number | null {
  if (!estimate) return null;

  const value = findValue(estimate.cameras, [
    "quantity",
    "count",
    "cameraCount",
    "total",
  ]);

  return extractQuantity(value);
}

function getWifiCount(
  estimate?: SmartNetEstimate
): number | null {
  if (!estimate) return null;

  const value = findValue(estimate.wifi, [
    "quantity",
    "count",
    "accessPointCount",
    "apCount",
    "accessPoints",
  ]);

  return extractQuantity(value);
}

function getDoorCount(
  estimate?: SmartNetEstimate
): number | null {
  if (!estimate) return null;

  const value = findValue(
    estimate.accessControl,
    [
      "quantity",
      "count",
      "doorCount",
      "doors",
    ]
  );

  return extractQuantity(value);
}

function getNetworkSummary(
  estimate?: SmartNetEstimate
): string | null {
  if (!estimate) return null;

  return formatDisplayValue(
    findValue(estimate.network, [
      "summary",
      "description",
      "type",
      "requirements",
      "switches",
      "rackCount",
    ])
  );
}

function getCablingSummary(
  estimate?: SmartNetEstimate
): string | null {
  if (!estimate) return null;

  return formatDisplayValue(
    findValue(estimate.cabling, [
      "summary",
      "description",
      "type",
      "cableType",
      "requirements",
    ])
  );
}

function getTimeline(
  estimate?: SmartNetEstimate
): string | null {
  if (!estimate) return null;

  if (estimate.timeline) {
    return estimate.timeline;
  }

  return formatDisplayValue(
    findValue(estimate.installation, [
      "timeline",
      "desiredTimeline",
      "schedule",
      "targetDate",
    ])
  );
}

function getNotes(
  estimate?: SmartNetEstimate
): string | null {
  if (!estimate) return null;

  if (estimate.notes) {
    return estimate.notes;
  }

  return formatDisplayValue(
    findValue(estimate.customerIntent, [
      "description",
      "notes",
      "summary",
      "request",
    ]) ??
      findValue(estimate.assessment, [
        "summary",
        "notes",
        "recommendation",
      ])
  );
}

function getPriceRange(
  estimate?: SmartNetEstimate
): {
  low: number | null;
  high: number | null;
} {
  if (!estimate) {
    return {
      low: null,
      high: null,
    };
  }

  const legacyLow =
    extractQuantity(estimate.roughLow);

  const legacyHigh =
    extractQuantity(estimate.roughHigh);

  const pricingLow =
    extractQuantity(
      findValue(estimate.pricing, [
        "low",
        "roughLow",
        "estimateLow",
        "min",
        "minimum",
      ])
    );

  const pricingHigh =
    extractQuantity(
      findValue(estimate.pricing, [
        "high",
        "roughHigh",
        "estimateHigh",
        "max",
        "maximum",
      ])
    );

  return {
    low: legacyLow ?? pricingLow,
    high: legacyHigh ?? pricingHigh,
  };
}

/* =========================================================
   COMPONENT
========================================================= */

export function BookingCalendarSection({
  estimate,
  onConfirmBooking,
}: BookingCalendarSectionProps) {
  const [date, setDate] =
    React.useState<Date | null>(null);

  const [timeSlot, setTimeSlot] =
    React.useState<string | null>(null);

  const [appointmentType, setAppointmentType] =
    React.useState<
      "virtual" | "onsite" | "phone"
    >("onsite");

  const [showTypeHelp, setShowTypeHelp] =
    React.useState(false);

  const [showProfile, setShowProfile] =
    React.useState(true);

  const [fullName, setFullName] =
    React.useState("");

  const [email, setEmail] =
    React.useState("");

  const [phone, setPhone] =
    React.useState("");

  const [locationType, setLocationType] =
    React.useState<
      | "home"
      | "office"
      | "retail"
      | "industrial"
      | "multi"
    >("home");

  const [locationNote, setLocationNote] =
    React.useState("");

  const [isSubmitting, setIsSubmitting] =
    React.useState(false);

  const [bookingSummary, setBookingSummary] =
    React.useState<string | null>(null);

  const [toastMessage, setToastMessage] =
    React.useState<string | null>(null);

  const [lastBooking, setLastBooking] =
    React.useState<BookingPayload | null>(
      null
    );

  const [magicEmail, setMagicEmail] =
    React.useState("");

  const [magicPhone, setMagicPhone] =
    React.useState("");

  const [
    isSendingMagicLink,
    setIsSendingMagicLink,
  ] = React.useState(false);

  const [
    magicLinkMessage,
    setMagicLinkMessage,
  ] = React.useState<string | null>(null);

  const [magicLinkUrl, setMagicLinkUrl] =
    React.useState<string | null>(null);

  const timeSlots = [
    "9:00 AM",
    "11:00 AM",
    "1:00 PM",
    "3:00 PM",
    "5:00 PM",
  ];

  const today = startOfDay(new Date());

  const projectType =
    getEstimateProjectType(estimate);

  const squareFootage =
    getEstimateSquareFootage(estimate);

  const cameraCount =
    getCameraCount(estimate);

  const wifiCount =
    getWifiCount(estimate);

  const doorCount =
    getDoorCount(estimate);

  const networkSummary =
    getNetworkSummary(estimate);

  const cablingSummary =
    getCablingSummary(estimate);

  const timeline =
    getTimeline(estimate);

  const estimateNotes =
    getNotes(estimate);

  const priceRange =
    getPriceRange(estimate);

  const hasEstimate = Boolean(estimate);

  const selectedTypeLabel =
    appointmentType === "onsite"
      ? "On-site walkthrough"
      : appointmentType === "virtual"
      ? "Virtual consultation"
      : "Phone consultation";

  const confirmDisabled =
    !date ||
    !timeSlot ||
    !fullName ||
    !email ||
    !phone ||
    isSubmitting;

  /* =======================================================
     BOOKING
  ======================================================= */

  const handleConfirm = async () => {
    if (
      !date ||
      !timeSlot ||
      !fullName ||
      !email ||
      !phone
    ) {
      return;
    }

    const payload: BookingPayload = {
      dateISO: date.toISOString(),
      timeSlot,
      appointmentType:
        selectedTypeLabel,
      contact: {
        fullName,
        email,
        phone,
      },
      jobLocation: {
        type: locationType,
        note: locationNote || null,
      },
      estimate: estimate ?? null,
    };

    try {
      setIsSubmitting(true);

      const res = await fetch(
        "/api/booking",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        console.error(
          "[SmartNET booking failed]",
          await res.text()
        );

        setToastMessage(
          "Something glitched while saving your booking. Please try again."
        );

        return;
      }

      const data: unknown = await res
        .json()
        .catch(() => null);

      console.log(
        "[SmartNET booking success]",
        data
      );

      if (onConfirmBooking) {
        await onConfirmBooking(payload);
      }

      const locationLabelMap: Record<
        | "home"
        | "office"
        | "retail"
        | "industrial"
        | "multi",
        string
      > = {
        home: "Home / residence",
        office: "Office / suite",
        retail: "Retail / storefront",
        industrial:
          "Warehouse / industrial",
        multi:
          "Multi-location / campus",
      };

      const summaryLines = [
        `You're scheduled for ${date.toDateString()} at ${timeSlot}.`,
        `${selectedTypeLabel} for ${fullName}.`,
        `Confirmation will be sent to ${email}.`,
        `Callback: ${phone}.`,
        `Location: ${locationLabelMap[locationType]}.`,
        locationNote
          ? `Site notes: ${locationNote}.`
          : "",
        priceRange.low ||
        priceRange.high
          ? `AI preliminary range: $${priceRange.low?.toLocaleString() ?? "?"} – $${priceRange.high?.toLocaleString() ?? "?"}.`
          : "",
      ]
        .filter(Boolean)
        .join(" ");

      setBookingSummary(summaryLines);
      setToastMessage(summaryLines);
      setLastBooking(payload);

      try {
        const magicRes = await fetch(
          "/api/magic-link",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              contact: {
                email: email || null,
                phone: phone || null,
                jobLocation:
                  locationNote || null,
              },
              estimate: estimate ?? null,
            }),
          }
        );

        if (magicRes.ok) {
          const magicData: unknown =
            await magicRes
              .json()
              .catch(() => null);

          let url: string | null = null;

          if (
            magicData &&
            typeof magicData === "object"
          ) {
            const record =
              magicData as Record<
                string,
                unknown
              >;

            if (
              typeof record.quoteUrl ===
              "string"
            ) {
              url = record.quoteUrl;
            } else if (
              typeof record.magicUrl ===
              "string"
            ) {
              url = record.magicUrl;
            } else if (
              typeof record.url ===
              "string"
            ) {
              url = record.url;
            }
          }

          if (url) {
            setMagicLinkUrl(url);
          }
        }
      } catch (error) {
        console.error(
          "Magic link auto-generation failed:",
          error
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =======================================================
     MAGIC LINK
  ======================================================= */

  const handleSendMagicLink =
    async () => {
      if (!magicEmail && !magicPhone) {
        setMagicLinkMessage(
          "Add an email or phone so we know where to send your project link."
        );

        setMagicLinkUrl(null);

        return;
      }

      try {
        setIsSendingMagicLink(true);
        setMagicLinkMessage(null);
        setMagicLinkUrl(null);

        const res = await fetch(
          "/api/magic-link",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              contact: {
                email:
                  magicEmail || null,
                phone:
                  magicPhone || null,
                jobLocation:
                  locationNote || null,
              },
              estimate: estimate ?? null,
            }),
          }
        );

        if (!res.ok) {
          throw new Error(
            `Bad status: ${res.status}`
          );
        }

        const data: unknown = await res
          .json()
          .catch(() => null);

        let url: string | null = null;

        if (
          data &&
          typeof data === "object"
        ) {
          const record =
            data as Record<
              string,
              unknown
            >;

          if (
            typeof record.quoteUrl ===
            "string"
          ) {
            url = record.quoteUrl;
          } else if (
            typeof record.magicUrl ===
            "string"
          ) {
            url = record.magicUrl;
          } else if (
            typeof record.url ===
            "string"
          ) {
            url = record.url;
          }
        }

        if (url) {
          setMagicLinkUrl(url);

          setMagicLinkMessage(
            "Your SmartNET project link is ready. Save it or scan the QR code to return to your project."
          );
        } else {
          setMagicLinkMessage(
            "Your SmartNET project link has been created."
          );
        }
      } catch (error) {
        console.error(
          "Failed to send magic link",
          error
        );

        setMagicLinkUrl(null);

        setMagicLinkMessage(
          "Something glitched while creating your project link. Please try again."
        );
      } finally {
        setIsSendingMagicLink(false);
      }
    };

  return (
    <section
      id="booking-calendar"
      className="relative scroll-mt-28 overflow-hidden bg-[#020617] py-24"
    >
      {/* ===================================================
          BACKGROUND
      =================================================== */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,.16),transparent_38%)]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_55%,rgba(37,99,235,.13),transparent_32%)]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_60%,rgba(14,165,233,.12),transparent_32%)]" />

        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(56,189,248,.45)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,.45)_1px,transparent_1px)] [background-size:52px_52px]" />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-10">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-3 border-y border-sky-400/30 bg-sky-950/20 px-5 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-300" />
            </span>

            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-300">
              SmartNET Project Scheduling
            </span>
          </div>

          <h2 className="mt-6 text-4xl font-black uppercase tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl">
            Turn Your Plan Into
            <span className="block bg-gradient-to-r from-sky-300 via-blue-500 to-blue-700 bg-clip-text text-transparent">
              A Real Installation.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Choose a walkthrough date and
            SmartNET will carry your project
            details into the appointment so
            our team arrives prepared.
          </p>
        </div>

        {/* =================================================
            AI ESTIMATE STATUS
        ================================================= */}

        <div className="mx-auto mt-12 max-w-6xl">
          <div
            className={`relative overflow-hidden rounded-2xl border p-5 sm:p-6 ${
              hasEstimate
                ? "border-sky-400/35 bg-sky-950/15 shadow-[0_0_40px_rgba(14,165,233,.12)]"
                : "border-slate-700/60 bg-slate-950/45"
            }`}
          >
            <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent,rgba(56,189,248,.04),transparent)]" />

            <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-4">
                <div
                  className={`mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${
                    hasEstimate
                      ? "border-sky-400/40 bg-sky-400/10 text-sky-300"
                      : "border-slate-700 bg-slate-900 text-slate-400"
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-6 w-6"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 4h14v16H5V4Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M8 8h8M8 12h8M8 16h5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">
                      AI Project Profile
                    </p>

                    <span
                      className={`rounded-full border px-3 py-1 text-[9px] font-bold uppercase tracking-[0.15em] ${
                        hasEstimate
                          ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                          : "border-slate-600 bg-slate-800/60 text-slate-400"
                      }`}
                    >
                      {hasEstimate
                        ? "Estimate Attached"
                        : "Direct Booking"}
                    </span>
                  </div>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                    {hasEstimate
                      ? "SmartNET AI project information is attached to this walkthrough and will be included with the booking."
                      : "No AI estimate is attached. That's okay — schedule directly and we'll build your project profile during the walkthrough."}
                  </p>
                </div>
              </div>

              {priceRange.low ||
              priceRange.high ? (
                <div className="shrink-0 lg:text-right">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Preliminary Range
                  </p>

                  <p className="mt-1 text-xl font-bold text-emerald-300">
                    $
                    {priceRange.low?.toLocaleString() ??
                      "?"}{" "}
                    – $
                    {priceRange.high?.toLocaleString() ??
                      "?"}
                  </p>
                </div>
              ) : null}
            </div>

            {hasEstimate && (
              <div className="relative mt-5 border-t border-sky-500/15 pt-5">
                <button
                  type="button"
                  onClick={() =>
                    setShowProfile(
                      (previous) => !previous
                    )
                  }
                  className="flex w-full items-center justify-between text-left"
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
                    Project Intelligence
                  </span>

                  <span className="text-sm text-sky-300">
                    {showProfile ? "−" : "+"}
                  </span>
                </button>

                {showProfile && (
                  <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <ProjectDataCard
                      label="Project Type"
                      value={
                        projectType ??
                        "AI evaluating"
                      }
                    />

                    <ProjectDataCard
                      label="Property Size"
                      value={
                        squareFootage
                          ? `${squareFootage.toLocaleString()} SQ FT`
                          : "Not specified"
                      }
                    />

                    <ProjectDataCard
                      label="Cameras"
                      value={
                        cameraCount !== null
                          ? `${cameraCount}`
                          : estimate.focus?.includes(
                              "Cameras"
                            )
                          ? "Included"
                          : "Not specified"
                      }
                    />

                    <ProjectDataCard
                      label="Wi-Fi APs"
                      value={
                        wifiCount !== null
                          ? `${wifiCount}`
                          : estimate.focus?.some(
                              (item) =>
                                item
                                  .toLowerCase()
                                  .includes("wi-fi")
                            )
                          ? "Included"
                          : "Not specified"
                      }
                    />

                    <ProjectDataCard
                      label="Access Doors"
                      value={
                        doorCount !== null
                          ? `${doorCount}`
                          : estimate.doorsAccess ??
                            "Not specified"
                      }
                    />

                    <ProjectDataCard
                      label="Network"
                      value={
                        networkSummary ??
                        "Not specified"
                      }
                    />

                    <ProjectDataCard
                      label="Cabling"
                      value={
                        cablingSummary ??
                        estimate.wiringStyle ??
                        "Not specified"
                      }
                    />

                    <ProjectDataCard
                      label="Timeline"
                      value={
                        timeline ??
                        "Not specified"
                      }
                    />

                    {estimateNotes && (
                      <div className="sm:col-span-2 lg:col-span-4">
                        <div className="rounded-xl border border-sky-500/15 bg-[#020617]/70 p-4">
                          <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-slate-500">
                            AI Project Notes
                          </p>

                          <p className="mt-2 text-sm leading-6 text-slate-300">
                            {estimateNotes}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* =================================================
            CALENDAR
        ================================================= */}

        <div className="mx-auto mt-8 grid max-w-6xl gap-6 xl:grid-cols-[1.15fr_.85fr]">
          <Card className="overflow-hidden rounded-2xl border border-sky-500/20 bg-[#050b1b]/90 shadow-[0_0_55px_rgba(2,6,23,.9)] backdrop-blur-xl">
            <CardHeader className="border-b border-sky-500/10 px-6 py-5">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-sky-400/30 bg-sky-400/10 text-sky-300">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-6 w-6"
                    aria-hidden="true"
                  >
                    <rect
                      x="3.5"
                      y="5"
                      width="17"
                      height="15"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M8 3v4M16 3v4M3.5 9h17"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div>
                  <CardTitle className="text-base font-semibold text-white">
                    Select Your Walkthrough Date
                  </CardTitle>

                  <p className="mt-1 text-xs text-slate-400">
                    Available dates are ready
                    for scheduling.
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-4 sm:p-6">
              <div className="overflow-hidden rounded-xl border border-sky-500/15 bg-[#020617] p-2 sm:p-3">
                <FullCalendar
                  plugins={[
                    dayGridPlugin,
                    interactionPlugin,
                  ]}
                  initialView="dayGridMonth"
                  height="auto"
                  headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "",
                  }}
                  titleFormat={{
                    month: "long",
                    year: "numeric",
                  }}
                  dateClick={(info) => {
                    const clicked =
                      startOfDay(info.date);

                    if (clicked < today) {
                      return;
                    }

                    if (
                      isBookedDate(clicked)
                    ) {
                      return;
                    }

                    setDate(clicked);
                    setTimeSlot(null);
                  }}
                  selectable
                  fixedWeekCount={false}
                  aspectRatio={1.25}
                  dayHeaderClassNames={() =>
                    "text-[0.65rem] font-semibold text-slate-400 uppercase tracking-wide"
                  }
                  dayCellClassNames={(
                    arg
                  ) => {
                    const cellDate =
                      startOfDay(arg.date);

                    const classes = [
                      "transition-colors",
                      "relative",
                      "group",
                    ];

                    const booked =
                      isBookedDate(
                        cellDate
                      );

                    const isToday =
                      sameDay(
                        cellDate,
                        today
                      );

                    const isSelected =
                      !!date &&
                      sameDay(
                        cellDate,
                        date
                      );

                    const isPast =
                      cellDate < today;

                    if (booked) {
                      classes.push(
                        "fc-day-booked"
                      );
                    } else {
                      classes.push(
                        "fc-day-available"
                      );
                    }

                    if (isToday) {
                      classes.push(
                        "fc-day-today-custom"
                      );
                    }

                    if (isSelected) {
                      classes.push(
                        "fc-day-selected-custom"
                      );
                    }

                    if (isPast) {
                      classes.push(
                        "fc-day-past-custom"
                      );
                    }

                    return classes;
                  }}
                />
              </div>

              <div className="mt-5 flex flex-wrap gap-5 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,.8)]" />
                  Available
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                  Selected
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                  Unavailable
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ===============================================
              APPOINTMENT PANEL
          =============================================== */}

          <Card className="rounded-2xl border border-sky-400/30 bg-[#050b1b]/90 shadow-[0_0_55px_rgba(14,165,233,.12)] backdrop-blur-xl">
            <CardHeader className="border-b border-sky-500/10 px-6 py-5">
              <CardTitle className="text-base font-semibold text-white">
                Appointment Details
              </CardTitle>

              <p className="text-xs leading-5 text-slate-400">
                Choose how you'd like to meet
                and select an available time.
              </p>
            </CardHeader>

            <CardContent className="space-y-7 p-6">
              {/* Type */}

              <div>
                <SectionLabel>
                  Appointment Type
                </SectionLabel>

                <div className="mt-3 grid gap-2">
                  <AppointmentButton
                    active={
                      appointmentType ===
                      "onsite"
                    }
                    title="On-site walkthrough"
                    description="Best for installations, wiring and equipment placement."
                    onClick={() =>
                      setAppointmentType(
                        "onsite"
                      )
                    }
                  />

                  <AppointmentButton
                    active={
                      appointmentType ===
                      "virtual"
                    }
                    title="Virtual consultation"
                    description="Review the project remotely before an on-site visit."
                    onClick={() =>
                      setAppointmentType(
                        "virtual"
                      )
                    }
                  />

                  <AppointmentButton
                    active={
                      appointmentType ===
                      "phone"
                    }
                    title="Phone consultation"
                    description="Quick project discussion with a SmartNET specialist."
                    onClick={() =>
                      setAppointmentType(
                        "phone"
                      )
                    }
                  />
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowTypeHelp(
                      (previous) => !previous
                    )
                  }
                  className="mt-3 text-[11px] font-medium text-sky-300 transition hover:text-sky-200"
                >
                  {showTypeHelp
                    ? "Hide appointment guide"
                    : "Which appointment should I choose?"}
                </button>

                {showTypeHelp && (
                  <div className="mt-3 rounded-xl border border-sky-500/15 bg-[#020617]/80 p-4 text-xs leading-6 text-slate-400">
                    <strong className="text-sky-300">
                      On-site
                    </strong>{" "}
                    is best when we need to
                    inspect cable paths,
                    mounting locations,
                    network closets or access
                    points.{" "}
                    <strong className="text-sky-300">
                      Virtual
                    </strong>{" "}
                    works well for an initial
                    video walkthrough.{" "}
                    <strong className="text-sky-300">
                      Phone
                    </strong>{" "}
                    is ideal for a quick
                    project consultation.
                  </div>
                )}
              </div>

              {/* Selected Date */}

              <div>
                <SectionLabel>
                  Selected Date
                </SectionLabel>

                <div className="mt-3 rounded-xl border border-sky-500/15 bg-[#020617] px-4 py-4">
                  <p
                    className={`text-sm font-semibold ${
                      date
                        ? "text-white"
                        : "text-slate-500"
                    }`}
                  >
                    {date
                      ? date.toLocaleDateString(
                          "en-US",
                          {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }
                        )
                      : "Select a date from the calendar"}
                  </p>
                </div>
              </div>

              {/* Times */}

              <div>
                <SectionLabel>
                  Available Times
                </SectionLabel>

                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-2">
                  {timeSlots.map(
                    (slot) => {
                      const selected =
                        timeSlot === slot;

                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={!date}
                          onClick={() =>
                            setTimeSlot(
                              slot
                            )
                          }
                          className={`rounded-lg border px-3 py-3 text-xs font-semibold transition ${
                            selected
                              ? "border-sky-300 bg-gradient-to-r from-blue-700 to-sky-500 text-white shadow-[0_0_18px_rgba(37,99,235,.45)]"
                              : "border-slate-700 bg-[#020617] text-slate-300 hover:border-sky-500/60 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* =================================================
            CUSTOMER INFORMATION
        ================================================= */}

        <div className="mx-auto mt-6 max-w-6xl">
          <Card className="rounded-2xl border border-sky-500/20 bg-[#050b1b]/90 shadow-[0_0_55px_rgba(2,6,23,.75)] backdrop-blur-xl">
            <CardHeader className="border-b border-sky-500/10 px-6 py-5">
              <CardTitle className="text-base font-semibold text-white">
                Contact & Site Information
              </CardTitle>

              <p className="text-xs leading-5 text-slate-400">
                We'll use this information to
                confirm the walkthrough and
                connect it to your SmartNET
                project.
              </p>
            </CardHeader>

            <CardContent className="p-6">
              <div className="grid gap-8 lg:grid-cols-2">
                {/* Contact */}

                <div>
                  <SectionLabel>
                    Contact Details
                  </SectionLabel>

                  <div className="mt-4 space-y-4">
                    <Field
                      label="Full Name"
                      type="text"
                      value={fullName}
                      onChange={setFullName}
                      placeholder="First and last name"
                    />

                    <Field
                      label="Email"
                      type="email"
                      value={email}
                      onChange={setEmail}
                      placeholder="you@example.com"
                    />

                    <Field
                      label="Phone"
                      type="tel"
                      value={phone}
                      onChange={(value) => {
                        const digits =
                          value
                            .replace(
                              /\D/g,
                              ""
                            )
                            .slice(0, 15);

                        setPhone(digits);
                      }}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                {/* Location */}

                <div>
                  <SectionLabel>
                    Installation Location
                  </SectionLabel>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {[
                      {
                        id: "home",
                        label: "Home",
                      },
                      {
                        id: "office",
                        label: "Office",
                      },
                      {
                        id: "retail",
                        label: "Retail",
                      },
                      {
                        id: "industrial",
                        label:
                          "Warehouse / Industrial",
                      },
                      {
                        id: "multi",
                        label:
                          "Multi-location",
                      },
                    ].map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() =>
                          setLocationType(
                            option.id as
                              | "home"
                              | "office"
                              | "retail"
                              | "industrial"
                              | "multi"
                          )
                        }
                        className={`rounded-full border px-4 py-2 text-[11px] font-medium transition ${
                          locationType ===
                          option.id
                            ? "border-sky-300 bg-sky-400/10 text-sky-200 shadow-[0_0_14px_rgba(56,189,248,.18)]"
                            : "border-slate-700 bg-[#020617] text-slate-400 hover:border-sky-500/50 hover:text-slate-200"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>

                  <div className="mt-5">
                    <label className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-500">
                      Site Details
                    </label>

                    <textarea
                      value={locationNote}
                      onChange={(event) =>
                        setLocationNote(
                          event.target.value
                        )
                      }
                      placeholder="Address, suite, gate code, parking instructions, building notes, etc."
                      rows={5}
                      className="mt-2 w-full resize-none rounded-xl border border-slate-700 bg-[#020617] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-sky-400/70 focus:shadow-[0_0_18px_rgba(56,189,248,.08)]"
                    />
                  </div>
                </div>
              </div>

              {/* Confirmation */}

              <div className="mt-8 border-t border-sky-500/10 pt-7">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {date &&
                      timeSlot
                        ? `${selectedTypeLabel} · ${date.toLocaleDateString(
                            "en-US",
                            {
                              month:
                                "short",
                              day: "numeric",
                            }
                          )} · ${timeSlot}`
                        : "Complete your appointment details"}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {hasEstimate
                        ? "Your SmartNET AI project profile will be attached automatically."
                        : "You can book without completing an AI estimate."}
                    </p>
                  </div>

                  <Button
                    type="button"
                    disabled={
                      confirmDisabled
                    }
                    onClick={
                      handleConfirm
                    }
                    className="h-14 min-w-[260px] rounded-md border border-sky-300 bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 px-8 text-xs font-bold uppercase tracking-[0.1em] text-white shadow-[0_0_28px_rgba(37,99,235,.4)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {isSubmitting
                      ? "Confirming..."
                      : "Confirm Walkthrough"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* =================================================
            SUCCESS
        ================================================= */}

        {bookingSummary && (
          <div className="mx-auto mt-6 max-w-6xl">
            <div className="rounded-2xl border border-emerald-400/35 bg-emerald-950/20 p-6 shadow-[0_0_35px_rgba(16,185,129,.12)]">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-400/10 text-emerald-300">
                  ✓
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                    Walkthrough Confirmed
                  </p>

                  <p className="mt-2 text-sm leading-6 text-emerald-50">
                    {bookingSummary}
                  </p>

                  <p className="mt-3 text-xs leading-5 text-emerald-100/60">
                    Preliminary estimates may
                    change after site
                    verification, final scope,
                    equipment selection and
                    installation conditions.
                  </p>

                  {lastBooking && (
                    <div className="mt-5 border-t border-emerald-500/20 pt-5">
                      <QuotePDF
                        estimate={
                          estimate ?? null
                        }
                        booking={
                          lastBooking
                        }
                      />
                    </div>
                  )}

                  {magicLinkUrl && (
                    <div className="mt-5 flex flex-col gap-4 rounded-xl border border-sky-500/20 bg-[#020617]/80 p-4 sm:flex-row sm:items-center">
                      <div className="shrink-0 rounded-lg bg-white p-2">
                        <QRCode
                          value={
                            magicLinkUrl
                          }
                          size={82}
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-sky-300">
                          SmartNET Project
                          Link
                        </p>

                        <p className="mt-2 break-all text-xs text-slate-400">
                          {magicLinkUrl}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =================================================
            CONTINUE LATER
        ================================================= */}

        {hasEstimate && !bookingSummary && (
          <div className="mx-auto mt-6 max-w-6xl">
            <div className="rounded-2xl border border-slate-800 bg-[#050b1b]/70 p-5">
              <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-300">
                    Save Your Project
                  </p>

                  <p className="mt-2 max-w-2xl text-xs leading-5 text-slate-400">
                    Not ready to schedule?
                    Create a SmartNET project
                    link and return to your
                    estimate later.
                  </p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <Field
                      label="Email"
                      type="email"
                      value={magicEmail}
                      onChange={(value) => {
                        setMagicEmail(value);
                        setMagicLinkUrl(null);
                      }}
                      placeholder="you@example.com"
                    />

                    <Field
                      label="Mobile"
                      type="tel"
                      value={magicPhone}
                      onChange={(value) => {
                        setMagicPhone(
                          value
                            .replace(
                              /\D/g,
                              ""
                            )
                            .slice(0, 15)
                        );

                        setMagicLinkUrl(null);
                      }}
                      placeholder="Optional mobile number"
                    />
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={
                    handleSendMagicLink
                  }
                  disabled={
                    isSendingMagicLink
                  }
                  className="h-12 rounded-md border border-sky-500/30 bg-sky-500/10 px-6 text-xs font-semibold uppercase tracking-[0.08em] text-sky-200 hover:bg-sky-500/20"
                >
                  {isSendingMagicLink
                    ? "Creating..."
                    : "Save Project"}
                </Button>
              </div>

              {magicLinkMessage && (
                <p className="mt-4 text-xs text-sky-200">
                  {magicLinkMessage}
                </p>
              )}

              {magicLinkUrl && (
                <div className="mt-4 flex flex-col gap-4 rounded-xl border border-sky-500/20 bg-[#020617] p-4 sm:flex-row sm:items-center">
                  <div className="rounded-md bg-white p-2">
                    <QRCode
                      value={magicLinkUrl}
                      size={72}
                    />
                  </div>

                  <p className="break-all text-xs text-slate-400">
                    {magicLinkUrl}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ===================================================
          TOAST
      =================================================== */}

      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm rounded-xl border border-emerald-400/30 bg-[#050b1b]/95 px-5 py-4 shadow-[0_0_35px_rgba(16,185,129,.18)] backdrop-blur-xl">
          <div className="flex items-start gap-3">
            <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,.8)]" />

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-300">
                Booking Confirmed
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-300">
                {toastMessage}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setToastMessage(null)
              }
              className="ml-auto text-lg text-slate-500 hover:text-white"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* ===================================================
          FULLCALENDAR STYLES
      =================================================== */}

      <style jsx global>{`
        .fc {
          --fc-border-color: rgba(
            56,
            189,
            248,
            0.12
          );
          --fc-page-bg-color: transparent;
          --fc-neutral-bg-color: transparent;
          --fc-list-event-hover-bg-color: rgba(
            15,
            23,
            42,
            0.9
          );
          --fc-today-bg-color: transparent;
          font-size: 0.82rem;
        }

        .fc .fc-toolbar.fc-header-toolbar {
          margin-bottom: 1.25rem;
          gap: 0.75rem;
        }

        .fc .fc-toolbar-title {
          font-size: 1rem;
          font-weight: 700;
          color: #f8fafc;
          letter-spacing: -0.02em;
        }

        .fc .fc-button-primary {
          background: #071022;
          border: 1px solid
            rgba(56, 189, 248, 0.2);
          color: #bae6fd;
          padding: 0.35rem 0.65rem;
          font-size: 0.7rem;
          border-radius: 0.5rem;
          box-shadow: none;
          text-transform: none;
        }

        .fc .fc-button-primary:hover {
          background: rgba(
            14,
            165,
            233,
            0.12
          );
          border-color: rgba(
            56,
            189,
            248,
            0.55
          );
        }

        .fc
          .fc-button-primary:not(
            :disabled
          ).fc-button-active,
        .fc
          .fc-button-primary:not(
            :disabled
          ):active {
          background: rgba(
            37,
            99,
            235,
            0.3
          );
          border-color: rgba(
            56,
            189,
            248,
            0.6
          );
        }

        .fc .fc-button-primary:disabled {
          background: #071022;
          border-color: rgba(
            148,
            163,
            184,
            0.12
          );
          opacity: 0.4;
        }

        .fc-theme-standard td,
        .fc-theme-standard th {
          border-color: rgba(
            56,
            189,
            248,
            0.1
          );
        }

        .fc .fc-col-header-cell {
          background: rgba(
            15,
            23,
            42,
            0.35
          );
        }

        .fc .fc-col-header-cell-cushion {
          padding: 0.6rem 0;
          color: #64748b;
          font-size: 0.62rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }

        .fc .fc-daygrid-day {
          background: rgba(
            2,
            6,
            23,
            0.55
          );
          transition:
            background 150ms ease,
            box-shadow 150ms ease;
        }

        .fc
          .fc-daygrid-day-frame {
          min-height: 72px;
          padding: 0.25rem;
        }

        .fc-day-available {
          cursor: pointer;
        }

        .fc-day-available:hover {
          background: rgba(
            14,
            165,
            233,
            0.07
          );
          box-shadow: inset 0 0 0 1px
            rgba(56, 189, 248, 0.28);
        }

        .fc-day-booked {
          cursor: not-allowed;
          background: rgba(
            15,
            23,
            42,
            0.7
          ) !important;
        }

        .fc-day-booked
          .fc-daygrid-day-number {
          color: #475569 !important;
        }

        .fc-day-past-custom {
          pointer-events: none;
          opacity: 0.25;
        }

        .fc-day-today-custom
          .fc-daygrid-day-number {
          color: #7dd3fc !important;
          font-weight: 800;
        }

        .fc-day-today-custom
          .fc-daygrid-day-number::after {
          content: "";
          position: absolute;
          inset: -0.2rem;
          border-radius: 999px;
          border: 1px solid
            rgba(56, 189, 248, 0.65);
          box-shadow: 0 0 10px
            rgba(56, 189, 248, 0.18);
        }

        .fc-day-selected-custom {
          background: rgba(
            37,
            99,
            235,
            0.17
          ) !important;
          box-shadow: inset 0 0 0 1px
            rgba(56, 189, 248, 0.75);
        }

        .fc-day-selected-custom
          .fc-daygrid-day-number {
          color: #e0f2fe !important;
          font-weight: 800;
        }

        .fc .fc-daygrid-day-number {
          position: relative;
          padding: 0.4rem;
          font-size: 0.72rem;
          color: #94a3b8;
        }

        @media (max-width: 640px) {
          .fc
            .fc-toolbar.fc-header-toolbar {
            align-items: flex-start;
            flex-direction: column;
          }

          .fc
            .fc-daygrid-day-frame {
            min-height: 52px;
          }

          .fc
            .fc-daygrid-day-number {
            font-size: 0.65rem;
          }
        }
      `}</style>
    </section>
  );
}

/* =========================================================
   SMALL UI COMPONENTS
========================================================= */

function SectionLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-300">
      {children}
    </p>
  );
}

function ProjectDataCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-sky-500/15 bg-[#020617]/75 px-4 py-3">
      <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>

      <p className="mt-1.5 truncate text-xs font-semibold text-slate-200">
        {value}
      </p>
    </div>
  );
}

function AppointmentButton({
  active,
  title,
  description,
  onClick,
}: {
  active: boolean;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-xl border p-4 text-left transition ${
        active
          ? "border-sky-400/60 bg-sky-400/10 shadow-[0_0_20px_rgba(56,189,248,.1)]"
          : "border-slate-800 bg-[#020617]/70 hover:border-sky-500/30"
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
            active
              ? "border-sky-300"
              : "border-slate-600"
          }`}
        >
          {active && (
            <span className="h-2 w-2 rounded-full bg-sky-300 shadow-[0_0_8px_rgba(56,189,248,.8)]" />
          )}
        </span>

        <div>
          <p
            className={`text-xs font-semibold ${
              active
                ? "text-white"
                : "text-slate-300"
            }`}
          >
            {title}
          </p>

          <p className="mt-1 text-[10px] leading-4 text-slate-500">
            {description}
          </p>
        </div>
      </div>
    </button>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  type: React.HTMLInputTypeAttribute;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-slate-700 bg-[#020617] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-sky-400/70 focus:shadow-[0_0_18px_rgba(56,189,248,.08)]"
      />
    </div>
  );
}