type PrimitiveAnswer =
  | string
  | number
  | boolean
  | null
  | undefined;

type UnknownRecord =
  Record<string, unknown>;

const enumAliases: Record<
  string,
  Record<string, string>
> = {
  "property.projectType": {
    home: "residential",
    house: "residential",
    residential_property: "residential",

    multi_location:
      "multi_location",
    multi_location_project:
      "multi_location",
    multiple_locations:
      "multi_location",

    data_center:
      "datacenter",
  },

  "property.constructionType": {
    existing_finished:
      "existing_finished",
    operating_location:
      "existing_finished",
    operating_business:
      "existing_finished",
    operating_restaurant:
      "existing_finished",
    operating_warehouse:
      "existing_finished",
    existing_building:
      "existing_finished",
    finished_building:
      "existing_finished",
    occupied_building:
      "existing_finished",

    existing_unfinished:
      "existing_unfinished",
    unfinished_space:
      "existing_unfinished",
    unfinished_building:
      "existing_unfinished",
    tenant_buildout:
      "existing_unfinished",
    tenant_build_out:
      "existing_unfinished",
    buildout:
      "existing_unfinished",
    build_out:
      "existing_unfinished",
    shell_space:
      "existing_unfinished",

    new_construction:
      "new_construction",
    new_build:
      "new_construction",
    ground_up:
      "new_construction",
    ground_up_construction:
      "new_construction",

    renovation:
      "renovation",
    remodel:
      "renovation",
    remodeling:
      "renovation",
    refurbishment:
      "renovation",

    unknown:
      "unknown",
    unsure:
      "unknown",
    not_sure:
      "unknown",
    i_dont_know:
      "unknown",
  },

  "property.ceilingType": {
    drywall:
      "drywall",
    finished_ceiling:
      "drywall",
    drywall_ceiling:
      "drywall",
    solid_ceiling:
      "drywall",

    drop_ceiling:
      "drop_ceiling",
    suspended_ceiling:
      "drop_ceiling",
    acoustic_tile:
      "drop_ceiling",
    ceiling_tile:
      "drop_ceiling",
    removable_tiles:
      "drop_ceiling",

    open_ceiling:
      "open_ceiling",
    exposed_ceiling:
      "open_ceiling",
    exposed_structure:
      "open_ceiling",
    open_structure:
      "open_ceiling",
    open_exposed_ceiling:
      "open_ceiling",

    warehouse_deck:
      "warehouse_deck",
    warehouse_roof_deck:
      "warehouse_deck",
    roof_deck:
      "warehouse_deck",
    metal_deck:
      "warehouse_deck",

    mixed:
      "mixed",
    multiple:
      "mixed",
    multiple_ceiling_types:
      "mixed",
    combination:
      "mixed",

    unknown:
      "unknown",
    unsure:
      "unknown",
    not_sure:
      "unknown",
    i_dont_know:
      "unknown",
  },

  "cabling.preferredCableType": {
    cat6:
      "cat6",
    category_6:
      "cat6",
    category6:
      "cat6",

    cat6a:
      "cat6a",
    category_6a:
      "cat6a",
    category6a:
      "cat6a",

    fiber:
      "fiber",
    fiber_optic:
      "fiber",
    fibre:
      "fiber",

    mixed:
      "mixed",
    combination:
      "mixed",
    copper_and_fiber:
      "mixed",

    unknown:
      "unknown",
    unsure:
      "unknown",
    not_sure:
      "unknown",
  },

  "cabling.wiringStyle": {
    hidden:
      "hidden",
    concealed:
      "hidden",
    concealed_wiring:
      "hidden",
    hidden_in_walls:
      "hidden",
    hidden_in_walls_or_ceilings:
      "hidden",
    inside_walls:
      "hidden",
    above_ceiling:
      "hidden",

    exposed:
      "exposed",
    surface_mounted:
      "exposed",
    exposed_conduit:
      "exposed",
    exposed_conduit_runs:
      "exposed",
    visible_conduit:
      "exposed",
    cable_tray:
      "exposed",

    mixed:
      "mixed",
    mix:
      "mixed",
    mix_of_both:
      "mixed",
    combination:
      "mixed",
    hidden_and_exposed:
      "mixed",

    unknown:
      "unknown",
    unsure:
      "unknown",
    not_sure:
      "unknown",
    i_dont_know:
      "unknown",
  },

  "installation.difficultyLevel": {
    standard:
      "standard",
    normal:
      "standard",
    easy:
      "standard",
    typical:
      "standard",

    moderate:
      "moderate",
    medium:
      "moderate",
    intermediate:
      "moderate",

    difficult:
      "difficult",
    hard:
      "difficult",
    complex:
      "difficult",
    challenging:
      "difficult",

    specialty:
      "specialty",
    specialized:
      "specialty",
    special_conditions:
      "specialty",

    unknown:
      "unknown",
    unsure:
      "unknown",
    not_sure:
      "unknown",
  },
};

const booleanFields =
  new Set<string>([
    "property.occupiedDuringInstall",

    "cameras.requested",
    "cameras.existingSystem",
    "cameras.remoteViewingRequired",

    "network.requested",
    "network.existingRouter",
    "network.existingSwitches",
    "network.existingRack",
    "network.rackRequired",
    "network.vlanRequired",

    "wifi.requested",
    "wifi.indoorCoverage",
    "wifi.outdoorCoverage",
    "wifi.guestNetworkRequired",

    "accessControl.requested",
    "accessControl.existingSystem",
    "accessControl.remoteManagementRequired",

    "cabling.existingCablingAvailable",
    "cabling.trenchingRequired",
    "cabling.fireStoppingRequired",

    "installation.liftRequired",
    "installation.ladderAccessPossible",
    "installation.afterHoursRequired",
    "installation.permitsRequired",
  ]);

