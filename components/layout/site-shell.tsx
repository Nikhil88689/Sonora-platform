"use client";

import { AudioPlayerProvider } from "@/components/audio/audio-player-provider";
import { AudioDock } from "@/components/audio/audio-dock";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AppErrorBoundary } from "@/components/ui/error-boundary";
import { featuredSoundscape } from "@/features/soundscapes/data";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.remove("is-route-transitioning");
  }, [pathname]);

  return (
    <AudioPlayerProvider initialTrack={featuredSoundscape}>
      <div className="site-frame">
        <SiteHeader />
        <main id="main-content"><AppErrorBoundary>{children}</AppErrorBoundary></main>
        <SiteFooter />
        <AudioDock />
        <div className="route-transition-veil" aria-hidden="true" />
      </div>
    </AudioPlayerProvider>
  );
}
