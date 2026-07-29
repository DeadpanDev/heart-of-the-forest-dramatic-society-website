import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="flex flex-col items-center justify-center p-4 min-h-svh">
      <h1>401 - Unauthorized</h1>
      <p>Please log in to access this page.</p>
      <Button>
        <Link href="/login">Log In</Link>
      </Button>
    </main>
  );
}
