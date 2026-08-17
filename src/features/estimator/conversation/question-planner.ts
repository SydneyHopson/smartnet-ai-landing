import type { ProjectEstimate } from "../domain/project-estimate";

export type EstimatorQuestionPriority = "critical" | "high" | "normal" | "optional";
export type EstimatorQuestion = { key: string; question: string; reason: string; priority: EstimatorQuestionPriority; category: "project" | "property" | "cameras" | "network" | "wifi" | "access_control" | "cabling" | "installation" | "commercial"; };
const priorityOrder: Record<EstimatorQuestionPriority, number> = { critical: 0, high: 1, normal: 2, optional: 3 };
function hasKnownQuantity(quantity: { value: number | null }): boolean { return quantity.value !== null; }
function addQuestion(questions: EstimatorQuestion[], question: EstimatorQuestion): void { if (!questions.some((existing) => existing.key === question.key)) questions.push(question); }
function propertyLanguage(project: ProjectEstimate) {
  const type = project.property.projectType;
  if (type === "residential") return { noun: "home", area: "home", hours: "normal daytime hours", people: "family, guests, and connected devices" };
  if (type === "warehouse") return { noun: "warehouse", area: "warehouse", hours: "normal operating hours", people: "people and connected devices" };
  if (type === "office") return { noun: "office", area: "office", hours: "normal business hours", people: "staff, guests, and connected devices" };
  if (type === "retail") return { noun: "store", area: "store", hours: "normal business hours", people: "staff, guests, and connected devices" };
  if (type === "restaurant") return { noun: "restaurant", area: "restaurant", hours: "normal business hours", people: "staff, guests, and connected devices" };
  if (type === "medical") return { noun: "facility", area: "facility", hours: "normal operating hours", people: "staff, guests, and connected devices" };
  if (type === "education") return { noun: "school or campus space", area: "property", hours: "normal operating hours", people: "staff, students, guests, and connected devices" };
  if (type === "religious") return { noun: "church or worship facility", area: "property", hours: "normal operating hours", people: "staff, guests, and connected devices" };
  if (type === "hospitality") return { noun: "property", area: "property", hours: "normal operating hours", people: "staff, guests, and connected devices" };
  if (type === "industrial") return { noun: "facility", area: "facility", hours: "normal operating hours", people: "staff and connected devices" };
  if (type === "datacenter") return { noun: "data center", area: "data center", hours: "normal approved work hours", people: "staff and connected devices" };
  if (type === "multi_location") return { noun: "site", area: "site", hours: "normal operating hours", people: "people and connected devices" };
  return { noun: "property", area: "property", hours: "normal operating hours", people: "people and connected devices" };
}
export function getEstimatorQuestions(project: ProjectEstimate): EstimatorQuestion[] {
  const questions: EstimatorQuestion[] = [];
  const language = propertyLanguage(project);
  const isResidential = project.property.projectType === "residential";
  if (!project.customerIntent.summary.trim()) addQuestion(questions, { key:"customerIntent.summary", question:"What are you looking to install or improve?", reason:"Defines project scope.", priority:"critical", category:"project" });
  if (!project.property.projectType) addQuestion(questions, { key:"property.projectType", question:"What type of property is this?", reason:"Property type drives pricing and playbook selection.", priority:"critical", category:"property" });
  if (!hasKnownQuantity(project.property.squareFootage)) addQuestion(questions, { key:"property.squareFootage", question:isResidential?"About how many square feet is your home?":"About how many square feet is the project area?", reason:"Square footage drives labor and equipment estimates.", priority:"critical", category:"property" });
  if (project.property.constructionType === "unknown") addQuestion(questions, { key:"property.constructionType", question:`Is this ${language.noun} existing and finished, being renovated, unfinished, or new construction?`, reason:"Construction type greatly impacts labor.", priority:"critical", category:"property" });
  // Commercial ceiling details materially affect lift and pathway pricing. For homes,
  // SmartNET verifies ceiling construction/height during the walkthrough instead of
  // making homeowners answer commercial-style building questions.
  if (!isResidential && project.property.ceilingType === "unknown") addQuestion(questions, { key:"property.ceilingType", question:`What kind of ceilings are in the ${language.area}?`, reason:"Ceiling type affects cable installation.", priority:"high", category:"property" });
  if (!isResidential && !hasKnownQuantity(project.property.ceilingHeightFeet)) addQuestion(questions, { key:"property.ceilingHeightFeet", question:"Approximately how tall are the ceilings where equipment will be installed?", reason:"Ceiling height determines access equipment and labor.", priority:"high", category:"property" });
  if (project.cameras.requested) {
    if (!hasKnownQuantity(project.cameras.interiorCount)) addQuestion(questions,{key:"cameras.interiorCount",question:"About how many indoor cameras do you need?",reason:"Primary equipment cost driver.",priority:"critical",category:"cameras"});
    if (!hasKnownQuantity(project.cameras.exteriorCount)) addQuestion(questions,{key:"cameras.exteriorCount",question:"About how many outdoor cameras do you need?",reason:"Primary exterior equipment cost driver.",priority:"critical",category:"cameras"});
    if (project.cameras.coverageGoals.length===0) addQuestion(questions,{key:"cameras.coverageGoals",question:`What areas of the ${language.area} do you want covered by cameras?`,reason:"Determines camera placement and specialty hardware.",priority:"high",category:"cameras"});
    if (!hasKnownQuantity(project.cameras.recordingDays)) addQuestion(questions,{key:"cameras.recordingDays",question:"How many days should video recordings be stored?",reason:"Storage size affects pricing.",priority:"high",category:"cameras"});
    if (project.cameras.existingSystem===null) addQuestion(questions,{key:"cameras.existingSystem",question:"Are you replacing an existing camera system?",reason:"Replacement projects have different labor assumptions.",priority:"normal",category:"cameras"});
  }
  const networkingIsRequired=project.network.requested||project.wifi.requested||project.cameras.requested||project.accessControl.requested;
  if(networkingIsRequired){
    if(project.network.existingRouter===null)addQuestion(questions,{key:"network.existingRouter",question:"Will we be using your existing internet equipment?",reason:"Determines whether new networking equipment must be quoted.",priority:"high",category:"network"});
    if(project.network.existingRack===null)addQuestion(questions,{key:"network.existingRack",question:isResidential?"Do you already have a structured wiring panel, network cabinet, or small rack?":"Do you already have a network rack or cabinet?",reason:"Determines whether rack hardware needs to be included.",priority:"normal",category:"network"});
    if(project.network.existingRack===false&&project.network.rackRequired===null)addQuestion(questions,{key:"network.rackRequired",question:isResidential?"Would you like SmartNET to provide a small cabinet to keep the new equipment organized?":"Would you like SmartNET to provide a network rack?",reason:"Rack hardware changes equipment pricing.",priority:"normal",category:"network"});
  }
  if(project.wifi.requested){
    if(project.wifi.coverageGoals.length===0)addQuestion(questions,{key:"wifi.coverageGoals",question:isResidential?"Where around your home do you need reliable Wi-Fi coverage?":`Where in or around the ${language.area} do you need reliable Wi-Fi coverage?`,reason:"Coverage area determines access-point quantity and placement.",priority:"critical",category:"wifi"});
    if(!hasKnownQuantity(project.wifi.estimatedConcurrentUsers))addQuestion(questions,{key:"wifi.estimatedConcurrentUsers",question:`About how many ${language.people} may be using Wi-Fi at the same time?`,reason:"Concurrent demand determines Wi-Fi capacity.",priority:"high",category:"wifi"});
    if(project.wifi.guestNetworkRequired===null)addQuestion(questions,{key:"wifi.guestNetworkRequired",question:isResidential?"Would you like a separate guest Wi-Fi network for visitors?":"Do you want a separate guest Wi-Fi network?",reason:"Guest Wi-Fi may require additional configuration.",priority:"normal",category:"wifi"});
  }
  if(project.accessControl.requested){
    if(!hasKnownQuantity(project.accessControl.controlledDoorCount))addQuestion(questions,{key:"accessControl.controlledDoorCount",question:"How many doors would you like to secure with access control?",reason:"Door count is the largest driver of access-control pricing.",priority:"critical",category:"access_control"});
    if(project.accessControl.credentialTypes.length===0)addQuestion(questions,{key:"accessControl.credentialTypes",question:"How would you like people to unlock the doors?",reason:"Credential type determines readers and licensing.",priority:"normal",category:"access_control"});
    if(project.accessControl.existingSystem===null)addQuestion(questions,{key:"accessControl.existingSystem",question:"Do you already have an access control system installed?",reason:"Existing equipment may be reused or replaced.",priority:"normal",category:"access_control"});
  }
  const cablingIsRequired=networkingIsRequired;
  if(cablingIsRequired){
    if(project.cabling.existingCablingAvailable===null)addQuestion(questions,{key:"cabling.existingCablingAvailable",question:isResidential?"Is there any existing network cabling in the home that may be reusable?":"Can we reuse any of the existing network cabling?",reason:"Reusing cabling can significantly reduce labor and material costs.",priority:"high",category:"cabling"});
    if(project.cabling.pathwayType.length===0)addQuestion(questions,{key:"cabling.pathwayType",question:isResidential?"Do you have attic, basement, crawlspace, or utility-area access that could help us route cable?":"How will new cables most likely be run?",reason:"Cable pathways have the biggest impact on labor.",priority:"critical",category:"cabling"});
  }
  if(cablingIsRequired&&project.installation.liftRequired===null)addQuestion(questions,{key:"installation.liftRequired",question:isResidential?"Are any camera or device locations unusually high or difficult to reach with a normal ladder?":"Will any installation area be higher than a normal ladder can safely reach?",reason:"Access equipment can affect labor and equipment pricing.",priority:"high",category:"installation"});
  if(cablingIsRequired&&project.installation.afterHoursRequired===null)addQuestion(questions,{key:"installation.afterHoursRequired",question:isResidential?"Are there any days or times when installation work needs to be avoided?":`Does the work need to happen outside ${language.hours}?`,reason:"Special scheduling can affect labor cost.",priority:"normal",category:"installation"});
  const isCommercial=project.property.projectType!==null&&!isResidential;
  if(isCommercial&&project.customerIntent.futureExpansion===null)addQuestion(questions,{key:"customerIntent.futureExpansion",question:"Do you expect this system to grow in the future?",reason:"Expansion planning can influence switch sizing, rack space, and spare capacity.",priority:"optional",category:"commercial"});
  return questions.sort((first,second)=>{const priorityDifference=priorityOrder[first.priority]-priorityOrder[second.priority];return priorityDifference!==0?priorityDifference:first.key.localeCompare(second.key);});
}
export function getNextEstimatorQuestion(project: ProjectEstimate): EstimatorQuestion|null{return getEstimatorQuestions(project)[0]??null;}
export function getUnansweredEstimatorQuestionKeys(project: ProjectEstimate):string[]{return getEstimatorQuestions(project).map((question)=>question.key);}
export function isProjectReadyForPreliminaryPricing(project:ProjectEstimate):boolean{return !getEstimatorQuestions(project).some((question)=>question.priority==="critical"||question.priority==="high");}
