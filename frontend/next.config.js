// frontend/next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  // CRITICAL FIX: Forces Next.js to export static HTML/CSS/JS files
  output: 'export',
  
  // OPTIONAL but helpful: Sets the output directory name
  distDir: 'out', 
  
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = {
      "fs": false,
      "path": false,
      "crypto": false
    }
    return config
  }
}

module.exports = nextConfig