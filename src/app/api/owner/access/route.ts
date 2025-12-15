// File: src/app/api/owner/access/route.ts
import { NextResponse } from "next/server";

const COOKIE_NAME = "smartnet_owner_authed";

// Simple in-memory rate limit (works great locally / single instance)
// For production multi-instance, use Upstash/Redis later.
type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

function getClientIp(req: Request): string {
  const xfwd = req.headers.get("x-forwarded-for");
  if (xfwd) return xfwd.split(",")[0]?.trim() || "unknown";
  const xreal = req.headers.get("x-real-ip");
  return xreal?.trim() || "unknown";
}

function rateLimit(ip: string, limit = 10, windowMs = 60_000) {
  const now = Date.now();
  const b = buckets.get(ip);

  if (!b || now > b.resetAt) {
    buckets.set(ip, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }

  b.count += 1;
  buckets.set(ip, b);

  if (b.count > limit) return { ok: false, remaining: 0 };
  return { ok: true, remaining: Math.max(0, limit - b.count) };
}

// Avoid naive timing leaks (small win, cheap to do)
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const rl = rateLimit(ip, 12, 60_000); // 12 tries / minute / IP
    if (!rl.ok) {
      return NextResponse.json(
        { ok: false, error: "Too many attempts. Try again shortly." },
        { status: 429, headers: { "Retry-After": "60" } }
      );
    }

    const body = (await req.json().catch(() => null)) as
      | { user?: string; pass?: string }
      | null;

    const user = (body?.user ?? "").trim();
    const pass = body?.pass ?? "";

    const expectedUser = process.env.OWNER_USER ?? "";
    const expectedPass = process.env.OWNER_PASS ?? "";

    if (!expectedUser || !expectedPass) {
      return NextResponse.json(
        { ok: false, error: "Server missing OWNER_USER/OWNER_PASS" },
        { status: 500 }
      );
    }

    // Normalize user compare, keep pass strict
    const userOk = safeEqual(user, expectedUser);
    const passOk = safeEqual(pass, expectedPass);

    if (!userOk || !passOk) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }

    const res = NextResponse.json({ ok: true });

    res.cookies.set(COOKIE_NAME, "1", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
