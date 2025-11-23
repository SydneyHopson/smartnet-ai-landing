"use client";

import * as React from "react";
import { SmartNetEstimateProvider } from "@/components/smartNetWizard/SmartNetEstimateProvider";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return <SmartNetEstimateProvider>{children}</SmartNetEstimateProvider>;
}
