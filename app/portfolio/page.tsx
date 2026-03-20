import { Metadata } from "next";
import PortfolioClient from "./PortfolioClient";

export const metadata: Metadata = {
  title: "Portfolio Custom BILED Mobil & Motor | Hasil Pengerjaan Owlighting",
  description:
    "Lihat hasil pengerjaan Custom BILED mobil dan motor di Owlighting Lampung Timur. 500+ kendaraan telah dipercaya. Portfolio retrofit BILED, D2 Laser, DRL Matrix dengan hasil berkualitas dan garansi resmi.",
  keywords: [
    "portfolio custom biled",
    "hasil custom biled",
    "galeri custom biled",
    "custom biled mobil",
    "custom biled motor",
    "retrofit biled alphard",
    "retrofit biled civic",
    "custom biled mercedes",
    "biled ninja",
    "biled r15",
    "owlighting portfolio",
    "hasil retrofit lampung",
  ],
  alternates: {
    canonical: "https://owlighting-garage.vercel.app/portfolio",
  },
  openGraph: {
    title: "Portfolio Custom BILED | Owlighting Lampung Timur",
    description:
      "Galeri hasil pengerjaan Custom BILED mobil & motor. 500+ kendaraan telah dipercaya dengan hasil berkualitas.",
    url: "https://owlighting-garage.vercel.app/portfolio",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Portfolio Custom BILED Owlighting Lampung Timur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio Custom BILED | Owlighting",
    description: "Galeri hasil Custom BILED mobil & motor di Lampung Timur. 500+ kendaraan dipercaya.",
  },
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}
