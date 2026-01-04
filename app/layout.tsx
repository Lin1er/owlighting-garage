import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import InteractiveBackground from "./components/InteractiveBackground";
import AnimatedGridBackground from "./components/AnimatedGridBackground";
import FloatingParticles from "./components/FloatingParticles";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Owlighting - BILED Retrofit Lampung Timur | Custom Lampu Mobil & Motor #MenolakGelap",
  description:
    "Owlighting Garage - Spesialis BILED retrofit, D2 Laser, custom headlight di Lampung Timur. Teknologi CNC & 3D Printing untuk lampu mobil & motor. Way Jepara, Lampung. Slimframe, Custom Akrilik, Neonbox. Konsultasi Gratis!",
  keywords: [
    "biled lampung timur",
    "owlighting",
    "owlighting garage",
    "retrofit lampu lampung",
    "custom headlight lampung",
    "bengkel lampu way jepara",
    "biled retrofit lampung",
    "d2 laser lampung",
    "custom drl lampung",
    "upgrade lampu mobil lampung",
    "lampu motor custom lampung",
    "cnc laser lampung timur",
    "3d printing lampung",
    "slimframe",
    "custom akrilik",
    "neon box lampung",
    "neonbox huruf timbul",
    "menolak gelap",
    "bengkel lampu terbaik lampung",
    "retrofit hid lampung",
  ],
  authors: [{ name: "Owlighting Garage" }],
  creator: "Owlighting",
  publisher: "Owlighting Garage",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://owlighting.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Owlighting - BILED Retrofit Lampung Timur | #MenolakGelap",
    description:
      "Spesialis BILED retrofit, D2 Laser, custom headlight di Lampung Timur. CNC & 3D Printing. Slimframe, Custom Akrilik, Neonbox Huruf Timbul. Way Jepara, Lampung.",
    url: "https://owlighting.com",
    siteName: "Owlighting Garage",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Owlighting - Custom Pencahayaan Kendaraan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Owlighting - BILED Retrofit Lampung Timur",
    description:
      "Spesialis BILED retrofit & custom headlight di Lampung Timur. #MenolakGelap",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Nanti ganti dengan kode verifikasi Google Search Console
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="canonical" href="https://owlighting.com" />
        <meta name="geo.region" content="ID-LA" />
        <meta name="geo.placename" content="Lampung Timur" />
        <meta name="geo.position" content="-5.234567;105.678901" />
        <meta name="ICBM" content="-5.234567, 105.678901" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Animated Grid Background */}
        <AnimatedGridBackground />
        
        {/* Floating Light Particles */}
        <FloatingParticles />
        
        {/* Interactive Highbeam Spotlight */}
        <InteractiveBackground />
        
        {/* Main Content */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
