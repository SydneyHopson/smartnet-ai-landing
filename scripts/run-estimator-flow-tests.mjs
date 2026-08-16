const baseUrl = process.env.SMARTNET_TEST_URL || "http://localhost:3000";

const scenarios = [
  { name: "Residential lean", seed: { projectType: "residential", cameras: true, wifi: true, accessControl: false, customerIntent: "I have a finished 2200 square foot two-story home. I need five cameras, one inside and four outside, with 30 days recording and better Wi-Fi for about 15 devices. I do not need access control or a new network rack. Existing cabling can be reused where practical, hidden wiring preferred, normal ladder access, no trenching, daytime work is fine." } },
  { name: "Restaurant lean", seed: { projectType: "restaurant", cameras: true, wifi: true, accessControl: false, customerIntent: "I have an operating 3000 square foot one-story restaurant. I need eight cameras covering the dining room, register, kitchen, entrances and outside, plus reliable Wi-Fi for about 35 devices. No access control and no new rack. We have some usable network equipment and cabling. Normal ladder access, no trenching, daytime installation is acceptable." } },
  { name: "Restaurant full", seed: { projectType: "restaurant", cameras: true, wifi: true, accessControl: true, customerIntent: "I have a finished operating 4500 square foot one-story restaurant with 12 foot ceilings. I need ten cameras with 30 days recording, managed Wi-Fi for 75 devices with business and guest networks, two exterior doors with key fob access, upgraded cabling and a network rack. Hidden wiring where practical, no trenching, ladder access, and most work must happen after hours." } },
  { name: "Office", seed: { projectType: "office", cameras: true, wifi: true, accessControl: true, customerIntent: "10000 square foot two-floor finished office with 12 cameras, managed Wi-Fi for 100 users, VLANs, four access-controlled doors, Cat6 structured cabling and a network rack. Drop ceilings, normal ladder access and daytime work." } },
  { name: "Retail", seed: { projectType: "retail", cameras: true, wifi: true, accessControl: true, customerIntent: "6000 square foot finished retail store with 12 cameras, guest and staff Wi-Fi for 60 devices, two controlled doors, structured Cat6 and a rack. Mixed ceilings, no trenching and ladder access." } },
  { name: "Warehouse", seed: { projectType: "warehouse", cameras: true, wifi: true, accessControl: true, customerIntent: "30000 square foot operating warehouse with 28 foot open deck, 16 cameras, managed Wi-Fi for 80 devices, four controlled doors, exposed Cat6 in proper pathways, a network rack and scissor lift access. No trenching." } },
  { name: "Medical", seed: { projectType: "medical", cameras: true, wifi: true, accessControl: true, customerIntent: "12000 square foot operating medical facility with 14 cameras, managed segmented Wi-Fi for 120 devices, six access-controlled doors, Cat6, fire stopping and a network rack. Drop ceilings and most work after hours." } },
  { name: "Industrial", seed: { projectType: "industrial", cameras: true, wifi: true, accessControl: true, customerIntent: "40000 square foot industrial facility with 30 foot deck, 20 cameras, managed Wi-Fi for 100 devices, six controlled doors, exposed structured cabling, rack and boom lift access. Existing finished operating facility." } },
  { name: "Datacenter", seed: { projectType: "datacenter", cameras: true, wifi: true, accessControl: true, customerIntent: "50000 square foot operating datacenter with 20 foot open ceiling, 24 cameras with 60 day retention, managed segmented Wi-Fi for 150 devices, ten controlled doors, structured labeled tested cabling, fire stopping, rack, scissor lift and after-hours change-window work." } },
];

function answerFor(question) {
  const text = `${question?.question || ""} ${question?.key || ""}`.toLowerCase();
  const choices = question?.choices || [];
  if (choices.length) {
    const no = choices.find((c) => /^(no|none|not required)$/i.test(String(c.label || c.value || c)));
    if (/trench|permit|after.hours|lift/.test(text) && no) return no.value ?? no.label ?? "No";
    const first = choices[0]; return first.value ?? first.label ?? first;
  }
  if (/square|footage/.test(text)) return "5000";
  if (/floor/.test(text)) return "1";
  if (/ceiling.*height|height/.test(text)) return "10";
  if (/camera/.test(text) && /how many|count|quantity/.test(text)) return "8";
  if (/record|retention|days/.test(text)) return "30";
  if (/user|device|concurrent/.test(text)) return "40";
  if (/door/.test(text) && /how many|count|quantity/.test(text)) return "2";
  if (/timeline|when/.test(text)) return "Within 30 days";
  if (/rack/.test(text)) return "No new rack is needed; use the existing network location.";
  if (/trench/.test(text)) return "No trenching is required.";
  if (/lift/.test(text)) return "Normal ladder access is sufficient.";
  if (/after.hours/.test(text)) return "No, daytime work is acceptable.";
  return "Standard existing finished conditions; use normal professional installation practices.";
}

const rows = [];
for (const scenario of scenarios) {
  const seen = new Set(); let repeated = []; let turns = 0; let response;
  try {
    response = await fetch(`${baseUrl}/api/estimator/start`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ seed: scenario.seed }) });
    let data = await response.json();
    if (!response.ok || !data.ok) throw new Error(data.error || `start ${response.status}`);
    while (data.nextQuestion && turns < 35) {
      const id = data.nextQuestion.questionId || `${data.nextQuestion.key}:${data.nextQuestion.question}`;
      if (seen.has(id)) repeated.push(id); seen.add(id);
      const answer = answerFor(data.nextQuestion);
      response = await fetch(`${baseUrl}/api/estimator/answer`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ sessionId: data.sessionId, answer }) });
      data = await response.json(); turns++;
      if (!response.ok || !data.ok) throw new Error(`${data.error || `answer ${response.status}`} [${id}]`);
    }
    const project = data.project || {};
    const wrongResidentialLanguage = scenario.seed.projectType === "residential" && [...seen].some((x) => /warehouse|restaurant|medical|industrial|datacenter/i.test(x));
    rows.push({ scenario: scenario.name, playbook: data.playbook?.id || "-", turns, repeated: repeated.length, ready: Boolean(data.conversation?.readyForPricing || project.pricing?.estimatedLow), priced: Boolean(project.pricing?.estimatedLow), low: project.pricing?.estimatedLow || 0, high: project.pricing?.estimatedHigh || 0, wrongResidentialLanguage, pass: turns < 35 && repeated.length === 0 && !wrongResidentialLanguage && Boolean(data.conversation?.readyForPricing || project.pricing?.estimatedLow) });
  } catch (error) {
    rows.push({ scenario: scenario.name, playbook: "ERROR", turns, repeated: repeated.length, ready: false, priced: false, low: 0, high: 0, wrongResidentialLanguage: false, pass: false, error: error instanceof Error ? error.message : String(error) });
  }
}

console.table(rows.map(({ error, ...r }) => r));
for (const row of rows.filter((r) => !r.pass)) console.error("FLOW FAILURE", row.scenario, row.error || row);
if (rows.some((r) => !r.pass)) process.exit(1);
console.log(`Estimator flow smoke tests passed: ${rows.length}/${rows.length}. No repeated questions detected.`);
