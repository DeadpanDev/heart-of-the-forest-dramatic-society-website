import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  cacheComponents: true,
  experimental: {
    typedEnv: true,
  },
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://192.168.0.4:3000",
    "http://192.168.0.4:3001",
  ],
};

export default nextConfig;
