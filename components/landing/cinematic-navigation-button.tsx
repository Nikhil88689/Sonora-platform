"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function CinematicNavigationButton({ href, children, className = "" }: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const router = useRouter();
  const reducedMotion = useReducedMotion();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function navigate() {
    if (reducedMotion) {
      router.push(href);
      return;
    }
    document.documentElement.classList.add("is-route-transitioning");
    timerRef.current = setTimeout(() => router.push(href), 420);
  }

  return (
    <button type="button" className={`cinematic-nav-button ${className}`.trim()} onClick={navigate}>
      {children}<ArrowUpRight size={16} strokeWidth={1.7} />
    </button>
  );
}
