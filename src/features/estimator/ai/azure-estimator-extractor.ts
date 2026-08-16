import { z } from "zod";

import {
  azureDeployment,
  getAzureOpenAI,
} from "@/lib/azure-openai";

import {
  normalizeProjectPatchValues,
} from "../domain/normalize-project-field-value";

import type {
  ProjectEstimate,
} from "../domain/project-estimate";

import {
  projectEstimatePatchSchema,
  type ProjectEstimatePatch,
} from "../conversation/ai-response";

const azureEstimatorExtractionSchema =
  z.object({
    confidence: z
      .number()
      .min(0)
      .max(100)
      .default(0),

    explanation: z
      .string()
      .default(""),

    projectUpdates:
      projectEstimatePatchSchema.default(
        {}
      ),
  });

export type AzureEstimatorExtractionInput = {
  customerMessage: string;

  project: ProjectEstimate;

  currentQuestion:
    | string
    | null;

  remainingQuestions: string[];
};

export type AzureEstimatorExtraction = {
  confidence: number;

  explanation: string;

  projectUpdates:
    ProjectEstimatePatch;
};

type PatchQuantity = {
  value?: number | null;

  confidence?:
    | "unknown"
    | "customer_reported"
    | "ai_inferred"
    | "site_verified";
};

export async function extractEstimatorResponse({
  customerMessage,
  project,
  currentQuestion,
  remainingQuestions,
}: AzureEstimatorExtractionInput): Promise<AzureEstimatorExtraction> {
  const client =
    getAzureOpenAI();

  if (!azureDeployment) {
    throw new Error(
      "AZURE_OPENAI_DEPLOYMENT is not configured."
    );
  }

  const completion =
    await client.chat.completions.create({
      model:
        azureDeployment,

      temperature:
        0,

      response_format: {
        type:
          "json_object",
      },

      messages: [
        {
          role:
            "system",

          content: `
You are the SmartNET project information extraction engine.

Extract every explicit project fact from the customer's message.

Return only valid JSON using this exact top-level structure:

{
  "confidence": 0,
  "explanation": "",
  "projectUpdates": {}
}

Rules:

- confidence must be from 0 through 100.
- Never return markdown.
- Never calculate or modify pricing.
- Never recommend equipment.
- Never estimate labor, materials, duration, crew size, cable footage, or cost.
- Never change status, metadata, assessment, equipment, or pricing.
- Never invent facts.
- Never guess missing facts.
- Never return null for information not provided.
- Never return false unless the customer explicitly said no.
- Never return empty arrays.
- Never reset an existing value.
- Omit unchanged fields.
- Omit quantity fields that do not have a real numeric value.
- Never return a quantity object with a null or missing value.
- Extract multiple fields from one message.
- Use customer_reported for numbers directly stated by the customer.
- Set requested=true when the customer clearly requests that system.
- Preserve all existing facts unless the customer clearly corrects them.

Use only these exact enum values:

property.projectType:
- residential
- office
- retail
- restaurant
- warehouse
- industrial
- medical
- education
- hospitality
- religious
- datacenter
- multi_location
- other

property.constructionType:
- existing_finished
- existing_unfinished
- new_construction
- renovation
- unknown

property.ceilingType:
- drywall
- drop_ceiling
- open_ceiling
- warehouse_deck
- mixed
- unknown

cabling.preferredCableType:
- cat6
- cat6a
- fiber
- mixed
- unknown

cabling.wiringStyle:
- hidden
- exposed
- mixed
- unknown

installation.difficultyLevel:
- standard
- moderate
- difficult
- specialty
- unknown

Quantity format:

{
  "value": 24,
  "confidence": "customer_reported"
}

Square-footage rules:

- Always extract an explicitly stated property or project square footage.
- Map square feet, square foot, sq ft, sq. ft., sqft, ft², and square-foot phrases to property.squareFootage.
- A phrase such as "12,000-square-foot warehouse" means property.squareFootage.value is 12000.
- Remove commas and unit text before returning the numeric value.
- Do not confuse square footage with ceiling height, cable footage, travel distance, or another measurement.
- Do not omit property.squareFootage when the customer explicitly provides it.

Examples:

"12,000-square-foot warehouse"
{
  "property": {
    "projectType": "warehouse",
    "squareFootage": {
      "value": 12000,
      "confidence": "customer_reported"
    }
  }
}

"the office is approximately 8,500 sq ft"
{
  "property": {
    "projectType": "office",
    "squareFootage": {
      "value": 8500,
      "confidence": "customer_reported"
    }
  }
}

"about 2500 square feet"
{
  "property": {
    "squareFootage": {
      "value": 2500,
      "confidence": "customer_reported"
    }
  }
}

"one floor"
{
  "property": {
    "numberOfFloors": {
      "value": 1,
      "confidence": "customer_reported"
    }
  }
}

"24-foot warehouse deck ceilings"
{
  "property": {
    "ceilingType": "warehouse_deck",
    "ceilingHeightFeet": {
      "value": 24,
      "confidence": "customer_reported"
    }
  }
}

"open exposed ceilings"
{
  "property": {
    "ceilingType": "open_ceiling"
  }
}

"the wiring will be hidden in the walls"
{
  "cabling": {
    "wiringStyle": "hidden"
  }
}

"a mix of hidden and exposed wiring"
{
  "cabling": {
    "wiringStyle": "mixed"
  }
}

"18 interior cameras covering entrances and loading docks"
{
  "cameras": {
    "requested": true,
    "interiorCount": {
      "value": 18,
      "confidence": "customer_reported"
    },
    "coverageGoals": [
      "entrances",
      "loading docks"
    ]
  }
}

"30 days of recording and remote viewing"
{
  "cameras": {
    "requested": true,
    "recordingDays": {
      "value": 30,
      "confidence": "customer_reported"
    },
    "remoteViewingRequired": true
  }
}

"Wi-Fi for 75 devices"
{
  "wifi": {
    "requested": true,
    "estimatedConcurrentUsers": {
      "value": 75,
      "confidence": "customer_reported"
    }
  },
  "network": {
    "requested": true
  }
}

"badge access on four exterior doors"
{
  "accessControl": {
    "requested": true,
    "controlledDoorCount": {
      "value": 4,
      "confidence": "customer_reported"
    },
    "exteriorDoorCount": {
      "value": 4,
      "confidence": "customer_reported"
    },
    "credentialTypes": [
      "badge"
    ]
  }
}
`,
        },

        {
          role:
            "user",

          content:
            JSON.stringify(
              {
                currentQuestion,

                customerMessage,

                remainingQuestionKeys:
                  remainingQuestions,

                currentProject:
                  project,
              },
              null,
              2
            ),
        },
      ],
    });

  const content =
    completion.choices[0]
      ?.message
      ?.content;

  if (!content) {
    throw new Error(
      "Azure OpenAI returned an empty response."
    );
  }

  let rawResponse: unknown;

  try {
    rawResponse =
      JSON.parse(content);
  } catch {
    throw new Error(
      "Azure OpenAI returned invalid JSON."
    );
  }

  const normalizedRawResponse =
    normalizeAzureExtractionResponse(
      rawResponse
    );

  const parsed =
    azureEstimatorExtractionSchema.parse(
      normalizedRawResponse
    );

  const sanitizedUpdates =
    sanitizeProjectUpdates(
      project,
      parsed.projectUpdates
    );

  const normalizedSanitizedUpdates =
    normalizeProjectPatchValues(
      sanitizedUpdates
    );

  return {
    confidence:
      parsed.confidence,

    explanation:
      parsed.explanation,

    projectUpdates:
      projectEstimatePatchSchema.parse(
        normalizedSanitizedUpdates
      ),
  };
}

