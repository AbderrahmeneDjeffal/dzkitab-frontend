import { UserInfo } from "@/services/auth/me/user-info";
import Image from "next/image";
import Link from "next/link";
import { Activity } from "react";

export default function Profile({
    userInfo,
}: {
    userInfo: Pick<UserInfo, "first_name" | "last_name">;
}) {
    const fullname = userInfo.first_name + " " + userInfo.last_name;

    return (
        <Link href={"/me"} className="flex items-center gap-4 cursor-pointer">
            <Image
                src={"/profile/user.png"}
                alt="Profile"
                width={30}
                height={30}
                loading="lazy"
                className="opacity-20"
            />
            <span className="font-medium text-sm">{fullname}</span>
        </Link>
    );
}
