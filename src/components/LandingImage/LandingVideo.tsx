import Image from "next/image";

export function LandingVideo() {
    return (
        <div className="relative w-[66vw] h-[37vw] mt-2 overflow-hidden ">

            <video height={500} width={500} src={"/17770564-uhd_3840_2160_24fps.mp4"} autoPlay={true} muted={true} loop={true}
                   className={"w-full h-full"}/>

            {/*<Image*/}
            {/*    src="/landingPageCar.avif"*/}
            {/*    alt="Premium cars"*/}
            {/*    fill*/}
            {/*    className="object-cover"*/}
            {/*/>*/}

            <p className="absolute bottom-12 left-12 text-white z-10 font-bold text-4xl [text-shadow:0px_1px_6px_rgba(0,0,0,0.5)]">
                Premium cars, at your reach
            </p>
        </div>
    );
}