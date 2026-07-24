import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center px-fluid-md text-center bg-background stage-glow-left">
      <div className="max-w-xl space-y-fluid-md">
        <span className="text-fluid-xs font-bold font-sans uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full">
          Act II, Scene Unknown
        </span>

        <h1 className="font-serif font-extrabold text-foreground tracking-tight">
          Page Not Found
        </h1>

        <p className="text-muted-foreground text-fluid-base max-w-md mx-auto">
          It looks like this page wandered off-stage or the script was
          rewritten. Let’s get you back to the main performance.
        </p>

        <div className="pt-fluid-sm">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-fluid-md py-fluid-xs bg-primary text-primary-foreground font-semibold rounded-md shadow-md shadow-primary/20 hover:bg-primary/90 transition-all duration-200"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
