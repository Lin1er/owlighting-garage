"use client";

import { motion } from "framer-motion";
import AnimatedSection from "../components/AnimatedSection";
import { testimonials } from "@/data";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-20 md:py-24 px-6 lg:px-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <AnimatedSection>
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold mb-4 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              TESTIMONI PELANGGAN
            </div>
            <h2 className="text-4xl lg:text-5xl font-black mb-4">
              Apa Kata <span className="gradient-text">Mereka</span>?
            </h2>
            <p className="text-muted max-w-xl mx-auto">
              Kepuasan pelanggan adalah bukti nyata kualitas kerja kami.
            </p>
          </div>
        </AnimatedSection>

        {/* Testimonial Cards */}
        <AnimatedSection delay={0.2}>
          <div className="relative">
            <div className="overflow-hidden">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="glass-strong rounded-2xl p-8 md:p-12 text-center border border-white/5"
              >
                <div className="flex justify-center mb-6">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <FaQuoteLeft size={22} className="text-primary" />
                  </div>
                </div>

                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <FaStar key={i} size={20} className="text-primary" />
                  ))}
                </div>

                <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-2xl mx-auto italic">
                  &ldquo;{testimonials[activeIndex].text}&rdquo;
                </p>

                <div>
                  <p className="font-bold text-white text-lg">
                    {testimonials[activeIndex].name}
                  </p>
                  <p className="text-primary text-sm font-medium">
                    {testimonials[activeIndex].vehicle}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? "bg-primary w-8 glow-primary"
                      : "bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Small cards */}
        <div className="grid md:grid-cols-3 gap-4 mt-12">
          {testimonials.map((testi, i) => (
            <AnimatedSection key={testi.id} delay={0.3 + i * 0.1}>
              <motion.div
                whileHover={{ y: -5 }}
                onClick={() => setActiveIndex(i)}
                className={`glass rounded-xl p-5 cursor-pointer transition-all border ${
                  i === activeIndex
                    ? "border-primary/30 bg-primary/5"
                    : "border-white/5 hover:border-primary/15"
                }`}
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(testi.rating)].map((_, j) => (
                    <FaStar key={j} size={12} className="text-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted line-clamp-2 mb-3 italic">
                  &ldquo;{testi.text}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">{testi.name}</span>
                  <span className="text-xs text-primary">{testi.vehicle}</span>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
