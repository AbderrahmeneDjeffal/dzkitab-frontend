import { axiosClient } from "@/lib/axios-client/axios-client";
import { errorHandler } from "@/utils/functions/services/shared/error-handler";
import { ReturnType } from "@/utils/types/services/return.type";

export async function userLogout(): ReturnType<undefined> {
    try {
        await axiosClient.get("auth/logout");
        return { data: undefined };
    } catch (error) {
        return { error: errorHandler(error) };
    }
}
