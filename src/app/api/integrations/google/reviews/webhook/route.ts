import { NextRequest, NextResponse } from "next/server";
import { sanityWriteClient } from "@/lib/sanityWriteClient";

function decode(data?:string){if(!data)return null;try{return JSON.parse(Buffer.from(data,"base64").toString("utf8"))}catch{return null}}
export async function POST(req:NextRequest){try{const body=await req.json();const message=body?.message||body;const payload=decode(message?.data)||message?.data||{};const id=String(message?.messageId||message?.message_id||crypto.randomUUID());await sanityWriteClient.createIfNotExists({_id:`googleReviewEvent-${id.replace(/[^a-zA-Z0-9_-]/g,"-")}`,_type:"smartnetMarketingEvent",provider:"Google Business",eventType:"review_notification",payloadJson:JSON.stringify(payload).slice(0,20000),createdAt:new Date().toISOString()});return NextResponse.json({ok:true})}catch(e){console.error("[google review webhook]",e);return NextResponse.json({ok:false},{status:400})}}
