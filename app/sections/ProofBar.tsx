"use client";

import { motion } from "framer-motion";
import { FaCar, FaShieldAlt, FaBolt, FaMapMarkerAlt, FaInstagram, FaTiktok } from "react-icons/fa";
import { contactInfo } from "@/data";
import { useReducedMotion } from "../hooks/useReducedMotion";

const PROOFS = [
  { icon: FaCar, label: "500+", caption: "Kendaraan dipercaya" },
  { icon: FaShieldAlt, label: "Garansi", caption: "Resmi 1 tahun" },
  { icon: FaBolt, label: "0", caption: "Insiden 5+ tahun" },
  { icon: FaMapMarkerAlt, label: "Way Jepara", caption: "Lampung Timur" },
];

/**
 * Compact proof strip below the Hero.
 *
 * Replaces the busy trust-badge cluster that used to live inside the Hero
 * itself. Pulling these chips into their own band cleans up the first fold
 * and gives the proof points more room to breathe — they're a frame around
 * the Hero, not noise inside it.
 */
export default function ProofBar() {
  const reduced = useReducedMotion();

  return (
    <section
      aria-label="Bukti & lokasi"
      className="relative bg-bg-raised border-y border-white/5 py-5"
    >
      <div className="container-x">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-6">
          {/* Proof items */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 flex-1">
            {PROOFS.map((p, i) => (
              <motion.div
                key={p.caption}
                initial={reduced ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-lg bg-beam-400/10 flex items-center justify-center shrink-0">
                  <p.icon size={14} className="text-beam-400" />
                </div>
                <div className="min-w-0">
                  <div className="font-display text-sm md:text-base font-bold text-white tabular truncate">
                    {p.label}
                  </div>
                  <div className="text-[11px] text-text-tertiary truncate">
                    {p.caption}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right rail: socials */}
          <div className="hidden md:flex items-center gap-2 pl-6 border-l border-white/5">
            <span className="text-[10px] uppercase tracking-widest text-text-tertiary mr-1">
              Follow
            </span>
            <a
              href={contactInfo.socialMedia.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-beam-400/15 hover:border-beam-400/30 border border-transparent transition-colors"
            >
              <FaInstagram size={14} className="text-text-secondary" />
            </a>
            <a
              href={contactInfo.socialMedia.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-beam-400/15 hover:border-beam-400/30 border border-transparent transition-colors"
            >
              <FaTiktok size={14} className="text-text-secondary" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
