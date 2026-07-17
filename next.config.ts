import type { NextConfig } from "next";

// If building on Vercel, VERCEL='1' is set, so we use root path ('') and native Next.js build.
// If building on GitHub Actions for GitHub Pages, GITHUB_ACTIONS='true' is set, so we use '/Birthday' subpath.
const isGitHubPages = process.env.GITHUB_ACTIONS === "true" && process.env.VERCEL !== "1";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: isGitHubPages ? "export" : undefined,
  images: {
    unoptimized: true,
  },
  basePath: isGitHubPages ? "/Birthday" : "",
  assetPrefix: isGitHubPages ? "/Birthday/" : "",
  allowedDevOrigins: [
    "10.165.23.136",
    "10.165.23.136:3000",
    "172.26.64.1",
    "172.26.64.1:3000",
    "localhost",
    "localhost:3000",
  ],
};

export default nextConfig;
