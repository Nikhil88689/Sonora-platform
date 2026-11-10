"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SoundscapeCard } from "@/features/soundscapes/soundscape-card";
import { soundscapes } from "@/features/soundscapes/data";

const categories = ["All places", "Birdsong", "Weather", "City life", "Nature"];

export function DiscoveryGallery() {
  const [activeCategory, setActiveCategory] = useState("All places");
  const filteredSoundscapes = useMemo(() => activeCategory === "All places"
    ? soundscapes
    : soundscapes.filter((soundscape) => soundscape.category === activeCategory), [activeCategory]);

  return (
    <section className="discover-section section-block" id="discover" aria-labelledby="discover-title">
      <ScrollReveal>
        <SectionHeading
          eyebrow="CURATED FOR YOUR CURIOSITY"
          title="Somewhere, right now."
          description="A few open windows into the everyday sounds of our planet."
        >
          <a href="#map" className="section-link">View the atlas <ArrowRight size={15} /></a>
        </SectionHeading>
      </ScrollReveal>
      <div className="region-filters" aria-label="Filter soundscapes by category">
        <span className="filter-intro"><Sparkles size={13} /> EXPLORE BY FEELING</span>
        {categories.map((category) => (
          <button
            className={activeCategory === category ? "region-filter is-selected" : "region-filter"}
            type="button"
            aria-pressed={activeCategory === category}
            onClick={() => setActiveCategory(category)}
            key={category}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="soundscape-grid" aria-live="polite">
        {filteredSoundscapes.map((soundscape) => (
          <ScrollReveal delay={0.04} key={soundscape.id}>
            <SoundscapeCard soundscape={soundscape} index={soundscapes.indexOf(soundscape)} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
