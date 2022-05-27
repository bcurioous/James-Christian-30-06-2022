/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    images: {
      layoutRaw: true,
    },
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://dataservice.accuweather.com/:path*',
      },
    ]
  },
};

module.exports = nextConfig;
