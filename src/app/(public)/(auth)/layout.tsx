import { userInfo } from "@/services/auth/me/user-info";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function AuthLayout(props: LayoutProps<"/">) {
    // already logged in: no need to see the login / register pages
    const { data } = await userInfo();
    if (data) {
        redirect("/listings");
    }

    return (
        <>
            <div className={"flex-1 w-1/2 flex justify-center pt-36"}>
                {props.children}
            </div>
            <Image
                src={"/register/background.jpg"}
                width={1000}
                height={1000}
                alt={"Background"}
                className="flex-1 w-1/2 object-cover"
                loading="eager"
            />
        </>
    );
}
