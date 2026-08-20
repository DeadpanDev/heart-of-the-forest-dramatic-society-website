"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import zod from "zod";

export async function signInAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const schema = zod.object({
    email: zod.email(),
    password: zod.string().min(6),
  });

  schema.parse({ email, password });

  const requestHeaders = await headers();

  await auth.api.signInEmail({
    body: {
      email,
      password,
    },
    asResponse: true,
    headers: requestHeaders,
  });

  const session = await auth.api.getSession({
    headers: requestHeaders,
  });

  if (session?.user.role === "TRUSTEE") {
    return redirect("/admin");
  }

  return redirect("/");
}

export async function signOutAction() {
  await auth.api.signOut({
    headers: await headers(),
  });
  return redirect("/");
}

export async function TRUSTEEVerifyAction() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "TRUSTEE") {
    return redirect("/login");
  }
}
