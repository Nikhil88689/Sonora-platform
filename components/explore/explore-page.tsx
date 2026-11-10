"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowRight, Globe2, Headphones, MapPin } from "lucide-react";
import { MapPreview } from "@/components/layout/map-preview";
import { PageTransition } from "@/components/animations/page-transition";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { SoundscapeCard } from "@/features/soundscapes/soundscape-card";
import { atmospheres, soundscapes } from "@/features/soundscapes/data";
import { useAudioPlayer } from "@/components/audio/audio-player-provider";

export function ExplorePage() {
  const [selected, setSelected] = useState<string | null>(null);
  const { openPreview } = useAudioPlayer();
  const filtered = useMemo(() => selected
    ? soundscapes.filter((track) => track.atmospheres.includes(selected))
    : soundscapes, [selected]);

  return (
    <PageTransition>
      <div className="explore-page">
        <header className="explore-heading content-width" aria-labelledby="explore-title">
          <div className="explore-heading-copy">
            <span className="eyebrow"><Globe2 size={14} /> A LIVING SOUND ATLAS</span>
            <h1 id="explore-title">Somewhere is<br /><span>calling.</span></h1>
            <p>Move across the map. Find the small sounds that make a place feel like itself.</p>
            <a className="explore-scroll-link" href="#explore-recordings">Browse the recordings <ArrowDown size={14} /></a>
          </div>
          <div className="explore-map-shell">
            <div className="explore-map-label"><span><i /> {soundscapes.length} PLACES IN THIS EDITION</span><span>CLICK A SIGNAL TO LISTEN</span></div>
            <MapPreview />
            <div className="explore-map-attribution">Map tiles by MapLibre demo tiles</div>
          </div>
        </header>

        <section className="explore-library content-width" id="explore-recordings" aria-labelledby="explore-library-title">
          <ScrollReveal>
            <div className="explore-library-heading">
              <div><span className="eyebrow">LISTEN BY FEELING</span><h2 id="explore-library-title">Choose a frequency.</h2></div>
              <span className="explore-count"><Headphones size={14} /> {filtered.length} RECORDINGS</span>
            </div>
          </ScrollReveal>
          <div className="explore-filters" role="group" aria-label="Filter recordings by atmosphere">
            <button type="button" className={!selected ? "is-selected" : ""} aria-pressed={!selected} onClick={() => setSelected(null)}>All places</button>
            {atmospheres.map((atmosphere) => <button type="button" className={selected === atmosphere.name ? "is-selected" : ""} aria-pressed={selected === atmosphere.name} key={atmosphere.name} onClick={() => setSelected(selected === atmosphere.name ? null : atmosphere.name)}>{atmosphere.name}</button>)}
          </div>
          {filtered.length ? (
            <div className="explore-grid">
              {filtered.map((track) => <ScrollReveal key={track.id}><SoundscapeCard soundscape={track} index={soundscapes.indexOf(track)} /></ScrollReveal>)}
            </div>
          ) : <p className="explore-empty">More sounds are finding their way here. Try another atmosphere.</p>}
          <div className="explore-contribute">
            <MapPin size={17} /><p>Know a sound that belongs on this map?</p><button type="button" onClick={() => openPreview(soundscapes[(soundscapes.findIndex((track) => track.atmospheres.includes(selected ?? "Nature")) + 1) % soundscapes.length] ?? soundscapes[0])}>Hear another place <ArrowRight size={14} /></button>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
