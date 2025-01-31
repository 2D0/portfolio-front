/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ['@repo/ui'],
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['img.notionusercontent.com', 'github.com'],
  },
};
