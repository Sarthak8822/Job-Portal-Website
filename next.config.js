/** @type {import('next').NextConfig} */
const nextConfig = {}
module.exports = {
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
    images: {
      domains: ['encrypted-tbn0.gstatic.com'],
    },
  }

module.exports = nextConfig
