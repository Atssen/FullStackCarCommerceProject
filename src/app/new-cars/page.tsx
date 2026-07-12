'use client'

import { ShowcaseCardCarousel } from "@/src/components/ShowcaseCardCarousel/ShowcaseCardCarousel";
import {supabase} from "@/utils/supabase/functions/client";
import {useEffect, useState} from "react";


export default function NewCars()
{

    async function fetchData() {
        setLoading(true);

        const { data, error } = await supabase
            .from('cars')
            .select('*')

        if (error) console.error(error);
        if (!data) throw new Error("No such car found");

        // console.log(data);

        setLoading(false);

        setCarDatas(data);
    }

    const [carDatas, setCarDatas] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div>
            {!loading && <ShowcaseCardCarousel carDatas={carDatas}/>}
        </div>
    )
}