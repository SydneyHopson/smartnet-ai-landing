import type { ReactNode } from "react";
import { OwnerAIShell } from "@/components/owner/ai/OwnerAIShell";

export default function OwnerLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <OwnerAIShell />
    </>
  );
}
