import { NextRequest, NextResponse } from "next/server";
import { sanityWriteClient } from "@/lib/sanityWriteClient";

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ ok: false, error: "Missing lead id" }, { status: 400 });
    }

    const booking = await sanityWriteClient.fetch<{ _id: string } | null>(
      `*[_type == "walkthroughBooking" && _id == $id][0]{_id}`,
      { id }
    );

    if (!booking?._id) {
      return NextResponse.json({ ok: false, error: "Lead not found" }, { status: 404 });
    }

    await sanityWriteClient.delete(booking._id);

    return NextResponse.json({ ok: true, deletedId: booking._id });
  } catch (error) {
    console.error("[owner lead delete] error", error);
    return NextResponse.json(
      { ok: false, error: "Failed to delete lead" },
      { status: 500 }
    );
  }
}
