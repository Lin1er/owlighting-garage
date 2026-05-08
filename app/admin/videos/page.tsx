"use client";

import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured, type TikTokVideo } from "@/lib/supabase";
import { NotConfiguredBanner } from "../_components/AdminShell";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaTiktok,
  FaEye,
  FaSave,
  FaTimes,
  FaImage,
} from "react-icons/fa";

export default function VideosPage() {
  const [videos, setVideos] = useState<TikTokVideo[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<Partial<TikTokVideo>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from("tiktok_videos")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setVideos(data);
    }
    setLoading(false);
  };

  const saveVideo = async () => {
    if (!supabase) return;
    if (
      !currentVideo.video_id ||
      !currentVideo.title ||
      !currentVideo.category
    ) {
      alert("Please fill required fields: Video ID, Title, and Category");
      return;
    }

    try {
      if (currentVideo.id) {
        // Update
        const { error } = await supabase
          .from("tiktok_videos")
          .update({
            video_id: currentVideo.video_id,
            title: currentVideo.title,
            description: currentVideo.description,
            category: currentVideo.category,
            thumbnail_url: currentVideo.thumbnail_url,
            views: currentVideo.views,
          })
          .eq("id", currentVideo.id);

        if (error) throw error;
      } else {
        // Insert
        const { error } = await supabase.from("tiktok_videos").insert([
          {
            video_id: currentVideo.video_id,
            title: currentVideo.title,
            description: currentVideo.description,
            category: currentVideo.category,
            thumbnail_url: currentVideo.thumbnail_url,
            views: currentVideo.views ?? "0",
          },
        ]);

        if (error) throw error;
      }

      setIsEditing(false);
      setCurrentVideo({});
      loadVideos();
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      alert("Error: " + msg);
    }
  };

  const deleteVideo = async (id: number) => {
    if (!supabase) return;
    if (!confirm("Are you sure you want to delete this video?")) return;

    try {
      const { error } = await supabase
        .from("tiktok_videos")
        .delete()
        .eq("id", id);

      if (error) throw error;
      loadVideos();
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      alert("Error deleting: " + msg);
    }
  };

  const categories = [
    "Tutorial",
    "Custom Work",
    "Safety",
    "Comparison",
    "Technology",
  ];

  return (
    <div>
      {!isSupabaseConfigured && <NotConfiguredBanner />}

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
            <FaTiktok className="text-primary" />
            TikTok Videos
          </h1>
          <p className="text-muted">Manage @owlighting_garage video content</p>
        </div>
        <button
          onClick={() => {
            setCurrentVideo({});
            setIsEditing(true);
          }}
          className="flex items-center gap-2 px-6 py-3 bg- text-white font-bold rounded-lg hover:scale-105 transition-transform shadow-lg shadow-primary/20"
        >
          <FaPlus /> Add Video
        </button>
      </div>

      {/* Stats Card */}
      <div className="glass p-6 rounded-xl mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted text-sm mb-1">Total Videos</p>
            <p className="text-3xl font-black text-primary">{videos.length}</p>
          </div>
          <div className="flex gap-4">
            {categories.map((cat) => {
              const count = videos.filter((v) => v.category === cat).length;
              return (
                <div key={cat} className="text-center">
                  <p className="text-xs text-muted mb-1">{cat}</p>
                  <p className="text-xl font-bold">{count}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Form Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="glass rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-auto border border-primary/20 shadow-2xl">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black flex items-center gap-3">
                {currentVideo.id ? (
                  <>
                    <FaEdit className="text-accent" /> Edit Video
                  </>
                ) : (
                  <>
                    <FaPlus className="text-primary" /> Add New Video
                  </>
                )}
              </h2>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setCurrentVideo({});
                }}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface/50 transition-colors"
              >
                <FaTimes className="text-muted" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Video ID */}
              <div>
                <label className="flex text-sm font-bold mb-2 items-center gap-2">
                  <FaTiktok className="text-primary" />
                  Video ID *
                </label>
                <input
                  type="text"
                  value={currentVideo.video_id || ""}
                  onChange={(e) =>
                    setCurrentVideo({
                      ...currentVideo,
                      video_id: e.target.value,
                    })
                  }
                  placeholder="7318526158915423494"
                  className="w-full px-4 py-3 bg-surface border border-primary/20 rounded-lg focus:border-primary focus:outline-none transition-colors"
                />
                <p className="text-xs text-muted mt-2">
                  📍 Copy from TikTok URL: tiktok.com/@user/video/
                  <span className="text-primary font-bold">[VIDEO_ID]</span>
                </p>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-bold mb-2">Title *</label>
                <input
                  type="text"
                  value={currentVideo.title || ""}
                  onChange={(e) =>
                    setCurrentVideo({ ...currentVideo, title: e.target.value })
                  }
                  placeholder="e.g. BILED Retrofit untuk Avanza - Tutorial Lengkap"
                  className="w-full px-4 py-3 bg-surface border border-primary/20 rounded-lg focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-bold mb-2">
                  Description (for SEO)
                </label>
                <textarea
                  value={currentVideo.description || ""}
                  onChange={(e) =>
                    setCurrentVideo({
                      ...currentVideo,
                      description: e.target.value,
                    })
                  }
                  rows={4}
                  placeholder="Deskripsi singkat tentang konten video ini. Berguna untuk SEO dan preview."
                  className="w-full px-4 py-3 bg-surface border border-primary/20 rounded-lg focus:border-primary focus:outline-none transition-colors resize-none"
                />
                <p className="text-xs text-muted mt-2">
                  {currentVideo.description?.length || 0} characters
                </p>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-bold mb-2">
                  Category *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() =>
                        setCurrentVideo({ ...currentVideo, category: cat })
                      }
                      className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                        currentVideo.category === cat
                          ? "bg-primary text-black shadow-lg shadow-primary/30"
                          : "bg-surface border border-primary/20 hover:border-primary/50"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Thumbnail URL */}
              <div>
                <label className="flex text-sm font-bold mb-2 items-center gap-2">
                  <FaImage className="text-accent" />
                  Thumbnail URL
                </label>
                <input
                  type="text"
                  value={currentVideo.thumbnail_url || ""}
                  onChange={(e) =>
                    setCurrentVideo({
                      ...currentVideo,
                      thumbnail_url: e.target.value,
                    })
                  }
                  placeholder="https://example.com/thumbnail.jpg"
                  className="w-full px-4 py-3 bg-surface border border-primary/20 rounded-lg focus:border-primary focus:outline-none transition-colors"
                />
                <p className="text-xs text-muted mt-2">
                  📷 URL gambar thumbnail video (opsional, akan gunakan TikTok icon jika kosong)
                </p>
              </div>

              {/* Views */}
              <div>
                <label className="flex text-sm font-bold mb-2 items-center gap-2">
                  <FaEye className="text-accent" />
                  Views (Display Only)
                </label>
                <input
                  type="text"
                  value={currentVideo.views ?? ""}
                  onChange={(e) =>
                    setCurrentVideo({ ...currentVideo, views: e.target.value })
                  }
                  placeholder="e.g. 125K"
                  className="w-full px-4 py-3 bg-surface border border-primary/20 rounded-lg focus:border-primary focus:outline-none transition-colors"
                />
                <p className="text-xs text-muted mt-2">
                  Optional: untuk display purposes saja
                </p>
              </div>

              {/* Preview */}
              <div className="bg-surface/50 border border-primary/10 rounded-lg p-4">
                <p className="text-xs font-bold text-muted mb-3">PREVIEW:</p>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="text-muted">ID:</span>{" "}
                    <span className="font-mono text-primary">
                      {currentVideo.video_id || "---"}
                    </span>
                  </p>
                  <p className="text-sm">
                    <span className="text-muted">Title:</span>{" "}
                    <span className="font-bold">
                      {currentVideo.title || "---"}
                    </span>
                  </p>
                  <p className="text-sm">
                    <span className="text-muted">Category:</span>{" "}
                    {currentVideo.category ? (
                      <span className="px-2 py-1 bg-primary/20 rounded text-xs font-bold">
                        {currentVideo.category}
                      </span>
                    ) : (
                      "---"
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={saveVideo}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-primary text-black font-bold rounded-lg hover:scale-105 transition-transform shadow-lg shadow-primary/30"
              >
                <FaSave /> Save Video
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setCurrentVideo({});
                }}
                className="px-6 py-4 bg-surface border border-primary/20 rounded-lg hover:bg-surface/50 transition-colors font-bold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Videos Grid */}
      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
          <p className="text-muted">Loading videos...</p>
        </div>
      ) : videos.length === 0 ? (
        <div className="text-center py-20 glass rounded-xl">
          <FaTiktok className="text-6xl text-muted mx-auto mb-4 opacity-30" />
          <p className="text-xl font-bold mb-2">No Videos Yet</p>
          <p className="text-muted mb-6">
            Start by adding your first TikTok video!
          </p>
          <button
            onClick={() => {
              setCurrentVideo({});
              setIsEditing(true);
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black font-bold rounded-lg hover:scale-105 transition-transform"
          >
            <FaPlus /> Add First Video
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className="glass rounded-xl overflow-hidden group hover:shadow-xl hover:shadow-primary/10 transition-all"
            >
              {/* Video Thumbnail Placeholder */}
              <div className="relative aspect-9/16 bg-linear-to-br from-primary/20 to-accent/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <FaTiktok className="text-6xl text-primary/30" />
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-primary/90 backdrop-blur-sm rounded-full text-xs font-bold">
                  {video.category}
                </div>

                {/* Video Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-base font-bold mb-2 line-clamp-2">
                    {video.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-muted">
                    <FaEye className="text-primary" />
                    <span>{video.views} views</span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-4 border-t border-primary/10">
                <p className="text-xs text-muted mb-3 line-clamp-2">
                  {video.description || "No description"}
                </p>
                <div className="flex items-center gap-2 mb-3">
                  <code className="text-xs bg-surface px-2 py-1 rounded flex-1 truncate">
                    {video.video_id}
                  </code>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setCurrentVideo(video);
                      setIsEditing(true);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors text-sm font-bold"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => deleteVideo(video.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors text-sm font-bold text-red-400"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
