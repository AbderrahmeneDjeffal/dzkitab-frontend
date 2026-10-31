import axios from "axios";

export type ErrorType = {
    status?: number;
    message: string;
};

export function errorHandler(error: unknown): ErrorType {
    if (axios.isAxiosError(error)) {
        const data = error.response?.data as
            | { message?: string | string[] }
            | undefined;
        const raw = data?.message;
        const message = Array.isArray(raw)
            ? raw.join(", ")
            : typeof raw === "string" && raw
              ? raw
              : error.response
                ? `Request failed (${error.response.status})`
                : "Cannot reach the server. Please check your connection and try again.";

        return { status: error.response?.status, message };
    }

    return {
        message:
            "We are sorry! It looks like an error has occured from our side.",
    };
}
