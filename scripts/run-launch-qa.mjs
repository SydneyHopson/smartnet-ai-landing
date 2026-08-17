const baseUrl = process.env.SMARTNET_TEST_URL || "http://localhost:3000";
const qaEmail = process.env.SMARTNET_QA_EMAIL;
const qaPhone = process.env.SMARTNET_QA_PHONE || "4702267705";

if (!qaEmail) {
  console.error("SMARTNET_QA_EMAIL is required so the magic-link email can be sent to a real inbox.");
  console.error('Windows CMD example: set SMARTNET_QA_EMAIL=you@example.com&& npm run test:launch');
  process.exit(1);
}

async function jsonRequest(path, init = {}) {
  const res = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: { "content-type": "application/json", ...(init.headers || {}) },
  });
  let data;
  try { data = await res.json(); } catch { data = null; }
  if (!res.ok) throw new Error(`${path} returned ${res.status}: ${JSON.stringify(data)}`);
  return data;
}

function optionValue(choice) {
  return typeof choice === "object" && choice !== null ? (choice.value ?? choice.label ?? String(choice)) : choice;
}

function answerFor(question) {
  const field = String(question?.key || question?.field || "");
  const type = String(question?.answerType || "").toLowerCase();
  const text = String(question?.question || "").toLowerCase();
  const choices = Array.isArray(question?.choices) ? question.choices : [];

  if (field === "property.constructionType") return "existing_finished";
  if (field === "property.ceilingType") return "drywall";
  if (field === "cabling.preferredCableType") return "cat6";
  if (field === "cabling.wiringStyle") return "hidden";
  if (field === "installation.difficultyLevel") return "standard";

  if (type === "boolean") return /after.hours|trench|permit|lift/.test(`${field} ${text}`) ? false : true;
  if (type === "multiple_choice") return choices.length ? [optionValue(choices[0])] : ["Standard"];
  if (type === "single_choice" && choices.length) return optionValue(choices[0]);
  if (type === "number") {
    if (/square|footage/.test(`${field} ${text}`)) return 2200;
    if (/floor/.test(`${field} ${text}`)) return 2;
    if (/ceiling.*height|height/.test(`${field} ${text}`)) return 9;
    if (/record|retention|days/.test(`${field} ${text}`)) return 30;
    if (/camera/.test(`${field} ${text}`)) return 5;
    if (/user|device|concurrent/.test(`${field} ${text}`)) return 15;
    if (/door/.test(`${field} ${text}`)) return 0;
    return 1;
  }
  if (/rack/.test(`${field} ${text}`)) return "Use the existing network location; no new rack is needed.";
  if (/coverage/.test(`${field} ${text}`)) return "Front entry, driveway, backyard, living areas, and reliable whole-home Wi-Fi.";
  if (/future/.test(`${field} ${text}`)) return "Maybe later";
  return "Standard finished residential conditions with hidden wiring where practical.";
}

function makeSnapshot(project) {
  const cameraCount = [project?.cameras?.interiorCount, project?.cameras?.exteriorCount, project?.cameras?.specialtyCount]
    .map((q) => Number(q?.value || 0)).reduce((a, b) => a + b, 0);
  return {
    projectType: project?.property?.projectType,
    squareFootage: project?.property?.squareFootage?.value,
    focus: [project?.cameras?.requested && "Cameras", project?.wifi?.requested && "Wi-Fi & APs", project?.accessControl?.requested && "Access control"].filter(Boolean),
    roughLow: project?.pricing?.estimatedLow,
    roughHigh: project?.pricing?.estimatedHigh,
    notes: project?.assessment?.scopeSummary || project?.customerIntent?.summary,
    customerIntent: project?.customerIntent,
    property: project?.property,
    cameras: project?.cameras ? { ...project.cameras, cameraCount } : undefined,
    network: project?.network,
    wifi: project?.wifi,
    accessControl: project?.accessControl,
    cabling: project?.cabling,
    installation: project?.installation,
    equipment: project?.equipment,
    pricing: project?.pricing,
    assessment: project?.assessment,
  };
}

const results = [];
function pass(name, details = "") { results.push({ check: name, pass: true, details }); }
function fail(name, error) { results.push({ check: name, pass: false, details: error instanceof Error ? error.message : String(error) }); }

let project;
let magicToken;
const stamp = Date.now();
const date = new Date(Date.now() + 10 * 86400000).toISOString().slice(0, 10);

try {
  const home = await fetch(baseUrl, { cache: "no-store" });
  const html = await home.text();
  if (!home.ok) throw new Error(`home ${home.status}`);
  const required = ["SMARTNET", "AI Estimate", "Book", "How It Works", "Services", "Results", "Pricing", "FAQ", "470"];
  const missing = required.filter((value) => !html.includes(value));
  if (missing.length) throw new Error(`missing rendered navigation text: ${missing.join(", ")}`);
  pass("Homepage + navigation render", "all launch navigation labels rendered");
} catch (error) { fail("Homepage + navigation render", error); }

