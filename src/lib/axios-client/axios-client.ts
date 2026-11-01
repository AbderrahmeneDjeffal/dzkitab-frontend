import axios from "axios";

const development = process.env.NEXT_PUBLIC_NODE_ENV === "development";

/**
 * Development: the browser and the Next server both call the backend directly.
 * Production: the browser calls "/api" on the SAME domain (next.config.ts proxies it
 * to the backend), so the login cookie belongs to the frontend domain and the Next
 * server can read it. The Next server itself calls the backend directly.
 */
export const API_URL = development
    ? process.env.NEXT_PUBLIC_API_URL_DEV
    : typeof window === "undefined"
      ? process.env.NEXT_PUBLIC_API_URL_PROD
      : "/api";

export const axiosClient = axios.create({
    baseURL: API_URL,
    timeout: 20000,
    withCredentials: true,
});
