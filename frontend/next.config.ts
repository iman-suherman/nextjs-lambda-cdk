/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/_next' : '',
  // Ensure static files are handled correctly
  images: {
    unoptimized: true,
  }
}

module.exports = nextConfig 