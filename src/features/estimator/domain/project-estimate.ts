import { z } from "zod";

/**
 * Shared SmartNET project model.
 *
 * This model will eventually be used by:
 * - SmartNetWizard
 * - Azure AI conversation engine
 * - deterministic pricing engine
 * - booking flow
 * - quote generation
 * - Sanity persistence
 *
 * For now, it does not replace the existing SmartNetEstimate type.
 */

export const projectTypeSchema = z.enum([
  "residential",
  "office",
  "retail",
  "restaurant",
  "warehouse",
  "industrial",
  "medical",
  "education",
  "hospitality",
  "religious",
  "datacenter",
  "multi_location",
  "other",
]);

export const constructionTypeSchema = z.enum([
  "existing_finished",
  "existing_unfinished",
  "new_construction",
  "renovation",
  "unknown",
]);

export const ceilingTypeSchema = z.enum([
  "drywall",
  "drop_ceiling",
  "open_ceiling",
  "warehouse_deck",
  "mixed",
  "unknown",
]);

export const confidenceSchema = z.enum([
  "unknown",
  "customer_reported",
  "ai_inferred",
  "site_verified",
]);

const quantitySchema = z.object({
  value: z.number().nonnegative().nullable(),
  confidence: confidenceSchema.default("unknown"),
});

export const projectEstimateSchema = z.object({
  id: z.string().optional(),

  status: z
    .enum([
      "draft",
      "collecting_scope",
      "ready_for_pricing",
      "priced",
      "walkthrough_required",
      "verified",
      "quoted",
    ])
    .default("draft"),

  customerIntent: z.object({
    summary: z.string().default(""),
    goals: z.array(z.string()).default([]),
    problems: z.array(z.string()).default([]),
    futureExpansion: z.string().nullable().default(null),
  }),

  property: z.object({
    projectType: projectTypeSchema.nullable().default(null),
    customProjectType: z.string().nullable().default(null),
    squareFootage: quantitySchema,
    numberOfFloors: quantitySchema,
    constructionType: constructionTypeSchema.default("unknown"),
    ceilingType: ceilingTypeSchema.default("unknown"),
    ceilingHeightFeet: quantitySchema,
    specialEnvironment: z.array(z.string()).default([]),
    occupiedDuringInstall: z.boolean().nullable().default(null),
  }),

  cameras: z.object({
    requested: z.boolean().default(false),
    interiorCount: quantitySchema,
    exteriorCount: quantitySchema,
    specialtyCount: quantitySchema,
    coverageGoals: z.array(z.string()).default([]),
    recordingDays: quantitySchema,
    existingSystem: z.boolean().nullable().default(null),
    remoteViewingRequired: z.boolean().nullable().default(null),
    mountingSurfaces: z.array(z.string()).default([]),
  }),

  network: z.object({
    requested: z.boolean().default(false),
    internetProvider: z.string().nullable().default(null),
    currentDownloadMbps: quantitySchema,
    currentUploadMbps: quantitySchema,
    existingRouter: z.boolean().nullable().default(null),
    existingSwitches: z.boolean().nullable().default(null),
    existingRack: z.boolean().nullable().default(null),
    rackRequired: z.boolean().nullable().default(null),
    rackLocation: z.string().nullable().default(null),
    vlanRequired: z.boolean().nullable().default(null),
  }),

  wifi: z.object({
    requested: z.boolean().default(false),
    estimatedAccessPointCount: quantitySchema,
    coverageGoals: z.array(z.string()).default([]),
    weakAreas: z.array(z.string()).default([]),
    indoorCoverage: z.boolean().nullable().default(null),
    outdoorCoverage: z.boolean().nullable().default(null),
    guestNetworkRequired: z.boolean().nullable().default(null),
    estimatedConcurrentUsers: quantitySchema,
  }),

  accessControl: z.object({
    requested: z.boolean().default(false),
    controlledDoorCount: quantitySchema,
    exteriorDoorCount: quantitySchema,
    interiorDoorCount: quantitySchema,
    credentialTypes: z.array(z.string()).default([]),
    existingSystem: z.boolean().nullable().default(null),
    remoteManagementRequired: z.boolean().nullable().default(null),
  }),

  cabling: z.object({
    existingCablingAvailable: z.boolean().nullable().default(null),
    preferredCableType: z
      .enum(["cat6", "cat6a", "fiber", "mixed", "unknown"])
      .default("unknown"),
    pathwayType: z.array(z.string()).default([]),
    wiringStyle: z
      .enum(["hidden", "exposed", "mixed", "unknown"])
      .default("unknown"),
    estimatedCableFeet: quantitySchema,
    trenchingRequired: z.boolean().nullable().default(null),
    fireStoppingRequired: z.boolean().nullable().default(null),
  }),

  installation: z.object({
    liftRequired: z.boolean().nullable().default(null),
    liftType: z.string().nullable().default(null),
    ladderAccessPossible: z.boolean().nullable().default(null),
    afterHoursRequired: z.boolean().nullable().default(null),
    permitsRequired: z.boolean().nullable().default(null),
    travelMiles: quantitySchema,
    difficultyLevel: z
      .enum(["standard", "moderate", "difficult", "specialty", "unknown"])
      .default("unknown"),
    estimatedCrewSize: quantitySchema,
    estimatedLaborHours: quantitySchema,
    estimatedDurationDays: quantitySchema,
  }),

  equipment: z.object({
    recommendedItems: z
      .array(
        z.object({
          category: z.string(),
          description: z.string(),
          quantity: z.number().nonnegative(),
          manufacturer: z.string().nullable().default(null),
          model: z.string().nullable().default(null),
          reason: z.string(),
        })
      )
      .default([]),
  }),

  pricing: z.object({
    status: z
      .enum(["not_calculated", "preliminary", "verified"])
      .default("not_calculated"),
    materialCost: z.number().nonnegative().default(0),
    laborCost: z.number().nonnegative().default(0),
    equipmentRentalCost: z.number().nonnegative().default(0),
    travelCost: z.number().nonnegative().default(0),
    permitCost: z.number().nonnegative().default(0),
    otherCost: z.number().nonnegative().default(0),
    directCost: z.number().nonnegative().default(0),
    overheadAmount: z.number().nonnegative().default(0),
    markupAmount: z.number().nonnegative().default(0),
    estimatedLow: z.number().nonnegative().default(0),
    estimatedHigh: z.number().nonnegative().default(0),
    targetMarginPercent: z.number().min(0).max(100).default(0),
    catalogVersion: z.string().nullable().default(null),
  }),

  assessment: z.object({
    scopeSummary: z.string().default(""),
    assumptions: z.array(z.string()).default([]),
    exclusions: z.array(z.string()).default([]),
    risks: z.array(z.string()).default([]),
    unansweredQuestions: z.array(z.string()).default([]),
    walkthroughRequired: z.boolean().default(true),
    confidenceScore: z.number().min(0).max(100).default(0),
  }),

  metadata: z.object({
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional(),
    source: z
      .enum([
        "wizard",
        "ai_conversation",
        "magic_link",
        "owner",
        "walkthrough",
      ])
      .default("wizard"),
    schemaVersion: z.literal("1.0.0").default("1.0.0"),
  }),
});

