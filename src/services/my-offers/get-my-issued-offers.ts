import { axiosClient } from "@/lib/axios-client/axios-client";
import getAccessToken from "@/utils/functions/services/get-access-token";
import { errorHandler } from "@/utils/functions/services/shared/error-handler";
import { ReturnType } from "@/utils/types/services/return.type";
import { ListingType } from "../listings/get-listings";

/** An offer I sent on someone else's listing */
export type OfferType = {
    id: number;
    created_at: string;
    include_phone_number: boolean;
    listing: Omit<ListingType, "owner"> & {
        owner: { id: number; first_name: string; last_name: string };
    };
};

export default async function getMyIssuedOffers(): ReturnType<OfferType[]> {
    try {
        const cookieHeader = await getAccessToken();
        const response = await axiosClient.get("offers/issued", {
            headers: {
                Cookie: cookieHeader,
            },
        });

        return { data: response.data };
    } catch (error) {
        return { error: errorHandler(error) };
    }
}
