"use client";

import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { DynamicIcon } from "./DynamicIcon";
import { FaCheck, FaArrowRight } from "react-icons/fa";
import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  features?: string[];
  id?: string;
  delay?: number;
}

export default function ServiceCard({
  title,
  description,
  icon,
  features = [],
  id,
  delay = 0,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <Tilt
        tiltMaxAngleX={8}
        tiltMaxAngleY={8}
        glareEnable={true}
        glareMaxOpacity={0.15}
        glareColor="#00C2FF"
        glarePosition="all"
        scale={1.02}
        transitionSpeed={2000}
      >
        <div className="gradient-border-card bg-surface border border-primary/10 rounded-2xl p-6 h-full max-w-[calc(100vw-2rem)] hover:border-primary/30 transition-all group flex flex-col">
          {/* Icon */}
          <div className="mb-4 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all">
            <DynamicIcon name={icon} size={28} className="text-primary" />
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold mb-3 text-white group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Description */}
          <p className="text-muted text-sm leading-relaxed mb-4 flex-grow">
            {description}
          </p>

          {/* Features list */}
          {features.length > 0 && (
            <ul className="space-y-2 mb-5 border-t border-white/5 pt-4">
              {features.slice(0, 4).map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted/80">
                  <FaCheck size={10} className="text-primary mt-1 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
              {features.length > 4 && (
                <li className="text-xs text-primary/60">
                  +{features.length - 4} fitur lainnya
                </li>
              )}
            </ul>
          )}

          {/* Link to detail */}
          {id && (
            <Link
              href={`/services#${id}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-cyan-300 transition-colors group/link mt-auto"
            >
              Selengkapnya
              <FaArrowRight
                size={11}
                className="group-hover/link:translate-x-1 transition-transform"
              />
            </Link>
          )}
        </div>
      </Tilt>
    </motion.div>
  );
}
