import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "standalone",
    /* config options here */
    reactCompiler: true,
    typedRoutes: true,
    experimental: {
        typedEnv: true,
    },
    reactStrictMode: false,
};

export default nextConfig;
