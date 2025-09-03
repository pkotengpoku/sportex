/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',  // allows all domains
      },
      {
        protocol: 'http',
        hostname: '**',  // in case some links are http
      }
    ],
  },
}

module.exports = nextConfig
