import {
  projectEstimateSchema,
  type ProjectEstimate,
} from "../domain/project-estimate";

import {
  pricingCatalog,
  type CatalogItem,
} from "./pricing-catalog";

type RecommendedItem = ProjectEstimate["equipment"]["recommendedItems"][number];
type PricingAccumulator = { materialCost: number; laborHours: number; recommendedItems: RecommendedItem[] };

const PROJECT_RUN_FEET: Record<string, number> = {
  residential: 80,
  office: 120,
  retail: 110,
  restaurant: 125,
  warehouse: 180,
  industrial: 200,
  medical: 125,
  education: 150,
  hospitality: 140,
  religious: 160,
  datacenter: 120,
  multi_location: 145,
  other: 130,
};

export function calculateEstimate(project: ProjectEstimate): ProjectEstimate {
  const calculatedProject = projectEstimateSchema.parse(structuredClone(project));
  const accumulator: PricingAccumulator = { materialCost: 0, laborHours: 0, recommendedItems: [] };

  addCameraScope(calculatedProject, accumulator);
  addWifiScope(calculatedProject, accumulator);
  addAccessControlScope(calculatedProject, accumulator);
  addNetworkScope(calculatedProject, accumulator);
  addCablingScope(calculatedProject, accumulator);
  addRackScope(calculatedProject, accumulator);

  // Catalog labor covers installation at each physical item. Residential jobs
  // also need real non-BOM time for layout, staging, controller/NVR/network
  // configuration, commissioning, testing, cleanup and customer handoff.
  // Keep this residential-only for now so the already-calibrated commercial
  // benchmark tiers are not silently inflated.
  const projectLaborHours = calculateResidentialProjectLaborHours(calculatedProject);
  const baseLaborHours = accumulator.laborHours + projectLaborHours;
  const complexityMultiplier = calculateLaborComplexityMultiplier(calculatedProject);
  const adjustedLaborHours = baseLaborHours * complexityMultiplier;
  const laborRate = getCatalogItem("labor").unitCost;
  const laborCost = adjustedLaborHours * laborRate;

  const equipmentRentalCost = calculateEquipmentRentalCost(calculatedProject, adjustedLaborHours);
  const travelCost = calculateTravelCost(calculatedProject);
  const permitCost = calculatedProject.installation.permitsRequired ? 250 : 0;
  const projectConsumables = calculateProjectConsumables(accumulator.materialCost, calculatedProject);
  const mobilizationCost = calculateMobilizationCost(calculatedProject);
  const otherCost = projectConsumables + mobilizationCost;

  const directCost = accumulator.materialCost + laborCost + equipmentRentalCost + travelCost + permitCost + otherCost;
  const overheadPercent = calculatedProject.property.projectType === "residential" ? 0.09 : 0.12;
  const overheadAmount = directCost * overheadPercent;
  const costWithOverhead = directCost + overheadAmount;
  const targetMarginPercent = determineTargetMarginPercent(calculatedProject, directCost);
  const marginDecimal = targetMarginPercent / 100;
  const targetSellPrice = costWithOverhead / (1 - marginDecimal);
  const markupAmount = targetSellPrice - costWithOverhead;

  const uncertainty = calculateEstimateUncertainty(calculatedProject);
  const lowFactor = 1 - uncertainty;
  const highFactor = 1 + uncertainty;

  calculatedProject.equipment.recommendedItems = accumulator.recommendedItems;
  calculatedProject.pricing = {
    ...calculatedProject.pricing,
    status: "preliminary",
    materialCost: roundCurrency(accumulator.materialCost),
    laborCost: roundCurrency(laborCost),
    equipmentRentalCost: roundCurrency(equipmentRentalCost),
    travelCost: roundCurrency(travelCost),
    permitCost: roundCurrency(permitCost),
    otherCost: roundCurrency(otherCost),
    directCost: roundCurrency(directCost),
    overheadAmount: roundCurrency(overheadAmount),
    markupAmount: roundCurrency(markupAmount),
    estimatedLow: roundToFriendlyPrice(targetSellPrice * lowFactor),
    estimatedHigh: roundToFriendlyPrice(targetSellPrice * highFactor),
    targetMarginPercent,
    catalogVersion: "smartnet-catalog-2.3.0-residential-labor",
  };

  calculatedProject.installation.estimatedLaborHours = { value: roundQuantity(adjustedLaborHours), confidence: "ai_inferred" };
  calculatedProject.installation.estimatedCrewSize = { value: inferCrewSize(adjustedLaborHours, calculatedProject), confidence: "ai_inferred" };
  calculatedProject.installation.estimatedDurationDays = { value: inferDurationDays(adjustedLaborHours, calculatedProject), confidence: "ai_inferred" };
  calculatedProject.status = "ready_for_pricing";
  return projectEstimateSchema.parse(calculatedProject);
}

