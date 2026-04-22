"use client"
import {supabase} from "@/utils/supabase/client";
import {useEffect, useState} from "react";
import {CarCard} from "@/src/components/CarCard/CarCard";
import Masonry from "react-masonry-css";
import {FiltersBox} from "@/src/components/FiltersBox/FiltersBox";
import {CarsSkeleton} from "@/src/components/CarsSkeleton/CarsSkeleton";
import {usePathname, useRouter} from "next/navigation";

export default function Cars() {

    const [priceRange, setPriceRange] = useState<number[]>([20000, 50000]);
    const router = useRouter();
    const pathname = usePathname();

    async function fetchData() {
        setLoading(true);

        const { data, error } = await supabase
            .from('cars')
            .select('*')
            .gte('price', priceRange[0])
            .lte('price', priceRange[1])
            .limit(20);

        if (error) console.error(error)
        else setData(data)

        setLoading(false);
    }

    type Car = {
        id: number;
        image_path: string;
        name: string;
        details: string;
        price: number;
    };

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<Car[]>([]);

    useEffect(() => {
        fetchData();
    }, []);


    const breakpointColumnsObj = {
        default: 2,768: 1
    };

      return (
        <div className="flex font-sans gap-[10%]">

            <FiltersBox priceRange={priceRange} setPriceRange={setPriceRange} fetchData={fetchData} />

            {loading ? (
                <CarsSkeleton />
            ) : (
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="flex"
                    columnClassName="flex flex-col"
                >
                    {data.map((item: Car) => (
                        <div key={item.id} onClick={() => router.push(`${pathname}/${item.id}`)}>
                            <CarCard {...item} />
                        </div>
                    ))}
                </Masonry>
            )}


        </div>
      );
}
