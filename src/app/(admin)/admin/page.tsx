import { signOutAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
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

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
        <p className="text-lg mb-4">
          You must be signed in to access the admin page.
        </p>
        <Link href="/login">
          <Button>Go to Login</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold font-serif text-foreground sm:text-3xl">
        Admin Page
      </h1>
      <p className="page-copy text-base text-wrap sm:text-xl">
        This is the admin page. Here you can manage the content and settings of
        the Heart of the Forest Dramatic Society website.
      </p>
      <form action={signOutAction}>
        <Button type="submit">Sign Out</Button>
      </form>
    </>
  );
}
