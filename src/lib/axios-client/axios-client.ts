import axios from "axios";

export const API_URL =
    process.env.NEXT_PUBLIC_NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_API_URL_DEV
        : process.env.NEXT_PUBLIC_API_URL_PROD;

export const axiosClient = axios.create({
    baseURL: API_URL,
    timeout: 20000,
    withCredentials: true,
});
