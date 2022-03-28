const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
  reactStrictMode: true,

  images: {
    domains: ['boomemory-1304340057.cos.ap-shanghai.myqcloud.com']
  },

  async rewrites() {
    return [
      {
        source: '/graphql',
        destination: 'http://fantufantu.com/graphql'
      }
    ]
  }
})
