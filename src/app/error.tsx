"use client";

import { useEffect, useState } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

  useEffect(() => {
    // Keep logging the full stack trace securely to your server/hosting console
    console.error("Backstage Error Captured:", error);
  }, [error]);

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center px-fluid-md text-center bg-background stage-glow-right">
      <div className="max-w-xl space-y-fluid-md">
        <span className="text-fluid-xs font-bold font-sans uppercase tracking-widest text-destructive bg-destructive/10 px-3 py-1 rounded-full">
          Technical Glitch Backstage
        </span>

        <h1 className="font-serif font-extrabold text-foreground tracking-tight">
          The Curtain Dropped Unexpectedly
        </h1>

        <p className="text-muted-foreground text-fluid-base max-w-md mx-auto">
          Something went wrong while rendering this section. Our crew is on the
          case looking into the script.
        </p>

        {/* 🕵️‍♂️ Safe Debugging Info: Display Next.js error digest hash if it exists */}
        {error.digest && (
          <p className="text-xs text-muted-foreground/50 font-mono">
            Error ID: {error.digest}
          </p>
        )}

        <div className="flex flex-col sm:flex-row justify-center gap-fluid-sm pt-fluid-sm">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center px-fluid-md py-fluid-xs bg-primary text-primary-foreground font-semibold rounded-md shadow-md shadow-primary/20 hover:bg-primary/90 transition-all duration-200 cursor-pointer"
          >
            Try Scene Again
          </button>

          <button
            onClick={() => (window.location.href = "/")}
            className="inline-flex items-center justify-center px-fluid-md py-fluid-xs bg-secondary text-secondary-foreground font-semibold rounded-md hover:bg-secondary/80 transition-all duration-200 cursor-pointer"
          >
            Go Home
          </button>
        </div>

        {/* 🛠️ Hidden Inspector: Toggled open by developers or admins seeking details */}
        <div className="pt-8">
          <button
            onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
            className="text-xs text-muted-foreground/40 hover:text-muted-foreground underline transition-colors cursor-pointer"
          >
            {showTechnicalDetails
              ? "Hide Technical Diagnostics"
              : "Show Technical Diagnostics"}
          </button>

          {showTechnicalDetails && (
            <div className="mt-4 p-4 text-left bg-muted rounded border border-border overflow-x-auto max-w-lg mx-auto">
              <p className="text-xs font-mono font-bold text-destructive mb-2">
                {error.name || "RuntimeError"}:{" "}
                {error.message || "An unexpected error occurred."}
              </p>
              {process.env.NODE_ENV === "development" && error.stack && (
                <pre className="text-[10px] font-mono text-muted-foreground leading-tight max-h-40 overflow-y-auto whitespace-pre-wrap">
                  {error.stack}
                </pre>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
