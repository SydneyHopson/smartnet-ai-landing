import type { ReactNode } from "react";
import { OwnerAIShell } from "@/components/owner/ai/OwnerAIShell";
import { OwnerGlobalNavigation } from "@/components/owner/OwnerGlobalNavigation";

export default function OwnerLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <OwnerGlobalNavigation />
      {children}
      <OwnerAIShell />
    </>
  );
}
