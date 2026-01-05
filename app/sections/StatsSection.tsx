"use client";

import { stats } from "@/data/portfolio";
import AnimatedSection from "../components/AnimatedSection";
import { motion } from "framer-motion";

export default function StatsSection() {
  return (
    <AnimatedSection delay={0.6}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.id}
            whileHover={{ scale: 1.1 }}
            className="glass rounded-xl p-6"
          >
            <div
              className={`text-4xl font-black ${
                index % 2 === 0 ? "text-primary" : "text-accent"
              } mb-2`}
            >
              {stat.value}
            </div>
            <div className="text-sm text-muted">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}
