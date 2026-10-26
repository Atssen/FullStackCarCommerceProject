"use client"
import {useState} from "react";
import {CarCard} from "@/src/components/CarCard/CarCard";
import Masonry from "react-masonry-css";
import {FiltersBox} from "@/src/components/FiltersBox/FiltersBox";
import {instantMeiliSearch} from '@meilisearch/instant-meilisearch';
import {Configure, InstantSearch, useHits} from 'react-instantsearch'
import Image from "next/image";
import CustomSearchBox from "@/src/components/CustomSearchBox/CustomSearchBox";
import {CustomSortByBox} from "@/src/components/CustomSortByBox/CustomSortByBox";
import sidebarAnim from "./SidebarAnim.module.scss"


const { searchClient, setMeiliSearchParams } = instantMeiliSearch(
    process.env.NEXT_PUBLIC_MEILI_URL!,
    process.env.NEXT_PUBLIC_MEILI_KEY,
 {
     placeholderSearch: true, // default: true.
     primaryKey: 'id', // default: undefined
     requestInit: {
         headers: {
             'Meili-Include-Metadata': 'true'
         }
     }
 }
)


export default function Cars() {

    const [priceRange, setPriceRange] = useState<number[]>([20000, 50000]);


    function CustomHits({ hitComponent: HitComponent, ...props }) {
        const { hits } = useHits(props);

        return (
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="flex"
                columnClassName="flex flex-col"
            >
                {
                    hits.map(
                        (hit) =>
                            (
                                <HitComponent key={hit.objectID} hit={hit} />
                            )
                    )

                }
            </Masonry>
        );
    }

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const breakpointColumnsObj = {
        default: 2,
        768: 1
    };

      return (
          <div className="flex gap-[5%]">

              {/*MOBILE*/}
              <div className={`flex lg:hidden`}>

                  <InstantSearch indexName="cars" searchClient={searchClient}>
                      <Configure
                          filters={`price >= ${priceRange[0]} AND price <= ${priceRange[1]}`}
                      />
                        <div className={"flex fixed h-full z-10"}>

                              <div className={`relative h-full  ${isSidebarOpen ? "w-[70vw]" : "w-[0vw]"} bg-black transition-all duration-300 ease-in-out overflow-hidden flex flex-col items-center`}>
                                  <div className={`h-15vw] w-[60vw]`}>
                                      <div className={`h-[45vw] w-[60vw] mt-[5vw]`}>
                                          <FiltersBox setPriceRange={setPriceRange} />
                                      </div>
                                      <div className={`flex flex-col items-center mt-[5vw]`}>
                                          <CustomSearchBox/>
                                          <CustomSortByBox/>
                                      </div>
                                  </div>
                              </div>

                          <div onClick={()=>setIsSidebarOpen(!isSidebarOpen)} className={`relative h-[19vw] aspect-[0.6/1] top-[10vh] rounded-tr-[2vw] rounded-br-[2vw] ${isSidebarOpen ? `bg-[#000000]` : "bg-[#000000B3]"}  content-center transition-all duration-300 ease-in-out`}>
                              <Image src={"/right-arrow.png"} width={500} height={500} className={`${sidebarAnim.arrow} ${isSidebarOpen ? sidebarAnim.open : ""} w-[80%] aspect-[1/1] invert ml-[10%]`} alt={""} />
                          </div>
                        </div>
                        <CustomHits hitComponent={CarCard}/>
                  </InstantSearch>

              </div>


              {/*LARGE DISPLAY*/}
              <div className={"hidden lg:flex w-full h-full"}>
                  <InstantSearch indexName="cars" searchClient={searchClient}>

                      <Configure
                          filters={`price >= ${priceRange[0]} AND price <= ${priceRange[1]}`}
                      />

                      <div className={`hidden lg:block w-[25vw] h-[13vw] ml-[5%] mt-[4%] self-start`}>
                        <FiltersBox setPriceRange={setPriceRange}/>
                      </div>


                      <div>
                          <div className={`hidden lg:flex w-[97%] mr-[1.2%] mb-[2vw] justify-between`}>
                              <CustomSearchBox/>
                              <CustomSortByBox/>
                          </div>


                          <CustomHits hitComponent={CarCard}/>

                          {/*{loading ? <CarsSkeleton/> : <CustomHits hitComponent={CarCard}/>}*/}
                      </div>
                  </InstantSearch>
              </div>

          </div>
      );
}
