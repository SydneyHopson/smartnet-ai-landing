import type { ProjectEstimate } from "../domain/project-estimate";
import type { PlaybookCondition } from "./playbook";

function getValueAtPath(
  source: unknown,
  path: string
): unknown {
  const parts = path.split(".");

  let current: unknown = source;

  for (const part of parts) {
    if (
      current === null ||
      current === undefined ||
      typeof current !== "object"
    ) {
      return undefined;
    }

    current = (current as Record<string, unknown>)[part];
  }

  return current;
}

function normalizeText(value: unknown): string {
  if (typeof value === "string") {
    return value.trim().toLowerCase();
  }

  return "";
}

function isUnknownValue(value: unknown): boolean {
  if (value === null || value === undefined) {
    return true;
  }

  if (typeof value === "string") {
    return value.trim() === "" || value === "unknown";
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (
    typeof value === "object" &&
    value !== null &&
    "value" in value
  ) {
    const quantityValue = (
      value as {
        value?: unknown;
      }
    ).value;

    return quantityValue === null || quantityValue === undefined;
  }

  return false;
}

function unwrapQuantity(value: unknown): unknown {
  if (
    typeof value === "object" &&
    value !== null &&
    "value" in value
  ) {
    return (
      value as {
        value?: unknown;
      }
    ).value;
  }

  return value;
}

function matchesIncludes(
  actual: unknown,
  expected: unknown
): boolean {
  const expectedValues = Array.isArray(expected)
    ? expected
    : [expected];

  if (Array.isArray(actual)) {
    const actualValues = actual.map((item) =>
      normalizeText(item)
    );

    return expectedValues.some((item) =>
      actualValues.some((actualItem) =>
        actualItem.includes(normalizeText(item))
      )
    );
  }

  const actualText = normalizeText(actual);

  return expectedValues.some((item) =>
    actualText.includes(normalizeText(item))
  );
}

export function evaluatePlaybookCondition(
  project: ProjectEstimate,
  condition: PlaybookCondition
): boolean {
  const rawActualValue = getValueAtPath(
    project,
    condition.field
  );

  const actualValue = unwrapQuantity(rawActualValue);
  const expectedValue = condition.value;

  switch (condition.operator) {
    case "equals":
      return actualValue === expectedValue;

    case "not_equals":
      return actualValue !== expectedValue;

    case "includes":
      return matchesIncludes(actualValue, expectedValue);

    case "not_includes":
      return !matchesIncludes(actualValue, expectedValue);

    case "greater_than":
      return (
        typeof actualValue === "number" &&
        typeof expectedValue === "number" &&
        actualValue > expectedValue
      );

    case "greater_than_or_equal":
      return (
        typeof actualValue === "number" &&
        typeof expectedValue === "number" &&
        actualValue >= expectedValue
      );

    case "less_than":
      return (
        typeof actualValue === "number" &&
        typeof expectedValue === "number" &&
        actualValue < expectedValue
      );

    case "less_than_or_equal":
      return (
        typeof actualValue === "number" &&
        typeof expectedValue === "number" &&
        actualValue <= expectedValue
      );

    case "is_known":
      return !isUnknownValue(rawActualValue);

    case "is_unknown":
      return isUnknownValue(rawActualValue);

    case "is_true":
      return actualValue === true;

    case "is_false":
      return actualValue === false;

    default:
      return false;
  }
}

export function evaluateAllPlaybookConditions(
  project: ProjectEstimate,
  conditions: PlaybookCondition[]
): boolean {
  return conditions.every((condition) =>
    evaluatePlaybookCondition(project, condition)
  );
}