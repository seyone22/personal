import createMDX from "@next/mdx";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";

initOpenNextCloudflareForDev();

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
});

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Add this block to disable the specific feature causing the manifest error
  experimental: {
    viewTransition: false,
  },
  // Ensure we are using standalone output for better compatibility
  output: "standalone",
};

export default withMDX(nextConfig);
