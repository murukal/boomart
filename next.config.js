const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: []
  }
})

/** @type {import('next').NextConfig} */
module.exports = withMDX(
  withBundleAnalyzer({
    reactStrictMode: true,

    images: {
      domains: ['boomemory-1304340057.cos.ap-shanghai.myqcloud.com']
    },

    /** webpack */
    webpack: (config) => {
      // 设置文件路径别名
      config.resolve.alias['~'] = __dirname
      return config
    },

    // Append the default value with md extensions
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx']
  })
)
