import { signOutAction, VerifyTrustee } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

export default function AdminPage() {
  return (
    <Suspense fallback={null}>
      <AdminContent />
    </Suspense>
  );
}

async function AdminContent() {
  await VerifyTrustee();

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
