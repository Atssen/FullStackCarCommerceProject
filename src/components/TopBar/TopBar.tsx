import styles from "./TopBar.module.scss"
import Link from "next/link";
import Image from "next/image";

export function TopBar() {
    return (
        <>
            <div className={styles.topbar}>
                <Link href={"/"} className={"ml-5"} >
                    <Image src={"/jaguarLogo.png"} alt={""} width={150} height={150}/>
                </Link>
                <div className={styles.links}>
                    <Link href={"#"}> New Cars </Link>
                    <Link href={"/cars"}> All Cars </Link>
                </div>

                <div className={styles.searchBar}> Search for cars </div>

                <button className={`${styles.button} right-[10%]`}>
                    <Image src={"/shopping-bag.png"} className={styles.image} alt={""} width={32} height={32} />
                </button>

                <button className={`${styles.button} right-[5%]`}>
                    <Image src={"/avatar.png"} className={`${styles.image} w-[60%]`} alt={""} width={32} height={32} />
                </button>

            </div>
        </>
    );
}