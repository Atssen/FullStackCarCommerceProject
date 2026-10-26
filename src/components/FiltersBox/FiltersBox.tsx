import styles from "./FiltersBox.module.scss";
import Slider from '@mui/material/Slider';
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {OrderFactors} from "@/src/enums/orderFactors";

type FiltersBoxProps = {
    setPriceRange : (priceRange : number[]) => void;
}

const minDistance = 10000;

export function FiltersBox({setPriceRange} : FiltersBoxProps) {

    const [localPriceRange, setLocalPriceRange] = useState<number[]>([20000, 50000]);

    const handleChange = (event: Event, newValue: number[], activeThumb: number) => {
        if (activeThumb === 0) {
            setLocalPriceRange([Math.min(newValue[0], localPriceRange[1] - minDistance), localPriceRange[1]]);
        } else {
            setLocalPriceRange([localPriceRange[0], Math.max(newValue[1], localPriceRange[0] + minDistance)]);
        }
    };

    return (
        <div className={styles.box}>
            <Slider
                sx={{
                    color: '#ffffff', // thumb + track
                    '& .MuiSlider-thumb': {
                        '&:hover': {
                            boxShadow: '0 0 0 5px rgba(255,255,255,0.1)', // hover circle
                        },
                        '&.Mui-active': {
                            boxShadow: '0 0 0 5px rgba(255,255,255,0.2)', // click circle
                        },
                    },
                    '& .MuiSlider-track': {
                        backgroundColor: '#ffffff',
                    },
                    '& .MuiSlider-rail': {
                        backgroundColor: '#373737',
                    },
                }}
                value={localPriceRange}
                onChange={handleChange}
                valueLabelDisplay="auto"
                valueLabelFormat={(val) =>
                    `$ ${val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
                }
                min={10000}
                max={100000}
                step={10000}
                disableSwap
            />

            <p className={"mt-[1vw]"}> $ {localPriceRange[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}  -  $ {localPriceRange[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</p>

            <button className={styles.button} onClick={() => setPriceRange(localPriceRange)}> Apply Filters </button>
        </div>
    );
}