import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "smartnet_owner_session";

type OwnerSession = {
  userId: string;
  name: string;
  role: string;
  exp: number;
};

function unauthorized(req: NextRequest, pathname: string, search: string) {
  if (pathname.startsWith("/api/owner")) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = "/owner/access";
  loginUrl.search = "";
  loginUrl.searchParams.set("next", `${pathname}${search}`);
  return NextResponse.redirect(loginUrl);
}

function base64UrlToBytes(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
  const binary = atob(padded);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

async function validOwnerSession(raw: string | undefined) {
  const secret = process.env.OWNER_SESSION_SECRET || process.env.OWNER_PASS || "";
  if (!raw || !secret) return false;

  const [encoded, signature] = raw.split(".");
  if (!encoded || !signature) return false;

  try {
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const verified = await crypto.subtle.verify(
      "HMAC",
      key,
      base64UrlToBytes(signature),
      new TextEncoder().encode(encoded)
    );
    if (!verified) return false;

    const payload = JSON.parse(
      new TextDecoder().decode(base64UrlToBytes(encoded))
    ) as OwnerSession;

    return (
      typeof payload.userId === "string" &&
      typeof payload.name === "string" &&
      typeof payload.role === "string" &&
      typeof payload.exp === "number" &&
      payload.exp >= Math.floor(Date.now() / 1000)
    );
  } catch {
    return false;
  }
}

export async function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  const isAccessPage = pathname === "/owner/access";
  const isAccessApi = pathname === "/api/owner/access";
  const isLogoutRoute = pathname === "/owner/logout";

  if (isAccessPage || isAccessApi || isLogoutRoute) {
    return NextResponse.next();
  }

  const isOwnerRoute = pathname.startsWith("/owner");
  const isOwnerApiRoute = pathname.startsWith("/api/owner");
  if (!isOwnerRoute && !isOwnerApiRoute) return NextResponse.next();

  const session = req.cookies.get(SESSION_COOKIE)?.value;
  if (await validOwnerSession(session)) return NextResponse.next();

  return unauthorized(req, pathname, search);
}

export const config = {
  matcher: ["/owner/:path*", "/api/owner/:path*"],
};
