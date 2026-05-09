import { Metadata } from "next";
import ServicesClient from "./ServicesClient";
import { getServices } from "@/lib/api";

export const metadata: Metadata = {
  title: "Layanan Custom BILED & Retrofit Lampung Timur | Pasang BILED Mobil Motor",
  description:
    "Daftar layanan Custom BILED di Owlighting Lampung Timur: Pasang BILED retrofit mobil & motor, D2 Laser, DRL Matrix, poles kaca lampu nano burn, custom headlight. Garansi resmi, konsultasi GRATIS!",
  keywords: [
    "layanan custom biled",
    "pasang custom biled",
    "custom biled mobil",
    "custom biled motor",
    "harga pasang biled",
    "jasa pasang biled lampung",
    "retrofit biled lampung timur",
    "d2 laser lampung",
    "drl matrix custom",
    "poles kaca lampu",
    "nano burn coating",
    "bengkel biled lampung timur",
    "owlighting services",
  ],
  alternates: {
    canonical: "https://owlighting-garage.vercel.app/services",
  },
  openGraph: {
    title: "Layanan Custom BILED Lampung Timur | Owlighting Garage",
    description:
      "Spesialis pasang Custom BILED mobil & motor di Lampung Timur. Retrofit BILED, D2 Laser, DRL Matrix, poles kaca lampu. Garansi resmi!",
    url: "https://owlighting-garage.vercel.app/services",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Layanan Custom BILED Owlighting Lampung Timur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Layanan Custom BILED | Owlighting Lampung Timur",
    description: "Pasang Custom BILED mobil & motor dengan garansi. D2 Laser, DRL Matrix, poles kaca lampu.",
  },
};

export default async function ServicesPage() {
  const services = await getServices();
  return <ServicesClient services={services} />;
}
