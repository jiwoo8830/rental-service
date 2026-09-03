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
      {
        source: "/api/products/images/:imageId",
        destination: "http://13.125.229.197:8080/api/products/images/:imageId"
      },
      {
        source: "/api/rental-requests",
        destination: "http://13.125.229.197:8080/api/rental-requests"
      },
      {
        source: "/api/rental-requests/:requestId/return",
        destination: "http://13.125.229.197:8080/api/rental-requests/:requestId/retrun"
      },
      {
        source: "/api/rental-requests/:requestId/reject",
        destination: "http://13.125.229.197:8080/api/rental-requests/:requestId/reject"
      },
      {
        source: "/api/rental-requests/:requestId/approve",
        destination: "http://13.125.229.197:8080/api/rental-requests/:requestId/approve"
      },
      {
        source: "/api/rental-requests/:requestId/confirm-retrun",
        destination: "http://13.125.229.197:8080/api/rental-requests/:requestId/confirm-retrun"
      },
      {
        source: "/api/payments/:rentalRequestId/refund",
        destination: "http://13.125.229.197:8080/api/payments/:rentalRequestId/refund"
      },
      {
        source: "/api/payments/ready",
        destination: "http://13.125.229.197:8080/api/payments/ready"
      },
      {
        source: "/api/payments/confirm",
        destination: "http://13.125.229.197:8080/api/payments/confirm"
      },
    ];
  },
};

export default nextConfig;
