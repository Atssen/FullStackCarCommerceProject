'use client'

import styles from "./ShowcaseCardCarousel.module.scss";
import {useRef, useState} from "react";
import { Card } from "./Card/Card";
// import cardData from "../../data/jeepCarouselCardsData.json";
import { useAnimationControls } from "framer-motion";
import {useEffect} from "react";
import {useSwipeable} from "react-swipeable";

const cardWidth = 70;

export type CardData = {
    id : number;
    title: string;
    subText: string;
    "bg-img": string;
};

export const variants = {
    left: {
        x: "-43vw",

        width: `${cardWidth / 5}vw`,
        height: "80%",

        opacity: 0.2,
        border: "none",
    },
    center: {
        x: 0,

        width: `${cardWidth}vw`,
        height: "100%",

        opacity: 1,
        zIndex:  2
    },
    right: {
        x: "43vw",

        width: `${cardWidth / 5}vw`,
        height: "80%",

        opacity: 0.2,
        border: "none",
    },
    destroyLeft: {
        x: "-76vw",

        width: 0,
        height: 0,

        opacity: 0,
    },
    destroyRight: {
        x: "76vw",

        width: 0,
        height: 0,

        opacity: 0,
    },
};


function getRelativeIndex(
    cardId: number,
    currentId: number,
    total: number
) {
    let diff = cardId - currentId;

    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    return diff;
}


export function ShowcaseCardCarousel({carDatas} : {carDatas: Car[]}) {

    const CARD_COUNT = carDatas.length;

    // Warm up the motion engine
    const controls = useAnimationControls();

    useEffect(() => {
        controls.start({ opacity: 1, transition: { duration: 0 } });
    }, []);
    //

    // Carousel auto next
    const intervalRef = useRef(setInterval(()=>{}, 0));

    const next = () => {
        setCurrentCardId((prev) => (prev + 1) % CARD_COUNT);
        startInterval();
    }

    const startInterval = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(next, 3500);
    };

    useEffect(() => {
        startInterval();
        return () => clearInterval(intervalRef.current);
    }, []);



    const [currentCardId, setCurrentCardId] = useState(0);



    const prev = () => {
        setCurrentCardId((prev) => (prev - 1 + CARD_COUNT) % CARD_COUNT);
        startInterval();
    }

    const hasTriggeredRef = useRef(false);

    const swipeHandlers = useSwipeable({
        onSwiping: ({ dir, absX }) => {
            if (absX <= 10 || hasTriggeredRef.current) return;

            hasTriggeredRef.current = true;

            if (dir === "Left") next();
            if (dir === "Right") prev();
        },


        onSwiped: () => {
            hasTriggeredRef.current = false;
        },

        trackMouse: false,
        preventScrollOnSwipe: false,
    });


    return (
        <>
            <div className={styles.cardContainer} {...swipeHandlers} >
                {Array.from({ length: CARD_COUNT }).map((_, id) => {
                    const relative = getRelativeIndex(
                        id,
                        currentCardId,
                        CARD_COUNT
                    );

                    let variant: keyof typeof variants;

                    if (relative === 0) variant = "center";
                    else if (relative === -1) variant = "left";
                    else if (relative === 1) variant = "right";
                    else if (relative < 0) variant = "destroyLeft";
                    else variant = "destroyRight";

                    return (
                        <Card
                            key={id}
                            variant={variant}
                            variants={variants}
                            showItems={id==currentCardId}
                            data={
                                {
                                    id : carDatas[id].id,
                                    title : carDatas[id].name,
                                    subText :  carDatas[id].details,
                                    "bg-img" :  carDatas[id].image_path
                                }

                            }
                        />
                    );
                })}
            </div>

            <div className={styles.arrows}>
                <img
                    className={`${styles.arrow} rotate-180 ${styles.dark}`}
                    onClick={prev}
                    src="https://cdn-icons-png.flaticon.com/128/318/318476.png"
                />
                <img
                    className={`${styles.arrow} ${styles.dark}`}
                    onClick={next}
                    src="https://cdn-icons-png.flaticon.com/128/318/318476.png"
                />
            </div>
        </>
    );
}
