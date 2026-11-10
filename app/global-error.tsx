"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";
import "./globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("SONORA application error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main className="error-screen">
          <p className="eyebrow">SONORA · SIGNAL LOST</p>
          <h1>We lost the thread.</h1>
          <p className="error-copy">The application hit an unexpected error.</p>
          <button className="button button-primary" onClick={reset}>
            <RotateCcw size={15} /> Reload view
          </button>
        </main>
      </body>
    </html>
  );
}
