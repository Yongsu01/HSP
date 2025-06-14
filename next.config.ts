import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 여기에 다른 설정 추가 가능
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
