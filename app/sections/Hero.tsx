"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { contactInfo } from "@/data";
import { FaArrowRight, FaImages, FaShieldAlt, FaCar, FaTrophy } from "react-icons/fa";

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
            backgroundImage: "url(/background/desktop-hero.jpg)",
          }}
        />
        <div
          className="absolute md:hidden inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(/background/mobile-hero.jpg)",
          }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/60 to-background" />
      </motion.div>

      {/* Animated light beams */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-full bg-linear-to-b from-primary/20 via-primary/5 to-transparent blur-3xl"
          animate={{
            x: [0, 100, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-0 right-1/4 w-96 h-full bg-linear-to-b from-accent/15 via-accent/5 to-transparent blur-3xl"
          animate={{
            x: [0, -100, 0],
            opacity: [0.15, 0.35, 0.15],
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
        className="absolute top-0 left-1/2 -translate-x-1/2 w-300 h-200 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,194,255,0.1), transparent 60%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.25, 0.4, 0.25],
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
        className="relative z-10 text-center px-6 max-w-5xl mt-16 md:mt-0"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs md:text-sm font-semibold mb-6 backdrop-blur-sm"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          SPESIALIS CUSTOM BILED LAMPUNG TIMUR
        </motion.div>

        {/* Main Headline - H1 optimized for "custom biled" */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-black mb-4 leading-tight tracking-tight select-none"
        >
          <span className="gradient-text">CUSTOM BILED</span>
          <br className="hidden md:block" />
          {" "}MOBIL & MOTOR LAMPUNG TIMUR
        </motion.h1>

        {/* Hashtag */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-white/80 text-sm md:text-base font-bold mb-5 backdrop-blur-sm"
        >
          #MENOLAKGELAP
        </motion.div>

        {/* Description - SEO optimized */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-sm md:text-lg text-muted mb-6 max-w-2xl mx-auto leading-relaxed"
        >
          <strong>Owlighting</strong> - Bengkel spesialis{" "}
          <span className="text-primary font-semibold">Custom BILED</span> profesional.
          Pasang BILED Retrofit, D2 Laser, Custom DRL Matrix, poles kaca lampu nano burn.
          Garansi resmi & pengerjaan presisi di{" "}
          <span className="text-white font-semibold">Lampung Timur</span>.
        </motion.p>

        {/* Location & Phone */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45 }}
          className="text-sm text-muted/70 mb-6 flex flex-col md:flex-row items-center justify-center gap-2"
        >
          <span>📍 Way Jepara, Lampung Timur</span>
          <span className="hidden md:inline text-primary/30">|</span>
          <span>📱 {contactInfo.phone}</span>
        </motion.p>

        {/* CTA Buttons - optimized text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full mb-8"
        >
          <button
            onClick={() => scrollToSection("reservation")}
            className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-400 to-cyan-500 text-black font-bold rounded-xl glow-primary-strong hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Konsultasi Custom BILED GRATIS
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" size={14} />
          </button>
          <button
            onClick={() => scrollToSection("gallery")}
            className="group w-full sm:w-auto px-8 py-4 border-2 border-primary/30 text-white font-semibold rounded-xl hover:bg-primary/10 hover:border-primary transition-all hover:scale-105 flex items-center justify-center gap-2"
          >
            <FaImages size={14} className="text-primary" />
            Lihat Hasil Custom BILED
          </button>
        </motion.div>

        {/* Trust Badges - with keyword */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="flex flex-wrap justify-center gap-3 md:gap-6"
        >
          {[
            { icon: FaTrophy, text: "5+ Tahun Custom BILED" },
            { icon: FaCar, text: "500+ Kendaraan" },
            { icon: FaShieldAlt, text: "Garansi Resmi" },
          ].map((badge, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-xs md:text-sm text-muted"
            >
              <badge.icon size={14} className="text-primary" />
              <span>{badge.text}</span>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-12"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2 mx-auto"
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
