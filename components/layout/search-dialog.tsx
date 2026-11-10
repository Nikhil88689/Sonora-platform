"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Search, X } from "lucide-react";
import { soundscapes } from "@/features/soundscapes/data";

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return soundscapes.slice(0, 3);
    return soundscapes.filter((sound) =>
      `${sound.title} ${sound.place} ${sound.country} ${sound.category}`.toLowerCase().includes(normalized),
    );
  }, [query]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="search-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="search-dialog" role="dialog" aria-modal="true" aria-labelledby="search-title">
        <div className="search-dialog-top">
          <div className="search-input-wrap">
            <Search size={19} aria-hidden="true" />
            <label id="search-title" className="sr-only" htmlFor="sound-search">Search the sound atlas</label>
            <input
              ref={inputRef}
              id="sound-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="A place, a feeling, a sound…"
              autoComplete="off"
            />
          </div>
          <button className="search-close" type="button" aria-label="Close search" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="search-dialog-content">
          <p className="search-label">{query ? "MATCHING SOUNDS" : "A FEW PLACES TO BEGIN"}</p>
          {results.length ? results.map((sound) => (
            <a className="search-result" href={`/#${sound.id}`} key={sound.id} onClick={onClose}>
              <span className="search-result-art" style={{ backgroundImage: `url(${sound.artwork})` }} />
              <span className="search-result-copy"><strong>{sound.title}</strong><small>{sound.place} · {sound.country}</small></span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          )) : (
            <p className="search-empty">No sounds found. Try a place, region, or feeling.</p>
          )}
          <p className="search-hint"><span>ESC</span> to close</p>
        </div>
      </section>
    </div>
  );
}
