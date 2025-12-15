export function normalizeEmail(v?: string | null) {
  return (v ?? "").trim().toLowerCase() || null;
}

export function normalizePhone(v?: string | null) {
  const digits = (v ?? "").replace(/[^\d+]/g, "");
  return digits.length ? digits : null;
}

export function getPersonKey(input: { email?: string | null; phone?: string | null }) {
  const email = normalizeEmail(input.email);
  if (email) return `email:${email}`;

  const phone = normalizePhone(input.phone);
  if (phone) return `phone:${phone}`;

  return "unknown";
}

export function resolveDisplayName(input: {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
}) {
  const name = (input.name ?? "").trim();
  if (name) return name;

  const email = normalizeEmail(input.email);
  if (email) return email;

  const phone = normalizePhone(input.phone);
  if (phone) return phone;

  return "Unknown";
}
