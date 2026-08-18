import type { ReactElement } from "react";
import { sanityWriteClient } from "@/lib/sanityWriteClient";
import { OwnerFollowUpsClient, type OwnerFollowUp } from "@/components/owner/OwnerFollowUpsClient";
import { followUpDueAt, getOwnerSettings, isCompleted } from "@/lib/owner/ownerData";

type Doc={_id:string;status?:string|null;contactName?:string|null;contactEmail?:string|null;contactPhone?:string|null;dateISO?:string|null;timeSlot?:string|null;followupWalkthroughDateISO?:string|null;followupWalkthroughTimeSlot?:string|null;ownerFollowUpDueAt?:string|null;estimateRoughRange?:string|null;estimateTotal?:number|null;jobLocationNote?:string|null;projectType?:string|null;requestedServices?:string|null;createdAt?:string|null};
const numberFrom=(s:string)=>{const n=Number(s.replace(/[^0-9.]/g,""));return Number.isFinite(n)?n:null};
function value(d:Doc){if(d.estimateRoughRange){const p=d.estimateRoughRange.split("–").map(numberFrom);if(p.length===2)return p[1]??p[0]??0}return d.estimateTotal??0}

async function getFollowUps():Promise<OwnerFollowUp[]>{
  const settings=await getOwnerSettings();
  const docs=await sanityWriteClient.fetch<Doc[]>(`*[_type=="walkthroughBooking"]|order(coalesce(followupWalkthroughDateISO,ownerFollowUpDueAt,createdAt) asc){_id,status,contactName,contactEmail,contactPhone,dateISO,timeSlot,followupWalkthroughDateISO,followupWalkthroughTimeSlot,ownerFollowUpDueAt,estimateRoughRange,estimateTotal,jobLocationNote,projectType,requestedServices,createdAt}`);
  const followUps:OwnerFollowUp[]=[];
  for(const d of docs){
    const due=followUpDueAt(d,settings);
    if(!due||isCompleted(d.status))continue;
    const explicit=Boolean(d.followupWalkthroughDateISO);
    const dt=new Date(due);
    const state:OwnerFollowUp["state"]=dt.getTime()<Date.now()?"overdue":explicit?"scheduled":"needs_action";
    followUps.push({id:d._id,customerName:d.contactName||"Unknown customer",email:d.contactEmail||null,phone:d.contactPhone||null,location:d.jobLocationNote||null,projectType:d.projectType||null,services:d.requestedServices||null,state,scheduledFor:due,timeSlot:d.followupWalkthroughTimeSlot||null,originalWalkthrough:d.dateISO||null,pipelineValue:value(d),createdAt:d.createdAt||null});
  }
  return followUps;
}

export default async function OwnerFollowUpsPage():Promise<ReactElement>{return <OwnerFollowUpsClient followUps={await getFollowUps()}/>}
