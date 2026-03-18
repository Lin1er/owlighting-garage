"use client";

import AnimatedSection from "../components/AnimatedSection";
import { motion } from "framer-motion";
import Image from "next/image";
import { portfolioProjects } from "@/data";

export default function GallerySection() {
  // Hanya ambil 4 project terbaru untuk ditampilkan di home
  const featuredProjects = portfolioProjects.slice(0, 4);

  return (
    <section
      id="gallery"
      className="relative sm:py-24 py-15 px-6 lg:px-20 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pulse-glow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl pulse-glow" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatedSection>
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold mb-4 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              PORTFOLIO KAMI
            </div>
            <h2 className="text-4xl lg:text-5xl font-black mb-4 text-glow">
              Hasil Modifikasi Terbaik
            </h2>
            <p className="text-muted mb-12 max-w-2xl mx-auto">
              Berbagai karya pencahayaan custom, retrofit BILED gahar, hingga
              kreasi DRL Matrix menggunakan CNC & 3D Print.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredProjects.map((item, index) => (
            <AnimatedSection key={item.id} delay={0.2 + index * 0.1}>
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl h-80 group glass"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 p-5 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <span className="text-xs font-bold text-primary mb-2 block uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-1 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-300 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.6}>
          <div className="text-center mt-12">
            <motion.a
              href="/portfolio"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 bg-linear-to-r from-primary to-cyan-400 text-black font-bold rounded-lg glow-primary shadow-xl"
            >
              Lihat Galeri Lengkap
            </motion.a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
