import type { Metadata } from "next";
import Link from "next/link";
import { FaHome, FaVideo, FaImages, FaCog, FaStar } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Admin Dashboard - Owlighting",
  description: "Manage website content",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-background text-foreground">
        <div className="flex h-screen">
          {/* Sidebar */}
          <aside className="w-64 bg-surface border-r border-primary/10">
            <div className="p-6">
              <h1 className="text-2xl font-black text-primary">OWLIGHTING</h1>
              <p className="text-xs text-muted mt-1">Admin Dashboard</p>
            </div>

            <nav className="px-4 space-y-2">
              <Link
                href="/admin"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 transition-colors"
              >
                <FaHome className="text-primary" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/admin/videos"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 transition-colors"
              >
                <FaVideo className="text-primary" />
                <span>TikTok Videos</span>
              </Link>
              <Link
                href="/admin/portfolio"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 transition-colors"
              >
                <FaImages className="text-primary" />
                <span>Portfolio</span>
              </Link>
              <Link
                href="/admin/services"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 transition-colors"
              >
                <FaCog className="text-primary" />
                <span>Services</span>
              </Link>
              <Link
                href="/admin/testimonials"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 transition-colors"
              >
                <FaStar className="text-primary" />
                <span>Testimonials</span>
              </Link>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="p-8">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
