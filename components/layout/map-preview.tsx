"use client";

import type { Map as MapLibreMap } from "maplibre-gl";
import { useEffect, useRef } from "react";
import { soundscapes } from "@/features/soundscapes/data";
import { useAudioPlayer } from "@/components/audio/audio-player-provider";

export function MapPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const { openPreview } = useAudioPlayer();

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    let disposed = false;
    let map: MapLibreMap | null = null;

    void import("maplibre-gl").then(({ AttributionControl, Map, Marker, NavigationControl }) => {
      if (disposed || !containerRef.current) return;
      map = new Map({
        container: containerRef.current,
        style: "https://demotiles.maplibre.org/style.json",
        center: [14, 18],
        zoom: 1.05,
        minZoom: 0.8,
        maxZoom: 5,
        attributionControl: false,
        cooperativeGestures: true,
      });

      map.addControl(new NavigationControl({ showCompass: false }), "top-right");
      map.addControl(new AttributionControl({ compact: true }), "bottom-right");
      map.on("load", () => {
        soundscapes.forEach((soundscape, index) => {
          const marker = document.createElement("button");
          marker.className = `map-signal ${index === 0 ? "map-signal-active" : ""}`;
          marker.type = "button";
          marker.setAttribute("aria-label", `Open ${soundscape.title} recording`);
          marker.title = `${soundscape.title} · ${soundscape.place}`;
          marker.addEventListener("click", () => openPreview(soundscape));
          new Marker({ element: marker, anchor: "center" })
            .setLngLat([soundscape.longitude, soundscape.latitude])
            .addTo(map!);
        });
      });
      mapRef.current = map;
    }).catch((error: unknown) => {
      console.error("SONORA map failed to load:", error);
    });

    return () => {
      disposed = true;
      map?.remove();
      mapRef.current = null;
    };
  }, [openPreview]);

  return <div className="map-preview" ref={containerRef} aria-label="Map of featured soundscape locations" role="region" />;
}