try {
  let data = await jsonRequest("/api/estimator/start", {
    method: "POST",
    body: JSON.stringify({ seed: {
      projectType: "residential", cameras: true, wifi: true, accessControl: false,
      customerIntent: "QA launch test: finished 2200 square foot two-story home. Five cameras, 30-day recording, reliable Wi-Fi for about 15 devices, no access control, no new rack, hidden wiring where practical, daytime work."
    } }),
  });
  let turns = 0;
  while (data.nextQuestion && turns < 30) {
    data = await jsonRequest("/api/estimator/answer", { method: "POST", body: JSON.stringify({ sessionId: data.sessionId, answer: answerFor(data.nextQuestion) }) });
    turns++;
  }
  project = data.project;
  if (!project?.pricing?.estimatedLow || !project?.pricing?.estimatedHigh) throw new Error("estimator did not reach pricing");
  pass("Estimator end-to-end", `${turns} follow-up answers; $${project.pricing.estimatedLow}-$${project.pricing.estimatedHigh}`);
} catch (error) { fail("Estimator end-to-end", error); }

const snapshot = project ? makeSnapshot(project) : null;

try {
  if (!snapshot) throw new Error("no estimator snapshot available");
  const booking = await jsonRequest("/api/booking", {
    method: "POST",
    body: JSON.stringify({
      dateISO: date,
      timeSlot: "11:00 AM",
      appointmentType: "Phone call",
      contact: { fullName: "SmartNET Launch QA", email: qaEmail, phone: qaPhone },
      jobLocation: { type: "home", note: `Launch QA estimated booking ${stamp}` },
      estimate: snapshot,
    }),
  });
  if (!booking.ok) throw new Error("booking API did not return ok");
  if (!booking.email?.sent) throw new Error(`booking owner email did not confirm send: ${JSON.stringify(booking.email)}`);
  pass("Estimated phone booking + owner email", `booking ${booking.id}; email ${booking.email.id}`);
} catch (error) { fail("Estimated phone booking + owner email", error); }

try {
  const direct = await jsonRequest("/api/booking", {
    method: "POST",
    body: JSON.stringify({
      dateISO: date,
      timeSlot: "2:00 PM",
      appointmentType: "Phone call",
      contact: { fullName: "SmartNET Direct QA", email: qaEmail, phone: qaPhone },
      jobLocation: { type: "home", note: `Launch QA direct booking ${stamp}` },
      estimate: null,
    }),
  });
  if (!direct.ok) throw new Error("direct booking API did not return ok");
  if (!direct.email?.sent) throw new Error(`direct-booking owner email did not confirm send: ${JSON.stringify(direct.email)}`);
  pass("Direct booking without estimate", `booking ${direct.id}; phone consultation saved`);
} catch (error) { fail("Direct booking without estimate", error); }

try {
  if (!snapshot) throw new Error("no estimator snapshot available");
  const magic = await jsonRequest("/api/magic-link", {
    method: "POST",
    body: JSON.stringify({
      contact: { email: qaEmail, phone: qaPhone, fullName: "SmartNET Launch QA", jobLocation: "Atlanta metro" },
      estimate: snapshot,
    }),
  });
  magicToken = magic.token;
  if (!magic.ok || !magicToken) throw new Error("magic-link API did not return token");
  if (!magic.email?.sent) throw new Error(`magic-link email did not confirm send: ${JSON.stringify(magic.email)}`);
  pass("Magic-link creation + customer email", `email ${magic.email.id}; token created`);
} catch (error) { fail("Magic-link creation + customer email", error); }

try {
  if (!magicToken) throw new Error("no magic token available");
  const restored = await jsonRequest(`/api/magic-link/${encodeURIComponent(magicToken)}`);
  const originalCameraCount = snapshot?.cameras?.cameraCount ?? null;
  const restoredCameraCount = restored?.estimate?.cameras?.cameraCount ?? null;
  const checks = [
    restored.ok === true,
    restored.isExpired === false,
    restored.estimate?.property?.projectType === snapshot?.property?.projectType,
    restored.estimate?.property?.squareFootage?.value === snapshot?.property?.squareFootage?.value,
    restoredCameraCount === originalCameraCount,
    restored.estimate?.pricing?.estimatedLow === snapshot?.pricing?.estimatedLow,
    restored.estimate?.pricing?.estimatedHigh === snapshot?.pricing?.estimatedHigh,
  ];
  if (!checks.every(Boolean)) throw new Error("magic-link restore changed or dropped estimator data");
  pass("Magic-link restore integrity", `project type, sqft, cameras and pricing survived round trip`);
} catch (error) { fail("Magic-link restore integrity", error); }

console.table(results);
const failures = results.filter((row) => !row.pass);
if (failures.length) {
  console.error(`Launch QA failed: ${failures.length}/${results.length} checks failed.`);
  process.exit(1);
}
console.log(`Launch QA passed: ${results.length}/${results.length}. Booking emails and magic-link email were accepted by Resend.`);
console.log(`Check ${qaEmail} for the SmartNET project-link email. Owner booking notices go to SMARTNET_BOOKING_EMAIL/default owner inbox.`);
