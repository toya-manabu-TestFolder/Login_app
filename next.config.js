/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },

  swcMinify: true,
  rewrites: async () => {
    return [
      {
        source: '/api/items',
        destination: 'http://localhost:8000/items',
      },
      {
        source: '/api/items',
        destination: 'http://localhost:8000/items/:slug',
      },
    ];
  },
};

module.exports = nextConfig;
