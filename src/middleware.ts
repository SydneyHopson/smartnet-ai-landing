// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "smartnet_owner_authed"; // ✅ match /api/owner/access/route.ts

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  const isOwnerPage = pathname.startsWith("/owner");
  const isOwnerApi = pathname.startsWith("/api/owner");

  // ✅ If someone hits exactly /owner, send them somewhere real
  if (pathname === "/owner") {
    const url = req.nextUrl.clone();
    url.pathname = "/owner/dashboard";
    return NextResponse.redirect(url);
  }

  // Only protect owner pages + owner APIs
  if (!isOwnerPage && !isOwnerApi) return NextResponse.next();

  // Always allow the login page + login API route
  if (pathname === "/owner/access" || pathname === "/api/owner/access") {
    return NextResponse.next();
  }

  // ✅ Must match the cookie you set in /api/owner/access/route.ts
  const authed = req.cookies.get(COOKIE_NAME)?.value === "1";
  if (authed) return NextResponse.next();

  // If they hit an API route while not authed, return 401 (no redirect loops)
  if (isOwnerApi) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  // Otherwise redirect to branded access page, keep where they were going
  const url = req.nextUrl.clone();
  url.pathname = "/owner/access";
  url.searchParams.set(
    "next",
    pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "")
  );

  return NextResponse.redirect(url);
}

export const config = {
  // ✅ include bare /owner + bare /api/owner too
  matcher: ["/owner", "/owner/:path*", "/api/owner", "/api/owner/:path*"],
};
