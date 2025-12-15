// src/lib/idempotency.ts

function normalizeEmail(value?: string) {
  return (value ?? "").trim().toLowerCase();
}

function normalizePhone(value?: string) {
  return (value ?? "").replace(/[^\d+]/g, "");
}

function normalizeSlot(value?: string) {
  return (value ?? "").trim();
}

function normalizeType(value?: string) {
  return (value ?? "").trim().toLowerCase();
}

export async function buildIdempotencyKey(input: {
  email?: string;
  phone?: string;
  dateISO: string;
  timeSlot: string;
  appointmentType: string;
}) {
  const email = normalizeEmail(input.email);
  const phone = normalizePhone(input.phone);

  // Prefer email → fallback phone → last-resort constant
  const stableUserKey = email || phone || "anonymous";

  const raw = [
    stableUserKey,
    input.dateISO,
    normalizeSlot(input.timeSlot),
    normalizeType(input.appointmentType),
  ].join("|");

  // Web Crypto API (safe in Next.js route handlers)
  const encoder = new TextEncoder();
  const data = encoder.encode(raw);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  const hash = Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hash;
}
