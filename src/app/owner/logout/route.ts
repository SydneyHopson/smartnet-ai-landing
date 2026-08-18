import { NextResponse } from "next/server";

export async function POST(){const res=NextResponse.json({ok:true});const opts={httpOnly:true,sameSite:"lax" as const,secure:process.env.NODE_ENV==="production",path:"/",maxAge:0};res.cookies.set("smartnet_owner_authed","",opts);res.cookies.set("smartnet_owner_session","",opts);return res}
