"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Headphones, MoveUpRight, Waves } from "lucide-react";
import { PageTransition } from "@/components/animations/page-transition";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { useAudioPlayer } from "@/components/audio/audio-player-provider";
import { AtmosphereRail } from "@/components/landing/atmosphere-rail";
import { CinematicNavigationButton } from "@/components/landing/cinematic-navigation-button";
import { GlobalStatistics } from "@/components/landing/global-statistics";
import { HeroSection } from "@/components/landing/hero-section";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { SoundscapeCard } from "@/features/soundscapes/soundscape-card";
import { featuredSoundscape, soundscapes } from "@/features/soundscapes/data";
import type { Soundscape } from "@/types/soundscape";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const howItWorks = [
  { number: "01", title: "Discover", text: "Follow a place, a feeling, or a small glowing point on the map. Every route begins somewhere different." },
  { number: "02", title: "Listen", text: "Give the world a moment. Hear its weather, movement, rituals, and pauses in the voices of the people there." },
  { number: "03", title: "Contribute", text: "Share a sound from your own corner of the world and leave a new trace in the living atlas." },
];

function HowItWorks() {
  return (
    <section className="how-section" id="how-it-works" aria-labelledby="how-title">
      <div className="how-inner">
        <ScrollReveal>
          <SectionHeading
            eyebrow="THREE SIMPLE STEPS · INFINITE PLACES"
            title="A little closer to everywhere."
            description="A sound can take you somewhere words can’t. Here’s how to follow it."
            titleId="how-title"
          />
        </ScrollReveal>
        <div className="how-grid">
          {howItWorks.map((step, index) => (
            <ScrollReveal delay={index * 0.08} key={step.number}>
              <article className="how-card">
                <div className="how-card-top"><span>{step.number}</span><i /></div>
                <h3>{step.title}<span>.</span></h3>
                <p>{step.text}</p>
                <span className="how-card-index">0{index + 1} / SONORA METHOD</span>
              </article>
            </ScrollReveal>
          ))}
        </div>
        <div className="contribute-note">
          <div><span className="eyebrow">YOUR WORLD HAS A SOUND, TOO</span><p>Be the reason somebody else discovers it.</p></div>
          <Button href="/upload" variant="secondary">Contribute a recording <ArrowUpRight size={15} /></Button>
        </div>
      </div>
    </section>
  );
}

function FinalCallToAction({ onListen }: { onListen: () => void }) {
  return (
    <section className="final-cta" aria-labelledby="final-title">
      <div className="final-cta-grid" aria-hidden="true" />
      <div className="final-globe" aria-hidden="true"><span /><i /><b /></div>
      <div className="final-cta-content">
        <span className="eyebrow"><Waves size={14} /> THE WORLD IS STILL SINGING</span>
        <h2 id="final-title">EVERY PLACE HAS A STORY.<br /><span>EVERY STORY HAS A SOUND.</span></h2>
        <div className="final-cta-actions">
          <CinematicNavigationButton href="/explore" className="hero-explore-button">Explore the World</CinematicNavigationButton>
          <button className="final-listen-link" type="button" onClick={onListen}><Headphones size={15} /> Listen somewhere new</button>
        </div>
      </div>
      <span className="final-cta-index" aria-hidden="true">SONORA / 001</span>
    </section>
  );
}

export function LandingPage() {
  const [selectedAtmosphere, setSelectedAtmosphere] = useState<string | null>(null);
  const { openPreview } = useAudioPlayer();
  const reducedMotion = useReducedMotion();
  const displayedSoundscapes = selectedAtmosphere
    ? soundscapes.filter((soundscape: Soundscape) => soundscape.atmospheres.includes(selectedAtmosphere))
    : soundscapes;

  const selectAtmosphere = useCallback((category: string | null) => {
    setSelectedAtmosphere(category);
    document.getElementById("featured")?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  }, [reducedMotion]);

  return (
    <PageTransition>
      <div className="landing-page">
        <HeroSection />
        <GlobalStatistics />

        <section className="featured-section" id="featured" aria-labelledby="featured-title">
          <div className="featured-inner">
            <ScrollReveal>
              <SectionHeading
                eyebrow="LISTEN CLOSELY · THE WORLD IS OPEN"
                title={selectedAtmosphere ? `Somewhere in ${selectedAtmosphere.toLowerCase()}.` : "Field notes from elsewhere."}
                description="Real places, recorded by the people who know their rhythms best."
                titleId="featured-title"
              >
                <Link className="text-link featured-explore-link" href="/explore">Open the sound atlas <ArrowRight size={15} /></Link>
              </SectionHeading>
            </ScrollReveal>
            <div className="featured-toolbar">
              <span><i /> {selectedAtmosphere ? `${displayedSoundscapes.length} RECORDINGS IN ${selectedAtmosphere.toUpperCase()}` : "A FEW PLACES TO BEGIN"}</span>
              {selectedAtmosphere && <button type="button" onClick={() => setSelectedAtmosphere(null)}>Clear filter <span>×</span></button>}
              {!selectedAtmosphere && <span className="featured-toolbar-right">SELECT A CARD TO LISTEN <MoveUpRight size={12} /></span>}
            </div>
            {displayedSoundscapes.length ? (
              <div className="featured-grid" aria-live="polite">
                {displayedSoundscapes.map((soundscape, index) => (
                  <ScrollReveal delay={index * 0.06} key={soundscape.id}>
                    <SoundscapeCard soundscape={soundscape} index={soundscapes.indexOf(soundscape)} />
                  </ScrollReveal>
                ))}
              </div>
            ) : (
              <div className="featured-empty">
                <span className="empty-mark"><Waves size={18} /></span>
                <p>That frequency is still being tuned.</p>
                <button type="button" onClick={() => setSelectedAtmosphere(null)}>Return to every recording <ArrowRight size={14} /></button>
              </div>
            )}
            <div className="featured-footnote"><span>RECORDED IN THE WORLD. SHARED WITH CARE.</span><span>ALL PLACES ARE SOMEONE’S HOME.</span></div>
          </div>
        </section>

        <AtmosphereRail selected={selectedAtmosphere} onSelect={selectAtmosphere} />

        <HowItWorks />

        <FinalCallToAction onListen={() => openPreview(featuredSoundscape)} />
      </div>
    </PageTransition>
  );
}
