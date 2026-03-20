import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "Tentang Owlighting - Bengkel Spesialis Custom BILED Lampung Timur",
  description:
    "Owlighting adalah bengkel spesialis Custom BILED di Way Jepara, Lampung Timur. Berdiri sejak 2019, telah melayani 500+ kendaraan dengan garansi resmi. Teknologi CNC & 3D printing in-house. #MenolakGelap",
  keywords: [
    "tentang owlighting",
    "owlighting lampung timur",
    "bengkel custom biled lampung",
    "bengkel biled way jepara",
    "custom biled lampung timur",
    "owlighting garage",
    "workshop biled lampung",
    "spesialis lampu kendaraan",
    "retrofit projector lampung",
  ],
  alternates: {
    canonical: "https://owlighting-garage.vercel.app/about",
  },
  openGraph: {
    title: "Tentang Owlighting - Spesialis Custom BILED Lampung Timur",
    description:
      "Bengkel spesialis Custom BILED di Lampung Timur sejak 2019. 500+ kendaraan telah dipercaya. Workshop lengkap dengan CNC & 3D printing.",
    url: "https://owlighting-garage.vercel.app/about",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Workshop Owlighting - Custom BILED Lampung Timur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tentang Owlighting | Custom BILED Lampung Timur",
    description: "Bengkel spesialis Custom BILED di Lampung Timur. 500+ kendaraan dipercaya sejak 2019.",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
