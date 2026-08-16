import { calculateEstimate } from "./pricing-engine";
import { createEmptyProjectEstimate, type ProjectEstimate } from "../domain/project-estimate";

export type PricingBenchmark = {
  name: string;
  projectType: NonNullable<ProjectEstimate["property"]["projectType"]>;
  project: ProjectEstimate;
  expected: { minSell: number; maxSell: number; minLaborHours: number; maxLaborHours: number; minMaterial: number; maxMaterial: number };
};

function q(value: number) { return { value, confidence: "customer_reported" as const }; }
function base(type: PricingBenchmark["projectType"], sqft: number, floors: number, ceiling: ProjectEstimate["property"]["ceilingType"], height: number): ProjectEstimate {
  const p = createEmptyProjectEstimate();
  p.property.projectType = type; p.property.squareFootage = q(sqft); p.property.numberOfFloors = q(floors); p.property.constructionType = "existing_finished"; p.property.ceilingType = ceiling; p.property.ceilingHeightFeet = q(height); p.property.occupiedDuringInstall = type !== "residential";
  p.cabling.existingCablingAvailable = false; p.cabling.preferredCableType = "cat6"; p.cabling.wiringStyle = type === "warehouse" || type === "industrial" || type === "datacenter" ? "exposed" : "hidden"; p.cabling.trenchingRequired = false; p.cabling.fireStoppingRequired = ["medical", "datacenter"].includes(type);
  p.installation.liftRequired = ["warehouse", "industrial", "datacenter"].includes(type) && height >= 18; p.installation.ladderAccessPossible = !p.installation.liftRequired; p.installation.afterHoursRequired = false; p.installation.permitsRequired = false; p.installation.difficultyLevel = type === "datacenter" ? "specialty" : type === "medical" || type === "industrial" ? "difficult" : "standard"; p.assessment.confidenceScore = 100;
  return p;
}
function cameras(p: ProjectEstimate, inside: number, outside: number, days = 30) { p.cameras.requested = true; p.cameras.interiorCount = q(inside); p.cameras.exteriorCount = q(outside); p.cameras.specialtyCount = q(0); p.cameras.recordingDays = q(days); }
function wifi(p: ProjectEstimate, users: number, outdoor = false, rack = true) { p.network.requested = true; p.wifi.requested = true; p.wifi.estimatedConcurrentUsers = q(users); p.wifi.indoorCoverage = true; p.wifi.outdoorCoverage = outdoor; p.network.existingRouter = false; p.network.existingSwitches = false; p.network.existingRack = false; p.network.rackRequired = rack; }
function access(p: ProjectEstimate, doors: number) { p.accessControl.requested = true; p.accessControl.controlledDoorCount = q(doors); p.accessControl.exteriorDoorCount = q(doors); p.accessControl.interiorDoorCount = q(0); p.accessControl.credentialTypes = ["key fob", "mobile"]; }

const homeLean = base("residential", 2200, 2, "drywall", 9); cameras(homeLean, 1, 4); wifi(homeLean, 15, false, false); homeLean.accessControl.requested = false; homeLean.network.existingRack = true; homeLean.cabling.existingCablingAvailable = true;
const home = base("residential", 2800, 2, "drywall", 9); cameras(home, 2, 4); wifi(home, 20, true); access(home, 2); home.cabling.existingCablingAvailable = true;

// Lean restaurant reflects the common real-world job: camera refresh plus modest managed Wi-Fi,
// no access control and no new rack build. This should stay competitive with profitable $4k-$5k installs.
const restaurantLean = base("restaurant", 3000, 1, "mixed", 11); cameras(restaurantLean, 5, 3); wifi(restaurantLean, 35, false, false); restaurantLean.accessControl.requested = false; restaurantLean.network.existingRack = true; restaurantLean.network.existingRouter = true; restaurantLean.cabling.existingCablingAvailable = true; restaurantLean.installation.afterHoursRequired = false;
const restaurant = base("restaurant", 4500, 1, "mixed", 12); cameras(restaurant, 7, 3); wifi(restaurant, 75); access(restaurant, 2); restaurant.wifi.guestNetworkRequired = true; restaurant.network.vlanRequired = true; restaurant.installation.afterHoursRequired = true;
const office = base("office", 10000, 2, "drop_ceiling", 10); cameras(office, 8, 4); wifi(office, 100); access(office, 4); office.network.vlanRequired = true;
const retail = base("retail", 6000, 1, "mixed", 12); cameras(retail, 8, 4); wifi(retail, 60); access(retail, 2); retail.wifi.guestNetworkRequired = true;
const warehouse = base("warehouse", 30000, 1, "warehouse_deck", 28); cameras(warehouse, 6, 10, 30); wifi(warehouse, 80); access(warehouse, 4); warehouse.installation.liftType = "scissor";
const medical = base("medical", 12000, 1, "drop_ceiling", 10); cameras(medical, 10, 4, 30); wifi(medical, 120); access(medical, 6); medical.network.vlanRequired = true; medical.installation.afterHoursRequired = true;
const industrial = base("industrial", 40000, 1, "warehouse_deck", 30); cameras(industrial, 8, 12, 30); wifi(industrial, 100); access(industrial, 6); industrial.installation.liftType = "boom";
const datacenter = base("datacenter", 50000, 1, "open_ceiling", 20); cameras(datacenter, 18, 6, 60); wifi(datacenter, 150); access(datacenter, 10); datacenter.network.vlanRequired = true; datacenter.installation.afterHoursRequired = true; datacenter.installation.liftType = "scissor";

