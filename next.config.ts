import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: "http://43.203.172.52:8080/api/auth/:path*",
      },
      {
        source: "/api/users/:path*",
        destination: "http://43.203.172.52:8080/api/users/:path*",
      },
    ];
  },
};

export default nextConfig;
