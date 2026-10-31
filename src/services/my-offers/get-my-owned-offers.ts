import { axiosClient } from "@/lib/axios-client/axios-client";
import getAccessToken from "@/utils/functions/services/get-access-token";
import { errorHandler } from "@/utils/functions/services/shared/error-handler";
import { ReturnType } from "@/utils/types/services/return.type";
import { ListingType } from "../listings/get-listings";

/** An offer received on one of my listings (the buyer is the issuer) */
export type OfferType = {
    id: number;
    created_at: string;
    listing: ListingType;
    issuer: {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
        /** only present when the buyer agreed to share it */
        phone_number: string | null;
    };
};

export default async function getMyOwnedOffers(): ReturnType<OfferType[]> {
    try {
        const cookieHeader = await getAccessToken();
        const response = await axiosClient.get("offers/owned", {
            headers: {
                Cookie: cookieHeader,
            },
        });

        return { data: response.data };
    } catch (error) {
        return { error: errorHandler(error) };
    }
}
