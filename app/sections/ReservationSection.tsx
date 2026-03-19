"use client";

import AnimatedSection from "../components/AnimatedSection";
import { motion } from "framer-motion";
import { useState } from "react";
import { contactInfo, services } from "@/data";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaInstagram, FaFacebook, FaTiktok, FaArrowRight } from "react-icons/fa";

export default function ReservationSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    vehicle: "Mobil",
    service: "BILED Retrofit",
    date: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, phone, vehicle, service, date } = formData;
    const message = `Reservasi Owlighting\n\nNama: ${name}\nNo HP: ${phone}\nJenis: ${vehicle}\nLayanan: ${service}\nTanggal: ${date}`;
    const whatsappUrl = `https://wa.me/${
      contactInfo.whatsappNumber
    }?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section id="reservation" className="relative py-20 sm:py-24 px-6 lg:px-20">
      {/* Background image */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=1920&auto=format&fit=crop)",
          }}
        />
      </div>

      {/* Section divider */}
      <div className="section-divider mb-16 md:mb-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatedSection>
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold mb-4 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              TANYA-TANYA DULU BOLEH
            </div>
            <h2 className="text-4xl lg:text-5xl font-black mb-4">
              <span className="gradient-text">Konsultasi</span> & Reservasi
            </h2>
            <p className="text-muted mb-10 max-w-2xl mx-auto text-sm lg:text-base">
              Punya kendala dengan lampu kendaraan yang kurang terang? Atau
              ingin pasang BILED custom? Hubungi kami untuk mendapatkan{" "}
              <strong className="text-white">konsultasi gratis</strong> dan estimasi harga.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-start">
          {/* Contact Info */}
          <AnimatedSection delay={0.2}>
            <div className="space-y-4">
              <motion.a
                href={contactInfo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 8 }}
                className="flex items-start gap-4 glass-strong rounded-xl p-5 border border-white/5 hover:border-primary/20 transition-colors block"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <FaMapMarkerAlt size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-1 text-white">
                    Alamat Workshop
                  </h3>
                  <p className="text-muted text-sm">{contactInfo.address}</p>
                  <p className="text-xs text-primary/70 mt-2">
                    {contactInfo.workingHours}
                  </p>
                </div>
              </motion.a>

              <motion.a
                href={`https://wa.me/${contactInfo.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 8 }}
                className="flex items-start gap-4 glass-strong rounded-xl p-5 border border-white/5 hover:border-primary/20 transition-colors block"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <FaPhone size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-1 text-white">WhatsApp</h3>
                  <p className="text-muted text-sm">{contactInfo.phone}</p>
                  <p className="text-xs text-primary/70 mt-2">
                    Fast response untuk konsultasi
                  </p>
                </div>
              </motion.a>

              <motion.a
                href={`mailto:${contactInfo.email}`}
                whileHover={{ x: 8 }}
                className="flex items-start gap-4 glass-strong rounded-xl p-5 border border-white/5 hover:border-primary/20 transition-colors block"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <FaEnvelope size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-1 text-white">Email</h3>
                  <p className="text-muted text-sm">{contactInfo.email}</p>
                  <p className="text-xs text-primary/70 mt-2">
                    Untuk pertanyaan detail & penawaran
                  </p>
                </div>
              </motion.a>

              {/* Social Media */}
              <div className="glass-strong rounded-xl p-5 border border-white/5">
                <h3 className="font-bold mb-3 text-white">Follow Kami</h3>
                <div className="flex gap-3">
                  <a
                    href={contactInfo.socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary/15 transition-all border border-white/5 hover:border-primary/30"
                  >
                    <FaInstagram size={20} className="text-white/70 hover:text-primary" />
                  </a>
                  <a
                    href={contactInfo.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary/15 transition-all border border-white/5 hover:border-primary/30"
                  >
                    <FaFacebook size={20} className="text-white/70" />
                  </a>
                  <a
                    href={contactInfo.socialMedia.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary/15 transition-all border border-white/5 hover:border-primary/30"
                  >
                    <FaTiktok size={20} className="text-white/70" />
                  </a>
                </div>
              </div>

              {/* Google Maps iframe */}
              <div className="rounded-xl overflow-hidden border border-white/5 h-48">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.4828234435536!2d105.69069977576999!3d-5.18651375232907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e408b56d808543d%3A0xfe041c69b4ae9a81!2sOWLighting%20Garage!5e0!3m2!1sen!2sus!4v1773880081745!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </AnimatedSection>

          {/* Reservation Form */}
          <AnimatedSection delay={0.4}>
            <form
              onSubmit={handleSubmit}
              className="glass-strong gradient-border-card rounded-2xl p-6 md:p-8 space-y-5 border border-white/5"
            >
              <h3 className="text-xl font-bold text-white mb-2">
                Kirim Pesan via WhatsApp
              </h3>
              <p className="text-xs text-muted mb-4">
                Isi form di bawah, Anda akan diarahkan ke WhatsApp kami
              </p>

              <div>
                <label className="block text-sm font-semibold mb-2 text-white/80">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-primary focus:bg-white/8 outline-none transition-all text-white placeholder-muted/50"
                  placeholder="Nama Anda"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-white/80">
                  No. HP / WhatsApp
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-primary focus:bg-white/8 outline-none transition-all text-white placeholder-muted/50"
                  placeholder="08xxxxxxxxxx"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-white/80">
                    Jenis Kendaraan
                  </label>
                  <select
                    value={formData.vehicle}
                    onChange={(e) =>
                      setFormData({ ...formData, vehicle: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-primary outline-none transition-all text-white"
                  >
                    <option className="bg-surface text-white">Mobil</option>
                    <option className="bg-surface text-white">Motor</option>
                    <option className="bg-surface text-white">Truk</option>
                    <option className="bg-surface text-white">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-white/80">
                    Rencana Tanggal
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-primary outline-none transition-all text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-white/80">
                  Layanan yang Diinginkan
                </label>
                <select
                  value={formData.service}
                  onChange={(e) =>
                    setFormData({ ...formData, service: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-primary outline-none transition-all text-white"
                >
                  {services.map((svc) => (
                    <option key={svc.id} className="bg-surface text-white">
                      {svc.title}
                    </option>
                  ))}
                  <option className="bg-surface text-white">Konsultasi</option>
                </select>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="group w-full px-8 py-4 bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-black font-bold rounded-xl glow-primary-strong hover:shadow-2xl transition-all flex items-center justify-center gap-2"
              >
                Kirim via WhatsApp
                <FaArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
