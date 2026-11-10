import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/landing-page";

export const metadata: Metadata = {
  title: "The World Has a Sound",
  description: "Discover the invisible stories hidden in the sounds of our planet. Listen to field recordings from across the world.",
};

export default function Home() {
  return <LandingPage />;
}
