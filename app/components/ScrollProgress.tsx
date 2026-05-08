"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-halo-500 via-halo-300 to-beam-400 origin-left z-50 shadow-[0_0_12px_rgba(0,194,255,0.4)]"
      style={{ scaleX }}
      aria-hidden
    />
  );
}
