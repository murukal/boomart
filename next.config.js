const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['boomemory-1304340057.cos.ap-shanghai.myqcloud.com']
  },
  webpack: () => {
    return {
      plugins: [new BundleAnalyzerPlugin()]
    }
  }
}
