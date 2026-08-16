import type {
  PlaybookLaborProfile,
  PlaybookMaterial,
} from "../playbook";

export const warehouseCommonMaterials: PlaybookMaterial[] = [
  {
    id: "warehouse.cat6",
    category: "cable",
    name: "Category 6 Plenum Cable",
    description:
      "Primary horizontal copper cabling for commercial network devices.",
    unit: "foot",
    conditions: [],
    ruleTags: ["cat6", "horizontal-cabling"],
  },
  {
    id: "warehouse.cat6a",
    category: "cable",
    name: "Category 6A Cable",
    description:
      "Recommended for higher bandwidth and future expansion.",
    unit: "foot",
    conditions: [],
    ruleTags: ["cat6a", "future-ready"],
  },
  {
    id: "warehouse.fiber",
    category: "fiber",
    name: "Fiber Backbone Cable",
    description:
      "Single-mode or multimode backbone cabling between telecom rooms.",
    unit: "foot",
    conditions: [],
    ruleTags: ["fiber", "backbone"],
  },
  {
    id: "warehouse.patchPanel",
    category: "network",
    name: "24/48 Port Patch Panel",
    description:
      "Rack-mounted structured cabling termination.",
    unit: "each",
    conditions: [],
    ruleTags: ["patch-panel"],
  },
  {
    id: "warehouse.poeSwitch",
    category: "network",
    name: "Managed PoE Switch",
    description:
      "Enterprise managed Power over Ethernet switch.",
    unit: "each",
    conditions: [],
    ruleTags: ["managed-switch", "poe"],
  },
  {
    id: "warehouse.networkRack",
    category: "rack",
    name: "Network Equipment Rack",
    description:
      "Rack for switches, UPS, patch panels and cable management.",
    unit: "each",
    conditions: [],
    ruleTags: ["rack"],
  },
  {
    id: "warehouse.cableTray",
    category: "pathway",
    name: "Cable Tray",
    description:
      "Commercial cable pathway system.",
    unit: "foot",
    conditions: [],
    ruleTags: ["pathway"],
  },
  {
    id: "warehouse.jHooks",
    category: "support",
    name: "J-Hooks",
    description:
      "Cable support hardware.",
    unit: "each",
    conditions: [],
    ruleTags: ["support"],
  },
  {
    id: "warehouse.conduit",
    category: "pathway",
    name: "EMT Conduit",
    description:
      "Mechanical protection for low-voltage cable.",
    unit: "foot",
    conditions: [],
    ruleTags: ["conduit"],
  },
  {
    id: "warehouse.camera",
    category: "camera",
    name: "Commercial IP Camera",
    description:
      "Indoor/outdoor PoE security camera.",
    unit: "each",
    conditions: [],
    ruleTags: ["camera"],
  },
  {
    id: "warehouse.ap",
    category: "wifi",
    name: "Enterprise Wireless Access Point",
    description:
      "Commercial managed Wi-Fi access point.",
    unit: "each",
    conditions: [],
    ruleTags: ["wifi"],
  },
  {
    id: "warehouse.reader",
    category: "access_control",
    name: "Access Control Reader",
    description:
      "Card, mobile, or biometric reader.",
    unit: "each",
    conditions: [],
    ruleTags: ["reader"],
  },
  {
    id: "warehouse.lock",
    category: "access_control",
    name: "Electric Lock Hardware",
    description:
      "Maglock, strike, or electrified hardware.",
    unit: "each",
    conditions: [],
    ruleTags: ["lock"],
  },
  {
    id: "warehouse.ups",
    category: "power",
    name: "UPS Battery Backup",
    description:
      "Battery backup for critical equipment.",
    unit: "each",
    conditions: [],
    ruleTags: ["ups"],
  },
  {
    id: "warehouse.firestop",
    category: "firestop",
    name: "Firestop System",
    description:
      "Approved fire-rated penetration system.",
    unit: "penetration",
    conditions: [],
    ruleTags: ["firestop"],
  },
  {
    id: "warehouse.labels",
    category: "labeling",
    name: "Cable Labels",
    description:
      "Permanent machine-generated cable labeling.",
    unit: "each",
    conditions: [],
    ruleTags: ["labeling"],
  },
];

export const warehouseLaborProfiles: PlaybookLaborProfile[] = [
  {
    id: "warehouse.small",
    name: "Small Warehouse",
    description:
      "Small commercial warehouse installation.",
    typicalCrewSizeMin: 2,
    typicalCrewSizeMax: 3,
    laborDrivers: [
      "Existing pathways",
      "Minimal lift work",
      "Limited after-hours work",
    ],
    conditions: [],
    ruleTags: ["small-project"],
  },
  {
    id: "warehouse.medium",
    name: "Medium Warehouse",
    description:
      "Typical distribution facility.",
    typicalCrewSizeMin: 3,
    typicalCrewSizeMax: 5,
    laborDrivers: [
      "Lift work",
      "Fiber backbone",
      "Rack installation",
      "Active operations",
    ],
    conditions: [],
    ruleTags: ["medium-project"],
  },
  {
    id: "warehouse.large",
    name: "Large Distribution Center",
    description:
      "Large enterprise warehouse deployment.",
    typicalCrewSizeMin: 5,
    typicalCrewSizeMax: 10,
    laborDrivers: [
      "Multiple IDFs",
      "Large camera count",
      "Enterprise Wi-Fi",
      "Access Control",
      "After-hours work",
      "Multiple lifts",
    ],
    conditions: [],
    ruleTags: ["large-project"],
  },
];