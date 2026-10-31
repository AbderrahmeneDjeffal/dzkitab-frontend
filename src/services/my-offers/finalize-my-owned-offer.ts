import { axiosClient } from "@/lib/axios-client/axios-client";
import { errorHandler } from "@/utils/functions/services/shared/error-handler";
import { ReturnType } from "@/utils/types/services/return.type";

export default async function finalizeMyOwnedOffer(
    id: number,
): ReturnType<string> {
    try {
        const response = await axiosClient.patch(`offers/${id}`);
        return { data: response.data };
    } catch (error) {
        return { error: errorHandler(error) };
    }
}
