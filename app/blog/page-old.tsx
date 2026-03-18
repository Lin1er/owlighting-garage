"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnimatedSection from "../components/AnimatedSection";
import { FaTiktok, FaPlay, FaEye } from "react-icons/fa";
import { type TikTokVideo } from "@/lib/supabase";
import { getTikTokVideos } from "@/lib/api";

export default function BlogPage() {
  const [videos, setVideos] = useState<TikTokVideo[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const categories = [
    "All",
    "Tutorial",
    "Custom Work",
    "Safety",
    "Comparison",
    "Technology",
  ];

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    setLoading(true);
    const data = await getTikTokVideos();
    setVideos(data);
    setLoading(false);
  };

  const filteredVideos =
    selectedCategory === "All"
      ? videos
      : videos.filter((video) => video.category === selectedCategory);

  return (
    <main className="relative min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <AnimatedSection>
            <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 glass rounded-full border border-primary/30">
              <FaTiktok className="text-primary text-2xl" />
              <span className="text-sm font-bold tracking-wider">
                @owlighting_garage
              </span>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h1 className="text-4xl md:text-6xl font-black mb-6 text-glow">
              TikTok Videos
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
              Lihat proses kerja kami, tips & tricks, dan hasil karya custom
              lighting langsung dari TikTok official Owlighting Garage!
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-6 lg:px-20 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 glass rounded-full text-sm font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-primary text-black glow-primary"
                    : "hover:bg-primary/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="px-6 lg:px-20 pb-20">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <p className="text-muted">Loading videos...</p>
            </div>
          ) : filteredVideos.length === 0 ? (
            <div className="text-center py-20">
              <FaTiktok className="text-6xl text-muted mx-auto mb-4" />
              <p className="text-muted">No videos found in this category</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVideos.map((video, index) => (
                <AnimatedSection key={video.id} delay={index * 0.1}>
                  <a
                    href={`https://www.tiktok.com/@owlighting_garage/video/${video.video_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass rounded-xl overflow-hidden group hover:scale-105 transition-all duration-300 block"
                  >
                    {/* Video Thumbnail */}
                    <div className="relative aspect-9/16 bg-linear-to-br from-primary/20 to-accent/20">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                          <FaPlay className="text-black text-2xl ml-1" />
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
                      <div className="absolute top-4 left-4 bg-primary/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold">
                        {video.category}
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-lg font-bold mb-2 line-clamp-2">
                          {video.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-muted">
                          <FaEye className="text-primary" />
                          <span>{video.views} views</span>
                        </div>
                      </div>
                    </div>

                    {/* Video Description */}
                    <div className="p-6">
                      <p className="text-sm text-muted leading-relaxed line-clamp-3">
                        {video.description}
                      </p>
                    </div>
                  </a>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-20 bg-surface/30">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-black mb-6">
              Follow TikTok Kami!
            </h2>
            <p className="text-lg text-muted mb-8">
              Jangan lewatkan video-video terbaru, tips, dan promo eksklusif di
              TikTok
            </p>
            <a
              href={
                process.env.NEXT_PUBLIC_TIKTOK_URL ||
                "https://www.tiktok.com/@owlighting_garage"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 bg-cyan-400 hover:bg-cyan-300 text-black font-bold rounded-lg glow-primary text-lg hover:scale-105 transition-transform"
            >
              <FaTiktok className="text-2xl" />
              <span>@owlighting_garage</span>
            </a>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </main>
  );
}
