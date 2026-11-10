import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";

export function PolicyPage({ kind, children }: { kind: "Privacy" | "Terms"; children: ReactNode }) {
  return (
    <article className="policy-page content-width">
      <Link href="/" className="information-back"><ArrowLeft size={14} /> SONORA home</Link>
      <span className="eyebrow">SONORA · PREVIEW EDITION</span>
      <h1>{kind}<span>.</span></h1>
      <p className="policy-updated">Last updated November 7, 2026</p>
      <div className="policy-copy">{children}</div>
    </article>
  );
}
