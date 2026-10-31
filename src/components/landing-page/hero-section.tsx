import Button from "./ui/button";
import img1 from "../../../public/landing/Group 19.svg";
import img2 from "../../../public/landing/Vector 1.svg";
import Image from "next/image";
import Link from "next/link";
const Hero = () => {
    return (
        <div className="w-full relative pl-30 flex flex-row  py-20 shadow-[0_4px_10px_0_rgba(0,0,0,0.05)]">
            <div className="w-full lg:w-2/5 flex flex-col gap-y-12  justify-center py-20">
                <div className="text-5xl tracking-widest w-full lg:w-[400px] font-bold leading-16 [word-spacing:6px] ">
                    Give Books a Second Life !
                </div>
                <div className="w-full lg:w-[400px]">
                    <strong className="font-semibold text-lg ">DZ-Kitab</strong>{" "}
                    connects readers by giving books a second chance. Buy and
                    sell used books, discover affordable knowledge, and make
                    culture more accessible.
                </div>
                <Link
                    href={"/login"}
                    className="button-md px-6 py-4 w-fit text-lg"
                >
                    Explore more
                </Link>
            </div>
            <div className="w-3/5 hidden lg:block relative">
                <Image
                    src={img2}
                    alt="Background"
                    className="absolute  w-[80%] h-[80%] top-10 left-20 "
                />
                <Image
                    src={img1}
                    alt="Foreground"
                    className="relative w-[65%] h-[65%] mx-auto mt-20"
                />
            </div>
        </div>
    );
};

export default Hero;
