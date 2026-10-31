import { API_URL } from "@/lib/axios-client/axios-client";

/** URL of a listing photo (index starts at 1), served as a real image. */
export function listingPhotoUrl(listingId: number, index = 1) {
    return `${API_URL}/listings/${listingId}/photos/${index}/image`;
}
