import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, {isServer}) => {
    // Add a rule to hand the canvas.node binary module
    config.module.rules.push({
      test: /\.node$/,
      use: 'raw-loader'})
    // Excule canvas from being precessed by Next.js in the browser
    if (!isServer) 
      config.externals.push('canvas')
    return config;
}
}

export default nextConfig;
