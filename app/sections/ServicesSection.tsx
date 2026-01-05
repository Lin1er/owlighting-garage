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
          <h2 className="text-4xl lg:text-5xl font-black text-center mb-4 text-glow">
            Layanan Unggulan
          </h2>
          <p className="text-center text-muted mb-16 max-w-2xl mx-auto">
            Setiap layanan dirancang dengan presisi tinggi untuk memberikan
            hasil terbaik
          </p>
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
