/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

// module.exports = nextConfig
module.exports = {
  devIndicators: {
    buildActivity: false
  },
  images: {
    domains: [
      'res.cloudinary.com',
      'lh3.googleusercontent.com'
    ],
  }
}