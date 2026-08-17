import Image from "next/image";
import Link from "next/link";

const SMARTNET_PHONE = "(404) 966-5499";
const SMARTNET_PHONE_HREF = "tel:+14049665499";
const SMARTNET_EMAIL = "info@smartnetinstallation.ai";
const FARHAD_EMAIL = "farhad@smartnetinstallation.ai";
const REIGN_MOBILE_PHONE = "(470) 226-7705";
const REIGN_MOBILE_PHONE_HREF = "tel:+14702267705";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-sky-400/15 bg-[#01040d]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(37,99,235,.12),transparent_28rem)]" />
      <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_.7fr_.9fr]">
          <div className="max-w-xl">
            <div className="relative h-24 w-[280px] max-w-full">
              <div className="pointer-events-none absolute inset-4 rounded-full bg-sky-500/10 blur-2xl" />
              <Image
                src="/logos/images/smartnet-installation-logo-2026.png"
                alt="SmartNET Installation LLC"
                fill
                sizes="280px"
                className="relative object-contain object-left drop-shadow-[0_0_18px_rgba(56,189,248,.3)]"
              />
            </div>
            <p className="mt-4 max-w-lg text-sm leading-6 text-slate-400">AI-assisted project planning and professional low-voltage installation for security cameras, Wi-Fi, networking, access control and structured cabling.</p>
            <p className="mt-4 text-xs text-slate-600">Atlanta, Georgia · Residential and commercial projects</p>
          </div>

          <div>
            <p className="text-[.65rem] font-bold uppercase tracking-[.2em] text-sky-300">Navigate</p>
            <div className="mt-4 grid gap-2 text-sm text-slate-400">
              <Link href="#smartnet-generator" className="transition hover:text-white">AI estimator</Link>
              <Link href="#booking-calendar" className="transition hover:text-white">Book walkthrough</Link>
              <Link href="#project-types" className="transition hover:text-white">Project types</Link>
              <Link href="#faq" className="transition hover:text-white">FAQ</Link>
            </div>
          </div>

          <div>
            <p className="text-[.65rem] font-bold uppercase tracking-[.2em] text-sky-300">Contact SmartNET</p>
            <div className="mt-4 space-y-3 text-sm text-slate-400">
              <a href={SMARTNET_PHONE_HREF} className="block text-base font-bold text-white transition hover:text-sky-300">{SMARTNET_PHONE}</a>
              <a href={`mailto:${SMARTNET_EMAIL}`} className="block transition hover:text-white">{SMARTNET_EMAIL}</a>
              <a href={`mailto:${FARHAD_EMAIL}`} className="block transition hover:text-white">{FARHAD_EMAIL}</a>
              <p className="text-xs leading-5 text-slate-500">Call or email SmartNET for estimates, walkthroughs, camera installations, Wi-Fi, networking, access control and structured cabling.</p>
              <p className="text-xs leading-5 text-slate-600">Final scope and pricing are confirmed after project verification and customer approval.</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-sky-400/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[.65rem] text-slate-600">© {year} SmartNET Installation. All rights reserved.</p>

          <div className="group relative rounded-xl border border-violet-400/20 bg-gradient-to-r from-violet-500/[.06] via-sky-400/[.07] to-blue-500/[.06] px-4 py-2.5 shadow-[0_0_28px_rgba(56,189,248,.08)] transition duration-300 hover:border-sky-300/40 hover:shadow-[0_0_38px_rgba(56,189,248,.16)] focus-within:border-sky-300/40 focus-within:shadow-[0_0_38px_rgba(56,189,248,.16)]">
            <div className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_50%_50%,rgba(125,211,252,.12),transparent_65%)] opacity-0 transition duration-300 group-hover:opacity-100 group-focus-within:opacity-100" />
            <div className="relative flex items-center justify-center text-[.65rem]">
              <a href={REIGN_MOBILE_PHONE_HREF} aria-label={`Reign Mobile Agency. Call ${REIGN_MOBILE_PHONE}`} className="peer flex items-center gap-2 outline-none">
                <span className="uppercase tracking-[.16em] text-slate-500 transition group-hover:text-slate-400 group-focus-within:text-slate-400">Powered by</span>
                <span className="font-black uppercase tracking-[.14em] text-sky-200 drop-shadow-[0_0_10px_rgba(125,211,252,.45)] transition group-hover:text-white group-hover:drop-shadow-[0_0_14px_rgba(125,211,252,.8)] group-focus-within:text-white group-focus-within:drop-shadow-[0_0_14px_rgba(125,211,252,.8)]">Reign Mobile Agency</span>
              </a>

              <div className="pointer-events-none absolute bottom-full right-0 mb-3 translate-y-2 opacity-0 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <div className="relative rounded-lg border border-sky-300/25 bg-[#050b18]/95 px-3 py-2 text-center shadow-[0_0_30px_rgba(56,189,248,.16)] backdrop-blur-md">
                  <p className="whitespace-nowrap text-[.58rem] font-bold uppercase tracking-[.15em] text-slate-500">Website & AI consulting</p>
                  <p className="mt-1 whitespace-nowrap text-xs font-bold tracking-[.08em] text-sky-200">{REIGN_MOBILE_PHONE}</p>
                  <span className="absolute right-6 top-full h-2 w-2 -translate-y-1 rotate-45 border-b border-r border-sky-300/25 bg-[#050b18]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
