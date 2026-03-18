"use client";

import { motion } from "framer-motion";
import AnimatedSection from "../components/AnimatedSection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { DynamicIcon } from "../components/DynamicIcon";
import { services } from "@/data";
import Image from "next/image";

export default function ServicesPage() {
  return (
    <main className="relative">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <AnimatedSection>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl lg:text-7xl font-black mb-6 text-center"
            >
              Layanan <span className="text-glow">Kami</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-muted text-center max-w-3xl mx-auto leading-relaxed"
            >
              Dari BILED Retrofit hingga Neonbox Huruf Timbul. Solusi lengkap
              pencahayaan & signage dengan teknologi presisi tinggi.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center mt-4"
            >
              <span className="text-accent font-bold text-2xl">
                #MenolakGelap
              </span>
            </motion.p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <AnimatedSection key={service.id} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="glass rounded-2xl p-8 h-full"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div>
                      <DynamicIcon
                        name={service.icon}
                        size={48}
                        className="text-primary"
                      />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-primary mb-2">
                        {service.title}
                      </h2>
                      <p className="text-muted leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-semibold text-white mb-3">Features:</h3>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-muted"
                        >
                          <span className="text-accent">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const phone = "6281377722316";
                      const message = `Halo, saya tertarik dengan layanan ${service.title}`;
                      window.open(
                        `https://wa.me/${phone}?text=${encodeURIComponent(
                          message
                        )}`,
                        "_blank"
                      );
                    }}
                    className="mt-6 w-full py-3 bg-cyan-400 hover:bg-cyan-300 text-black font-bold rounded-lg glow-primary"
                  >
                    Konsultasi Sekarang
                  </motion.button>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 px-6 lg:px-20 bg-surface/30">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl font-black text-center mb-12 text-glow">
              Kenapa Pilih Owlighting?
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedSection delay={0.2}>
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <DynamicIcon
                    name="FaTrophy"
                    size={64}
                    className="text-primary"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3 text-primary">
                  Pengalaman 5+ Tahun
                </h3>
                <p className="text-muted">
                  Ratusan kendaraan telah dipercaya kepada kami. Dari retrofit
                  standar hingga project extreme.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <DynamicIcon
                    name="FaCog"
                    size={64}
                    className="text-primary"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3 text-primary">
                  Teknologi In-House
                </h3>
                <p className="text-muted">
                  CNC Laser & 3D Printer di workshop kami. Custom fabrication
                  tanpa perlu outsource.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <DynamicIcon
                    name="FaCheckCircle"
                    size={64}
                    className="text-primary"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3 text-primary">
                  Garansi & Support
                </h3>
                <p className="text-muted">
                  Garansi resmi untuk setiap instalasi. After-sales support siap
                  membantu.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl font-black text-center mb-4 text-glow">
              Pertanyaan Seputar BILED & Retrofit
            </h2>
            <p className="text-center text-muted mb-12">
              Jawaban untuk kekhawatiran umum tentang keamanan retrofit lampu
            </p>
          </AnimatedSection>

          <div className="space-y-6">
            <AnimatedSection delay={0.2}>
              <div className="glass rounded-xl p-6">
                <h3 className="text-xl font-bold text-primary mb-3 flex items-center gap-3">
                  <DynamicIcon
                    name="FaFire"
                    size={24}
                    className="text-primary"
                  />
                  Apakah BILED Aman? Tidak Akan Terbakar?
                </h3>
                <p className="text-muted leading-relaxed">
                  Sangat aman jika instalasi dilakukan dengan benar! Di
                  Owlighting, kami menggunakan relay proteksi, fuse, dan kabel
                  proper gauge (sesuai ampere). Semua sambungan dilindungi
                  heatshrink waterproof.{" "}
                  <span className="text-white font-semibold">
                    5+ tahun beroperasi, ratusan kendaraan, 0 kasus terbakar.
                  </span>
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="glass rounded-xl p-6">
                <h3 className="text-xl font-bold text-primary mb-3 flex items-center gap-3">
                  <DynamicIcon
                    name="FaBatteryFull"
                    size={24}
                    className="text-primary"
                  />
                  Apakah Aki Bisa Soak/Tekor?
                </h3>
                <p className="text-muted leading-relaxed">
                  Tidak! Kami pakai sistem relay yang memisahkan beban dari aki
                  langsung. Plus socket & fuse untuk proteksi maksimal. Konsumsi
                  daya BILED bahkan lebih rendah dari halogen biasa (35W vs
                  55W).{" "}
                  <span className="text-white font-semibold">
                    Instalasi sesuai SOP keamanan elektrikal otomotif.
                  </span>
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className="glass rounded-xl p-6">
                <h3 className="text-xl font-bold text-primary mb-3 flex items-center gap-3">
                  <DynamicIcon
                    name="FaBolt"
                    size={24}
                    className="text-primary"
                  />
                  Apa Bedanya Instalasi Owlighting dengan Tempat Lain?
                </h3>
                <p className="text-muted leading-relaxed">
                  <strong className="text-white">Owlighting:</strong> Kabel
                  tembaga murni, relay Bosch/Tyco, ballast branded
                  (Morimoto/AC/Osram), wiring rapih seperti factory install,
                  heatshrink waterproof, garansi instalasi.
                  <br />
                  <strong className="text-red-400">
                    Tempat Asal-asalan:
                  </strong>{" "}
                  Kabel asal nyambung, tidak pakai relay/fuse, ballast KW,
                  sambungan lakban, rawan konslet.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.5}>
              <div className="glass rounded-xl p-6">
                <h3 className="text-xl font-bold text-primary mb-3 flex items-center gap-3">
                  <DynamicIcon
                    name="FaLightbulb"
                    size={24}
                    className="text-primary"
                  />
                  Berapa Lama Garansi?
                </h3>
                <p className="text-muted leading-relaxed">
                  Garansi 1 tahun untuk komponen (ballast, bulb) dan instalasi
                  kelistrikan. Jika ada masalah dalam periode garansi, kami
                  perbaiki atau ganti gratis.{" "}
                  <span className="text-white font-semibold">
                    After-sales support siap membantu kapan pun.
                  </span>
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.6}>
              <div className="glass rounded-xl p-6">
                <h3 className="text-xl font-bold text-primary mb-3 flex items-center gap-3">
                  <DynamicIcon
                    name="FaCar"
                    size={24}
                    className="text-primary"
                  />
                  Mobil Saya Bisa Dipasang BILED?
                </h3>
                <p className="text-muted leading-relaxed">
                  Hampir semua kendaraan bisa! Dari mobil Jepang, Eropa, Korea,
                  hingga motor. Kami akan survey headlamp Anda terlebih dahulu
                  untuk menentukan projector yang cocok dan bracket yang
                  dibutuhkan.{" "}
                  <span className="text-white font-semibold">
                    Konsultasi gratis via WhatsApp!
                  </span>
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.7}>
              <div className="glass rounded-xl p-6">
                <h3 className="text-xl font-bold text-primary mb-3 flex items-center gap-3">
                  <DynamicIcon
                    name="FaRuler"
                    size={24}
                    className="text-primary"
                  />
                  Berapa Lama Pengerjaan?
                </h3>
                <p className="text-muted leading-relaxed">
                  Retrofit standar: 1-2 hari. Custom project (DRL, lazy eyes,
                  dll): 3-5 hari tergantung kompleksitas. Kami tidak buru-buru
                  karena detail dan keamanan adalah prioritas.{" "}
                  <span className="text-white font-semibold">
                    Quality over speed!
                  </span>
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-4xl font-black mb-6 text-glow">
              Siap Upgrade Lighting Anda?
            </h2>
            <p className="text-muted text-lg mb-8">
              Konsultasi gratis untuk menentukan solusi terbaik
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="https://wa.me/6281377722316?text=Halo,%20saya%20ingin%20konsultasi%20tentang%20layanan%20Owlighting"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-cyan-400 hover:bg-cyan-300 text-black font-bold rounded-lg glow-primary text-lg inline-flex items-center gap-3 justify-center"
              >
                <DynamicIcon name="FaComments" size={24} />
                WhatsApp Kami
              </motion.a>
              <motion.a
                href="https://maps.app.goo.gl/MvXVMty2vPcaZEB28"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 border-2 border-primary/30 text-white font-semibold rounded-lg hover:bg-primary/10 hover:border-primary transition-all inline-flex items-center gap-3 justify-center"
              >
                <DynamicIcon name="FaMapMarkerAlt" size={24} />
                Lokasi Workshop
              </motion.a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </main>
  );
}
