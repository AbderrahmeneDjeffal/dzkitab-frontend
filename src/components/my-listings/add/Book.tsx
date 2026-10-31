export interface BookProps {
    isbn: string;
    title: string;
    author: string;
    category: string;
}

export default function Book(props: BookProps) {
    return (
        <div
            className="hover:bg-beige rounded-md p-2 **:text-sm flex flex-col cursor-pointer"
            title={props.title}
        >
            <span>
                <span className="text-black/40">ISBN:</span> {props.isbn}
            </span>
            <span>
                <span className="text-black/40">Title:</span> {props.title}
            </span>
            <span>
                <span className="text-black/40">Author:</span> {props.author}
            </span>
            <span>
                <span className="text-black/40">Category:</span>{" "}
                {props.category}
            </span>
        </div>
    );
}
