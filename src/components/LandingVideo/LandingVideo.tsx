import Image from "next/image";

export function LandingVideo() {
    return (
        <>
            <div className="relative w-[100vw] aspect-[1.8/1] lg:w-[66vw] lg:aspect-[1.7/1] mt-2 overflow-hidden ">
                <video height={500} width={500} src={"/17770564-uhd_3840_2160_24fps.mp4"} autoPlay={true} muted={true} loop={true}
                       className={"w-full h-full"}/>

                {/*<Image*/}
                {/*    src="/landingPageCar.avif"*/}
                {/*    alt="Premium cars"*/}
                {/*    fill*/}
                {/*    className="object-cover"*/}
                {/*/>*/}

                <p className="hidden lg:block absolute bottom-10 left-10 text-white z-10 text-5xl [text-shadow:0px_1px_6px_rgba(0,0,0,0.5)]">
                    Premium cars, at your reach
                </p>
            </div>

            <div className="self-start ml-[5vw] block lg:hidden mt-[3vw] w-[80vw] text-white w-[90%] text-[6vw] [text-shadow:0px_1px_6px_rgba(0,0,0,0.5)]">
                Premium cars
                <p className={"text-neutral-300"}> All the best qualities you want in a car </p>
            </div>
        </>
    );
}