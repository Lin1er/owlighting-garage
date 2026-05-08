"use client";

import { stats } from "@/data/portfolio";
import AnimatedSection from "../components/AnimatedSection";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FaCar, FaStar, FaClock, FaBullseye } from "react-icons/fa";
import { useReducedMotion } from "../hooks/useReducedMotion";

const statIcons = [FaCar, FaStar, FaClock, FaBullseye];

function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const reduced = useReducedMotion();

  const numericValue = parseInt(value.replace(/[^\d]/g, "")) || 0;
  const hasPlus = value.includes("+");
  const hasPercent = value.includes("%");

  useEffect(() => {
    // When the user prefers reduced motion we skip the count-up entirely and
    // render the final value directly (see displayValue below). The effect
    // only runs the animation in the normal case.
    if (!isInView || reduced) return;

    let start = 0;
    const end = numericValue;
    const duration = 1800;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, numericValue, reduced]);

  const displayValue = reduced ? numericValue : count;

  return (
    <div ref={ref} className="font-display tabular text-4xl md:text-6xl lg:text-7xl font-black leading-none">
      {displayValue}
      {hasPercent && "%"}
      {hasPlus && "+"}
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="section-y relative">
      <div className="container-x">
        <AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
            {stats.map((stat, index) => {
              const Icon = statIcons[index % statIcons.length];
              return (
                <motion.div
                  key={stat.id}
                  whileHover={{ scale: 1.03, y: -4 }}
                  transition={{ duration: 0.24, ease: [0.32, 0.72, 0, 1] }}
                  className="glass-strong gradient-border-card rounded-2xl p-5 md:p-8 group"
                >
                  <div className="mb-3 flex justify-center">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-beam-400/10 text-beam-400 group-hover:scale-110 transition-transform">
                      <Icon size={22} />
                    </div>
                  </div>
                  <div className="gradient-text mb-2">
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <div className="text-sm md:text-base text-text-secondary font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
