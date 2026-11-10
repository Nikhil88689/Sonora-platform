"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("SONORA route error:", error);
  }, [error]);

  return (
    <main className="error-screen">
      <AlertCircle size={28} strokeWidth={1.5} aria-hidden="true" />
      <p className="eyebrow">A signal slipped away</p>
      <h1>We lost the thread.</h1>
      <p className="error-copy">Something interrupted this view. Give it another try.</p>
      <button className="button button-primary" onClick={reset}>
        <RotateCcw size={15} /> Try again
      </button>
    </main>
  );
}
