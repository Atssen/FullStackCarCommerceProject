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
    };

    async function fetchData() {
        setLoading(true);

        const { data, error } = await supabase
            .from('cars')
            .select('*')
            .eq('id', id);

        if (error) console.error(error)
        else setData(data)

        setLoading(false);
        console.log(data);
    }

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<Car[]>([]);


    useEffect(() => {
        fetchData();
    }, []);


    return(
        <>
            {
                loading ? (
                    <div className={"m-auto flex flex-col items-center justify-center gap-2"}>
                        <div className={styles.titleSkeleton}></div>
                        <div className={styles.imageSkeleton}></div>
                        <div className={styles.detailsSkeleton}></div>
                    </div>
                ) :
                (
                    <>
                        <div className={styles.carTitle}>{data[0].name}</div>
                        <Image className={styles.carImage} src={data[0].image_path} width={1000} height={1000} alt={""} />
                        <div className={styles.carDetails}>{data[0].details}</div>
                        <div className={styles.carPrice}>${data[0].price}</div>
                    </>
                )
            }
        </>
    )
}