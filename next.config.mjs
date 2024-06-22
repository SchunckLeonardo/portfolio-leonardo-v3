/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    github_key: process.env.GITHUB_KEY,
  },
}

export default nextConfig