function normalizeAzureExtractionResponse(
  rawResponse: unknown
): unknown {
  if (
    typeof rawResponse !==
      "object" ||
    rawResponse === null ||
    Array.isArray(rawResponse)
  ) {
    return rawResponse;
  }

  const response = {
    ...rawResponse,
  } as Record<
    string,
    unknown
  >;

  response.projectUpdates =
    normalizeProjectPatchValues(
      response.projectUpdates
    );

  return response;
}

function sanitizeProjectUpdates(
  current: ProjectEstimate,
  incoming: ProjectEstimatePatch
): ProjectEstimatePatch {
  const safe: ProjectEstimatePatch = {
    ...incoming,

    id:
      undefined,

    status:
      undefined,

    equipment:
      undefined,

    pricing:
      undefined,

    assessment:
      undefined,

    metadata:
      undefined,
  };

  if (safe.customerIntent) {
    if (
      safe.customerIntent
        .summary === ""
    ) {
      safe.customerIntent.summary =
        undefined;
    }

    if (
      safe.customerIntent
        .goals?.length === 0
    ) {
      safe.customerIntent.goals =
        undefined;
    }

    if (
      safe.customerIntent
        .problems?.length === 0
    ) {
      safe.customerIntent.problems =
        undefined;
    }

    if (
      safe.customerIntent
        .futureExpansion ===
      null
    ) {
      safe.customerIntent.futureExpansion =
        undefined;
    }
  }

  if (safe.property) {
    if (
      safe.property.projectType ===
      null
    ) {
      safe.property.projectType =
        undefined;
    }

    if (
      safe.property
        .customProjectType ===
      null
    ) {
      safe.property.customProjectType =
        undefined;
    }

    if (
      safe.property
        .constructionType ===
        "unknown" &&
      current.property
        .constructionType !==
        "unknown"
    ) {
      safe.property.constructionType =
        undefined;
    }

    if (
      safe.property.ceilingType ===
        "unknown" &&
      current.property.ceilingType !==
        "unknown"
    ) {
      safe.property.ceilingType =
        undefined;
    }

    if (
      safe.property
        .specialEnvironment
        ?.length === 0
    ) {
      safe.property.specialEnvironment =
        undefined;
    }

    if (
      safe.property
        .occupiedDuringInstall ===
      null
    ) {
      safe.property.occupiedDuringInstall =
        undefined;
    }
  }

  if (safe.cameras) {
    if (
      current.cameras.requested &&
      safe.cameras.requested ===
        false
    ) {
      safe.cameras.requested =
        undefined;
    }

    if (
      safe.cameras
        .coverageGoals?.length ===
      0
    ) {
      safe.cameras.coverageGoals =
        undefined;
    }

    if (
      safe.cameras
        .mountingSurfaces
        ?.length === 0
    ) {
      safe.cameras.mountingSurfaces =
        undefined;
    }

    if (
      safe.cameras.existingSystem ===
      null
    ) {
      safe.cameras.existingSystem =
        undefined;
    }

    if (
      safe.cameras
        .remoteViewingRequired ===
      null
    ) {
      safe.cameras.remoteViewingRequired =
        undefined;
    }
  }

  if (safe.network) {
    if (
      current.network.requested &&
      safe.network.requested ===
        false
    ) {
      safe.network.requested =
        undefined;
    }

    if (
      safe.network
        .internetProvider ===
      null
    ) {
      safe.network.internetProvider =
        undefined;
    }

    if (
      safe.network.existingRouter ===
      null
    ) {
      safe.network.existingRouter =
        undefined;
    }

    if (
      safe.network
        .existingSwitches ===
      null
    ) {
      safe.network.existingSwitches =
        undefined;
    }

    if (
      safe.network.existingRack ===
      null
    ) {
      safe.network.existingRack =
        undefined;
    }

    if (
      safe.network.rackRequired ===
      null
    ) {
      safe.network.rackRequired =
        undefined;
    }

    if (
      safe.network.rackLocation ===
      null
    ) {
      safe.network.rackLocation =
        undefined;
    }

    if (
      safe.network.vlanRequired ===
      null
    ) {
      safe.network.vlanRequired =
        undefined;
    }
  }

  if (safe.wifi) {
    if (
      current.wifi.requested &&
      safe.wifi.requested ===
        false
    ) {
      safe.wifi.requested =
        undefined;
    }

    if (
      safe.wifi.coverageGoals
        ?.length === 0
    ) {
      safe.wifi.coverageGoals =
        undefined;
    }

    if (
      safe.wifi.weakAreas
        ?.length === 0
    ) {
      safe.wifi.weakAreas =
        undefined;
    }

    if (
      safe.wifi.indoorCoverage ===
      null
    ) {
      safe.wifi.indoorCoverage =
        undefined;
    }

    if (
      safe.wifi.outdoorCoverage ===
      null
    ) {
      safe.wifi.outdoorCoverage =
        undefined;
    }

    if (
      safe.wifi
        .guestNetworkRequired ===
      null
    ) {
      safe.wifi.guestNetworkRequired =
        undefined;
    }
  }

  if (safe.accessControl) {
    if (
      current.accessControl
        .requested &&
      safe.accessControl
        .requested === false
    ) {
      safe.accessControl.requested =
        undefined;
    }

    if (
      safe.accessControl
        .credentialTypes
        ?.length === 0
    ) {
      safe.accessControl.credentialTypes =
        undefined;
    }

    if (
      safe.accessControl
        .existingSystem ===
      null
    ) {
      safe.accessControl.existingSystem =
        undefined;
    }

    if (
      safe.accessControl
        .remoteManagementRequired ===
      null
    ) {
      safe.accessControl.remoteManagementRequired =
        undefined;
    }
  }

  if (safe.cabling) {
    if (
      safe.cabling
        .existingCablingAvailable ===
      null
    ) {
      safe.cabling.existingCablingAvailable =
        undefined;
    }

    if (
      safe.cabling
        .preferredCableType ===
        "unknown" &&
      current.cabling
        .preferredCableType !==
        "unknown"
    ) {
      safe.cabling.preferredCableType =
        undefined;
    }

    if (
      safe.cabling.pathwayType
        ?.length === 0
    ) {
      safe.cabling.pathwayType =
        undefined;
    }

    if (
      safe.cabling.wiringStyle ===
        "unknown" &&
      current.cabling.wiringStyle !==
        "unknown"
    ) {
      safe.cabling.wiringStyle =
        undefined;
    }

    if (
      safe.cabling
        .trenchingRequired ===
      null
    ) {
      safe.cabling.trenchingRequired =
        undefined;
    }

    if (
      safe.cabling
        .fireStoppingRequired ===
      null
    ) {
      safe.cabling.fireStoppingRequired =
        undefined;
    }
  }

  if (safe.installation) {
    if (
      safe.installation.liftRequired ===
      null
    ) {
      safe.installation.liftRequired =
        undefined;
    }

    if (
      safe.installation.liftType ===
      null
    ) {
      safe.installation.liftType =
        undefined;
    }

    if (
      safe.installation
        .ladderAccessPossible ===
      null
    ) {
      safe.installation.ladderAccessPossible =
        undefined;
    }

    if (
      safe.installation
        .afterHoursRequired ===
      null
    ) {
      safe.installation.afterHoursRequired =
        undefined;
    }

    if (
      safe.installation
        .permitsRequired ===
      null
    ) {
      safe.installation.permitsRequired =
        undefined;
    }

    if (
      safe.installation
        .difficultyLevel ===
        "unknown" &&
      current.installation
        .difficultyLevel !==
        "unknown"
    ) {
      safe.installation.difficultyLevel =
        undefined;
    }
  }

  removeEmptyQuantityFields(
    safe
  );

  if (
    safe.cameras &&
    hasCameraInformation(
      safe.cameras
    )
  ) {
    safe.cameras.requested =
      true;
  }

  if (
    safe.wifi &&
    hasWifiInformation(
      safe.wifi
    )
  ) {
    safe.wifi.requested =
      true;

    safe.network = {
      ...safe.network,

      requested:
        true,
    };
  }

  if (
    safe.accessControl &&
    hasAccessControlInformation(
      safe.accessControl
    )
  ) {
    safe.accessControl.requested =
      true;
  }

  removeEmptySections(
    safe
  );

  return safe;
}

