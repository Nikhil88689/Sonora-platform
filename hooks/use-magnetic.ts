"use client";

import { useCallback, useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

export function useMagnetic<T extends HTMLElement>(strength = 0.18) {
  const ref = useRef<T>(null);

  const onPointerMove = useCallback((event: ReactPointerEvent<T>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left - bounds.width / 2;
    const y = event.clientY - bounds.top - bounds.height / 2;
    event.currentTarget.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  }, [strength]);

  const onPointerLeave = useCallback((event: ReactPointerEvent<T>) => {
    event.currentTarget.style.transform = "translate(0, 0)";
  }, []);

  return { ref, onPointerMove, onPointerLeave };
}
