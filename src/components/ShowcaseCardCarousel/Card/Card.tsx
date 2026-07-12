import { motion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import styles from "./Card.module.scss";
import type {CardData} from "../ShowcaseCardCarousel";



type Props = {
    variant: string;
    variants: any;
    showItems: boolean;
    data: CardData;
};

export function Card({
                         variant,
                         variants,
                         showItems,
                         data
                     }: Props) {
    const [ready, setReady] = useState(false);
    const isFirstRender = useRef(true);

    useLayoutEffect(() => {
        setReady(true); // runs before paint
        isFirstRender.current = false;
    }, []);

    return (
        <motion.div
            className={styles.card}
            variants={variants}
            animate={variant}
            style={{
                visibility: ready ? "visible" : "hidden",
            }}
            transition={
                isFirstRender.current
                    ? { duration: 0 }
                    : {
                        type: "spring",
                        stiffness: 260,
                        damping: 30,
                    }
            }
        >

            <div className={styles.imgWrapper}>
                <motion.img
                    loading="lazy"
                    src={data["bg-img"]}
                    variants={{
                        left: { scaleX: 1 / 0.4 },
                        center: { scaleX: 1 },
                        right: { scaleX: 1 / 0.4 },
                        destroyLeft: { scaleX: 1 / 0.2 },
                        destroyRight: { scaleX: 1 / 0.2 },
                    }}
                    animate={variant}
                    style={{
                        visibility: ready ? "visible" : "hidden",
                    }}
                    transition={
                        isFirstRender.current
                            ? { duration: 0 }
                            : {
                                type: "spring",
                                stiffness: 260,
                                damping: 30,
                            }
                    }
                />
            </div>



            {showItems && (
                <>
                    <div className={styles.textSection}>
                        <p className={styles.title}>{data.title}</p>
                        <p className={styles.subText}>{data.subText}</p>
                    </div>

                    {/*<button className={styles.bookButton}> Book Now </button>*/}

                </>

            )}

        </motion.div>
    );
}
