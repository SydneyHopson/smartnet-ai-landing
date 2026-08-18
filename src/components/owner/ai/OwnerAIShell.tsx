"use client";

import { FormEvent, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Bot, Loader2, Send, Sparkles, X } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

function inferEntity(pathname: string) {
  const booking = pathname.match(/\/owner\/booking\/([^/]+)/);
  if (booking) return { entityType: "walkthroughBooking", entityId: booking[1] };
  const job = pathname.match(/\/owner\/jobs\/([^/]+)/);
  if (job) return { entityType: "smartnetJob", entityId: job[1] };
  const quote = pathname.match(/\/owner\/quotes\/([^/]+)/);
  if (quote) return { entityType: "smartnetQuote", entityId: quote[1] };
  return { entityType: null, entityId: null };
}

export function OwnerAIShell() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "SmartNET AI is online. Ask me about this page, a customer, pipeline, jobs, quotes, follow-ups, operations, growth, or what needs attention." },
  ]);
  const entity = useMemo(() => inferEntity(pathname), [pathname]);

  if (pathname === "/owner/access" || pathname.startsWith("/owner/logout")) return null;

  async function send(event: FormEvent) {
    event.preventDefault();
    const message = input.trim();
    if (!message || busy) return;
    setMessages((current) => [...current, { role: "user", content: message }]);
    setInput("");
    setBusy(true);
    try {
      const response = await fetch("/api/owner/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, page: pathname, ...entity }),
      });
      const json = await response.json();
      setMessages((current) => [...current, { role: "assistant", content: response.ok ? json.answer : json.error || "SmartNET AI couldn't answer that." }]);
    } catch {
      setMessages((current) => [...current, { role: "assistant", content: "SmartNET AI is temporarily unavailable." }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {open ? (
        <section className="fixed inset-x-3 bottom-3 z-[120] flex max-h-[78vh] flex-col overflow-hidden rounded-[24px] border border-cyan-400/25 bg-[#03101f]/98 text-white shadow-[0_0_70px_rgba(34,211,238,.16)] backdrop-blur-xl sm:inset-x-auto sm:bottom-5 sm:right-5 sm:h-[620px] sm:w-[390px]">
          <header className="flex items-center gap-3 border-b border-white/5 bg-[linear-gradient(90deg,rgba(37,99,235,.18),rgba(34,211,238,.08))] p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/25 bg-cyan-500/10 text-cyan-200"><Sparkles className="h-5 w-5" /></div>
            <div className="min-w-0 flex-1"><p className="text-sm font-semibold">SmartNET AI</p><p className="truncate text-[9px] text-cyan-400">Business memory active · {pathname}</p></div>
            <button type="button" onClick={() => setOpen(false)} className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-white"><X className="h-4 w-4" /></button>
          </header>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div key={index} className={`max-w-[90%] rounded-2xl px-3 py-2.5 text-[11px] leading-5 ${message.role === "user" ? "ml-auto border border-blue-400/20 bg-blue-500/15 text-blue-50" : "border border-white/5 bg-white/[.035] text-slate-300"}`}>{message.content}</div>
            ))}
            {busy ? <div className="flex items-center gap-2 text-[10px] text-cyan-400"><Loader2 className="h-3.5 w-3.5 animate-spin" />SmartNET is thinking…</div> : null}
          </div>
          <form onSubmit={send} className="border-t border-white/5 p-3">
            <div className="flex items-center gap-2 rounded-2xl border border-cyan-400/15 bg-[#020a16] p-2">
              <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask SmartNET anything about the business…" className="min-w-0 flex-1 bg-transparent px-2 text-xs outline-none placeholder:text-slate-700" />
              <button disabled={busy || !input.trim()} className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-200 disabled:opacity-30"><Send className="h-4 w-4" /></button>
            </div>
          </form>
        </section>
      ) : (
        <button type="button" onClick={() => setOpen(true)} className="fixed bottom-20 right-4 z-[110] flex h-14 w-14 items-center justify-center rounded-full border border-cyan-300/35 bg-[radial-gradient(circle_at_35%_30%,#1e8fff,#071426_65%)] text-white shadow-[0_0_30px_rgba(34,211,238,.35)] transition hover:scale-105 lg:bottom-6 lg:right-6" aria-label="Open SmartNET AI">
          <Bot className="h-6 w-6" />
          <span className="absolute inset-0 animate-ping rounded-full border border-cyan-400/20" />
        </button>
      )}
    </>
  );
}
