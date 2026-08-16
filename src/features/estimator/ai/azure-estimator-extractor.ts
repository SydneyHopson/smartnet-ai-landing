import { z } from "zod";

import { azureDeployment, getAzureOpenAI } from "@/lib/azure-openai";
import { normalizeProjectPatchValues } from "../domain/normalize-project-field-value";
import type { ProjectEstimate } from "../domain/project-estimate";
import {
  projectEstimatePatchSchema,
  type ProjectEstimatePatch,
} from "../conversation/ai-response";

const extractionSchema = z.object({
  confidence: z.number().min(0).max(100).default(0),
  explanation: z.string().default(""),
  projectUpdates: projectEstimatePatchSchema.default({}),
});

export type AzureEstimatorExtractionInput = {
  customerMessage: string;
  project: ProjectEstimate;
  currentQuestion: string | null;
  remainingQuestions: string[];
};

export type AzureEstimatorExtraction = {
  confidence: number;
  explanation: string;
  projectUpdates: ProjectEstimatePatch;
};

export async function extractEstimatorResponse({
  customerMessage,
  project,
  currentQuestion,
  remainingQuestions,
}: AzureEstimatorExtractionInput): Promise<AzureEstimatorExtraction> {
  if (!azureDeployment) {
    throw new Error("AZURE_OPENAI_DEPLOYMENT is not configured.");
  }

  const client = getAzureOpenAI();
  const completion = await client.chat.completions.create({
    model: azureDeployment,
    temperature: 0,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `You are the SmartNET project information extraction engine.

Extract EVERY explicit project fact from the customer's message, not only the answer to the current question. A single paragraph can resolve many remaining questions.

Return only JSON with this exact top-level shape:
{"confidence":0,"explanation":"","projectUpdates":{}}

STRICT RULES
- Never calculate pricing, labor, duration, crew size, cable footage, or equipment recommendations.
- Never modify status, metadata, assessment, equipment, or pricing.
- Never invent a fact or guess a missing fact.
- Never return null, empty arrays, or unknown values for facts the customer did not provide.
- Omit unchanged fields.
- Preserve existing facts unless the customer clearly corrects them.
- Use customer_reported for numbers directly stated by the customer.
- Set requested=true when the customer clearly requests cameras, Wi-Fi/networking, or access control.
- Natural phrases count as explicit facts. Do not require the customer to use SmartNET field names.

PROPERTY ENUMS
property.projectType: residential | office | retail | restaurant | warehouse | industrial | medical | education | hospitality | religious | datacenter | multi_location | other
property.constructionType: existing_finished | existing_unfinished | new_construction | renovation | unknown
property.ceilingType: drywall | drop_ceiling | open_ceiling | warehouse_deck | mixed | unknown
cabling.wiringStyle: hidden | exposed | mixed | unknown
cabling.preferredCableType: cat6 | cat6a | fiber | mixed | unknown
installation.difficultyLevel: standard | moderate | difficult | specialty | unknown

QUANTITIES
Return quantities as {"value":24,"confidence":"customer_reported"}.

SEMANTIC EXTRACTION RULES
- "single-family home", "house", or "residence" => property.projectType=residential.
- "fully finished", "finished home", "existing finished home" => property.constructionType=existing_finished.
- "drywall ceilings" => property.ceilingType=drywall.
- Extract square footage, floor count, and ceiling height whenever explicitly stated.
- If the customer gives separate indoor and outdoor camera counts, extract both and extract named camera coverage areas.
- "30 days of recording" => cameras.recordingDays=30.
- "throughout the home", "throughout both floors", "whole house", "whole home" => wifi.coverageGoals includes "whole-home coverage" and wifi.indoorCoverage=true.
- Backyard, patio, pool, yard, driveway, detached garage, or outdoor Wi-Fi wording => wifi.outdoorCoverage=true and include the named outdoor area in wifi.coverageGoals.
- If both indoor whole-home and outdoor coverage are requested, include both in coverageGoals. This MUST resolve wifi.coverageGoals.
- "20 devices at the same time" => wifi.estimatedConcurrentUsers=20.
- Existing internet/router wording => network.existingRouter=true when clearly stated.
- "no rack", "no network rack" => network.existingRack=false.
- "provide a rack/cabinet" => network.rackRequired=true.
- "attic access", "crawlspace", "basement", "accessible ceiling" => add those to cabling.pathwayType.
- "some existing network cabling may be reusable" => cabling.existingCablingAvailable=true.
- "concealed where possible", "hidden wiring", "inside walls/ceilings" => cabling.wiringStyle=hidden.
- "no underground runs", "no trenching" => cabling.trenchingRequired=false.
- "normal ladder access", "no lift required" => installation.liftRequired=false and installation.ladderAccessPossible=true.
- "mobile phone access", "phone access", "key fobs", "badges", "PIN" => extract accessControl.credentialTypes.
- "2 exterior doors" for access control => controlledDoorCount=2 and exteriorDoorCount=2.

EXAMPLE
Customer: "I have a 2-story 2,800-square-foot single-family home that is fully finished with standard 9-foot drywall ceilings. I want 4 outdoor cameras and 2 indoor cameras with 30 days recording. I want Wi-Fi throughout both floors and the backyard for about 20 devices at the same time. I want mobile phone access and key fobs on 2 exterior doors. I have internet and a router but no network rack and want a small rack. There is attic access, some existing network cabling may be reusable, wiring should be concealed, no underground runs, and normal ladder access is enough with no lift."
Result projectUpdates must include residential, 2800 sqft, 2 floors, existing_finished, drywall, 9-foot ceiling, 4 exterior cameras, 2 interior cameras, 30 recording days, whole-home + backyard Wi-Fi coverage, indoorCoverage=true, outdoorCoverage=true, 20 concurrent devices, existingRouter=true, existingRack=false, rackRequired=true, attic pathway, existingCablingAvailable=true, hidden wiring, trenchingRequired=false, liftRequired=false, ladderAccessPossible=true, 2 controlled exterior doors, and mobile phone + key fob credential types.
`,
      },
      {
        role: "user",
        content: JSON.stringify(
          {
            currentQuestion,
            customerMessage,
            remainingQuestionKeys: remainingQuestions,
            currentProject: project,
          },
          null,
          2
        ),
      },
    ],
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) throw new Error("Azure OpenAI returned an empty response.");

  let raw: unknown;
  try {
    raw = JSON.parse(content);
  } catch {
    throw new Error("Azure OpenAI returned invalid JSON.");
  }

  const normalized = normalizeExtraction(raw);
  const parsed = extractionSchema.parse(normalized);
  const sanitized = sanitizeProjectUpdates(project, parsed.projectUpdates);

  return {
    confidence: parsed.confidence,
    explanation: parsed.explanation,
    projectUpdates: projectEstimatePatchSchema.parse(
      normalizeProjectPatchValues(sanitized)
    ),
  };
}

