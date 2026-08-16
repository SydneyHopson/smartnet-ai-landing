const baseUrl = process.env.SMARTNET_TEST_URL || "http://localhost:3000";

try {
  const response = await fetch(`${baseUrl}/api/estimator/benchmarks`, { cache: "no-store" });
  const data = await response.json();

  console.table((data.results || []).map((row) => ({
    scenario: row.name,
    range: `$${row.low.toLocaleString()}-$${row.high.toLocaleString()}`,
    materials: `$${row.material.toLocaleString()}`,
    labor: `$${row.laborCost.toLocaleString()}`,
    hours: row.laborHours,
    margin: `${row.margin}%`,
    pass: row.pass ? "PASS" : "FAIL",
  })));

  if (!data.deterministic) console.error("Pricing engine returned different results across the three benchmark runs.");
  if (!data.ok) {
    console.error("Pricing benchmark failures:", data.failures);
    process.exit(1);
  }
  console.log(`Pricing benchmarks passed: ${data.summary.passed}/${data.summary.total}; deterministic across ${data.runs} runs.`);
} catch (error) {
  console.error(`Could not reach ${baseUrl}. Start the SmartNET dev server first with npm run dev.`);
  console.error(error);
  process.exit(1);
}