function isResidential(project: ProjectEstimate): boolean {
  return project.property.projectType === "residential";
}

function calculateResidentialProjectLaborHours(project: ProjectEstimate): number {
  if (!isResidential(project)) return 0;

  const cameraCount = getCameraCount(project);
  const apCount = project.wifi.estimatedAccessPointCount.value ?? 0;
  const doorCount = project.accessControl.controlledDoorCount.value ?? 0;
  const activeSystems = [
    project.cameras.requested,
    project.wifi.requested,
    project.network.requested,
    project.accessControl.requested,
  ].filter(Boolean).length;

  if (cameraCount + apCount + doorCount === 0 && activeSystems === 0) return 0;

  // Minimum project setup/closeout. Additional commissioning grows with the
  // number of systems and electronically controlled doors, where programming,
  // alignment and functional testing consume meaningful technician time.
  let hours = 2.25;
  hours += Math.max(0, activeSystems - 1) * 0.65;
  hours += cameraCount * 0.08;
  hours += apCount * 0.18;
  hours += doorCount * 0.45;

  if (project.network.rackRequired === true) hours += 0.75;
  if (project.cabling.wiringStyle === "hidden") hours += 0.75;
  if ((project.property.numberOfFloors.value ?? 1) > 1) hours += 0.5;

  return Math.min(8, hours);
}

function addCameraScope(project: ProjectEstimate, accumulator: PricingAccumulator): void {
  if (!project.cameras.requested) return;
  const interiorCount = project.cameras.interiorCount.value ?? 0;
  const exteriorCount = project.cameras.exteriorCount.value ?? 0;
  const specialtyCount = project.cameras.specialtyCount.value ?? 0;
  const residential = isResidential(project);

  addCatalogItem(accumulator, residential ? "camera-residential-dome" : "camera-dome", interiorCount, residential ? "Residential value camera allowance for normal indoor coverage; premium upgrade remains available." : "Indoor camera quantity from project discovery.");
  addCatalogItem(accumulator, residential ? "camera-residential-value" : "camera-standard", exteriorCount, residential ? "Residential value PoE camera allowance for normal exterior coverage; premium upgrade remains available." : "Exterior camera quantity from project discovery.");
  addCatalogItem(accumulator, "camera-specialty", specialtyCount, "Specialty-camera allowance pending final model selection.");
  if (exteriorCount + specialtyCount > 0) addCatalogItem(accumulator, residential ? "camera-junction-box-value" : "camera-junction-box", exteriorCount + specialtyCount, residential ? "Value weatherproof mounting allowance for residential exterior cameras." : "Weatherproof mounting allowance for exterior and specialty cameras.");

  const totalCameraCount = interiorCount + exteriorCount + specialtyCount;
  if (totalCameraCount <= 0) return;
  addCatalogItem(accumulator, "nvr-small", 1, "Recorder required for the proposed camera system.");

  const recordingDays = Math.max(14, project.cameras.recordingDays.value ?? 30);
  const storageDrives = Math.max(1, Math.ceil((totalCameraCount / 8) * (recordingDays / 30)));
  addCatalogItem(accumulator, "storage-8tb", storageDrives, `Storage allowance based on ${totalCameraCount} cameras and approximately ${recordingDays} days of retention.`);

  addPoESwitching(accumulator, totalCameraCount, project);
  addCatalogItem(accumulator, residential ? "ups-small-value" : "ups", 1, residential ? "Residential value UPS allowance for recording and network equipment." : "Commercial battery backup allowance for recording and network equipment.");
}

