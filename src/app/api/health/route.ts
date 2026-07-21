import { NextResponse } from "next/server";
import { checkDatabaseHealth } from "@/lib/db";

// Force Next.js to evaluate this dynamically on every hit, never cache it
export const dynamic = "force-dynamic";

export async function GET() {
  const health = await checkDatabaseHealth();

  if (health.status === "unhealthy") {
    // Return a 503 Service Unavailable so monitoring routers flag it instantly
    return NextResponse.json(health, { status: 503 });
  }

  return NextResponse.json(health, { status: 200 });
}
