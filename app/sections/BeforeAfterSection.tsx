"use client";

import { motion } from "framer-motion";
import AnimatedSection from "../components/AnimatedSection";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

export default function BeforeAfterSection() {
  const comparisons = [
    {
      title: "BILED Retrofit - Toyota Avanza",
      before:
        "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&auto=format&fit=crop",
      after:
        "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&auto=format&fit=crop",
      description: "Dari kuning kusam ke putih tajam 6000K",
    },
    {
      title: "D2 Laser Upgrade - Honda Jazz",
      before:
        "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&auto=format&fit=crop",
      after:
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&auto=format&fit=crop",
      description: "Cahaya kristal dengan cut-off sempurna",
    },
  ];

  return (
    <section className="py-20 px-6 lg:px-20 bg-surface/30">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-black mb-4">
              <span className="text-glow">Before</span> vs{" "}
              <span className="text-glow">After</span>
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Lihat transformasi dramatis dari lampu standar ke custom lighting
              presisi. Geser untuk membandingkan!
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8">
          {comparisons.map((item, index) => (
            <AnimatedSection key={index} delay={index * 0.2}>
              <div className="glass rounded-2xl overflow-hidden">
                <div className="relative h-80">
                  <ReactCompareSlider
                    itemOne={
                      <ReactCompareSliderImage
                        src={item.before}
                        alt="Before"
                      />
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
                  <div className="absolute top-4 left-4 bg-red-500/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold">
                    BEFORE
                  </div>
                  <div className="absolute top-4 right-4 bg-green-500/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold">
                    AFTER
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-2">
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
              className="inline-block px-8 py-4 bg-linear-to-r from-primary to-cyan-400 text-black font-bold rounded-lg glow-primary"
            >
              Lihat Lebih Banyak Hasil
            </motion.a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
