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
    title: "Presisi tanpa kompromi",
    body:
      "Kami tidak sekadar memasang. Kami memotong. Bracket, shroud, dan dudukan custom yang mustahil ditemukan di pasaran — di-cut dengan akurasi milimeter di workshop kami sendiri.",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&auto=format&fit=crop",
    specs: [
      { k: "Akurasi", v: "0.05 mm" },
      { k: "Area Kerja", v: "600 × 900 mm" },
      { k: "Material", v: "Akrilik 3-10 mm" },
      { k: "Output", v: "Bracket · panel · shroud" },
    ],
  },
  {
    label: "3D Printing",
    title: "Imajinasi jadi komponen",
    body:
      "DRL custom yang unik. Lazy eyes futuristik. Adapter retrofit untuk mobil yang tidak ada di katalog. Semua di-cetak, di-tuning, dan di-fit ulang di studio kami.",
    image:
      "https://images.unsplash.com/photo-1611117775350-ac3950990985?q=80&w=1200&auto=format&fit=crop",
    specs: [
      { k: "Layer Height", v: "0.1 mm" },
      { k: "Build Volume", v: "250 × 250 × 300 mm" },
      { k: "Material", v: "PETG · ABS · ASA" },
      { k: "Output", v: "Shroud · adapter · prototype" },
    ],
  },
];

export default function TechSection() {
  const reduced = useReducedMotion();

  return (
    <section id="tech" className="section-y relative overflow-hidden">
      <div className="container-x relative z-10">
        <SectionHeader
          index="01"
          eyebrow="Teknologi In-House"
          title="Bukan bengkel"
          accent="biasa."
          accentTone="italic"
          description="CNC Laser dan 3D Printer berdiri di workshop kami sendiri — bukan kirim ke pihak ketiga. Setiap bracket dan shroud dipotong, dicetak, dan diukur ulang di sini."
        />

        <div className="space-y-20 md:space-y-28">
          {TECHS.map((tech, idx) => {
            const flipped = idx % 2 === 1;
            return (
              <article
                key={tech.label}
                className={`grid md:grid-cols-12 gap-8 md:gap-10 items-start ${
                  flipped ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Image — asymmetric span (image takes 7 of 12) */}
                <motion.div
                  initial={reduced ? false : { opacity: 0, x: flipped ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                  className="md:col-span-7 relative aspect-[5/3] rounded-sm overflow-hidden group"
                >
                  <Image
                    src={tech.image}
                    alt={tech.label}
                    fill
                    sizes="(max-width: 768px) 100vw, 700px"
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-base/85 via-bg-base/10 to-transparent" />

                  {/* Dimension callout — corner, blueprint-style */}
                  <div
                    aria-hidden
                    className="absolute top-4 left-4 flex items-center gap-2 font-mono-tech text-[10px] text-white/60"
                  >
                    <span className="h-px w-4 bg-white/40" />
                    <span className="tabular tracking-wider">FIG. {String(idx + 1).padStart(2, "0")} · {tech.label.toUpperCase()}</span>
                  </div>

                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
                    <div>
                      <p className="eyebrow mb-1">Workshop · Way Jepara</p>
                      <p className="font-editorial italic text-2xl md:text-3xl text-white leading-none">
                        {tech.label.toLowerCase()}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Content — narrower span (5 of 12) */}
                <motion.div
                  initial={reduced ? false : { opacity: 0, x: flipped ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
                  className="md:col-span-5 md:pt-8"
                >
                  <span className="eyebrow block mb-3">{tech.label}</span>
                  <h3 className="text-3xl md:text-4xl font-bold leading-[1.1] mb-5 text-white">
                    {tech.title.split(" ").slice(0, -1).join(" ")}{" "}
                    <span className="font-editorial italic">{tech.title.split(" ").slice(-1)[0]}</span>
                  </h3>
                  <p className="text-text-secondary text-base leading-relaxed mb-8">
                    {tech.body}
                  </p>

                  {/* Spec table — engineering rather than marketing */}
                  <dl className="border-t border-white/8">
                    {tech.specs.map((spec) => (
                      <div
                        key={spec.k}
                        className="grid grid-cols-[120px_1fr] gap-4 py-3 border-b border-white/5"
                      >
                        <dt className="eyebrow self-center">{spec.k}</dt>
                        <dd className="font-mono-tech text-sm text-white tabular">
                          {spec.v}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <Link
                    href="/blog"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-beam-400 transition-colors group/link"
                  >
                    Lihat proses pengerjaan
                    <FaArrowRight
                      size={11}
                      className="group-hover/link:translate-x-1 transition-transform"
                    />
                  </Link>
                </motion.div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
