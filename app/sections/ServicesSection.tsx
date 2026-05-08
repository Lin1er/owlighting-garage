"use client";

import ServiceCard from "../components/ServiceCard";
import { SectionHeader } from "../components/ui/SectionHeader";
import type { Service } from "@/lib/supabase";

type Props = {
  services: Service[];
};

export default function ServicesSection({ services }: Props) {
  return (
    <section id="services" className="section-y relative">
      <div className="container-x relative">
        <SectionHeader
          index="03"
          eyebrow="Daftar Layanan"
          title="Tujuh layanan,"
          accent="satu workshop."
          accentTone="italic"
          description="Dari retrofit BILED yang sangat terang namun aman, D2 Laser, DRL Matrix, hingga poles kaca lampu — setiap pengerjaan didukung tim teknisi yang sama, peralatan yang sama, dan SOP keamanan yang sama."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description ?? ""}
              icon={service.icon ?? "FaStar"}
              features={service.features ?? []}
              id={service.slug ?? undefined}
              delay={index * 0.08}
              priceFrom={service.price_from ?? undefined}
              category={service.category ?? undefined}
              duration={service.duration ?? undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
