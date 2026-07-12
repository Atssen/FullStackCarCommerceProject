import {InfoCard} from "@/src/components/InfoCard/InfoCard";
import {PageFooter} from "@/src/components/PageFooter/PageFooter";
import {LandingVideo} from "@/src/components/LandingImage/LandingVideo";

export default function Home()
{
    return (
        <div className={"flex flex-col items-center"}>

            <LandingVideo />

            <div className={"grid grid-cols-2 mt-10"}>
                <InfoCard imagePath={'/luxcar.webp'} title={"Best Quality"} description={"All the cars are made from the best materials and decorated with the most premium additions"} />
                <InfoCard imagePath={'/cheapcar.webp'} title={"Best Price"} description={"All the cars are made from the best materials and decorated with the most premium additions"} />
                <InfoCard imagePath={'/car-painting.jpg'} title={"Best Care"} description={"All the cars are made from the best materials and decorated with the most premium additions"} />
                <InfoCard imagePath={'/Customer-Service-Call-Center.webp'} title={"Best Support"} description={"All the cars are made from the best materials and decorated with the most premium additions"} />
            </div>

            <PageFooter />

        </div>
    )
}