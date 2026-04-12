/** @type {import('next').NextConfig} */
// Force no basePath/assetPrefix so `/` works on Vercel even if env vars are set.
const nextConfig = {
  trailingSlash: false,
  basePath: undefined,
  assetPrefix: undefined,
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