export const pricingBenchmarks: PricingBenchmark[] = [
  { name: "Residential lean camera + Wi-Fi", projectType: "residential", project: homeLean, expected: { minSell: 3000, maxSell: 6500, minLaborHours: 18, maxLaborHours: 35, minMaterial: 1400, maxMaterial: 3000 } },
  { name: "Residential whole-home hybrid", projectType: "residential", project: home, expected: { minSell: 6500, maxSell: 10500, minLaborHours: 32, maxLaborHours: 45, minMaterial: 2500, maxMaterial: 4000 } },
  { name: "Restaurant lean camera + Wi-Fi", projectType: "restaurant", project: restaurantLean, expected: { minSell: 4000, maxSell: 6500, minLaborHours: 16, maxLaborHours: 32, minMaterial: 2000, maxMaterial: 3500 } },
  { name: "Operating restaurant full systems", projectType: "restaurant", project: restaurant, expected: { minSell: 12000, maxSell: 26000, minLaborHours: 55, maxLaborHours: 105, minMaterial: 5000, maxMaterial: 10000 } },
  { name: "Two-floor office", projectType: "office", project: office, expected: { minSell: 14000, maxSell: 30000, minLaborHours: 60, maxLaborHours: 120, minMaterial: 6000, maxMaterial: 12000 } },
  { name: "Retail store", projectType: "retail", project: retail, expected: { minSell: 12000, maxSell: 26000, minLaborHours: 50, maxLaborHours: 105, minMaterial: 5000, maxMaterial: 10000 } },
  { name: "Warehouse with lift", projectType: "warehouse", project: warehouse, expected: { minSell: 22000, maxSell: 50000, minLaborHours: 90, maxLaborHours: 190, minMaterial: 8000, maxMaterial: 18000 } },
  { name: "Medical facility", projectType: "medical", project: medical, expected: { minSell: 22000, maxSell: 50000, minLaborHours: 90, maxLaborHours: 190, minMaterial: 8000, maxMaterial: 18000 } },
  { name: "Industrial facility", projectType: "industrial", project: industrial, expected: { minSell: 30000, maxSell: 75000, minLaborHours: 120, maxLaborHours: 260, minMaterial: 10000, maxMaterial: 24000 } },
  { name: "Datacenter controlled environment", projectType: "datacenter", project: datacenter, expected: { minSell: 45000, maxSell: 110000, minLaborHours: 180, maxLaborHours: 380, minMaterial: 15000, maxMaterial: 35000 } },
];

export function runPricingBenchmarks() {
  return pricingBenchmarks.map((benchmark) => {
    const result = calculateEstimate(benchmark.project); const low = result.pricing.estimatedLow; const high = result.pricing.estimatedHigh; const hours = result.installation.estimatedLaborHours.value ?? 0; const material = result.pricing.materialCost;
    const checks = { sell: low >= benchmark.expected.minSell && high <= benchmark.expected.maxSell, labor: hours >= benchmark.expected.minLaborHours && hours <= benchmark.expected.maxLaborHours, material: material >= benchmark.expected.minMaterial && material <= benchmark.expected.maxMaterial, saneRange: high >= low && low > result.pricing.directCost, finite: [low, high, hours, material, result.pricing.laborCost, result.pricing.directCost].every(Number.isFinite) };
    return { name: benchmark.name, type: benchmark.projectType, low, high, material, laborCost: result.pricing.laborCost, laborHours: hours, directCost: result.pricing.directCost, margin: result.pricing.targetMarginPercent, pass: Object.values(checks).every(Boolean), checks, catalog: result.pricing.catalogVersion };
  });
}
