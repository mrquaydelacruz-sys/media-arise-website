/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Exclude sanity folder from webpack bundling
    config.resolve.alias = {
      ...config.resolve.alias,
    }
    config.externals = config.externals || []
    if (isServer) {
      config.externals.push({
        'pdfmake/build/pdfmake': 'commonjs pdfmake/build/pdfmake',
        'pdfmake/build/vfs_fonts': 'commonjs pdfmake/build/vfs_fonts',
      })
    }
    return config
  },
}

module.exports = nextConfig
