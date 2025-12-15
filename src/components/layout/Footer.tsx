import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-[#020617]">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 md:flex-row md:items-start md:justify-between">
        {/* Left Column — Logo + tagline */}
        <div className="space-y-4 md:max-w-sm">
          {/* LOGO — small icon size */}
          <div className="flex items-center">
            <Image
              src="/logos/images/SmartNet3.png"
              alt="SmartNET Logo"
              width={70}
              height={24}
              className="object-contain drop-shadow-[0_0_10px_rgba(56,189,248,0.25)]"
              priority
            />
          </div>

          <p className="text-xs leading-relaxed text-slate-300">
            SmartNET Installation blends field-tested low-voltage installs with{" "}
            <span className="text-sky-300 font-semibold">AI-powered planning</span>{" "}
            so your cameras, Wi-Fi, and access control feel overbuilt instead of
            overcomplicated.
          </p>

          <p className="text-[0.7rem] text-slate-500">
            Built in Atlanta · Serving homes, warehouses & growing businesses
            across the metro.
          </p>
        </div>

        {/* Middle Column — Quick links */}
        <div className="space-y-3 text-sm">
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-400">
            Quick links
          </h3>
          <ul className="space-y-1.5 text-xs text-slate-300">
            <li>
              <Link href="#estimate" className="transition hover:text-sky-300">
                Start your SmartNET estimate
              </Link>
            </li>
            <li>
              <Link
                href="#booking-calendar"
                className="transition hover:text-sky-300"
              >
                Book a walkthrough
              </Link>
            </li>
            <li>
              <Link
                href="#project-types"
                className="transition hover:text-sky-300"
              >
                Services & use cases
              </Link>
            </li>
            <li>
              <Link
                href="#faq-section"
                className="transition hover:text-sky-300"
              >
                FAQ & install basics
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Column — Service area + contact */}
        <div className="space-y-3 text-sm">
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-400">
            Service area & contact
          </h3>

          <div className="space-y-1.5 text-xs text-slate-300">
            <p className="text-[0.7rem] uppercase tracking-[0.16em] text-slate-500">
              Core metro coverage
            </p>
            <p>Atlanta · Stone Mountain · Decatur · Tucker · Duluth · Norcross</p>
            <p>Warehouse, retail & light industrial across the metro region.</p>
          </div>

          <div className="space-y-1.5 text-xs text-slate-300">
            <p className="text-[0.7rem] uppercase tracking-[0.16em] text-slate-500">
              Talk to SmartNET
            </p>
            <p>
              Email:{" "}
              <a
                href="mailto:ReignMobileStudios@gmail.com"
                className="text-sky-300 hover:text-sky-200"
              >
                ReignMobileStudios@gmail.com
              </a>
            </p>
            <p>
              Phone / Text:{" "}
              <span className="text-sky-300">770-294-1987</span>
            </p>
          </div>
        </div>
      </div>

      {/* Subtle legal & privacy note */}
      <div className="mx-auto max-w-6xl px-4 pb-6">
        <p className="text-[0.65rem] leading-relaxed text-slate-500">
          Estimates are preliminary and generated using automated inputs and
          industry averages. Final pricing and scope are confirmed after a
          walkthrough and may vary based on site conditions and equipment
          requirements.
        </p>
        <p className="mt-2 text-[0.65rem] leading-relaxed text-slate-500">
          We collect contact and project details only to provide estimates,
          schedule walkthroughs, and communicate regarding your request. We do
          not sell your data.
        </p>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-900 bg-black/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-[0.65rem] text-slate-500 sm:flex-row">
          <p>© {year} SmartNET Installation · Powered By ReignMobile</p>
          <p className="text-[0.62rem]">
            Low voltage · Cameras · Wi-Fi · Access Control · Small business
            networks.
          </p>
        </div>
      </div>
    </footer>
  );
}
