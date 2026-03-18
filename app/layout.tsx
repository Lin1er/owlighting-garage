import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import InteractiveBackground from "./components/InteractiveBackground";
import AnimatedGridBackground from "./components/AnimatedGridBackground";
import FloatingParticles from "./components/FloatingParticles";
import LoadingScreen from "./components/LoadingScreen";
import GoogleAnalytics from "./components/GoogleAnalytics";

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
    "Owlighting - Pasang Custom BILED & Bengkel Lampu Kendaraan Lampung Timur | #MenolakGelap",
  description:
    "Bengkel spesialis lampu kendaraan: Pasang Custom BILED, servis headlamp motor/mobil, pasang projie, poles kaca lampu (nano burn), custom DRL Matrix, D2 Laser di Lampung Timur. Konsultasi Gratis!",
  keywords: [
    "custom biled",
    "pasang biled terdekat",
    "bengkel lampu mobil",
    "bengkel lampu motor",
    "pasang projie motor",
    "bengkel lampu kendaraan",
    "poles kaca lampu mobil",
    "nano burn coating",
    "servis lampu mobil",
    "servis headlamp",
    "biled matrix",
    "drl matrix",
    "lampu projie mobil",
    "biled lampung timur",
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
    "menolak gelap",
  ],
  authors: [{ name: "Owlighting Garage" }],
  creator: "Owlighting",
  publisher: "Owlighting Garage",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://owlighting-garage.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Owlighting Garage - Pasang Custom BILED & Bengkel Lampu Terdekat",
    description:
      "Spesialis custom lampu kendaraan: Pasang BILED retrofit, D2 Laser, Nano Burn Coating, DRL Matrix untuk motor & mobil. #MenolakGelap Lampung Timur.",
    url: "https://owlighting-garage.vercel.app",
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
    google:
      process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION ||
      "your-google-verification-code",
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
        <link rel="canonical" href="https://owlighting-garage.vercel.app" />
        <meta
          name="google-site-verification"
          content="jJHGCMuoy94jnBqTSb921m99iNlXYSH5YDjl1YJnpxI"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#00C2FF" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="Owlighting" />
        <meta name="geo.region" content="ID-LA" />
        <meta name="geo.placename" content="Lampung Timur" />
        <meta name="geo.position" content="-5.234567;105.678901" />
        <meta name="ICBM" content="-5.234567, 105.678901" />
        <GoogleAnalytics />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics />
        {/* Loading Screen */}
        <LoadingScreen />

        {/* Animated Grid Background */}
        <AnimatedGridBackground />

        {/* Floating Light Particles */}
        <FloatingParticles />

        {/* Interactive Highbeam Spotlight */}
        <InteractiveBackground />

        {/* Main Content */}
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
