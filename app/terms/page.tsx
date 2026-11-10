import type { Metadata } from "next";
import { PolicyPage } from "@/components/layout/policy-page";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return <PolicyPage kind="Terms">
    <h2>About the preview</h2>
    <p>SONORA is an early sound-discovery prototype. It is provided for exploration and demonstration; features, availability, and catalog contents may change as the project develops.</p>
    <h2>Recording rights</h2>
    <p>Recordings in this edition retain the creator credits and license terms shown with each preview. Follow those terms when you listen, share, or reuse a recording. SONORA does not claim ownership of the underlying recordings.</p>
    <h2>Contributions</h2>
    <p>Sending a recording by email does not publish it or transfer its rights. We will confirm its intended attribution, license, and any publication permission with you before adding a contribution to the atlas.</p>
    <h2>Contact</h2>
    <p>Questions about these terms can be sent to <a href="mailto:hello@sonora.world">hello@sonora.world</a>.</p>
  </PolicyPage>;
}