function removeEmptyQuantityFields(
  patch: ProjectEstimatePatch
): void {
  removeQuantityField(
    patch.property,
    "squareFootage"
  );

  removeQuantityField(
    patch.property,
    "numberOfFloors"
  );

  removeQuantityField(
    patch.property,
    "ceilingHeightFeet"
  );

  removeQuantityField(
    patch.cameras,
    "interiorCount"
  );

  removeQuantityField(
    patch.cameras,
    "exteriorCount"
  );

  removeQuantityField(
    patch.cameras,
    "specialtyCount"
  );

  removeQuantityField(
    patch.cameras,
    "recordingDays"
  );

  removeQuantityField(
    patch.network,
    "currentDownloadMbps"
  );

  removeQuantityField(
    patch.network,
    "currentUploadMbps"
  );

  removeQuantityField(
    patch.wifi,
    "estimatedAccessPointCount"
  );

  removeQuantityField(
    patch.wifi,
    "estimatedConcurrentUsers"
  );

  removeQuantityField(
    patch.accessControl,
    "controlledDoorCount"
  );

  removeQuantityField(
    patch.accessControl,
    "exteriorDoorCount"
  );

  removeQuantityField(
    patch.accessControl,
    "interiorDoorCount"
  );

  removeQuantityField(
    patch.cabling,
    "estimatedCableFeet"
  );

  removeQuantityField(
    patch.installation,
    "travelMiles"
  );

  removeQuantityField(
    patch.installation,
    "estimatedCrewSize"
  );

  removeQuantityField(
    patch.installation,
    "estimatedLaborHours"
  );

  removeQuantityField(
    patch.installation,
    "estimatedDurationDays"
  );
}

