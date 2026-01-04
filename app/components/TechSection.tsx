"use client";

import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";
import Image from "next/image";

export default function TechSection() {
  return (
    <section id="tech" className="relative py-24 px-6 lg:px-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-surface/50 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatedSection>
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative h-100 rounded-2xl overflow-hidden group"
            >
              <Image
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&auto=format&fit=crop"
                alt="CNC Machine"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-6 left-6 text-2xl font-bold text-glow">
                CNC LASER
              </div>
            </motion.div>

            <div>
              <motion.h2
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-4xl lg:text-5xl font-black mb-6 text-glow"
              >
                Presisi Tanpa Kompromi
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-muted text-lg leading-relaxed mb-4"
              >
                Kami tidak sekadar memasang. Kami menciptakan.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-muted text-lg leading-relaxed"
              >
                Dengan{" "}
                <span className="text-primary font-semibold">
                  in-house CNC Laser
                </span>{" "}
                dan{" "}
                <span className="text-accent font-semibold">3D Printer</span>,
                kami membuat bracket, shroud, dan dudukan custom yang mustahil
                ditemukan di pasaran. Presisi milimeter untuk kendaraan apapun.
              </motion.p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <motion.h2
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-4xl lg:text-5xl font-black mb-6"
              >
                <span className="text-accent text-glow">3D Printing</span>{" "}
                Revolution
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-muted text-lg leading-relaxed mb-4"
              >
                Dari desain hingga produksi, semua dilakukan di bengkel kami.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-muted text-lg leading-relaxed"
              >
                Ingin DRL custom yang unik? Lazy eyes futuristik? Semua
                imajinasi Anda bisa kami cetak dan pasang dengan presisi
                sempurna.
              </motion.p>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative h-100 rounded-2xl overflow-hidden group order-1 md:order-2"
            >
              <Image
                src="https://images.unsplash.com/photo-1611117775350-ac3950990985?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="3D Printer"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
              <div
                className="absolute bottom-6 right-6 text-2xl font-bold"
                style={{
                  color: "#FFB800",
                  textShadow: "0 0 20px rgba(255,184,0,0.5)",
                }}
              >
                3D PRINTER
              </div>
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
