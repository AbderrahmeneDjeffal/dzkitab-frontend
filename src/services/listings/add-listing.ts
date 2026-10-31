import { axiosClient } from "@/lib/axios-client/axios-client";
import { errorHandler } from "@/utils/functions/services/shared/error-handler";
import { ReturnType } from "@/utils/types/services/return.type";

export default async function addListing(
    formData: FormData
): ReturnType<string> {
    try {
        const response = await axiosClient.post("listings", formData);

        return { data: response.data };
    } catch (error) {
        return { error: errorHandler(error) };
    }
}