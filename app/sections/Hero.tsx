"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FaArrowRight, FaImages, FaPhone } from "react-icons/fa";
import { contactInfo } from "@/data";
import { Button } from "../components/ui/Button";
import { useReducedMotion } from "../hooks/useReducedMotion";

/**
 * Hero — editorial workshop direction.
 *
 * Asymmetric, left-aligned (desktop) instead of the previous centred / dual-
 * gradient / hashtag-chip / 3-trust-badge / scroll-indicator stack which read
 * as a generic "modern dark hero." The italic serif headline + tabular mono
 * caption now carry the brand's voice. Cyan is intentionally restricted to a
 * single accent moment ("BILED") plus the primary CTA; everything else is
 * warm-bone white on near-black.
 */
export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.85, 0]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-28"
    >
      {/* Background with parallax */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/background/desktop-hero.jpg)" }}
        />
        <div
          className="absolute md:hidden inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/background/mobile-hero.jpg)" }}
        />

        {/* Single dark overlay — restraint is the point. */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg-base/80 via-bg-base/85 to-bg-base" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-base/60 via-transparent to-transparent" />
      </motion.div>

      {/* One subtle ambient glow — far right, low opacity. */}
      {!reduced && (
        <div
          aria-hidden
          className="absolute top-1/4 -right-32 w-[36rem] h-[36rem] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(closest-side, rgba(0,194,255,0.10), transparent 70%)",
          }}
        />
      )}

      {/* Vertical wordmark — right rail, desktop only. Editorial tic. */}
      <div
        aria-hidden
        className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 z-10 flex-col items-center gap-3"
      >
        <span className="eyebrow rotate-180 [writing-mode:vertical-rl]">
          OWLIGHTING ATELIER
        </span>
        <span className="h-12 w-px bg-gradient-to-b from-transparent via-text-tertiary/40 to-transparent" />
        <span className="font-mono-tech text-[10px] text-text-tertiary tabular rotate-180 [writing-mode:vertical-rl]">
          5°11&prime;11&Prime;S · 105°41&prime;26&Prime;E
        </span>
      </div>

      {/* Content — asymmetric grid */}
      <motion.div style={{ opacity }} className="container-x relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-9 xl:col-span-8">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="font-mono-tech text-[11px] tabular text-beam-400">
                EST · 2019
              </span>
              <span aria-hidden className="h-px w-12 bg-text-tertiary/40" />
              <span className="eyebrow">Way Jepara · Lampung Timur</span>
            </motion.div>

            {/* Editorial H1 — italic serif, mixed scale */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
              className="text-[clamp(3rem,8vw,7rem)] font-bold tracking-tight leading-[0.95] mb-6 select-none"
            >
              <span className="block text-white">Studio rekayasa</span>
              <span className="block">
                <span className="font-editorial italic text-white/90">cahaya</span>{" "}
                <span className="text-white">untuk mobil</span>
              </span>
              <span className="block">
                <span className="text-white">&amp; motor.</span>
              </span>
            </motion.h1>

            {/* Sub-tagline */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base md:text-lg text-text-secondary mb-8 max-w-xl leading-relaxed"
            >
              Spesialis <span className="text-white font-semibold">Custom BILED</span>
              {" "}— retrofit projector, D2 Laser, DRL Matrix. Presisi milimeter, instalasi
              wiring yang berani kami garansikan.
            </motion.p>

            {/* CTA cluster */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center"
            >
              <Button
                variant="primary"
                size="lg"
                onClick={() => scrollToSection("reservation")}
                rightIcon={<FaArrowRight size={14} />}
              >
                Konsultasi GRATIS
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => scrollToSection("gallery")}
                leftIcon={<FaImages size={13} className="text-beam-400" />}
              >
                Lihat hasil pengerjaan
              </Button>

              <span aria-hidden className="hidden sm:inline-block w-px h-6 bg-text-tertiary/30" />

              <a
                href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-white transition-colors group"
              >
                <FaPhone size={11} className="text-text-tertiary group-hover:text-beam-400 transition-colors" />
                <span className="font-mono-tech tabular">{contactInfo.phone}</span>
              </a>
            </motion.div>
          </div>

          {/* Right rail — technical caption bottom-aligned */}
          <motion.aside
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="lg:col-span-3 xl:col-span-4 lg:pl-6 lg:border-l lg:border-white/5 hidden lg:block"
          >
            <p className="font-editorial italic text-xl text-white/85 leading-snug mb-4">
              &ldquo;Lampu yang baik bukan soal terang — soal cut-off yang rapi.&rdquo;
            </p>
            <dl className="space-y-3 font-mono-tech text-[11px]">
              <div className="flex justify-between gap-3">
                <dt className="text-text-tertiary uppercase tracking-wider">Kendaraan</dt>
                <dd className="text-white tabular">500+</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-text-tertiary uppercase tracking-wider">Pengalaman</dt>
                <dd className="text-white tabular">5+ thn</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-text-tertiary uppercase tracking-wider">Insiden</dt>
                <dd className="text-white tabular">0</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-text-tertiary uppercase tracking-wider">Garansi</dt>
                <dd className="text-white">1 thn</dd>
              </div>
            </dl>
          </motion.aside>
        </div>

        {/* Bottom rule + hashtag — chapter-marker feel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 lg:mt-20 flex items-center gap-4"
        >
          <span aria-hidden className="h-px flex-1 bg-text-tertiary/20" />
          <span className="font-mono-tech text-[10px] text-text-tertiary tracking-[0.3em] uppercase">
            #MENOLAKGELAP
          </span>
          <span aria-hidden className="h-px w-12 bg-text-tertiary/20" />
        </motion.div>
      </motion.div>
    </section>
  );
}
