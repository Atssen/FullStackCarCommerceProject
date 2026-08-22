import Image from "next/image";
import {Dispatch, SetStateAction, useState} from "react";
import styles from "./ShoppingSidebar.module.scss"
import {FiltersBox} from "@/src/components/FiltersBox/FiltersBox";
import {CarSortSelector} from "@/src/components/CardViewSelectors/CarSortSelector";

type ShoppingSidebarProps  = {
    priceRange : number[];
    setPriceRange : (priceRange : number[]) => void;
    fetchData : () => Promise<void>;
    setOrderFactor : Dispatch<SetStateAction<keyof Car>>;
    setIsAscending : (isAscending : boolean) => void;
}

export function ShoppingSidebar({priceRange, setPriceRange, fetchData, setOrderFactor, setIsAscending} : ShoppingSidebarProps ) {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={"flex fixed h-full z-10"}>
            <div className={`relative h-full  ${isOpen ? "w-[70vw]" : "w-[0vw]"} bg-black transition-all duration-300 ease-in-out overflow-hidden flex flex-col items-center`}>
                <div className={`h-15vw] w-[60vw]`}>
                    <div className={`h-[45vw] w-[60vw] mt-[5vw]`}>
                        <FiltersBox priceRange={priceRange} setPriceRange={setPriceRange} fetchData={fetchData} />
                    </div>
                    <div className={`h-[10vw] w-[60vw] mt-[5vw]`}>
                        <CarSortSelector setOrderFactor={setOrderFactor} setIsAscending={setIsAscending}/>
                    </div>
                </div>
            </div>
            <div onClick={()=>setIsOpen(!isOpen)} className={`relative h-[19vw] aspect-[0.6/1] top-[10vh] rounded-tr-[2vw] rounded-br-[2vw] ${isOpen ? `bg-[#000000]` : "bg-[#000000B3]"}  content-center transition-all duration-300 ease-in-out`}>
                <Image src={"/right-arrow.png"} width={500} height={500} className={`${styles.arrow} ${isOpen ? styles.open : ""} w-[80%] aspect-[1/1] invert ml-[10%]`} alt={""} />
            </div>
        </div>
    );
}