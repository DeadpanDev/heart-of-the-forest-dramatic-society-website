import { bootstrapAdminAccount } from "../src/lib/bootstrap";
import prisma from "@/lib/db";

async function main() {
  // Run your standard tables seed scripts (e.g., Interest Areas)...

  // Trigger the Admin Provisioning loop
  await bootstrapAdminAccount();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
