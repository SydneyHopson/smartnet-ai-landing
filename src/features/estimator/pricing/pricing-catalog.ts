export type CatalogItem = {
  id: string;

  category:
    | "camera"
    | "nvr"
    | "switch"
    | "wifi"
    | "access"
    | "rack"
    | "cable"
    | "ups"
    | "labor";

  name: string;

  manufacturer?: string;

  model?: string;

  unitCost: number;

  laborHours: number;

  unit: "each" | "foot" | "hour";
};

export const pricingCatalog: CatalogItem[] = [
  {
    id: "camera-standard",

    category: "camera",

    name: "4MP Commercial IP Camera",

    manufacturer: "Ubiquiti",

    model: "G5 Bullet",

    unitCost: 189,

    laborHours: 1.5,

    unit: "each",
  },

  {
    id: "camera-dome",

    category: "camera",

    name: "Indoor Dome Camera",

    manufacturer: "Ubiquiti",

    model: "G5 Dome",

    unitCost: 179,

    laborHours: 1.4,

    unit: "each",
  },

  {
    id: "nvr-small",

    category: "nvr",

    name: "UNVR",

    manufacturer: "Ubiquiti",

    model: "UNVR",

    unitCost: 499,

    laborHours: 2,

    unit: "each",
  },

  {
    id: "switch-24",

    category: "switch",

    name: "24 Port PoE Switch",

    manufacturer: "Ubiquiti",

    model: "USW Pro 24 PoE",

    unitCost: 799,

    laborHours: 2,

    unit: "each",
  },

  {
    id: "switch-48",

    category: "switch",

    name: "48 Port PoE Switch",

    manufacturer: "Ubiquiti",

    model: "USW Pro 48 PoE",

    unitCost: 1299,

    laborHours: 2.5,

    unit: "each",
  },

  {
    id: "wifi-ap",

    category: "wifi",

    name: "Enterprise Access Point",

    manufacturer: "Ubiquiti",

    model: "U7 Pro",

    unitCost: 189,

    laborHours: 1.5,

    unit: "each",
  },

  {
    id: "door-reader",

    category: "access",

    name: "Access Reader",

    manufacturer: "Ubiquiti",

    model: "UA Reader",

    unitCost: 329,

    laborHours: 2,

    unit: "each",
  },

  {
    id: "door-controller",

    category: "access",

    name: "Door Controller",

    manufacturer: "Ubiquiti",

    model: "UA Hub",

    unitCost: 499,

    laborHours: 2,

    unit: "each",
  },

  {
    id: "rack",

    category: "rack",

    name: "42U Rack",

    manufacturer: "StarTech",

    unitCost: 900,

    laborHours: 4,

    unit: "each",
  },

  {
    id: "cat6",

    category: "cable",

    name: "Cat6 Plenum Cable",

    unitCost: 0.34,

    laborHours: 0.015,

    unit: "foot",
  },

  {
    id: "ups",

    category: "ups",

    name: "Rack UPS",

    manufacturer: "APC",

    unitCost: 650,

    laborHours: 1,

    unit: "each",
  },

  {
    id: "labor",

    category: "labor",

    name: "Field Technician",

    unitCost: 125,

    laborHours: 1,

    unit: "hour",
  },
];