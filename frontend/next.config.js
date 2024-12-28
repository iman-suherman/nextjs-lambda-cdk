/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  webpack: (config) => {
    // Add any webpack configurations if needed
    return config
  }
}

module.exports = nextConfig 