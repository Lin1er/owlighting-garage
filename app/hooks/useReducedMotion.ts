"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

const subscribe = (callback: () => void) => {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
};

const getSnapshot = () => {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia(QUERY).matches;
};

const getServerSnapshot = () => false;

/**
 * Tracks the user's `prefers-reduced-motion` setting.
 *
 * Implemented with `useSyncExternalStore` so it stays in sync with the media
 * query without the cascading-render anti-pattern of setting state inside a
 * `useEffect`. Wrap motion-heavy effects (parallax, auto-rotate, beam sweeps)
 * with this so a11y users get a calm UI without a duplicate code path.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
