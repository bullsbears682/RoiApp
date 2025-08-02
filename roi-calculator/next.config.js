/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for Docker deployment
  output: 'standalone',
  
  // Experimental features
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs', 'jsonwebtoken'],
  },

  // Image optimization settings
  images: {
    domains: [],
    unoptimized: false,
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },

  // Environment variables that should be available to the client
  env: {
    APP_NAME: process.env.APP_NAME || 'ROI Calculator Pro',
    APP_URL: process.env.APP_URL || 'http://localhost:3000',
  },

  // Webpack configuration
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't resolve 'fs' module on the frontend to prevent errors
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    return config;
  },

  // TypeScript configuration
  typescript: {
    // Enable type checking during build
    ignoreBuildErrors: false,
  },

  // ESLint configuration
  eslint: {
    // Enable linting during build
    ignoreDuringBuilds: false,
  },

  // Redirects
  async redirects() {
    return [
      {
        source: '/login',
        destination: '/auth',
        permanent: true,
      },
      {
        source: '/signup',
        destination: '/auth',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;