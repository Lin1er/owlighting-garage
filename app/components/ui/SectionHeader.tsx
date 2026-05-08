"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export type SectionHeaderProps = {
  /** Small uppercase pill above the title. */
  badge?: string;
  /** Plain prefix text in the title. */
  title: string;
  /** Highlighted segment (rendered with gradient). */
  accent?: string;
  /** Plain suffix text after the accent. */
  titleSuffix?: string;
  /** Long-form description below the title. */
  description?: ReactNode;
  /** Style of accent gradient. */
  accentTone?: "beam" | "halo" | "dual";
  /** Alignment. */
  align?: "center" | "left";
  /** Optional max-width override for the description. */
  maxWidth?: string;
};

const accentClass: Record<NonNullable<SectionHeaderProps["accentTone"]>, string> = {
  beam: "gradient-text",
  halo: "gradient-text-halo",
  dual: "gradient-text-dual",
};

/**
 * Standard section title block: badge + headline (with accent) + description.
 *
 * Eight sections currently re-implement this pattern inline; this consolidates
 * it so spacing, badge styling and gradient treatment stay consistent.
 */
export function SectionHeader({
  badge,
  title,
  accent,
  titleSuffix,
  description,
  accentTone = "beam",
  align = "center",
  maxWidth = "max-w-2xl",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <div className={`flex flex-col mb-10 md:mb-14 ${alignClass}`}>
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-beam-400/30 bg-beam-400/10 text-beam-400 text-[11px] tracking-widest uppercase font-semibold mb-4 backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-beam-400 animate-pulse" />
          {badge}
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] mb-4"
      >
        {title}
        {accent && (
          <>
            {title && " "}
            <span className={accentClass[accentTone]}>{accent}</span>
          </>
        )}
        {titleSuffix && (
          <>
            {" "}
            {titleSuffix}
          </>
        )}
      </motion.h2>
      {description && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`text-text-secondary text-base sm:text-lg leading-relaxed ${maxWidth} ${align === "center" ? "mx-auto" : ""}`}
        >
          {description}
        </motion.div>
      )}
    </div>
  );
}
