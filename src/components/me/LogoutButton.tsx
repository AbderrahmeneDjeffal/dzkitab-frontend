"use client";

import { userLogout } from "@/services/auth/logout/userLogout";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();
    const handleClick = async () => {
        const { error } = await userLogout();

        if (error) {
            alert(`Error logging out: ${error.message}`);
        }

        router.replace("/");
        router.refresh();
    };

    return (
        <button onClick={handleClick} className="button-md bg-red-800 px-5">
            Log out
        </button>
    );
}