function normalizeExtraction(raw: unknown): unknown {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) return raw;
  const response = { ...raw } as Record<string, unknown>;
  response.projectUpdates = normalizeProjectPatchValues(response.projectUpdates);
  return response;
}

function sanitizeProjectUpdates(
  current: ProjectEstimate,
  incoming: ProjectEstimatePatch
): ProjectEstimatePatch {
  const safe: ProjectEstimatePatch = {
    ...incoming,
    id: undefined,
    status: undefined,
    equipment: undefined,
    pricing: undefined,
    assessment: undefined,
    metadata: undefined,
  };

  cleanSection(safe.customerIntent);
  cleanSection(safe.property);
  cleanSection(safe.cameras);
  cleanSection(safe.network);
  cleanSection(safe.wifi);
  cleanSection(safe.accessControl);
  cleanSection(safe.cabling);
  cleanSection(safe.installation);

  preserveKnownEnum(safe.property, current.property, "constructionType", "unknown");
  preserveKnownEnum(safe.property, current.property, "ceilingType", "unknown");
  preserveKnownEnum(safe.cabling, current.cabling, "preferredCableType", "unknown");
  preserveKnownEnum(safe.cabling, current.cabling, "wiringStyle", "unknown");
  preserveKnownEnum(safe.installation, current.installation, "difficultyLevel", "unknown");

  preserveRequested(current.cameras.requested, safe.cameras);
  preserveRequested(current.network.requested, safe.network);
  preserveRequested(current.wifi.requested, safe.wifi);
  preserveRequested(current.accessControl.requested, safe.accessControl);

  removeInvalidQuantities(safe);

  if (safe.cameras && hasUsefulValue(safe.cameras)) safe.cameras.requested = true;
  if (safe.wifi && hasUsefulValue(safe.wifi)) {
    safe.wifi.requested = true;
    safe.network = { ...safe.network, requested: true };
  }
  if (safe.accessControl && hasUsefulValue(safe.accessControl)) {
    safe.accessControl.requested = true;
  }

  removeEmptySections(safe);
  return safe;
}

