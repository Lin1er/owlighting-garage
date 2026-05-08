"use client";

import { motion } from "framer-motion";
import AnimatedSection from "../components/AnimatedSection";
import {
  FaFire,
  FaBatteryFull,
  FaBolt,
  FaPlug,
  FaShieldAlt,
  FaTint,
  FaRuler,
  FaCar,
  FaCalendarCheck,
} from "react-icons/fa";
import { SectionHeader } from "../components/ui/SectionHeader";
import { useReducedMotion } from "../hooks/useReducedMotion";

const headlineStats = [
  { icon: FaFire, value: "0", label: "Kasus Terbakar", tone: "halo" as const },
  { icon: FaCalendarCheck, value: "5+", label: "Tahun Pengalaman", tone: "beam" as const },
  { icon: FaCar, value: "500+", label: "Kendaraan Dikerjakan", tone: "beam" as const },
];

const safetyPoints = [
  {
    icon: FaFire,
    title: "Takut Kabel Terbakar?",
    bullets: [
      "Retrofit asal-asalan = kabel tipis di-paksa amperage tinggi",
      "Tanpa relay → arus utama lewat saklar standar",
      "Hasil: kabel meleleh, asap, kabin terbakar",
    ],
    solution:
      "Setiap instalasi pakai relay proteksi, fuse, dan kabel tembaga proper gauge. Wiring di-routing seperti factory install.",
  },
  {
    icon: FaBatteryFull,
    title: "Khawatir Aki Soak?",
    bullets: [
      "Lampu langsung dicolok ke aki tanpa pemisah beban",
      "Konslet kecil → aki drain semalaman",
      "Pagi hari: mobil tidak bisa start",
    ],
    solution:
      "Sistem relay memisahkan beban dari aki. Plus socket & fuse untuk proteksi. Aki tetap awet seperti standar pabrik.",
  },
  {
    icon: FaBolt,
    title: "Wiring Berantakan?",
    bullets: [
      "Kabel kusut, sambungan dilakban biasa",
      "Tidak waterproof, gampang konslet",
      "Susah di-troubleshoot kalau ada masalah",
    ],
    solution:
      "Wiring rapih seperti factory install. Sambungan pakai heatshrink + taping waterproof. Cable management ter-labeling.",
  },
];

const standards = [
  { icon: FaPlug, title: "Kabel Original", desc: "Tembaga murni, proper gauge" },
  { icon: FaShieldAlt, title: "Relay & Fuse", desc: "Bosch / Tyco + fuse proteksi" },
  { icon: FaTint, title: "Waterproof", desc: "Heatshrink + taping outdoor" },
  { icon: FaRuler, title: "Cable Management", desc: "Rapi seperti factory" },
];

