import styles from "./InfoCard.module.scss"
import Image from "next/image";

export function InfoCard({ imagePath ,title, description }: { imagePath:string; title: string; description: string }) {
    return (
        <div className={`${styles.card} w-[88vw] aspect-[1/1] lg:w-[33vw] lg:aspect-[1.2/1]`}>
            <Image className={styles.cardImage} src={imagePath} alt={""} width={500} height={500} />
            <p className={`${styles.cardTitle}`} >{title}</p>
            <p className={`${styles.cardDetail} text-neutral-300`}>{description}</p>
        </div>
    );
}