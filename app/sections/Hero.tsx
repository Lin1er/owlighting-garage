"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FaArrowRight, FaImages, FaPhone } from "react-icons/fa";
import { contactInfo } from "@/data";
import { Button } from "../components/ui/Button";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.8, 0]);

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
          style={{ backgroundImage: "url(/background/desktop-hero.jpg)" }}
        />
        <div
          className="absolute md:hidden inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/background/mobile-hero.jpg)" }}
        />

        {/* Dual-tone overlay: warm amber on the left half (halogen),
            cool beam cyan on the right (BILED). Visualises the brand promise
            without needing a custom photo yet. */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a0c00]/70 via-black/75 to-[#001220]/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-bg-base" />
      </motion.div>

      {/* Animated split beams — halogen left, beam right */}
      {!reduced && (
        <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-0 left-1/4 w-[28rem] h-full bg-gradient-to-b from-halo-500/20 via-halo-300/8 to-transparent blur-3xl"
            animate={{ x: [0, 60, 0], opacity: [0.18, 0.32, 0.18] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-0 right-1/4 w-[28rem] h-full bg-gradient-to-b from-beam-400/25 via-beam-400/8 to-transparent blur-3xl"
            animate={{ x: [0, -60, 0], opacity: [0.22, 0.42, 0.22] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          {/* Centre spotlight — feels like a focused beam */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-[24rem]"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(0,194,255,0.12), transparent 60%)",
            }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      )}

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-6 max-w-5xl mt-16 md:mt-0"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-beam-400/30 bg-beam-400/10 text-beam-400 text-[11px] md:text-xs font-semibold tracking-widest uppercase mb-6 backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-beam-400 animate-pulse" />
          Spesialis Custom BILED · Lampung Timur
        </motion.div>

        {/* Dual-tone H1 — halogen → BILED narrative */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
          className="font-display text-[clamp(2.5rem,7vw,5rem)] font-black leading-[1.02] tracking-tight mb-5 select-none"
        >
          <span className="block text-white/90">Mengubah</span>
          <span className="gradient-text-halo">Halogen Kusam</span>
          <span className="block text-white/90 mt-1">jadi</span>
          <span className="gradient-text">BILED Presisi</span>
        </motion.h1>

        {/* Sub-tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base md:text-lg text-text-secondary mb-3 max-w-2xl mx-auto leading-relaxed"
        >
          Bengkel spesialis <strong className="text-white">Custom BILED</strong> mobil dan motor.
          Retrofit projector, D2 Laser, DRL Matrix — presisi & aman, dengan garansi resmi
          di Lampung Timur.
        </motion.p>

        {/* Hashtag tail */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-[11px] tracking-[0.3em] uppercase text-beam-400/80 mb-8"
        >
          #MENOLAKGELAP
        </motion.div>

        {/* CTAs — two button + a tertiary tel link */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center w-full mb-4"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() => scrollToSection("reservation")}
            rightIcon={<FaArrowRight size={14} />}
            fullWidth
            className="sm:w-auto"
          >
            Konsultasi Custom BILED — GRATIS
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => scrollToSection("gallery")}
            leftIcon={<FaImages size={14} className="text-beam-400" />}
            fullWidth
            className="sm:w-auto"
          >
            Lihat Hasil Custom BILED
          </Button>
        </motion.div>

        {/* Tertiary phone link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-sm text-text-tertiary"
        >
          atau telpon langsung{" "}
          <a
            href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-1.5 text-text-secondary hover:text-beam-400 underline-offset-4 hover:underline transition-colors"
          >
            <FaPhone size={11} />
            {contactInfo.phone}
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator — bottom-right corner, less intrusive */}
      {!reduced && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="absolute bottom-8 right-6 md:right-12 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest text-text-tertiary writing-vertical">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="w-5 h-9 border-2 border-beam-400/50 rounded-full flex items-start justify-center p-1.5"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="w-0.5 h-2.5 bg-beam-400 rounded-full"
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
