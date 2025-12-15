import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sanityWriteClient } from "@/lib/sanityWriteClient";

// ✅ Adjust these to match YOUR schema doc type names
const DOC_TYPES_TO_CLEAR = [
  "walkthroughBooking",
  "magicLinkSession",
  "smartnetLead",
  "leadEvent",
] as const;

// ✅ simple “owner auth” gate (uses the same cookie you already rely on)
// If your cookie name is different, change it here.
function requireOwner(reqCookies: ReturnType<typeof cookies>) {
  const token =
    reqCookies.get("owner_session")?.value ||
    reqCookies.get("smartnet_owner")?.value ||
    reqCookies.get("owner")?.value;

  return Boolean(token);
}

export async function DELETE(req: Request) {
  try {
    // ✅ DEV safety lock (won’t run in production)
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { ok: false, error: "Disabled in production." },
        { status: 403 }
      );
    }

    // ✅ Auth lock (ties into your existing owner login cookie)
    const reqCookies = cookies();
    if (!requireOwner(reqCookies)) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized." },
        { status: 401 }
      );
    }

    // ✅ Optional extra lock: require a header secret
    // Add OWNER_DEV_SECRET="something" in .env.local if you want this.
    const secret = process.env.OWNER_DEV_SECRET;
    if (secret) {
      const got = req.headers.get("x-owner-dev-secret");
      if (got !== secret) {
        return NextResponse.json(
          { ok: false, error: "Forbidden." },
          { status: 403 }
        );
      }
    }

    // ✅ “Test” heuristics: delete ONLY docs that look like test/dev data
    // - marked isTest == true
    // - OR email/name contains "test"
    // - OR email contains "example.com"
    // - OR phone includes "555"
    // - OR created in last 14 days (keeps it from deleting ancient real stuff)
    const groq = `
      *[
        _type in $types
        && (
          isTest == true
          || lower(coalesce(customerEmail,"")) match "*test*"
          || lower(coalesce(customerName,"")) match "*test*"
          || lower(coalesce(email,"")) match "*test*"
          || lower(coalesce(name,"")) match "*test*"
          || lower(coalesce(customerEmail,"")) match "*example.com*"
          || coalesce(customerPhone,"") match "*555*"
          || coalesce(phone,"") match "*555*"
        )
        && _createdAt > $since
      ][]._id
    `;

    const since = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString();

    const ids = await sanityWriteClient.fetch<string[]>(groq, {
      types: DOC_TYPES_TO_CLEAR,
      since,
    });

    if (!ids.length) {
      return NextResponse.json({ ok: true, deleted: 0, ids: [] });
    }

    // ✅ Delete in a transaction
    let tx = sanityWriteClient.transaction();
    ids.forEach((id) => {
      tx = tx.delete(id);
    });
    await tx.commit();

    return NextResponse.json({ ok: true, deleted: ids.length, ids });
  } catch (err) {
    console.error("[owner][clear-test-data]", err);
    return NextResponse.json(
      { ok: false, error: "Failed to clear test data." },
      { status: 500 }
    );
  }
}
