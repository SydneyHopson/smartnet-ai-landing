import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { sanityWriteClient } from "@/lib/sanityWriteClient";
import { FollowupWalkthroughScheduler } from "@/components/owner/FollowupWalkthroughScheduler";

type SmartNetEstimate = {
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

type WalkthroughBookingDoc = {
  _id: string;
  status?: string;
  appointmentType: string;
  dateISO: string;
  timeSlot: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  locationType?: string | null;
  locationLabel?: string | null;
  locationNote?: string | null;
  needsOnsiteWalkthrough?: boolean;
  isVirtualCall?: boolean;
  isPhoneCall?: boolean;
  estimateSummary?: string | null;
  estimateRoughRange?: string | null;
  estimateTotal?: number | null;
  rawEstimateJson?: string | null;
  createdAt?: string | null;
  followupWalkthroughDateISO?: string | null;
  followupWalkthroughTimeSlot?: string | null;
};

type UpsellItem = {
  id: string;
  title: string;
  category:
    | "camera"
    | "wiring"
    | "monitor"
    | "sensor"
    | "doorLock"
    | "speaker"
    | "radio";
  tagline: string;
  bullets: string[];
  affiliateUrl: string;
  suggestedFor: string;
};

type UpsellCategory = {
  key: UpsellItem["category"];
  label: string;
  description: string;
  items: UpsellItem[];
};

export const metadata: Metadata = {
  title: "SmartNET • Owner Booking View",
  description: "Internal SmartNET view for walkthrough bookings and upsells.",
};

// --- Static affiliate-style catalog (placeholder URLs — swap with your real links) ---
const UPSELL_CATALOG: UpsellCategory[] = [
  {
    key: "camera",
    label: "Cameras & Recording",
    description: "Easy camera upgrades that make your proposal feel premium.",
    items: [
      {
        id: "cam-4k-turret",
        title: "4K Turret Camera (PoE, Outdoor)",
        category: "camera",
        tagline: "Bread-and-butter camera for corners and parking lots.",
        bullets: [
          "Great for warehouse corners & parking areas",
          "Clean look on soffits and eaves",
          "Works with most PoE NVRs",
        ],
        affiliateUrl: "https://www.amazon.com/dp/B0CAMERA4K",
        suggestedFor: "Warehouses, parking lots, building corners.",
      },
      {
        id: "cam-lpr-gate",
        title: "License Plate Capture Camera",
        category: "camera",
        tagline: "Lock in who came in and when.",
        bullets: [
          "Designed to read plates at gates/drive entrances",
          "Great for apartments, HOAs, and yards",
          "Pairs well with a standard overview camera",
        ],
        affiliateUrl: "https://www.amazon.com/dp/B0LPRCAMERA1",
        suggestedFor: "Front gates, entry lanes, delivery yards.",
      },
      {
        id: "nvr-16ch",
        title: "16-Channel PoE NVR",
        category: "camera",
        tagline: "Room to grow from day one.",
        bullets: [
          "All-in-one recorder with PoE built in",
          "Simple HDMI monitor output",
          "Lets you add future cameras without redoing the rack",
        ],
        affiliateUrl: "https://www.amazon.com/dp/B0NVR16CH01",
        suggestedFor: "Sites with 8–12 planned cameras or growth.",
      },
    ],
  },
  {
    key: "wiring",
    label: "Wiring & Network",
    description: "Low-voltage basics that turn a good job into a clean job.",
    items: [
      {
        id: "cable-cat6-bulk",
        title: "Cat6 Bulk Ethernet Cable (1000 ft)",
        category: "wiring",
        tagline: "Standard pull cable for most small jobs.",
        bullets: [
          "Solid copper, easy to terminate",
          "Good for cameras, APs, and small racks",
          "Future-proofs better than Cat5e",
        ],
        affiliateUrl: "https://www.amazon.com/dp/B0CAT6BULK1",
        suggestedFor: "Most small business / light industrial pulls.",
      },
      {
        id: "rack-12u-wall",
        title: "12U Wall-Mount Rack",
        category: "wiring",
        tagline: "Makes their network closet look like TV.",
        bullets: [
          "Perfect for NVR, switch, and patch panel",
          "Keeps gear off the floor and organized",
          "Easy cable management with side openings",
        ],
        affiliateUrl: "https://www.amazon.com/dp/B0RACK12U01",
        suggestedFor: "Offices, retail back rooms, MDF/IDF closets.",
      },
      {
        id: "keystone-faceplates",
        title: "Keystone Jacks & Faceplates Kit",
        category: "wiring",
        tagline: "No more cables hanging out of random holes.",
        bullets: [
          "Includes keystone jacks, plates, and boots",
          "Helps finish wall drops cleanly",
          "Ups your perceived quality instantly",
        ],
        affiliateUrl: "https://www.amazon.com/dp/B0KEYSTONE01",
        suggestedFor: "Any wall outlet or desk drop.",
      },
    ],
  },
  {
    key: "monitor",
    label: "Monitors & Viewing",
    description: "Places where the client can actually see their investment.",
    items: [
      {
        id: "monitor-24",
        title: '24" Security Monitor',
        category: "monitor",
        tagline: "Simple overview screen for the office.",
        bullets: [
          "Plug-and-play HDMI from the NVR",
          "Easy for staff to glance at",
          "Can be wall-mounted or on a desk",
        ],
        affiliateUrl: "https://www.amazon.com/dp/B0MONITOR24",
        suggestedFor: "Security office, front desk, break room.",
      },
      {
        id: "monitor-32-wall",
        title: '32" Wall-Mount Display',
        category: "monitor",
        tagline: "Makes the system feel “big” in one move.",
        bullets: [
          "Large view of 8–16 cameras at once",
          "Ideal for lobbies or shipping areas",
          "Pairs great with a basic soundbar",
        ],
        affiliateUrl: "https://www.amazon.com/dp/B0MONITOR32",
        suggestedFor: "Lobbies, loading docks, main office wall.",
      },
    ],
  },
  {
    key: "sensor",
    label: "Motion & Smart Sensors",
    description: "Quick-win smart devices that layer on extra security.",
    items: [
      {
        id: "motion-sensor-kit",
        title: "Smart Motion Sensor Kit",
        category: "sensor",
        tagline: "Extra motion alerts where cameras might miss.",
        bullets: [
          "Ties into smart hubs or notifications",
          "Great for back doors, side entrances",
          "Cheap add-on that feels high-tech",
        ],
        affiliateUrl: "https://www.amazon.com/dp/B0MOTION01",
        suggestedFor: "Back doors, side gates, low-traffic areas.",
      },
      {
        id: "door-window-contacts",
        title: "Door & Window Contact Sensors",
        category: "sensor",
        tagline: "Basic open/close awareness for critical doors.",
        bullets: [
          "Alerts when a door is left open",
          "Adds alarm-style behavior without full alarm system",
          "Pairs well with cameras at that doorway",
        ],
        affiliateUrl: "https://www.amazon.com/dp/B0CONTACT01",
        suggestedFor: "Rear doors, roll-up bays, glass storefronts.",
      },
    ],
  },
  {
    key: "doorLock",
    label: "Electronic Door Locks",
    description: "Control who can get in, not just who you can see.",
    items: [
      {
        id: "smart-deadbolt-keypad",
        title: "Smart Keypad Deadbolt",
        category: "doorLock",
        tagline: "No more re-keying every time someone quits.",
        bullets: [
          "Code-based entry with changeable PINs",
          "Perfect for staff doors and offices",
          "Simple upsell with clear benefits",
        ],
        affiliateUrl: "https://www.amazon.com/dp/B0LOCKPAD01",
        suggestedFor: "Main staff entrance, manager’s office.",
      },
      {
        id: "smart-handle-lock",
        title: "Wi-Fi Lever Lock with App",
        category: "doorLock",
        tagline: "Remote lock/unlock + history in one move.",
        bullets: [
          "Track who unlocked and when",
          "Integrates with smart home/business systems",
          "Pairs well with front-door camera",
        ],
        affiliateUrl: "https://www.amazon.com/dp/B0LOCKWIFI1",
        suggestedFor: "Front door on small offices, salons, clinics.",
      },
    ],
  },
  {
    key: "speaker",
    label: "Speakers & Audio",
    description: "Sound that makes cameras feel interactive, not passive.",
    items: [
      {
        id: "ceiling-speakers",
        title: "In-Ceiling Speakers (Pair)",
        category: "speaker",
        tagline: "Ambient music or paging in one install.",
        bullets: [
          "Hide in ceiling tiles for clean look",
          "Can play music or announcements",
          "Nice add-on during cable pulls",
        ],
        affiliateUrl: "https://www.amazon.com/dp/B0SPEAKER01",
        suggestedFor: "Retail floors, lobbies, hallways.",
      },
      {
        id: "outdoor-paging-horn",
        title: "Outdoor Paging Horn Speaker",
        category: "speaker",
        tagline: "“Hey, you by the gate…” made real.",
        bullets: [
          "Ties to NVR or amp for voice-down",
          "Great deterrent for lots and yards",
          "Works with pre-recorded messages",
        ],
        affiliateUrl: "https://www.amazon.com/dp/B0PAGING01",
        suggestedFor: "Parking lots, yards, loading docks.",
      },
    ],
  },
  {
    key: "radio",
    label: "Radios & Comms",
    description: "Help their staff move like one organism.",
    items: [
      {
        id: "two-way-radios",
        title: "Business Two-Way Radios (4-Pack)",
        category: "radio",
        tagline: "Security and staff on the same channel.",
        bullets: [
          "Instant comms for security/custodial teams",
          "Useful during install and after",
          "Feels like a pro-level upgrade",
        ],
        affiliateUrl: "https://www.amazon.com/dp/B0RADIO01",
        suggestedFor: "Warehouse teams, schools, churches, yards.",
      },
      {
        id: "wireless-intercom",
        title: "Wireless Intercom Kit",
        category: "radio",
        tagline: "Front desk to back room without yelling.",
        bullets: [
          "Place one at reception, one in the back",
          "Easy to install, no phone system needed",
          "Great mini-upgrade for small offices",
        ],
        affiliateUrl: "https://www.amazon.com/dp/B0INTERCOM1",
        suggestedFor: "Small offices, clinics, salons.",
      },
    ],
  },
];

// --- Helpers ---

async function getBookingById(id: string): Promise<{
  booking: WalkthroughBookingDoc | null;
  estimate: SmartNetEstimate | null;
}> {
  const query = `*[_type == "walkthroughBooking" && _id == $id][0]{
    _id,
    status,
    appointmentType,
    dateISO,
    timeSlot,
    contactName,
    contactEmail,
    contactPhone,
    locationType,
    locationLabel,
    locationNote,
    needsOnsiteWalkthrough,
    isVirtualCall,
    isPhoneCall,
    estimateSummary,
    estimateRoughRange,
    estimateTotal,
    rawEstimateJson,
    createdAt,
    followupWalkthroughDateISO,
    followupWalkthroughTimeSlot
  }`;

  const doc = await sanityWriteClient.fetch<WalkthroughBookingDoc | null>(
    query,
    { id }
  );

  if (!doc) {
    return { booking: null, estimate: null };
  }

  let estimate: SmartNetEstimate | null = null;
  if (doc.rawEstimateJson) {
    try {
      estimate = JSON.parse(doc.rawEstimateJson) as SmartNetEstimate;
    } catch (e) {
      console.warn("[SmartNET owner booking] Failed to parse rawEstimateJson", e);
    }
  }

  return { booking: doc, estimate };
}

function formatDate(dateISO: string | null | undefined) {
  if (!dateISO) return "Unknown";
  try {
    return new Date(dateISO).toLocaleString("en-US", {
      dateStyle: "full",
      timeZone: "America/New_York",
    });
  } catch {
    return dateISO;
  }
}

function formatCreatedAt(createdAt?: string | null) {
  if (!createdAt) return "Unknown";
  try {
    return new Date(createdAt).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "America/New_York",
    });
  } catch {
    return createdAt;
  }
}

