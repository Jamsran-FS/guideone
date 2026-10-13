import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Админы зураг (5MB), багшийн материал (20MB) upload — server action болон proxy-ийн анхны хязгаар 1MB/10MB
    serverActions: { bodySizeLimit: "21mb" },
    proxyClientMaxBodySize: "21mb",
  },
  images: {
    // Админаас upload хийсэн зургууд (Supabase Storage "media" bucket)
    remotePatterns: [{ protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" }],
  },
};

export default nextConfig;
