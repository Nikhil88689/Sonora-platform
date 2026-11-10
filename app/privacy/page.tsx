import type { Metadata } from "next";
import { PolicyPage } from "@/components/layout/policy-page";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return <PolicyPage kind="Privacy">
    <h2>What this preview does</h2>
    <p>You can browse the featured recordings and play previews without creating an account. Audio playback is handled in your browser. The map and images may load from their named providers, which can receive ordinary connection data such as your IP address.</p>
    <h2>Service data</h2>
    <p>If a Supabase project is configured, the landing page reads aggregate counts from its public statistics endpoint. The current preview does not ask you to submit personal information or create a listening profile.</p>
    <h2>Contact and submissions</h2>
    <p>Using the submission link opens your email application and sends information only when you choose to send it. Do not include private location details in a recording submission unless you intend to share them with us.</p>
    <h2>Questions</h2>
    <p>Ask about this preview at <a href="mailto:hello@sonora.world">hello@sonora.world</a>. This notice describes the current prototype and will be revised before account features are introduced.</p>
  </PolicyPage>;
}
