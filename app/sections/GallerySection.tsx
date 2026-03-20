"use client";

import AnimatedSection from "../components/AnimatedSection";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { portfolioProjects } from "@/data";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const categories = [
  { key: "all", label: "Semua Custom BILED" },
  { key: "mobil", label: "Custom BILED Mobil" },
  { key: "motor", label: "Custom BILED Motor" },
  { key: "custom", label: "Custom Project" },
];

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects =
    activeCategory === "all"
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="gallery"
      className="relative sm:py-24 py-15 px-6 lg:px-20 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pulse-glow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl pulse-glow" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatedSection>
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold mb-4 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              PORTFOLIO CUSTOM BILED
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              Hasil <span className="gradient-text">Custom BILED</span> Terbaik
            </h2>
            <p className="text-sm md:text-base text-muted mb-8 max-w-2xl mx-auto px-4">
              Berbagai karya custom BILED mobil dan motor, retrofit projector presisi,
              hingga kreasi DRL Matrix menggunakan CNC Laser & 3D Print di Lampung Timur.
            </p>
          </div>
        </AnimatedSection>

        {/* Category Filter Tabs */}
        <AnimatedSection delay={0.1}>
          <div className="flex justify-center gap-2 md:gap-3 mb-10 flex-wrap">
            {categories.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeCategory === key
                    ? "bg-primary text-black glow-primary"
                    : "bg-white/5 text-muted hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  className="relative rounded-2xl overflow-hidden shadow-xl h-[300px] sm:h-80 group glass mx-auto w-full"
                >
                  <Image
                    src={item.image}
                    alt={`Custom BILED ${item.title} - Hasil pengerjaan Owlighting Lampung Timur`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 p-5 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <span className="inline-block px-2 py-0.5 rounded-md bg-primary/20 text-primary text-[10px] font-bold mb-2 uppercase tracking-wider border border-primary/20">
                      {item.category}
                    </span>
                    <h3 className="text-base font-bold text-white mb-1 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-300 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatedSection delay={0.3}>
          <div className="text-center">
            <motion.a
              href="/portfolio"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-black font-bold rounded-xl glow-primary shadow-xl"
            >
              Lihat Galeri Custom BILED Lengkap
              <FaArrowRight size={14} />
            </motion.a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
