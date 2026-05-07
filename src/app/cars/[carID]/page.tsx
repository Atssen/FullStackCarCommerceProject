"use client"

import {supabase} from "@/utils/supabase/functions/client";
import {use, useEffect, useState} from "react";
import Image from "next/image";
import styles from "./CarPage.module.scss";

type Params = {
    carID: string;
};

export default function CarPage({ params }: { params: Promise<Params> }) {

    const resolvedParams = use(params);
    const id = resolvedParams.carID;

    type Car = {
        id: number;
        image_path: string;
        name: string;
        details: string;
        price: number;
        extended_details: string;
        tags: string;
    };

    async function fetchData() {

        const { data, error } = await supabase
            .from('cars')
            .select('*')
            .eq('id', id);

        if (error) console.error(error)
        else setData(data)

        console.log(data);

        setDataLoading(false);
    }

    const [dataLoading, setDataLoading] = useState(true);
    const [imageLoading, setImageLoading] = useState(true);
    const [data, setData] = useState<Car[]>([]);


    useEffect(() => {
        fetchData();
    }, []);

    return(
        <>
            <div className={styles.carGrid}>
                <div className={`${styles.titleSkeleton} ${imageLoading ? "" : "hidden"}`} />
                <div className={`${styles.imageSkeleton} ${imageLoading ? "" : "hidden"}`} />
                <div className={`${styles.detailsSkeleton} ${imageLoading ? "" : "hidden"}`} />
                <div className={`${styles.priceSkeleton} ${imageLoading ? "" : "hidden"}`} />

                {
                    !dataLoading &&
                    (
                        <>

                            <div className={styles.titleSection}>
                                <div className={`${styles.carTitle} ${imageLoading ? "hidden" : ""}`}>{data[0].name}</div>

                                <button className={styles.button}>Buy Now</button>
                            </div>

                            <Image className={`${styles.carImage} ${imageLoading ? "opacity-0 w-0 h-0" : ""}`} src={data[0].image_path} onLoad={() => setImageLoading(false)} width={500} height={500} alt={""} />
                            <div className={`${styles.carDetails} ${imageLoading ? "hidden" : ""}`}>{data[0].extended_details}</div>
                            <div className={`${styles.carPrice} ${imageLoading ? "hidden" : ""}`}>${data[0].price}</div>
                        </>
                    )
                }
            </div>
        </>
    )
}