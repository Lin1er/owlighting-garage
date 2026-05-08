"use client";

import AnimatedSection from "../components/AnimatedSection";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import type { HomepageStat } from "@/lib/supabase";

function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const reduced = useReducedMotion();

  const numericValue = parseInt(value.replace(/[^\d]/g, "")) || 0;
  const hasPlus = value.includes("+");
  const hasPercent = value.includes("%");

  useEffect(() => {
    if (!isInView || reduced) return;
    let start = 0;
    const end = numericValue;
    const duration = 1600;
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
    <div ref={ref} className="font-editorial-roman tabular text-[clamp(3rem,8vw,6rem)] font-normal leading-[0.9] text-white">
      {displayValue}
      {hasPercent && "%"}
      {hasPlus && "+"}
    </div>
  );
}

type Props = {
  stats: HomepageStat[];
};

/**
 * Stats — track-record band.
 *
 * Was 4 glass cards with gradient-text counters and pulsing icon boxes.
 * Now: 4 typographic counters (Instrument Serif roman) under mono labels,
 * separated by hairline rules. Reads like a publication's by-the-numbers
 * sidebar instead of a cookie-cutter "trust strip."
 */
export default function StatsSection({ stats }: Props) {
  return (
    <section className="section-y relative">
      <div className="container-x">
        <div className="chapter-rule mb-10 md:mb-14">
          <span className="font-mono-tech text-[11px] tabular text-beam-400">02</span>
          <span className="chapter-rule__label">Track Record</span>
        </div>

        <AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-white/8">
            {stats.map((stat, index) => (
              <div
                key={stat.id}
                className={`py-6 md:py-0 md:px-8 first:md:pl-0 last:md:pr-0 ${
                  index % 2 === 0 ? "border-r border-white/8 pr-4 md:border-r-0 md:pr-0" : "pl-4 md:pl-0"
                } ${index < 2 ? "border-b md:border-b-0 border-white/8 pb-6 md:pb-0" : "pt-6 md:pt-0"}`}
              >
                <span className="eyebrow block mb-3">{stat.label}</span>
                <AnimatedCounter value={stat.value} />
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
