"use client";

import { motion, AnimatePresence, PanInfo } from "framer-motion";
import AnimatedSection from "../components/AnimatedSection";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { SectionHeader } from "../components/ui/SectionHeader";
import { useReducedMotion } from "../hooks/useReducedMotion";
import type { Testimonial } from "@/lib/supabase";

const ROTATION_MS = 6000;

type Props = {
  testimonials: Testimonial[];
};

export default function TestimonialsSection({ testimonials }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (paused || reduced || testimonials.length <= 1) return;
    timerRef.current = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, ROTATION_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeIndex, paused, reduced, testimonials.length]);

  const progressKey = activeIndex;

  if (testimonials.length === 0) return null;

  const safeIndex = Math.min(activeIndex, testimonials.length - 1);
  const active = testimonials[safeIndex];

  const goTo = (i: number) =>
    setActiveIndex(((i % testimonials.length) + testimonials.length) % testimonials.length);

  const handleDragEnd = (_e: unknown, info: PanInfo) => {
    const threshold = 60;
    if (info.offset.x < -threshold) goTo(activeIndex + 1);
    else if (info.offset.x > threshold) goTo(activeIndex - 1);
  };

  return (
    <section
      className="section-y relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-beam-400/[0.04] rounded-full blur-3xl" />
      </div>

      <div className="container-x max-w-5xl relative z-10">
        <SectionHeader
          badge="Testimoni Pelanggan"
          title="Apa Kata"
          accent="Mereka?"
          description="Kepuasan pelanggan adalah bukti nyata kualitas kerja kami."
        />

        <AnimatedSection delay={0.15}>
          <div className="relative">
            <div className="overflow-hidden touch-pan-y">
              <AnimatePresence mode="wait">
                <motion.div
                  key={safeIndex}
                  drag={reduced ? false : "x"}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.18}
                  onDragEnd={handleDragEnd}
                  initial={reduced ? false : { opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduced ? undefined : { opacity: 0, x: -40 }}
                  transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                  className="glass-strong rounded-2xl p-8 md:p-12 text-center border border-white/5 cursor-grab active:cursor-grabbing"
                >
                  <div className="flex justify-center mb-6">
                    <div className="w-14 h-14 rounded-full bg-beam-400/10 flex items-center justify-center">
                      <FaQuoteLeft size={22} className="text-beam-400" />
                    </div>
                  </div>

                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(active.rating)].map((_, i) => (
                      <FaStar key={i} size={20} className="text-beam-400" />
                    ))}
                  </div>

                  <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-2xl mx-auto italic font-display">
                    &ldquo;{active.comment}&rdquo;
                  </p>

                  <div>
                    <p className="font-bold text-white text-lg">{active.name}</p>
                    {active.vehicle && (
                      <p className="text-beam-400 text-sm font-medium">{active.vehicle}</p>
                    )}
                    {active.instagram_handle && (
                      <a
                        href={`https://instagram.com/${active.instagram_handle.replace(/^@/, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-tertiary text-xs hover:text-beam-400 transition-colors mt-1 inline-block"
                      >
                        @{active.instagram_handle.replace(/^@/, "")}
                      </a>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {testimonials.length > 1 && (
              <>
                <div className="mt-6 flex items-center gap-3 justify-center">
                  <div className="relative h-[2px] w-32 bg-white/10 overflow-hidden rounded-full">
                    {!reduced && (
                      <motion.div
                        key={progressKey}
                        initial={{ scaleX: 0 }}
                        animate={paused ? { scaleX: 0 } : { scaleX: 1 }}
                        transition={{ duration: ROTATION_MS / 1000, ease: "linear" }}
                        style={{ transformOrigin: "left" }}
                        className="absolute inset-0 bg-gradient-to-r from-halo-300 to-beam-400"
                      />
                    )}
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-text-tertiary tabular">
                    {safeIndex + 1} / {testimonials.length}
                  </span>
                </div>

                <div className="flex justify-center gap-2 mt-4">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      aria-label={`Lihat testimoni ${i + 1}`}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        i === safeIndex
                          ? "bg-beam-400 w-8 glow-primary"
                          : "bg-white/20 w-2.5 hover:bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </AnimatedSection>

        {testimonials.length > 1 && (
          <div className="grid md:grid-cols-3 gap-4 mt-12">
            {testimonials.slice(0, 3).map((testi, i) => (
              <AnimatedSection key={testi.id} delay={0.2 + i * 0.08}>
                <motion.button
                  type="button"
                  whileHover={{ y: -4 }}
                  onClick={() => goTo(i)}
                  className={`w-full text-left glass rounded-xl p-5 cursor-pointer transition-all border ${
                    i === safeIndex
                      ? "border-beam-400/30 bg-beam-400/5"
                      : "border-white/5 hover:border-beam-400/15"
                  }`}
                >
                  <div className="flex gap-1 mb-3">
                    {[...Array(testi.rating)].map((_, j) => (
                      <FaStar key={j} size={12} className="text-beam-400" />
                    ))}
                  </div>
                  <p className="text-sm text-text-secondary line-clamp-2 mb-3 italic">
                    &ldquo;{testi.comment}&rdquo;
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">{testi.name}</span>
                    {testi.vehicle && (
                      <span className="text-xs text-beam-400">{testi.vehicle}</span>
                    )}
                  </div>
                </motion.button>
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
