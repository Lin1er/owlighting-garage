"use client";

import AnimatedSection from "../components/AnimatedSection";
import Link from "next/link";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";

export default function SEOContentSection() {
  return (
    <section className="relative py-20 px-6 lg:px-20 bg-surface/20" id="seo-content">
      <div className="max-w-7xl mx-auto">
        {/* Main SEO Content */}
        <AnimatedSection>
          <div className="glass rounded-2xl p-8 md:p-12 mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-6 text-glow">
              Custom BILED Lampung Timur - Owlighting Garage
            </h2>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-muted leading-relaxed mb-6">
                <strong className="text-white">Owlighting</strong> adalah bengkel spesialis <strong className="text-primary">Custom BILED</strong> terkemuka 
                di <strong>Lampung Timur</strong>. Berdiri sejak 2019, kami telah melayani lebih dari 500 kendaraan 
                dengan hasil memuaskan dan garansi resmi. Kami menyediakan jasa pasang custom BILED untuk mobil dan motor 
                dengan standar keamanan tertinggi.
              </p>

              <h3 className="text-xl font-bold text-primary mb-4">Apa Itu Custom BILED?</h3>
              <p className="text-muted leading-relaxed mb-6">
                <strong>Custom BILED</strong> (Bi-LED Projector) adalah lampu projector LED yang dipasang (retrofit) 
                ke dalam headlamp kendaraan Anda. Berbeda dengan lampu LED biasa, custom BILED memiliki projector 
                dengan cut-off yang presisi sehingga pencahayaan lebih fokus, terang maksimal, namun tidak menyilaukan 
                pengendara lain. Ini adalah solusi upgrade lampu terbaik untuk keamanan berkendara malam hari.
              </p>

              <h3 className="text-xl font-bold text-primary mb-4">Keunggulan Custom BILED di Owlighting</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {[
                  "Cut-off RHD presisi untuk lalu lintas Indonesia",
                  "Pencahayaan 3-5x lebih terang dari halogen",
                  "Konsumsi daya lebih rendah (35W vs 55W)",
                  "Garansi 1 tahun komponen dan instalasi",
                  "Safety wiring dengan relay & fuse proteksi",
                  "0 kasus kebakaran dalam 5+ tahun",
                  "Teknologi CNC & 3D Printing in-house",
                  "After-sales support siap membantu",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <FaCheckCircle className="text-accent mt-1 shrink-0" />
                    <span className="text-muted">{item}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-bold text-primary mb-4">Layanan Custom BILED Owlighting</h3>
              <p className="text-muted leading-relaxed mb-4">
                Owlighting menyediakan berbagai layanan custom BILED dan pencahayaan kendaraan:
              </p>
              <ul className="list-disc list-inside text-muted mb-6 space-y-2">
                <li><strong>Custom BILED Retrofit Mobil</strong> - Untuk semua merk mobil (Toyota, Honda, Suzuki, BMW, Mercedes, dll)</li>
                <li><strong>Custom BILED Retrofit Motor</strong> - Untuk motor sport, matic, dan bebek</li>
                <li><strong>D2 Laser / Foglamp</strong> - Dual color dengan waterproof IP67</li>
                <li><strong>DRL Matrix Custom</strong> - Desain eksklusif dengan CNC Laser</li>
                <li><strong>Poles Kaca Lampu Nano Burn</strong> - Menghilangkan kusam dan buram pada headlamp</li>
                <li><strong>Custom CNC Laser & 3D Printing</strong> - Fabrication presisi untuk komponen custom</li>
              </ul>

              <h3 className="text-xl font-bold text-primary mb-4">Area Layanan Custom BILED</h3>
              <p className="text-muted leading-relaxed mb-6">
                Owlighting melayani pemasangan custom BILED untuk wilayah <strong>Lampung Timur</strong> dan sekitarnya, 
                termasuk Way Jepara, Metro, Sukadana, Bandar Lampung, Lampung Tengah, dan Lampung Selatan 
                (radius 100km dari lokasi workshop).
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary font-semibold rounded-lg transition-colors"
              >
                Lihat Layanan Custom BILED
                <FaArrowRight size={14} />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-6 py-3 border border-primary/30 text-white font-semibold rounded-lg hover:bg-primary/10 transition-colors"
              >
                Lihat Hasil Custom BILED
                <FaArrowRight size={14} />
              </Link>
            </div>
          </div>
        </AnimatedSection>

        {/* Location SEO Content */}
        <AnimatedSection delay={0.2}>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass rounded-2xl p-6">
              <h3 className="text-xl font-bold text-primary mb-4">
                Lokasi Bengkel Custom BILED Owlighting
              </h3>
              <address className="not-italic text-muted leading-relaxed">
                <strong className="text-white">Owlighting Garage</strong><br />
                Jl. Danau Km.1, Sumberjo<br />
                Way Jepara, Kabupaten Lampung Timur<br />
                Lampung 34396, Indonesia<br /><br />
                <strong>Telepon/WhatsApp:</strong> +62 856-5864-8413<br />
                <strong>Email:</strong> owlightinggarage@gmail.com<br />
                <strong>Jam Buka:</strong> Senin - Sabtu, 09.00 - 18.00 WIB
              </address>
            </div>

            <div className="glass rounded-2xl p-6">
              <h3 className="text-xl font-bold text-primary mb-4">
                Kenapa Pilih Custom BILED di Owlighting?
              </h3>
              <ul className="space-y-3 text-muted">
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">1.</span>
                  <span><strong className="text-white">Pengalaman 5+ Tahun</strong> - Spesialis custom BILED sejak 2019</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">2.</span>
                  <span><strong className="text-white">500+ Kendaraan</strong> - Track record terpercaya</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">3.</span>
                  <span><strong className="text-white">Garansi Resmi</strong> - 1 tahun untuk komponen dan instalasi</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">4.</span>
                  <span><strong className="text-white">Konsultasi Gratis</strong> - Survey headlamp tanpa biaya</span>
                </li>
              </ul>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
