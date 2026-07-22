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
        source: "/api/auth/register",
        destination: "http://13.125.229.197:8080/api/auth/register",
      },
      {
        source: "/api/users/login",
        destination: "http://13.125.229.197:8080/api/users/login",
      },
      {
        source: "/api/products",
        destination: "http://13.125.229.197:8080/api/products",
      },
      {
        source: "/api/products/register",
        destination: "http://13.125.229.197:8080/api/products/register",
      },
      {
        source: "/api/products/:productId",
        destination: "http://13.125.229.197:8080/api/products/:productId"
      },
    ];
  },
};

export default nextConfig;
