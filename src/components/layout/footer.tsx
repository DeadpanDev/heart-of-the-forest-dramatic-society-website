import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";

async function getCurrentYear() {
  "use cache";
  return new Date().getFullYear();
}

export default async function Footer() {
  return (
    <Suspense fallback={null}>
      <FooterContent />
    </Suspense>
  );
}

async function FooterContent() {
  const currentYear = await getCurrentYear();
  return (
    <footer className="border-t border-border bg-card px-fluid-md py-fluid-sm">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-fluid-xs text-xs text-muted-foreground">
        <p>&copy; {currentYear} Heart of the Forest Dramatic Society</p>
        <Link
          href={"/admin"}
          className="hover:text-foreground transition-colors"
        >
          🚪 Stage Door Access
        </Link>
      </div>
    </footer>
  );
}
