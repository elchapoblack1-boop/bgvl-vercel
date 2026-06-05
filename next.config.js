/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // serverExternalPackages removed — not needed when using Postgres only
}

module.exports = nextConfig
