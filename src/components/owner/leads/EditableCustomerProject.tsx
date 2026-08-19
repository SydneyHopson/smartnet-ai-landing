"use client";
import { Mail, MapPin, Phone, Sparkles, UserRound, Wrench } from "lucide-react";

export type CustomerProjectDraft = {
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  jobLocationNote: string;
  projectType: string;
  requestedServices: string;
};

type Props = {
  value: CustomerProjectDraft;
  onChange: (next: CustomerProjectDraft) => void;
  source: string;
  amount: string;
};

export function EditableCustomerProject({ value, onChange, source, amount }: Props) {
  const set = (key: keyof CustomerProjectDraft, next: string) => onChange({ ...value, [key]: next });
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field icon={<UserRound />} label="Customer Name" value={value.contactName} onChange={v => set("contactName", v)} placeholder="Customer name" />
        <Field icon={<Mail />} label="Email" value={value.contactEmail} onChange={v => set("contactEmail", v)} placeholder="customer@email.com" type="email" />
        <Field icon={<Phone />} label="Phone" value={value.contactPhone} onChange={v => set("contactPhone", v)} placeholder="Phone number" type="tel" />
        <Field icon={<MapPin />} label="Job Location" value={value.jobLocationNote} onChange={v => set("jobLocationNote", v)} placeholder="Address, city, or site notes" />
        <Field icon={<Sparkles />} label="Project Type" value={value.projectType} onChange={v => set("projectType", v)} placeholder="Residential, commercial…" />
        <ReadOnly label="Opportunity Value" value={amount} />
      </div>
      <label className="block rounded-xl border border-cyan-400/10 bg-[#08182d] p-3 focus-within:border-cyan-400/30">
        <span className="mb-2 flex items-center gap-2 text-[8px] uppercase tracking-wider text-slate-500"><Wrench className="h-3 w-3" />Service Scope</span>
        <textarea value={value.requestedServices} onChange={e => set("requestedServices", e.target.value)} rows={3} placeholder="Cameras, Wi-Fi, access control, cabling…" className="w-full resize-none bg-transparent text-[11px] leading-5 text-slate-200 outline-none placeholder:text-slate-700" />
      </label>
      <div className="flex items-center justify-between rounded-xl border border-white/5 bg-[#061426] px-3 py-2">
        <span className="text-[8px] uppercase text-slate-600">Lead Source</span><span className="text-[10px] font-medium text-cyan-100">{source}</span>
      </div>
      <p className="text-[9px] text-slate-600">Edits are saved with the lead and become part of SmartNET CRM memory.</p>
    </div>
  );
}

function Field({ icon, label, value, onChange, placeholder, type = "text" }: { icon: React.ReactNode; label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string }) {
  return <label className="rounded-xl border border-white/5 bg-[#08182d] p-3 focus-within:border-cyan-400/30"><span className="flex items-center gap-2 text-[8px] uppercase text-slate-600 [&>svg]:h-3 [&>svg]:w-3">{icon}{label}</span><input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="mt-2 h-7 w-full bg-transparent text-[10px] text-slate-200 outline-none placeholder:text-slate-700" /></label>;
}
function ReadOnly({ label, value }: { label: string; value: string }) { return <div className="rounded-xl border border-white/5 bg-[#08182d] p-3"><span className="text-[8px] uppercase text-slate-600">{label}</span><p className="mt-2 text-[10px] font-medium text-slate-200">{value}</p></div>; }
