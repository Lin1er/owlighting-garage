"use client";

import AnimatedSection from "../components/AnimatedSection";
import { FaArrowRight } from "react-icons/fa";
import { SectionHeader } from "../components/ui/SectionHeader";
import { Button } from "../components/ui/Button";
import { Chip } from "../components/ui/Chip";
import { contactInfo } from "@/data";
import type { Service, WhyChooseItem } from "@/lib/supabase";

type Props = {
  services: Service[];
  whyChooseUs: WhyChooseItem[];
};

/**
 * Long-form SEO block at the bottom of the homepage.
 *
 * Previously held three duplicated copies of content already shown
 * elsewhere on the page (services list + why-choose list + a 4-reason
 * recap). Now derives services & reasons from the *same* CMS rows shown
 * in the Services section / About page, so there's a single source of
 * truth and admin edits propagate everywhere.
 */
export default function SEOContentSection({ services, whyChooseUs }: Props) {
  // First 4 reasons surfaced as a numbered list; full why-choose grid lives on /about.
  const topReasons = whyChooseUs.slice(0, 4);

  return (
    <section className="section-y bg-bg-raised" id="seo-content">
      <div className="container-x">
        <SectionHeader
          index="08"
          eyebrow="Tentang Custom BILED"
          title="Custom BILED Lampung Timur,"
          accent="dijelaskan."
          accentTone="italic"
          description="Bagi yang baru pertama dengar 'BILED' — bagian ini menjelaskan apa, kenapa, dan bagaimana kami mengerjakannya."
        />

        <AnimatedSection>
          <article className="glass-strong rounded-2xl p-6 md:p-10 mb-8 border border-white/5">
            <h3 className="text-xl md:text-2xl font-semibold mb-3 text-white tracking-tight">
              Apa itu <span className="font-editorial italic">Custom BILED?</span>
            </h3>
            <p className="text-text-secondary leading-relaxed mb-6">
              <strong className="text-white">Custom BILED</strong> (Bi-LED Projector) adalah lampu
              projector LED yang dipasang (retrofit) ke dalam headlamp kendaraan Anda. Berbeda
              dengan lampu LED biasa, custom BILED memiliki projector dengan cut-off yang presisi
              sehingga pencahayaan lebih fokus, terang maksimal, namun tidak menyilaukan
              pengendara lain — solusi upgrade lampu terbaik untuk keamanan berkendara malam hari.
            </p>

            {services.length > 0 && (
              <div className="mt-8">
                <p className="text-[10px] uppercase tracking-widest text-text-tertiary font-bold mb-4">
                  Layanan Owlighting
                </p>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                  {services.slice(0, 6).map((s) => (
                    <li key={s.id} className="border-l-2 border-beam-400/30 pl-3 py-0.5">
                      <p className="text-sm font-semibold text-white">{s.title}</p>
                      {s.description && (
                        <p className="text-xs text-text-secondary leading-relaxed mt-0.5 line-clamp-2">
                          {s.description}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p className="text-text-secondary leading-relaxed mt-8 pt-6 border-t border-white/5">
              Owlighting melayani pemasangan custom BILED untuk wilayah{" "}
              <strong className="text-white">Lampung Timur</strong> dan sekitarnya — Way Jepara,
              Metro, Sukadana, Bandar Lampung, Lampung Tengah, dan Lampung Selatan (radius 100km
              dari workshop).
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Button
                href="/services"
                variant="primary"
                size="md"
                rightIcon={<FaArrowRight size={11} />}
              >
                Lihat Layanan Custom BILED
              </Button>
              <Button
                href="/portfolio"
                variant="secondary"
                size="md"
                rightIcon={<FaArrowRight size={11} />}
              >
                Lihat Hasil Custom BILED
              </Button>
            </div>
          </article>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass rounded-2xl p-6 border border-white/5">
              <Chip tone="beam" size="xs" className="mb-3">
                Lokasi Workshop
              </Chip>
              <h3 className="text-lg font-bold text-white mb-4">
                Bengkel Custom BILED Owlighting
              </h3>
              <address className="not-italic text-text-secondary leading-relaxed text-sm space-y-1">
                <p className="text-white font-semibold">Owlighting Garage</p>
                <p>{contactInfo.address}</p>
                <div className="pt-3 mt-3 border-t border-white/5 space-y-1">
                  <p>
                    <span className="text-text-tertiary">WhatsApp:</span>{" "}
                    <span className="text-white tabular">{contactInfo.phone}</span>
                  </p>
                  <p>
                    <span className="text-text-tertiary">Email:</span>{" "}
                    <span className="text-white">{contactInfo.email}</span>
                  </p>
                  <p>
                    <span className="text-text-tertiary">Jam:</span>{" "}
                    <span className="text-white">{contactInfo.workingHours}</span>
                  </p>
                </div>
              </address>
            </div>

            {topReasons.length > 0 && (
              <div className="glass rounded-2xl p-6 border border-white/5">
                <Chip tone="halo" size="xs" className="mb-3">
                  Empat Alasan
                </Chip>
                <h3 className="text-lg font-bold text-white mb-4">
                  Kenapa pilih Owlighting?
                </h3>
                <ol className="space-y-3.5">
                  {topReasons.map((reason, i) => (
                    <li key={reason.id} className="flex gap-3">
                      <span className="font-mono-tech text-base tabular text-beam-400 leading-none shrink-0 mt-1">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-white">{reason.title}</p>
                        {reason.description && (
                          <p className="text-xs text-text-secondary leading-relaxed mt-0.5 line-clamp-2">
                            {reason.description}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
