import ErrorContainer from "@/components/error/ErrorContainer";
import InformationContainer from "@/components/information/InformationContainer";
import MyListingsHeader from "@/components/my-listings/Header";
import MyListingCard from "@/components/my-listings/MyListingCard";
import getMyListings from "@/services/my-listings/get-my-listings";

export default async function MyListingsPage() {
    const { data: myListings, error } = await getMyListings();

    if (error) {
        return (
            <div className={"flex-1 flex flex-col gap-5"}>
                <MyListingsHeader />
                <ErrorContainer
                    message={"An error occured while loading your listings!"}
                />
            </div>
        );
    }

    if (myListings.length === 0) {
        return (
            <div className={"flex-1 flex flex-col gap-5"}>
                <MyListingsHeader />
                <InformationContainer
                    message="You do not have a listing yet, you can"
                    link={{
                        content: "add a new listing now!",
                        href: "/my-listings/add",
                    }}
                />
            </div>
        );
    }

    return (
        <div className={"flex-1 flex flex-col gap-5"}>
            <MyListingsHeader />
            <div className="flex flex-col gap-2">
                <div className="flex justify-between gap-5 items-center px-4">
                    <span className="font-medium w-[130px]">ISBN</span>
                    <span className="font-medium flex-2">Title</span>
                    <span className="font-medium flex-2">Description</span>
                    <span className="font-medium flex-1">Price</span>
                    <span className="font-medium flex-1">Offer count</span>
                    <button className="button-md px-4 bg-red-800 text-sm opacity-0 pointer-events-none">
                        Delete
                    </button>
                </div>
                {myListings.map((listing, i) => (
                    <MyListingCard key={i} listing={listing} />
                ))}
            </div>
        </div>
    );
}
