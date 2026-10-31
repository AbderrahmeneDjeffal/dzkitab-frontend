import { axiosClient } from "@/lib/axios-client/axios-client";
import getAccessToken from "@/utils/functions/services/get-access-token";
import { errorHandler } from "@/utils/functions/services/shared/error-handler";
import { ReturnType } from "@/utils/types/services/return.type";

export type UserInfo = {
    id: number;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
};

export async function userInfo(): ReturnType<UserInfo> {
    try {
        const cookieHeader = await getAccessToken();

        const response = await axiosClient.get("auth/me", {
            headers: {
                Cookie: cookieHeader,
            },
        });

        return { data: response.data as UserInfo };
    } catch (error) {
        return { error: errorHandler(error) };
    }
}
