"use client";

import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { galleryImages, stats } from "@/data";

// Dynamic import to avoid SSR issues
const ReactCompareImage = dynamic(() => import("react-compare-image"), {
  ssr: false,
});

export default function GallerySection() {
  return (
    <section
      id="gallery"
      className="relative py-24 px-6 lg:px-20 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pulse-glow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl pulse-glow" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatedSection>
          <h2 className="text-4xl lg:text-5xl font-black text-center mb-4 text-glow">
            Galeri Transformasi
          </h2>
          <p className="text-center text-muted mb-16 max-w-2xl mx-auto">
            Geser untuk melihat perbedaan dramatis sebelum dan sesudah upgrade
            lampu
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {galleryImages.map((item, index) => (
            <AnimatedSection key={item.id} delay={0.2 + index * 0.2}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl h-100 md:h-180 compare-container"
              >
                <ReactCompareImage
                  leftImage={item.beforeImage}
                  rightImage={item.afterImage}
                  sliderLineColor={item.sliderColor}
                  sliderLineWidth={4}
                  handleSize={40}
                  hover={true}
                />
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg z-10">
                  <span className="text-sm font-semibold">{item.title}</span>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Stats */}
        <AnimatedSection delay={0.6}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.id}
                whileHover={{ scale: 1.1 }}
                className="glass rounded-xl p-6"
              >
                <div
                  className={`text-4xl font-black ${
                    index % 2 === 0 ? "text-primary" : "text-accent"
                  } mb-2`}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-muted">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
