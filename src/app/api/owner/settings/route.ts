import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sanityWriteClient } from "@/lib/sanityWriteClient";
import { can, readOwnerSession } from "@/lib/owner/ownerSession";

const ID = "smartnet-owner-settings";

const defaults = {
  businessName: "SmartNET Installation LLC",
  businessEmail: "",
  businessPhone: "",
  businessAddress: "",
  timezone: "America/New_York",
  defaultLeadSource: "Website / Estimator",
  defaultFollowUpDays: 2,
  quoteExpirationDays: 14,
  walkthroughDurationMinutes: 60,
  businessHoursStart: "08:00",
  businessHoursEnd: "18:00",
  notifications: {
    newLead: true,
    walkthrough: true,
    followUp: true,
    quoteApproved: true,
  },
  automation: {
    autoFollowUp: true,
    showPipelineValues: true,
    customerDeduplication: true,
  },
};

async function authorize() {
  const cookieStore = await cookies();
  const session = readOwnerSession(
    cookieStore.get("smartnet_owner_session")?.value
  );

  return session && can(session.role, "settings") ? session : null;
}

export async function GET() {
  if (!(await authorize())) {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  const doc = await sanityWriteClient.fetch(
    `*[_id==$id][0]{...}`,
    { id: ID }
  );

  return NextResponse.json({
    ok: true,
    settings: doc
      ? {
          ...defaults,
          ...doc,
          notifications: {
            ...defaults.notifications,
            ...doc.notifications,
          },
          automation: {
            ...defaults.automation,
            ...doc.automation,
          },
        }
      : defaults,
  });
}

export async function PUT(req: NextRequest) {
  if (!(await authorize())) {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await req.json();

    const clean = {
      businessName: String(body.businessName || defaults.businessName).slice(0, 120),
      businessEmail: String(body.businessEmail || "").slice(0, 160),
      businessPhone: String(body.businessPhone || "").slice(0, 60),
      businessAddress: String(body.businessAddress || "").slice(0, 240),
      timezone: String(body.timezone || defaults.timezone).slice(0, 80),
      defaultLeadSource: String(
        body.defaultLeadSource || defaults.defaultLeadSource
      ).slice(0, 100),
      defaultFollowUpDays: Math.max(
        0,
        Math.min(30, Number(body.defaultFollowUpDays) || 2)
      ),
      quoteExpirationDays: Math.max(
        1,
        Math.min(90, Number(body.quoteExpirationDays) || 14)
      ),
      walkthroughDurationMinutes: Math.max(
        15,
        Math.min(480, Number(body.walkthroughDurationMinutes) || 60)
      ),
      businessHoursStart: String(body.businessHoursStart || "08:00"),
      businessHoursEnd: String(body.businessHoursEnd || "18:00"),
      notifications: {
        newLead: body.notifications?.newLead !== false,
        walkthrough: body.notifications?.walkthrough !== false,
        followUp: body.notifications?.followUp !== false,
        quoteApproved: body.notifications?.quoteApproved !== false,
      },
      automation: {
        autoFollowUp: body.automation?.autoFollowUp !== false,
        showPipelineValues: body.automation?.showPipelineValues !== false,
        customerDeduplication: body.automation?.customerDeduplication !== false,
      },
      updatedAt: new Date().toISOString(),
    };

    await sanityWriteClient.createOrReplace({
      _id: ID,
      _type: "smartnetOwnerSettings",
      ...clean,
    });

    return NextResponse.json({ ok: true, settings: clean });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unable to save settings",
      },
      { status: 400 }
    );
  }
}