function removeQuantityField(
  section:
    | object
    | undefined,
  field: string
): void {
  if (!section) {
    return;
  }

  const record =
    section as Record<
      string,
      unknown
    >;

  const quantity =
    record[field] as
      | PatchQuantity
      | undefined;

  if (!quantity) {
    return;
  }

  if (
    quantity.value === null ||
    quantity.value === undefined
  ) {
    delete record[field];

    return;
  }

  if (
    !Number.isFinite(
      quantity.value
    ) ||
    quantity.value < 0
  ) {
    delete record[field];
  }
}

function removeEmptySections(
  patch: ProjectEstimatePatch
): void {
  removeEmptySection(
    patch,
    "customerIntent"
  );

  removeEmptySection(
    patch,
    "property"
  );

  removeEmptySection(
    patch,
    "cameras"
  );

  removeEmptySection(
    patch,
    "network"
  );

  removeEmptySection(
    patch,
    "wifi"
  );

  removeEmptySection(
    patch,
    "accessControl"
  );

  removeEmptySection(
    patch,
    "cabling"
  );

  removeEmptySection(
    patch,
    "installation"
  );
}

function removeEmptySection(
  patch: ProjectEstimatePatch,
  sectionName:
    | "customerIntent"
    | "property"
    | "cameras"
    | "network"
    | "wifi"
    | "accessControl"
    | "cabling"
    | "installation"
): void {
  const record =
    patch as Record<
      string,
      unknown
    >;

  const section =
    record[sectionName];

  if (
    typeof section !==
      "object" ||
    section === null ||
    Array.isArray(section)
  ) {
    return;
  }

  const values =
    Object.values(section);

  const hasRealValue =
    values.some(
      (value) =>
        value !== undefined &&
        value !== null
    );

  if (!hasRealValue) {
    delete record[sectionName];
  }
}

