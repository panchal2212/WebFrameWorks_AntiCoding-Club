/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ This will skip ESLint errors during build
  },
};

export default nextConfig;
