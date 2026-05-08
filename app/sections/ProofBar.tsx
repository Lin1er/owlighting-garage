"use client";

import { motion } from "framer-motion";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { contactInfo } from "@/data";
import { useReducedMotion } from "../hooks/useReducedMotion";

const PROOFS = [
  { value: "500+", label: "Kendaraan" },
  { value: "5+ THN", label: "Pengalaman" },
  { value: "0", label: "Insiden" },
  { value: "1 THN", label: "Garansi" },
];

/**
 * ProofBar — editorial ticker.
 *
 * Was a 4-card grid with tinted icon boxes (very generic "trust strip").
 * Now reads as a typographic line: small mono labels with tabular figures
 * separated by hairline rules. Closer to the dateline of a magazine cover.
 */
export default function ProofBar() {
  const reduced = useReducedMotion();

  return (
    <section
      aria-label="Bukti & lokasi"
      className="relative bg-bg-raised border-y border-white/5"
    >
      <div className="container-x py-5 md:py-6">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-5 md:gap-8">
          {/* Proof items — typographic, with mono labels above tabular values */}
          <ul className="flex-1 grid grid-cols-2 md:flex md:items-center md:divide-x md:divide-white/8 gap-y-4 md:gap-0">
            {PROOFS.map((p, i) => (
              <motion.li
                key={p.label}
                initial={reduced ? false : { opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="md:px-6 first:md:pl-0 last:md:pr-0 flex flex-col gap-0.5"
              >
                <span className="eyebrow">{p.label}</span>
                <span className="font-mono-tech tabular text-base md:text-lg text-white font-medium leading-none">
                  {p.value}
                </span>
              </motion.li>
            ))}
          </ul>

          {/* Right rail */}
          <div className="hidden md:flex items-center gap-3 pl-6 border-l border-white/8">
            <span className="eyebrow">Follow</span>
            <a
              href={contactInfo.socialMedia.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-text-secondary hover:text-white transition-colors"
            >
              <FaInstagram size={14} />
            </a>
            <a
              href={contactInfo.socialMedia.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="text-text-secondary hover:text-white transition-colors"
            >
              <FaTiktok size={14} />
            </a>
            <span aria-hidden className="h-3 w-px bg-text-tertiary/30 mx-1" />
            <span className="font-mono-tech text-[10px] text-text-tertiary tabular">
              #MENOLAKGELAP
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
