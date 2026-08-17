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

function readString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function readStrings(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string" && Boolean(item.trim())).map((item) => item.trim())
    : [];
}

function label(value: string): string {
  return value.replace(/_/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function yesNo(value: unknown): string | null {
  return typeof value === "boolean" ? (value ? "Yes" : "No") : null;
}

export function getProjectType(estimate: SmartNetEstimateSnapshot | null | undefined): string | null {
  if (!estimate) return null;
  return estimate.projectType || readString(readValue(estimate.property, "projectType"));
}

export function getSquareFootage(estimate: SmartNetEstimateSnapshot | null | undefined): number | null {
  if (!estimate) return null;
  return readQuantity(estimate.squareFootage) ?? readQuantity(readValue(estimate.property, "squareFootage"));
}

export function getFloorCount(estimate: SmartNetEstimateSnapshot | null | undefined): number | null {
  return estimate ? readQuantity(readValue(estimate.property, "numberOfFloors")) : null;
}

export function getCameraCount(estimate: SmartNetEstimateSnapshot | null | undefined): number | null {
  if (!estimate || !isRecord(estimate.cameras)) return null;
  const cameras = estimate.cameras;
  const direct = readQuantity(cameras.quantity ?? cameras.count ?? cameras.cameraCount ?? cameras.total);
  if (direct !== null) return direct;
  const values = ["interiorCount", "exteriorCount", "specialtyCount"].map((key) => readQuantity(cameras[key]));
  if (values.every((value) => value === null)) return null;
  return values.reduce<number>((sum, value) => sum + (value ?? 0), 0);
}

export function getWifiApCount(estimate: SmartNetEstimateSnapshot | null | undefined): number | null {
  if (!estimate || !isRecord(estimate.wifi)) return null;
  return readQuantity(estimate.wifi.estimatedAccessPointCount ?? estimate.wifi.accessPointCount ?? estimate.wifi.apCount ?? estimate.wifi.quantity ?? estimate.wifi.count);
}

export function getWifiUserCount(estimate: SmartNetEstimateSnapshot | null | undefined): number | null {
  return estimate && isRecord(estimate.wifi) ? readQuantity(estimate.wifi.estimatedConcurrentUsers) : null;
}

export function getDoorCount(estimate: SmartNetEstimateSnapshot | null | undefined): number | null {
  if (!estimate || !isRecord(estimate.accessControl)) return null;
  return readQuantity(estimate.accessControl.controlledDoorCount ?? estimate.accessControl.doorCount ?? estimate.accessControl.doors ?? estimate.accessControl.quantity ?? estimate.accessControl.count);
}

export function getRecordingDays(estimate: SmartNetEstimateSnapshot | null | undefined): number | null {
  return estimate && isRecord(estimate.cameras) ? readQuantity(estimate.cameras.recordingDays) : null;
}

export function getCableFeet(estimate: SmartNetEstimateSnapshot | null | undefined): number | null {
  return estimate && isRecord(estimate.cabling) ? readQuantity(estimate.cabling.estimatedCableFeet) : null;
}

export function getCoverageProfile(estimate: SmartNetEstimateSnapshot | null | undefined): string | null {
  if (!estimate) return null;
  if (estimate.coverageProfile) return estimate.coverageProfile;
  const parts: string[] = [];
  if (isRecord(estimate.cameras)) {
    const goals = readStrings(estimate.cameras.coverageGoals);
    const days = readQuantity(estimate.cameras.recordingDays);
    const remote = yesNo(estimate.cameras.remoteViewingRequired);
    if (goals.length) parts.push(goals.join(", "));
    if (days !== null) parts.push(`${days} day recording`);
    if (remote === "Yes") parts.push("remote viewing");
  }
  return parts.length ? parts.join(" · ") : null;
}

export function getWifiLayout(estimate: SmartNetEstimateSnapshot | null | undefined): string | null {
  if (!estimate) return null;
  if (estimate.wifiLayout) return estimate.wifiLayout;
  if (!isRecord(estimate.wifi)) return null;
  const parts: string[] = [];
  const aps = getWifiApCount(estimate);
  const goals = readStrings(estimate.wifi.coverageGoals);
  const weak = readStrings(estimate.wifi.weakAreas);
  if (aps !== null) parts.push(`${aps} AP${aps === 1 ? "" : "s"}`);
  if (goals.length) parts.push(goals.join(", "));
  if (weak.length) parts.push(`Weak areas: ${weak.join(", ")}`);
  if (estimate.wifi.guestNetworkRequired === true) parts.push("guest network");
  return parts.length ? parts.join(" · ") : null;
}

export function getDoorsAccess(estimate: SmartNetEstimateSnapshot | null | undefined): string | null {
  if (!estimate) return null;
  if (estimate.doorsAccess) return estimate.doorsAccess;
  if (!isRecord(estimate.accessControl)) return null;
  const parts: string[] = [];
  const doors = getDoorCount(estimate);
  const exterior = readQuantity(estimate.accessControl.exteriorDoorCount);
  const interior = readQuantity(estimate.accessControl.interiorDoorCount);
  const credentials = readStrings(estimate.accessControl.credentialTypes);
  if (doors !== null) parts.push(`${doors} controlled door${doors === 1 ? "" : "s"}`);
  if (exterior !== null && exterior > 0) parts.push(`${exterior} exterior`);
  if (interior !== null && interior > 0) parts.push(`${interior} interior`);
  if (credentials.length) parts.push(credentials.map(label).join(" / "));
  if (estimate.accessControl.remoteManagementRequired === true) parts.push("remote management");
  return parts.length ? parts.join(" · ") : null;
}

export function getWiringStyle(estimate: SmartNetEstimateSnapshot | null | undefined): string | null {
  if (!estimate) return null;
  if (estimate.wiringStyle) return estimate.wiringStyle;
  if (!isRecord(estimate.cabling)) return null;
  const parts: string[] = [];
  const cableType = readString(estimate.cabling.preferredCableType);
  const wiring = readString(estimate.cabling.wiringStyle);
  const pathways = readStrings(estimate.cabling.pathwayType);
  if (cableType && cableType !== "unknown") parts.push(label(cableType));
  if (wiring && wiring !== "unknown") parts.push(`${label(wiring)} runs`);
  if (pathways.length) parts.push(pathways.map(label).join(", "));
  return parts.length ? parts.join(" · ") : null;
}

export function getRackLocation(estimate: SmartNetEstimateSnapshot | null | undefined): string | null {
  if (!estimate) return null;
  return estimate.rackLocation || readString(readValue(estimate.network, "rackLocation"));
}

export function getTimeline(estimate: SmartNetEstimateSnapshot | null | undefined): string | null {
  if (!estimate) return null;
  if (estimate.timeline) return estimate.timeline;
  if (isRecord(estimate.installation)) {
    const days = readQuantity(estimate.installation.estimatedDurationDays);
    if (days !== null) return `${days} estimated installation day${days === 1 ? "" : "s"}`;
  }
  const intent = isRecord(estimate.customerIntent) ? readString(estimate.customerIntent.summary) : null;
  const match = intent?.match(/\b(?:within\s+)?(?:the\s+next\s+)?(\d+\s*[–-]\s*\d+\s*(?:days?|weeks?|months?))\b/i);
  return match?.[1] ?? null;
}

export function getScopeNotes(estimate: SmartNetEstimateSnapshot | null | undefined): string | null {
  if (!estimate) return null;
  if (estimate.notes) return estimate.notes;
  const assessment = isRecord(estimate.assessment) ? readString(estimate.assessment.scopeSummary) : null;
  const intent = isRecord(estimate.customerIntent) ? readString(estimate.customerIntent.summary) : null;
  return assessment || intent;
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

export function buildEstimateSummary(estimate: SmartNetEstimateSnapshot | null | undefined): string {
  if (!estimate) return "Direct booking — no AI estimate completed yet.";
  const parts: string[] = [];
  const projectType = getProjectType(estimate);
  const sqft = getSquareFootage(estimate);
  const floors = getFloorCount(estimate);
  const cameras = getCameraCount(estimate);
  const recordingDays = getRecordingDays(estimate);
  const aps = getWifiApCount(estimate);
  const users = getWifiUserCount(estimate);
  const doors = getDoorCount(estimate);
  const cableFeet = getCableFeet(estimate);
  const rackLocation = getRackLocation(estimate);
  const timeline = getTimeline(estimate);
  const range = getPriceRange(estimate);
  if (projectType) parts.push(`Type: ${label(projectType)}`);
  if (sqft !== null) parts.push(`Sq Ft: ${sqft.toLocaleString()}`);
  if (floors !== null) parts.push(`Floors: ${floors}`);
  if (cameras !== null) parts.push(`Cameras: ${cameras}`);
  if (recordingDays !== null) parts.push(`Recording: ${recordingDays} days`);
  if (aps !== null) parts.push(`Wi-Fi APs: ${aps}`);
  if (users !== null) parts.push(`Wi-Fi users/devices: ${users}`);
  if (doors !== null) parts.push(`Access doors: ${doors}`);
  if (cableFeet !== null) parts.push(`Cable: ${cableFeet.toLocaleString()} ft`);
  if (rackLocation) parts.push(`Rack: ${rackLocation}`);
  if (timeline) parts.push(`Timeline: ${timeline}`);
  if (isRecord(estimate.network)) {
    const rackRequired = yesNo(estimate.network.rackRequired);
    const vlanRequired = yesNo(estimate.network.vlanRequired);
    if (rackRequired) parts.push(`Rack required: ${rackRequired}`);
    if (vlanRequired) parts.push(`VLANs: ${vlanRequired}`);
  }
  if (range.low !== null || range.high !== null) parts.push(`Estimate: $${range.low?.toLocaleString() ?? "?"}–$${range.high?.toLocaleString() ?? "?"}`);
  return parts.length ? parts.join(" • ") : "SmartNET AI estimate attached.";
}