export type ProjectEstimate = z.infer<
  typeof projectEstimateSchema
>;

const unknownQuantity = {
  value: null,
  confidence: "unknown" as const,
};

export function createEmptyProjectEstimate(): ProjectEstimate {
  return projectEstimateSchema.parse({
    customerIntent: {},
    property: {
      squareFootage: unknownQuantity,
      numberOfFloors: unknownQuantity,
      ceilingHeightFeet: unknownQuantity,
    },
    cameras: {
      interiorCount: unknownQuantity,
      exteriorCount: unknownQuantity,
      specialtyCount: unknownQuantity,
      recordingDays: unknownQuantity,
    },
    network: {
      currentDownloadMbps: unknownQuantity,
      currentUploadMbps: unknownQuantity,
    },
    wifi: {
      estimatedAccessPointCount: unknownQuantity,
      estimatedConcurrentUsers: unknownQuantity,
    },
    accessControl: {
      controlledDoorCount: unknownQuantity,
      exteriorDoorCount: unknownQuantity,
      interiorDoorCount: unknownQuantity,
    },
    cabling: {
      estimatedCableFeet: unknownQuantity,
    },
    installation: {
      travelMiles: unknownQuantity,
      estimatedCrewSize: unknownQuantity,
      estimatedLaborHours: unknownQuantity,
      estimatedDurationDays: unknownQuantity,
    },
    equipment: {},
    pricing: {},
    assessment: {},
    metadata: {},
  });
}