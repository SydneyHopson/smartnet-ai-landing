import { notFound } from "next/navigation";
import type { Metadata } from "next";

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

type MagicLinkSessionApi = {
  _id: string;
  email: string | null;
  phone: string | null;
  jobLocation: string | null;
  token: string;
  status: string | null;
  leadId: string | null;
  estimateTotal: number | null;
  estimateSummary: string | null;
  expiresAt: string | null;
  createdAt: string | null;
  lastAccessedAt: string | null;
  restored: boolean;
  restoredAt: string | null;
};

type MagicLinkApiResponse = {
  ok: boolean;
  isExpired: boolean;
  session: MagicLinkSessionApi;
  estimate: SmartNetEstimate | null;
};

// Optional SEO
export const metadata: Metadata = {
  title: "SmartNET • Resume Your Quote",
  description: "Resume your SmartNET wiring & camera estimate.",
};

function baseUrl(): string {
  // On Vercel, VERCEL_URL is set without protocol.
  // NEXT_PUBLIC_APP_URL is your preferred explicit base.
  const explicit = process.env.NEXT_PUBLIC_APP_URL;
  if (explicit) return explicit;

  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}

async function getMagicLink(token: string): Promise<MagicLinkApiResponse | null> {
  const url = `${baseUrl()}/api/magic-link/${encodeURIComponent(token)}`;

  const res = await fetch(url, {
    method: "GET",
    // ensure we don't cache a restore action
    cache: "no-store",
  });

  if (res.status === 404) return null;
  if (!res.ok) {
    // Fail quietly into notFound to avoid leaking internal details
    return null;
  }

  return (await res.json()) as MagicLinkApiResponse;
}

// Note: Next.js params may be a Promise, so we await it
export default async function QuoteResumePage(props: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await props.params;

  const data = await getMagicLink(token);

  if (!data?.ok || !data.session) {
    notFound();
  }

  const { session, estimate, isExpired } = data;

  const {
    email,
    phone,
    jobLocation,
    estimateTotal,
    estimateSummary,
    createdAt,
  } = session;

  const createdLabel = createdAt
    ? new Date(createdAt).toLocaleString()
    : "Unknown";

  // This is where your main funnel lives (your existing resume behavior)
  const continueUrl = `/?resumeToken=${token}`;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900/70 shadow-[0_0_60px_rgba(16,185,129,0.35)] p-6 md:p-8">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-400/80">
              SmartNET • Saved Estimate
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">
              Resume your quote
            </h1>
          </div>
          <div className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
            Token: {token.slice(0, 6)}…
          </div>
        </div>

        {isExpired ? (
          <div className="mb-6 rounded-xl border border-red-500/50 bg-red-950/40 px-4 py-3 text-sm text-red-100">
            <p className="font-medium">This magic link has expired.</p>
            <p className="mt-1 text-xs text-red-200/80">
              For security, saved quotes only stay active for a limited time.
              Please start a fresh quote so we can generate the most accurate
              estimate for your project.
            </p>
          </div>
        ) : (
          <div className="mb-6 rounded-xl border border-emerald-500/50 bg-emerald-950/40 px-4 py-3 text-sm text-emerald-100">
            <p className="font-medium">
              Your saved SmartNET estimate is ready to continue.
            </p>
            <p className="mt-1 text-xs text-emerald-200/80">
              Created: {createdLabel}
            </p>
          </div>
        )}

        <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/80 p-4 text-sm">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                Contact
              </p>
              <p className="mt-1 text-sm text-slate-50">
                {email || phone || "Unknown"}
              </p>
              {email && (
                <p className="text-xs text-slate-400 mt-0.5">Email: {email}</p>
              )}
              {phone && (
                <p className="text-xs text-slate-400">Phone: {phone}</p>
              )}
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                Job Location
              </p>
              <p className="mt-1 text-sm text-slate-50">
                {jobLocation || "Not specified yet"}
              </p>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-3">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
              Estimate Snapshot
            </p>
            <div className="mt-2 flex flex-col gap-1 text-sm">
              {typeof estimateTotal === "number" && (
                <p className="text-lg font-semibold text-emerald-300">
                  ~ ${estimateTotal.toLocaleString()}{" "}
                  <span className="text-xs font-normal text-emerald-300/80">
                    (subject to final walkthrough)
                  </span>
                </p>
              )}
              {estimateSummary ? (
                <p className="text-slate-200">{estimateSummary}</p>
              ) : (
                <p className="text-slate-400 text-xs">
                  We saved your SmartNET configuration. When you continue, the
                  wizard will reopen with your previous selections.
                </p>
              )}
            </div>

            {estimate && (
              <details className="mt-3 rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-300">
                <summary className="cursor-pointer text-slate-200">
                  View technical breakdown
                </summary>
                <pre className="mt-2 max-h-52 overflow-auto whitespace-pre-wrap text-[11px] text-slate-300/90">
                  {JSON.stringify(estimate, null, 2)}
                </pre>
              </details>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <a
            href={isExpired ? "/?start=new" : continueUrl}
            className="inline-flex items-center justify-center rounded-xl border border-emerald-500/70 bg-emerald-500/90 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_0_40px_rgba(16,185,129,0.7)] transition hover:bg-emerald-400"
          >
            {isExpired ? "Start a new quote" : "Continue your quote"}
          </a>

          {!isExpired && (
            <p className="text-[11px] text-slate-400">
              When you click continue, we’ll reload your saved SmartNET wizard
              so you can adjust rooms, devices, and wiring details before
              booking a walkthrough.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
