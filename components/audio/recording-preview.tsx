"use client";

import { useEffect } from "react";
import { ArrowUpRight, MapPin, Pause, Play, Volume2, X } from "lucide-react";
import { useAudioPlayer } from "@/components/audio/audio-player-provider";
import { formatTime } from "@/utils/format-time";

const waveformBars = Array.from({ length: 64 }, (_, index) => ({
  id: index,
  height: 14 + Math.abs(Math.sin(index * 12.9898) * Math.cos(index * 0.527)) * 72,
}));

export function RecordingPreview() {
  const { currentTrack, previewOpen, closePreview, isPlaying, toggle, currentTime, duration, seek } = useAudioPlayer();
  const progress = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  useEffect(() => {
    if (!previewOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePreview();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [previewOpen, closePreview]);

  if (!previewOpen) return null;

  return (
    <div className="recording-overlay" onMouseDown={(event) => event.target === event.currentTarget && closePreview()}>
      <section className="recording-dialog" role="dialog" aria-modal="true" aria-labelledby="recording-title">
        <button className="recording-close" type="button" onClick={closePreview} aria-label="Close recording preview"><X size={18} /></button>
        <div className="recording-cover" style={{ backgroundImage: `linear-gradient(180deg, transparent 34%, rgba(7,8,12,.65)), url(${currentTrack.artwork})` }}>
          <span className="recording-cover-kicker"><i /> FIELD RECORDING · {currentTrack.category.toUpperCase()}</span>
          <span className="recording-cover-location"><MapPin size={13} /> {currentTrack.place}, {currentTrack.country}</span>
        </div>
        <div className="recording-details">
          <p className="eyebrow">A WINDOW INTO SOMEWHERE</p>
          <h2 id="recording-title">{currentTrack.title}</h2>
          <p className="recording-description">{currentTrack.description}</p>
          <div className={`recording-waveform ${isPlaying ? "is-playing" : ""}`} aria-hidden="true">
            {waveformBars.map((bar) => <i key={bar.id} style={{ "--bar-height": `${bar.height}%`, "--bar-delay": `${(bar.id % 11) * -0.09}s` } as React.CSSProperties} />)}
          </div>
          <div className="recording-timeline">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              aria-label="Seek in recording"
              min="0"
              max={duration || 100}
              step="0.1"
              value={duration ? currentTime : 0}
              onChange={(event) => seek(Number(event.target.value))}
              style={{ "--progress": `${progress}%` } as React.CSSProperties}
            />
            <span>{formatTime(duration)}</span>
          </div>
          <div className="recording-actions">
            <button className="recording-main-control" type="button" onClick={toggle} aria-label={isPlaying ? "Pause recording" : "Play recording"}>
              {isPlaying ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" />}
              {isPlaying ? "Pause" : "Listen"}
            </button>
            <span className="recording-volume"><Volume2 size={15} /> BEST WITH HEADPHONES</span>
          </div>
          <a className="recording-credit" href={currentTrack.creditUrl} target="_blank" rel="noreferrer">
            <span>Recorded by {currentTrack.credit}</span><ArrowUpRight size={14} />
          </a>
          {currentTrack.licenseUrl && <a className="recording-license" href={currentTrack.licenseUrl} target="_blank" rel="noreferrer">View recording license</a>}
        </div>
      </section>
    </div>
  );
}
