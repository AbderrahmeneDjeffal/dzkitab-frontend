"use client";
import { useRouter } from "next/navigation";
import { FormEvent, HTMLInputTypeAttribute } from "react";

export default function Filter({
    searchParams,
}: {
    searchParams?: {
        min_price?: string;
        max_price?: string;
        book_state?: string;
        isbn?: string;
        title?: string;
        author?: string;
        category?: string;
    };
}) {
    const router = useRouter();

    const searchItems: Array<{
        type: HTMLInputTypeAttribute;
        name: string;
        label: string;
        placeholder: string;
        defaultValue?: string;
    }> = [
        {
            type: "text",
            name: "isbn",
            label: "ISBN",
            placeholder: "Enter book's ISBN",
            defaultValue: searchParams?.isbn,
        },
        {
            type: "text",
            name: "title",
            label: "Title",
            placeholder: "Enter book's title",
            defaultValue: searchParams?.title,
        },
        {
            type: "text",
            name: "author",
            label: "Author",
            placeholder: "Enter book's author name",
            defaultValue: searchParams?.author,
        },
        {
            type: "number",
            name: "book_state",
            label: "State",
            placeholder: "Enter book's state",
            defaultValue: searchParams?.book_state,
        },
    ];

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const params = new URLSearchParams(
            [...formData]
                .map(([_, value]) => [_, String(value)])
                .filter(([_, value]) => value !== ""),
        );

        router.push(`/listings?${params.toString()}`);
    };

    return (
        <search
            className={
                "sticky top-[calc(78px+40px)] h-fit p-5 rounded-2xl shadow-[0_0_40px] shadow-black/5 flex-1"
            }
        >
            <form
                className="flex flex-col gap-6 [&>span]:flex [&>span]:flex-col [&>span]:gap-0.5 [&_label]:ml-2.5 [&_label]:text-sm"
                onSubmit={handleSubmit}
            >
                <h4>Filter</h4>
                {searchItems.map((item, i) => (
                    <span key={i} title={item.label}>
                        <label htmlFor={item.name}>{item.label}</label>
                        <input
                            type={item.type}
                            name={item.name}
                            id={item.name}
                            placeholder={item.placeholder}
                            defaultValue={item.defaultValue}
                        />
                    </span>
                ))}
                <div className="flex gap-2 [&>span]:flex-1">
                    <span>
                        <label htmlFor="min_price">Min Price</label>
                        <input
                            type="number"
                            name="min_price"
                            id="min_price"
                            placeholder="Minimum Price"
                            className="min-w-0 w-full"
                            defaultValue={searchParams?.min_price}
                        />
                    </span>
                    <span>
                        <label htmlFor="max_price">Max Price</label>
                        <input
                            type="number"
                            name="max_price"
                            id="max_price"
                            placeholder="Maximum Price"
                            className="min-w-0 w-full"
                            defaultValue={searchParams?.max_price}
                        />
                    </span>
                </div>
                <button className={"button-md"}>Search</button>
            </form>
        </search>
    );
}
