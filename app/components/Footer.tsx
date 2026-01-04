"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { contactInfo, companyInfo } from "@/data";

export default function Footer() {
  const pathname = usePathname();

  const scrollToSection = (id: string) => {
    if (pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-primary/10 py-12 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center glow-primary">
                <div className="w-6 h-6 rounded-full bg-primary"></div>
              </div>
              <span className="text-xl font-bold text-glow">
                {companyInfo.name.toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-muted leading-relaxed">
              {companyInfo.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4 text-primary">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <Link
                  href="/"
                  className="hover:text-primary cursor-pointer transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary cursor-pointer transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-primary cursor-pointer transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="hover:text-primary cursor-pointer transition-colors"
                >
                  Portfolio
                </Link>
              </li>
              <li
                className="hover:text-primary cursor-pointer transition-colors"
                onClick={() => scrollToSection("reservation")}
              >
                Contact
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4 text-primary">Contact Us</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <a
                  href={contactInfo.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-start gap-2"
                >
                  <span>📍</span>
                  <span>{contactInfo.address}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="hover:text-primary transition-colors"
                >
                  📱 {contactInfo.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="hover:text-primary transition-colors"
                >
                  📧 {contactInfo.email}
                </a>
              </li>
              <li className="mt-3 pt-3 border-t border-primary/10">
                <span className="text-accent font-semibold">#MenolakGelap</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="border-t border-primary/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted"
        >
          <div>
            © {new Date().getFullYear()} {companyInfo.name}. All rights
            reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
