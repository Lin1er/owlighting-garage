"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import AnimatedSection from "../components/AnimatedSection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import { portfolioProjects, testimonials } from "@/data";

export default function PortfolioPage() {
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
              <span className="text-glow">Portfolio</span> Kami
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-muted text-center max-w-3xl mx-auto leading-relaxed"
            >
              Dari retrofit standar hingga custom extreme. Setiap project adalah
              karya seni pencahayaan.
            </motion.p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="flex flex-wrap justify-center gap-4">
              {["all", "mobil", "motor", "custom"].map((filter) => (
                <motion.button
                  key={filter}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    activeFilter === filter
                      ? "bg-primary text-white glow-primary"
                      : "glass text-muted hover:text-white"
                  }`}
                >
                  {filter === "all"
                    ? "Semua"
                    : filter.charAt(0).toUpperCase() + filter.slice(1)}
                </motion.button>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <motion.div
                  whileHover={{ y: -10 }}
                  className="glass rounded-2xl overflow-hidden group cursor-pointer"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-white via-white/50 to-transparent opacity-80" />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold mt-2 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted">{project.description}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 lg:px-20 bg-surface/30">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl font-black text-center mb-12 text-glow">
              Kata Mereka
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection key={testimonial.id} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="glass rounded-2xl p-6"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-accent text-xl">
                        ⭐
                      </span>
                    ))}
                  </div>
                  <p className="text-muted italic mb-4">"{testimonial.text}"</p>
                  <div>
                    <p className="font-bold text-primary">{testimonial.name}</p>
                    <p className="text-sm text-muted">{testimonial.vehicle}</p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-4xl font-black mb-6">
              Kendaraan Anda Selanjutnya?
            </h2>
            <p className="text-muted text-lg mb-8">
              Konsultasi gratis untuk project custom lighting Anda
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => (window.location.href = "/#reservation")}
              className="px-10 py-4 bg-cyan-400 hover:bg-cyan-300 text-black font-bold rounded-lg glow-primary text-lg"
            >
              Mulai Project Anda
            </motion.button>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </main>
  );
}
