"use client";

import { motion, useScroll, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function FloatingCTA() {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsVisible(latest > 500);
    });
  }, [scrollY]);

  const scrollToReservation = () => {
    const element = document.getElementById("reservation");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToReservation}
          className="fixed bottom-8 right-8 z-40 px-6 py-4 bg-linear-to-r from-primary to-cyan-400 text-black font-bold rounded-full glow-primary shadow-2xl flex items-center gap-2"
        >
          <span className="text-2xl">💬</span>
          <span className="hidden sm:inline">Chat Sekarang</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
