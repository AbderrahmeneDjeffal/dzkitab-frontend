import { UserInfo } from "@/services/auth/me/user-info";
import Link from "next/link";
import Profile from "./Profile";

export default function Navbar({
    userInfo,
}: {
    userInfo: Pick<UserInfo, "first_name" | "last_name">;
}) {
    const navItems: Array<{
        title: string;
        href: __next_route_internal_types__.RouteImpl<unknown>;
    }> = [
        { title: "My Listings", href: "/my-listings" },
        { title: "My Offers", href: "/my-offers" },
    ];
    return (
        <header className="flex items-center justify-between py-6 px-20 shadow-lg shadow-black/5 z-10 fixed top-0 right-0 left-0 bg-white">
            <Link href={"/listings"} title="Home page">
                <h5>DZ KITAB</h5>
            </Link>
            <nav
                className={
                    "flex gap-10 [&>a]:text-sm [&>a]:font-medium [&>a]:hover:text-bronze [&>a]:hover:scale-110 [&>a]:duration-150"
                }
            >
                {navItems.map((item, i) => (
                    <Link key={i} href={item.href} title={item.title}>
                        {item.title}
                    </Link>
                ))}
            </nav>
            <Profile userInfo={userInfo} />
        </header>
    );
}