const numericFields =
  new Set<string>([
    "property.squareFootage",
    "property.numberOfFloors",
    "property.ceilingHeightFeet",

    "cameras.interiorCount",
    "cameras.exteriorCount",
    "cameras.specialtyCount",
    "cameras.recordingDays",

    "network.currentDownloadMbps",
    "network.currentUploadMbps",

    "wifi.estimatedAccessPointCount",
    "wifi.estimatedConcurrentUsers",

    "accessControl.controlledDoorCount",
    "accessControl.exteriorDoorCount",
    "accessControl.interiorDoorCount",

    "cabling.estimatedCableFeet",

    "installation.travelMiles",
    "installation.estimatedCrewSize",
    "installation.estimatedLaborHours",
    "installation.estimatedDurationDays",
  ]);

export function normalizeProjectFieldValue(
  projectField: string,
  value: unknown
): unknown {
  if (value === undefined) {
    return value;
  }

  if (
    numericFields.has(projectField)
  ) {
    return normalizeNumber(value);
  }

  if (
    booleanFields.has(projectField)
  ) {
    return normalizeBoolean(value);
  }

  const aliases =
    enumAliases[projectField];

  if (
    aliases &&
    typeof value === "string"
  ) {
    const normalizedKey =
      normalizeLookupKey(value);

    return (
      aliases[normalizedKey] ??
      value
    );
  }

  if (Array.isArray(value)) {
    return value
      .map((item) =>
        typeof item === "string"
          ? item.trim()
          : item
      )
      .filter(
        (item) =>
          item !== "" &&
          item !== null &&
          item !== undefined
      );
  }

  if (typeof value === "string") {
    return value.trim();
  }

  return value;
}

export function normalizeProjectPatchValues(
  input: unknown
): unknown {
  if (!isRecord(input)) {
    return input;
  }

  const normalized =
    structuredCloneSafe(input);

  normalizePatchField(
    normalized,
    "property.projectType"
  );

  normalizePatchField(
    normalized,
    "property.constructionType"
  );

  normalizePatchField(
    normalized,
    "property.ceilingType"
  );

  normalizePatchField(
    normalized,
    "cabling.preferredCableType"
  );

  normalizePatchField(
    normalized,
    "cabling.wiringStyle"
  );

  normalizePatchField(
    normalized,
    "installation.difficultyLevel"
  );

  for (
    const field of booleanFields
  ) {
    normalizePatchField(
      normalized,
      field
    );
  }

  return normalized;
}

function normalizePatchField(
  patch: UnknownRecord,
  projectField: string
): void {
  const parts =
    projectField.split(".");

  if (parts.length !== 2) {
    return;
  }

  const [
    sectionName,
    fieldName,
  ] = parts;

  const section =
    patch[sectionName];

  if (!isRecord(section)) {
    return;
  }

  if (
    !Object.prototype.hasOwnProperty.call(
      section,
      fieldName
    )
  ) {
    return;
  }

  section[fieldName] =
    normalizeProjectFieldValue(
      projectField,
      section[fieldName]
    );
}

function normalizeNumber(
  value: unknown
): unknown {
  if (
    typeof value === "number"
  ) {
    return Number.isFinite(value)
      ? value
      : value;
  }

  if (
    typeof value !== "string"
  ) {
    return value;
  }

  const trimmed =
    value.trim();

  if (!trimmed) {
    return value;
  }

  const match =
    trimmed
      .replace(/,/g, "")
      .match(/-?\d+(?:\.\d+)?/);

  if (!match) {
    return value;
  }

  const parsed =
    Number(match[0]);

  return Number.isFinite(parsed)
    ? parsed
    : value;
}

function normalizeBoolean(
  value: unknown
): PrimitiveAnswer {
  if (
    typeof value === "boolean" ||
    value === null ||
    value === undefined
  ) {
    return value;
  }

  if (
    typeof value !== "string"
  ) {
    return value as PrimitiveAnswer;
  }

  const key =
    normalizeLookupKey(value);

  if (
    [
      "yes",
      "true",
      "required",
      "needed",
      "included",
      "existing",
      "available",
      "occupied",
    ].includes(key)
  ) {
    return true;
  }

  if (
    [
      "no",
      "false",
      "not_required",
      "not_needed",
      "not_included",
      "none",
      "not_available",
      "unoccupied",
    ].includes(key)
  ) {
    return false;
  }

  if (
    [
      "unknown",
      "unsure",
      "not_sure",
      "i_dont_know",
    ].includes(key)
  ) {
    return null;
  }

  return value;
}

function normalizeLookupKey(
  value: string
): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function isRecord(
  value: unknown
): value is UnknownRecord {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function structuredCloneSafe(
  input: UnknownRecord
): UnknownRecord {
  if (
    typeof structuredClone ===
    "function"
  ) {
    return structuredClone(
      input
    ) as UnknownRecord;
  }

  return JSON.parse(
    JSON.stringify(input)
  ) as UnknownRecord;
}