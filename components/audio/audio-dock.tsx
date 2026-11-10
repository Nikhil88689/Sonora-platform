"use client";

import { Pause, Play, Volume2 } from "lucide-react";
import { useAudioPlayer } from "@/components/audio/audio-player-provider";
import { formatTime } from "@/utils/format-time";

export function AudioDock() {
  const { currentTrack, isPlaying, currentTime, duration, hasAudioSession, toggle, seek } = useAudioPlayer();
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (!hasAudioSession) return null;

  return (
    <aside className="audio-dock" aria-label="Sound player">
      <div className="dock-track">
        <div className={`dock-artwork ${isPlaying ? "is-playing" : ""}`} aria-hidden="true">
          <span className="dock-wave"><i /><i /><i /><i /><i /></span>
        </div>
        <div className="dock-track-copy">
          <span className="dock-kicker">{isPlaying ? "NOW PLAYING" : "READY TO LISTEN"}</span>
          <span className="dock-title">{currentTrack.title}</span>
          <span className="dock-place">{currentTrack.place} · {currentTrack.country}</span>
        </div>
      </div>

      <div className="dock-controls">
        <button
          className="dock-play-button"
          type="button"
          onClick={toggle}
          aria-label={isPlaying ? "Pause sound" : `Play ${currentTrack.title}`}
          title={isPlaying ? "Pause sound" : "Play sound preview"}
        >
          {isPlaying ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" />}
        </button>
        <div className="dock-timeline">
          <span className="dock-time">{formatTime(currentTime)}</span>
          <input
            aria-label="Seek within sound preview"
            type="range"
            min={0}
            max={duration || 100}
            step={0.1}
            value={duration ? currentTime : 0}
            onChange={(event) => seek(Number(event.target.value))}
            style={{ "--progress": `${progress}%` } as React.CSSProperties}
          />
          <span className="dock-time">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="dock-volume" aria-hidden="true">
        <Volume2 size={16} strokeWidth={1.6} />
        <span>FIELD RECORDING</span>
      </div>
    </aside>
  );
}