function addWifiScope(project: ProjectEstimate, accumulator: PricingAccumulator): void {
  if (!project.wifi.requested) return;
  const explicitAccessPointCount = project.wifi.estimatedAccessPointCount.value;
  const concurrentUsers = project.wifi.estimatedConcurrentUsers.value ?? 0;
  const squareFootage = project.property.squareFootage.value ?? 0;
  const projectType = project.property.projectType ?? "other";

  const sqftPerAp = projectType === "residential" ? 2200 : ["warehouse", "industrial"].includes(projectType) ? 4500 : ["restaurant", "retail", "medical"].includes(projectType) ? 2200 : 3000;
  let inferredCount = Math.max(1, Math.ceil(Math.max(concurrentUsers / 30, squareFootage / sqftPerAp)));
  if (project.wifi.outdoorCoverage === true) inferredCount += 1;
  if (project.property.numberOfFloors.value && project.property.numberOfFloors.value > inferredCount) inferredCount = Math.ceil(project.property.numberOfFloors.value);
  const accessPointCount = explicitAccessPointCount ?? inferredCount;

  addCatalogItem(accumulator, "wifi-ap", accessPointCount, explicitAccessPointCount !== null ? "Access-point quantity provided during project discovery." : "Preliminary AP quantity based on property size, density, floor count and coverage goals.");
  project.wifi.estimatedAccessPointCount = { value: accessPointCount, confidence: explicitAccessPointCount !== null ? project.wifi.estimatedAccessPointCount.confidence : "ai_inferred" };
}

function addAccessControlScope(project: ProjectEstimate, accumulator: PricingAccumulator): void {
  if (!project.accessControl.requested) return;
  const doors = project.accessControl.controlledDoorCount.value ?? 0;
  if (doors <= 0) return;

  if (isResidential(project)) {
    addCatalogItem(accumulator, "door-starter-kit", doors, "Residential single-door access kit allowance per controlled opening.");
    addCatalogItem(accumulator, "door-lock-residential", doors, "Residential electric lock / door interface allowance per controlled opening.");
    const credentialText = project.accessControl.credentialTypes.join(" ").toLowerCase();
    if (credentialText.includes("fob") || credentialText.includes("key")) addCatalogItem(accumulator, "access-keyfob-pack", 1, "Shared keyfob pack allowance for residential access users.");
    return;
  }

  addCatalogItem(accumulator, "door-reader", doors, "One credential reader allowance per controlled opening.");
  addCatalogItem(accumulator, "door-controller", doors, "Door-control interface allowance per controlled opening.");
  addCatalogItem(accumulator, "door-hardware-allowance", doors, "Allowance for lock interface, request-to-exit, door contact and related low-voltage hardware.");
}

function addNetworkScope(project: ProjectEstimate, accumulator: PricingAccumulator): void {
  const cameraCount = getCameraCount(project);
  const apCount = project.wifi.estimatedAccessPointCount.value ?? 0;
  const doorCount = project.accessControl.controlledDoorCount.value ?? 0;
  const poeEndpoints = cameraCount + apCount + doorCount;
  if (project.network.requested && project.network.existingRouter !== true) addCatalogItem(accumulator, "gateway", 1, "Managed gateway allowance because the project includes network scope and no reusable router is confirmed.");
  if (poeEndpoints > 0 && cameraCount === 0) addPoESwitching(accumulator, poeEndpoints, project);
}

function addPoESwitching(accumulator: PricingAccumulator, endpointCount: number, project: ProjectEstimate): void {
  if (project.network.existingSwitches === true) return;
  if (endpointCount <= 12) {
    addCatalogItem(accumulator, "switch-16-standard", 1, "PoE switching allowance sized to connected devices with spare capacity.");
    return;
  }
  if (endpointCount <= 20) {
    addCatalogItem(accumulator, "switch-24-standard", 1, "PoE switching allowance sized to connected devices with spare capacity.");
    return;
  }
  if (endpointCount <= 24) {
    addCatalogItem(accumulator, "switch-24-pro", 1, "Higher-capacity PoE switching allowance for connected devices and future headroom.");
    return;
  }
  addCatalogItem(accumulator, "switch-48", Math.ceil(endpointCount / 40), "48-port-class PoE switching allowance with capacity reserved for growth.");
}

