import ErrorContainer from "@/components/error/ErrorContainer";
import LogoutButton from "@/components/me/LogoutButton";
import { userInfo } from "@/services/auth/me/user-info";

export default async function MePage() {
    const { data: info, error } = await userInfo();

    if (error) {
        return <ErrorContainer message={error.message} />;
    }

    return (
        <>
            <h4 className="mb-5">My Informations</h4>
            <div className="flex justify-between items-center">
                <div className="flex flex-col flex-1 gap-2">
                    <span className="font-medium">
                        First name:{" "}
                        <span className="font-bold text-dark-green">
                            {info.first_name}
                        </span>
                    </span>
                    <span className="font-medium">
                        Last name:{" "}
                        <span className="font-bold text-dark-green">
                            {info.last_name}
                        </span>
                    </span>
                    <span className="font-medium">
                        Email:{" "}
                        <span className="font-bold text-dark-green">
                            {info.email}
                        </span>
                    </span>
                    <span className="font-medium">
                        Phone number:{" "}
                        <span className="font-bold text-dark-green">
                            {info.phone_number}
                        </span>
                    </span>
                </div>
                <LogoutButton />
            </div>
        </>
    );
}
