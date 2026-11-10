"use client";

import Link from "next/link";
import { Headphones, Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { SearchDialog } from "@/components/layout/search-dialog";
import { useAudioPlayer } from "@/components/audio/audio-player-provider";
import { featuredSoundscape } from "@/features/soundscapes/data";

const navigation = [
  { label: "Explore", href: "/explore" },
  { label: "Discover", href: "/#featured" },
  { label: "Our story", href: "/#how-it-works" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { openPreview } = useAudioPlayer();

  useEffect(() => {
    const onShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onShortcut);
    return () => window.removeEventListener("keydown", onShortcut);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <div className="header-inner">
          <Link className="brand" href="/" aria-label="SONORA home">
            <span className="sonora-mark" aria-hidden="true"><span /><span /><span /><span /></span>
            <span className="brand-word">SONORA<span className="brand-period">.</span></span>
          </Link>

          <nav className={`primary-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
            {navigation.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
            <button
              className="mobile-nav-search"
              type="button"
              onClick={() => { setSearchOpen(true); setMenuOpen(false); }}
            >
              <Search size={16} /> Search sounds
            </button>
          </nav>

          <div className="header-actions">
            <button className="header-search" type="button" onClick={() => setSearchOpen(true)} aria-label="Search sounds">
              <Search size={17} strokeWidth={1.8} />
              <span>Search</span>
              <kbd>⌘ K</kbd>
            </button>
            <button className="header-cta" type="button" onClick={() => openPreview(featuredSoundscape)}>
              <Headphones size={15} strokeWidth={1.8} />
              <span>Start listening</span>
            </button>
          </div>

          <button
            className="mobile-menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
