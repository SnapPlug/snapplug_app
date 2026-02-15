import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: '/contact',
        destination: '/contacts',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