function cleanSection(section: object | undefined): void {
  if (!section) return;
  const record = section as Record<string, unknown>;
  for (const [key, value] of Object.entries(record)) {
    if (value === null || value === undefined || value === "") {
      delete record[key];
      continue;
    }
    if (Array.isArray(value) && value.length === 0) delete record[key];
  }
}

function preserveRequested(
  currentlyRequested: boolean,
  section: { requested?: boolean } | undefined
): void {
  if (currentlyRequested && section?.requested === false) section.requested = undefined;
}

function preserveKnownEnum(
  incoming: object | undefined,
  current: object,
  key: string,
  unknownValue: string
): void {
  if (!incoming) return;
  const next = incoming as Record<string, unknown>;
  const previous = current as unknown as Record<string, unknown>;
  if (next[key] === unknownValue && previous[key] !== unknownValue) delete next[key];
}

function removeInvalidQuantities(patch: ProjectEstimatePatch): void {
  const fields: Array<[object | undefined, string]> = [
    [patch.property, "squareFootage"],
    [patch.property, "numberOfFloors"],
    [patch.property, "ceilingHeightFeet"],
    [patch.cameras, "interiorCount"],
    [patch.cameras, "exteriorCount"],
    [patch.cameras, "specialtyCount"],
    [patch.cameras, "recordingDays"],
    [patch.network, "currentDownloadMbps"],
    [patch.network, "currentUploadMbps"],
    [patch.wifi, "estimatedAccessPointCount"],
    [patch.wifi, "estimatedConcurrentUsers"],
    [patch.accessControl, "controlledDoorCount"],
    [patch.accessControl, "exteriorDoorCount"],
    [patch.accessControl, "interiorDoorCount"],
    [patch.cabling, "estimatedCableFeet"],
    [patch.installation, "travelMiles"],
    [patch.installation, "estimatedCrewSize"],
    [patch.installation, "estimatedLaborHours"],
    [patch.installation, "estimatedDurationDays"],
  ];

  for (const [section, key] of fields) {
    if (!section) continue;
    const record = section as Record<string, unknown>;
    const quantity = record[key] as { value?: unknown } | undefined;
    if (!quantity) continue;
    if (
      typeof quantity.value !== "number" ||
      !Number.isFinite(quantity.value) ||
      quantity.value < 0
    ) {
      delete record[key];
    }
  }
}

function hasUsefulValue(section: object): boolean {
  return Object.entries(section as Record<string, unknown>).some(
    ([key, value]) =>
      key !== "requested" &&
      value !== undefined &&
      value !== null &&
      (!Array.isArray(value) || value.length > 0)
  );
}

function removeEmptySections(patch: ProjectEstimatePatch): void {
  const record = patch as Record<string, unknown>;
  for (const name of [
    "customerIntent",
    "property",
    "cameras",
    "network",
    "wifi",
    "accessControl",
    "cabling",
    "installation",
  ]) {
    const section = record[name];
    if (typeof section !== "object" || section === null || Array.isArray(section)) continue;
    if (Object.values(section).every((value) => value === undefined || value === null)) {
      delete record[name];
    }
  }
}
