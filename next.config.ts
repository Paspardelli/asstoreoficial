import type { NextConfig } from "next";

// Libera o otimizador de imagens só para o Storage do SEU Supabase.
let host = "";
try { host = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").hostname; } catch {}

const config: NextConfig = {
  experimental: { serverActions: { bodySizeLimit: "5mb" } },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: host ? [{ protocol: "https", hostname: host, pathname: "/storage/v1/object/public/**" }] : [],
  },
  async headers() {
    return [{
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      ],
    }];
  },
};
export default config;
