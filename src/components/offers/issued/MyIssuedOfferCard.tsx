"use client";

import cancelMyOffer from "@/services/my-offers/cancel-my-offer";
import { OfferType } from "@/services/my-offers/get-my-issued-offers";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MyIssuedOfferCard({
    issuedOffer,
}: {
    issuedOffer: OfferType;
}) {
    const router = useRouter();
    const { listing } = issuedOffer;
    const seller = listing.owner;

    const handleCancel = async () => {
        if (!confirm("Cancel this offer?")) return;

        const { error } = await cancelMyOffer(issuedOffer.id);

        if (error) {
            alert(`Error cancelling offer: ${error.message}`);
            return;
        }

        router.refresh();
    };

    return (
        <div className="flex justify-between items-center gap-5 py-3 px-4 bg-white shadow-[0_0_20px] shadow-black/10 rounded-xl">
            <span className="w-[130px]">{listing.book.isbn}</span>
            <Link
                href={`/listings/${listing.id}`}
                className="flex-3 font-medium truncate hover:text-bronze"
            >
                {listing.book.title}
            </Link>
            <span className="flex-2 text-sm leading-tight">
                <span className="font-medium block">
                    {seller.first_name} {seller.last_name}
                </span>
                <span className="block text-black/60">
                    The seller will contact you
                </span>
            </span>
            <span className="flex-1 font-medium">DZD{listing.price}</span>
            <button
                onClick={handleCancel}
                className="button-md px-4 bg-red-800 text-sm py-3"
            >
                Cancel
            </button>
        </div>
    );
}
