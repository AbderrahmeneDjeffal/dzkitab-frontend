import Community from "@/components/landing-page/community";
import Header from "@/components/landing-page/header";
import Hero from "@/components/landing-page/hero-section";
import Offers from "@/components/landing-page/offers";
import Work from "@/components/landing-page/work";

export default function Home() {
    return (
        <div className="w-full">
            <Header></Header>
            <Hero></Hero>
            <Offers></Offers>
            <Work></Work>
            <Community></Community>
        </div>
    );
}
