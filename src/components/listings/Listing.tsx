import { ListingType } from "@/services/listings/get-listings";
import { listingPhotoUrl } from "@/utils/functions/photo-url";
import Link from "next/link";

export default function Listing(props: ListingType) {
    return (
        <Link
            href={`/listings/${props.id}`}
            className={
                "p-5 bg-white shadow-[0_0_25px] shadow-black/10 rounded-2xl hover:scale-[102%] duration-150"
            }
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={listingPhotoUrl(props.id, 1)}
                alt={props.book.title}
                loading="lazy"
                className="object-cover w-full h-[180px] rounded-md mb-5 bg-gray-100"
            />
            <h6>{props.book.title}</h6>
            <div className="[&>span]:text-sm">
                <span>Author: </span>
                <span className="font-medium">{props.book.author}</span>
            </div>
            <div className="[&>span]:text-sm">
                <span>Category: </span>
                <span className="font-medium">{props.book.category}</span>
            </div>
            <div className="[&>span]:text-sm">
                <span>Book state: </span>
                <span className="font-medium">{props.book_state}/10</span>
            </div>
            <div className="[&>span]:text-sm">
                <span>Price: </span>
                <span className="font-bold text-dark-green">
                    DZD{props.price}
                </span>
            </div>
            <p className="mt-4">{props.description}</p>
        </Link>
    );
}
