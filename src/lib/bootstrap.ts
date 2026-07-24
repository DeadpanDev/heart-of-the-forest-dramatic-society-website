import { hashPassword } from "better-auth/crypto"; // Uses Better Auth's standard scrypt engine
import prisma from "./db";

export async function bootstrapAdminAccount() {
  const adminEmail = process.env.INITIAL_ADMIN_EMAIL;
  const adminPassword = process.env.INITIAL_ADMIN_PASSWORD;
  const adminName = process.env.INITIAL_ADMIN_NAME || "System Administrator";

  if (!adminEmail || !adminPassword) {
    console.log(
      "ℹ️ [BOOTSTRAP] Skipping admin generation: INITIAL_ADMIN_EMAIL or PASSWORD missing from .env",
    );
    return;
  }

  try {
    // 1. Check if ANY trustee/admin exists to prevent accidental rewrites
    const existingAdmin = await prisma.user.findFirst({
      where: { role: "TRUSTEE" },
    });

    if (existingAdmin) {
      console.log(
        "ℹ️ [BOOTSTRAP] Admin user verification complete. Active administrators already exist.",
      );
      return;
    }

    console.log(
      `🚀 [BOOTSTRAP] No administrators found. Provisioning system profile for ${adminEmail}...`,
    );

    // 2. Hash the initial password string to match Better Auth credentials specifications
    const hashedPassword = await hashPassword(adminPassword);

    // 3. Create the compound Better Auth transaction (User entry + Account credential map)
    await prisma.$transaction(async (tx) => {
      // Better Auth expects a unique string identifier for the user record
      const userId = crypto.randomUUID();

      // Create the User with the custom administrative TRUSTEE role access flag
      const newUser = await tx.user.create({
        data: {
          id: userId,
          name: adminName,
          email: adminEmail.toLowerCase(),
          emailVerified: true,
          role: "TRUSTEE", // Grants access to your admin controls
        },
      });

      // Create the matching standard credential account card linked to this user
      await tx.account.create({
        data: {
          id: crypto.randomUUID(),
          userId: newUser.id,
          accountId: adminEmail.toLowerCase(), // Maps to identification username field
          providerId: "credential", // Tells Better Auth this is standard password auth
          password: hashedPassword,
        },
      });
    });

    console.log(
      "💥 [BOOTSTRAP] Initial Trustee Admin account created successfully.",
    );
  } catch (error) {
    console.error(
      "🚨 [BOOTSTRAP_ERROR] Failed to securely seed initialization administrator account:",
      error,
    );
  } finally {
    await prisma.$disconnect();
  }
}
