"use client";

// Deployment refresh: Operations module JSX verified after build fix.
import Link from "next/link";
import { ArrowLeft, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";

export type OpRecord = {
  id: string;
  title: string;
  subtitle: string;
  status: string;
  amount?: number | null;
  meta?: string | null;
};

type Field = {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
};

type Props = {
  title: string;
  kicker: string;
  description: string;
  records: OpRecord[];
  emptyLabel: string;
  createLabel: string;
  apiPath: string;
  kind: string;
  fields: Field[];
};

export function OperationsModule({
  title,
  kicker,
  description,
  records,
  emptyLabel,
  createLabel,
  apiPath,
  kind,
  fields,
}: Props) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState<Record<string, string>>({});

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return records;
    return records.filter((record) =>
      `${record.title} ${record.subtitle} ${record.status} ${record.meta ?? ""}`
        .toLowerCase()
        .includes(q),
    );
  }, [query, records]);

  async function createRecord() {
    setBusy(true);
    try {
      const response = await fetch(apiPath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, kind }),
      });
      if (!response.ok) throw new Error("Could not create record");
      window.location.reload();
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#010713] text-white">
      <div className="mx-auto max-w-[1350px] px-4 py-5 sm:px-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Link href="/owner/operations" className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/[.06] text-blue-300">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <p className="text-[9px] uppercase tracking-[.22em] text-cyan-400">{kicker}</p>
              <h1 className="text-2xl font-semibold">{title}</h1>
              <p className="mt-1 text-[10px] text-slate-500">{description}</p>
            </div>
          </div>
          <button type="button" onClick={() => setOpen(true)} className="flex h-11 items-center justify-center gap-2 rounded-xl border border-cyan-400/25 bg-cyan-500/10 px-4 text-xs text-cyan-100">
            <Plus className="h-4 w-4" />
            {createLabel}
          </button>
        </header>

        <div className="mt-6 flex h-11 max-w-md items-center gap-2 rounded-xl border border-blue-400/15 bg-[#041022] px-3">
          <Search className="h-4 w-4 text-blue-400" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search" className="w-full bg-transparent text-xs outline-none" />
        </div>

        <section className="mt-4 overflow-hidden rounded-2xl border border-blue-400/15 bg-[#041022]">
          <div className="divide-y divide-white/5">
            {shown.length > 0 ? (
              shown.map((record) => (
                <div key={record.id} className="p-4 sm:flex sm:items-center sm:gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold">{record.title}</p>
                    <p className="mt-1 text-[9px] text-slate-500">{record.subtitle}</p>
                    {record.meta ? <p className="mt-1 text-[8px] text-slate-600">{record.meta}</p> : null}
                  </div>
                  <div className="mt-3 flex items-center gap-3 sm:mt-0">
                    <span className="rounded-full border border-cyan-400/15 bg-cyan-500/[.06] px-2 py-1 text-[8px] uppercase text-cyan-300">{record.status}</span>
                    {record.amount != null ? <b className="text-xs text-emerald-300">${record.amount.toLocaleString()}</b> : null}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center text-xs text-slate-600">{emptyLabel}</div>
            )}
          </div>
        </section>

        {open ? (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-3 backdrop-blur-sm sm:items-center">
            <div className="w-full max-w-lg rounded-2xl border border-blue-400/20 bg-[#041022] p-5 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-cyan-400">SmartNET</p>
                  <h2 className="text-lg font-semibold">{createLabel}</h2>
                </div>
                <button type="button" onClick={() => setOpen(false)} className="text-xs text-slate-500">Close</button>
              </div>

              <div className="mt-5 grid gap-3">
                {fields.map((field) => (
                  <label key={field.name}>
                    <span className="mb-1 block text-[8px] uppercase text-slate-500">{field.label}</span>
                    <input
                      type={field.type ?? "text"}
                      placeholder={field.placeholder}
                      value={form[field.name] ?? ""}
                      onChange={(event) => setForm((current) => ({ ...current, [field.name]: event.target.value }))}
                      className="h-11 w-full rounded-xl border border-blue-400/15 bg-[#020b19] px-3 text-xs outline-none"
                    />
                  </label>
                ))}
              </div>

              <button type="button" disabled={busy} onClick={createRecord} className="mt-5 h-11 w-full rounded-xl border border-cyan-400/25 bg-cyan-500/10 text-xs font-semibold text-cyan-100 disabled:opacity-50">
                {busy ? "Saving..." : "Create"}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
