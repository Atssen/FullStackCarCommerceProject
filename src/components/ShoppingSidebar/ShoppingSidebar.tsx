import Image from "next/image";
import {useState} from "react";
import styles from "./ShoppingSidebar.module.scss"

export function ShoppingSidebar() {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={"flex fixed h-full z-40"}>
            <div className={`relative h-full  ${isOpen ? "w-[70vw]" : "w-[0vw]"} bg-black transition-all duration-300 ease-in-out overflow-hidden`}>

            </div>
            <div onClick={()=>setIsOpen(!isOpen)} className={`relative h-[19vw] aspect-[0.6/1] top-[10vh] rounded-tr-[2vw] rounded-br-[2vw] ${isOpen ? `bg-[#000000]` : "bg-[#000000B3]"}  content-center transition-all duration-300 ease-in-out`}>
                <Image src={"/right-arrow.png"} width={500} height={500} className={`${styles.arrow} ${isOpen ? styles.open : ""} w-[80%] aspect-[1/1] invert ml-[10%]`} alt={""} />
            </div>
        </div>
    );
}