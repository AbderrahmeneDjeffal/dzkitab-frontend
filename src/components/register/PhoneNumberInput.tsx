"use client";
import { useState } from "react";

export default function PhoneNumberInput() {
    const [phoneNumber, setPhoneNumber] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let digits = e.target.value.replace(/\D/g, "");
        digits = digits.substring(0, 10);
        const formatted = digits.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
        setPhoneNumber(formatted);
    };

    return (
        <input
            value={phoneNumber}
            type="text"
            minLength={14}
            name="phone_number"
            placeholder="Phone number"
            className="user-invalid:border-red-500 user-invalid:bg-red-100"
            required
            onChange={handleChange}
        />
    );
}
