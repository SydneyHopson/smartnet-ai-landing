"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type Props = {
  next?: string;
  className?: string;
  variant?: React.ComponentProps<typeof Button>["variant"];
};

export function OwnerLogoutButton({
  next = "/owner/access",
  className,
  variant = "outline",
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  async function logout() {
    try {
      setLoading(true);
      const response = await fetch("/api/owner/access", { method: "DELETE" });

      if (!response.ok) {
        throw new Error("Unable to sign out");
      }

      router.replace(next);
      router.refresh();
    } catch (error) {
      console.error("[owner logout]", error);
      setLoading(false);
    }
  }

  return (
    <Button
      type="button"
      variant={variant}
      onClick={logout}
      disabled={loading}
      className={className}
    >
      {loading ? "Signing out..." : "Logout"}
    </Button>
  );
}
