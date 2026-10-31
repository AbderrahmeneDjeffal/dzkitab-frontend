/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRouter } from "next/navigation";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    url?: any;
}

const Button = ({ text, url, className, ...props }: ButtonProps) => {
    const router = useRouter();

    const handleClick = () => {
        if (url) {
            router.push(url);
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`${className || ""} relative top-0 bg-dark-green rounded-2xl px-8 py-3 w-fit text-white cursor-pointer hover:-top-1 transition-all duration-300 `}
            {...props}
        >
            {text}
        </button>
    );
};

export default Button;