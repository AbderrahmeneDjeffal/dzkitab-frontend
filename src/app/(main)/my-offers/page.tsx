import ErrorContainer from "@/components/error/ErrorContainer";
import InformationContainer from "@/components/information/InformationContainer";
import MyIssuedOfferCard from "@/components/offers/issued/MyIssuedOfferCard";
import MyOwnedOfferCard from "@/components/offers/owned/MyOwnedOfferCard";
import getMyIssuedOffers from "@/services/my-offers/get-my-issued-offers";
import getMyOwnedOffers from "@/services/my-offers/get-my-owned-offers";

export default async function MyOffersPage() {
    const [issued, owned] = await Promise.all([
        getMyIssuedOffers(),
        getMyOwnedOffers(),
    ]);

    return (
        <div className={"flex-1 flex flex-col gap-5"}>
            <h4>Offers I sent</h4>
            {issued.error ? (
                <ErrorContainer
                    message={
                        "An error occured while loading your issued offers!"
                    }
                />
            ) : (
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between gap-5 items-center px-4">
                        <span className="font-medium w-[130px]">ISBN</span>
                        <span className="font-medium flex-3">Title</span>
                        <span className="font-medium flex-2">Seller</span>
                        <span className="font-medium flex-1">Price</span>
                        <button className="button-md text-sm px-4 pointer-events-none opacity-0">
                            Cancel
                        </button>
                    </div>
                    {issued.data.length === 0 ? (
                        <div className="h-[100px] flex">
                            <InformationContainer
                                message="You did not issue an offer yet, you can"
                                link={{
                                    content: "browse the listings",
                                    href: "/listings",
                                }}
                            />
                        </div>
                    ) : (
                        issued.data.map((issuedOffer) => (
                            <MyIssuedOfferCard
                                key={issuedOffer.id}
                                issuedOffer={issuedOffer}
                            />
                        ))
                    )}
                </div>
            )}

            <hr className="my-10 bg-dark-green" />

            <h4>Offers I received</h4>
            {owned.error ? (
                <ErrorContainer
                    message={
                        "An error occured while loading your owned offers!"
                    }
                />
            ) : (
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between gap-5 items-center px-4">
                        <span className="font-medium w-[130px]">ISBN</span>
                        <span className="font-medium flex-3">Title</span>
                        <span className="font-medium flex-2">Buyer</span>
                        <span className="font-medium flex-1">Price</span>
                        <button className="button-md text-sm px-4 pointer-events-none opacity-0">
                            Mark as sold
                        </button>
                    </div>
                    {owned.data.length === 0 ? (
                        <div className="h-[100px] flex">
                            <InformationContainer message="You did not recieve an offer yet" />
                        </div>
                    ) : (
                        owned.data.map((ownedOffer) => (
                            <MyOwnedOfferCard
                                key={ownedOffer.id}
                                ownedOffer={ownedOffer}
                            />
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
