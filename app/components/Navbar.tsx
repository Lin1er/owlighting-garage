"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    if (pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-20 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center glow-primary">
            <div className="w-6 h-6 rounded-full bg-primary"></div>
          </div>
          <span className="text-xl font-bold text-glow">OWLIGHTING</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`cursor-pointer hover:text-primary transition-colors ${
                  pathname === link.href ? "text-primary" : "text-muted"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li
            className="cursor-pointer hover:text-primary transition-colors text-muted"
            onClick={() => scrollToSection("contact")}
          >
            Contact
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <motion.span
            animate={
              mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }
            }
            className="w-6 h-0.5 bg-white block"
          />
          <motion.span
            animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-6 h-0.5 bg-white block"
          />
          <motion.span
            animate={
              mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
            }
            className="w-6 h-0.5 bg-white block"
          />
        </button>

        <button
          onClick={() => scrollToSection("reservation")}
          className="hidden md:block px-5 py-2 bg-linear-to-r from-primary to-cyan-400 text-black font-semibold rounded-lg glow-primary hover:scale-105 transition-transform"
        >
          Reservasi Sekarang
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-primary/10"
          >
            <div className="px-6 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2 hover:text-primary transition-colors ${
                    pathname === link.href
                      ? "text-primary font-semibold"
                      : "text-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => scrollToSection("services")}
                className="block w-full text-left py-2 text-muted hover:text-primary transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left py-2 text-muted hover:text-primary transition-colors"
              >
                Contact
              </button>
              <button
                onClick={() => scrollToSection("reservation")}
                className="w-full px-5 py-3 bg-linear-to-r from-primary to-cyan-400 text-black font-semibold rounded-lg glow-primary mt-4"
              >
                Reservasi Sekarang
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
