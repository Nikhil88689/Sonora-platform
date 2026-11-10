"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { AudioLines, Globe2, Headphones, UsersRound } from "lucide-react";
import { soundscapes } from "@/features/soundscapes/data";

type Statistics = {
  totalRecordings: number;
  countriesRepresented: number;
  activeContributors: number;
  listeningHours: number;
  source: "database" | "development-seed";
};

const creditedRecordists = new Set(soundscapes.map((soundscape) => soundscape.credit?.split(" · ")[0]));
const initialStats: Statistics = {
  totalRecordings: soundscapes.length,
  countriesRepresented: new Set(soundscapes.map((soundscape) => soundscape.country)).size,
  activeContributors: creditedRecordists.size,
  listeningHours: 0,
  source: "development-seed",
};

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.65 });
  const reducedMotion = useReducedMotion();
  const count = useMotionValue(reducedMotion ? value : 0);
  const formatted = useTransform(count, (latest) => `${Math.round(latest).toLocaleString()}${suffix}`);

  useEffect(() => {
    if (!isInView || reducedMotion) return;
    const controls = animate(count, value, { duration: 1.7, ease: [0.16, 1, 0.3, 1] });
    return controls.stop;
  }, [count, isInView, reducedMotion, value]);

  return <motion.span ref={ref}>{formatted}</motion.span>;
}

const metricItems = [
  { key: "totalRecordings", label: "Recordings", caption: "STORIES IN THE FIELD", icon: AudioLines },
  { key: "countriesRepresented", label: "Countries", caption: "BORDERS CROSSED", icon: Globe2 },
  { key: "activeContributors", label: "Contributors", caption: "EARS ON THE GROUND", icon: UsersRound },
  { key: "listeningHours", label: "Listening hours", caption: "TIME SPENT ELSEWHERE", icon: Headphones },
] as const;

export function GlobalStatistics() {
  const [stats, setStats] = useState(initialStats);

  useEffect(() => {
    const controller = new AbortController();
    void fetch("/api/landing-stats", { cache: "no-store", signal: controller.signal })
      .then((response) => response.ok ? response.json() as Promise<Statistics> : null)
      .then((result) => { if (result) setStats(result); })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name !== "AbortError") console.error("SONORA stats could not be refreshed.", error);
      });
    return () => controller.abort();
  }, []);

  return (
    <section className="statistics-section" aria-labelledby="statistics-title">
      <div className="statistics-heading">
        <span className="eyebrow">A SMALL SNAPSHOT OF A BIG WORLD</span>
        <h2 className="sr-only" id="statistics-title">SONORA by the numbers</h2>
        <span className={`statistics-source ${stats.source === "database" ? "is-live" : ""}`}>
          <i /> {stats.source === "database" ? "LIVE FROM SONORA" : "DEVELOPMENT SEED DATA"}
        </span>
      </div>
      <div className="statistics-grid">
        {metricItems.map(({ key, label, caption, icon: Icon }, index) => (
          <article className="statistic-item" key={key}>
            <div className="statistic-icon"><Icon size={16} strokeWidth={1.5} /></div>
            <span className="statistic-number"><AnimatedNumber value={stats[key]} suffix={key === "listeningHours" ? " h" : ""} /></span>
            <span className="statistic-label">{label}</span>
            <span className="statistic-caption">{caption}</span>
            <span className="statistic-index">0{index + 1}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
