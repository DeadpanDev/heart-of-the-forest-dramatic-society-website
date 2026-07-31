import { signOutAction, TRUSTEEVerifyAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { unauthorized } from "next/navigation";
import { Suspense } from "react";

export default function AdminPage() {
  return (
    <Suspense fallback={null}>
      <AdminContent />
    </Suspense>
  );
}

async function AdminContent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  await TRUSTEEVerifyAction();

  return (
    <>
      <h1 className="text-2xl font-bold font-serif text-foreground sm:text-3xl">
        Admin Page
      </h1>
      <p className="page-copy text-base text-wrap sm:text-xl">
        This is the admin page. Here you can manage the content and settings of
        the Heart of the Forest Dramatic Society website.
      </p>
      <p>Welcome, {session?.user.id}!</p>
      <form action={signOutAction}>
        <Button type="submit">Sign Out</Button>
      </form>
    </>
  );
}
