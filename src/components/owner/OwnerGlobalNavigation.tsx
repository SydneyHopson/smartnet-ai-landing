"use client";

import Link from "next/link";
import { ArrowLeft, LayoutDashboard } from "lucide-react";
import { usePathname } from "next/navigation";

export function OwnerGlobalNavigation() {
  const pathname = usePathname();

  if (!pathname.startsWith("/owner") || pathname === "/owner/dashboard") {
    return null;
  }

  return (
    <div className="fixed left-3 top-3 z-[70] flex items-center gap-2 sm:left-4 sm:top-4">
      <button
        type="button"
        onClick={() => window.history.back()}
        aria-label="Go back"
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/25 bg-[#041022]/95 text-blue-200 shadow-xl shadow-black/20 backdrop-blur-xl transition hover:border-cyan-300/40 hover:text-cyan-100"
      >
        <ArrowLeft className="h-4 w-4" />
      </button>

      <Link
        href="/owner/dashboard"
        className="flex h-10 items-center gap-2 rounded-xl border border-cyan-400/20 bg-[#041022]/95 px-3 text-[10px] font-semibold text-cyan-100 shadow-xl shadow-black/20 backdrop-blur-xl transition hover:border-cyan-300/40 hover:bg-cyan-500/10"
      >
        <LayoutDashboard className="h-4 w-4" />
        <span className="hidden xs:inline sm:inline">Dashboard</span>
      </Link>
    </div>
  );
}
