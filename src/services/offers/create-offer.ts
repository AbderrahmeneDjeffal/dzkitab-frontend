import { axiosClient } from "@/lib/axios-client/axios-client";
// Ensure errorHandler does not import server-only modules
import { errorHandler } from "@/utils/functions/services/shared/error-handler";
import { ReturnType } from "@/utils/types/services/return.type";

export interface CreateOfferDto {
    listing_id: number;
    include_phone_number?: boolean;
}

export default async function createOffer(
    data: CreateOfferDto
): ReturnType<string> {
    try {
        
        
        const response = await axiosClient.post("offers", data);
        return { data: response.data }; 
    } catch (error) {
        return { error: errorHandler(error) };
    }
}