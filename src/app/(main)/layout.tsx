import Navbar from "@/components/user/navbar/Navbar";
import { userInfo } from "@/services/auth/me/user-info";
import { redirect } from "next/navigation";

export default async function MainLayout(props: LayoutProps<"/">) {
    const { data, error } = await userInfo();

    if (!data && error) {
        redirect("/login");
    }

    return (
        <body className="min-h-dvh flex flex-col">
            <Navbar userInfo={data} />
            <div className="flex-1 pt-[calc(78px+40px)] flex flex-col pb-10 px-20">
                {props.children}
            </div>
        </body>
    );
}
