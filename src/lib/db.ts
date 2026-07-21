import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient;
};

const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export interface HealthCheckResult {
  status: "healthy" | "unhealthy";
  timestamp: string;
  latencyMs?: number;
  error?: string;
}

/**
 * Executes a lightweight query to test DB availability.
 * Automatically logs connection drops.
 */
export async function checkDatabaseHealth(): Promise<HealthCheckResult> {
  const startTime = performance.now();
  const timestamp = new Date().toISOString();

  try {
    // '$queryRaw' executes a ultra-low overhead query to ensure socket communication works
    await prisma.$queryRaw`SELECT 1`;
    const latencyMs = Math.round(performance.now() - startTime);

    return {
      status: "healthy",
      timestamp,
      latencyMs,
    };
  } catch (err: any) {
    // 🚨 Logging Strategy for failed connections
    console.error(
      `[DB_HEALTH_ERROR] Database connectivity check failed at ${timestamp}:`,
      {
        message: err.message || err,
        code: err.code, // Useful for Prisma-specific error codes (e.g., P1001)
      },
    );

    return {
      status: "unhealthy",
      timestamp,
      error:
        err.message ||
        "Failed to establish a hand-shake with PostgreSQL database.",
    };
  }
}

export default prisma;
