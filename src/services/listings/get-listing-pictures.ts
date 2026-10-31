import { axiosClient } from "@/lib/axios-client/axios-client";
import getAccessToken from "@/utils/functions/services/get-access-token";
import { errorHandler } from "@/utils/functions/services/shared/error-handler";
import { ReturnType } from "@/utils/types/services/return.type";

export interface PhotoType {
    id: number;
}

/** Photo ids of a listing (use listingPhotoUrl to display them). */
export default async function getListingPictures(
    listingId: number,
): ReturnType<PhotoType[]> {
    try {
        const cookieHeader = await getAccessToken();

        const response = await axiosClient.get(`listings/${listingId}/photos`, {
            headers: {
                Cookie: cookieHeader,
            },
        });

        return { data: response.data };
    } catch (error) {
        return { error: errorHandler(error) };
    }
}
