import styles from "./CarCard.module.scss"
import Image from "next/image";

type CarCardProps = {
    id: number;
    image_path: string;
    name: string;
    details: string;
    price: number;
};

export function CarCard({ id, image_path ,name, details, price }: CarCardProps) {
    return (
        <div className={styles.card}>
            <Image className={styles.cardImage} src={image_path} alt={""} width={500} height={500} />
            <p className={styles.cardTitle}>{name}</p>
            {/*<p className={styles.cardDetail}>{details}</p>*/}
            <p className={styles.cardPrice}>$ {price}</p>
        </div>
    );
}