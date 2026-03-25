/** @type {import('next').NextConfig} */
const repoBasePath = process.env.NEXT_PUBLIC_BASE_PATH || process.env.BASE_PATH || ""
const normalizedBase = repoBasePath
  ? `/${repoBasePath.replace(/^\/+/, "").replace(/\/+$/, "")}`
  : ""

const nextConfig = {
  // Enable static export for GitHub Pages
  // output: "export",
  trailingSlash: true,
  basePath: normalizedBase || undefined,
  assetPrefix: normalizedBase || undefined,
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
