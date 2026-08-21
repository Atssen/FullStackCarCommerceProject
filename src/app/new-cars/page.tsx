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
            .order('created_at', { ascending: false })
            .limit(10);

        if (error) console.error(error);
        if (!data) throw new Error("No such car found");

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