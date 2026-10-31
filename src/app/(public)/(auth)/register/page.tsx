"use client";
import PhoneNumberInput from "@/components/register/PhoneNumberInput";
import { userRegister } from "@/services/auth/register/user-register";
import { RegisterDto } from "@/utils/types/register/register.dto";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Activity, FormEvent, useState } from "react";

export default function RegisterPage() {
    const router = useRouter();
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formdata = new FormData(e.currentTarget);
        const raw = Object.fromEntries(formdata.entries());
        const registerDto: RegisterDto = {
            first_name: raw.first_name as string,
            last_name: raw.last_name as string,
            email: raw.email as string,
            phone_number: raw.phone_number as string,
            password: raw.password as string,
            remember_me: raw.remember_me === "on" ? true : undefined,
        };
        const { error } = await userRegister(registerDto);
        setLoading(false);
        if (error) {
            setError(error.message);
            return;
        }
        router.replace("/listings");
        router.refresh();
    };

    return (
        <form
            className={"flex flex-col gap-4 w-[300px]"}
            onSubmit={handleSubmit}
        >
            <h4 className={"mb-5"}>Welcome to DZ Kitab</h4>
            <input
                type="text"
                name="first_name"
                placeholder="First Name"
                className="user-infalid:border-red-500 user-invalid:bg-red-100"
                required
            />
            <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                className="user-invalid:border-red-500 user-invalid:bg-red-100"
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                className="user-invalid:border-red-500 user-invalid:bg-red-100"
                required
            />
            <PhoneNumberInput />
            <input
                type="password"
                minLength={6}
                name="password"
                placeholder="Password"
                className="user-invalid:border-red-500 user-invalid:bg-red-100"
                required
            />
            {/* <span className="flex gap-2.5">
                <label htmlFor="remember_me" className="text-sm cursor-pointer">
                    Remember me
                </label>
                <input
                    type="checkbox"
                    name="remember_me"
                    id="remember_me"
                    className="cursor-pointer"
                />
            </span> */}
            <button
                className={
                    "bg-dark-green font-semibold text-white rounded-xl py-3 hover:scale-105 duration-200 enabled:cursor-pointer mt-5 disabled:bg-dark-green/50"
                }
                type="submit"
                disabled={loading}
            >
                {loading ? "Loading..." : "Register"}
            </button>
            <Activity mode={error ? "visible" : "hidden"}>
                <div
                    className={
                        "bg-red-100 text-red-900 px-4 py-3.5 text-sm rounded-2xl"
                    }
                >
                    {error}
                </div>
            </Activity>
            <hr className="text-black/20" />

            <span className="text-sm text-black/60">
                You already have an account?{" "}
                <Link
                    href={"/login"}
                    className="text-blue-500 hover:underline font-medium"
                >
                    Login
                </Link>
            </span>
        </form>
    );
}
