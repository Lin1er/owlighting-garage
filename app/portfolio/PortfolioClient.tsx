"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import AnimatedSection from "../components/AnimatedSection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import { portfolioProjects, testimonials } from "@/data";

export default function PortfolioClient() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects =
    activeFilter === "all"
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.category === activeFilter);

  return (
    <main className="relative">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-accent/5 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <AnimatedSection>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl lg:text-7xl font-white mb-6 text-center"
            >
              <span className="text-glow">Portfolio</span> Custom BILED
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-muted text-center max-w-3xl mx-auto leading-relaxed"
            >
              Hasil pengerjaan <strong>Custom BILED</strong> mobil dan motor di Owlighting Lampung Timur. 
              Dari retrofit standar hingga custom extreme. Setiap project adalah karya seni pencahayaan berkualitas.
            </motion.p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 px-6 lg:px-20" id="filter-portfolio">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="sr-only">Filter Portfolio Custom BILED</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { key: "all", label: "Semua Custom BILED" },
                { key: "mobil", label: "Custom BILED Mobil" },
                { key: "motor", label: "Custom BILED Motor" },
                { key: "custom", label: "Custom Project" },
              ].map((filter) => (
                <motion.button
                  key={filter.key}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    activeFilter === filter.key
                      ? "bg-primary text-white glow-primary"
                      : "glass text-muted hover:text-white"
                  }`}
                >
                  {filter.label}
                </motion.button>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 px-6 lg:px-20" id="galeri-custom-biled">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-center mb-8 text-primary">
              Galeri Hasil Custom BILED Owlighting
            </h2>
          </AnimatedSection>
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                itemScope
                itemType="https://schema.org/CreativeWork"
              >
                <motion.div
                  whileHover={{ y: -10 }}
                  className="glass rounded-2xl overflow-hidden group cursor-pointer"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={`Custom BILED ${project.title} - Hasil pengerjaan Owlighting Lampung Timur`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      itemProp="image"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-80" />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                      Custom BILED {project.category}
                    </span>
                    <h3 className="text-xl font-bold mt-2 mb-2" itemProp="name">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted" itemProp="description">{project.description}</p>
                  </div>
                </motion.div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 lg:px-20 bg-surface/30" id="statistik">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-center mb-8 text-glow">
              Track Record Custom BILED Owlighting
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Kendaraan Custom BILED" },
              { number: "99%", label: "Kepuasan Pelanggan" },
              { number: "5+", label: "Tahun Pengalaman" },
              { number: "0", label: "Kasus Kebakaran" },
            ].map((stat, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="text-center">
                  <p className="text-4xl md:text-5xl font-black text-primary mb-2">{stat.number}</p>
                  <p className="text-muted">{stat.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 lg:px-20" id="testimoni-custom-biled">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl font-black text-center mb-4 text-glow">
              Testimoni Pelanggan Custom BILED
            </h2>
            <p className="text-center text-muted mb-12 max-w-2xl mx-auto">
              Apa kata pelanggan yang sudah merasakan hasil custom BILED di Owlighting
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection key={testimonial.id} delay={index * 0.1}>
                <motion.article
                  whileHover={{ y: -5 }}
                  className="glass rounded-2xl p-6"
                  itemScope
                  itemType="https://schema.org/Review"
                >
                  <div className="flex gap-1 mb-4" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                    <meta itemProp="ratingValue" content={String(testimonial.rating)} />
                    <meta itemProp="bestRating" content="5" />
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-accent text-xl">
                        ⭐
                      </span>
                    ))}
                  </div>
                  <p className="text-muted italic mb-4" itemProp="reviewBody">"{testimonial.text}"</p>
                  <div itemProp="author" itemScope itemType="https://schema.org/Person">
                    <p className="font-bold text-primary" itemProp="name">{testimonial.name}</p>
                    <p className="text-sm text-muted">{testimonial.vehicle} - Custom BILED</p>
                  </div>
                </motion.article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 lg:px-20 bg-surface/30" id="mulai-project">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-4xl font-black mb-6 text-glow">
              Kendaraan Anda Selanjutnya Dipasang Custom BILED?
            </h2>
            <p className="text-muted text-lg mb-8">
              Konsultasi gratis untuk project custom BILED kendaraan Anda di Lampung Timur
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="https://wa.me/6285658648413?text=Halo%20Owlighting,%20saya%20mau%20konsultasi%20Custom%20BILED%20untuk%20kendaraan%20saya"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-cyan-400 hover:bg-cyan-300 text-black font-bold rounded-lg glow-primary text-lg"
              >
                Mulai Project Custom BILED Anda
              </motion.a>
              <motion.a
                href="/services"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 border-2 border-primary/30 text-white font-semibold rounded-lg hover:bg-primary/10 hover:border-primary transition-all"
              >
                Lihat Layanan Lainnya
              </motion.a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </main>
  );
}
