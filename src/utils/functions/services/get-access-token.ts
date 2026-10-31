import { cookies } from "next/headers";

export default async function getAccessToken() {
    const cookieHeader = (await cookies()).toString();
    return cookieHeader;
}
