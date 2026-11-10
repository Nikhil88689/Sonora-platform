import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="error-screen">
      <p className="eyebrow">404 · OUT OF RANGE</p>
      <h1>Nothing on this frequency.</h1>
      <p className="error-copy">That place is quiet for now. Come back to the atlas.</p>
      <Link href="/" className="button button-primary">
        <ArrowLeft size={15} /> Back to SONORA
      </Link>
    </main>
  );
}
