"use client";

import { motion } from "framer-motion";
import { DynamicIcon } from "./DynamicIcon";
import { FaCheck, FaArrowRight, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { PriceTag } from "./ui/PriceTag";
import { buildWhatsAppLink, buildServiceInquiry } from "@/lib/whatsapp";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  features?: string[];
  id?: string;
  delay?: number;
  priceFrom?: string;
  category?: string;
  duration?: string;
}

/**
 * ServiceCard — restrained.
 *
 * The previous version: tilt parallax, gradient cyan glare, gradient title
 * border, gradient hover state, cyan icon glow, halo chip top-right. That's
 * five separate "look at me" effects competing on a single card. The new
 * card behaves like a print catalogue entry — solid surface, hairline rules,
 * mono category label, and one accent only when hovered.
 */
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
  const inquiryHref = buildWhatsAppLink({ message: buildServiceInquiry(title) });

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay, ease: [0.32, 0.72, 0, 1] }}
      className="group solid-card rounded-md p-6 md:p-7 h-full flex flex-col hover:border-beam-400/30 transition-colors"
    >
      {/* Header — eyebrow category + icon, hairline rule below */}
      <div className="flex items-start justify-between gap-3 mb-5 pb-5 border-b border-white/5">
        <div className="flex-1 min-w-0">
          {category && <span className="eyebrow block mb-2">{category}</span>}
          <h3 className="text-xl md:text-2xl font-semibold text-white leading-tight tracking-tight">
            {title}
          </h3>
        </div>
        <div className="shrink-0 w-10 h-10 flex items-center justify-center text-text-secondary group-hover:text-beam-400 transition-colors">
          <DynamicIcon name={icon} size={22} />
        </div>
      </div>

      {/* Description */}
      <p className="text-text-secondary text-sm leading-relaxed mb-5 flex-grow">
        {description}
      </p>

      {/* Price + duration — mono technical row */}
      {(priceFrom !== undefined || duration) && (
        <div className="flex items-end justify-between gap-3 mb-5 pb-5 border-b border-white/5">
          <PriceTag from={priceFrom ?? null} note={duration} size="sm" />
        </div>
      )}

      {/* Features — clean checkmark list, no decoration */}
      {features.length > 0 && (
        <ul className="space-y-2 mb-6">
          {features.slice(0, 4).map((feature, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-sm text-text-secondary"
            >
              <FaCheck size={10} className="text-beam-400 mt-1 shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
          {features.length > 4 && (
            <li className="font-mono-tech text-[11px] text-text-tertiary tabular pl-5">
              +{features.length - 4} fitur lainnya
            </li>
          )}
        </ul>
      )}

      {/* Footer — links, no buttons (print-feel) */}
      <div className="flex items-center justify-between gap-3 mt-auto pt-5 border-t border-white/5">
        {id ? (
          <Link
            href={`/services#${id}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-white transition-colors group/link"
          >
            Detail
            <FaArrowRight
              size={10}
              className="group-hover/link:translate-x-0.5 transition-transform"
            />
          </Link>
        ) : (
          <span />
        )}
        <a
          href={inquiryHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-success/90 hover:text-success transition-colors"
        >
          <FaWhatsapp size={13} />
          Konsultasi
        </a>
      </div>
    </motion.article>
  );
}
