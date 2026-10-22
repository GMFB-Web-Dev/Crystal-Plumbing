import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // The supplied photography is already resolution-limited. Serve the source
    // files unchanged so they are never transcoded at Next's default quality.
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/plumbing-services-auckland-plumbers",
        destination: "/services/plumbing",
        permanent: true,
      },
      {
        source: "/gas-fitting-auckland-plumber",
        destination: "/services/gas-fitting",
        permanent: true,
      },
      {
        source: "/projects-auckland-plumbers",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/contact-us-auckland-plumber",
        destination: "/contact",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=2592000" },
        ],
      },
      {
        source: "/:path*",
        headers: [
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
