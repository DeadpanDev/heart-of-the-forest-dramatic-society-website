"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function VerifyTrustee() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "TRUSTEE") {
    redirect("/login");
  }
}

export async function signInAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  await auth.api.signInEmail({
    body: {
      email,
      password,
    },
    asResponse: true,
  });

  return redirect("/admin");
}

export async function signOutAction() {
  await auth.api.signOut({
    headers: await headers(),
  });
  return redirect("/");
}
