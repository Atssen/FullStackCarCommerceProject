"use client"
import {supabase} from "@/utils/supabase/functions/client";
import {useEffect, useState} from "react";
import {CarCard} from "@/src/components/CarCard/CarCard";
import Masonry from "react-masonry-css";
import {FiltersBox} from "@/src/components/FiltersBox/FiltersBox";
import {CarsSkeleton} from "@/src/components/CarsSkeleton/CarsSkeleton";
import {OrderFactors} from "@/src/enums/orderFactors";
import {CarSortSelector} from "@/src/components/CardViewSelectors/CarSortSelector";
import {ShoppingSidebar} from "@/src/components/ShoppingSidebar/ShoppingSidebar";

export default function Cars() {

    const [orderFactor, setOrderFactor] = useState<keyof Car>(OrderFactors.CREATION_DATE as keyof Car);
    const [isAscending, setIsAscending] = useState<boolean>(true);


    const [priceRange, setPriceRange] = useState<number[]>([20000, 50000]);

    type OrderOptions = {
        ascending?: boolean;
    };

    function orderBy<T>(
        data: T[],
        column: keyof T,
        { ascending = true }: OrderOptions = {}
    ): T[] {
        return [...data].sort((a, b) => {
            const valA = a[column];
            const valB = b[column];

            // Handle null / undefined
            if (valA == null && valB == null) return 0;
            if (valA == null) return ascending ? 1 : -1;
            if (valB == null) return ascending ? -1 : 1;

            // Numbers
            if (typeof valA === "number" && typeof valB === "number") {
                return ascending ? valA - valB : valB - valA;
            }

            // Dates (ISO strings or Date objects)
            const dateA = new Date(valA as never);
            const dateB = new Date(valB as never);

            if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
                return ascending
                    ? dateA.getTime() - dateB.getTime()
                    : dateB.getTime() - dateA.getTime();
            }

            // Strings (fallback)
            return ascending
                ? String(valA).localeCompare(String(valB))
                : String(valB).localeCompare(String(valA));
        });
    }

    async function fetchData() {
        setLoading(true);

        const { data, error } = await supabase
            .from('cars')
            .select('*')
            .gte('price', priceRange[0])
            .lte('price', priceRange[1])

        if (error) console.error(error);
        else setData(orderBy(data, OrderFactors.CREATION_DATE, { ascending: isAscending }));

        console.log(data);

        setLoading(false);
    }

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<Car[]>([]);

    useEffect(() => {
        setData(orderBy(data, orderFactor, { ascending: isAscending }));
    }, [orderFactor, isAscending]);

    useEffect(() => {
        fetchData();
    }, []);


    const breakpointColumnsObj = {
        default: 2, 768: 1
    };

      return (
          <div className="flex gap-[5%]">

              <div className={`contents flex lg:hidden`}>
                <ShoppingSidebar/>
              </div>


              <div className={`hidden lg:block w-[25vw] h-[13vw] ml-[5%] mt-[4%] self-start`}>
                <FiltersBox priceRange={priceRange} setPriceRange={setPriceRange} fetchData={fetchData}/>
              </div>

              <div className={"flex flex-col items-end"}>
                  <CarSortSelector setOrderFactor={setOrderFactor} setIsAscending={setIsAscending}/>

                  {loading ? (
                      <CarsSkeleton/>
                  ) : (
                      <div>
                          <Masonry
                              breakpointCols={breakpointColumnsObj}
                              className="flex"
                              columnClassName="flex flex-col"
                          >
                              {data.map((item: Car) => (
                                  <div key={item.id}>
                                      <CarCard {...item} />
                                  </div>
                              ))}
                          </Masonry>
                      </div>
                  )}
              </div>

          </div>
      );
}
