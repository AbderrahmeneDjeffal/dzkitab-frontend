import Link from "next/link";

export default function MyListingsHeader() {
    return (
        <header className="flex justify-between items-center">
            <h4>My Listings</h4>
            <Link
                href={"/my-listings/add"}
                className={
                    "bg-dark-green font-semibold text-white rounded-xl py-3 px-4 hover:scale-105 duration-200 enabled:cursor-pointer mt-5 disabled:bg-dark-green/50"
                }
            >
                Add a listing
            </Link>
        </header>
    );
}