function addCablingScope(project: ProjectEstimate, accumulator: PricingAccumulator): void {
  const explicitCableFeet = project.cabling.estimatedCableFeet.value;
  const cameraCount = getCameraCount(project);
  const apCount = project.wifi.estimatedAccessPointCount.value ?? 0;
  const doorCount = project.accessControl.controlledDoorCount.value ?? 0;
  const dataRuns = cameraCount + apCount;
  const projectType = project.property.projectType ?? "other";
  const residential = isResidential(project);
  const averageRunFeet = PROJECT_RUN_FEET[projectType] ?? 130;
  const doorRunFeet = residential ? 75 : 125;
  const inferredCableFeet = Math.ceil((dataRuns * averageRunFeet + doorCount * doorRunFeet) * 1.1);
  const cableFeet = explicitCableFeet ?? inferredCableFeet;

  const adjustedCableFeet = project.cabling.existingCablingAvailable === true && explicitCableFeet === null ? Math.ceil(cableFeet * 0.35) : cableFeet;
  addCatalogItem(accumulator, residential ? "cat6-value" : "cat6", adjustedCableFeet, explicitCableFeet !== null ? "Cable footage supplied during project discovery." : residential ? "Residential solid-copper Cat6 value allowance inferred from device count and pathway distance." : "Commercial cable allowance inferred from device count, project type, average pathway distance and service slack.");

  const endpointCount = dataRuns + doorCount;
  addCatalogItem(accumulator, residential ? "cable-endpoint-value" : "cable-endpoint", endpointCount, residential ? "Residential bulk keystone, termination, test and label allowance per endpoint." : "Commercial termination, certification/test and labeling allowance per endpoint.");
  if (endpointCount >= 8 && project.network.existingRack !== true) addCatalogItem(accumulator, residential ? "patch-panel-24-value" : "patch-panel-24", Math.max(1, Math.ceil(endpointCount / 24)), residential ? "Residential value patch-panel allowance for organized structured cabling." : "Commercial patch-panel allowance for organized structured cabling.");
  if (explicitCableFeet === null && adjustedCableFeet > 0) project.cabling.estimatedCableFeet = { value: adjustedCableFeet, confidence: "ai_inferred" };
}

function addRackScope(project: ProjectEstimate, accumulator: PricingAccumulator): void {
  if (project.network.rackRequired !== true || project.network.existingRack === true) return;
  const endpoints = getCameraCount(project) + (project.wifi.estimatedAccessPointCount.value ?? 0) + (project.accessControl.controlledDoorCount.value ?? 0);
  if (isResidential(project) && endpoints <= 24) {
    addCatalogItem(accumulator, "rack-small-value", 1, "Residential 6U/9U wall-cabinet allowance sized for the proposed equipment.");
    return;
  }
  addCatalogItem(accumulator, endpoints > 24 ? "rack-full" : "rack-small", 1, endpoints > 24 ? "Floor-rack allowance based on project scale." : "Commercial wall-rack allowance for network and security equipment.");
}

function calculateLaborComplexityMultiplier(project: ProjectEstimate): number {
  let multiplier = 1;
  const difficulty = project.installation.difficultyLevel;
  multiplier *= difficulty === "moderate" ? 1.15 : difficulty === "difficult" ? 1.35 : difficulty === "specialty" ? 1.55 : 1;

  const residential = isResidential(project);
  const construction = project.property.constructionType;
  if (construction === "existing_finished") multiplier *= residential ? 1.08 : 1.15;
  if (construction === "renovation") multiplier *= 1.08;
  if (construction === "new_construction") multiplier *= 0.92;

  const ceiling = project.property.ceilingType;
  if (ceiling === "drywall") multiplier *= residential ? 1.06 : 1.12;
  if (ceiling === "warehouse_deck") multiplier *= 1.15;
  if (ceiling === "mixed") multiplier *= 1.08;

  const ceilingHeight = project.property.ceilingHeightFeet.value ?? 0;
  if (ceilingHeight >= 20) multiplier *= 1.18;
  else if (ceilingHeight >= 14) multiplier *= 1.08;

  if (project.cabling.wiringStyle === "hidden") multiplier *= residential ? 1.08 : 1.15;
  if (project.cabling.wiringStyle === "mixed") multiplier *= 1.07;
  if (project.cabling.trenchingRequired === true) multiplier *= 1.15;
  if (project.cabling.fireStoppingRequired === true) multiplier *= 1.08;
  if (project.property.occupiedDuringInstall === true) multiplier *= residential ? 1.03 : 1.08;
  if (project.installation.afterHoursRequired === true) multiplier *= 1.25;
  if (project.installation.liftRequired === true) multiplier *= 1.08;
  return Math.min(2.25, Math.max(0.85, multiplier));
}

