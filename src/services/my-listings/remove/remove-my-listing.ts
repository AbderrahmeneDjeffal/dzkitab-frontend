import { axiosClient } from "@/lib/axios-client/axios-client";
import { errorHandler } from "@/utils/functions/services/shared/error-handler";
import { ReturnType } from "@/utils/types/services/return.type";

export default async function removeMyListing(
    id: number,
): ReturnType<undefined> {
    try {
        await axiosClient.delete(`listings/${id}`);

        return { data: undefined };
    } catch (error) {
        return { error: errorHandler(error) };
    }
}
