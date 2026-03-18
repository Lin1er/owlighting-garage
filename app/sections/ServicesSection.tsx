"use client";

import AnimatedSection from "../components/AnimatedSection";
import ServiceCard from "../components/ServiceCard";
import { services } from "@/data";
import StatsSection from "./StatsSection";

export default function ServicesSection() {
  return (
    <section id="services" className="relative px-6 lg:px-20">
      <StatsSection />
      <div className="max-w-7xl mx-auto mt-10">
        <AnimatedSection>
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold mb-4 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              SOLUSI PENCERAHAN
            </div>
            <h2 className="text-4xl lg:text-5xl font-black mb-4 text-glow">
              Layanan Bengkel Kami
            </h2>
            <p className="text-muted mb-16 max-w-2xl mx-auto">
              Mulai dari upgrade BILED/Projie yang sangat terang namun aman,
              hingga perbaikan (Servis Headlamp) dan variasi. Semua pengerjaan
              dijamin rapi, presisi, dan bergaransi!
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              delay={index * 0.2}
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
