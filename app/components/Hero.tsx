"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { contactInfo } from "@/data";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image with parallax */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=1920&auto=format&fit=crop)",
          }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/60 to-background" />
      </motion.div>

      {/* Animated light beams */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-full bg-linear-to-b from-primary/30 via-primary/10 to-transparent blur-3xl"
          animate={{
            x: [0, 100, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-0 right-1/4 w-96 h-full bg-linear-to-b from-accent/20 via-accent/5 to-transparent blur-3xl"
          animate={{
            x: [0, -100, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Spotlight effect */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-300 h-200 bg-radial-gradient opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,194,255,0.15), transparent 60%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-6 max-w-5xl"
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-4xl md:text-7xl lg:text-8xl font-black mb-6 text-glow"
        >
          #MENOLAKGELAP
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-sm md:text-xl text-muted mb-4 max-w-3xl mx-auto leading-relaxed"
        >
          <span className="text-primary font-bold">
            BILED Retrofit Lampung Timur
          </span>{" "}
          - Custom pencahayaan presisi dengan teknologi CNC & 3D Printing.
          <br className="hidden lg:block" />
          Slimframe • Custom Akrilik • Neonbox Huruf Timbul
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-sm text-muted/70 mb-8"
        >
          📍 Way Jepara, Lampung Timur | 📱 {contactInfo.phone}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => scrollToSection("gallery")}
            className="px-8 py-4 border-2 border-primary/30 text-white font-semibold rounded-lg hover:bg-primary/10 hover:border-primary transition-all hover:scale-105"
          >
            Lihat Hasil Karya
          </button>
          <button
            onClick={() => scrollToSection("reservation")}
            className="px-8 py-4 bg-linear-to-r from-primary to-cyan-400 text-black font-bold rounded-lg glow-primary hover:scale-105 transition-transform"
          >
            Konsultasi Gratis
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute left-1/2 -translate-x-1/2 translate-y-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-primary rounded-full"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
