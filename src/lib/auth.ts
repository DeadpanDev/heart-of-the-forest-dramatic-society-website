import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./db";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: async (request) => {
    const origin = request?.headers.get("origin");

    return [
      origin,
      process.env.BETTER_AUTH_URL,
      process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
    ].filter((value): value is string => Boolean(value));
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "USER",
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()],
});