function hasCameraInformation(
  cameras: NonNullable<
    ProjectEstimatePatch["cameras"]
  >
): boolean {
  return Boolean(
    cameras.interiorCount
      ?.value !== undefined ||
      cameras.exteriorCount
        ?.value !== undefined ||
      cameras.specialtyCount
        ?.value !== undefined ||
      cameras.recordingDays
        ?.value !== undefined ||
      cameras.coverageGoals
        ?.length ||
      cameras.mountingSurfaces
        ?.length ||
      cameras.existingSystem !==
        undefined ||
      cameras
        .remoteViewingRequired !==
        undefined
  );
}

function hasWifiInformation(
  wifi: NonNullable<
    ProjectEstimatePatch["wifi"]
  >
): boolean {
  return Boolean(
    wifi.estimatedAccessPointCount
      ?.value !== undefined ||
      wifi.estimatedConcurrentUsers
        ?.value !== undefined ||
      wifi.coverageGoals
        ?.length ||
      wifi.weakAreas
        ?.length ||
      wifi.indoorCoverage !==
        undefined ||
      wifi.outdoorCoverage !==
        undefined ||
      wifi.guestNetworkRequired !==
        undefined
  );
}

function hasAccessControlInformation(
  accessControl: NonNullable<
    ProjectEstimatePatch["accessControl"]
  >
): boolean {
  return Boolean(
    accessControl
      .controlledDoorCount
      ?.value !== undefined ||
      accessControl
        .exteriorDoorCount
        ?.value !== undefined ||
      accessControl
        .interiorDoorCount
        ?.value !== undefined ||
      accessControl
        .credentialTypes
        ?.length ||
      accessControl
        .existingSystem !==
        undefined ||
      accessControl
        .remoteManagementRequired !==
        undefined
  );
}