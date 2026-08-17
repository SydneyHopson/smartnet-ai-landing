import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { sanityWriteClient } from "@/lib/sanityWriteClient";
import { resend } from "@/lib/email";
import { renderProjectBriefPdf } from "@/lib/project-brief-pdf";
import { buildEstimateSummary, getEstimateTotal, type SmartNetEstimateSnapshot } from "@/lib/estimate-snapshot";

type MagicLinkPayload = { contact: { email: string | null; phone: string | null; fullName?: string | null; jobLocation?: string | null }; estimate: SmartNetEstimateSnapshot | null };
const normalizeEmail=(v:string|null)=>{const s=v?.trim().toLowerCase();return s||null};
const normalizePhone=(v:string|null)=>{const s=v?.trim();return s||null};

export async function POST(req: NextRequest) {
  try {
    const body=(await req.json()) as MagicLinkPayload;
    const email=normalizeEmail(body.contact?.email??null), phone=normalizePhone(body.contact?.phone??null);
    const fullName=body.contact?.fullName?.trim()||undefined, jobLocation=body.contact?.jobLocation?.trim()||null, estimate=body.estimate??null;
    if(!email&&!phone) return NextResponse.json({error:"Email or phone is required"},{status:400});

    const token=randomUUID();
    const baseUrl=process.env.NEXT_PUBLIC_APP_URL??"http://localhost:3000";
    const quoteUrl=`${baseUrl}/quote/${token}`;
    const estimateTotal=getEstimateTotal(estimate), estimateSummary=buildEstimateSummary(estimate);
    const now=new Date(), expires=new Date(now); expires.setDate(now.getDate()+7);
    let leadId:string|null=null;

    if(email){const existing=await sanityWriteClient.fetch<{_id:string}|null>(`*[_type == "smartnetLead" && lower(email) == $email][0]{ _id }`,{email});leadId=existing?._id??null;}
    if(!leadId&&phone){const existing=await sanityWriteClient.fetch<{_id:string}|null>(`*[_type == "smartnetLead" && phone == $phone][0]{ _id }`,{phone});leadId=existing?._id??null;}
    if(!leadId){const created=await sanityWriteClient.create({_type:"smartnetLead",fullName:fullName??(email?email.split("@")[0]:"SmartNET Lead"),email:email??`phone-${phone?.replace(/\D/g,"")||token}@smartnet.local`,phone:phone??undefined,primaryJobLocation:jobLocation??undefined,leadSource:"smartnet_funnel",status:"new",lastEstimateTotal:estimateTotal??undefined,lastEstimateCurrency:"USD",lastInteractionAt:now.toISOString(),createdAt:now.toISOString(),updatedAt:now.toISOString()});leadId=created._id;}
    else {const update:Record<string,unknown>={lastEstimateTotal:estimateTotal??undefined,lastEstimateCurrency:"USD",lastInteractionAt:now.toISOString(),updatedAt:now.toISOString(),status:"engaged"};if(phone)update.phone=phone;if(jobLocation)update.primaryJobLocation=jobLocation;if(fullName)update.fullName=fullName;await sanityWriteClient.patch(leadId).set(update).commit({autoGenerateArrayKeys:true});}

    const sessionDoc=await sanityWriteClient.create({_type:"magicLinkSession",token,lead:leadId?{_type:"reference",_ref:leadId}:undefined,email,phone,jobLocation,source:"magic_link",status:"active",estimateTotal:estimateTotal??undefined,estimateSummary,estimateSnapshot:estimate??undefined,rawEstimateJson:estimate?JSON.stringify(estimate):undefined,expiresAt:expires.toISOString(),createdAt:now.toISOString(),restored:false});
    if(leadId) await sanityWriteClient.patch(leadId).setIfMissing({magicLinkSessions:[]}).append("magicLinkSessions",[{_type:"reference",_ref:sessionDoc._id}]).commit({autoGenerateArrayKeys:true});

    let emailSent=false,emailId:string|null=null,emailError:string|null=null;
    if(email){
      try{
        const pdf=await renderProjectBriefPdf(estimate,fullName);
        const result=await resend.emails.send({
          from:process.env.EMAIL_FROM||"SmartNET <onboarding@resend.dev>",to:email,subject:"Your SmartNET Project Brief & Saved Project",
          html:`<div style="font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#0f172a;"><h2>Your SmartNET project is ready</h2><p>Hi${fullName?` ${fullName}`:""},</p><p>Your project profile${estimate?", preliminary estimate, equipment scope and installation details":""} are saved together. Your SmartNET Project Brief is attached as a PDF for your records.</p><p><a href="${quoteUrl}" style="display:inline-block;background:#0369a1;color:#fff;text-decoration:none;font-weight:700;padding:12px 18px;border-radius:8px;">Open My SmartNET Project</a></p><p style="font-size:13px;color:#64748b;">${estimateSummary}</p><p style="font-size:12px;color:#94a3b8;">Your secure project link expires in 7 days.</p></div>`,
          attachments:[{filename:"SmartNET-Project-Brief.pdf",content:pdf}],
        });
        emailId=result.data?.id??null;emailSent=Boolean(emailId)&&!result.error;if(result.error)emailError=result.error.message;
      }catch(emailErr){emailError=emailErr instanceof Error?emailErr.message:"Magic-link email failed";console.error("[SmartNET magic link email error]",emailErr);}
    }
    return NextResponse.json({ok:true,quoteUrl,token,leadId,sessionId:sessionDoc._id,email:{attempted:Boolean(email),sent:emailSent,id:emailId,error:emailError}},{status:200});
  }catch(err){console.error("[SmartNET magic link error]",err);return NextResponse.json({error:"Something went wrong"},{status:500});}
}
