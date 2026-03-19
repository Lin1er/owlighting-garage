"use client";

import { stats } from "@/data/portfolio";
import AnimatedSection from "../components/AnimatedSection";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FaCar, FaStar, FaClock, FaBullseye } from "react-icons/fa";

const statIcons = [FaCar, FaStar, FaClock, FaBullseye];

function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  const numericValue = parseInt(value.replace(/[^\d]/g, ""));
  const hasPlus = value.includes("+");
  const hasPercent = value.includes("%");

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = numericValue;
    const duration = 2000;
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
  }, [isInView, numericValue]);

  return (
    <div ref={ref} className="text-4xl md:text-6xl lg:text-7xl font-black">
      {count}
      {hasPercent && "%"}
      {hasPlus && "+"}
    </div>
  );
}

export default function StatsSection() {
  return (
    <AnimatedSection delay={0.3}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
        {stats.map((stat, index) => {
          const Icon = statIcons[index % statIcons.length];
          return (
            <motion.div
              key={stat.id}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-strong gradient-border-card rounded-2xl p-5 md:p-8 group"
            >
              <div className="mb-3 flex justify-center">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  <Icon size={22} />
                </div>
              </div>
              <div className="gradient-text mb-2">
                <AnimatedCounter value={stat.value} />
              </div>
              <div className="text-sm md:text-base text-muted font-medium">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>
    </AnimatedSection>
  );
}
