export type SmartNetEstimateSnapshot = {
  projectType?: string;
  squareFootage?: number;
  focus?: string[];
  coverageProfile?: string;
  wifiLayout?: string;
  doorsAccess?: string;
  extras?: string[];
  wiringStyle?: string;
  rackLocation?: string;
  timeline?: string;
  roughLow?: number;
  roughHigh?: number;
  notes?: string;
  customerIntent?: unknown;
  property?: unknown;
  cameras?: unknown;
  network?: unknown;
  wifi?: unknown;
  accessControl?: unknown;
  cabling?: unknown;
  installation?: unknown;
  equipment?: unknown;
  pricing?: unknown;
  assessment?: unknown;
  metadata?: unknown;
};

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function readValue(source: unknown, key: string): unknown {
  return isRecord(source) ? source[key] : undefined;
}

export function readQuantity(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const n = Number(value.replace(/[^\d.-]/g, ""));
    return Number.isFinite(n) ? n : null;
  }
  if (isRecord(value)) return readQuantity(value.value);
  return null;
}

export function getProjectType(estimate: SmartNetEstimateSnapshot | null | undefined): string | null {
  if (!estimate) return null;
  if (estimate.projectType) return estimate.projectType;
  const value = readValue(estimate.property, "projectType");
  return typeof value === "string" && value ? value : null;
}

export function getSquareFootage(estimate: SmartNetEstimateSnapshot | null | undefined): number | null {
  if (!estimate) return null;
  return readQuantity(estimate.squareFootage) ?? readQuantity(readValue(estimate.property, "squareFootage"));
}

export function getCameraCount(estimate: SmartNetEstimateSnapshot | null | undefined): number | null {
  if (!estimate || !isRecord(estimate.cameras)) return null;

  const cameras = estimate.cameras;
  const direct = readQuantity(
    cameras.quantity ?? cameras.count ?? cameras.cameraCount ?? cameras.total
  );

  if (direct !== null) return direct;

  const values = ["interiorCount", "exteriorCount", "specialtyCount"].map((key) =>
    readQuantity(cameras[key])
  );

  if (values.every((value) => value === null)) return null;
  return values.reduce<number>((sum, value) => sum + (value ?? 0), 0);
}

export function getWifiApCount(estimate: SmartNetEstimateSnapshot | null | undefined): number | null {
  if (!estimate || !isRecord(estimate.wifi)) return null;
  return readQuantity(
    estimate.wifi.estimatedAccessPointCount ??
      estimate.wifi.accessPointCount ??
      estimate.wifi.apCount ??
      estimate.wifi.quantity ??
      estimate.wifi.count
  );
}

export function getWifiUserCount(estimate: SmartNetEstimateSnapshot | null | undefined): number | null {
  if (!estimate || !isRecord(estimate.wifi)) return null;
  return readQuantity(estimate.wifi.estimatedConcurrentUsers);
}

export function getDoorCount(estimate: SmartNetEstimateSnapshot | null | undefined): number | null {
  if (!estimate || !isRecord(estimate.accessControl)) return null;
  return readQuantity(
    estimate.accessControl.controlledDoorCount ??
      estimate.accessControl.doorCount ??
      estimate.accessControl.doors ??
      estimate.accessControl.quantity ??
      estimate.accessControl.count
  );
}

export function getRecordingDays(estimate: SmartNetEstimateSnapshot | null | undefined): number | null {
  if (!estimate || !isRecord(estimate.cameras)) return null;
  return readQuantity(estimate.cameras.recordingDays);
}

export function getCableFeet(estimate: SmartNetEstimateSnapshot | null | undefined): number | null {
  if (!estimate || !isRecord(estimate.cabling)) return null;
  return readQuantity(estimate.cabling.estimatedCableFeet);
}

export function getPriceRange(estimate: SmartNetEstimateSnapshot | null | undefined): { low: number | null; high: number | null } {
  if (!estimate) return { low: null, high: null };
  const pricing = isRecord(estimate.pricing) ? estimate.pricing : {};
  return {
    low: readQuantity(estimate.roughLow) ?? readQuantity(pricing.estimatedLow ?? pricing.estimateLow ?? pricing.low),
    high: readQuantity(estimate.roughHigh) ?? readQuantity(pricing.estimatedHigh ?? pricing.estimateHigh ?? pricing.high),
  };
}

export function getEstimateTotal(estimate: SmartNetEstimateSnapshot | null | undefined): number | null {
  const { low, high } = getPriceRange(estimate);
  if (low !== null && high !== null) return (low + high) / 2;
  return high ?? low;
}

function boolLabel(value: unknown): string | null {
  return typeof value === "boolean" ? (value ? "Yes" : "No") : null;
}

export function buildEstimateSummary(estimate: SmartNetEstimateSnapshot | null | undefined): string {
  if (!estimate) return "Direct booking — no AI estimate completed yet.";
  const parts: string[] = [];
  const projectType = getProjectType(estimate);
  const sqft = getSquareFootage(estimate);
  const cameras = getCameraCount(estimate);
  const recordingDays = getRecordingDays(estimate);
  const aps = getWifiApCount(estimate);
  const users = getWifiUserCount(estimate);
  const doors = getDoorCount(estimate);
  const cableFeet = getCableFeet(estimate);
  const range = getPriceRange(estimate);

  if (projectType) parts.push(`Type: ${projectType}`);
  if (sqft !== null) parts.push(`Sq Ft: ${sqft.toLocaleString()}`);
  if (cameras !== null) parts.push(`Cameras: ${cameras}`);
  if (recordingDays !== null) parts.push(`Recording: ${recordingDays} days`);
  if (aps !== null) parts.push(`Wi-Fi APs: ${aps}`);
  if (users !== null) parts.push(`Wi-Fi users/devices: ${users}`);
  if (doors !== null) parts.push(`Access doors: ${doors}`);
  if (cableFeet !== null) parts.push(`Cable: ${cableFeet.toLocaleString()} ft`);

  if (isRecord(estimate.network)) {
    const rackRequired = boolLabel(estimate.network.rackRequired);
    const vlanRequired = boolLabel(estimate.network.vlanRequired);
    if (rackRequired) parts.push(`Rack required: ${rackRequired}`);
    if (vlanRequired) parts.push(`VLANs: ${vlanRequired}`);
  }

  if (range.low !== null || range.high !== null) {
    parts.push(`Estimate: $${range.low?.toLocaleString() ?? "?"}–$${range.high?.toLocaleString() ?? "?"}`);
  }

  return parts.length ? parts.join(" • ") : "SmartNET AI estimate attached.";
}
