import { NextResponse } from "next/server";
import { runPricingBenchmarks } from "@/features/estimator/pricing/pricing-benchmarks";

export const dynamic = "force-dynamic";

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ ok: false, error: "Benchmark runner is disabled in production." }, { status: 404 });
  }

  const first = runPricingBenchmarks();
  const second = runPricingBenchmarks();
  const third = runPricingBenchmarks();

  const deterministic = first.every((row, index) => JSON.stringify(row) === JSON.stringify(second[index]) && JSON.stringify(row) === JSON.stringify(third[index]));
  const failures = first.filter((row) => !row.pass);

  return NextResponse.json({
    ok: failures.length === 0 && deterministic,
    deterministic,
    runs: 3,
    summary: { total: first.length, passed: first.length - failures.length, failed: failures.length },
    results: first,
    failures,
  });
}
