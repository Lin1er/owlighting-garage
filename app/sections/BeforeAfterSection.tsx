"use client";

import AnimatedSection from "../components/AnimatedSection";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import { FaArrowRight, FaClock } from "react-icons/fa";
import { SectionHeader } from "../components/ui/SectionHeader";
import { Button } from "../components/ui/Button";
import { Chip } from "../components/ui/Chip";

type Comparison = {
  title: string;
  vehicle: string;
  before: string;
  after: string;
  description: string;
  service: string;
  category: "mobil" | "motor";
  /** Optional photometric metadata. Lux readings are real-world bragging rights. */
  luxBefore?: number;
  luxAfter?: number;
  durationDays?: number;
};

// TODO: replace these Unsplash placeholders with workshop-shot before/after pairs
// once the owner sends the asset bundle. Schema is already in place in
// `gallery_images` table — admins can swap photos via /admin/gallery without
// touching this file.
const COMPARISONS: Comparison[] = [
  {
    title: "BILED Retrofit",
    vehicle: "Toyota Avanza 2018",
    before:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&auto=format&fit=crop",
    after:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200&auto=format&fit=crop",
    description: "Halogen kuning 3.200 lx → BILED putih tajam 6000 K dengan cut-off RHD presisi.",
    service: "BILED Retrofit",
    category: "mobil",
    luxBefore: 3200,
    luxAfter: 18500,
    durationDays: 1,
  },
  {
    title: "D2 Laser Foglamp",
    vehicle: "Honda Jazz 2020",
    before:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&auto=format&fit=crop",
    after:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&auto=format&fit=crop",
    description: "Foglamp standar redup → cahaya kristal dual-color, IP67, tembus kabut.",
    service: "D2 Laser",
    category: "mobil",
    luxBefore: 1800,
    luxAfter: 12000,
    durationDays: 1,
  },
];

export default function BeforeAfterSection() {
  return (
    <section className="section-y bg-bg-raised">
      <div className="container-x">
        <SectionHeader
          badge="Bukti Hasil Pengerjaan"
          title="Sebelum"
          accent="& Sesudah"
          accentTone="dual"
          titleSuffix="Upgrade"
          description="Geser slider untuk lihat sendiri. Cahaya kuning kusam bawaan pabrik bisa kami sulap jadi tajam, putih bersih (6000 K), dan ber-cutoff rapi tanpa menyilaukan pengguna jalan lain."
        />

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {COMPARISONS.map((item, index) => (
            <AnimatedSection key={item.title} delay={index * 0.15}>
              <article className="glass-strong rounded-2xl overflow-hidden border border-white/5 hover:border-beam-400/20 transition-colors">
                <div className="relative h-72 md:h-96">
                  <ReactCompareSlider
                    itemOne={
                      <ReactCompareSliderImage
                        src={item.before}
                        alt={`${item.vehicle} sebelum upgrade`}
                      />
                    }
                    itemTwo={
                      <ReactCompareSliderImage
                        src={item.after}
                        alt={`${item.vehicle} setelah upgrade`}
                      />
                    }
                    className="h-full"
                    style={{ height: "100%" }}
                  />

                  {/* Before / After labels — halogen warm vs beam cool */}
                  <div className="absolute top-3 left-3 bg-halo-500/95 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold text-[#1a1200] flex items-center gap-1.5 shadow-lg">
                    <span className="w-1 h-1 rounded-full bg-[#1a1200] animate-pulse" />
                    Halogen
                  </div>
                  <div className="absolute top-3 right-3 bg-beam-400/95 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold text-[#001018] flex items-center gap-1.5 shadow-lg">
                    <span className="w-1 h-1 rounded-full bg-[#001018] animate-pulse" />
                    BILED
                  </div>
                </div>

                <div className="p-5 md:p-6">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <Chip tone="beam" size="xs">
                      {item.service}
                    </Chip>
                    <Chip tone="neutral" size="xs">
                      {item.category}
                    </Chip>
                  </div>
                  <h3 className="font-display text-lg md:text-xl font-bold text-white mb-1 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-beam-400/80 mb-3">{item.vehicle}</p>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Photometric metadata — turns subjective claim into number */}
                  {(item.luxBefore || item.luxAfter || item.durationDays) && (
                    <dl className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5">
                      {item.luxBefore !== undefined && (
                        <div>
                          <dt className="text-[10px] uppercase tracking-widest text-text-tertiary mb-0.5">
                            Sebelum
                          </dt>
                          <dd className="text-sm font-semibold text-halo-300 tabular">
                            {item.luxBefore.toLocaleString("id-ID")} lx
                          </dd>
                        </div>
                      )}
                      {item.luxAfter !== undefined && (
                        <div>
                          <dt className="text-[10px] uppercase tracking-widest text-text-tertiary mb-0.5">
                            Sesudah
                          </dt>
                          <dd className="text-sm font-semibold text-beam-400 tabular">
                            {item.luxAfter.toLocaleString("id-ID")} lx
                          </dd>
                        </div>
                      )}
                      {item.durationDays !== undefined && (
                        <div>
                          <dt className="text-[10px] uppercase tracking-widest text-text-tertiary mb-0.5">
                            Pengerjaan
                          </dt>
                          <dd className="text-sm font-semibold text-white tabular flex items-center gap-1">
                            <FaClock size={10} className="text-text-tertiary" />
                            {item.durationDays} hari
                          </dd>
                        </div>
                      )}
                    </dl>
                  )}
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.4}>
          <div className="text-center mt-12 space-y-4">
            <p className="text-sm text-text-secondary">
              Mau headlamp Anda begini juga?
            </p>
            <Button
              href="/portfolio"
              variant="primary"
              size="lg"
              rightIcon={<FaArrowRight size={14} />}
            >
              Lihat Lebih Banyak Hasil
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
