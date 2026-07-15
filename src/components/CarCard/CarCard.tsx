import styles from "./CarCard.module.scss"
import Image from "next/image";
import Link from "next/link";

type CarCardProps = {
    id: number;
    image_path: string;
    name: string;
    details: string;
    price: number;
};

export function CarCard({ id, image_path ,name, details, price }: CarCardProps) {

    return (
        <Link href={`/cars/${id}`} className={styles.card}>
            <Image className={`${styles.cardImage} w-[95vw] lg:w-[35vw]`} src={image_path} alt={""} width={500} height={500} loading="lazy" decoding="async" unoptimized sizes="(max-width: 768px) 50vw, 25vw"/>
            <p className={styles.cardTitle}>{name}</p>
            <p className={styles.cardDetail}>{details.split(/(?<=[.!?])\s/)[0].replace(/\.$/, '')}</p>
            <p className={styles.cardPrice}>$ {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</p>
        </Link>
    );
}