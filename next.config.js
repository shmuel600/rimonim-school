/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
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
  },
  api: {
    bodyParser: {
      sizeLimit: '100mb',
    },
  },
}