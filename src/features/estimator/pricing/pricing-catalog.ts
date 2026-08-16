export type CatalogItem = {
  id: string;
  category:
    | "camera"
    | "nvr"
    | "storage"
    | "switch"
    | "gateway"
    | "wifi"
    | "access"
    | "rack"
    | "cable"
    | "termination"
    | "mounting"
    | "ups"
    | "labor";
  name: string;
  manufacturer?: string;
  model?: string;
  unitCost: number;
  laborHours: number;
  unit: "each" | "foot" | "hour";
};

/**
 * SmartNET direct-cost baseline used by the preliminary estimator.
 *
 * Hardware is held near public retail / normal acquisition cost so the
 * pricing engine can add SmartNET overhead and margin in one predictable
 * place. Labor's unitCost is intentionally a burdened INTERNAL field cost,
 * not the customer-facing hourly sell rate. The previous catalog used a
 * sell-rate-like number here and then applied overhead + margin again,
 * which materially overstated labor on multi-system projects.
 */
export const pricingCatalog: CatalogItem[] = [
  {
    id: "camera-standard",
    category: "camera",
    name: "2K Commercial IP Camera",
    manufacturer: "Ubiquiti",
    model: "G5 Bullet",
    unitCost: 129,
    laborHours: 1.1,
    unit: "each",
  },
  {
    id: "camera-dome",
    category: "camera",
    name: "Indoor Dome Camera",
    manufacturer: "Ubiquiti",
    model: "G5 Dome",
    unitCost: 179,
    laborHours: 1.1,
    unit: "each",
  },
  {
    id: "camera-specialty",
    category: "camera",
    name: "Specialty / Enhanced Camera Allowance",
    manufacturer: "Ubiquiti",
    model: "G5 Pro / AI-class allowance",
    unitCost: 399,
    laborHours: 1.5,
    unit: "each",
  },
  {
    id: "camera-junction-box",
    category: "mounting",
    name: "Camera Junction / Weatherproof Mount Allowance",
    unitCost: 39,
    laborHours: 0.1,
    unit: "each",
  },
  {
    id: "nvr-small",
    category: "nvr",
    name: "Network Video Recorder",
    manufacturer: "Ubiquiti",
    model: "UNVR",
    unitCost: 499,
    laborHours: 1.25,
    unit: "each",
  },
  {
    id: "storage-8tb",
    category: "storage",
    name: "8TB Surveillance Storage Drive",
    manufacturer: "Western Digital",
    model: "Purple Pro class",
    unitCost: 220,
    laborHours: 0.15,
    unit: "each",
  },
  {
    id: "switch-24-standard",
    category: "switch",
    name: "24 Port PoE Switch",
    manufacturer: "Ubiquiti",
    model: "USW-24-POE",
    unitCost: 379,
    laborHours: 1,
    unit: "each",
  },
  {
    id: "switch-24-pro",
    category: "switch",
    name: "24 Port Pro PoE Switch",
    manufacturer: "Ubiquiti",
    model: "USW-Pro-24-POE",
    unitCost: 699,
    laborHours: 1.25,
    unit: "each",
  },
  {
    id: "switch-48",
    category: "switch",
    name: "48 Port PoE Switch Allowance",
    manufacturer: "Ubiquiti",
    model: "48-port PoE class",
    unitCost: 899,
    laborHours: 1.5,
    unit: "each",
  },
  {
    id: "gateway",
    category: "gateway",
    name: "Managed Network Gateway Allowance",
    manufacturer: "Ubiquiti",
    model: "UniFi Gateway class",
    unitCost: 279,
    laborHours: 1.25,
    unit: "each",
  },
  {
    id: "wifi-ap",
    category: "wifi",
    name: "Wi-Fi 7 Access Point",
    manufacturer: "Ubiquiti",
    model: "U7 Pro",
    unitCost: 189,
    laborHours: 1,
    unit: "each",
  },
  {
    id: "door-reader",
    category: "access",
    name: "Access Reader",
    manufacturer: "Ubiquiti",
    model: "UA Reader class",
    unitCost: 329,
    laborHours: 1,
    unit: "each",
  },
  {
    id: "door-controller",
    category: "access",
    name: "Door Controller",
    manufacturer: "Ubiquiti",
    model: "UA Hub class",
    unitCost: 499,
    laborHours: 1.25,
    unit: "each",
  },
  {
    id: "door-hardware-allowance",
    category: "access",
    name: "Door Hardware / REX / Contact Allowance",
    unitCost: 275,
    laborHours: 1.5,
    unit: "each",
  },
  {
    id: "rack-small",
    category: "rack",
    name: "Wall-Mount Network Rack",
    manufacturer: "StarTech class",
    unitCost: 325,
    laborHours: 1.75,
    unit: "each",
  },
  {
    id: "rack-full",
    category: "rack",
    name: "Floor Network Rack",
    manufacturer: "StarTech class",
    unitCost: 900,
    laborHours: 3,
    unit: "each",
  },
  {
    id: "patch-panel-24",
    category: "termination",
    name: "24-Port Cat6 Patch Panel",
    unitCost: 95,
    laborHours: 1,
    unit: "each",
  },
  {
    id: "cat6",
    category: "cable",
    name: "Cat6 Plenum Cable",
    unitCost: 0.38,
    laborHours: 0.006,
    unit: "foot",
  },
  {
    id: "cable-endpoint",
    category: "termination",
    name: "Cat6 Termination, Test & Label",
    unitCost: 14,
    laborHours: 0.25,
    unit: "each",
  },
  {
    id: "ups",
    category: "ups",
    name: "Rack UPS Allowance",
    manufacturer: "APC class",
    unitCost: 650,
    laborHours: 0.5,
    unit: "each",
  },
  {
    id: "labor",
    category: "labor",
    name: "Burdened Low-Voltage Field Labor",
    unitCost: 68,
    laborHours: 1,
    unit: "hour",
  },
];
