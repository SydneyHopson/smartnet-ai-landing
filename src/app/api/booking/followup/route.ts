// src/app/api/booking/followup/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sanityWriteClient } from "@/lib/sanityWriteClient";

type FollowupPayload = {
  bookingId: string;
  followupDateISO: string;   // "2025-12-15"
  followupTimeSlot: string;  // "10:00 AM – 11:00 AM"
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as FollowupPayload;
    const { bookingId, followupDateISO, followupTimeSlot } = body;

    if (!bookingId || !followupDateISO || !followupTimeSlot) {
      return NextResponse.json(
        { error: "bookingId, followupDateISO, and followupTimeSlot are required." },
        { status: 400 }
      );
    }

    const patched = await sanityWriteClient
      .patch(bookingId)
      .set({
        followupWalkthroughDateISO: followupDateISO,
        followupWalkthroughTimeSlot: followupTimeSlot,
      })
      .commit({ autoGenerateArrayKeys: true });

    return NextResponse.json(
      {
        ok: true,
        id: patched._id,
        followupWalkthroughDateISO: patched.followupWalkthroughDateISO,
        followupWalkthroughTimeSlot: patched.followupWalkthroughTimeSlot,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[SmartNET followup booking API error]", err);
    return NextResponse.json(
      { error: "Failed to save follow-up walkthrough" },
      { status: 500 }
    );
  }
}
