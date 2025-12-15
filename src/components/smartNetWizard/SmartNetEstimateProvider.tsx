"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";

/* ---------- Types ---------- */

export type ProjectType = "home" | "office" | "retail" | "industrial";

export type CoveragePreset = "entry" | "common" | "full";
export type WifiLayoutPreset = "few" | "balanced" | "dense";
export type AccessPreset = "none" | "fewDoors" | "manyDoors";

export type WiringStyle = "exposed" | "hidden" | "mix";
export type RackLocation = "hall" | "garage" | "dedicated";
export type TimelinePreference = "flexible" | "month" | "rush";

export type FocusState = {
  cameras: boolean;
  wifi: boolean;
  accessControl: boolean;
};

export type ExtrasState = {
  speakers: boolean;
  wallDisplays: boolean;
  miniRack: boolean;
  batteryUps: boolean;
};

export type SmartNetEstimate = {
  projectType: ProjectType;
  squareFootage: number;
  focus: FocusState;
  notes: string;

  // Step 2
  coveragePreset: CoveragePreset | null;
  wifiLayoutPreset: WifiLayoutPreset | null;
  accessPreset: AccessPreset | null;
  extras: ExtrasState;

  // Step 3
  wiringStyle: WiringStyle | null;
  rackLocation: RackLocation | null;
  timeline: TimelinePreference | null;

  // Computed
  roughLow: number;
  roughHigh: number;
};

/**
 * This matches the flattened estimate we store / return from magic-link restore.
 */
export type MagicLinkEstimate = {
  projectType?: string;
  squareFootage?: number;
  focus?: string[]; // ["Cameras", "Wi-Fi & APs", "Access control"]
  coverageProfile?: string; // "Entry points only" | "Most common areas" | "Full coverage"
  wifiLayout?: string; // "Few APs" | "Balanced coverage" | "Dense mesh"
  doorsAccess?: string; // "No access control" | "Front/back + 1–2 doors" | "Many internal doors"
  extras?: string[]; // "Ceiling speakers", "Wall displays / screens", "Mini network rack", "Battery backup / UPS"
  wiringStyle?: string; // "Exposed conduit runs" | "Hidden in walls / ceilings" | "Mix of both"
  rackLocation?: string; // "Hall / office closet" | "Garage / utility room" | "Dedicated IDF / MDF"
  timeline?: string; // "Flexible" | "Within a month" | "ASAP / rush"
  roughLow?: number;
  roughHigh?: number;
  notes?: string;
};

type SmartNetEstimateContextValue = {
  estimate: SmartNetEstimate;
  updateEstimate: (patch: Partial<SmartNetEstimate>) => void;
  hydrateFromMagicLink: (flat: MagicLinkEstimate) => void;
};

/* ---------- Context ---------- */

const SmartNetEstimateContext =
  React.createContext<SmartNetEstimateContextValue | null>(null);

const initialEstimate: SmartNetEstimate = {
  projectType: "home",
  squareFootage: 1500,
  focus: {
    cameras: true,
    wifi: true,
    accessControl: false,
  },
  notes: "",

  coveragePreset: null,
  wifiLayoutPreset: null,
  accessPreset: null,
  extras: {
    speakers: false,
    wallDisplays: false,
    miniRack: false,
    batteryUps: false,
  },

  wiringStyle: null,
  rackLocation: null,
  timeline: null,

  roughLow: 0,
  roughHigh: 0,
};

/* ---------- Provider ---------- */

