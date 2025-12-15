"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type Props = {
  next?: string; // where to go after logout
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
      await fetch("/api/owner/access", { method: "DELETE" }); // clears cookie
    } finally {
      // hard refresh so middleware re-checks cookie immediately
      router.replace(next);
      router.refresh();
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
