import styles from "./CarCard.module.scss"
import Image from "next/image";
import Link from "next/link";
import {Highlight} from "react-instantsearch";

type CarCardProps = {
    id: number;
    image_path: string;
    name: string;
    details: string;
    price: number;
};

// @ts-expect-error hit is too general
export function CarCard({ hit }) {

    return (
        <Link href={`/cars/${hit.id}`} className={styles.card}>
            <Image
                className={`${styles.cardImage} h-full w-[95vw] lg:w-[35vw]`}
                src={hit.image_path}
                alt={hit.name || 'Hit thumbnail'}
                width={500} height={500} loading="lazy" decoding="async" unoptimized sizes="(max-width: 768px) 50vw, 25vw"
            />
            <p className={styles.cardTitle}>
                <Highlight attribute="name" hit={hit} />
            </p>
            <p className={styles.cardDetail}>
                <Highlight attribute="details" hit={{
                    ...hit,
                    _highlightResult: {
                        ...hit._highlightResult,
                        price: {
                            ...hit._highlightResult?.details,
                            value: hit.details.split(/(?<=[.!?])\s/)[0].replace(/\.$/, '')
                        },
                    }
                }}/>
            </p>
            <p className={styles.cardPrice}>
                $ <Highlight
                attribute="price"
                hit={{
                    ...hit,
                    _highlightResult: {
                        ...hit._highlightResult,
                        price: {
                            ...hit._highlightResult?.price,
                            value: hit.price.toString().replace(
                                /\B(?=(\d{3})+(?!\d))/g,
                                '.'
                            ),
                        },
                    },
                }}
            />
            </p>
        </Link>
    )
}