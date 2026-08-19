"use client";

import {
  CalendarClock,
  FileText,
  Mail,
  MessageSquare,
  Phone,
} from "lucide-react";

type Props = {
  phone: string;
  email: string;
  onWalkthrough: () => void;
  onQuote: () => void;
};

const baseActionClass =
  "inline-flex h-11 min-w-[112px] flex-1 items-center justify-center gap-2 rounded-xl border px-4 text-[10px] font-semibold whitespace-nowrap transition-colors sm:flex-none";

export function LeadActionBar({
  phone,
  email,
  onWalkthrough,
  onQuote,
}: Props) {
  const hasPhone = Boolean(phone.trim());
  const hasEmail = Boolean(email.trim());
  const tel = hasPhone ? `tel:${phone}` : "#";
  const sms = hasPhone ? `sms:${phone}` : "#";
  const mail = hasEmail ? `mailto:${email}` : "#";

  return (
    <div className="mt-4 flex w-full flex-wrap gap-2 sm:gap-3">
      <a
        href={tel}
        aria-disabled={!hasPhone}
        className={`${baseActionClass} ${
          hasPhone
            ? "border-blue-400/20 bg-blue-500/[.07] text-blue-100 hover:bg-blue-500/[.12]"
            : "pointer-events-none border-white/5 bg-white/[.02] text-slate-700"
        }`}
      >
        <Phone className="h-4 w-4 shrink-0" />
        Call
      </a>

      <a
        href={sms}
        aria-disabled={!hasPhone}
        className={`${baseActionClass} ${
          hasPhone
            ? "border-blue-400/20 bg-blue-500/[.07] text-blue-100 hover:bg-blue-500/[.12]"
            : "pointer-events-none border-white/5 bg-white/[.02] text-slate-700"
        }`}
      >
        <MessageSquare className="h-4 w-4 shrink-0" />
        Text
      </a>

      <a
        href={mail}
        aria-disabled={!hasEmail}
        className={`${baseActionClass} ${
          hasEmail
            ? "border-blue-400/20 bg-blue-500/[.07] text-blue-100 hover:bg-blue-500/[.12]"
            : "pointer-events-none border-white/5 bg-white/[.02] text-slate-700"
        }`}
      >
        <Mail className="h-4 w-4 shrink-0" />
        Email
      </a>

      <button
        type="button"
        onClick={onWalkthrough}
        className={`${baseActionClass} border-cyan-400/20 bg-cyan-500/[.07] text-cyan-100 hover:bg-cyan-500/[.12]`}
      >
        <CalendarClock className="h-4 w-4 shrink-0" />
        Walkthrough
      </button>

      <button
        type="button"
        onClick={onQuote}
        className={`${baseActionClass} border-violet-400/20 bg-violet-500/[.07] text-violet-200 hover:bg-violet-500/[.12]`}
      >
        <FileText className="h-4 w-4 shrink-0" />
        Quote
      </button>
    </div>
  );
}
