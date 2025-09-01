import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost', 'applymbbs.in', '2706-2405-201-402f-c0d1-1c3f-63e8-71de-c8f.ngrok-free.app',"168.231.82.99"],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/assets/**',
      },
      {
        protocol: 'https',
        hostname: 'applymbbs.in',
        pathname: '/assets/**',
      },
      {
        protocol: 'https',
        hostname: '2706-2405-201-402f-c0d1-1c3f-63e8-71de-c8f.ngrok-free.app',
        pathname: '/uploads/**',
      },
      {
        protocol: "http",
        hostname: "168.231.82.99",
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
  },

  experimental: {
    optimizeCss: false
  }
};

export default nextConfig;
