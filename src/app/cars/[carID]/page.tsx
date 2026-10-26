"use client"

import {use, useEffect, useState} from "react";
import Image from "next/image";
import styles from "./CarPage.module.scss";
import { Meilisearch } from "meilisearch";

type Params = {
    carID: string;
};

const client = new Meilisearch({
    host: process.env.NEXT_PUBLIC_MEILI_URL!,
    apiKey: process.env.NEXT_PUBLIC_MEILI_KEY
});

export default function CarPage({ params }: { params: Promise<Params> }) {

    const resolvedParams = use(params);
    const id = resolvedParams.carID;
    const index = client.index("cars");



    async function fetchData() {
        if (!id) return;

        try {
            const result = await index.search<Car>("", {
                filter: `id = ${id}`,
                limit: 1,
            });

            const car = result.hits[0];

            if (!car) {
                throw new Error();
            }

            setData(car);
            setDataLoading(false);
        }
        catch (err) {
            console.error(`Failed to fetch car by ID: ${id}`);
        }
    }

    const [dataLoading, setDataLoading] = useState(true);
    const [imageLoading, setImageLoading] = useState(true);
    const [data, setData] = useState<Car>();


    useEffect(() => {
        fetchData();
    }, []);


    const scroll = () => {
        window.scrollBy({
            top: 500,
            behavior: "smooth",
        });
    };

    return(
        <>
            <div className={` ${styles.carGrid} flex flex-col lg:grid `}>
                <div className={`${styles.titleSkeleton} ${imageLoading ? "" : "hidden"}`} />
                <div className={`${styles.imageSkeleton} ${imageLoading ? "" : "hidden"}`} />
                <div className={`${styles.detailsSkeleton} ${imageLoading ? "" : "hidden"}`} />
                <div className={`${styles.priceSkeleton} ${imageLoading ? "" : "hidden"}`} />

                {
                    data &&
                    (
                        <>
                            <div className={styles.imageContainer}>
                                <Image className={`${styles.carImage} ${imageLoading ? "opacity-0 w-0 h-0" : ""}`} src={data.image_path} onLoad={() => setImageLoading(false)} fill alt={""} />
                            </div>

                            <div className={styles.titleSection}>
                                <div className={`${styles.carTitle} ${imageLoading ? "hidden" : ""}`}>{data.name}</div>

                                <div className={`${styles.carPrice} ${imageLoading ? "hidden" : ""}`}>$ {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</div>
                            </div>

                            <button className={`${styles.button} ${imageLoading ? "hidden" : ""}`}>Buy Now</button>

                            <div className={`lg:hidden ${styles.arrow}`} onClick={scroll}>
                                <Image src={"/arrow.png"} alt={""} fill className={"invert absolute rotate-90"} ></Image>
                            </div>

                            <div className={`${styles.carDetails} ${imageLoading ? "hidden" : ""}`}>{"Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus."}</div>
                        </>
                    )
                }
            </div>
        </>
    )
}