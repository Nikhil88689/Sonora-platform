"use client";

import { useCallback } from "react";

export function usePointerGlow<T extends HTMLElement>() {
  const onPointerMove = useCallback((event: React.PointerEvent<T>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
  }, []);
  return onPointerMove;
}
