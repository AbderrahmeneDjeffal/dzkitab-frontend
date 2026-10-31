import { axiosClient } from "@/lib/axios-client/axios-client";
import { errorHandler } from "@/utils/functions/services/shared/error-handler";
import { ReturnType } from "@/utils/types/services/return.type";

export default async function getBookListings(
    isbn: string
): ReturnType<unknown[]> {
    try {
        const response = await axiosClient.get("listings/book", {
            params: { isbn },
        });

        return { data: response.data };
    } catch (error) {
        return { error: errorHandler(error) };
    }
}
