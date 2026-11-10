import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { SiteShell } from "@/components/layout/site-shell";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sonora.world"),
  title: {
    default: "SONORA — The World Has a Sound",
    template: "%s — SONORA",
  },
  description:
    "Discover the world through the sounds that make it unique. Explore field recordings, places, and the people behind them.",
  applicationName: "SONORA",
  keywords: ["field recordings", "sound discovery", "soundscape", "global audio"],
  openGraph: {
    type: "website",
    siteName: "SONORA",
    title: "SONORA — The World Has a Sound",
    description: "A living atlas of the sounds that make every place unique.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SONORA — The World Has a Sound",
    description: "A living atlas of the sounds that make every place unique.",
  },
};

export const viewport: Viewport = {
  themeColor: "#07080c",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
