import Link from "next/link";

interface InformationContainerProps {
    message: string;
    link?: {
        content: string;
        href: __next_route_internal_types__.RouteImpl<unknown>;
    };
}

export default function InformationContainer({
    message,
    link,
}: InformationContainerProps) {
    return (
        <div
            className={
                "flex-1 flex items-center justify-center bg-beige rounded-4xl"
            }
        >
            <span>
                {message + " "}
                {link && (
                    <Link
                        href={link.href}
                        className={
                            "text-bronze underline hover:font-medium duration-150"
                        }
                    >
                        {link.content}
                    </Link>
                )}
            </span>
        </div>
    );
}
