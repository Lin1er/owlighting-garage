"use client";

import AnimatedSection from "../components/AnimatedSection";
import { motion } from "framer-motion";
import { useState } from "react";
import { contactInfo } from "@/data";

export default function ReservationSection() {
  const [formData, setFormData] = useState({
    name: "",
    vehicle: "Mobil",
    service: "BILED Retrofit",
    date: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, vehicle, service, date } = formData;
    const message = `Reservasi Owlighting\n\nNama: ${name}\nJenis: ${vehicle}\nLayanan: ${service}\nTanggal: ${date}`;
    const whatsappUrl = `https://wa.me/${
      contactInfo.whatsappNumber
    }?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section id="reservation" className="relative sm:py-24 px-6 lg:px-20">
      {/* Background image */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=1920&auto=format&fit=crop)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatedSection>
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold mb-4 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              TANYA-TANYA DULU BOLEH
            </div>
            <h2 className="text-4xl lg:text-5xl font-black mb-4 text-glow">
              Konsultasi & Reservasi
            </h2>
            <p className="text-muted mb-10 max-w-2xl mx-auto text-sm lg:text-base">
              Punya kendala dengan lampu kendaraan yang kurang terang? Atau
              ingin pasang BILED custom? <br />
              Hubungi kami untuk mendapatkan <strong>
                konsultasi gratis
              </strong>{" "}
              dan estimasi harga pengerjaan.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <AnimatedSection delay={0.2}>
            <div className="space-y-6">
              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-start gap-4 glass rounded-xl p-6"
              >
                <div className="text-3xl">📍</div>
                <div>
                  <h3 className="font-bold mb-1 text-primary">
                    Alamat Workshop
                  </h3>
                  <p className="text-muted">{contactInfo.address}</p>
                  <p className="text-sm text-muted mt-2">
                    {contactInfo.workingHours}
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-start gap-4 glass rounded-xl p-6"
              >
                <div className="text-3xl">📱</div>
                <div>
                  <h3 className="font-bold mb-1 text-primary">WhatsApp</h3>
                  <p className="text-muted">{contactInfo.phone}</p>
                  <p className="text-sm text-muted mt-2">
                    Fast response untuk konsultasi
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-start gap-4 glass rounded-xl p-6"
              >
                <div className="text-3xl">📧</div>
                <div>
                  <h3 className="font-bold mb-1 text-primary">Email</h3>
                  <p className="text-muted">{contactInfo.email}</p>
                  <p className="text-sm text-muted mt-2">
                    Untuk pertanyaan detail & penawaran
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-start gap-4 glass rounded-xl p-6"
              >
                <div className="text-3xl">🌐</div>
                <div>
                  <h3 className="font-bold mb-1 text-primary">Social Media</h3>
                  <div className="flex gap-4 mt-2">
                    <a
                      href={contactInfo.socialMedia.instagram}
                      className="text-muted hover:text-glow hover:underline transition-colors"
                    >
                      Instagram
                    </a>
                    <a
                      href={contactInfo.socialMedia.facebook}
                      className="text-muted hover:text-glow hover:underline transition-colors"
                    >
                      Facebook
                    </a>
                    <a
                      href={contactInfo.socialMedia.tiktok}
                      className="text-muted hover:text-glow hover:underline transition-colors"
                    >
                      TikTok
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Reservation Form */}
          <AnimatedSection delay={0.4}>
            <form
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-8 space-y-6"
            >
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-surface border border-primary/20 rounded-lg focus:border-primary outline-none transition-colors bg-[#0d0d0d]"
                  placeholder="Masukkan nama Anda"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Jenis Kendaraan
                </label>
                <select
                  value={formData.vehicle}
                  onChange={(e) =>
                    setFormData({ ...formData, vehicle: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-surface border border-primary/20 rounded-lg focus:border-primary outline-none transition-colors bg-[#0d0d0d]"
                >
                  <option>Mobil</option>
                  <option>Motor</option>
                  <option>Truk</option>
                  <option>Lainnya</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Layanan yang Diinginkan
                </label>
                <select
                  value={formData.service}
                  onChange={(e) =>
                    setFormData({ ...formData, service: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-surface border border-primary/20 rounded-lg focus:border-primary outline-none transition-colors bg-[#0d0d0d]"
                >
                  <option>BILED Retrofit</option>
                  <option>D2 Laser / Foglamp</option>
                  <option>Custom CNC & 3D</option>
                  <option>Konsultasi</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Rencana Tanggal
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-surface border border-primary/20 rounded-lg focus:border-primary outline-none transition-colors bg-[#0d0d0d]"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full px-8 py-4 bg-cyan-400 hover:bg-cyan-300 text-black font-bold rounded-lg glow-primary hover:shadow-2xl transition-all"
              >
                Kirim via WhatsApp
              </motion.button>

              <p className="text-xs text-muted text-center">
                Dengan mengirim form ini, Anda akan diarahkan ke WhatsApp kami
              </p>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
