"use client";

import { motion, useScroll, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

/**
 * "Back to top" pill that appears once the user has scrolled past the Hero.
 *
 * Sits on the *left* side so it doesn't collide with the WhatsApp widget
 * pinned bottom-right. Different intent (jump-to-top vs start-conversation)
 * means we don't want them sharing the same corner.
 */
export default function FloatingCTA() {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsVisible(latest > 800);
    });
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.6, opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full glass-strong border border-beam-400/30 hover:border-beam-400/60 hover:bg-beam-400/10 flex items-center justify-center transition-colors"
          aria-label="Kembali ke atas"
        >
          <FaArrowUp size={14} className="text-beam-400" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
