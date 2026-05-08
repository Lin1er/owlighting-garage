"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import AnimatedSection from "../components/AnimatedSection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { DynamicIcon } from "../components/DynamicIcon";
import { services as staticServices } from "@/data";
import { SectionHeader } from "../components/ui/SectionHeader";
import { Button } from "../components/ui/Button";
import { Chip } from "../components/ui/Chip";
import { PriceTag } from "../components/ui/PriceTag";
import { buildWhatsAppLink, buildServiceInquiry } from "@/lib/whatsapp";
import {
  FaWhatsapp,
  FaArrowRight,
  FaMapMarkerAlt,
  FaCheck,
  FaChevronDown,
  FaTrophy,
  FaCog,
  FaCheckCircle,
} from "react-icons/fa";
import { contactInfo } from "@/data";

type FAQ = {
  icon: string;
  question: string;
  answer: React.ReactNode;
};

const FAQS: FAQ[] = [
  {
    icon: "FaFire",
    question: "Apakah Custom BILED Aman? Tidak Akan Terbakar?",
    answer: (
      <>
        Sangat aman jika instalasi dilakukan dengan benar. Di Owlighting, kami menggunakan
        relay proteksi, fuse, dan kabel proper gauge (sesuai ampere). Semua sambungan custom
        BILED dilindungi heatshrink waterproof.{" "}
        <strong className="text-white">5+ tahun beroperasi, 500+ kendaraan, 0 kasus terbakar.</strong>
      </>
    ),
  },
  {
    icon: "FaBatteryFull",
    question: "Apakah Aki Bisa Soak / Tekor Setelah Pasang Custom BILED?",
    answer: (
      <>
        Tidak. Kami pakai sistem relay yang memisahkan beban dari aki langsung. Plus socket &
        fuse untuk proteksi maksimal. Konsumsi daya custom BILED bahkan lebih rendah dari
        halogen (35W vs 55W).{" "}
        <strong className="text-white">Instalasi sesuai SOP keamanan elektrikal otomotif.</strong>
      </>
    ),
  },
  {
    icon: "FaBolt",
    question: "Apa Bedanya Custom BILED di Owlighting dengan Tempat Lain?",
    answer: (
      <ul className="space-y-2 list-none">
        <li>
          <strong className="text-white">Owlighting:</strong> kabel tembaga murni, relay
          Bosch/Tyco, ballast branded (Morimoto/AC/Osram), wiring rapih seperti factory
          install, heatshrink waterproof, garansi instalasi.
        </li>
        <li>
          <strong className="text-danger">Tempat asal-asalan:</strong> kabel asal nyambung,
          tidak pakai relay/fuse, ballast KW, sambungan lakban, rawan konslet.
        </li>
      </ul>
    ),
  },
  {
    icon: "FaLightbulb",
    question: "Berapa Lama Garansi Custom BILED di Owlighting?",
    answer: (
      <>
        Garansi 1 tahun untuk komponen custom BILED (ballast, bulb) dan instalasi kelistrikan.
        Jika ada masalah dalam periode garansi, kami perbaiki atau ganti gratis.{" "}
        <strong className="text-white">After-sales support siap membantu kapan pun.</strong>
      </>
    ),
  },
  {
    icon: "FaCar",
    question: "Mobil / Motor Saya Bisa Dipasang Custom BILED?",
    answer: (
      <>
        Hampir semua kendaraan bisa dipasang custom BILED — dari mobil Jepang, Eropa, Korea,
        hingga motor. Kami akan survey headlamp Anda terlebih dahulu untuk menentukan
        projector custom BILED yang cocok dan bracket yang dibutuhkan.{" "}
        <strong className="text-white">Konsultasi gratis via WhatsApp.</strong>
      </>
    ),
  },
  {
    icon: "FaRuler",
    question: "Berapa Lama Pengerjaan Pasang Custom BILED?",
    answer: (
      <>
        Retrofit custom BILED standar: 1-2 hari. Custom project (DRL, lazy eyes, dll): 3-5 hari
        tergantung kompleksitas. Kami tidak buru-buru karena detail dan keamanan adalah
        prioritas. <strong className="text-white">Quality over speed.</strong>
      </>
    ),
  },
  {
    icon: "FaMoneyBillWave",
    question: "Berapa Harga Pasang Custom BILED di Owlighting?",
    answer: (
      <>
        Harga bervariasi tergantung jenis kendaraan dan projector yang dipilih. Mulai dari Rp
        1.5 juta untuk motor hingga Rp 3-5 juta untuk mobil. Hubungi via WhatsApp untuk
        konsultasi & penawaran terbaik.{" "}
        <strong className="text-white">Konsultasi & survey GRATIS.</strong>
      </>
    ),
  },
];

