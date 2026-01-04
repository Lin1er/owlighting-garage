"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { DynamicIcon } from "./DynamicIcon";

export default function SafetySection() {
  const safetyPoints = [
    {
      icon: "FaFire",
      title: "Takut Kabel Terbakar?",
      problem:
        "Banyak kasus retrofit BILED asal-asalan yang bikin kabel terbakar dan merusak kendaraan.",
      solution:
        "Di Owlighting, semua instalasi menggunakan relay proteksi, fuse, dan kabel proper gauge. Dijamin aman!",
    },
    {
      icon: "FaBatteryFull",
      title: "Khawatir Aki Soak?",
      problem:
        "Instalasi yang salah bisa bikin aki cepat tekor karena beban berlebih atau konslet.",
      solution:
        "Kami pakai sistem relay yang memisahkan beban dari aki. Plus socket & fuse untuk proteksi maksimal.",
    },
    {
      icon: "FaBolt",
      title: "Kabel Berantakan?",
      problem:
        "Kabel kusut & sambungan alakadarnya rawan konslet dan tidak tahan lama.",
      solution:
        "Wiring rapih seperti factory install. Semua sambungan pakai heatshrink & taping waterproof. Cable management profesional.",
    },
  ];

  return (
    <section className="relative py-24 px-6 lg:px-20 bg-surface/30">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <h2 className="text-4xl lg:text-5xl font-black text-center mb-4 text-glow">
            Mengapa Harus Aman?
          </h2>
          <p className="text-center text-muted mb-4 max-w-2xl mx-auto">
            Banyak yang takut pasang BILED karena kasus kabel terbakar & aki
            soak. Di Owlighting, keamanan adalah prioritas utama.
          </p>
          <p className="text-center text-muted text-xl mb-16 w-full bg-linear-to-r  from-[#050505]  via-[#000000]  to-[#050505]">
            Pengalaman 5+ Tahun • Ratusan Kendaraan • 0 Kasus Terbakar
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {safetyPoints.map((point, index) => (
            <AnimatedSection key={index} delay={index * 0.2}>
              <motion.div
                whileHover={{ y: -10 }}
                className="glass rounded-2xl p-6 h-full"
              >
                <div className="mb-4">
                  <DynamicIcon
                    name={point.icon}
                    size={48}
                    className="text-primary"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3 text-primary">
                  {point.title}
                </h3>

                <div className="mb-4 pb-4 border-b border-red-500/30">
                  <p className="text-sm font-semibold text-red-400 mb-2">
                    ❌ Masalah Umum:
                  </p>
                  <p className="text-muted text-sm leading-relaxed">
                    {point.problem}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-green-400 mb-2">
                    ✅ Solusi Owlighting:
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
          <div className="mt-16 glass rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-center mb-8 text-glow">
              Standar Instalasi Owlighting
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="mb-2 flex justify-center">
                  <DynamicIcon
                    name="FaPlug"
                    size={32}
                    className="text-primary"
                  />
                </div>
                <p className="font-semibold text-primary mb-1">
                  Kabel Original
                </p>
                <p className="text-sm text-muted">
                  Tembaga murni, proper gauge sesuai ampere
                </p>
              </div>
              <div className="text-center">
                <div className="mb-2 flex justify-center">
                  <DynamicIcon
                    name="FaShieldAlt"
                    size={32}
                    className="text-primary"
                  />
                </div>
                <p className="font-semibold text-primary mb-1">Relay & Fuse</p>
                <p className="text-sm text-muted">
                  Bosch/Tyco relay + fuse proteksi
                </p>
              </div>
              <div className="text-center">
                <div className="mb-2 flex justify-center">
                  <DynamicIcon
                    name="FaTint"
                    size={32}
                    className="text-primary"
                  />
                </div>
                <p className="font-semibold text-primary mb-1">Waterproof</p>
                <p className="text-sm text-muted">
                  Heatshrink & taping weather resistant
                </p>
              </div>
              <div className="text-center">
                <div className="mb-2 flex justify-center">
                  <DynamicIcon
                    name="FaRuler"
                    size={32}
                    className="text-primary"
                  />
                </div>
                <p className="font-semibold text-primary mb-1">
                  Cable Management
                </p>
                <p className="text-sm text-muted">
                  Rapih seperti factory install
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Testimonial Keamanan */}
        <AnimatedSection delay={0.8}>
          <div className="mt-12 text-center">
            <div className="inline-block glass rounded-xl px-8 py-6">
              <p className="text-muted italic mb-3">
                "Sempat ragu karena pernah denger cerita aki soak dan kabel
                terbakar. Tapi di Owlighting dijelasin detail sistem relay-nya,
                liat instalasi nya rapih banget. Udah 2 tahun pakai, ga ada
                masalah sama sekali!"
              </p>
              <p className="text-primary font-semibold">
                - Budi S., Toyota Alphard
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
