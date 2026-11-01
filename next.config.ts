import type { NextConfig } from "next";

const backend = process.env.NEXT_PUBLIC_API_URL_PROD?.replace(/\/$/, "");
const development = process.env.NEXT_PUBLIC_NODE_ENV === "development";

const nextConfig: NextConfig = {
    output: "standalone",
    /* config options here */
    reactCompiler: true,
    typedRoutes: true,
    experimental: {
        typedEnv: true,
    },
    reactStrictMode: false,
    // Production: proxy /api/* to the backend so cookies stay on the frontend domain
    async rewrites() {
        if (development || !backend) return [];
        return [{ source: "/api/:path*", destination: `${backend}/:path*` }];
    },
};

export default nextConfig;
