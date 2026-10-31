"use client";

import finalizeMyOwnedOffer from "@/services/my-offers/finalize-my-owned-offer";
import { OfferType } from "@/services/my-offers/get-my-owned-offers";
import { useRouter } from "next/navigation";

export default function MyOwnedOfferCard({
    ownedOffer,
}: {
    ownedOffer: OfferType;
}) {
    const router = useRouter();
    const { listing, issuer } = ownedOffer;

    const handleClick = async () => {
        if (
            !confirm(
                "Mark this book as sold? The listing and its offers will be removed.",
            )
        )
            return;

        const { error } = await finalizeMyOwnedOffer(ownedOffer.id);

        if (error) {
            alert(`Error finalizing offer: ${error.message}`);
            return;
        }

        router.refresh();
    };

    return (
        <div className="flex justify-between items-center gap-5 py-3 px-4 bg-white shadow-[0_0_20px] shadow-black/10 rounded-xl">
            <span className="w-[130px]">{listing.book.isbn}</span>
            <span className="flex-3 font-medium truncate">
                {listing.book.title}
            </span>
            <span className="flex-2 text-sm leading-tight">
                <span className="font-medium block">
                    {issuer.first_name} {issuer.last_name}
                </span>
                <a
                    href={`mailto:${issuer.email}`}
                    className="block text-black/60 hover:underline"
                >
                    {issuer.email}
                </a>
                {issuer.phone_number && (
                    <span className="block text-black/60">
                        {issuer.phone_number}
                    </span>
                )}
            </span>
            <span className="flex-1 font-medium">DZD{listing.price}</span>
            <button onClick={handleClick} className="button-md text-sm px-4">
                Mark as sold
            </button>
        </div>
    );
}
