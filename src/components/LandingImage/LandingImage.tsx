import Image from "next/image";

export function LandingImage() {
    return (
        <div className="relative w-[66vw] h-[37vw] mt-2 rounded-3xl overflow-hidden [box-shadow:0_9px_10px_5px_rgba(0,0,0,1)]">
            <Image
                src="/landingPageCar.avif"
                alt="Premium cars"
                fill
                className="object-cover"
            />

            <p className="absolute bottom-5 left-5 text-white z-10 font-bold text-2xl [text-shadow:0px_1px_6px_rgba(0,0,0,0.5)]">
                Premium cars, at your reach
            </p>
        </div>
    );
}