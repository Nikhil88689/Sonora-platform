"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Soundscape } from "@/types/soundscape";
import { RecordingPreview } from "@/components/audio/recording-preview";

type AudioPlayerContextValue = {
  currentTrack: Soundscape;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  hasAudioSession: boolean;
  play: (track: Soundscape) => void;
  openPreview: (track: Soundscape) => void;
  closePreview: () => void;
  previewOpen: boolean;
  toggle: () => void;
  seek: (time: number) => void;
};

const AudioPlayerContext = createContext<AudioPlayerContextValue | null>(null);

export function AudioPlayerProvider({
  children,
  initialTrack,
}: {
  children: ReactNode;
  initialTrack: Soundscape;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTrack, setCurrentTrack] = useState(initialTrack);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [hasAudioSession, setHasAudioSession] = useState(false);

  const play = useCallback((track: Soundscape) => {
    const audio = audioRef.current;
    if (!audio || !track.audioUrl) return;

    if (audio.dataset.trackId !== track.id) {
      audio.pause();
      audio.src = track.audioUrl;
      audio.dataset.trackId = track.id;
      audio.currentTime = 0;
      setCurrentTime(0);
      setDuration(0);
    }

    setCurrentTrack(track);
    setHasAudioSession(true);
    void audio.play().catch(() => setIsPlaying(false));
  }, []);

  const openPreview = useCallback((track: Soundscape) => {
    setPreviewOpen(true);
    play(track);
  }, [play]);

  const closePreview = useCallback(() => setPreviewOpen(false), []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack.audioUrl) return;
    if (audio.dataset.trackId !== currentTrack.id) {
      audio.src = currentTrack.audioUrl;
      audio.dataset.trackId = currentTrack.id;
      audio.currentTime = 0;
      setCurrentTime(0);
    }
    if (audio.paused) {
      setHasAudioSession(true);
      void audio.play().catch(() => setIsPlaying(false));
    }
    else audio.pause();
  }, [currentTrack]);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(time)) return;
    audio.currentTime = time;
    setCurrentTime(time);
  }, []);

  return (
    <AudioPlayerContext.Provider
      value={{ currentTrack, isPlaying, currentTime, duration, hasAudioSession, play, openPreview, closePreview, previewOpen, toggle, seek }}
    >
      {children}
      <RecordingPreview />
      <audio
        ref={audioRef}
        preload="none"
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onEnded={() => setIsPlaying(false)}
        aria-label="Sound preview audio"
      />
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error("useAudioPlayer must be used within AudioPlayerProvider");
  }
  return context;
}
