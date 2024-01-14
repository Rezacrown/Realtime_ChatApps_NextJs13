/** @type {import('next').NextConfig} */
const nextConfig = {
  generateEtags: false,
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "github.com",
      "lh3.googleusercontent.com",
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
