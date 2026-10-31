import { axiosClient } from "@/lib/axios-client/axios-client";
import { errorHandler } from "@/utils/functions/services/shared/error-handler";
import { RegisterDto } from "@/utils/types/register/register.dto";
import { ReturnType } from "@/utils/types/services/return.type";

export async function userRegister(
    registerDto: RegisterDto
): ReturnType<undefined> {
    try {
        await axiosClient.post("auth/register", registerDto, {
            withCredentials: true,
        });
        return { data: undefined };
    } catch (error) {
        return { error: errorHandler(error) };
    }
}
