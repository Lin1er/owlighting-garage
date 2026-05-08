import type { Metadata } from "next";
import { FaTiktok } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getTikTokVideos } from "@/lib/api";
import { contactInfo } from "@/data";
import BlogClient from "./BlogClient";
import { Chip } from "../components/ui/Chip";
import { Button } from "../components/ui/Button";

export const metadata: Metadata = {
  title: "Video & Review Custom BILED | Owlighting TikTok",
  description:
    "Video tutorial, before/after, dan review hasil custom BILED langsung dari TikTok @owlighting_garage. Edukasi safety retrofit, tips memilih projector, dan dokumentasi proses workshop.",
  alternates: { canonical: "https://owlighting-garage.vercel.app/blog" },
  openGraph: {
    title: "Video Custom BILED Owlighting · TikTok",
    description:
      "Tutorial, before/after, dan dokumentasi proses workshop custom BILED langsung dari TikTok official Owlighting Garage.",
    url: "https://owlighting-garage.vercel.app/blog",
    type: "website",
  },
};

export default async function BlogPage() {
  const videos = await getTikTokVideos();

  return (
    <main className="relative min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(0,194,255,0.10), transparent 65%)",
          }}
        />
        <div className="container-x relative z-10 max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono-tech text-[11px] tabular text-beam-400">CHAPTER 05</span>
            <span aria-hidden className="h-px w-12 bg-text-tertiary/40" />
            <span className="eyebrow">Video & Review</span>
          </div>
          <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] font-bold tracking-tight leading-[1.02] mb-5">
            <span className="font-editorial italic text-white">@owlighting_garage</span>
            <br />
            <span className="text-white">di </span>
            <span className="font-editorial italic">TikTok.</span>
          </h1>
          <p className="text-base md:text-lg text-text-secondary max-w-2xl leading-relaxed">
            Tutorial, dokumentasi proses, edukasi safety retrofit, dan before/after langsung
            dari workshop. Disusun supaya Anda paham dulu sebelum memutuskan.
          </p>
        </div>
      </section>

      <BlogClient videos={videos} tiktokUrl={contactInfo.socialMedia.tiktok} />

      {/* CTA */}
      <section className="section-y bg-bg-raised">
        <div className="container-x max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-tight tracking-tight">
            <span className="text-white">Follow </span>
            <span className="font-editorial italic">@owlighting_garage</span>
          </h2>
          <p className="text-text-secondary text-base md:text-lg mb-8 max-w-2xl mx-auto">
            Video terbaru, tips memilih projector, dan promo eksklusif lebih dulu di TikTok kami.
          </p>
          <Button
            href={contactInfo.socialMedia.tiktok}
            external
            variant="primary"
            size="lg"
            leftIcon={<FaTiktok size={16} />}
          >
            Follow di TikTok
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
