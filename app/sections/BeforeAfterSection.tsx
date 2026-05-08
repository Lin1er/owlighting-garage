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
import type { GalleryImage } from "@/lib/supabase";

type Props = {
  comparisons: GalleryImage[];
};

export default function BeforeAfterSection({ comparisons }: Props) {
  if (comparisons.length === 0) return null;

  return (
    <section className="section-y bg-bg-raised">
      <div className="container-x">
        <SectionHeader
          eyebrow="Bukti Hasil Pengerjaan"
          title="Geser slider — lihat"
          accent="bedanya"
          titleSuffix="sendiri."
          accentTone="italic"
          description="Cahaya kuning kusam bawaan pabrik bisa kami sulap jadi tajam, putih bersih (6000 K), dan ber-cutoff rapi tanpa menyilaukan pengguna jalan lain."
        />

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {comparisons.slice(0, 4).map((item, index) => (
            <AnimatedSection key={item.id} delay={index * 0.15}>
              <article className="glass-strong rounded-2xl overflow-hidden border border-white/5 hover:border-beam-400/20 transition-colors">
                <div className="relative h-72 md:h-96">
                  <ReactCompareSlider
                    itemOne={
                      <ReactCompareSliderImage
                        src={item.before_image_url}
                        alt={`${item.vehicle ?? item.title} sebelum upgrade`}
                      />
                    }
                    itemTwo={
                      <ReactCompareSliderImage
                        src={item.after_image_url}
                        alt={`${item.vehicle ?? item.title} setelah upgrade`}
                      />
                    }
                    className="h-full"
                    style={{ height: "100%" }}
                  />

                  {/* Halogen / BILED labels — dual-tone reinforce */}
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
                    {item.service_tag && (
                      <Chip tone="beam" size="xs">
                        {item.service_tag}
                      </Chip>
                    )}
                    <Chip tone="neutral" size="xs">
                      {item.category}
                    </Chip>
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-1 leading-tight tracking-tight">
                    {item.title}
                  </h3>
                  {item.vehicle && (
                    <p className="text-sm text-beam-400/80 mb-3">{item.vehicle}</p>
                  )}
                  {item.description && (
                    <p className="text-text-secondary text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>
                  )}

                  {(item.lux_before || item.lux_after || item.duration_days) && (
                    <dl className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5">
                      {item.lux_before != null && (
                        <div>
                          <dt className="text-[10px] uppercase tracking-widest text-text-tertiary mb-0.5">
                            Sebelum
                          </dt>
                          <dd className="text-sm font-semibold text-halo-300 tabular">
                            {item.lux_before.toLocaleString("id-ID")} lx
                          </dd>
                        </div>
                      )}
                      {item.lux_after != null && (
                        <div>
                          <dt className="text-[10px] uppercase tracking-widest text-text-tertiary mb-0.5">
                            Sesudah
                          </dt>
                          <dd className="text-sm font-semibold text-beam-400 tabular">
                            {item.lux_after.toLocaleString("id-ID")} lx
                          </dd>
                        </div>
                      )}
                      {item.duration_days != null && (
                        <div>
                          <dt className="text-[10px] uppercase tracking-widest text-text-tertiary mb-0.5">
                            Pengerjaan
                          </dt>
                          <dd className="text-sm font-semibold text-white tabular flex items-center gap-1">
                            <FaClock size={10} className="text-text-tertiary" />
                            {item.duration_days} hari
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
