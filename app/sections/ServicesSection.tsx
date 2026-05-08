"use client";

import ServiceCard from "../components/ServiceCard";
import { services } from "@/data";
import { SectionHeader } from "../components/ui/SectionHeader";

export default function ServicesSection() {
  return (
    <section id="services" className="section-y relative">
      <div className="container-x relative">
        <SectionHeader
          badge="Layanan Custom BILED"
          title="Layanan"
          accent="Custom BILED"
          titleSuffix="Kami"
          accentTone="beam"
          description={
            <>
              Spesialis pasang <strong className="text-white">Custom BILED</strong> mobil dan
              motor di Lampung Timur. Dari retrofit BILED yang sangat terang namun aman, D2 Laser,
              DRL Matrix, hingga poles kaca lampu. Semua pengerjaan dijamin rapi, presisi, dan
              bergaransi.
            </>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              icon={service.icon}
              features={service.features}
              id={service.id}
              delay={index * 0.08}
              priceFrom={service.priceFrom}
              category={service.category}
              duration={service.duration}
            />
          ))}
        </div>

        {/* Single decorative ambient glow — was duplicated before */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 -translate-y-1/2 right-0 w-96 h-96 bg-beam-400/[0.04] rounded-full blur-3xl -z-10"
        />
      </div>
    </section>
  );
}
