"use client";

import { motion } from "framer-motion";
import AnimatedSection from "../components/AnimatedSection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import { DynamicIcon } from "../components/DynamicIcon";
import { companyStory, whyChooseUs, facilities, contactInfo } from "@/data";
import { SectionHeader } from "../components/ui/SectionHeader";
import { Button } from "../components/ui/Button";
import { Chip } from "../components/ui/Chip";
import { StatusDot } from "../components/ui/StatusDot";
import { useEffect, useState } from "react";
import { getOpenStatus } from "@/lib/operating-hours";
import { buildWhatsAppLink, buildServiceInquiry } from "@/lib/whatsapp";
import { FaWhatsapp, FaMapMarkerAlt, FaArrowRight, FaPhone, FaClock } from "react-icons/fa";

const SERVICE_AREAS = [
  "Lampung Timur (Way Jepara, Metro, Sukadana)",
  "Bandar Lampung",
  "Lampung Tengah",
  "Lampung Selatan",
  "Radius 100km dari Way Jepara",
];

export default function AboutClient() {
  const [openStatus, setOpenStatus] = useState(() =>
    getOpenStatus(contactInfo.workingHours),
  );

  useEffect(() => {
    const id = setInterval(() => {
      setOpenStatus((prev) => {
        const next = getOpenStatus(contactInfo.workingHours);
        return prev.open === next.open && prev.nextChange === next.nextChange
          ? prev
          : next;
      });
    }, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="relative">
      <Navbar />

      {/* Hero — page header */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(0,194,255,0.12), transparent 65%)",
          }}
        />
        <div className="container-x relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="text-center"
          >
            <Chip tone="beam" size="sm" className="mb-5">
              Tentang Owlighting
            </Chip>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6">
              Bukan bengkel{" "}
              <span className="gradient-text-dual">biasa</span>
              <br />
              <span className="text-white/90">untuk lampu kendaraan.</span>
            </h1>
            <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Spesialis <strong className="text-white">Custom BILED</strong> dan retrofit lampu
              kendaraan di Way Jepara, Lampung Timur. Sejak 2019, fokus pada presisi & keamanan
              instalasi yang tidak banyak workshop berani garansikan.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="section-y" id="cerita-owlighting">
        <div className="container-x">
          <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
            <AnimatedSection>
              <div className="relative aspect-[4/5] md:aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=900&auto=format&fit=crop"
                  alt="Workshop Owlighting - Spesialis Custom BILED Lampung Timur"
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/60 mb-1">
                    Workshop · est. 2019
                  </p>
                  <p className="font-display text-2xl font-black text-white">
                    Way Jepara, Lampung Timur
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div>
                <Chip tone="halo" size="sm" className="mb-4">
                  Cerita Kami
                </Chip>
                <h2 className="font-display text-3xl md:text-4xl font-black mb-6 leading-tight">
                  Dimulai dari{" "}
                  <span className="gradient-text-halo">garasi kecil</span>,
                  <br />
                  jadi <span className="gradient-text">studio rekayasa cahaya</span>.
                </h2>
                <div className="space-y-4 text-text-secondary leading-relaxed">
                  {companyStory.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Chip tone="beam" size="sm">5+ tahun</Chip>
                  <Chip tone="beam" size="sm">500+ kendaraan</Chip>
                  <Chip tone="success" size="sm">0 insiden</Chip>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-y bg-bg-raised" id="kenapa-owlighting">
        <div className="container-x">
          <SectionHeader
            badge="Mengapa Pilih Kami"
            title="Apa yang membuat"
            accent="Owlighting berbeda?"
            accentTone="dual"
            description="500+ kendaraan tidak datang dari iklan. Mereka datang karena rekomendasi pelanggan sebelumnya — dan inilah delapan alasannya."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {whyChooseUs.map((item, index) => (
              <AnimatedSection key={item.title} delay={index * 0.06}>
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.24, ease: [0.32, 0.72, 0, 1] }}
                  className="glass rounded-2xl p-5 h-full border border-white/5 hover:border-beam-400/30 transition-colors"
                >
                  <div className="w-11 h-11 rounded-xl bg-beam-400/10 flex items-center justify-center mb-4">
                    <DynamicIcon name={item.icon} size={20} className="text-beam-400" />
                  </div>
                  <h3 className="font-display text-base font-bold text-white mb-2 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </motion.article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="section-y" id="fasilitas-workshop">
        <div className="container-x">
          <SectionHeader
            badge="Fasilitas Workshop"
            title="Peralatan presisi,"
            accent="bukan kebetulan."
            description="Setiap fasilitas berdiri di workshop kami sendiri — bukan disewa atau di-outsource. Itu sebabnya kami bisa berkata 'di-cek ulang' untuk setiap pengerjaan."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {facilities.map((facility, index) => (
              <AnimatedSection key={facility.title} delay={index * 0.08}>
                <article className="relative aspect-[4/5] rounded-2xl overflow-hidden group">
                  <Image
                    src={facility.image}
                    alt={`${facility.title} - Fasilitas Custom BILED Owlighting`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-md text-[10px] uppercase tracking-widest font-bold backdrop-blur-md border ${
                        facility.color === "primary"
                          ? "bg-beam-400/15 text-beam-400 border-beam-400/30"
                          : "bg-halo-500/15 text-halo-300 border-halo-500/30"
                      }`}
                    >
                      {facility.color === "primary" ? "Beam" : "Halo"}
                    </span>
                  </div>
                  <div className="absolute bottom-5 left-5 right-5">
                    <h3 className="font-display text-lg md:text-xl font-bold text-white mb-1 leading-tight">
                      {facility.title}
                    </h3>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {facility.description}
                    </p>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="section-y bg-bg-raised" id="lokasi-owlighting">
        <div className="container-x">
          <SectionHeader
            badge="Lokasi Workshop"
            title="Mampir ke"
            accent="Way Jepara"
            description="Konsultasi langsung di workshop, lihat hasil pengerjaan customer terbaru, dan diskusi gratis tentang setup ideal untuk kendaraan Anda."
          />

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <AnimatedSection delay={0.1}>
              <div className="glass-strong rounded-2xl p-6 md:p-8 border border-white/5 h-full">
                <h3 className="font-display text-xl font-bold text-white mb-5">
                  Informasi Kontak
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-beam-400/10 flex items-center justify-center shrink-0">
                      <FaMapMarkerAlt size={16} className="text-beam-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-white text-sm mb-0.5">Alamat Workshop</p>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {contactInfo.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-beam-400/10 flex items-center justify-center shrink-0">
                      <FaPhone size={14} className="text-beam-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-white text-sm mb-0.5">WhatsApp</p>
                      <p className="text-sm text-text-secondary tabular">{contactInfo.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-beam-400/10 flex items-center justify-center shrink-0">
                      <FaClock size={14} className="text-beam-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-white text-sm mb-0.5">Jam Operasional</p>
                      <p className="text-sm text-text-secondary">{contactInfo.workingHours}</p>
                      <span className="inline-flex items-center gap-1.5 mt-2 text-xs text-text-tertiary">
                        <StatusDot open={openStatus.open} />
                        {openStatus.open ? "Buka sekarang" : "Sedang tutup"}
                        {openStatus.nextChange && ` · ${openStatus.nextChange}`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/5 flex gap-3">
                  <Button
                    href={contactInfo.googleMapsUrl}
                    external
                    variant="primary"
                    size="sm"
                    leftIcon={<FaMapMarkerAlt size={12} />}
                  >
                    Buka Maps
                  </Button>
                  <Button
                    href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                    variant="secondary"
                    size="sm"
                    leftIcon={<FaPhone size={11} />}
                  >
                    Telpon
                  </Button>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="glass-strong rounded-2xl p-6 md:p-8 border border-white/5 h-full">
                <h3 className="font-display text-xl font-bold text-white mb-3">
                  Area Layanan Custom BILED
                </h3>
                <p className="text-sm text-text-secondary mb-5">
                  Owlighting melayani pemasangan custom BILED untuk area Lampung dan sekitarnya:
                </p>
                <ul className="space-y-2.5">
                  {SERVICE_AREAS.map((area) => (
                    <li
                      key={area}
                      className="flex items-start gap-2.5 text-sm text-text-secondary"
                    >
                      <span className="text-beam-400 mt-0.5 shrink-0">✓</span>
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 p-4 rounded-xl bg-beam-400/5 border border-beam-400/10">
                  <p className="text-xs uppercase tracking-widest text-beam-400 mb-1 font-bold">
                    Drop-in Sukses?
                  </p>
                  <p className="text-sm text-white">
                    Untuk customer di luar radius 100km, kami sediakan paket pickup-drop untuk
                    headlamp Anda — tidak perlu kendaraan dibawa ke workshop.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-y">
        <div className="container-x max-w-4xl text-center">
          <AnimatedSection>
            <h2 className="font-display text-3xl md:text-5xl font-black mb-5 leading-tight">
              Siap upgrade dengan{" "}
              <span className="gradient-text">BILED Presisi?</span>
            </h2>
            <p className="text-text-secondary text-base md:text-lg mb-8 max-w-2xl mx-auto">
              Konsultasi gratis untuk menentukan setup BILED terbaik untuk kendaraan Anda — kami
              survey headlamp dulu sebelum memberi estimasi.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                href={buildWhatsAppLink({
                  message: buildServiceInquiry("Konsultasi Custom BILED"),
                })}
                external
                variant="primary"
                size="lg"
                leftIcon={<FaWhatsapp size={16} />}
              >
                Hubungi via WhatsApp
              </Button>
              <Button
                href={contactInfo.googleMapsUrl}
                external
                variant="secondary"
                size="lg"
                leftIcon={<FaMapMarkerAlt size={14} className="text-beam-400" />}
                rightIcon={<FaArrowRight size={12} />}
              >
                Lihat di Google Maps
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </main>
  );
}
