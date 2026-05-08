import type { Metadata } from "next";
import Link from "next/link";
import {
  FaHome,
  FaVideo,
  FaImages,
  FaCog,
  FaStar,
  FaImage,
  FaCalendarCheck,
  FaSlidersH,
  FaChartBar,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { Geist, Space_Grotesk } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Admin Dashboard - Owlighting",
  description: "Manage website content",
  robots: { index: false, follow: false },
};

const navGroups = [
  {
    label: "Overview",
    items: [
      { href: "/admin", icon: FaHome, label: "Dashboard" },
    ],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/portfolio", icon: FaImages, label: "Portfolio" },
      { href: "/admin/gallery", icon: FaImage, label: "Before / After" },
      { href: "/admin/services", icon: FaCog, label: "Services" },
      { href: "/admin/testimonials", icon: FaStar, label: "Testimonials" },
      { href: "/admin/stats", icon: FaChartBar, label: "Homepage Stats" },
      { href: "/admin/videos", icon: FaVideo, label: "Videos" },
    ],
  },
  {
    label: "Operations",
    items: [
      { href: "/admin/reservations", icon: FaCalendarCheck, label: "Reservations" },
      { href: "/admin/settings", icon: FaSlidersH, label: "Site Settings" },
    ],
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${geistSans.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-bg-base text-foreground antialiased">
        <div className="flex min-h-screen">
          <aside className="w-64 bg-bg-raised border-r border-white/5 flex flex-col">
            <div className="p-6 border-b border-white/5">
              <h1 className="font-display text-xl font-black text-beam-400 tracking-tight">
                OWLIGHTING
              </h1>
              <p className="text-[11px] text-text-tertiary mt-1 uppercase tracking-widest">
                Admin Dashboard
              </p>
            </div>

            <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto">
              {navGroups.map((group) => (
                <div key={group.label}>
                  <p className="px-3 text-[10px] uppercase tracking-widest text-text-tertiary mb-2">
                    {group.label}
                  </p>
                  <div className="space-y-0.5">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-text-secondary hover:bg-beam-400/10 hover:text-white transition-colors"
                      >
                        <item.icon className="text-beam-400 shrink-0" size={14} />
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </nav>

            <div className="p-4 border-t border-white/5">
              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-2 text-xs text-text-tertiary hover:text-beam-400 transition-colors"
              >
                <FaExternalLinkAlt size={10} />
                <span>Lihat Website</span>
              </Link>
            </div>
          </aside>

          <main className="flex-1 overflow-auto">
            <div className="p-6 lg:p-8 max-w-6xl">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
