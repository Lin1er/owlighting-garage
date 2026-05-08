"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import AnimatedSection from "../components/AnimatedSection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import { portfolioProjects, testimonials } from "@/data";
import { SectionHeader } from "../components/ui/SectionHeader";
import { Button } from "../components/ui/Button";
import { Chip } from "../components/ui/Chip";
import { buildWhatsAppLink, buildServiceInquiry } from "@/lib/whatsapp";
import { FaArrowRight, FaWhatsapp, FaStar, FaQuoteLeft } from "react-icons/fa";

const FILTERS = [
  { key: "all", label: "Semua" },
  { key: "mobil", label: "Mobil" },
  { key: "motor", label: "Motor" },
  { key: "custom", label: "Custom" },
];

const STATS = [
  { number: "500+", label: "Kendaraan Custom BILED" },
  { number: "99%", label: "Kepuasan Pelanggan" },
  { number: "5+", label: "Tahun Pengalaman" },
  { number: "0", label: "Kasus Kebakaran" },
];

export default function PortfolioClient() {
  const [activeFilter, setActiveFilter] = useState("all");

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: portfolioProjects.length };
    for (const p of portfolioProjects) c[p.category] = (c[p.category] ?? 0) + 1;
    return c;
  }, []);

  const filteredProjects =
    activeFilter === "all"
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.category === activeFilter);

  return (
    <main className="relative">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(255,184,0,0.10), transparent 65%)",
          }}
        />
        <div className="container-x relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="text-center"
          >
            <Chip tone="halo" size="sm" className="mb-5">
              Portfolio
            </Chip>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6">
              <span className="gradient-text-dual">Karya Custom BILED</span>
              <br />
              <span className="text-white/90">yang sudah jalan di jalanan.</span>
            </h1>
            <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Hasil pengerjaan <strong className="text-white">Custom BILED</strong> mobil dan
              motor di Owlighting Lampung Timur. Dari retrofit standar hingga custom extreme —
              setiap project adalah karya yang masih beroperasi sampai sekarang.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter chips */}
      <section className="pt-4 pb-8" id="filter-portfolio">
        <div className="container-x">
          <h2 className="sr-only">Filter Portfolio Custom BILED</h2>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {FILTERS.map(({ key, label }) => {
              const isActive = activeFilter === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveFilter(key)}
                  className={`group px-5 py-2 rounded-full text-sm font-semibold transition-all duration-[var(--dur-default)] flex items-center gap-2 ${
                    isActive
                      ? "bg-beam-400 text-[color:var(--text-on-beam)] glow-primary"
                      : "bg-white/5 text-text-secondary hover:bg-white/10 hover:text-white border border-white/10"
                  }`}
                >
                  {label}
                  <span
                    className={`tabular text-[11px] px-1.5 py-0.5 rounded-full ${
                      isActive ? "bg-black/15 text-black/70" : "bg-white/5 text-text-tertiary"
                    }`}
                  >
                    {counts[key] ?? 0}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="pb-16 md:pb-20" id="galeri-custom-biled">
        <div className="container-x">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.32,
                    delay: index * 0.04,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                  itemScope
                  itemType="https://schema.org/CreativeWork"
                >
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.24, ease: [0.32, 0.72, 0, 1] }}
                    className="glass rounded-2xl overflow-hidden group cursor-pointer h-full border border-white/5 hover:border-beam-400/30 transition-colors"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={project.image}
                        alt={`Custom BILED ${project.title} - Hasil pengerjaan Owlighting Lampung Timur`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        itemProp="image"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                      <div className="absolute top-3 right-3">
                        <Chip tone="beam" size="xs">
                          {project.category}
                        </Chip>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3
                        className="font-display text-base md:text-lg font-bold text-white mb-1.5 leading-tight"
                        itemProp="name"
                      >
                        {project.title}
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed" itemProp="description">
                        {project.description}
                      </p>
                    </div>
                  </motion.div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Track record */}
      <section className="section-y bg-bg-raised" id="statistik">
        <div className="container-x">
          <SectionHeader
            badge="Track Record"
            title="Angka yang"
            accent="bisa diverifikasi."
            description="500+ kendaraan, 5+ tahun, 0 insiden — bukan klaim marketing. Mereka masih beroperasi di jalanan, customer-nya masih kontak via WhatsApp untuk service rutin."
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {STATS.map((stat, index) => (
              <AnimatedSection key={stat.label} delay={index * 0.08}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -4 }}
                  transition={{ duration: 0.24, ease: [0.32, 0.72, 0, 1] }}
                  className="glass-strong gradient-border-card rounded-2xl p-5 md:p-7 text-center"
                >
                  <div className="font-display text-4xl md:text-6xl font-black tabular gradient-text mb-2 leading-none">
                    {stat.number}
                  </div>
                  <div className="text-xs md:text-sm text-text-secondary font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-y" id="testimoni-custom-biled">
        <div className="container-x">
          <SectionHeader
            badge="Testimoni Pelanggan"
            title="Apa kata"
            accent="customer kami?"
            description="Kepuasan pelanggan adalah bukti nyata kualitas kerja kami — dan alasan referral terus mengalir tanpa iklan berbayar."
          />

          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection key={testimonial.id} delay={index * 0.08}>
                <motion.article
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.24, ease: [0.32, 0.72, 0, 1] }}
                  className="glass-strong rounded-2xl p-6 border border-white/5 hover:border-beam-400/20 transition-colors h-full flex flex-col"
                  itemScope
                  itemType="https://schema.org/Review"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-beam-400/10 flex items-center justify-center">
                      <FaQuoteLeft size={14} className="text-beam-400" />
                    </div>
                    <div
                      className="flex gap-0.5"
                      itemProp="reviewRating"
                      itemScope
                      itemType="https://schema.org/Rating"
                    >
                      <meta itemProp="ratingValue" content={String(testimonial.rating)} />
                      <meta itemProp="bestRating" content="5" />
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} size={12} className="text-beam-400" />
                      ))}
                    </div>
                  </div>
                  <p
                    className="text-text-secondary italic mb-5 leading-relaxed flex-1"
                    itemProp="reviewBody"
                  >
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  <div
                    itemProp="author"
                    itemScope
                    itemType="https://schema.org/Person"
                    className="pt-4 border-t border-white/5"
                  >
                    <p className="font-semibold text-white text-sm" itemProp="name">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-beam-400 mt-0.5">{testimonial.vehicle}</p>
                  </div>
                </motion.article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-y bg-bg-raised" id="mulai-project">
        <div className="container-x max-w-4xl text-center">
          <AnimatedSection>
            <h2 className="font-display text-3xl md:text-5xl font-black mb-5 leading-tight">
              Kendaraan Anda{" "}
              <span className="gradient-text">selanjutnya?</span>
            </h2>
            <p className="text-text-secondary text-base md:text-lg mb-8 max-w-2xl mx-auto">
              Konsultasi gratis untuk project custom BILED kendaraan Anda. Kami survey headlamp
              dulu sebelum memberi estimasi.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                href={buildWhatsAppLink({
                  message: buildServiceInquiry("Project Custom BILED"),
                })}
                external
                variant="primary"
                size="lg"
                leftIcon={<FaWhatsapp size={16} />}
              >
                Mulai Project Anda
              </Button>
              <Button
                href="/services"
                variant="secondary"
                size="lg"
                rightIcon={<FaArrowRight size={12} />}
              >
                Lihat Layanan Lainnya
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </main>
  );
}
