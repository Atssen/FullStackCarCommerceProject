import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ["www.topgear.com", "source.unsplash.com", "upload.wikimedia.org"],
    },
    allowedDevOrigins: ["192.168.113.166"],
};

export default nextConfig;