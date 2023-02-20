/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'smite-builder.b-cdn.net',
        port: '',
        pathname: '/**',
      },
    ]
  },
}

module.exports = nextConfig