export default function SafetySection() {
  const reduced = useReducedMotion();

  return (
    <section className="section-y relative bg-bg-raised">
      <div className="container-x">
        <SectionHeader
          index="04"
          eyebrow="Keamanan Terjamin"
          title="Bukan terang yang"
          accent="kami pikirkan"
          titleSuffix="dulu — tapi aman."
          accentTone="italic"
          description="Banyak yang takut pasang BILED karena cerita kabel terbakar dan aki soak. Di Owlighting, keamanan bukan opsi — itu standar minimum yang tidak pernah kami kompromikan."
        />

        {/* Headline stats — animated line connectors instead of vertical dividers */}
        <AnimatedSection delay={0.1}>
          <div className="relative glass-strong rounded-2xl border border-white/8 p-6 md:p-10 mb-12 md:mb-16 overflow-hidden">
            {/* Animated horizontal line that "lights up" on scroll into view */}
            {!reduced && (
              <motion.div
                aria-hidden
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }}
                style={{ transformOrigin: "left" }}
                className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-beam-400/60 to-transparent"
              />
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
              {headlineStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
                  className="text-center relative"
                >
                  <div
                    className={`inline-flex w-12 h-12 rounded-xl mb-3 items-center justify-center ${
                      stat.tone === "halo"
                        ? "bg-halo-500/10 text-halo-300"
                        : "bg-beam-400/10 text-beam-400"
                    }`}
                  >
                    <stat.icon size={20} />
                  </div>
                  <div className="font-editorial-roman text-5xl md:text-7xl font-normal tabular leading-none mb-2 text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base font-semibold text-white">
                    {stat.label}
                  </div>

                  {/* Mobile: animated separator below each stat (except last) */}
                  {i < headlineStats.length - 1 && (
                    <div
                      aria-hidden
                      className="md:hidden mt-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Safety problem/solution cards */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {safetyPoints.map((point, index) => (
            <AnimatedSection key={point.title} delay={0.15 + index * 0.1}>
              <motion.article
                whileHover={reduced ? undefined : { y: -6 }}
                transition={{ duration: 0.24, ease: [0.32, 0.72, 0, 1] }}
                className="glass-strong rounded-2xl p-6 h-full border border-white/5 hover:border-beam-400/20 transition-colors flex flex-col"
              >
                <div className="mb-4 w-12 h-12 rounded-xl bg-danger/10 flex items-center justify-center">
                  <point.icon size={20} className="text-danger" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white leading-tight tracking-tight">
                  {point.title}
                </h3>

                <div className="mb-5 rounded-lg bg-danger/5 border border-danger/10 p-3">
                  <p className="text-[10px] font-bold text-danger mb-2 uppercase tracking-widest">
                    Masalah Umum
                  </p>
                  <ul className="space-y-1.5">
                    {point.bullets.map((b, i) => (
                      <li
                        key={i}
                        className="text-[13px] text-text-secondary leading-relaxed flex items-start gap-2"
                      >
                        <span className="text-danger/70 mt-1">×</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-lg bg-success/5 border border-success/15 p-3 mt-auto">
                  <p className="text-[10px] font-bold text-success mb-2 uppercase tracking-widest">
                    Solusi Owlighting
                  </p>
                  <p className="text-sm text-white leading-relaxed">{point.solution}</p>
                </div>
              </motion.article>
            </AnimatedSection>
          ))}
        </div>

        {/* Quality standards — horizontal scroll on mobile */}
        <AnimatedSection delay={0.4}>
          <div className="glass-strong gradient-border-card rounded-2xl p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-semibold text-center mb-2 text-white tracking-tight">
              Standar instalasi <span className="font-editorial italic">Owlighting</span>
            </h3>
            <p className="text-center text-sm text-text-tertiary mb-8 max-w-md mx-auto">
              Empat hal di bawah ini bukan opsi tambahan — ini bagian dari paket dasar setiap pengerjaan.
            </p>

            {/* Horizontal-scroll carousel on mobile, 4-col grid on md+ */}
            <div className="-mx-6 md:mx-0 overflow-x-auto md:overflow-visible scrollbar-thin">
              <div className="flex md:grid md:grid-cols-4 gap-4 md:gap-6 px-6 md:px-0 snap-x snap-mandatory md:snap-none">
                {standards.map((item) => (
                  <motion.div
                    key={item.title}
                    whileHover={reduced ? undefined : { y: -4, scale: 1.01 }}
                    transition={{ duration: 0.24, ease: [0.32, 0.72, 0, 1] }}
                    className="snap-start shrink-0 w-[70%] md:w-auto text-center bg-white/[0.02] rounded-xl p-5 border border-white/5"
                  >
                    <div className="mb-3 flex justify-center">
                      <div className="w-12 h-12 rounded-xl bg-beam-400/10 flex items-center justify-center">
                        <item.icon size={20} className="text-beam-400" />
                      </div>
                    </div>
                    <p className="font-semibold text-white mb-1 text-sm md:text-base tracking-tight">
                      {item.title}
                    </p>
                    <p className="text-xs md:text-sm text-text-tertiary leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
