import { userInfo } from "@/services/auth/me/user-info";
import Link from "next/link";

const Header = async () => {
    const { data: user } = await userInfo();

    return (
        <div className="fixed top-0 left-0 w-full py-5 px-20 flex flex-row items-center shadow-[0_4px_10px_0_rgba(0,0,0,0.10)] bg-white z-50">
            <h5>DZ KITAB</h5>
            <div className="hidden md:flex flex-1  justify-end items-center gap-x-4">
                {user ? (
                    <Link href={"/listings"} className="button-md px-5">
                        Open the marketplace
                    </Link>
                ) : (
                    <>
                        <Link
                            href={"/register"}
                            className="button-md px-5 bg-beige text-dark-green"
                        >
                            Register
                        </Link>
                        <Link href={"/login"} className="button-md px-5">
                            Login
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
