import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* Allow the quality levels used across site imagery (silences
     next/image "unconfigured quality" warnings) */
  images: {
    qualities: [75, 80, 85, 90],
  },
  /* Site code is type-clean — fail the build loudly on regressions */
  typescript: {
    ignoreBuildErrors: false,
  },
  reactStrictMode: true,
};

export default nextConfig;
