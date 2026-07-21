// src/app/actions/db-actions.ts
"use server";

import { checkDatabaseHealth, HealthCheckResult } from "@/lib/db";
// import { auth } from "@/lib/auth"; // If checking role security

export async function testDbConnectionAction(): Promise<HealthCheckResult> {
  // Optional Security Check:
  // const session = await auth.api.getSession({ headers: await headers() });
  // if (session?.user?.role !== "TRUSTEE") throw new Error("Unauthorized");

  return await checkDatabaseHealth();
}
