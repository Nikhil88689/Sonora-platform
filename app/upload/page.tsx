import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Mic2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Contribute a Recording",
  description: "Share a field recording from your corner of the world with SONORA.",
};

export default function UploadPage() {
  return (
    <section className="information-page content-width">
      <Link href="/#how-it-works" className="information-back"><ArrowLeft size={14} /> Back to the listening guide</Link>
      <span className="information-icon"><Mic2 size={20} /></span>
      <span className="eyebrow">YOUR WORLD HAS A SOUND, TOO</span>
      <h1>Leave a trace<br /><span>in the atlas.</span></h1>
      <p className="information-lede">We’re preparing the SONORA contributor studio. For this preview, send us a note with the place, moment, recording, and license you’d like us to hear.</p>
      <div className="upload-guidance">
        <span>01 / THE PLACE</span><p>Tell us where the sound was made, as precisely as you’re comfortable sharing.</p>
        <span>02 / THE RECORDING</span><p>Attach your original audio and include a short description of what we’re hearing.</p>
        <span>03 / PERMISSION</span><p>Include the license you want to use. We’ll confirm permission and attribution before anything is published.</p>
      </div>
      <a className="information-action" href="mailto:hello@sonora.world?subject=SONORA%20recording%20submission&body=Place%3A%0AMoment%3A%0ADescription%3A%0APreferred%20license%3A%0A%0APlease%20attach%20your%20audio%20recording.%0A">
        Start a submission <ArrowUpRight size={16} />
      </a>
      <p className="information-footnote">This opens your email app. Attach your audio file before sending.</p>
    </section>
  );
}
