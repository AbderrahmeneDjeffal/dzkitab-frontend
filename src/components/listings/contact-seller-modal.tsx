"use client";
import { useState, useEffect, FormEvent } from "react";
import createOffer, { CreateOfferDto } from "@/services/offers/create-offer";
import { useRouter } from "next/navigation";

interface ContactSellerModalProps {
    bookTitle: string;
    listingId: number;
}

export default function ContactSellerModal({
    bookTitle,
    listingId,
}: ContactSellerModalProps) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [sharePhone, setSharePhone] = useState<"yes" | "no" | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (sharePhone === null) {
            alert("Please select whether to share your phone number or not.");
            return;
        }

        setIsLoading(true);

        try {
            const payload: CreateOfferDto = {
                listing_id: Number(listingId),
                include_phone_number: sharePhone === "yes",
            };
            const { data, error } = await createOffer(payload);

            if (error) {
                alert("Failed to send request: " + error.message);
                return;
            }

            if (data) {
                setIsOpen(false);
                router.push("/my-offers");
                router.refresh();
            }
        } catch (err) {
            console.error("Unexpected error in handleSubmit:", err);
            alert("An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <button className="button-md px-5" onClick={() => setIsOpen(true)}>
                Contact Seller
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200 text-left">
                    <div className="bg-[#FAF9F6] w-full max-w-[450px] rounded border border-[#8FA89B] p-8 shadow-2xl relative">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsOpen(false);
                            }}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-800"
                            type="button"
                        >
                            ✕
                        </button>

                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-[#1E3D32] mb-1">
                                Contact Seller
                            </h3>
                            <p className="text-sm text-gray-500">
                                Express interest in{" "}
                                <span className="font-semibold text-gray-700">
                                    {bookTitle}
                                </span>
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-6"
                        >
                            <div className="flex flex-col gap-3">
                                <p className="text-gray-700 font-medium">
                                    Do you agree to share your phone number with
                                    the seller?
                                </p>
                                <div className="flex flex-col gap-2 pl-1">
                                    <label className="flex items-center gap-3 cursor-pointer w-fit group">
                                        <div
                                            className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                                                sharePhone === "yes"
                                                    ? "border-[#1E3D32]"
                                                    : "border-gray-400 group-hover:border-gray-600"
                                            }`}
                                        >
                                            {sharePhone === "yes" && (
                                                <div className="w-3 h-3 rounded-full bg-[#1E3D32]" />
                                            )}
                                        </div>
                                        <input
                                            type="radio"
                                            className="hidden"
                                            name="phone_choice"
                                            onChange={() =>
                                                setSharePhone("yes")
                                            }
                                            checked={sharePhone === "yes"}
                                        />
                                        <span className="text-sm font-medium text-gray-700">
                                            YES, share my number
                                        </span>
                                    </label>

                                    <label className="flex items-center gap-3 cursor-pointer w-fit group">
                                        <div
                                            className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                                                sharePhone === "no"
                                                    ? "border-[#1E3D32]"
                                                    : "border-gray-400 group-hover:border-gray-600"
                                            }`}
                                        >
                                            {sharePhone === "no" && (
                                                <div className="w-3 h-3 rounded-full bg-[#1E3D32]" />
                                            )}
                                        </div>
                                        <input
                                            type="radio"
                                            className="hidden"
                                            name="phone_choice"
                                            onChange={() => setSharePhone("no")}
                                            checked={sharePhone === "no"}
                                        />
                                        <span className="text-sm font-medium text-gray-700">
                                            NO, keep it private
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <button
                                disabled={isLoading}
                                type="submit"
                                className="cursor-pointer w-full h-12 bg-[#1E3D32] hover:bg-[#162e25] disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-xl font-medium text-lg transition-all shadow-md active:scale-[0.98]"
                            >
                                {isLoading ? "Sending..." : "Confirm & Send"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
