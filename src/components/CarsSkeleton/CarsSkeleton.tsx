import styles from "./CarsSkeleton.module.scss";
import Masonry from "react-masonry-css";

export function CarsSkeleton() {

    return (
        <>
            <Masonry
                breakpointCols={2}
                className="flex"
                columnClassName="hidden lg:flex flex-col "
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

            <Masonry
                breakpointCols={1}
                className="flex"
                columnClassName="flex lg:hidden flex-col w-[100vh]"
            >
                <div className={styles.cardSkeleton1}></div>
                <div className={styles.cardSkeleton1}></div>
                <div className={styles.cardSkeleton1}></div>
                <div className={styles.cardSkeleton1}></div>
                <div className={styles.cardSkeleton1}></div>
                <div className={styles.cardSkeleton1}></div>
                <div className={styles.cardSkeleton1}></div>
                <div className={styles.cardSkeleton1}></div>
                <div className={styles.cardSkeleton1}></div>
                <div className={styles.cardSkeleton1}></div>
            </Masonry>

        </>
    );
}