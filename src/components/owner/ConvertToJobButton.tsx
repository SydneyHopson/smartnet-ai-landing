"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BriefcaseBusiness, Loader2 } from "lucide-react";

export function ConvertToJobButton({ bookingId }: { bookingId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function convert() {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/owner/jobs/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Could not create job");
      setMessage(data.existing ? "Job already exists." : "Job created.");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not create job");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-w-[150px]">
      <button
        onClick={() => void convert()}
        disabled={loading}
        className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-500/10 px-4 text-[10px] font-semibold text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,.08)] transition hover:bg-cyan-500/20 disabled:cursor-wait disabled:opacity-60"
      >
        {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <BriefcaseBusiness className="h-3.5 w-3.5" />}
        {loading ? "Creating..." : "Convert to Job"}
      </button>
      {message ? <p className="mt-1 text-center text-[9px] text-slate-500">{message}</p> : null}
    </div>
  );
}
