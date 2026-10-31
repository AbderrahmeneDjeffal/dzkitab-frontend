import ContactSellerModal from "@/components/listings/contact-seller-modal";
import ListingGallery, {
    GalleryPhoto,
} from "@/components/listings/listing-gallery";
import { userInfo } from "@/services/auth/me/user-info";
import { getListing } from "@/services/listings/get-listing";
import getListingPictures from "@/services/listings/get-listing-pictures";
import { listingPhotoUrl } from "@/utils/functions/photo-url";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ListingPage(props: PageProps<"/listings/[id]">) {
    const { id } = await props.params;

    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
        return notFound();
    }

    const [listingRes, photosRes, meRes] = await Promise.all([
        getListing(parsedId),
        getListingPictures(parsedId),
        userInfo(),
    ]);

    const { data: listing, error } = listingRes;

    if (!listing || error) {
        return notFound();
    }

    const photos: GalleryPhoto[] = (photosRes.data ?? []).map((p, i) => ({
        id: p.id,
        src: listingPhotoUrl(parsedId, i + 1),
    }));

    const ownerId =
        typeof listing.owner === "number" ? listing.owner : listing.owner?.id;
    const isOwner = !!meRes.data && meRes.data.id === ownerId;

    return (
        <div className="w-[1100px] mx-auto flex-1 flex gap-12 py-8">
            <div className="">
                <ListingGallery photos={photos} title={listing.book.title} />
            </div>

            {/* Content Section */}
            <div className="flex-1 flex flex-col gap-6 py-10">
                <h3>{listing.book.title}</h3>

                <span className="text-black/40">by {listing.book.author}</span>

                <Link
                    href={{
                        pathname: "/listings",
                        query: { category: listing.book.category },
                    }}
                    className="py-2 px-4 rounded-lg font-medium bg-beige text-bronze w-fit hover:bg-bronze/10 transition-colors"
                >
                    {listing.book.category}
                </Link>

                <div className="text-sm flex flex-col gap-1">
                    <span>
                        ISBN: <b className="font-medium">{listing.book.isbn}</b>
                    </span>
                    <span>
                        Book state:{" "}
                        <b className="font-medium">{listing.book_state}/10</b>
                    </span>
                </div>

                <p className="text-sm">{listing.description}</p>

                <span className="font-bold text-xl text-dark-green">
                    DZD{listing.price}
                </span>

                <div className="flex gap-5 w-full">
                    {isOwner ? (
                        <Link
                            href={"/my-listings"}
                            className="button-md px-5 bg-beige text-dark-green"
                        >
                            This is your listing, manage it
                        </Link>
                    ) : (
                        <ContactSellerModal
                            bookTitle={listing.book.title}
                            listingId={listing.id}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
