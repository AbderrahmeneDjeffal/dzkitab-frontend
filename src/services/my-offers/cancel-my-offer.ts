import { axiosClient } from "@/lib/axios-client/axios-client";
import { errorHandler } from "@/utils/functions/services/shared/error-handler";
import { ReturnType } from "@/utils/types/services/return.type";

export default async function cancelMyOffer(id: number): ReturnType<string> {
    try {
        const response = await axiosClient.delete(`offers/${id}`);
        return { data: response.data };
    } catch (error) {
        return { error: errorHandler(error) };
    }
}
