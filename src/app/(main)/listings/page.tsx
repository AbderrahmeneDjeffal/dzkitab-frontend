import ErrorContainer from "@/components/error/ErrorContainer";
import InformationContainer from "@/components/information/InformationContainer";
import Listing from "@/components/listings/Listing";
import Filter from "@/components/my-listings/Filter";
import getListings from "@/services/listings/get-listings";

export default async function ListingsPage(props: PageProps<"/listings">) {
    const rawParams = (await props.searchParams) as Record<
        string,
        string | undefined
    >;
    const { min_price, max_price, book_state, isbn, title, author, category } =
        rawParams;
    const searchParams = {
        min_price,
        max_price,
        book_state,
        isbn,
        title,
        author,
        category,
    };

    const checkSearchParams =
        min_price ||
        max_price ||
        book_state ||
        isbn ||
        title ||
        author ||
        category;

    const { data: listings, error } = await getListings(searchParams);

    if (error) {
        return (
            <ErrorContainer
                message={"An error occured while loading listings!"}
            />
        );
    }

    if (listings.length === 0 && !checkSearchParams) {
        return (
            <InformationContainer
                message={"No listings are available yet!, you can"}
                link={{
                    content: "add your own listing now!",
                    href: "/my-listings/add",
                }}
            />
        );
    }

    return (
        <div className={"flex gap-5"}>
            <Filter searchParams={searchParams} />
            <div className="flex-3 grid grid-cols-3 gap-5 auto-rows-min">
                {listings.length !== 0 ? (
                    listings.map((listing, i) => (
                        <Listing key={i} {...listing} />
                    ))
                ) : (
                    <div className="col-span-full h-[200px] flex">
                        <InformationContainer
                            message={"No listings matches your search!"}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
