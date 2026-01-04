"use client";

import { motion } from "framer-motion";
import AnimatedSection from "../components/AnimatedSection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import { companyInfo, companyStory, whyChooseUs, facilities } from "@/data";

export default function AboutPage() {
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
              Tentang {companyInfo.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-muted text-center max-w-3xl mx-auto leading-relaxed"
            >
              {companyInfo.tagline}
            </motion.p>
          </AnimatedSection>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="relative h-96 rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&auto=format&fit=crop"
                  alt="Workshop"
                  fill
                  className="object-cover"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div>
                <h2 className="text-4xl font-black mb-6 text-primary">
                  Cerita Kami
                </h2>
                <div className="space-y-4 text-muted leading-relaxed">
                  {companyStory.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 lg:px-20 bg-surface/30">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl font-black text-center mb-12 text-glow">
              Mengapa Pilih Owlighting?
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="glass rounded-2xl p-6 h-full"
                >
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-primary">
                    {item.title}
                  </h3>
                  <p className="text-muted leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-20 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl font-black text-center mb-12">
              Fasilitas Workshop
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {facilities.map((facility, index) => (
              <AnimatedSection key={index} delay={0.2 + index * 0.1}>
                <div className="relative h-80 rounded-2xl overflow-hidden group">
                  <Image
                    src={facility.image}
                    alt={facility.title}
                    fill
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
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-4xl font-black mb-6 text-glow">
              Siap Upgrade Lampu Anda?
            </h2>
            <p className="text-muted text-lg mb-8">
              Konsultasi gratis untuk menentukan solusi terbaik untuk kendaraan
              Anda
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.getElementById("reservation");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                } else {
                  window.location.href = "/#reservation";
                }
              }}
              className="px-10 py-4 bg-linear-to-r from-primary to-cyan-400 text-black font-bold rounded-lg glow-primary text-lg"
            >
              Hubungi Kami Sekarang
            </motion.button>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </main>
  );
}
