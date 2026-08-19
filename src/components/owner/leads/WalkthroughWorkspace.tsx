"use client";

import { CalendarClock, CheckCircle2, ClipboardCheck, MapPin } from "lucide-react";

export type WalkthroughDraft = {
  scheduledAt: string;
  status: string;
  siteNotes: string;
  equipmentNotes: string;
  cableNotes: string;
  powerNetworkNotes: string;
};

type Props = {
  value: WalkthroughDraft;
  onChange: (next: WalkthroughDraft) => void;
  location: string;
  onReadyForQuote: () => void;
};

export function WalkthroughWorkspace({ value, onChange, location, onReadyForQuote }: Props) {
  const set = (key: keyof WalkthroughDraft, next: string) => onChange({ ...value, [key]: next });
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="rounded-xl border border-cyan-400/10 bg-[#08182d] p-3 sm:col-span-2">
          <span className="flex items-center gap-2 text-[8px] uppercase text-slate-500"><CalendarClock className="h-3 w-3"/>Scheduled Date & Time</span>
          <input type="datetime-local" value={value.scheduledAt} onChange={(e)=>set("scheduledAt",e.target.value)} className="mt-2 h-8 w-full bg-transparent text-xs text-slate-200 outline-none"/>
        </label>
        <label className="rounded-xl border border-cyan-400/10 bg-[#08182d] p-3">
          <span className="text-[8px] uppercase text-slate-500">Status</span>
          <select value={value.status} onChange={(e)=>set("status",e.target.value)} className="mt-2 h-8 w-full bg-[#08182d] text-xs text-slate-200 outline-none"><option value="scheduled">Scheduled</option><option value="in_progress">In Progress</option><option value="completed">Completed</option></select>
        </label>
      </div>
      <div className="rounded-xl border border-white/5 bg-[#08182d] p-3"><span className="flex items-center gap-2 text-[8px] uppercase text-slate-600"><MapPin className="h-3 w-3"/>Site</span><p className="mt-2 text-[10px] text-slate-300">{location||"Location not captured yet"}</p></div>
      <Area label="Site Survey Notes" value={value.siteNotes} onChange={(v)=>set("siteNotes",v)} placeholder="Walk the site: entrances, blind spots, ceilings, pathways, customer priorities…"/>
      <div className="grid gap-3 sm:grid-cols-2">
        <Area label="Equipment / Counts" value={value.equipmentNotes} onChange={(v)=>set("equipmentNotes",v)} placeholder="Camera counts, APs, switches, access doors, rack equipment…" compact/>
        <Area label="Cabling / Pathways" value={value.cableNotes} onChange={(v)=>set("cableNotes",v)} placeholder="Cable routes, drops, conduit, ceiling access, estimated runs…" compact/>
        <Area label="Power / Network" value={value.powerNetworkNotes} onChange={(v)=>set("powerNetworkNotes",v)} placeholder="Power availability, ISP, demarc, rack/MDF, existing network concerns…" compact/>
        <div className="flex flex-col justify-between rounded-xl border border-emerald-400/15 bg-emerald-500/[.04] p-4"><div><ClipboardCheck className="h-5 w-5 text-emerald-300"/><p className="mt-2 text-xs font-semibold">Walkthrough Gate</p><p className="mt-1 text-[9px] leading-4 text-slate-500">When the site survey is complete, move the opportunity directly into quote preparation.</p></div><button type="button" onClick={onReadyForQuote} className="mt-4 inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-emerald-400/25 bg-emerald-500/[.08] px-4 text-[10px] font-semibold text-emerald-200"><CheckCircle2 className="h-4 w-4"/>Ready for Quote</button></div>
      </div>
    </div>
  );
}

function Area({label,value,onChange,placeholder,compact=false}:{label:string;value:string;onChange:(value:string)=>void;placeholder:string;compact?:boolean}){return <label className="block rounded-xl border border-white/5 bg-[#08182d] p-3 focus-within:border-cyan-400/25"><span className="text-[8px] uppercase text-slate-600">{label}</span><textarea rows={compact?4:5} value={value} onChange={(e)=>onChange(e.target.value)} placeholder={placeholder} className="mt-2 w-full resize-y bg-transparent text-[10px] leading-5 text-slate-200 outline-none placeholder:text-slate-700"/></label>}
