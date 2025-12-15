import { NextResponse } from "next/server";

export function proxy(_req: Request) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/owner/:path*", "/api/owner/:path*"],
};