function calculateEquipmentRentalCost(project: ProjectEstimate, adjustedLaborHours: number): number {
  if (project.installation.liftRequired !== true) return 0;
  const estimatedDays = Math.max(1, Math.ceil(adjustedLaborHours / 14));
  const liftType = (project.installation.liftType ?? "").toLowerCase();
  const dailyRate = liftType.includes("boom") ? 575 : 425;
  return estimatedDays * dailyRate;
}

function calculateTravelCost(project: ProjectEstimate): number {
  const miles = project.installation.travelMiles.value ?? 0;
  if (miles <= 0) return 0;
  return Math.max(35, miles * 0.85);
}

function calculateProjectConsumables(materialCost: number, project: ProjectEstimate): number {
  let rate = isResidential(project) ? 0.05 : 0.08;
  if (project.cabling.wiringStyle === "exposed") rate += 0.04;
  if (project.cabling.trenchingRequired === true) rate += 0.04;
  if (project.cabling.fireStoppingRequired === true) rate += 0.03;
  return Math.max(isResidential(project) ? 45 : 60, materialCost * rate);
}

function calculateMobilizationCost(project: ProjectEstimate): number {
  return project.property.projectType && !isResidential(project) ? 225 : 95;
}

function determineTargetMarginPercent(project: ProjectEstimate, directCost: number): number {
  const residential = isResidential(project);
  let margin = residential ? (directCost < 2500 ? 30 : directCost < 7500 ? 26 : 24) : (directCost < 2500 ? 32 : directCost < 7500 ? 29 : 27);
  if (["difficult", "specialty"].includes(project.installation.difficultyLevel)) margin += 2;
  if (project.installation.afterHoursRequired === true) margin += 1;
  return Math.min(35, margin);
}

function calculateEstimateUncertainty(project: ProjectEstimate): number {
  let uncertainty = project.assessment.confidenceScore >= 90 ? 0.07 : 0.09;
  const confidence = project.assessment.confidenceScore;
  if (confidence < 50) uncertainty += 0.08;
  else if (confidence < 70) uncertainty += 0.05;
  else if (confidence < 85) uncertainty += 0.02;
  if (project.property.constructionType === "unknown") uncertainty += 0.025;
  if (project.property.ceilingType === "unknown") uncertainty += 0.02;
  if (project.cabling.wiringStyle === "unknown") uncertainty += 0.02;
  if (project.cabling.estimatedCableFeet.confidence === "unknown") uncertainty += 0.02;
  return Math.min(0.22, Math.max(0.06, uncertainty));
}

function inferCrewSize(laborHours: number, project: ProjectEstimate): number {
  if (laborHours >= 36 || project.installation.liftRequired === true) return 2;
  return 1;
}

function inferDurationDays(laborHours: number, project: ProjectEstimate): number {
  const crew = inferCrewSize(laborHours, project);
  return Math.max(1, Math.ceil(laborHours / (crew * 7)));
}

function getCameraCount(project: ProjectEstimate): number {
  return (project.cameras.interiorCount.value ?? 0) + (project.cameras.exteriorCount.value ?? 0) + (project.cameras.specialtyCount.value ?? 0);
}

function addCatalogItem(accumulator: PricingAccumulator, catalogId: string, quantity: number, reason: string): void {
  if (!Number.isFinite(quantity) || quantity <= 0) return;
  const item = getCatalogItem(catalogId);
  const normalizedQuantity = Math.ceil(quantity);
  accumulator.materialCost += item.unitCost * normalizedQuantity;
  accumulator.laborHours += item.laborHours * normalizedQuantity;
  accumulator.recommendedItems.push(createRecommendedItem(item, normalizedQuantity, reason));
}

function createRecommendedItem(item: CatalogItem, quantity: number, reason: string): RecommendedItem {
  return { category: item.category, description: item.name, quantity, manufacturer: item.manufacturer ?? null, model: item.model ?? null, reason };
}

function getCatalogItem(catalogId: string): CatalogItem {
  const item = pricingCatalog.find((candidate) => candidate.id === catalogId);
  if (!item) throw new Error(`Pricing catalog item "${catalogId}" was not found.`);
  return item;
}

function roundCurrency(value: number): number { return Math.round((value + Number.EPSILON) * 100) / 100; }
function roundToFriendlyPrice(value: number): number { return Math.max(0, Math.round(value / 50) * 50); }
function roundQuantity(value: number): number { return Math.round((value + Number.EPSILON) * 10) / 10; }
