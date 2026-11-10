"use client";

import { Pause, Play } from "lucide-react";
import WaveSurfer from "wavesurfer.js";
import { useEffect, useRef, useState } from "react";
import { formatTime } from "@/utils/format-time";

export function WaveformPlayer({ src, label, height = 46 }: { src: string; label: string; height?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const waveformRef = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const waveform = WaveSurfer.create({
      container: containerRef.current,
      url: src,
      height,
      barWidth: 2,
      barGap: 3,
      barRadius: 3,
      cursorWidth: 1,
      waveColor: "rgba(157, 168, 190, .32)",
      progressColor: "#66d9eb",
      cursorColor: "#d5fcff",
      normalize: true,
    });
    waveformRef.current = waveform;
    waveform.on("ready", () => setDuration(waveform.getDuration()));
    waveform.on("timeupdate", setCurrentTime);
    waveform.on("play", () => setIsPlaying(true));
    waveform.on("pause", () => setIsPlaying(false));
    waveform.on("finish", () => setIsPlaying(false));
    return () => {
      waveform.destroy();
      waveformRef.current = null;
    };
  }, [src, height]);

  return (
    <div className="waveform-player">
      <button className="waveform-play" type="button" aria-label={`${isPlaying ? "Pause" : "Play"} ${label}`} onClick={() => void waveformRef.current?.playPause()}>
        {isPlaying ? <Pause size={15} fill="currentColor" /> : <Play size={15} fill="currentColor" />}
      </button>
      <div ref={containerRef} className="waveform-canvas" aria-label={`${label} audio waveform`} />
      <span className="waveform-time">{formatTime(isPlaying ? currentTime : duration)}</span>
    </div>
  );
}
