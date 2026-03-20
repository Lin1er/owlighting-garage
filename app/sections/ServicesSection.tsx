"use client";

import AnimatedSection from "../components/AnimatedSection";
import ServiceCard from "../components/ServiceCard";
import { services } from "@/data";
import StatsSection from "./StatsSection";

export default function ServicesSection() {
  return (
    <section id="services" className="relative px-6 lg:px-20">
      <StatsSection />

      {/* Section divider */}
      <div className="section-divider my-12 md:my-16" />

      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold mb-4 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              LAYANAN CUSTOM BILED
            </div>
            <h2 className="text-4xl lg:text-5xl font-black mb-4">
              Layanan <span className="gradient-text">Custom BILED</span> Kami
            </h2>
            <p className="text-muted mb-16 max-w-2xl mx-auto">
              Spesialis pasang <strong>Custom BILED</strong> mobil dan motor di Lampung Timur.
              Dari retrofit BILED yang sangat terang namun aman, D2 Laser, DRL Matrix,
              hingga poles kaca lampu. Semua pengerjaan dijamin rapi, presisi, dan bergaransi!
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              icon={service.icon}
              features={service.features}
              id={service.id}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 pulse-glow" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10 pulse-glow" />
      </div>
    </section>
  );
}
