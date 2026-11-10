"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, CloudRain, Leaf, TrainFront, UsersRound, Waves, Building2 } from "lucide-react";
import { atmospheres } from "@/features/soundscapes/data";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const icons = {
  Nature: Leaf,
  Urban: Building2,
  Water: Waves,
  Transport: TrainFront,
  Weather: CloudRain,
  "Human Life": UsersRound,
};

export function AtmosphereRail({ selected, onSelect }: {
  selected: string | null;
  onSelect: (category: string | null) => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const rail = railRef.current;
    if (!section || !rail || reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(min-width: 900px)", () => {
      const travel = () => Math.max(0, rail.scrollWidth - section.clientWidth + 80);
      gsap.to(rail, {
        x: () => -travel(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${travel() * 1.12}`,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      return () => gsap.set(rail, { clearProps: "transform" });
    });

    media.add("(max-width: 899px)", () => {
      gsap.fromTo(rail.children, { autoAlpha: 0.45, y: 15 }, {
        autoAlpha: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: section, start: "top 78%", once: true },
      });
    });

    return () => media.revert();
  }, [reducedMotion]);

  return (
    <section className="atmosphere-section" id="atmosphere" ref={sectionRef} aria-labelledby="atmosphere-title">
      <div className="atmosphere-inner">
        <div className="atmosphere-header">
          <div>
            <span className="eyebrow">TUNE YOUR POINT OF VIEW</span>
            <h2 id="atmosphere-title">Find your atmosphere.</h2>
          </div>
          <span className="atmosphere-instruction"><span>01 — 06</span> CHOOSE A FREQUENCY</span>
        </div>
        <div className="atmosphere-viewport">
          <div className="atmosphere-rail" ref={railRef}>
            {atmospheres.map((atmosphere) => {
              const Icon = icons[atmosphere.name as keyof typeof icons];
              const isSelected = selected === atmosphere.name;
              return (
                <button
                  className={`atmosphere-card ${isSelected ? "is-selected" : ""}`}
                  type="button"
                  aria-pressed={isSelected}
                  key={atmosphere.name}
                  onClick={() => onSelect(isSelected ? null : atmosphere.name)}
                  style={{ backgroundImage: `linear-gradient(180deg, rgba(8,9,14,.06) 10%, rgba(8,9,14,.76) 100%), url(${atmosphere.artwork})` }}
                >
                  <span className="atmosphere-card-top"><span>{atmosphere.index}</span><Icon size={15} strokeWidth={1.5} /></span>
                  <span className="atmosphere-card-copy"><strong>{atmosphere.name}</strong><small>{atmosphere.subtitle}</small></span>
                  <span className="atmosphere-card-arrow"><ArrowRight size={16} /></span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="atmosphere-footnote">
          <span><i /> {selected ? `FILTERING THE COLLECTION · ${selected.toUpperCase()}` : "SIX WAYS INTO THE WORLD"}</span>
          <span>SCROLL TO MOVE THROUGH THE SIGNAL</span>
        </div>
      </div>
    </section>
  );
}
