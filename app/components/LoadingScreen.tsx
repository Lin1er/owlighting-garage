"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const loadingTips = [
  "💡 BILED lebih terang 3x dari halogen standar",
  "🔌 Instalasi proper relay mencegah kabel terbakar",
  "⚡ Cut-off yang sempurna tidak menyilaukan pengendara lain",
  "🛡️ Sistem kelistrikan aman melindungi aki dari konslet",
  "🎯 Retrofit profesional = garansi keamanan",
  "🔬 CNC Laser presisi hingga 0.01mm",
  "🚀 Custom DRL bikin tampilan lebih agresif",
  "💎 D2 Laser = cahaya putih tajam seperti kristal",
  "🏆 5+ tahun tanpa kasus terbakar atau aki soak",
  "⚙️ 3D Printing untuk shroud yang tidak ada di pasaran",
];

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Rotate tips
    const tipInterval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % loadingTips.length);
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(tipInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-9999 bg-black flex items-center justify-center"
        >
          {/* Animated background grid */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-px bg-primary/30"
                style={{
                  top: `${(i + 1) * 5}%`,
                  left: 0,
                  right: 0,
                }}
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 flex flex-col items-center gap-8 px-6">
            {/* Logo/Brand with pulsing light effect */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <motion.div>
                <h1 className="text-6xl md:text-8xl font-black text-glow animate-pulse">
                  OWLIGHTING
                </h1>
                <motion.div
                  className="absolute -top-4 -right-4 w-3 h-3 bg-accent rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>
              <p className="text-center text-muted mt-2 tracking-widest text-sm">
                #MENOLAKGELAP
              </p>
            </motion.div>

            {/* Headlight beam animation */}
            <div className="relative w-80 h-2 bg-surface/50 rounded-full overflow-hidden">
              {/* Background track */}
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary/20 to-transparent" />

              {/* Progress fill */}
              <motion.div
                className="absolute left-0 top-0 h-full bg-linear-to-r from-primary via-accent to-primary rounded-full"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.3 }}
              >
                {/* Glow effect */}
                <motion.div
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-20 h-20 bg-primary/50 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </motion.div>

              {/* Scanning beam effect */}
              <motion.div
                className="absolute top-0 w-1 h-full bg-white/80 shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                animate={{
                  left: ["0%", "100%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>

            {/* Progress percentage */}
            <motion.div
              key={Math.floor(progress)}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-4xl font-black text-primary"
            >
              {Math.floor(progress)}%
            </motion.div>

            {/* Loading tips with game-style presentation */}
            <motion.div
              className="relative h-20 flex items-center justify-center"
              key={currentTip}
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="glass px-8 py-4 rounded-lg border border-primary/20"
              >
                <p className="text-sm md:text-base text-center text-muted max-w-md">
                  <span className="text-accent font-bold">TIP: </span>
                  {loadingTips[currentTip]}
                </p>
              </motion.div>
            </motion.div>

            {/* Animated dots */}
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-primary rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>

            {/* Fun loading text */}
            <motion.p
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-xs text-muted tracking-wider"
            >
              MENYALAKAN LAMPU PRESISI...
            </motion.p>
          </div>

          {/* Corner decorations */}
          <motion.div
            className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-primary/50"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-accent/50"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
          <motion.div
            className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-accent/50"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
          <motion.div
            className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-primary/50"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
