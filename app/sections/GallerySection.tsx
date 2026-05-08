"use client";

import AnimatedSection from "../components/AnimatedSection";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { portfolioProjects } from "@/data";
import { useMemo, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { SectionHeader } from "../components/ui/SectionHeader";
import { Button } from "../components/ui/Button";
import { Chip } from "../components/ui/Chip";

const categories = [
  { key: "all", label: "Semua" },
  { key: "mobil", label: "Mobil" },
  { key: "motor", label: "Motor" },
  { key: "custom", label: "Custom" },
];

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("all");

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: portfolioProjects.length };
    for (const p of portfolioProjects) {
      c[p.category] = (c[p.category] ?? 0) + 1;
    }
    return c;
  }, []);

  const filteredProjects =
    activeCategory === "all"
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.category === activeCategory);

  return (
    <section id="gallery" className="section-y relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-beam-400/[0.06] rounded-full blur-3xl pulse-glow" />
      </div>

      <div className="container-x relative z-10">
        <SectionHeader
          badge="Portfolio Custom BILED"
          title="Hasil"
          accent="Custom BILED"
          titleSuffix="Terbaik"
          description="Berbagai karya custom BILED mobil dan motor, retrofit projector presisi, hingga kreasi DRL Matrix menggunakan CNC Laser & 3D Print di Lampung Timur."
        />

        {/* Category Filter Tabs */}
        <AnimatedSection delay={0.05}>
          <div className="flex justify-center gap-2 md:gap-3 mb-10 flex-wrap">
            {categories.map(({ key, label }) => {
              const isActive = activeCategory === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`group px-5 py-2 rounded-full text-sm font-semibold transition-all duration-[var(--dur-default)] flex items-center gap-2 ${
                    isActive
                      ? "bg-beam-400 text-[color:var(--text-on-beam)] glow-primary"
                      : "bg-white/5 text-text-secondary hover:bg-white/10 hover:text-white border border-white/10"
                  }`}
                >
                  {label}
                  <span
                    className={`tabular text-[11px] px-1.5 py-0.5 rounded-full ${
                      isActive ? "bg-black/15 text-black/70" : "bg-white/5 text-text-tertiary"
                    }`}
                  >
                    {counts[key] ?? 0}
                  </span>
                </button>
              );
            })}
          </div>
        </AnimatedSection>

        {/* Projects Grid — sm:grid-cols-2 closes the 4→1 jump */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6 mb-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.32,
                  delay: index * 0.04,
                  ease: [0.32, 0.72, 0, 1],
                }}
              >
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.24, ease: [0.32, 0.72, 0, 1] }}
                  className="relative rounded-2xl overflow-hidden shadow-xl h-[300px] sm:h-72 lg:h-80 group glass mx-auto w-full"
                >
                  <Image
                    src={item.image}
                    alt={`Custom BILED ${item.title} - Hasil pengerjaan Owlighting Lampung Timur`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Category chip top-right — always visible */}
                  <div className="absolute top-3 right-3">
                    <Chip tone="beam" size="xs">
                      {item.category}
                    </Chip>
                  </div>

                  <div className="absolute bottom-0 left-0 p-5 w-full transform translate-y-1 group-hover:translate-y-0 transition-transform">
                    <h3 className="font-display text-base lg:text-lg font-bold text-white mb-1 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-300 line-clamp-2 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatedSection delay={0.2}>
          <div className="text-center">
            <Button
              href="/portfolio"
              variant="primary"
              size="lg"
              rightIcon={<FaArrowRight size={14} />}
            >
              Lihat Galeri Custom BILED Lengkap
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
