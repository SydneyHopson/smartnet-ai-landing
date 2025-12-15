"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function OwnerLogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const onLogout = async () => {
    try {
      setLoading(true);
      await fetch("/api/owner/logout", { method: "POST" });
      router.replace("/owner/access");
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={onLogout}
      disabled={loading}
      className="h-8 rounded-full border-emerald-500/40 bg-slate-950/70 px-3 text-[11px] text-emerald-200 hover:bg-emerald-500/10"
    >
      <LogOut className="mr-2 h-3.5 w-3.5" />
      {loading ? "Signing out..." : "Logout"}
    </Button>
  );
}
