import { axiosClient } from "@/lib/axios-client/axios-client";
import getAccessToken from "@/utils/functions/services/get-access-token";
import { errorHandler } from "@/utils/functions/services/shared/error-handler";
import { ReturnType } from "@/utils/types/services/return.type";
import { ListingType } from "../listings/get-listings";

export type MyListingType = ListingType & {
    offerCount: number;
};

export default async function getMyListings(): ReturnType<MyListingType[]> {
    try {
        const cookieHeader = await getAccessToken();
        const response = await axiosClient.get("listings/me", {
            headers: {
                Cookie: cookieHeader,
            },
        });

        return { data: response.data };
    } catch (error) {
        return { error: errorHandler(error) };
    }
}
