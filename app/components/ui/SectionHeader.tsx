"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export type SectionHeaderProps = {
  /** Small monospace label, replaces the old pill-badge pattern. */
  eyebrow?: string;
  /** Optional chapter index (e.g. "01") shown alongside the eyebrow. */
  index?: string;
  /** Plain prefix text in the title. */
  title: string;
  /** Highlighted segment — rendered in italic editorial serif by default,
   *  or with the gradient if `accentTone` is set explicitly. */
  accent?: string;
  /** Plain suffix text after the accent. */
  titleSuffix?: string;
  /** Long-form description below the title. */
  description?: ReactNode;
  /** Visual treatment for the accent text. "italic" is the default and
   *  intentional — gradient is reserved for one-off "hero moment" headers. */
  accentTone?: "italic" | "beam" | "halo" | "dual" | "plain";
  /** Alignment. */
  align?: "center" | "left";
  /** Optional max-width override for the description. */
  maxWidth?: string;
};

const accentClass: Record<NonNullable<SectionHeaderProps["accentTone"]>, string> = {
  italic: "font-editorial italic text-white",
  beam: "gradient-text",
  halo: "gradient-text-halo",
  dual: "gradient-text-dual",
  plain: "text-white",
};

/**
 * Editorial section opener.
 *
 * The eyebrow + chapter-rule pattern replaces the old "pill badge floating
 * above a centered gradient title" — a layout that, repeated 8 times down a
 * page, was the single biggest tell that the site was built from a template.
 * Italic-serif accent text now does the visual lifting that gradients used
 * to do, with much less colour pollution.
 */
export function SectionHeader({
  eyebrow,
  index,
  title,
  accent,
  titleSuffix,
  description,
  accentTone = "italic",
  align = "left",
  maxWidth = "max-w-2xl",
}: SectionHeaderProps) {
  const alignClass =
    align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <header className={`flex flex-col mb-10 md:mb-14 ${alignClass}`}>
      {(eyebrow || index) && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className={`flex items-center gap-3 mb-5 ${align === "center" ? "justify-center" : ""}`}
        >
          {index && (
            <span className="font-mono-tech text-[11px] tabular text-beam-400">
              {index}
            </span>
          )}
          {eyebrow && (
            <>
              <span
                aria-hidden
                className="h-px w-8 bg-gradient-to-r from-beam-400/40 to-transparent"
              />
              <span className="eyebrow">{eyebrow}</span>
            </>
          )}
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        className="text-[clamp(2rem,4.5vw,3.75rem)] font-bold tracking-tight leading-[1.05] mb-5 max-w-3xl"
      >
        <span className="text-white">{title}</span>
        {accent && (
          <>
            {title && " "}
            <span className={accentClass[accentTone]}>{accent}</span>
          </>
        )}
        {titleSuffix && <> {titleSuffix}</>}
      </motion.h2>

      {description && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className={`text-text-secondary text-base sm:text-lg leading-relaxed ${maxWidth} ${align === "center" ? "mx-auto" : ""}`}
        >
          {description}
        </motion.div>
      )}
    </header>
  );
}