export function SmartNetEstimateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [estimate, setEstimate] =
    React.useState<SmartNetEstimate>(initialEstimate);

  const updateEstimate = React.useCallback(
    (patch: Partial<SmartNetEstimate>) => {
      setEstimate((prev) => ({
        ...prev,
        ...patch,
        // keep nested objects merged instead of overwritten
        focus: patch.focus ? { ...prev.focus, ...patch.focus } : prev.focus,
        extras: patch.extras ? { ...prev.extras, ...patch.extras } : prev.extras,
      }));
    },
    []
  );

  // 💧 Hydrate from magic-link flat estimate (coming back from Sanity/API)
  const hydrateFromMagicLink = React.useCallback((flat: MagicLinkEstimate) => {
    setEstimate((prev) => {
      // Project type (we stored the internal slug like "home" | "office")
      let projectType = prev.projectType;
      if (
        flat.projectType === "home" ||
        flat.projectType === "office" ||
        flat.projectType === "retail" ||
        flat.projectType === "industrial"
      ) {
        projectType = flat.projectType;
      }

      const squareFootage =
        typeof flat.squareFootage === "number"
          ? flat.squareFootage
          : prev.squareFootage;

      const focus: FocusState = {
        cameras: flat.focus?.includes("Cameras") ?? prev.focus.cameras,
        wifi: flat.focus?.includes("Wi-Fi & APs") ?? prev.focus.wifi,
        accessControl:
          flat.focus?.includes("Access control") ?? prev.focus.accessControl,
      };

      // coverageProfile → coveragePreset
      let coveragePreset = prev.coveragePreset;
      if (flat.coverageProfile === "Entry points only") {
        coveragePreset = "entry";
      } else if (flat.coverageProfile === "Most common areas") {
        coveragePreset = "common";
      } else if (flat.coverageProfile === "Full coverage") {
        coveragePreset = "full";
      }

      // wifiLayout → wifiLayoutPreset
      let wifiLayoutPreset = prev.wifiLayoutPreset;
      if (flat.wifiLayout === "Few APs") {
        wifiLayoutPreset = "few";
      } else if (flat.wifiLayout === "Balanced coverage") {
        wifiLayoutPreset = "balanced";
      } else if (flat.wifiLayout === "Dense mesh") {
        wifiLayoutPreset = "dense";
      }

      // doorsAccess → accessPreset
      let accessPreset = prev.accessPreset;
      if (flat.doorsAccess === "No access control") {
        accessPreset = "none";
      } else if (flat.doorsAccess === "Front/back + 1–2 doors") {
        accessPreset = "fewDoors";
      } else if (flat.doorsAccess === "Many internal doors") {
        accessPreset = "manyDoors";
      }

      // extras array → ExtrasState
      const extras: ExtrasState = {
        speakers:
          flat.extras?.includes("Ceiling speakers") ?? prev.extras.speakers,
        wallDisplays:
          flat.extras?.includes("Wall displays / screens") ??
          prev.extras.wallDisplays,
        miniRack:
          flat.extras?.includes("Mini network rack") ?? prev.extras.miniRack,
        batteryUps:
          flat.extras?.includes("Battery backup / UPS") ??
          prev.extras.batteryUps,
      };

      // wiringStyle label → wiringStyle enum
      let wiringStyle = prev.wiringStyle;
      if (flat.wiringStyle === "Exposed conduit runs") {
        wiringStyle = "exposed";
      } else if (flat.wiringStyle === "Hidden in walls / ceilings") {
        wiringStyle = "hidden";
      } else if (flat.wiringStyle === "Mix of both") {
        wiringStyle = "mix";
      }

      // rackLocation label → rackLocation enum
      let rackLocation = prev.rackLocation;
      if (flat.rackLocation === "Hall / office closet") {
        rackLocation = "hall";
      } else if (flat.rackLocation === "Garage / utility room") {
        rackLocation = "garage";
      } else if (flat.rackLocation === "Dedicated IDF / MDF") {
        rackLocation = "dedicated";
      }

      // timeline label → timeline enum
      let timeline = prev.timeline;
      if (flat.timeline === "Flexible") {
        timeline = "flexible";
      } else if (flat.timeline === "Within a month") {
        timeline = "month";
      } else if (flat.timeline === "ASAP / rush") {
        timeline = "rush";
      }

      return {
        ...prev,
        projectType,
        squareFootage,
        focus,
        coveragePreset,
        wifiLayoutPreset,
        accessPreset,
        extras,
        wiringStyle,
        rackLocation,
        timeline,
        notes: flat.notes ?? prev.notes,
        // roughLow / roughHigh are recomputed below
      };
    });
  }, []);

  /**
   * ✅ Auto-resume from ?resumeToken=...
   * - Fetches /api/magic-link/[token]
   * - Hydrates estimate
   * - Cleans URL to remove resumeToken (prevents re-hydration loops)
   */
  const didResumeRef = React.useRef(false);

  React.useEffect(() => {
    const token = searchParams?.get("resumeToken");
    if (!token) return;
    if (didResumeRef.current) return;

    didResumeRef.current = true;

    (async () => {
      try {
        const res = await fetch(`/api/magic-link/${encodeURIComponent(token)}`, {
          method: "GET",
          cache: "no-store",
        });

        if (!res.ok) return;

        const data = (await res.json()) as {
          ok?: boolean;
          isExpired?: boolean;
          estimate?: MagicLinkEstimate | null;
        };

        // If expired, we do nothing here; your /quote/[token] page already handles UX.
        if (!data?.ok) return;
        if (data.isExpired) return;
        if (!data.estimate) return;

        hydrateFromMagicLink(data.estimate);

        // ✅ Clean the URL: remove resumeToken so refresh doesn't re-run hydration
        const next = new URL(window.location.href);
        next.searchParams.delete("resumeToken");
        router.replace(next.pathname + next.search, { scroll: false });
      } catch (e) {
        console.warn("[SmartNET] resumeToken hydrate failed", e);
      }
    })();
  }, [searchParams, router, hydrateFromMagicLink]);

  // 🔮 Recalculate rough range whenever inputs change (but NOT when roughLow/High change)
  React.useEffect(() => {
    const {
      projectType,
      squareFootage,
      focus,
      coveragePreset,
      wifiLayoutPreset,
      accessPreset,
      extras,
      wiringStyle,
      timeline,
    } = estimate;

    const sqft = Math.max(squareFootage || 0, 0);

    if (!sqft) {
      setEstimate((prev) => ({
        ...prev,
        roughLow: 0,
        roughHigh: 0,
      }));
      return;
    }

    // Base cost per ft² by project type (ballpark)
    let baseLowPerSq = 3;
    let baseHighPerSq = 6;

    if (projectType === "office") {
      baseLowPerSq = 4;
      baseHighPerSq = 8;
    } else if (projectType === "retail") {
      baseLowPerSq = 4;
      baseHighPerSq = 9;
    } else if (projectType === "industrial") {
      baseLowPerSq = 5;
      baseHighPerSq = 10;
    }

    // Focus multipliers
    let focusFactor = 1;
    if (focus.cameras) focusFactor += 0.1;
    if (focus.wifi) focusFactor += 0.05;
    if (focus.accessControl) focusFactor += 0.15;

    // Coverage density
    let coverageFactor = 1;
    if (coveragePreset === "entry") coverageFactor = 0.9;
    if (coveragePreset === "common") coverageFactor = 1.05;
    if (coveragePreset === "full") coverageFactor = 1.2;

    // Wi-Fi layout
    let wifiFactor = 1;
    if (wifiLayoutPreset === "few") wifiFactor = 0.95;
    if (wifiLayoutPreset === "balanced") wifiFactor = 1;
    if (wifiLayoutPreset === "dense") wifiFactor = 1.1;

    // Access control
    let accessFactor = 1;
    if (accessPreset === "fewDoors") accessFactor = 1.08;
    if (accessPreset === "manyDoors") accessFactor = 1.18;

    // Extras add-ons
    let extrasBump = 0;
    if (extras.speakers) extrasBump += 0.05;
    if (extras.wallDisplays) extrasBump += 0.06;
    if (extras.miniRack) extrasBump += 0.04;
    if (extras.batteryUps) extrasBump += 0.04;

    // Wiring style
    let wiringFactor = 1;
    if (wiringStyle === "exposed") wiringFactor = 0.95;
    if (wiringStyle === "hidden") wiringFactor = 1.12;
    if (wiringStyle === "mix") wiringFactor = 1.05;

    // Timeline
    let timelineFactor = 1;
    if (timeline === "flexible") timelineFactor = 0.97;
    if (timeline === "month") timelineFactor = 1;
    if (timeline === "rush") timelineFactor = 1.12;

    const combinedFactor =
      focusFactor *
      coverageFactor *
      wifiFactor *
      accessFactor *
      wiringFactor *
      timelineFactor *
      (1 + extrasBump);

    const rawLow = sqft * baseLowPerSq * combinedFactor;
    const rawHigh = sqft * baseHighPerSq * combinedFactor;

    const minLow = 800;
    const low = Math.max(Math.round(rawLow / 100) * 100, minLow);
    const high = Math.max(Math.round(rawHigh / 100) * 100, low + 500);

    setEstimate((prev) => ({
      ...prev,
      roughLow: low,
      roughHigh: high,
    }));
  }, [
    estimate.projectType,
    estimate.squareFootage,
    estimate.focus,
    estimate.coveragePreset,
    estimate.wifiLayoutPreset,
    estimate.accessPreset,
    estimate.extras,
    estimate.wiringStyle,
    estimate.timeline,
  ]);

  const value: SmartNetEstimateContextValue = React.useMemo(
    () => ({ estimate, updateEstimate, hydrateFromMagicLink }),
    [estimate, updateEstimate, hydrateFromMagicLink]
  );

  return (
    <SmartNetEstimateContext.Provider value={value}>
      {children}
    </SmartNetEstimateContext.Provider>
  );
}

/* ---------- Hook ---------- */

export function useSmartNetEstimate(): SmartNetEstimateContextValue {
  const ctx = React.useContext(SmartNetEstimateContext);
  if (!ctx) {
    throw new Error(
      "useSmartNetEstimate must be used within a SmartNetEstimateProvider"
    );
  }
  return ctx;
}
