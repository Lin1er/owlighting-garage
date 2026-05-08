import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import LoadingScreen from "./components/LoadingScreen";
import GoogleAnalytics from "./components/GoogleAnalytics";
import { ToastProvider } from "./components/ui/Toast";

// Body sans — clean, modern, kept from previous build for consistency
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

// Editorial display — italic serif gives the site a "workshop atelier"
// magazine feel that purely sans-serif templates can't replicate. The
// occasional italic headline becomes the brand's signature voice.
const instrumentSerif = Instrument_Serif({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

// Technical mono — used for specs, coordinates, dimensions, and any
// number that should read as engineering-precise rather than marketing.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-tech",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "Custom BILED Lampung Timur | Owlighting - Spesialis Pasang BILED Mobil & Motor #MenolakGelap",
    template: "%s | Owlighting - Custom BILED Lampung Timur",
  },
  description:
    "Owlighting adalah bengkel spesialis Custom BILED di Lampung Timur. Jasa pasang BILED mobil & motor, retrofit projector, D2 Laser, DRL Matrix, poles kaca lampu nano burn. Garansi resmi, pengerjaan rapi. Konsultasi GRATIS! #MenolakGelap",
  keywords: [
    // Primary Keywords - Custom BILED focused
    "custom biled",
    "custom biled lampung",
    "custom biled lampung timur",
    "pasang custom biled",
    "jasa custom biled",
    "custom biled mobil",
    "custom biled motor",
    "biled custom",
    // Secondary Keywords
    "pasang biled",
    "pasang biled terdekat",
    "pasang biled lampung timur",
    "retrofit biled",
    "biled retrofit lampung",
    "harga pasang biled",
    "bengkel biled terdekat",
    // Long-tail Keywords
    "bengkel lampu mobil lampung timur",
    "bengkel lampu motor lampung timur",
    "pasang projie motor lampung",
    "poles kaca lampu mobil lampung",
    "nano burn coating lampung",
    "servis headlamp lampung timur",
    // Brand Keywords
    "owlighting",
    "owlighting garage",
    "owlighting lampung timur",
    "owlighting way jepara",
    // Service Keywords
    "d2 laser lampung",
    "drl matrix custom",
    "custom headlight indonesia",
    "upgrade lampu mobil",
    "retrofit lampu projector",
    // Location Keywords
    "bengkel lampu way jepara",
    "bengkel lampu sumberjo",
    "modifikasi lampu lampung",
    // Hashtag
    "menolak gelap",
  ],
  authors: [{ name: "Owlighting Garage", url: "https://owlighting-garage.vercel.app" }],
  creator: "Owlighting Garage",
  publisher: "Owlighting Garage",
  category: "Automotive",
  classification: "Business/Automotive Services",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://owlighting-garage.vercel.app"),
  alternates: {
    canonical: "https://owlighting-garage.vercel.app",
    languages: {
      "id-ID": "https://owlighting-garage.vercel.app",
    },
  },
  openGraph: {
    title: "Custom BILED Lampung Timur | Owlighting Garage - Spesialis Pasang BILED #MenolakGelap",
    description:
      "Bengkel spesialis Custom BILED di Lampung Timur. Pasang BILED mobil & motor dengan garansi resmi. Retrofit projector, D2 Laser, DRL Matrix, poles kaca lampu. Konsultasi GRATIS!",
    url: "https://owlighting-garage.vercel.app",
    siteName: "Owlighting Garage - Custom BILED Lampung Timur",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Owlighting Garage - Custom BILED Lampung Timur | Spesialis Pasang BILED Mobil Motor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom BILED Lampung Timur | Owlighting Garage #MenolakGelap",
    description:
      "Spesialis Custom BILED & retrofit projector di Lampung Timur. Pasang BILED mobil motor dengan garansi. Konsultasi GRATIS!",
    images: ["/og-image.jpg"],
    creator: "@owlighting",
    site: "@owlighting",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google:
      process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION ||
      "jJHGCMuoy94jnBqTSb921m99iNlXYSH5YDjl1YJnpxI",
  },
  other: {
    "google-site-verification": "jJHGCMuoy94jnBqTSb921m99iNlXYSH5YDjl1YJnpxI",
    "msvalidate.01": "",
    "yandex-verification": "",
    "facebook-domain-verification": "",
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
        className={`${geistSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} antialiased grain-bg`}
      >
        <Analytics />
        <ToastProvider>
          <LoadingScreen />
          {/* Background overlay components (FloatingParticles / AnimatedGridBackground /
              InteractiveBackground) were intentionally removed — they piled up enough
              ambient motion that the site read as a "demo template." A single
              SVG-grain texture on the body now does the atmospheric work without
              the AI-flat feel. */}
          <div className="relative z-10">{children}</div>
        </ToastProvider>
      </body>
    </html>
  );
}
