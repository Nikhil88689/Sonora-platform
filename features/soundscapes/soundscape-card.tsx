"use client";

import { Headphones, MapPin, Pause, Play } from "lucide-react";
import { useAudioPlayer } from "@/components/audio/audio-player-provider";
import type { Soundscape } from "@/types/soundscape";

export function SoundscapeCard({ soundscape, index }: { soundscape: Soundscape; index: number }) {
  const { currentTrack, isPlaying, openPreview, toggle } = useAudioPlayer();
  const isCurrent = currentTrack.id === soundscape.id;
  const isActive = isCurrent && isPlaying;

  return (
    <article className="soundscape-card" id={soundscape.id}>
      <div
        className="soundscape-card-art"
        style={{ backgroundImage: "linear-gradient(180deg, rgba(6,8,12,.02) 32%, rgba(6,8,12,.78) 100%), url(" + soundscape.artwork + ")" }}
      >
        <span className="card-index">0{index + 1} <i /> {soundscape.category.toUpperCase()}</span>
        <span className="card-duration">{soundscape.duration}</span>
        <button
          className={`card-play ${isActive ? "is-active" : ""}`}
          type="button"
          aria-label={`${isActive ? "Pause" : "Preview"} ${soundscape.title}`}
          onClick={() => isCurrent ? toggle() : openPreview(soundscape)}
        >
          {isActive ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" />}
        </button>
        <div className="card-art-caption">
          <h3>{soundscape.title}</h3>
          <p><MapPin size={13} /> {soundscape.place}, {soundscape.country}</p>
        </div>
      </div>
      <div className="soundscape-card-foot">
        <p>{soundscape.description}</p>
        <span>{soundscape.region}</span>
      </div>
      <a className="card-credit" href={soundscape.creditUrl} target="_blank" rel="noreferrer">
        <Headphones size={12} /> {soundscape.credit}
      </a>
    </article>
  );
}
