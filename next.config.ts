import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";

initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  // Add this block to disable the specific feature causing the manifest error
  experimental: {
    viewTransition: false,
  },
  // Ensure we are using standalone output for better compatibility
  output: "standalone",
};

export default nextConfig;
