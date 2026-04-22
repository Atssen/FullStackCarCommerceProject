import styles from "./CarsSkeleton.module.scss";
import Masonry from "react-masonry-css";

export function CarsSkeleton() {

    const breakpointColumnsObj = {
        default: 2,768: 1
    };

    return (
        <>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="flex"
                columnClassName="flex flex-col"
            >
                <div className={styles.cardSkeleton1}></div>
                <div className={styles.cardSkeleton2}></div>
                <div className={styles.cardSkeleton1}></div>
                <div className={styles.cardSkeleton3}></div>
                <div className={styles.cardSkeleton2}></div>
                <div className={styles.cardSkeleton1}></div>
                <div className={styles.cardSkeleton3}></div>
                <div className={styles.cardSkeleton1}></div>
                <div className={styles.cardSkeleton2}></div>
                <div className={styles.cardSkeleton1}></div>
            </Masonry>
        </>
    );
}