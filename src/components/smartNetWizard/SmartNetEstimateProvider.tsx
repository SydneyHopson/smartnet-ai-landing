"use client";

import * as React from "react";

export type ProjectType = "home" | "office" | "retail" | "industrial";

export type FocusState = {
  cameras: boolean;
  wifi: boolean;
  accessControl: boolean;
};

export type DevicesState = {
  cameras: "light" | "standard" | "heavy";
  aps: "light" | "standard" | "mesh";
  doors: "none" | "a-few" | "multi-door";
};

export type ExtrasState = {
  speakers: boolean;
  wallDisplays: boolean;
  miniRack: boolean;
  batteryBackup: boolean;
};

export type StyleState = {
  wiring: "exposed-conduit" | "hidden-in-walls" | "mix";
  rackLocation: "closet" | "utility" | "idc";
  urgency: "flexible" | "soon" | "rush";
};

export type SmartNetEstimate = {
  projectType: ProjectType;
  squareFootage: number;
  focus: FocusState;
  notes: string;

  devices: DevicesState;
  extras: ExtrasState;
  style: StyleState;

  priceLow: number;
  priceHigh: number;
  estCameras: number;
  estAps: number;
};

type SmartNetEstimateContextValue = {
  estimate: SmartNetEstimate;
  updateEstimate: (partial: Partial<SmartNetEstimate>) => void;
  recomputePrice: () => void;
};

const SmartNetEstimateContext =
  React.createContext<SmartNetEstimateContextValue | null>(null);

const baseEstimate: SmartNetEstimate = {
  projectType: "home",
  squareFootage: 1800,
  focus: { cameras: true, wifi: true, accessControl: false },
  notes: "",

  devices: {
    cameras: "standard",
    aps: "standard",
    doors: "none",
  },
  extras: {
    speakers: false,
    wallDisplays: false,
    miniRack: false,
    batteryBackup: false,
  },
  style: {
    wiring: "mix",
    rackLocation: "closet",
    urgency: "flexible",
  },

  priceLow: 0,
  priceHigh: 0,
  estCameras: 0,
  estAps: 0,
};

export function SmartNetEstimateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [estimate, setEstimate] = React.useState<SmartNetEstimate>(() => {
    const initial = { ...baseEstimate };
    return computePrice(initial);
  });

  const updateEstimate = React.useCallback(
    (partial: Partial<SmartNetEstimate>) => {
      setEstimate((prev) => {
        const merged: SmartNetEstimate = {
          ...prev,
          ...partial,
          focus: { ...prev.focus, ...(partial.focus || {}) },
          devices: { ...prev.devices, ...(partial.devices || {}) },
          extras: { ...prev.extras, ...(partial.extras || {}) },
          style: { ...prev.style, ...(partial.style || {}) },
        };

        return computePrice(merged);
      });
    },
    []
  );

  const recomputePrice = React.useCallback(() => {
    setEstimate((prev) => computePrice(prev));
  }, []);

  const value: SmartNetEstimateContextValue = {
    estimate,
    updateEstimate,
    recomputePrice,
  };

  return (
    <SmartNetEstimateContext.Provider value={value}>
      {children}
    </SmartNetEstimateContext.Provider>
  );
}

export function useSmartNetEstimate() {
  const ctx = React.useContext(SmartNetEstimateContext);
  if (!ctx) {
    throw new Error(
      "useSmartNetEstimate must be used within a SmartNetEstimateProvider"
    );
  }
  return ctx;
}

// --- pricing brain -------------------------------------------------

function computePrice(input: SmartNetEstimate): SmartNetEstimate {
  const estCameras = input.focus.cameras
    ? Math.max(3, Math.round(input.squareFootage / 700))
    : 0;

  const estAps = input.focus.wifi
    ? Math.max(1, Math.round(input.squareFootage / 1500))
    : 0;

  const baseRateMap: Record<ProjectType, number> = {
    home: 1.8,
    office: 2.4,
    retail: 2.1,
    industrial: 2.6,
  };

  let rate = baseRateMap[input.projectType];

  if (input.focus.cameras) rate += 0.25;
  if (input.focus.wifi) rate += 0.15;
  if (input.focus.accessControl) rate += 0.35;

  if (input.devices.cameras === "heavy") rate += 0.4;
  else if (input.devices.cameras === "light") rate -= 0.15;

  if (input.devices.aps === "mesh") rate += 0.25;

  if (input.devices.doors === "a-few") rate += 0.2;
  if (input.devices.doors === "multi-door") rate += 0.55;

  if (input.extras.speakers) rate += 0.2;
  if (input.extras.wallDisplays) rate += 0.25;
  if (input.extras.miniRack) rate += 0.3;
  if (input.extras.batteryBackup) rate += 0.25;

  if (input.style.wiring === "hidden-in-walls") rate += 0.4;
  if (input.style.urgency === "rush") rate += 0.35;

  const raw = input.squareFootage * rate;
  const priceLow = Math.round(raw * 0.85);
  const priceHigh = Math.round(raw * 1.1);

  return {
    ...input,
    estCameras,
    estAps,
    priceLow,
    priceHigh,
  };
}
