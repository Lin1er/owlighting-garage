"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { FaVideo, FaImages, FaCog, FaStar } from "react-icons/fa";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    videos: 0,
    portfolio: 0,
    services: 0,
    testimonials: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const [videos, portfolio, services, testimonials] = await Promise.all([
      supabase
        .from("tiktok_videos")
        .select("*", { count: "exact", head: true }),
      supabase
        .from("portfolio_projects")
        .select("*", { count: "exact", head: true }),
      supabase.from("services").select("*", { count: "exact", head: true }),
      supabase.from("testimonials").select("*", { count: "exact", head: true }),
    ]);

    setStats({
      videos: videos.count || 0,
      portfolio: portfolio.count || 0,
      services: services.count || 0,
      testimonials: testimonials.count || 0,
    });
  };

  const statCards = [
    {
      title: "TikTok Videos",
      count: stats.videos,
      icon: FaVideo,
      color: "primary",
    },
    {
      title: "Portfolio Projects",
      count: stats.portfolio,
      icon: FaImages,
      color: "accent",
    },
    { title: "Services", count: stats.services, icon: FaCog, color: "primary" },
    {
      title: "Testimonials",
      count: stats.testimonials,
      icon: FaStar,
      color: "accent",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black mb-2">Dashboard</h1>
        <p className="text-muted">Welcome to Owlighting Admin Panel</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div key={stat.title} className="glass p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`text-3xl text-${stat.color}`} />
              <span className="text-4xl font-black">{stat.count}</span>
            </div>
            <h3 className="text-sm text-muted">{stat.title}</h3>
          </div>
        ))}
      </div>

      <div className="mt-8 glass p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <a
            href="/admin/videos"
            className="p-4 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
          >
            <h3 className="font-bold mb-1">Manage Videos</h3>
            <p className="text-sm text-muted">
              Add, edit, or remove TikTok videos
            </p>
          </a>
          <a
            href="/admin/portfolio"
            className="p-4 bg-accent/10 rounded-lg hover:bg-accent/20 transition-colors"
          >
            <h3 className="font-bold mb-1">Manage Portfolio</h3>
            <p className="text-sm text-muted">Update project showcase</p>
          </a>
          <a
            href="/admin/services"
            className="p-4 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
          >
            <h3 className="font-bold mb-1">Manage Services</h3>
            <p className="text-sm text-muted">Edit service offerings</p>
          </a>
          <a
            href="/admin/testimonials"
            className="p-4 bg-accent/10 rounded-lg hover:bg-accent/20 transition-colors"
          >
            <h3 className="font-bold mb-1">Manage Testimonials</h3>
            <p className="text-sm text-muted">Add customer reviews</p>
          </a>
        </div>
      </div>
    </div>
  );
}
