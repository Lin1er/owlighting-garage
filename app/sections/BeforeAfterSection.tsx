"use client";

import { motion } from "framer-motion";
import AnimatedSection from "../components/AnimatedSection";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import { FaArrowRight } from "react-icons/fa";

export default function BeforeAfterSection() {
  const comparisons = [
    {
      title: "BILED Retrofit - Toyota Avanza",
      before:
        "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&auto=format&fit=crop",
      after:
        "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&auto=format&fit=crop",
      description: "Dari kuning kusam ke putih tajam 6000K",
      service: "BILED Retrofit",
    },
    {
      title: "D2 Laser Upgrade - Honda Jazz",
      before:
        "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&auto=format&fit=crop",
      after:
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&auto=format&fit=crop",
      description: "Cahaya kristal dengan cut-off sempurna",
      service: "D2 Laser",
    },
  ];

  return (
    <section className="py-20 px-6 lg:px-20 bg-surface/30">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold mb-4 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              BUKTI HASIL PENGERJAAN
            </div>
            <h2 className="text-4xl lg:text-5xl font-black mb-4">
              <span className="gradient-text">Sebelum</span> &{" "}
              <span className="gradient-text">Sesudah</span> Upgrade
            </h2>
            <p className="text-muted max-w-2xl mx-auto mb-12">
              Buktikan sendiri bedanya! Cahaya kuning / buram bawaan pabrik bisa
              disulap jadi jauh lebih tebal, terang, putih bersih (6000K), dan
              ber-cutoff rapi sehingga tidak menyilaukan orang lain.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8">
          {comparisons.map((item, index) => (
            <AnimatedSection key={index} delay={index * 0.2}>
              <div className="glass-strong rounded-2xl overflow-hidden group hover:border-primary/20 transition-colors">
                <div className="relative h-80 md:h-96">
                  <ReactCompareSlider
                    itemOne={
                      <ReactCompareSliderImage src={item.before} alt="Before" />
                    }
                    itemTwo={
                      <ReactCompareSliderImage src={item.after} alt="After" />
                    }
                    className="h-full"
                    style={{
                      height: "100%",
                    }}
                  />
                  {/* Labels */}
                  <div className="absolute top-4 left-4 bg-red-500/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    BEFORE
                  </div>
                  <div className="absolute top-4 right-4 bg-emerald-500/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    AFTER
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-semibold">
                      {item.service}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-muted text-sm">{item.description}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.6}>
          <div className="text-center mt-12">
            <motion.a
              href="/portfolio"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-black font-bold rounded-xl glow-primary shadow-xl"
            >
              Lihat Lebih Banyak Hasil
              <FaArrowRight size={14} />
            </motion.a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
