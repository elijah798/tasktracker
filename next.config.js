/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    MongoDB_URI: 'mongodb+srv://sellerselijahsellers:GypUmzJupxFLQD8Y@cluster0.9hk5w1w.mongodb.net/test',
  },

}

module.exports = nextConfig
