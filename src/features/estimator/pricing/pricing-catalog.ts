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
 * SmartNET direct-cost catalog.
 *
 * Residential jobs intentionally use a HYBRID BOM: reliable core networking
 * where it matters, value-priced commodity infrastructure, and value camera
 * options for normal home coverage. Commercial jobs retain the higher-spec
 * baseline unless the estimator identifies a small, simple, reusable-infra
 * commercial refresh where a value commercial tier is appropriate.
 */
export const pricingCatalog: CatalogItem[] = [
  { id: "camera-residential-value", category: "camera", name: "Residential 2K/4MP PoE Camera Allowance", model: "ONVIF / PoE value class", unitCost: 69, laborHours: 0.9, unit: "each" },
  { id: "camera-residential-dome", category: "camera", name: "Residential Indoor PoE Camera Allowance", model: "ONVIF / PoE value class", unitCost: 79, laborHours: 0.9, unit: "each" },
  { id: "camera-residential-premium", category: "camera", name: "Residential Premium Camera", manufacturer: "Ubiquiti", model: "G5 Bullet class", unitCost: 129, laborHours: 1.0, unit: "each" },

  // Lean commercial/value tier for small restaurant/retail refresh jobs where
  // the customer is reusing a rack/internet path and does not need access control.
  // These remain professional PoE/ONVIF allowances, just not enterprise-spec SKUs.
  { id: "camera-commercial-value", category: "camera", name: "Commercial Value PoE Camera Allowance", model: "ONVIF / PoE 4MP-8MP value class", unitCost: 89, laborHours: 1.0, unit: "each" },
  { id: "camera-commercial-dome-value", category: "camera", name: "Commercial Value Indoor Dome Camera Allowance", model: "ONVIF / PoE dome value class", unitCost: 99, laborHours: 1.0, unit: "each" },
  { id: "camera-junction-box-commercial-value", category: "mounting", name: "Commercial Value Weatherproof Camera Mount Allowance", unitCost: 24, laborHours: 0.1, unit: "each" },
  { id: "ups-commercial-value", category: "ups", name: "Small Commercial UPS Allowance", model: "1000-1500VA value class", unitCost: 145, laborHours: 0.35, unit: "each" },
  { id: "cat6-commercial-value", category: "cable", name: "Commercial Cat6 CMR Value Allowance", model: "Solid copper, non-CCA", unitCost: 0.26, laborHours: 0.005, unit: "foot" },
  { id: "cable-endpoint-commercial-value", category: "termination", name: "Commercial Value Termination, Test & Label", unitCost: 8, laborHours: 0.2, unit: "each" },
  { id: "patch-panel-24-commercial-value", category: "termination", name: "24-Port Cat6 Patch Panel - Commercial Value", unitCost: 55, laborHours: 0.8, unit: "each" },

  // Commercial / premium surveillance.
  { id: "camera-standard", category: "camera", name: "2K IP Camera", manufacturer: "Ubiquiti", model: "G5 Bullet", unitCost: 129, laborHours: 1.0, unit: "each" },
  { id: "camera-dome", category: "camera", name: "Indoor Dome Camera", manufacturer: "Ubiquiti", model: "G5 Dome", unitCost: 179, laborHours: 1.0, unit: "each" },
  { id: "camera-specialty", category: "camera", name: "Specialty / Enhanced Camera Allowance", manufacturer: "Ubiquiti", model: "G5 Pro / AI-class allowance", unitCost: 399, laborHours: 1.4, unit: "each" },
  { id: "camera-junction-box-value", category: "mounting", name: "Residential Weatherproof Camera Mount Allowance", unitCost: 18, laborHours: 0.1, unit: "each" },
  { id: "camera-junction-box", category: "mounting", name: "Commercial Camera Junction / Weatherproof Mount Allowance", unitCost: 39, laborHours: 0.1, unit: "each" },

  { id: "nvr-small", category: "nvr", name: "Network Video Recorder", manufacturer: "Ubiquiti", model: "UNVR", unitCost: 299, laborHours: 1.0, unit: "each" },
  { id: "storage-8tb", category: "storage", name: "8TB Surveillance Storage Drive", manufacturer: "Western Digital", model: "Purple Pro class", unitCost: 220, laborHours: 0.1, unit: "each" },

  { id: "switch-16-standard", category: "switch", name: "16 Port PoE Switch", manufacturer: "Ubiquiti", model: "USW-16-POE", unitCost: 299, laborHours: 0.8, unit: "each" },
  { id: "switch-24-standard", category: "switch", name: "24 Port PoE Switch", manufacturer: "Ubiquiti", model: "USW-24-POE", unitCost: 379, laborHours: 1.0, unit: "each" },
  { id: "switch-24-pro", category: "switch", name: "24 Port Pro PoE Switch", manufacturer: "Ubiquiti", model: "USW-Pro-24-POE", unitCost: 699, laborHours: 1.25, unit: "each" },
  { id: "switch-48", category: "switch", name: "48 Port PoE Switch", manufacturer: "Ubiquiti", model: "USW-48-POE class", unitCost: 589, laborHours: 1.5, unit: "each" },
  { id: "gateway", category: "gateway", name: "Managed Network Gateway Allowance", manufacturer: "Ubiquiti", model: "UniFi Gateway class", unitCost: 279, laborHours: 1.0, unit: "each" },
  { id: "wifi-ap", category: "wifi", name: "Wi-Fi 7 Access Point", manufacturer: "Ubiquiti", model: "U7 Pro", unitCost: 189, laborHours: 0.8, unit: "each" },

  { id: "door-starter-kit", category: "access", name: "Single-Door Access Starter Kit", manufacturer: "Ubiquiti", model: "Door Starter Kit class", unitCost: 289, laborHours: 1.25, unit: "each" },
  { id: "door-lock-residential", category: "access", name: "Electric Lock / Door Interface Allowance", model: "Residential electric lock class", unitCost: 99, laborHours: 1.25, unit: "each" },
  { id: "access-keyfob-pack", category: "access", name: "Access Keyfob Pack Allowance", manufacturer: "Ubiquiti", model: "Pocket Keyfob 10-Pack", unitCost: 99, laborHours: 0.1, unit: "each" },
  { id: "door-reader", category: "access", name: "Access Reader", manufacturer: "Ubiquiti", model: "Reader class", unitCost: 199, laborHours: 1.0, unit: "each" },
  { id: "door-controller", category: "access", name: "Door Controller", manufacturer: "Ubiquiti", model: "Door Hub", unitCost: 199, laborHours: 1.25, unit: "each" },
  { id: "door-hardware-allowance", category: "access", name: "Door Hardware / REX / Contact Allowance", unitCost: 225, laborHours: 1.5, unit: "each" },

  { id: "rack-small-value", category: "rack", name: "6U/9U Residential Wall Cabinet Allowance", model: "Value rack class", unitCost: 125, laborHours: 1.25, unit: "each" },
  { id: "patch-panel-24-value", category: "termination", name: "24-Port Cat6 Patch Panel - Residential Value", unitCost: 45, laborHours: 0.7, unit: "each" },
  { id: "cat6-value", category: "cable", name: "Cat6 Solid Copper CMR Cable - Residential Value", model: "Solid copper, non-CCA", unitCost: 0.24, laborHours: 0.005, unit: "foot" },
  { id: "cable-endpoint-value", category: "termination", name: "Residential Keystone / Termination / Test / Label", unitCost: 7, laborHours: 0.18, unit: "each" },
  { id: "ups-small-value", category: "ups", name: "Residential UPS Allowance", model: "Value 900-1500VA class", unitCost: 135, laborHours: 0.3, unit: "each" },

  { id: "rack-small", category: "rack", name: "Commercial Wall-Mount Network Rack", manufacturer: "StarTech class", unitCost: 275, laborHours: 1.5, unit: "each" },
  { id: "rack-full", category: "rack", name: "Floor Network Rack", manufacturer: "StarTech class", unitCost: 900, laborHours: 3.0, unit: "each" },
  { id: "patch-panel-24", category: "termination", name: "24-Port Cat6 Patch Panel - Commercial", unitCost: 95, laborHours: 0.8, unit: "each" },
  { id: "cat6", category: "cable", name: "Commercial Cat6 Cable Allowance", unitCost: 0.32, laborHours: 0.005, unit: "foot" },
  { id: "cable-endpoint", category: "termination", name: "Commercial Cat6 Termination, Test & Label", unitCost: 12, laborHours: 0.2, unit: "each" },
  { id: "ups-small", category: "ups", name: "Small Commercial Rack UPS Allowance", manufacturer: "APC class", unitCost: 225, laborHours: 0.35, unit: "each" },
  { id: "ups", category: "ups", name: "Commercial Rack UPS Allowance", manufacturer: "APC class", unitCost: 650, laborHours: 0.5, unit: "each" },

  { id: "labor", category: "labor", name: "Burdened Low-Voltage Field Labor", unitCost: 68, laborHours: 1, unit: "hour" },
];