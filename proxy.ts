import { NextRequest, NextResponse } from "next/server";

const OWNER_COOKIE = "smartnet_owner_authed";

export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // The owner login endpoint and login page must remain reachable
  // without an existing owner session.
  const isAccessPage = pathname === "/owner/access";
  const isAccessApi = pathname === "/api/owner/access";
  const isLogoutRoute = pathname === "/owner/logout";

  if (isAccessPage || isAccessApi || isLogoutRoute) {
    return NextResponse.next();
  }

  const isOwnerRoute = pathname.startsWith("/owner");
  const isOwnerApiRoute = pathname.startsWith("/api/owner");

  if (!isOwnerRoute && !isOwnerApiRoute) {
    return NextResponse.next();
  }

  const isAuthenticated = req.cookies.get(OWNER_COOKIE)?.value === "1";

  if (isAuthenticated) {
    return NextResponse.next();
  }

  // API callers get an HTTP auth error instead of HTML/redirect content.
  if (isOwnerApiRoute) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  // Browser traffic gets sent to the private owner login and returned to
  // the originally requested owner page after successful authentication.
  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = "/owner/access";
  loginUrl.search = "";
  loginUrl.searchParams.set("next", `${pathname}${search}`);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  // Deliberately scoped ONLY to SmartNET owner/admin routes.
  // The public estimator and customer-facing APIs are untouched.
  matcher: ["/owner/:path*", "/api/owner/:path*"],
};
