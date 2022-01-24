/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,

  rewrites: async () => ({
    fallback: [
      {
        source: '/api/:path*',
        // destination: `http://admin.r2boom.com/api/:path*`
        destination: 'http://localhost:3000/api/:path*'
      }
    ]
  })
}
