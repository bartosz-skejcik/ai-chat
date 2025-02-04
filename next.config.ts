import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "avatar.vercel.sh",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
