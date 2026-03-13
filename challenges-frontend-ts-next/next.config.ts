import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/challenges/:path*',
        destination: 'http://localhost:8080/challenges/:path*',
      },
      {
        source: '/attempts/:path*',
        destination: 'http://localhost:8080/attempts/:path*',
      },
      {
        source: '/users/:path*',
        destination: 'http://localhost:8080/users/:path*',
      },
      {
        source: '/leaders/:path*',
        destination: 'http://localhost:9001/leaders/:path*',
      },
    ];
  },
};

export default nextConfig;
