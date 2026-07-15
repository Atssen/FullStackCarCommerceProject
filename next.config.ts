import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ["www.topgear.com", "source.unsplash.com", "upload.wikimedia.org"],
    },
    // // Comment: Added the specific ngrok URL and a wildcard pattern so Next.js allows incoming HMR WebSocket connections from the tunnel
    allowedDevOrigins: ["192.168.113.166","*.shares.zrok.io"],
};

export default nextConfig;