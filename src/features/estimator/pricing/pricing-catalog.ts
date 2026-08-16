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
 * place. Labor's unitCost is a burdened INTERNAL field cost, not a customer
 * sell rate.
 *
 * Catalog 2.1 recalibrates UniFi Protect / Access items against current
 * public Ubiquiti pricing and separates residential door-access kits from
 * larger commercial per-door allowances.
 */
export const pricingCatalog: CatalogItem[] = [
  { id: "camera-standard", category: "camera", name: "2K IP Camera", manufacturer: "Ubiquiti", model: "G5 Bullet", unitCost: 129, laborHours: 1.0, unit: "each" },
  { id: "camera-dome", category: "camera", name: "Indoor Dome Camera", manufacturer: "Ubiquiti", model: "G5 Dome", unitCost: 179, laborHours: 1.0, unit: "each" },
  { id: "camera-specialty", category: "camera", name: "Specialty / Enhanced Camera Allowance", manufacturer: "Ubiquiti", model: "G5 Pro / AI-class allowance", unitCost: 399, laborHours: 1.4, unit: "each" },
  { id: "camera-junction-box", category: "mounting", name: "Camera Junction / Weatherproof Mount Allowance", unitCost: 39, laborHours: 0.1, unit: "each" },

  { id: "nvr-small", category: "nvr", name: "Network Video Recorder", manufacturer: "Ubiquiti", model: "UNVR", unitCost: 299, laborHours: 1.0, unit: "each" },
  { id: "storage-8tb", category: "storage", name: "8TB Surveillance Storage Drive", manufacturer: "Western Digital", model: "Purple Pro class", unitCost: 220, laborHours: 0.1, unit: "each" },

  { id: "switch-16-standard", category: "switch", name: "16 Port PoE Switch", manufacturer: "Ubiquiti", model: "USW-16-POE", unitCost: 299, laborHours: 0.8, unit: "each" },
  { id: "switch-24-standard", category: "switch", name: "24 Port PoE Switch", manufacturer: "Ubiquiti", model: "USW-24-POE", unitCost: 379, laborHours: 1.0, unit: "each" },
  { id: "switch-24-pro", category: "switch", name: "24 Port Pro PoE Switch", manufacturer: "Ubiquiti", model: "USW-Pro-24-POE", unitCost: 699, laborHours: 1.25, unit: "each" },
  { id: "switch-48", category: "switch", name: "48 Port PoE Switch", manufacturer: "Ubiquiti", model: "USW-48-POE class", unitCost: 589, laborHours: 1.5, unit: "each" },
  { id: "gateway", category: "gateway", name: "Managed Network Gateway Allowance", manufacturer: "Ubiquiti", model: "UniFi Gateway class", unitCost: 279, laborHours: 1.0, unit: "each" },
  { id: "wifi-ap", category: "wifi", name: "Wi-Fi 7 Access Point", manufacturer: "Ubiquiti", model: "U7 Pro", unitCost: 189, laborHours: 0.8, unit: "each" },

  // Residential access: current UniFi single-door starter-kit class pricing,
  // plus a realistic lock/interface allowance. This avoids charging a home
  // for a $499 commercial hub + $329 reader + $275 hardware allowance on
  // every single door.
  { id: "door-starter-kit", category: "access", name: "Single-Door Access Starter Kit", manufacturer: "Ubiquiti", model: "Door Starter Kit class", unitCost: 289, laborHours: 1.25, unit: "each" },
  { id: "door-lock-residential", category: "access", name: "Electric Lock / Door Interface Allowance", manufacturer: "Ubiquiti", model: "Electric Lock class", unitCost: 99, laborHours: 1.25, unit: "each" },
  { id: "access-keyfob-pack", category: "access", name: "Access Keyfob Pack Allowance", manufacturer: "Ubiquiti", model: "Pocket Keyfob 10-Pack", unitCost: 99, laborHours: 0.1, unit: "each" },

  // Commercial access remains modular because door hardware and reader
  // requirements vary materially by opening and life-safety conditions.
  { id: "door-reader", category: "access", name: "Access Reader", manufacturer: "Ubiquiti", model: "Reader class", unitCost: 199, laborHours: 1.0, unit: "each" },
  { id: "door-controller", category: "access", name: "Door Controller", manufacturer: "Ubiquiti", model: "Door Hub", unitCost: 199, laborHours: 1.25, unit: "each" },
  { id: "door-hardware-allowance", category: "access", name: "Door Hardware / REX / Contact Allowance", unitCost: 225, laborHours: 1.5, unit: "each" },

  { id: "rack-small", category: "rack", name: "Wall-Mount Network Rack", manufacturer: "StarTech class", unitCost: 275, laborHours: 1.5, unit: "each" },
  { id: "rack-full", category: "rack", name: "Floor Network Rack", manufacturer: "StarTech class", unitCost: 900, laborHours: 3.0, unit: "each" },
  { id: "patch-panel-24", category: "termination", name: "24-Port Cat6 Patch Panel", unitCost: 95, laborHours: 0.8, unit: "each" },
  { id: "cat6", category: "cable", name: "Cat6 Cable Allowance", unitCost: 0.32, laborHours: 0.005, unit: "foot" },
  { id: "cable-endpoint", category: "termination", name: "Cat6 Termination, Test & Label", unitCost: 12, laborHours: 0.2, unit: "each" },
  { id: "ups-small", category: "ups", name: "Small Rack UPS Allowance", manufacturer: "APC class", unitCost: 225, laborHours: 0.35, unit: "each" },
  { id: "ups", category: "ups", name: "Commercial Rack UPS Allowance", manufacturer: "APC class", unitCost: 650, laborHours: 0.5, unit: "each" },
  { id: "labor", category: "labor", name: "Burdened Low-Voltage Field Labor", unitCost: 68, laborHours: 1, unit: "hour" },
];
