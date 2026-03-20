"use client";

import { motion } from "framer-motion";
import AnimatedSection from "../components/AnimatedSection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import { DynamicIcon } from "../components/DynamicIcon";
import { companyInfo, companyStory, whyChooseUs, facilities } from "@/data";

export default function AboutClient() {
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
              className="text-5xl lg:text-7xl font-black mb-6 text-center text-glow"
            >
              Tentang Owlighting - Spesialis <span className="gradient-text">Custom BILED</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-muted text-center max-w-3xl mx-auto leading-relaxed"
            >
              Bengkel spesialis <strong>Custom BILED</strong> dan retrofit lampu kendaraan di Lampung Timur. 
              {companyInfo.tagline}
            </motion.p>
          </AnimatedSection>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-6 lg:px-20" id="cerita-owlighting">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="relative h-96 rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&auto=format&fit=crop"
                  alt="Workshop Owlighting - Spesialis Custom BILED Lampung Timur"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  className="object-cover"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div>
                <h2 className="text-4xl font-black mb-6 text-primary">
                  Cerita Owlighting - Bengkel Custom BILED Lampung Timur
                </h2>
                <div className="space-y-4 text-muted leading-relaxed">
                  {companyStory.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                  <p className="text-white font-semibold">
                    Sejak 2019, Owlighting telah melayani 500+ kendaraan dengan layanan custom BILED berkualitas. 
                    Kami berkomitmen memberikan hasil terbaik dengan garansi resmi untuk setiap pengerjaan.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 lg:px-20 bg-surface/30" id="kenapa-owlighting">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl font-black text-center mb-4 text-glow">
              Mengapa Pilih Owlighting untuk Custom BILED?
            </h2>
            <p className="text-center text-muted mb-12 max-w-2xl mx-auto">
              Alasan kenapa 500+ pelanggan mempercayakan custom BILED kendaraan mereka kepada Owlighting
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <motion.article
                  whileHover={{ y: -10 }}
                  className="glass rounded-2xl p-6 h-full"
                >
                  <div className="text-primary mb-4">
                    <DynamicIcon name={item.icon} size={48} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-primary">
                    {item.title}
                  </h3>
                  <p className="text-muted leading-relaxed">
                    {item.description}
                  </p>
                </motion.article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-20 px-6 lg:px-20" id="fasilitas-workshop">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl font-black text-center mb-4">
              Fasilitas Workshop Custom BILED Owlighting
            </h2>
            <p className="text-center text-muted mb-12 max-w-2xl mx-auto">
              Workshop lengkap dengan peralatan modern untuk menghasilkan custom BILED berkualitas tinggi
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {facilities.map((facility, index) => (
              <AnimatedSection key={index} delay={0.2 + index * 0.1}>
                <article className="relative h-80 rounded-2xl overflow-hidden group">
                  <Image
                    src={facility.image}
                    alt={`${facility.title} - Fasilitas Custom BILED Owlighting`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <h3
                      className="text-2xl font-bold mb-2"
                      style={{
                        color: facility.color,
                        textShadow: `0 0 20px ${facility.color}80`,
                      }}
                    >
                      {facility.title}
                    </h3>
                    <p className="text-sm text-muted">{facility.description}</p>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 px-6 lg:px-20 bg-surface/30" id="lokasi-owlighting">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl font-black text-center mb-4 text-glow">
              Lokasi Workshop Custom BILED Lampung Timur
            </h2>
            <p className="text-center text-muted mb-12 max-w-2xl mx-auto">
              Kunjungi workshop kami di Way Jepara, Lampung Timur untuk konsultasi langsung tentang custom BILED
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <AnimatedSection delay={0.2}>
              <div className="glass rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-primary mb-6">Informasi Kontak</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <DynamicIcon name="FaMapMarkerAlt" size={24} className="text-primary mt-1" />
                    <div>
                      <p className="font-semibold text-white">Alamat Workshop</p>
                      <p className="text-muted">Jl. Danau Km.1, Sumberjo, Way Jepara</p>
                      <p className="text-muted">Kabupaten Lampung Timur, Lampung 34396</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <DynamicIcon name="FaWhatsapp" size={24} className="text-primary mt-1" />
                    <div>
                      <p className="font-semibold text-white">WhatsApp</p>
                      <p className="text-muted">+62 856-5864-8413</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <DynamicIcon name="FaClock" size={24} className="text-primary mt-1" />
                    <div>
                      <p className="font-semibold text-white">Jam Operasional</p>
                      <p className="text-muted">Senin - Sabtu: 09.00 - 18.00 WIB</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="glass rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-primary mb-6">Area Layanan Custom BILED</h3>
                <p className="text-muted mb-4">
                  Owlighting melayani pemasangan custom BILED untuk area Lampung dan sekitarnya:
                </p>
                <ul className="space-y-2 text-muted">
                  <li className="flex items-center gap-2">
                    <span className="text-accent">✓</span> Lampung Timur (Way Jepara, Metro, Sukadana)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-accent">✓</span> Bandar Lampung
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-accent">✓</span> Lampung Tengah
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-accent">✓</span> Lampung Selatan
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-accent">✓</span> Dan sekitarnya (radius 100km)
                  </li>
                </ul>
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
              Siap Upgrade dengan Custom BILED?
            </h2>
            <p className="text-muted text-lg mb-8">
              Konsultasi gratis untuk menentukan solusi custom BILED terbaik untuk kendaraan Anda
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="https://wa.me/6285658648413?text=Halo%20Owlighting,%20saya%20ingin%20konsultasi%20tentang%20Custom%20BILED"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-cyan-400 hover:bg-cyan-300 text-black font-bold rounded-lg glow-primary text-lg inline-flex items-center gap-3 justify-center"
              >
                <DynamicIcon name="FaWhatsapp" size={24} />
                Hubungi Kami Sekarang
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
                Lihat di Google Maps
              </motion.a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </main>
  );
}
