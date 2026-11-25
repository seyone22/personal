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
  async redirects() {
    return [
      {
        source: "/blog/sl-lime-chili-2026",
        destination: "/blog/sri-lanka-lime-chili-prices-2026",
        permanent: true,
      },
      {
        source: "/blog/sl-supermarket-inflation-2026",
        destination: "/blog/sri-lanka-food-inflation-cpi-2026",
        permanent: true,
      },
      {
        source: "/blog/sl-mobile-tariffs-2026",
        destination: "/blog/sri-lanka-mobile-data-plans-2026",
        permanent: true,
      },
    ];
  },
};

export default withMDX(nextConfig);
