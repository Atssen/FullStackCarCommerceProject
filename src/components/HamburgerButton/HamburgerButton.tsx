import styles from "./HamburgerButton.module.scss";
import Image from "next/image";
import {Dispatch, SetStateAction, useState} from "react";

export function HamburgerButton({isOpen,setIsOpen}: {isOpen : boolean ,setIsOpen: Dispatch<SetStateAction<boolean>>}) {
    return (
        <div onClick={() => (setIsOpen(!isOpen))} className={` ${styles.button} ${isOpen ? styles.open : ""} absolute flex h-[40%] aspect-square right-[3%] justify-center items-center lg:hidden`}>
            <Image src={"/6015685.png"} alt={""} width={500} height={500} className={`invert h-[90%] w-[90%]`} />
        </div>
    );
}
