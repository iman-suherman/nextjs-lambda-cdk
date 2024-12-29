/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  assetPrefix: '_next',
  compress: false,
  images: {
    unoptimized: true,
  },
  // Ensure experimental features are enabled
  experimental: {
    // Enable if you're using app directory
    appDir: false,
  }
}

module.exports = nextConfig 