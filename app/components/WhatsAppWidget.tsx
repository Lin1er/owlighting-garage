"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaWhatsapp, FaTimes } from "react-icons/fa";
import { contactInfo } from "@/data";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const QUICK_MESSAGES = [
  "Halo, saya mau tanya tentang BILED Retrofit",
  "Berapa estimasi pasang BILED untuk mobil saya?",
  "Apakah bisa konsultasi gratis dulu?",
  "Mau lihat hasil pengerjaan terbaru",
];

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const sendWhatsApp = (message: string) => {
    window.open(
      buildWhatsAppLink({ message, to: contactInfo.whatsappNumber }),
      "_blank",
      "noopener,noreferrer",
    );
    setIsOpen(false);
  };

  return (
    <>
      {/* Quick-message popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.24, ease: [0.32, 0.72, 0, 1] }}
            className="fixed bottom-24 right-6 z-50 w-80 max-w-[calc(100vw-3rem)]"
          >
            <div className="glass-strong rounded-2xl p-4 border border-success/20 shadow-2xl shadow-black/40">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-success flex items-center justify-center">
                    <FaWhatsapp size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">Owlighting</h4>
                    <p className="text-[11px] text-success flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                      Online · response &lt; 5 menit
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-text-tertiary hover:text-white transition-colors"
                  aria-label="Tutup"
                >
                  <FaTimes size={16} />
                </button>
              </div>

              <p className="text-xs text-text-secondary mb-3">
                Pilih pesan cepat atau tulis sendiri:
              </p>

              <div className="space-y-2">
                {QUICK_MESSAGES.map((msg, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => sendWhatsApp(msg)}
                    className="w-full text-left p-3 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-text-secondary hover:text-white transition-colors border border-white/5 hover:border-success/30"
                  >
                    {msg}
                  </motion.button>
                ))}
              </div>

              <button
                onClick={() => sendWhatsApp("Halo Owlighting, saya ingin konsultasi.")}
                className="w-full mt-3 px-4 py-2.5 bg-success hover:bg-success/90 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Tulis Pesan Custom
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 md:w-16 md:h-16 bg-success hover:bg-success/90 rounded-full flex items-center justify-center shadow-2xl"
        style={{
          boxShadow: "0 0 24px rgba(52, 211, 153, 0.45), 0 0 48px rgba(52, 211, 153, 0.18)",
        }}
        aria-label={isOpen ? "Tutup quick-chat" : "Buka quick-chat WhatsApp"}
      >
        {isOpen ? (
          <FaTimes size={22} className="text-white" />
        ) : (
          <FaWhatsapp size={26} className="text-white" />
        )}

        {/* Pulse indicator (only when closed) */}
        {!isOpen && (
          <span
            aria-hidden
            className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-danger border-2 border-bg-base animate-pulse"
          />
        )}
      </motion.button>
    </>
  );
}
