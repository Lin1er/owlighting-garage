"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTiktok, FaEye, FaPlay, FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import { type TikTokVideo } from "@/lib/supabase";
import AnimatedSection from "../components/AnimatedSection";
import { Chip } from "../components/ui/Chip";
import { Button } from "../components/ui/Button";

type Props = {
  videos: TikTokVideo[];
  tiktokUrl: string;
};

const STATIC_CATEGORIES = ["All", "Tutorial", "Custom Work", "Safety", "Comparison", "Technology"];

export default function BlogClient({ videos, tiktokUrl }: Props) {
  const [selected, setSelected] = useState("All");

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: videos.length };
    for (const v of videos) c[v.category] = (c[v.category] ?? 0) + 1;
    return c;
  }, [videos]);

  const filtered = useMemo(
    () => (selected === "All" ? videos : videos.filter((v) => v.category === selected)),
    [videos, selected],
  );

  // Surface every category we know about (static + db-only) so admins adding
  // new categories don't need a frontend redeploy.
  const categories = useMemo(() => {
    const fromDb = new Set(videos.map((v) => v.category));
    const merged = [...STATIC_CATEGORIES];
    for (const c of fromDb) {
      if (!merged.includes(c)) merged.push(c);
    }
    return merged;
  }, [videos]);

  return (
    <>
      {/* Filter chips */}
      <section className="container-x pb-8" id="filter-videos">
        <h2 className="sr-only">Filter Videos</h2>
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {categories.map((cat) => {
            const isActive = selected === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelected(cat)}
                className={`group px-5 py-2 rounded-full text-sm font-semibold transition-all duration-[var(--dur-default)] flex items-center gap-2 ${
                  isActive
                    ? "bg-beam-400 text-[color:var(--text-on-beam)] glow-primary"
                    : "bg-white/5 text-text-secondary hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                {cat}
                <span
                  className={`tabular text-[11px] px-1.5 py-0.5 rounded-full ${
                    isActive ? "bg-black/15 text-black/70" : "bg-white/5 text-text-tertiary"
                  }`}
                >
                  {counts[cat] ?? 0}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Videos grid */}
      <section className="container-x pb-16 md:pb-20">
        {videos.length === 0 ? (
          <div className="text-center py-20 glass rounded-2xl border border-white/5">
            <FaTiktok className="text-5xl text-text-tertiary mx-auto mb-4 opacity-40" />
            <p className="text-text-secondary mb-2">Belum ada video terupload.</p>
            <p className="text-xs text-text-tertiary mb-6">
              Admin bisa menambahkan video dari{" "}
              <code className="px-1.5 py-0.5 bg-white/5 rounded text-[11px]">/admin/videos</code>.
            </p>
            <Button href={tiktokUrl} external variant="secondary" size="sm" leftIcon={<FaTiktok />}>
              Buka TikTok kami
            </Button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 glass rounded-2xl border border-white/5">
            <p className="text-text-secondary text-sm">
              Belum ada video di kategori &ldquo;{selected}&rdquo;.
            </p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((video, index) => (
                <motion.article
                  key={video.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.32,
                    delay: index * 0.04,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                >
                  <a
                    href={`https://www.tiktok.com/@owlighting_garage/video/${video.video_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block glass rounded-2xl overflow-hidden border border-white/5 hover:border-beam-400/30 transition-colors"
                  >
                    <div className="relative aspect-[9/16] bg-bg-card overflow-hidden">
                      {video.thumbnail_url ? (
                        <Image
                          src={video.thumbnail_url}
                          alt={video.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-beam-400/15 to-halo-500/10">
                          <FaTiktok className="text-6xl text-beam-400/40" />
                        </div>
                      )}

                      {/* Hover play overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-beam-400 flex items-center justify-center glow-primary">
                          <FaPlay className="text-[color:var(--text-on-beam)] text-xl ml-1" />
                        </div>
                      </div>

                      {/* Category badge top-left */}
                      <div className="absolute top-3 left-3">
                        <Chip tone="beam" size="xs">
                          {video.category}
                        </Chip>
                      </div>

                      {/* Views badge bottom-right */}
                      {video.views && (
                        <div className="absolute bottom-3 right-3">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-black/70 backdrop-blur-sm rounded-full text-[11px] font-bold text-white tabular">
                            <FaEye className="text-beam-400" size={10} />
                            {video.views}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <h3 className="text-base md:text-lg font-bold mb-1.5 group-hover:text-beam-400 transition-colors line-clamp-2 leading-tight">
                        {video.title}
                      </h3>
                      {video.description && (
                        <p className="text-xs text-text-secondary line-clamp-3 mb-3 leading-relaxed">
                          {video.description}
                        </p>
                      )}
                      <div className="inline-flex items-center gap-1.5 text-xs text-beam-400 font-semibold">
                        <FaTiktok size={11} />
                        Tonton di TikTok
                        <FaArrowRight
                          size={9}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </div>
                    </div>
                  </a>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>
    </>
  );
}
