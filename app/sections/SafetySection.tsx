"use client";

import { motion } from "framer-motion";
import AnimatedSection from "../components/AnimatedSection";
import { DynamicIcon } from "../components/DynamicIcon";
import { FaFire, FaBatteryFull, FaBolt, FaPlug, FaShieldAlt, FaTint, FaRuler } from "react-icons/fa";

export default function SafetySection() {
  const safetyPoints = [
    {
      icon: FaFire,
      title: "Takut Kabel Terbakar?",
      problem:
        "Banyak kasus retrofit BILED asal-asalan yang bikin kabel terbakar dan merusak kendaraan.",
      solution:
        "Di Owlighting, semua instalasi menggunakan relay proteksi, fuse, dan kabel proper gauge. Dijamin aman!",
      accent: "red",
    },
    {
      icon: FaBatteryFull,
      title: "Khawatir Aki Soak?",
      problem:
        "Instalasi yang salah bisa bikin aki cepat tekor karena beban berlebih atau konslet.",
      solution:
        "Kami pakai sistem relay yang memisahkan beban dari aki. Plus socket & fuse untuk proteksi maksimal.",
      accent: "amber",
    },
    {
      icon: FaBolt,
      title: "Kabel Berantakan?",
      problem:
        "Kabel kusut & sambungan alakadarnya rawan konslet dan tidak tahan lama.",
      solution:
        "Wiring rapih seperti factory install. Semua sambungan pakai heatshrink & taping waterproof. Cable management profesional.",
      accent: "orange",
    },
  ];

  const standards = [
    { icon: FaPlug, title: "Kabel Original", desc: "Tembaga murni, proper gauge sesuai ampere" },
    { icon: FaShieldAlt, title: "Relay & Fuse", desc: "Bosch/Tyco relay + fuse proteksi" },
    { icon: FaTint, title: "Waterproof", desc: "Heatshrink & taping weather resistant" },
    { icon: FaRuler, title: "Cable Management", desc: "Rapih seperti factory install" },
  ];

  return (
    <section className="relative py-24 px-6 lg:px-20 bg-surface/30">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold mb-4 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              KEAMANAN TERJAMIN
            </div>
            <h2 className="text-4xl lg:text-5xl font-black mb-4">
              <span className="gradient-text">Mengapa Harus</span> Aman?
            </h2>
            <p className="text-muted mb-6 max-w-2xl mx-auto">
              Banyak yang takut pasang BILED karena kasus kabel terbakar & aki
              soak. Di Owlighting, keamanan adalah prioritas utama.
            </p>
          </div>
        </AnimatedSection>

        {/* Big Zero Callout */}
        <AnimatedSection delay={0.2}>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-16 py-8 px-6 glass-strong rounded-2xl border border-primary/10">
            <div className="text-center">
              <div className="text-6xl md:text-8xl font-black gradient-text leading-none mb-1">0</div>
              <div className="text-lg md:text-xl font-bold text-white">Kasus Terbakar</div>
            </div>
            <div className="hidden md:block w-px h-20 bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
            <div className="text-center">
              <div className="text-6xl md:text-8xl font-black gradient-text leading-none mb-1">5+</div>
              <div className="text-lg md:text-xl font-bold text-white">Tahun Pengalaman</div>
            </div>
            <div className="hidden md:block w-px h-20 bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
            <div className="text-center">
              <div className="text-6xl md:text-8xl font-black gradient-text leading-none mb-1">500+</div>
              <div className="text-lg md:text-xl font-bold text-white">Kendaraan Dikerjakan</div>
            </div>
          </div>
        </AnimatedSection>

        {/* Safety Cards */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {safetyPoints.map((point, index) => (
            <AnimatedSection key={index} delay={0.3 + index * 0.15}>
              <motion.div
                whileHover={{ y: -8 }}
                className="glass-strong rounded-2xl p-6 h-full border border-white/5 hover:border-primary/20 transition-colors"
              >
                <div className="mb-4 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <point.icon size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">
                  {point.title}
                </h3>

                <div className="mb-4 pb-4 border-b border-red-500/20 rounded-lg bg-red-500/5 p-3 -mx-1">
                  <p className="text-xs font-bold text-red-400 mb-1.5 uppercase tracking-wider">
                    ❌ Masalah Umum
                  </p>
                  <p className="text-muted text-sm leading-relaxed">
                    {point.problem}
                  </p>
                </div>

                <div className="rounded-lg bg-emerald-500/5 p-3 -mx-1 border border-emerald-500/10">
                  <p className="text-xs font-bold text-emerald-400 mb-1.5 uppercase tracking-wider">
                    ✅ Solusi Owlighting
                  </p>
                  <p className="text-white text-sm leading-relaxed">
                    {point.solution}
                  </p>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Quality Assurance */}
        <AnimatedSection delay={0.6}>
          <div className="mt-16 glass-strong gradient-border-card rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-center mb-8">
              <span className="gradient-text">Standar Instalasi</span> Owlighting
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {standards.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="text-center group"
                >
                  <div className="mb-3 flex justify-center">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <item.icon size={22} className="text-primary" />
                    </div>
                  </div>
                  <p className="font-semibold text-white mb-1 text-sm md:text-base">
                    {item.title}
                  </p>
                  <p className="text-xs md:text-sm text-muted">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
