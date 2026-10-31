import { axiosClient } from "@/lib/axios-client/axios-client";
import { errorHandler } from "@/utils/functions/services/shared/error-handler";
import { LoginDto } from "@/utils/types/login/login.dto";
import { ReturnType } from "@/utils/types/services/return.type";

export async function userLogin(loginDto: LoginDto): ReturnType<undefined> {
    try {
        await axiosClient.post("auth/login", loginDto);
        return { data: undefined };
    } catch (error) {
        return { error: errorHandler(error) };
    }
}
