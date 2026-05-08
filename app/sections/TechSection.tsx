"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { SectionHeader } from "../components/ui/SectionHeader";
import { useReducedMotion } from "../hooks/useReducedMotion";

const TECHS = [
  {
    label: "CNC Laser",
    title: "Presisi Tanpa Kompromi",
    body:
      "Kami tidak sekadar memasang. Kami menciptakan. Bracket, shroud, dan dudukan custom yang mustahil ditemukan di pasaran — dipotong dengan akurasi milimeter.",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&auto=format&fit=crop",
    specs: [
      { k: "Akurasi", v: "0.05 mm" },
      { k: "Area Kerja", v: "600 × 900 mm" },
      { k: "Material", v: "Akrilik 3-10 mm" },
      { k: "Output", v: "Bracket, shroud, panel" },
    ],
    accent: "halo" as const,
  },
  {
    label: "3D Printing",
    title: "Imajinasi Jadi Komponen",
    body:
      "DRL custom yang unik. Lazy eyes futuristik. Adapter retrofit untuk mobil yang tidak ada di katalog. Semua di-cetak dan di-tuning di studio kami sendiri.",
    image:
      "https://images.unsplash.com/photo-1611117775350-ac3950990985?q=80&w=1200&auto=format&fit=crop",
    specs: [
      { k: "Layer Height", v: "0.1 mm" },
      { k: "Build Volume", v: "250 × 250 × 300 mm" },
      { k: "Material", v: "PETG · ABS · ASA" },
      { k: "Output", v: "Shroud, adapter, prototype" },
    ],
    accent: "beam" as const,
  },
];

export default function TechSection() {
  const reduced = useReducedMotion();

  return (
    <section id="tech" className="section-y relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-raised/40 to-transparent pointer-events-none"
      />

      <div className="container-x relative z-10">
        <SectionHeader
          badge="Teknologi In-House"
          title="Bukan bengkel"
          accent="biasa"
          accentTone="dual"
          description="CNC Laser dan 3D Printer berdiri di workshop kami sendiri — bukan kirim ke pihak ketiga. Setiap bracket dan shroud dipotong, dicetak, dan diukur ulang di sini."
        />

        <div className="space-y-16 md:space-y-24">
          {TECHS.map((tech, idx) => {
            const flipped = idx % 2 === 1;
            return (
              <div
                key={tech.label}
                className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${flipped ? "md:[&>*:first-child]:order-2" : ""}`}
              >
                {/* Image */}
                <motion.div
                  initial={reduced ? false : { opacity: 0, x: flipped ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                  whileHover={reduced ? undefined : { scale: 1.01 }}
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden group"
                >
                  <Image
                    src={tech.image}
                    alt={tech.label}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                  {/* Tech label badge corner */}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md text-[11px] uppercase tracking-widest font-bold border ${
                        tech.accent === "halo"
                          ? "bg-halo-500/15 text-halo-300 border-halo-500/30"
                          : "bg-beam-400/15 text-beam-400 border-beam-400/30"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${tech.accent === "halo" ? "bg-halo-300" : "bg-beam-400"} animate-pulse`}
                      />
                      {tech.label}
                    </span>
                  </div>

                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/60 mb-1">
                      Workshop · Way Jepara
                    </p>
                    <p className="font-display text-2xl md:text-3xl font-black text-white text-glow leading-tight">
                      {tech.label.toUpperCase()}
                    </p>
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={reduced ? false : { opacity: 0, x: flipped ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
                >
                  <h3 className="font-display text-3xl md:text-4xl font-black mb-4 leading-tight">
                    <span className={tech.accent === "halo" ? "gradient-text-halo" : "gradient-text"}>
                      {tech.title}
                    </span>
                  </h3>
                  <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-6">
                    {tech.body}
                  </p>

                  {/* Spec table */}
                  <dl className="grid grid-cols-2 gap-x-6 gap-y-3 mb-6 max-w-md">
                    {tech.specs.map((spec) => (
                      <div key={spec.k} className="border-t border-white/8 pt-2.5">
                        <dt className="text-[10px] uppercase tracking-widest text-text-tertiary mb-0.5">
                          {spec.k}
                        </dt>
                        <dd className="text-sm font-semibold text-white tabular">
                          {spec.v}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-beam-400 hover:text-beam-200 transition-colors group/link"
                  >
                    Lihat proses pengerjaan
                    <FaArrowRight
                      size={11}
                      className="group-hover/link:translate-x-1 transition-transform"
                    />
                  </Link>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