const HIGHLIGHTS = [
  {
    icon: FaTrophy,
    title: "Pengalaman 5+ Tahun",
    body: "500+ kendaraan telah dipercaya — dari retrofit standar hingga project custom extreme.",
  },
  {
    icon: FaCog,
    title: "Teknologi In-House",
    body: "CNC Laser & 3D Printer di workshop kami — fabrikasi presisi tanpa outsource.",
  },
  {
    icon: FaCheckCircle,
    title: "Garansi Resmi",
    body: "Garansi 1 tahun untuk setiap instalasi. After-sales support siap membantu kapan pun.",
  },
];

export default function ServicesClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="relative">
      <Navbar />

      {/* Hero */}
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
            className="text-left max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono-tech text-[11px] tabular text-beam-400">CHAPTER 03</span>
              <span aria-hidden className="h-px w-12 bg-text-tertiary/40" />
              <span className="eyebrow">Layanan</span>
            </div>
            <h1 className="text-[clamp(2.75rem,7vw,5.5rem)] font-bold tracking-tight leading-[1.02] mb-7">
              <span className="text-white">Layanan </span>
              <span className="font-editorial italic">Custom BILED</span>
              <br />
              <span className="text-white">&amp; retrofit </span>
              <span className="font-editorial italic">presisi.</span>
            </h1>
            <p className="text-base md:text-lg text-text-secondary max-w-2xl leading-relaxed">
              Spesialis pasang <span className="text-white font-semibold">Custom BILED</span>{" "}
              mobil dan motor di Lampung Timur. Dari BILED Retrofit hingga D2 Laser, DRL Matrix,
              dan Neonbox Huruf Timbul.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services grid */}
      <section className="section-y" id="layanan-custom-biled">
        <div className="container-x">
          <SectionHeader
            eyebrow="Daftar Layanan"
            title="Tujuh layanan,"
            accent="satu workshop."
            accentTone="italic"
            description="Setiap layanan didukung tim teknisi yang sama, peralatan yang sama, dan SOP keamanan yang sama. Konsisten dari job pertama sampai kelima ratus."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {staticServices.map((service, index) => (
              <AnimatedSection key={service.id} delay={index * 0.06}>
                <motion.article
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.24, ease: [0.32, 0.72, 0, 1] }}
                  className="glass rounded-2xl p-6 md:p-7 h-full border border-white/5 hover:border-beam-400/30 transition-colors flex flex-col"
                  itemScope
                  itemType="https://schema.org/Service"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-beam-400/10 flex items-center justify-center shrink-0">
                      <DynamicIcon
                        name={service.icon}
                        size={26}
                        className="text-beam-400"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3
                          className="text-xl md:text-2xl font-bold text-white leading-tight"
                          itemProp="name"
                        >
                          {service.title}
                        </h3>
                        {service.category && (
                          <Chip tone="halo" size="xs">
                            {service.category}
                          </Chip>
                        )}
                      </div>
                      <p
                        className="text-text-secondary text-sm leading-relaxed"
                        itemProp="description"
                      >
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {(service.priceFrom || service.duration) && (
                    <div className="flex items-end justify-between gap-3 py-4 border-y border-white/5 mb-5">
                      <PriceTag
                        from={service.priceFrom ?? null}
                        note={service.duration}
                        size="md"
                      />
                    </div>
                  )}

                  <div className="mb-5 flex-1">
                    <p className="text-[10px] uppercase tracking-widest text-text-tertiary font-bold mb-3">
                      Termasuk dalam paket
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-sm text-text-secondary"
                        >
                          <FaCheck size={11} className="text-beam-400 mt-1 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    href={buildWhatsAppLink({
                      message: buildServiceInquiry(service.title),
                    })}
                    external
                    variant="primary"
                    size="md"
                    fullWidth
                    leftIcon={<FaWhatsapp size={14} />}
                    rightIcon={<FaArrowRight size={11} />}
                  >
                    Konsultasi Gratis
                  </Button>
                </motion.article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="section-y bg-bg-raised" id="kenapa-pilih-owlighting">
        <div className="container-x">
          <SectionHeader
            eyebrow="Kenapa Owlighting"
            title="Tiga hal yang"
            accent="tidak kami kompromikan."
            accentTone="italic"
            description="Bukan janji marketing — ini standar minimum yang berlaku di setiap pengerjaan, dari customer ke-1 sampai ke-500."
          />

          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {HIGHLIGHTS.map((h, i) => (
              <AnimatedSection key={h.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.24, ease: [0.32, 0.72, 0, 1] }}
                  className="glass-strong rounded-2xl p-6 md:p-8 text-center border border-white/5 h-full"
                >
                  <div className="inline-flex w-14 h-14 rounded-xl mb-5 items-center justify-center bg-beam-400/10">
                    <h.icon size={24} className="text-beam-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white leading-tight">
                    {h.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{h.body}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — accordion */}
      <section className="section-y" id="faq-custom-biled">
        <div className="container-x max-w-4xl">
          <SectionHeader
            eyebrow="Tanya Jawab"
            title="Pertanyaan yang"
            accent="paling sering ditanya."
            accentTone="italic"
            description="Kalau ada pertanyaan lain yang belum terjawab, langsung WhatsApp kami — tim akan jawab dalam menit, bukan jam."
            maxWidth="max-w-xl"
          />

          <div className="space-y-3">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <AnimatedSection key={faq.question} delay={i * 0.04}>
                  <article
                    className={`glass rounded-2xl border transition-colors overflow-hidden ${
                      isOpen ? "border-beam-400/30 bg-beam-400/[0.03]" : "border-white/5"
                    }`}
                    itemScope
                    itemType="https://schema.org/Question"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full px-5 py-4 md:px-6 md:py-5 flex items-center gap-4 text-left"
                      aria-expanded={isOpen}
                    >
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                          isOpen ? "bg-beam-400/15" : "bg-white/5"
                        }`}
                      >
                        <DynamicIcon
                          name={faq.icon}
                          size={16}
                          className="text-beam-400"
                        />
                      </div>
                      <h3
                        className="text-base md:text-lg font-bold text-white leading-tight flex-1"
                        itemProp="name"
                      >
                        {faq.question}
                      </h3>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-text-tertiary shrink-0"
                      >
                        <FaChevronDown size={14} />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.24, ease: [0.32, 0.72, 0, 1] }}
                          className="overflow-hidden"
                          itemScope
                          itemProp="acceptedAnswer"
                          itemType="https://schema.org/Answer"
                        >
                          <div
                            className="px-5 pb-5 md:px-6 md:pb-6 pl-[68px] md:pl-[80px] text-sm md:text-base text-text-secondary leading-relaxed"
                            itemProp="text"
                          >
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </article>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-y bg-bg-raised" id="hubungi-owlighting">
        <div className="container-x max-w-4xl text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-bold mb-5 leading-tight tracking-tight">
              Siap pasang{" "}
              <span className="font-editorial italic">Custom BILED</span>
              <span className="text-white"> di kendaraan Anda?</span>
            </h2>
            <p className="text-text-secondary text-base md:text-lg mb-8 max-w-2xl mx-auto">
              Konsultasi gratis untuk menentukan setup terbaik untuk kendaraan Anda di Lampung Timur.
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
                WhatsApp Konsultasi Gratis
              </Button>
              <Button
                href={contactInfo.googleMapsUrl}
                external
                variant="secondary"
                size="lg"
                leftIcon={<FaMapMarkerAlt size={14} className="text-beam-400" />}
              >
                Lokasi Workshop
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </main>
  );
}
