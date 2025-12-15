"use client";

import * as React from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function OwnerAccessPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get("next") || "/owner/dashboard";

  const [user, setUser] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [msg, setMsg] = React.useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    try {
      const res = await fetch("/api/owner/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, pass }),
      });

      const data = (await res.json().catch(() => null)) as
        | { error?: string; debug?: unknown }
        | null;

      if (!res.ok) {
        setMsg(data?.error ?? "Nope — access denied.");
        console.log("[Owner access error]", data);
        return;
      }

      router.replace(next);
    } catch {
      setMsg("Something glitched. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-[calc(100vh-0px)] bg-[#020617]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.22),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(3,7,18,1),_transparent_70%)]" />

      <div className="relative mx-auto flex max-w-xl flex-col items-center px-4 py-14">
        <div className="mb-6 flex items-center gap-3">
          <Image
            src="/logos/images/SmartNet3.png"
            alt="SmartNET"
            width={90}
            height={28}
            className="object-contain drop-shadow-[0_0_14px_rgba(56,189,248,0.35)]"
            priority
          />
          <div className="text-xs text-slate-400">
            Owner Access · Private Console
          </div>
        </div>

        <Card className="w-full rounded-2xl border border-slate-800 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.96),_rgba(2,6,23,1))] shadow-[0_0_60px_rgba(0,0,0,0.85)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-100">
              Enter credentials
            </CardTitle>
            <p className="text-xs text-slate-400">
              This area is for SmartNET operations only.
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={submit} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[0.7rem] text-slate-300">Username</label>
                <input
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-[#020617] px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-600 focus:border-sky-400"
                  placeholder="OWNER_USER"
                  autoComplete="username"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[0.7rem] text-slate-300">Password</label>
                <input
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-[#020617] px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-600 focus:border-sky-400"
                  placeholder="OWNER_PASS"
                  type="password"
                  autoComplete="current-password"
                />
              </div>

              {msg && (
                <div className="rounded-lg border border-rose-500/40 bg-rose-950/30 px-3 py-2 text-xs text-rose-200">
                  {msg}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-gradient-to-r from-[#3fc9ff] to-[#3ea8ff] text-xs font-semibold tracking-wide text-slate-950 shadow-[0_0_26px_rgba(63,201,255,0.85)] hover:from-[#37b6ff] hover:to-[#40c4ff] disabled:opacity-60"
              >
                {loading ? "Checking..." : "Enter dashboard"}
              </Button>

              <p className="pt-2 text-center text-[0.65rem] text-slate-500">
                If you’re not SmartNET ops… the door is politely, firmly locked.
                🔒
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
