import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Empty turbopack config to silence the webpack warning
  // Source map warnings are harmless in development
  turbopack: {},
};

export default nextConfig;
