"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FaWhatsapp, FaTimes } from "react-icons/fa";

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_CUSTOMER_SERVICE || "6281377722316";

  const quickMessages = [
    "Halo, saya mau tanya tentang BILED retrofit",
    "Berapa harga pasang BILED untuk mobil saya?",
    "Apakah bisa konsultasi gratis?",
    "Mau lihat portfolio hasil pekerjaan",
  ];

  const sendWhatsApp = (message: string) => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
    setIsOpen(false);
  };

  return (
    <>
      {/* Quick Message Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 w-80 max-w-[calc(100vw-3rem)]"
          >
            <div className="glass rounded-2xl p-4 border border-primary/20 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                    <FaWhatsapp size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Owlighting</h4>
                    <p className="text-xs text-green-400">● Online</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-muted hover:text-white"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <p className="text-sm text-muted mb-3">
                Pilih pesan cepat atau tulis sendiri:
              </p>

              <div className="space-y-2">
                {quickMessages.map((msg, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => sendWhatsApp(msg)}
                    className="w-full text-left p-3 bg-surface/50 hover:bg-surface rounded-lg text-sm text-muted hover:text-white transition-all border border-primary/10 hover:border-primary/30"
                  >
                    {msg}
                  </motion.button>
                ))}
              </div>

              <button
                onClick={() =>
                  sendWhatsApp("Halo Owlighting, saya ingin konsultasi.")
                }
                className="w-full mt-3 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors"
              >
                Tulis Pesan Custom
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-2xl"
        style={{
          boxShadow: "0 0 20px rgba(37, 211, 102, 0.5)",
        }}
      >
        <motion.div
          animate={isOpen ? { rotate: 0 } : { rotate: 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <FaTimes size={28} className="text-white" />
          ) : (
            <FaWhatsapp size={32} className="text-white" />
          )}
        </motion.div>

        {/* Notification Dot */}
        {!isOpen && (
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.8, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-background"
          />
        )}
      </motion.button>
    </>
  );
}

function AnimatePresence({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
