import Image from "next/image";
import Link from "next/link";

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
              <Link href="#faq-section" className="transition hover:text-white">FAQ</Link>
            </div>
          </div>

          <div>
            <p className="text-[.65rem] font-bold uppercase tracking-[.2em] text-sky-300">Contact</p>
            <div className="mt-4 space-y-3 text-sm text-slate-400">
              <a href="mailto:ReignMobileStudios@gmail.com" className="block transition hover:text-white">ReignMobileStudios@gmail.com</a>
              <a href="tel:+17702941987" className="block transition hover:text-white">770-294-1987</a>
              <p className="text-xs leading-5 text-slate-600">Final scope and pricing are confirmed after project verification and customer approval.</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-sky-400/10 pt-6 text-[.65rem] text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} SmartNET Installation. All rights reserved.</p>
          <p>Powered by ReignMobile · Cameras · Wi-Fi · Network · Access Control · Cabling</p>
        </div>
      </div>
    </footer>
  );
}
