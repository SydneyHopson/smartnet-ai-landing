import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAzureOpenAI, azureDeployment } from "@/lib/azure-openai";
import { sanityWriteClient } from "@/lib/sanityWriteClient";
import { readOwnerSession, rolePermissions } from "@/lib/owner/ownerSession";

type OwnerAIRequest = {
  message?: string;
  page?: string;
  entityType?: string | null;
  entityId?: string | null;
};

type MemoryDoc = {
  _id: string;
  question?: string;
  answer?: string;
  page?: string;
  entityType?: string | null;
  entityId?: string | null;
  createdAt?: string;
};

async function loadBusinessContext(entityType?: string | null, entityId?: string | null) {
  const [summary, entity, memories] = await Promise.all([
    sanityWriteClient.fetch(`{
      "leadCount": count(*[_type=="walkthroughBooking"]),
      "openLeadCount": count(*[_type=="walkthroughBooking" && !(status match "*complete*")]),
      "jobCount": count(*[_type=="smartnetJob"]),
      "quoteCount": count(*[_type=="smartnetQuote"]),
      "customerCount": count(*[_type=="walkthroughBooking"]),
      "openFollowUps": count(*[_type=="walkthroughBooking" && (status match "*follow*" || defined(ownerFollowUpDueAt) || defined(followupWalkthroughDateISO))]),
      "workOrderCount": count(*[_type=="smartnetWorkOrder"]),
      "invoiceCount": count(*[_type=="smartnetInvoice"]),
      "expenseTotal": math::sum(*[_type=="smartnetExpense"].amount)
    }`),
    entityId
      ? sanityWriteClient.fetch(`*[_id==$id][0]{...}`, { id: entityId })
      : Promise.resolve(null),
    sanityWriteClient.fetch<MemoryDoc[]>(
      `*[_type=="smartnetAIMemory"] | order(createdAt desc)[0...12]{_id,question,answer,page,entityType,entityId,createdAt}`,
    ),
  ]);
  return { summary, entityType: entityType || null, entity, memories };
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as OwnerAIRequest;
    const message = body.message?.trim();
    if (!message) return NextResponse.json({ ok: false, error: "Message is required" }, { status: 400 });

    const cookieStore = await cookies();
    const session = readOwnerSession(cookieStore.get("smartnet_owner_session")?.value);
    const actor = session
      ? { userId: session.userId, name: session.name, role: session.role, permissions: rolePermissions[session.role] }
      : { userId: "owner", name: "SmartNET Owner", role: "owner" as const, permissions: rolePermissions.owner };

    const context = await loadBusinessContext(body.entityType, body.entityId);
    const client = getAzureOpenAI();
    const completion = await client.chat.completions.create({
      model: azureDeployment,
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content: `You are SmartNET AI, the operating intelligence for SmartNET Installation LLC. You assist authenticated owner-side users across CRM, leads, walkthroughs, jobs, quotes, customers, follow-ups, growth, operations, reports and documents. Be concise, commercially aware and action-oriented. Never invent business facts. Use supplied SmartNET context as source of truth. If data is missing, say what is missing. Do not claim an action was completed unless the application actually executed it. The current user is ${actor.name}, role ${actor.role}, permissions: ${actor.permissions.join(", ")}.`,
        },
        {
          role: "system",
          content: `Current page: ${body.page || "owner console"}. Current entity type: ${body.entityType || "none"}. SmartNET context JSON: ${JSON.stringify(context)}`,
        },
        { role: "user", content: message },
      ],
    });

    const answer = completion.choices[0]?.message?.content?.trim() || "I couldn't generate a response from the available SmartNET data.";
    const createdAt = new Date().toISOString();
    await sanityWriteClient.create({
      _type: "smartnetAIMemory",
      question: message,
      answer,
      page: body.page || null,
      entityType: body.entityType || null,
      entityId: body.entityId || null,
      actorId: actor.userId,
      actorName: actor.name,
      actorRole: actor.role,
      createdAt,
    });

    await sanityWriteClient.create({
      _type: "smartnetActivity",
      eventType: "ai_interaction",
      customerName: context.entity?.contactName || context.entity?.customerName || actor.name,
      sourceId: body.entityId || null,
      sourceType: body.entityType || "owner_ai",
      occurredAt: createdAt,
      metadata: { page: body.page || null, actorName: actor.name },
    });

    return NextResponse.json({ ok: true, answer });
  } catch (error) {
    console.error("[owner ai]", error);
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : "SmartNET AI failed" }, { status: 500 });
  }
}
