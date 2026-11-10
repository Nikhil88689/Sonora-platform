"use client";

import { ArrowDown, ArrowUpRight, Headphones, Radio } from "lucide-react";
import { OrbitalSoundscape } from "@/components/3d/orbital-soundscape";
import { useAudioPlayer } from "@/components/audio/audio-player-provider";
import { CinematicNavigationButton } from "@/components/landing/cinematic-navigation-button";
import { featuredSoundscape } from "@/features/soundscapes/data";
import { usePointerGlow } from "@/hooks/use-pointer-glow";

export function HeroSection() {
  const { openPreview } = useAudioPlayer();
  const onPointerMove = usePointerGlow<HTMLElement>();

  return (
    <section
      className="cinematic-hero"
      aria-labelledby="landing-title"
      onPointerMove={onPointerMove}
    >
      <div className="hero-starfield" aria-hidden="true" />
      <div className="hero-grain" aria-hidden="true" />
      <div className="hero-topline">
        <span><i /> A FIELD GUIDE TO EVERYWHERE</span>
        <span className="hero-edition">01 <i /> THE LISTENING EDITION</span>
      </div>
      <div className="hero-globe-stage">
        <div className="hero-globe-aura" aria-hidden="true" />
        <div className="hero-orbit orbit-one" aria-hidden="true" />
        <div className="hero-orbit orbit-two" aria-hidden="true" />
        <OrbitalSoundscape className="hero-earth" />
        <span className="hero-orbit-note orbit-note-left" aria-hidden="true">EARTH / 01</span>
        <span className="hero-orbit-note orbit-note-right" aria-hidden="true">PRESS PLAY ON PLANET EARTH</span>
      </div>

      <div className="hero-center-copy">
        <p className="hero-overline"><Radio size={13} strokeWidth={1.5} /> THE WORLD HAS A SOUND</p>
        <h1 id="landing-title">THE WORLD<br />HAS A SOUND<span>.</span></h1>
        <p className="hero-subtitle">Discover the invisible stories hidden in the sounds of our planet.</p>
        <div className="hero-cta-row">
          <CinematicNavigationButton href="/explore" className="hero-explore-button">Explore the World</CinematicNavigationButton>
          <button className="hero-listen-button" type="button" onClick={() => openPreview(featuredSoundscape)}>
            <span className="listen-icon"><Headphones size={15} /></span>
            Start Listening
          </button>
        </div>
      </div>

      <div className="hero-lowerline">
        <span>EVERY SOUND HAS A PLACE</span>
        <a href="#featured">SCROLL TO LISTEN <ArrowDown size={13} /></a>
        <span>LAT 00°00′ <i /> LON 00°00′</span>
      </div>
      <button className="hero-location-callout" type="button" onClick={() => openPreview(featuredSoundscape)} aria-label="Listen to Himalayan Morning">
        <span className="callout-wave"><i /><i /><i /><i /><i /></span>
        <span><small>FIELD RECORDING</small><strong>Somewhere in the Himalaya</strong></span>
        <ArrowUpRight size={14} />
      </button>
    </section>
  );
}
