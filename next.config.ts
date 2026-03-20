import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
    // Enable modern image formats for better performance
    formats: ["image/avif", "image/webp"],
    // Minimize image sizes
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  
  // Enable compression
  compress: true,
  
  // Performance optimizations
  poweredByHeader: false,
  
  // Strict mode for better debugging
  reactStrictMode: true,
  
  // SEO-friendly trailing slashes
  trailingSlash: false,
  
  // Headers for SEO and security
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        // Cache static assets
        source: "/assets/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache background images
        source: "/background/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Redirects for SEO
  async redirects() {
    return [
      // Redirect common misspellings or old URLs
      {
        source: "/service",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/portofolio",
        destination: "/portfolio",
        permanent: true,
      },
      {
        source: "/galeri",
        destination: "/portfolio",
        permanent: true,
      },
      {
        source: "/kontak",
        destination: "/#reservation",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
