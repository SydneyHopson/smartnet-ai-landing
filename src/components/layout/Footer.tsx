import Image from "next/image";
import Link from "next/link";

const SMARTNET_PHONE = "(404) 966-5499";
const SMARTNET_PHONE_HREF = "tel:+14049665499";
const SMARTNET_EMAIL = "Info@smartnetinstallayion.ai";
const FARHAD_EMAIL = "Farhad@smartnetinstallation.ai";
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
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-14">
                <Image src="/logos/images/smartnet3.png" alt="SmartNET" fill sizes="56px" className="object-contain drop-shadow-[0_0_18px_rgba(56,189,248,.35)]" />
              </div>
              <div><p className="text-xl font-black uppercase tracking-[.12em] text-white">SMART<span className="text-blue-500">NET</span></p><p className="text-[.6rem] font-bold uppercase tracking-[.24em] text-sky-300">Installations</p></div>
            </div>
            <p className="mt-5 max-w-lg text-sm leading-6 text-slate-400">AI-assisted project planning and professional low-voltage installation for security cameras, Wi-Fi, networking, access control and structured cabling.</p>
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

          <div className="group relative overflow-hidden rounded-xl border border-violet-400/20 bg-gradient-to-r from-violet-500/[.06] via-sky-400/[.07] to-blue-500/[.06] px-4 py-2.5 shadow-[0_0_28px_rgba(56,189,248,.08)] transition duration-300 hover:border-sky-300/40 hover:shadow-[0_0_38px_rgba(56,189,248,.16)]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(125,211,252,.12),transparent_65%)] opacity-0 transition duration-300 group-hover:opacity-100" />
            <div className="relative flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[.65rem]">
              <span className="uppercase tracking-[.16em] text-slate-500">Powered by</span>
              <a href={REIGN_MOBILE_PHONE_HREF} aria-label={`Call Reign Mobile Agency at ${REIGN_MOBILE_PHONE}`} className="font-black uppercase tracking-[.14em] text-sky-200 drop-shadow-[0_0_10px_rgba(125,211,252,.45)] transition hover:text-white hover:drop-shadow-[0_0_14px_rgba(125,211,252,.8)]">Reign Mobile Agency</a>
              <span className="text-slate-700">·</span>
              <a href={REIGN_MOBILE_PHONE_HREF} className="font-semibold tracking-[.08em] text-slate-400 transition hover:text-sky-200">{REIGN_MOBILE_PHONE}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
