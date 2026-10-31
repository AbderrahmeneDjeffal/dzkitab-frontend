import { axiosClient } from "@/lib/axios-client/axios-client";
import getAccessToken from "@/utils/functions/services/get-access-token";
import { errorHandler } from "@/utils/functions/services/shared/error-handler";
import { ReturnType } from "@/utils/types/services/return.type";

export interface ListingType {
    id: number;
    price: number;
    book_state: number;
    description: string;
    created_at: string;
    book: {
        isbn: string;
        title: string;
        author: string;
        category: string;
    };
    /** the listing detail endpoint returns the owner id, the list endpoint { id } */
    owner: number | { id: number };
}

export default async function getListings(
    searchParams: Record<string, string | undefined>
): ReturnType<ListingType[]> {
    try {
        const cookieHeader = await getAccessToken();

        const response = await axiosClient.get("listings", {
            headers: {
                Cookie: cookieHeader,
            },
            params: searchParams,
        });

        return { data: response.data };
    } catch (error) {
        return { error: errorHandler(error) };
    }
}
