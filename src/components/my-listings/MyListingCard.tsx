"use client";
import { MyListingType } from "@/services/my-listings/get-my-listings";
import removeMyListing from "@/services/my-listings/remove/remove-my-listing";
import { useRouter } from "next/navigation";

export default function MyListingCard({ listing }: { listing: MyListingType }) {
    const router = useRouter();
    const handleDelete = async () => {
        if (!confirm("Delete this listing? Its offers will be removed too."))
            return;

        const { error } = await removeMyListing(listing.id);

        if (error) {
            alert(error.message);
        } else {
            router.refresh();
        }
    };
    return (
        <div className="flex justify-between gap-5 items-center bg-white shadow-[0_0_20px] shadow-black/10 px-4 py-3 rounded-xl">
            <span className="w-[130px] overflow-hidden">
                {listing.book.isbn}
            </span>
            <span className="font-bold flex-2 text-dark-green truncate">
                {listing.book.title}
            </span>
            <span className="flex-2 truncate">{listing.description}</span>
            <span className="font-medium flex-1">DZD{listing.price}</span>
            <span className="font-medium flex-1">{listing.offerCount}</span>
            <button
                onClick={handleDelete}
                className="button-md px-4 bg-red-800 text-sm py-3"
            >
                Delete
            </button>
        </div>
    );
}
