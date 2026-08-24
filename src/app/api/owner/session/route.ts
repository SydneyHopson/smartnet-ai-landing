import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readOwnerSession, rolePermissions } from "@/lib/owner/ownerSession";

export async function GET() {
  const cookieStore = await cookies();
  const session = readOwnerSession(
    cookieStore.get("smartnet_owner_session")?.value
  );

  if (!session) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    ok: true,
    session: {
      name: session.name,
      role: session.role,
      permissions: rolePermissions[session.role],
    },
  });
}
