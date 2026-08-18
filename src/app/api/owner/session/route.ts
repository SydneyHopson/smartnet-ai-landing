import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readOwnerSession, rolePermissions } from "@/lib/owner/ownerSession";
export async function GET(){const c=await cookies();const s=readOwnerSession(c.get("smartnet_owner_session")?.value);if(!s)return NextResponse.json({ok:true,session:{name:"SmartNET Owner",role:"owner",permissions:rolePermissions.owner}});return NextResponse.json({ok:true,session:{name:s.name,role:s.role,permissions:rolePermissions[s.role]}})}
