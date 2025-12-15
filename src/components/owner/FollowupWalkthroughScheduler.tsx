"use client";

import * as React from "react";

type Props = {
  bookingId: string;
  existingDateISO?: string | null;
  existingTimeSlot?: string | null;
};

export function FollowupWalkthroughScheduler({
  bookingId,
  existingDateISO,
  existingTimeSlot,
}: Props) {
  const [dateISO, setDateISO] = React.useState(
    existingDateISO ? existingDateISO.split("T")[0] : ""
  );
  const [timeSlot, setTimeSlot] = React.useState(existingTimeSlot ?? "");
  const [isSaving, setIsSaving] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);
  const [messageType, setMessageType] = React.useState<"success" | "error" | null>(null);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setMessageType(null);

    if (!dateISO || !timeSlot) {
      setMessage("Pick a date and time window before saving.");
      setMessageType("error");
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch("/api/booking/followup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId,
          followupDateISO: dateISO,
          followupTimeSlot: timeSlot,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to save follow-up.");
      }

      setMessage("On-site walkthrough locked in.");
      setMessageType("success");
    } catch (err: any) {
      console.error(err);
      setMessage(err.message || "Something went wrong.");
      setMessageType("error");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 md:p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-emerald-400/80">
            Follow-up On-site
          </p>
          <h2 className="text-sm font-semibold text-slate-50">
            Book the physical walkthrough while you’re on the call
          </h2>
        </div>
        {existingDateISO && existingTimeSlot && (
          <div className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-[11px] text-emerald-200">
            Scheduled:{" "}
            {new Date(existingDateISO).toLocaleDateString("en-US", {
              dateStyle: "medium",
            })}{" "}
            • {existingTimeSlot}
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="mt-4 grid gap-3 md:grid-cols-[1.2fr,1.6fr,auto]">
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
            On-site date
          </label>
          <input
            type="date"
            value={dateISO}
            onChange={(e) => setDateISO(e.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-50 outline-none ring-emerald-500/40 focus:ring-2"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
            Time window
          </label>
          <input
            type="text"
            placeholder="e.g. 10:00 AM – 11:00 AM"
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-50 outline-none ring-emerald-500/40 focus:ring-2"
          />
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex w-full items-center justify-center rounded-xl border border-emerald-500/70 bg-emerald-500/90 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_0_30px_rgba(16,185,129,0.6)] transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Saving…" : existingDateISO ? "Update on-site" : "Save on-site"}
          </button>
        </div>
      </form>

      {message && (
        <div
          className={`mt-3 rounded-lg border px-3 py-2 text-xs ${
            messageType === "success"
              ? "border-emerald-500/60 bg-emerald-950/40 text-emerald-100"
              : "border-red-500/60 bg-red-950/40 text-red-100"
          }`}
        >
          {message}
        </div>
      )}

      <p className="mt-3 text-[11px] text-slate-400">
        Tip: lock in the on-site while they’re excited. This stays attached to this
        SmartNET session so you can always come back to it.
      </p>
    </section>
  );
}
