/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import addListing from "@/services/listings/add-listing";
// Ensure path is correct for your project
import getBookListings from "@/services/my-listings/add/get-book-listings";
import Image from "next/image";
// 1. Change import from next/router to next/navigation
import { useRouter } from "next/navigation";
import {
    ChangeEvent,
    FormEvent,
    HTMLInputTypeAttribute,
    useMemo,
    useState,
} from "react";

type FormItemType = {
    type: HTMLInputTypeAttribute;
    name: string;
    label: string;
    placeholder: string;
};

export default function AddListingPage() {
    const router = useRouter(); // 2. Initialize router
    const [query, setQuery] = useState("");
    const [selectedBook, setSelectedBook] = useState<unknown>();
    // true when the typed ISBN is already known: the book data is reused
    const [knownBook, setKnownBook] = useState(false);

    // State for text fields
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        category: "",
        price: "",
        book_state: "",
        description: "",
    });

    const [bookImages, setBookImages] = useState<File[]>([]);

    const imagePreviews = useMemo(() => {
        return bookImages.map((file) => URL.createObjectURL(file));
    }, [bookImages]);

    const bookFormItems: (FormItemType & {
        readOnly: boolean;
    })[] = [
        {
            type: "text",
            name: "title",
            label: "Title",
            placeholder: "Enter your book's title",
            readOnly: false,
        },
        {
            type: "text",
            name: "author",
            label: "Author",
            placeholder: "Enter your book's author full name",
            readOnly: false,
        },
        {
            type: "text",
            name: "category",
            label: "Category",
            placeholder: "Enter your book's category",
            readOnly: false,
        },
    ];

    const listingFormItems: FormItemType[] = [
        {
            type: "number",
            name: "price",
            label: "Desired Price (DZD)",
            placeholder: "Enter your desired price",
        },
        {
            type: "number",
            name: "book_state",
            label: "Book State (1-10)",
            placeholder: "Enter your book's state",
        },
    ];

    // Handle text input changes
    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleIsbnChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const isbn = e.target.value.trim();
        if (isbn.length > 13) return;
        setQuery(isbn);
        setKnownBook(false);

        if (isbn.length === 10 || isbn.length === 13) {
            const { data } = await getBookListings(isbn);
            const found = (
                data as
                    | {
                          isbn: string;
                          title: string;
                          author: string;
                          category: string;
                      }[]
                    | undefined
            )?.find((book) => book.isbn === isbn);

            if (found) {
                setKnownBook(true);
                setFormData((prev) => ({
                    ...prev,
                    title: found.title,
                    author: found.author,
                    category: found.category,
                }));
            }
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files);
            setBookImages((prev) => {
                const combined = [...prev, ...newFiles];
                if (combined.length > 4) {
                    alert("You have reached the maximum of 4 images.");
                    return combined.slice(0, 4);
                }
                return combined;
            });
            e.target.value = "";
        }
    };

    const handleRemoveImage = (index: number) => {
        setBookImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (bookImages.length === 0) {
            alert("Please add at least one photo of your book.");
            return;
        }
        const tooBig = bookImages.find((file) => file.size > 5 * 1024 * 1024);
        if (tooBig) {
            alert(`"${tooBig.name}" is larger than 5 MB, please pick a smaller photo.`);
            return;
        }

        const data = new FormData();
        data.append("isbn", query);
        data.append("price", formData.price);
        data.append("book_state", formData.book_state);
        data.append("description", formData.description);
        data.append("title", formData.title);
        data.append("author", formData.author);
        data.append("category", formData.category);
        data.append("new_book", knownBook ? "" : "true");

        bookImages.forEach((file) => {
            data.append("photos", file);
        });

        const { data: responseData, error } = await addListing(data);

        if (error) {
            alert(`Failed to submit listing: ${error.message}`);
            return;
        }

        if (responseData) {
            router.push("/my-listings");
            router.refresh();
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 [&>span]:flex [&>span]:flex-col [&>span]:gap-0.5 [&_label]:ml-2.5 [&_label]:text-sm w-xl mx-auto"
        >
            <span title={"ISBN"} className={"relative"}>
                <label htmlFor={"isbn"}>{"ISBN"}</label>
                <input
                    type={"text"}
                    name={"isbn"}
                    id={"isbn"}
                    placeholder={"Enter your book's ISBN"}
                    value={query}
                    onChange={handleIsbnChange}
                />

                {knownBook && (
                    <small className="ml-2.5 text-dark-green">
                        This book already exists, its details were filled in.
                    </small>
                )}
            </span>

            {bookFormItems.map((item, i) => (
                <span key={i} title={item.label}>
                    <label htmlFor={item.name}>{item.label}</label>
                    <input
                        type={item.type}
                        name={item.name}
                        id={item.name}
                        placeholder={item.placeholder}
                        readOnly={knownBook}
                        value={(formData as any)[item.name]}
                        onChange={handleInputChange}
                        required={item.name !== "category"}
                    />
                </span>
            ))}
            <hr />
            {listingFormItems.map((item, i) => (
                <span key={i} title={item.label}>
                    <label htmlFor={item.name}>{item.label}</label>
                    <input
                        type={item.type}
                        name={item.name}
                        id={item.name}
                        placeholder={item.placeholder}
                        value={(formData as any)[item.name]}
                        onChange={handleInputChange}
                        required
                    />
                </span>
            ))}
            <span title={"Description"}>
                <label htmlFor={"description"}>{"Description"}</label>
                <textarea
                    className="resize-none"
                    name={"description"}
                    id={"description"}
                    placeholder={"Fill your listing's description"}
                    rows={3}
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    minLength={10}
                    maxLength={200}
                />
            </span>

            <span title={"Book Images"}>
                <label>Book Images ({bookImages.length}/4)</label>
                <div className="flex flex-row gap-3 mt-1 items-start">
                    {imagePreviews.map((src, index) => (
                        <div
                            key={index}
                            className="relative w-24 h-32 border rounded-md overflow-hidden bg-gray-50 flex-shrink-0"
                        >
                            <Image
                                src={src}
                                alt={`Selected book ${index + 1}`}
                                className="object-cover"
                                fill
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-sm transition-colors"
                                title="Remove image"
                            >
                                ✕
                            </button>
                        </div>
                    ))}

                    {bookImages.length < 4 && (
                        <label className="w-24 h-32 border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-md flex flex-col items-center justify-center cursor-pointer bg-gray-50 hover:bg-blue-50 transition-colors flex-shrink-0">
                            <span className="text-3xl text-gray-400 mb-1">
                                +
                            </span>
                            <span className="text-xs text-gray-500 font-medium">
                                Add Photo
                            </span>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </label>
                    )}
                </div>
            </span>

            <button type="submit" className="button-md">
                Add listing
            </button>
        </form>
    );
}
