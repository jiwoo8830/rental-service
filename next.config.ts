import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/api/auth/email-verifications",
        destination: "http://13.125.229.197:8080/api/auth/email-verifications",
      },
      {
        source: "/api/auth/email-verifications-verify",
        destination: "http://13.125.229.197:8080/api/auth/email-verifications-verify",
      },
      {
        source: "/api/users/:path*",
        destination: "http://13.125.229.197:8080/api/users/:path*",
      },
    ];
  },
};

export default nextConfig;
