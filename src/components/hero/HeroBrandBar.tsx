import Image from "next/image";

export function HeroBrandBar() {
  const trustItems = [
    { label: "Licensed & Insured", icon: <path d="M12 3 19 6v5c0 4.5-2.8 8.2-7 10-4.2-1.8-7-5.5-7-10V6l7-3Z" stroke="currentColor" strokeWidth="1.5"/> },
    { label: "Expert Professionals", icon: <><circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M5 20c.8-4 3.2-6 7-6s6.2 2 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></> },
    { label: "Enterprise Solutions", icon: <><path d="M4 21V8h6v13M14 21V3h6v18M2 21h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 11h.01M7 15h.01M17 7h.01M17 11h.01M17 15h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></> },
  ];

  return (
    <header className="mb-7 border-b border-sky-500/10 pb-5 sm:mb-8 sm:pb-6 xl:flex xl:items-center xl:justify-between xl:gap-8">
      <div className="relative h-16 w-[260px] max-w-[78vw] sm:h-20 sm:w-[340px] xl:h-24 xl:w-[420px]">
        <Image src="/hero/images/smartnet-logo-clean-transparent.png" alt="SmartNET Installation LLC" fill priority sizes="(max-width: 640px) 260px, (max-width: 1279px) 340px, 420px" className="object-contain object-left" />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 sm:mt-5 sm:gap-3 xl:mt-0 xl:min-w-[560px]">
        {trustItems.map((item) => (
          <div key={item.label} className="flex min-w-0 flex-col items-center justify-center rounded-xl border border-sky-500/15 bg-sky-950/15 px-2 py-3 text-center sm:flex-row sm:gap-3 sm:px-3 sm:text-left xl:rounded-none xl:border-y-0 xl:border-l-0 xl:bg-transparent xl:py-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-sky-400/25 bg-sky-400/10 text-sky-300 sm:h-10 sm:w-10">
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">{item.icon}</svg>
            </div>
            <p className="mt-2 text-[9px] font-semibold uppercase leading-4 tracking-[0.08em] text-slate-200 sm:mt-0 sm:text-[10px] xl:text-xs xl:leading-5 xl:tracking-[0.12em]">{item.label}</p>
          </div>
        ))}
      </div>
    </header>
  );
}
