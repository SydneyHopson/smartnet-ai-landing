import Image from "next/image";

export function HeroBrandBar() {
  return (
    <header className="mb-8 flex flex-col gap-6 pb-2 xl:flex-row xl:items-center xl:justify-between">
      <div className="relative h-20 w-[360px] max-w-full sm:h-24 sm:w-[430px]">
        <Image src="/hero/images/smartnet-logo-clean-transparent.png" alt="SmartNET Installation LLC" fill priority sizes="(max-width: 640px) 360px, 430px" className="object-contain object-left" />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-3 sm:border-r sm:border-sky-500/20 sm:pr-6"><div className="flex h-11 w-11 items-center justify-center rounded-xl border border-sky-400/30 bg-sky-400/10 text-sky-300"><svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true"><path d="M12 3 19 6v5c0 4.5-2.8 8.2-7 10-4.2-1.8-7-5.5-7-10V6l7-3Z" stroke="currentColor" strokeWidth="1.5"/><path d="m9 12 2 2 4-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div><p className="text-xs font-semibold uppercase leading-5 tracking-[0.12em] text-slate-200">Licensed<span className="block">&amp; Insured</span></p></div>
        <div className="flex items-center gap-3 sm:border-r sm:border-sky-500/20 sm:pr-6"><div className="flex h-11 w-11 items-center justify-center rounded-xl border border-sky-400/30 bg-sky-400/10 text-sky-300"><svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true"><circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M5 20c.8-4 3.2-6 7-6s6.2 2 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></div><p className="text-xs font-semibold uppercase leading-5 tracking-[0.12em] text-slate-200">Expert<span className="block">Professionals</span></p></div>
        <div className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-xl border border-sky-400/30 bg-sky-400/10 text-sky-300"><svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true"><path d="M4 21V8h6v13M14 21V3h6v18M2 21h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 11h.01M7 15h.01M17 7h.01M17 11h.01M17 15h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></div><p className="text-xs font-semibold uppercase leading-5 tracking-[0.12em] text-slate-200">Enterprise<span className="block">Solutions</span></p></div>
      </div>
    </header>
  );
}
