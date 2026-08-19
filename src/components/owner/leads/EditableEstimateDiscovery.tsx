"use client";

export type EstimateDiscoveryDraft = {
  squareFootage: string;
  timeline: string;
  coverageProfile: string;
  wifiLayout: string;
  doorsAccess: string;
  wiringStyle: string;
  rackLocation: string;
  focus: string;
};

type Props = {
  value: EstimateDiscoveryDraft;
  onChange: (next: EstimateDiscoveryDraft) => void;
  estimateNotes?: string | null;
};

export function EditableEstimateDiscovery({ value, onChange, estimateNotes }: Props) {
  const set = (key: keyof EstimateDiscoveryDraft, next: string) =>
    onChange({ ...value, [key]: next });

  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Square Footage" value={value.squareFootage} onChange={(v) => set("squareFootage", v)} type="number" placeholder="2500" />
        <Field label="Timeline" value={value.timeline} onChange={(v) => set("timeline", v)} placeholder="ASAP, 30 days…" />
        <Field label="Coverage" value={value.coverageProfile} onChange={(v) => set("coverageProfile", v)} placeholder="Interior, exterior…" />
        <Field label="Wi-Fi Layout" value={value.wifiLayout} onChange={(v) => set("wifiLayout", v)} placeholder="AP layout / coverage" />
        <Field label="Access Doors" value={value.doorsAccess} onChange={(v) => set("doorsAccess", v)} placeholder="Door count / access needs" />
        <Field label="Wiring" value={value.wiringStyle} onChange={(v) => set("wiringStyle", v)} placeholder="Existing / new runs" />
        <Field label="Rack Location" value={value.rackLocation} onChange={(v) => set("rackLocation", v)} placeholder="MDF / closet / utility room" />
        <Field label="Focus" value={value.focus} onChange={(v) => set("focus", v)} placeholder="Cameras, Wi-Fi, cabling…" />
      </div>
      {estimateNotes && (
        <div className="rounded-xl border border-white/5 bg-[#08182d] p-3">
          <p className="text-[8px] uppercase text-slate-600">Estimator Notes</p>
          <p className="mt-1 text-[10px] leading-5 text-slate-300">{estimateNotes}</p>
        </div>
      )}
      <p className="text-[9px] text-slate-600">Discovery edits update opportunity intelligence immediately and save back to the lead.</p>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (value: string) => void; placeholder: string; type?: string }) {
  return (
    <label className="rounded-xl border border-white/5 bg-[#08182d] p-3 focus-within:border-cyan-400/30">
      <span className="text-[8px] uppercase text-slate-600">{label}</span>
      <input type={type} min={type === "number" ? 0 : undefined} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="mt-2 h-7 w-full bg-transparent text-[10px] text-slate-200 outline-none placeholder:text-slate-700" />
    </label>
  );
}
