import { NextResponse } from "next/server";
import { sanityWriteClient } from "@/lib/sanityWriteClient";
export async function GET(){const reviews=await sanityWriteClient.fetch(`*[_type=="smartnetReview" && published==true]|order(reviewedAt desc)[0...12]{_id,provider,reviewerName,comment,rating,reviewUrl,reviewedAt}`);return NextResponse.json({ok:true,reviews},{headers:{"Cache-Control":"public, s-maxage=300, stale-while-revalidate=600"}})}
