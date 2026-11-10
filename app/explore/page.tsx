import type { Metadata } from "next";
import { ExplorePage } from "@/components/explore/explore-page";

export const metadata: Metadata = {
  title: "Explore the Sound Atlas",
  description: "Listen to field recordings from mountain mornings, city nights, open water, and rainforest paths.",
};

export default function Explore() {
  return <ExplorePage />;
}
