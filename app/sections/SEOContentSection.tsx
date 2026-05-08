"use client";

import AnimatedSection from "../components/AnimatedSection";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { SectionHeader } from "../components/ui/SectionHeader";
import { Button } from "../components/ui/Button";
import { Chip } from "../components/ui/Chip";

const HIGHLIGHTS = [
  "Cut-off RHD presisi untuk lalu lintas Indonesia",
  "Pencahayaan 3-5x lebih terang dari halogen",
  "Konsumsi daya lebih rendah (35W vs 55W)",
  "Garansi 1 tahun komponen dan instalasi",
  "Safety wiring dengan relay & fuse proteksi",
  "0 kasus kebakaran dalam 5+ tahun",
  "Teknologi CNC & 3D Printing in-house",
  "After-sales support siap membantu",
];

const SERVICES = [
  {
    title: "Custom BILED Retrofit Mobil",
    description: "Untuk semua merk — Toyota, Honda, Suzuki, BMW, Mercedes, dan lainnya.",
  },
  {
    title: "Custom BILED Retrofit Motor",
    description: "Untuk motor sport, matic, dan bebek.",
  },
  {
    title: "D2 Laser / Foglamp",
    description: "Dual color dengan waterproof IP67.",
  },
  {
    title: "DRL Matrix Custom",
    description: "Desain eksklusif dengan CNC Laser.",
  },
  {
    title: "Poles Kaca Lampu Nano Burn",
    description: "Menghilangkan kusam dan buram pada headlamp.",
  },
  {
    title: "Custom CNC Laser & 3D Printing",
    description: "Fabrication presisi untuk komponen custom.",
  },
];

const REASONS = [
  {
    title: "Pengalaman 5+ Tahun",
    body: "Spesialis custom BILED sejak 2019 — bukan workshop musiman.",
  },
  {
    title: "500+ Kendaraan",
    body: "Track record lengkap dengan portfolio yang masih beroperasi di jalanan.",
  },
  {
    title: "Garansi Resmi",
    body: "Garansi 1 tahun untuk komponen dan kerusakan instalasi.",
  },
  {
    title: "Konsultasi Gratis",
    body: "Survey headlamp tanpa biaya — kami pastikan dulu sebelum estimasi.",
  },
];

export default function SEOContentSection() {
  return (
    <section className="section-y bg-bg-raised" id="seo-content">
      <div className="container-x">
        <SectionHeader
          index="08"
          eyebrow="Tentang Custom BILED"
          title="Custom BILED Lampung Timur,"
          accent="dijelaskan."
          accentTone="italic"
          description="Bagi yang baru pertama dengar 'BILED' — bagian ini menjelaskan apa, kenapa, dan bagaimana kami mengerjakannya."
        />

        {/* Main content card */}
        <AnimatedSection>
          <article className="glass-strong rounded-2xl p-6 md:p-10 mb-8 border border-white/5">
            <h3 className="text-xl md:text-2xl font-semibold mb-3 text-white tracking-tight">
              Apa itu <span className="font-editorial italic">Custom BILED?</span>
            </h3>
            <p className="text-text-secondary leading-relaxed mb-6">
              <strong className="text-white">Custom BILED</strong> (Bi-LED Projector) adalah lampu
              projector LED yang dipasang (retrofit) ke dalam headlamp kendaraan Anda. Berbeda
              dengan lampu LED biasa, custom BILED memiliki projector dengan cut-off yang presisi
              sehingga pencahayaan lebih fokus, terang maksimal, namun tidak menyilaukan
              pengendara lain — solusi upgrade lampu terbaik untuk keamanan berkendara malam hari.
            </p>

            <div className="mt-8 mb-8">
              <p className="text-[10px] uppercase tracking-widest text-text-tertiary font-bold mb-4">
                Keunggulan Custom BILED Owlighting
              </p>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {HIGHLIGHTS.map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-sm text-text-secondary">
                    <FaCheckCircle size={13} className="text-beam-400 mt-1 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <p className="text-[10px] uppercase tracking-widest text-text-tertiary font-bold mb-4">
                Layanan Owlighting
              </p>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                {SERVICES.map((s) => (
                  <li
                    key={s.title}
                    className="border-l-2 border-beam-400/30 pl-3 py-0.5"
                  >
                    <p className="text-sm font-semibold text-white">{s.title}</p>
                    <p className="text-xs text-text-secondary leading-relaxed mt-0.5">
                      {s.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-text-secondary leading-relaxed mt-8 pt-6 border-t border-white/5">
              Owlighting melayani pemasangan custom BILED untuk wilayah{" "}
              <strong className="text-white">Lampung Timur</strong> dan sekitarnya — Way Jepara,
              Metro, Sukadana, Bandar Lampung, Lampung Tengah, dan Lampung Selatan (radius 100km
              dari workshop).
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Button
                href="/services"
                variant="primary"
                size="md"
                rightIcon={<FaArrowRight size={11} />}
              >
                Lihat Layanan Custom BILED
              </Button>
              <Button
                href="/portfolio"
                variant="secondary"
                size="md"
                rightIcon={<FaArrowRight size={11} />}
              >
                Lihat Hasil Custom BILED
              </Button>
            </div>
          </article>
        </AnimatedSection>

        {/* Address + reasons split */}
        <AnimatedSection delay={0.15}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass rounded-2xl p-6 border border-white/5">
              <Chip tone="beam" size="xs" className="mb-3">
                Lokasi Workshop
              </Chip>
              <h3 className="text-lg font-bold text-white mb-4">
                Bengkel Custom BILED Owlighting
              </h3>
              <address className="not-italic text-text-secondary leading-relaxed text-sm space-y-1">
                <p className="text-white font-semibold">Owlighting Garage</p>
                <p>Jl. Danau Km.1, Sumberjo</p>
                <p>Way Jepara, Kabupaten Lampung Timur</p>
                <p>Lampung 34396, Indonesia</p>
                <div className="pt-3 mt-3 border-t border-white/5 space-y-1">
                  <p>
                    <span className="text-text-tertiary">WhatsApp:</span>{" "}
                    <span className="text-white tabular">+62 856-5864-8413</span>
                  </p>
                  <p>
                    <span className="text-text-tertiary">Email:</span>{" "}
                    <span className="text-white">owlightinggarage@gmail.com</span>
                  </p>
                  <p>
                    <span className="text-text-tertiary">Jam:</span>{" "}
                    <span className="text-white">Senin – Sabtu, 09.00 – 18.00 WIB</span>
                  </p>
                </div>
              </address>
            </div>

            <div className="glass rounded-2xl p-6 border border-white/5">
              <Chip tone="halo" size="xs" className="mb-3">
                Empat Alasan
              </Chip>
              <h3 className="text-lg font-bold text-white mb-4">
                Kenapa pilih Owlighting?
              </h3>
              <ol className="space-y-3.5">
                {REASONS.map((reason, i) => (
                  <li key={reason.title} className="flex gap-3">
                    <span className="font-mono-tech text-base tabular text-beam-400 leading-none shrink-0 mt-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">{reason.title}</p>
                      <p className="text-xs text-text-secondary leading-relaxed mt-0.5">
                        {reason.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
