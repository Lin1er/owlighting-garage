"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

const VISIT_FLAG = "owlighting:visited";
const SHOW_DURATION_MS = 900;

/**
 * Lightweight first-visit splash.
 *
 * The previous implementation:
 *   • showed a fake progress bar on every navigation
 *   • took 3-5s with random increments (felt slow, not premium)
 *   • blocked content even when SSR HTML was already painted
 *
 * This rewrite:
 *   • only fires on the *first* visit per session (`sessionStorage` flag)
 *   • respects reduced-motion (skips entirely)
 *   • times out at SHOW_DURATION_MS regardless of `readyState`, so the user
 *     never waits longer than necessary
 *   • the brand mark is a single beam logotype, not a fake telemetry display
 */
export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (reduced) return;
    if (sessionStorage.getItem(VISIT_FLAG)) return;

    sessionStorage.setItem(VISIT_FLAG, "1");
    setIsVisible(true);

    const timer = setTimeout(() => setIsVisible(false), SHOW_DURATION_MS);
    return () => clearTimeout(timer);
  }, [reduced]);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          className="fixed inset-0 z-[99999] bg-bg-base flex items-center justify-center"
          aria-hidden
        >
          {/* Subtle ambient orbs (no aggressive animation) */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 50%, rgba(0,194,255,0.08), transparent 60%)",
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-5 px-6">
            <motion.h1
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              className="font-display text-5xl md:text-6xl font-black tracking-tight"
            >
              <span className="gradient-text-dual">OWLIGHTING</span>
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1], delay: 0.1 }}
              style={{ transformOrigin: "left" }}
              className="h-[2px] w-32 bg-gradient-to-r from-halo-500 via-halo-300 to-beam-400"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-[10px] uppercase tracking-[0.4em] text-text-tertiary"
            >
              #MENOLAKGELAP
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
