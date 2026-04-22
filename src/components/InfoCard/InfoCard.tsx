import styles from "./InfoCard.module.scss"
import Image from "next/image";

export function InfoCard({ imagePath ,title, description }: { imagePath:string; title: string; description: string }) {
    return (
        <div className={styles.card}>
            <Image className={styles.cardImage} src={imagePath} alt={""} width={500} height={500} />
            <p className={styles.cardTitle}>{title}</p>
            <p className={styles.cardDetail}>{description}</p>
        </div>
    );
}