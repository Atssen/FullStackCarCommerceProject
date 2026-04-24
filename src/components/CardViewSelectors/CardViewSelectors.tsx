import styles from "./CardViewSelectors.module.scss";
import {Dispatch, SetStateAction} from "react";
import {OrderFactors} from "@/src/enums/orderFactors";

type CardViewSelectorsProps = {
    setOrderFactor : Dispatch<SetStateAction<keyof Car>>;
    setIsAscending : (isAscending : boolean) => void;
}

export function CardViewSelectors({setOrderFactor, setIsAscending} : CardViewSelectorsProps) {
    return (
        <>
            <select
                className={styles.orderSelection}
                onChange={(e) => {
                    const value = e.target.value;

                    switch (value) {
                        case "name_asc":
                            setOrderFactor(OrderFactors.NAME);
                            setIsAscending(true);
                            break;

                        case "date_desc":
                            setOrderFactor(OrderFactors.CREATION_DATE);
                            setIsAscending(false);
                            break;

                        case "price_asc":
                            setOrderFactor(OrderFactors.PRICE);
                            setIsAscending(true);
                            break;

                        case "price_desc":
                            setOrderFactor(OrderFactors.PRICE);
                            setIsAscending(false);
                            break;
                    }
                }}
            >
                <option value="name_asc">Alphabetically</option>
                {/*<option value="date_desc">Newest</option>*/}
                <option value="price_asc">Price (Increasing)</option>
                <option value="price_desc">Price (Decreasing)</option>
            </select>
        </>
    );
}