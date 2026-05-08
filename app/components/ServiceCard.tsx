"use client";

import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { DynamicIcon } from "./DynamicIcon";
import { FaCheck, FaArrowRight, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { PriceTag } from "./ui/PriceTag";
import { Chip } from "./ui/Chip";
import { buildWhatsAppLink, buildServiceInquiry } from "@/lib/whatsapp";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  features?: string[];
  id?: string;
  delay?: number;
  /** Optional minimum price string ("2.5jt"). */
  priceFrom?: string;
  /** Optional secondary tag (Otomotif, Custom, Signage). */
  category?: string;
  /** Estimated work duration ("1 hari kerja"). */
  duration?: string;
}

export default function ServiceCard({
  title,
  description,
  icon,
  features = [],
  id,
  delay = 0,
  priceFrom,
  category,
  duration,
}: ServiceCardProps) {
  const reduced = useReducedMotion();

  const inquiryHref = buildWhatsAppLink({
    message: buildServiceInquiry(title),
  });

  const cardInner = (
    <div className="gradient-border-card bg-bg-card border border-white/5 rounded-2xl p-6 h-full max-w-[calc(100vw-2rem)] hover:border-beam-400/30 transition-colors group flex flex-col">
      {/* Header: icon + category chip */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="w-14 h-14 rounded-xl bg-beam-400/10 flex items-center justify-center group-hover:bg-beam-400/15 group-hover:scale-110 transition-all">
          <DynamicIcon name={icon} size={28} className="text-beam-400" />
        </div>
        {category && (
          <Chip tone="halo" size="xs">
            {category}
          </Chip>
        )}
      </div>

      {/* Title */}
      <h3 className="font-display text-xl md:text-2xl font-bold mb-3 text-white group-hover:text-beam-400 transition-colors leading-tight">
        {title}
      </h3>

      {/* Description */}
      <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-grow">
        {description}
      </p>

      {/* Price + duration row */}
      {(priceFrom || duration) && (
        <div className="flex items-end justify-between mb-4 pb-4 border-b border-white/5">
          {priceFrom !== undefined ? (
            <PriceTag from={priceFrom} note={duration} size="sm" />
          ) : (
            <span />
          )}
          {!priceFrom && duration && (
            <span className="text-xs text-text-tertiary tabular">{duration}</span>
          )}
        </div>
      )}

      {/* Features list */}
      {features.length > 0 && (
        <ul className="space-y-2 mb-5">
          {features.slice(0, 4).map((feature, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-text-secondary"
            >
              <FaCheck size={10} className="text-beam-400 mt-1 shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
          {features.length > 4 && (
            <li className="text-xs text-beam-400/70">
              +{features.length - 4} fitur lainnya
            </li>
          )}
        </ul>
      )}

      {/* Footer links: detail + WA inquiry */}
      <div className="flex items-center justify-between gap-3 mt-auto pt-4 border-t border-white/5">
        {id ? (
          <Link
            href={`/services#${id}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-beam-400 hover:text-beam-200 transition-colors group/link"
          >
            Detail
            <FaArrowRight
              size={11}
              className="group-hover/link:translate-x-1 transition-transform"
            />
          </Link>
        ) : (
          <span />
        )}
        <a
          href={inquiryHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-success/10 text-success hover:bg-success/20 transition-colors"
        >
          <FaWhatsapp size={12} />
          Konsultasi WA
        </a>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.32, 0.72, 0, 1] }}
      viewport={{ once: true, margin: "-60px" }}
    >
      {reduced ? (
        cardInner
      ) : (
        <Tilt
          tiltMaxAngleX={6}
          tiltMaxAngleY={6}
          glareEnable
          glareMaxOpacity={0.12}
          glareColor="#00C2FF"
          glarePosition="all"
          scale={1.01}
          transitionSpeed={2000}
        >
          {cardInner}
        </Tilt>
      )}
    </motion.div>
  );
}