// --- Page Component (server) ---

export default async function OwnerBookingPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const { booking, estimate } = await getBookingById(id);

  if (!booking) {
    notFound();
  }

  const {
    appointmentType,
    dateISO,
    timeSlot,
    contactName,
    contactEmail,
    contactPhone,
    locationLabel,
    locationNote,
    needsOnsiteWalkthrough,
    isVirtualCall,
    isPhoneCall,
    estimateSummary,
    estimateRoughRange,
    estimateTotal,
    createdAt,
    followupWalkthroughDateISO,
    followupWalkthroughTimeSlot,
  } = booking;

  const createdPretty = formatCreatedAt(createdAt ?? null);
  const datePretty = formatDate(dateISO);

  const callType = appointmentType || "Walkthrough";
  const isOnsite =
    callType.toLowerCase().includes("on-site") ||
    callType.toLowerCase().includes("onsite");

  // Same question sets as in the email, but now rendered as checkable items.
  const coreQuestions = [
    "Confirm internet provider, modem/router location, and bandwidth.",
    "Confirm where the main network head-end / rack / NVR will live.",
    "Confirm any areas that absolutely MUST be covered by cameras (front door, gates, parking, loading, etc.).",
    "Confirm areas that should specifically NOT be recorded (privacy zones).",
    "Clarify budget comfort and any hard ceiling for this phase.",
    "Ask who is the day-to-day decision maker and who signs off on the final quote.",
  ];

  const onsiteQuestions = [
    "Walk the full perimeter and note mount heights and surface types (stucco, brick, metal, etc.).",
    "Check above ceilings / open ceilings for cable paths and possible obstacles.",
    "Confirm power availability near head-end and any remote locations (gates, poles, etc.).",
    "Confirm ladder / lift access and any safety constraints.",
  ];

  const virtualQuestions = [
    "Have client walk the perimeter with their phone and show ceiling, walls, and key mounting spots.",
    "Have client show current networking gear and low-voltage closet (if any).",
    "Ask them to stand in weak Wi-Fi / blind camera spots while on video so you can see coverage problems.",
  ];

  const phoneQuestions = [
    "Ask for photos or a short video of the space (inside and outside) before the onsite.",
    "Confirm when someone can be onsite to walk with the tech during the walkthrough.",
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-4 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 lg:flex-row">
        {/* Left: Booking + estimate details + checklist + follow-up scheduler */}
        <section className="flex-1 space-y-5">
          {/* Header */}
          <div className="rounded-2xl border border-emerald-500/40 bg-slate-900/70 p-5 shadow-[0_0_45px_rgba(16,185,129,0.4)]">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-emerald-400/80">
                  SmartNET • Owner View
                </p>
                <h1 className="mt-1 text-xl font-semibold tracking-tight md:text-2xl">
                  Walkthrough Booking
                </h1>
                <p className="mt-1 text-xs text-slate-300/80">
                  Internal-only page for SmartNET team. Clients never see this
                  screen.
                </p>
              </div>
              <div className="space-y-1 text-right text-xs">
                <div className="inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-emerald-300">
                  <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
                  Booking ID:{" "}
                  <span className="ml-1 font-mono text-[11px]">
                    {booking._id.slice(0, 6)}…
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Created: {createdPretty}
                </p>
              </div>
            </div>
          </div>

          {/* Client & appointment card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <h2 className="text-sm font-semibold tracking-tight text-slate-50">
              Client & Appointment
            </h2>
            <div className="mt-3 grid gap-4 text-sm md:grid-cols-2">
              <div className="space-y-1">
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  Client
                </p>
                <p className="font-medium text-slate-50">{contactName}</p>
                <p className="text-xs text-slate-300">
                  Email:{" "}
                  <a
                    href={`mailto:${contactEmail}`}
                    className="text-emerald-300 underline-offset-2 hover:underline"
                  >
                    {contactEmail}
                  </a>
                </p>
                <p className="text-xs text-slate-300">
                  Phone:{" "}
                  <a
                    href={`tel:${contactPhone}`}
                    className="text-emerald-300 underline-offset-2 hover:underline"
                  >
                    {contactPhone}
                  </a>
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  Appointment
                </p>
                <p className="text-sm text-slate-50">
                  {callType} —{" "}
                  <span className="text-slate-300">
                    {datePretty} at {timeSlot}
                  </span>
                </p>
                <p className="text-xs text-slate-300">
                  Location: {locationLabel || "Not specified"}
                </p>
                {locationNote && (
                  <p className="text-[11px] text-slate-400 mt-1 whitespace-pre-line">
                    Notes: {locationNote}
                  </p>
                )}
                <p className="mt-2 text-[11px] text-amber-300/90">
                  {needsOnsiteWalkthrough
                    ? "⚠ Not an on-site yet — schedule a physical walkthrough before final proposal."
                    : "✓ On-site walkthrough is part of this appointment."}
                </p>
              </div>
            </div>
          </div>

          {/* Estimate snapshot */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <h2 className="text-sm font-semibold tracking-tight text-slate-50">
              Estimate Snapshot
            </h2>
            <div className="mt-3 space-y-2 text-sm">
              {typeof estimateTotal === "number" && (
                <p className="text-lg font-semibold text-emerald-300">
                  ~ ${estimateTotal.toLocaleString()}{" "}
                  <span className="text-xs font-normal text-emerald-300/80">
                    (subject to final walkthrough)
                  </span>
                </p>
              )}
              {estimateRoughRange && (
                <p className="text-xs text-slate-300">
                  AI range:{" "}
                  <span className="font-medium text-slate-100">
                    {estimateRoughRange}
                  </span>
                </p>
              )}
              {estimateSummary ? (
                <p className="text-sm text-slate-200">{estimateSummary}</p>
              ) : (
                <p className="text-xs text-slate-400">
                  No human-readable summary saved. Use the AI wizard context
                  when calling the client.
                </p>
              )}
            </div>

            {estimate && (
              <details className="mt-4 rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-xs text-slate-300">
                <summary className="cursor-pointer text-slate-100">
                  View technical breakdown
                </summary>
                <pre className="mt-2 max-h-56 overflow-auto whitespace-pre-wrap text-[11px] text-slate-300/90">
                  {JSON.stringify(estimate, null, 2)}
                </pre>
              </details>
            )}
          </div>

          {/* Checkable walkthrough checklist */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <h2 className="text-sm font-semibold tracking-tight text-slate-50">
              Walkthrough Checklist
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Use this live during the call / walkthrough. Check items off as you
              cover them — the checkboxes are local only and don&apos;t affect
              the client.
            </p>

            {/* Core items */}
            <div className="mt-4 space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Core — every call
              </p>
              <div className="mt-2 space-y-1.5">
                {coreQuestions.map((q, idx) => (
                  <label
                    key={`core-${idx}`}
                    className="flex gap-2 rounded-lg border border-slate-800 bg-slate-950/50 px-3 py-2 text-xs text-slate-100 hover:border-emerald-500/60 hover:bg-slate-900/80"
                  >
                    <input
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 rounded border-slate-500/70 bg-slate-950 text-emerald-500 focus:ring-emerald-500"
                    />
                    <span>{q}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Onsite-specific */}
            {isOnsite && (
              <div className="mt-5 space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  On-site checks
                </p>
                <div className="mt-2 space-y-1.5">
                  {onsiteQuestions.map((q, idx) => (
                    <label
                      key={`onsite-${idx}`}
                      className="flex gap-2 rounded-lg border border-slate-800 bg-slate-950/50 px-3 py-2 text-xs text-slate-100 hover:border-emerald-500/60 hover:bg-slate-900/80"
                    >
                      <input
                        type="checkbox"
                        className="mt-0.5 h-4 w-4 rounded border-slate-500/70 bg-slate-950 text-emerald-500 focus:ring-emerald-500"
                      />
                      <span>{q}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Virtual-specific */}
            {isVirtualCall && (
              <div className="mt-5 space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Extra for virtual calls
                </p>
                <div className="mt-2 space-y-1.5">
                  {virtualQuestions.map((q, idx) => (
                    <label
                      key={`virtual-${idx}`}
                      className="flex gap-2 rounded-lg border border-slate-800 bg-slate-950/50 px-3 py-2 text-xs text-slate-100 hover:border-emerald-500/60 hover:bg-slate-900/80"
                    >
                      <input
                        type="checkbox"
                        className="mt-0.5 h-4 w-4 rounded border-slate-500/70 bg-slate-950 text-emerald-500 focus:ring-emerald-500"
                      />
                      <span>{q}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Phone-only extras */}
            {isPhoneCall && (
              <div className="mt-5 space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Extra for phone-only calls
                </p>
                <div className="mt-2 space-y-1.5">
                  {phoneQuestions.map((q, idx) => (
                    <label
                      key={`phone-${idx}`}
                      className="flex gap-2 rounded-lg border border-slate-800 bg-slate-950/50 px-3 py-2 text-xs text-slate-100 hover:border-emerald-500/60 hover:bg-slate-900/80"
                    >
                      <input
                        type="checkbox"
                        className="mt-0.5 h-4 w-4 rounded border-slate-500/70 bg-slate-950 text-emerald-500 focus:ring-emerald-500"
                      />
                      <span>{q}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Follow-up on-site scheduler (uses your client component + followup API) */}
          <FollowupWalkthroughScheduler
            bookingId={booking._id}
            existingDateISO={followupWalkthroughDateISO}
            existingTimeSlot={followupWalkthroughTimeSlot}
          />
        </section>

        {/* Right: Upsell catalog */}
        <aside className="w-full max-w-xl space-y-5">
          <div className="rounded-2xl border border-emerald-500/40 bg-slate-900/70 p-5">
            <h2 className="text-sm font-semibold tracking-tight text-slate-50">
              Upsells & Affiliate Add-Ons
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              These are optional upgrades you can naturally pitch during the
              walkthrough. All items can be linked to your Amazon business
              account or other affiliate programs.
            </p>
            <p className="mt-2 text-[11px] text-emerald-300/90">
              Tip: Pick 1–3 that clearly match this client. Don&apos;t shotgun
              everything.
            </p>
          </div>

          <div className="space-y-4">
            {UPSELL_CATALOG.map((cat) => (
              <div
                key={cat.key}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                      {cat.label}
                    </p>
                    <p className="mt-1 text-xs text-slate-300">
                      {cat.description}
                    </p>
                  </div>
                  <span className="rounded-full border border-slate-700 bg-slate-950/70 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-400">
                    Upsell
                  </span>
                </div>

                <div className="mt-3 space-y-3">
                  {cat.items.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 text-xs text-slate-200 hover:border-emerald-500/60 hover:bg-slate-900/90"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-[13px] font-semibold text-slate-50">
                            {item.title}
                          </p>
                          <p className="mt-0.5 text-[11px] text-emerald-300/90">
                            {item.tagline}
                          </p>
                        </div>
                      </div>
                      <ul className="mt-2 space-y-0.5 text-[11px] text-slate-300">
                        {item.bullets.map((b, idx) => (
                          <li key={idx} className="flex gap-1.5">
                            <span className="mt-[3px] inline-block h-1 w-1 rounded-full bg-emerald-400" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-2 text-[11px] text-slate-400">
                        Best for:{" "}
                        <span className="text-slate-200">
                          {item.suggestedFor}
                        </span>
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <a
                          href={item.affiliateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center rounded-lg border border-emerald-500/60 bg-emerald-500/10 px-3 py-1.5 text-[11px] font-medium text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.45)] hover:bg-emerald-500/20"
                        >
                          View on Amazon / Vendor
                        </a>
                        <span className="text-[10px] text-slate-500">
                          You can also copy this into your proposal as a line
                          item.
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}
